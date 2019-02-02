from rest_framework import serializers
from .models import *
from persian import enToPersianNumb
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings

from .models import FootballPlayer, UnAuthUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'pk')


class UnAuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnAuthUser
        fields = '__all__'


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email')


class FootballPlayerSerializer(serializers.ModelSerializer):
    team = serializers.CharField(source='team.name')
    url = serializers.URLField(source='avatar.url')
    ps = serializers.CharField(source='get_position_display')

    class Meta:
        model = FootballPlayer
        fields = ('name', 'age', 'height', 'weight', 'nationality', 'team', 'ps', 'url')


class BasketballPlayerSerializer(serializers.ModelSerializer):
    team = serializers.CharField(source='team.name')
    url = serializers.URLField(source='avatar.url')
    ps = serializers.CharField(source='get_position_display')

    class Meta:
        model = BasketballPlayer
        fields = ('name', 'age', 'height', 'weight', 'nationality', 'team', 'ps', 'url')


class FootballMemberSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='avatar.url')

    class Meta:
        model = FootballPlayer
        fields = ('name', 'position', 'url', 'pk')


class BasketballMemberSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='avatar.url')

    class Meta:
        model = FootballPlayer
        fields = ('name', 'position', 'url', 'pk')


class FootballPlayerStatSerializer(serializers.ModelSerializer):
    league_name = serializers.CharField(source='league.name')
    league_pre = serializers.IntegerField(source='league.season_pre')
    league_post = serializers.IntegerField(source='league.season_post')

    class Meta:
        model = FootballPlayerStat
        fields = ('goals', 'assists', 'appearance', 'red_cards', 'yellow_cards', 'best', 'league_name', 'league_pre',
                  'league_post')


class BasketballPlayerStatSerializer(serializers.ModelSerializer):
    league_name = serializers.CharField(source='league.name')
    league_pre = serializers.IntegerField(source='league.season_pre')
    league_post = serializers.IntegerField(source='league.season_post')

    class Meta:
        model = BasketballPlayerStat
        fields = (
            'scores', 'triple_points', 'double_points', 'rebounds', 'max_score_in_one_game', 'best', 'league_name',
            'league_pre', 'league_post')


class TeamSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='avatar.url')
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = Team
        fields = ('url', 'name', 'type', 'pk')


class StaffSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='avatar.url')

    class Meta:
        model = Staff
        fields = ('url', 'name', 'position', 'pk')


class MatchSerializer(serializers.ModelSerializer):
    home_team_name = serializers.CharField(source='home.name')
    away_team_name = serializers.CharField(source='away.name')
    home_team_url = serializers.CharField(source='home.avatar.url')
    away_team_url = serializers.CharField(source='away.avatar.url')

    class Meta:
        model = Match
        fields = ('date', 'stadium', 'week', 'home_score', 'away_score', 'home_team_name', 'away_team_name',
                  'home_team_url', 'away_team_url')


class MatchTileSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    name1 = serializers.CharField(source='home.name')
    name2 = serializers.CharField(source='away.name')
    address1 = serializers.CharField(source='home.avatar.url')
    address2 = serializers.CharField(source='away.avatar.url')
    result = serializers.SerializerMethodField()
    subtitle = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = ('type', 'name1', 'name2', 'address1', 'address2', 'result', 'subtitle', 'pk', 'league', 'week')

    @staticmethod
    def get_type(obj):
        if obj.home.type == 'f':
            return 'فوتبال'
        else:
            return 'بسکتبال'

    @staticmethod
    def get_result(obj):
        return enToPersianNumb(str(obj.away_score)) + '-' + enToPersianNumb(str(obj.home_score))

    @staticmethod
    def get_subtitle(obj):
        return str(obj.date)


class LeagueSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='name')
    address = serializers.URLField(source='picture_link')
    subtitle = serializers.SerializerMethodField()
    rel_url = serializers.SerializerMethodField()

    class Meta:
        model = League
        fields = ('text', 'address', 'subtitle', 'rel_url', 'weeks')

    @staticmethod
    def get_subtitle(obj):
        return enToPersianNumb(str(obj.season_pre)) + '-' + enToPersianNumb(str(obj.season_post))

    @staticmethod
    def get_rel_url(obj):
        return '/league/' + str(obj.pk)


class TeamStatSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name')
    team_avatar = serializers.CharField(source='team.avatar.url')

    class Meta:
        model = TeamStat
        fields = (
            'points', 'matches', 'won', 'drawn', 'lost', 'goals_for', 'goals_against', 'goals_difference', 'team_name',
            'team_avatar')


class CommentSerializer(serializers.ModelSerializer):
    commentBody = serializers.SerializerMethodField()
    commentReplies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('commentBody', 'commentReplies')

    def get_commentBody(self, obj):
        return {
            'userName': obj.user.username,
            'userAvatarUrl': Profile.objects.get(user=obj.user).avatar.url,
            'text': obj.text,
            "time": {
                'year': obj.publish_date.year,
                'month': obj.publish_date.month,
                'day': obj.publish_date.day,
                'second': obj.publish_date.second,
                'minute': obj.publish_date.minute,
                'hour': obj.publish_date.hour,
            },
            "likeCount": obj.likes,
            "dislikeCount": obj.dislikes,
        }

    def get_commentReplies(self, obj):
        replies = []
        for item in list(Reply.objects.filter(comment=obj.pk)):
            replies.append({
                'userName': item.user.username,
                'userAvatarUrl': Profile.objects.get(user=item.user).avatar.url,
                'text': item.text,
                "time": {
                    'year': item.publish_date.year,
                    'month': item.publish_date.month,
                    'day': item.publish_date.day,
                    'second': item.publish_date.second,
                    'minute': item.publish_date.minute,
                    'hour': item.publish_date.hour,
                },
                "likeCount": item.likes,
                "dislikeCount": item.dislikes,
            })
        return replies


class NewsSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    content = serializers.CharField(source='text')
    viewsCount = serializers.IntegerField(source='seen')
    likeCount = serializers.IntegerField(source='likes')
    disLikeCount = serializers.IntegerField(source='dislikes')
    imageUrl = serializers.URLField(source='picture_link')
    tags = serializers.SerializerMethodField()
    resources = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ('title', 'time', 'summary', 'content', 'viewsCount', 'likeCount', 'disLikeCount', 'imageUrl',
                  'tags', 'resources', 'comments')

    def get_time(self, obj):
        return {
            'year': obj.publish_date.year,
            'month': obj.publish_date.month,
            'day': obj.publish_date.day,
            'second': obj.publish_date.second,
            'minute': obj.publish_date.minute,
            'hour': obj.publish_date.hour,
        }

    def get_tags(self, obj):
        tag_names = []
        for item in list(Tag.objects.filter(news=obj.pk)):
            tag_names.append(item.name)
        return tag_names

    def get_resources(self, obj):
        resources_names = []
        for item in list(Source.objects.filter(news=obj.pk)):
            resources_names.append(item.name)
        return resources_names

    def get_comments(self, obj):
        comments = []
        for item in list(Comment.objects.filter(news=obj.pk)):
            print("jdssdsddsfdsdfkjghksdflgh ")
            comments.append(
                comments.append(CommentSerializer(item).data)
            )
        return comments


class NewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class RelatedNewsSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='title')
    address = serializers.URLField(source='picture_link')
    subtitle = serializers.SerializerMethodField()
    rel_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ('text', 'address', 'rel_url', 'subtitle')

    @staticmethod
    def get_rel_url(obj):
        return '/news/' + str(obj.pk)

    @staticmethod
    def get_subtitle(obj):
        return str(obj.publish_date)


class NewsSummarySerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(source='publish_date')
    rel_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ('title', 'time', 'summary', 'rel_url')

    @staticmethod
    def get_rel_url(obj):
        return '/news/' + str(obj.pk)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
