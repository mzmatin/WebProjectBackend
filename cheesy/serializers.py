from rest_framework import serializers
from .models import *


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
        fields = ('scores', 'triple_points', 'double_points', 'rebounds', 'max_score_in_one_game', 'best', 'league_name',
                  'league_pre', 'league_post')
