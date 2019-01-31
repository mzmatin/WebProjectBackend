from rest_framework import serializers
from .models import *
from persian import enToPersianNumb


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
        fields = ('type', 'name1', 'name2', 'address1', 'address2', 'result', 'subtitle', 'pk')

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
        fields = ('text', 'address', 'subtitle', 'rel_url')

    @staticmethod
    def get_subtitle(obj):
        return enToPersianNumb(str(obj.season_pre)) + '-' + enToPersianNumb(str(obj.season_post))

    @staticmethod
    def get_rel_url(obj):
        return '/league/' + str(obj.pk)
