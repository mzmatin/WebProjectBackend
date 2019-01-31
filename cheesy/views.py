from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import F
from django.db.models import Q

from .models import *
from .serializers import *


class FootballPlayerViewSet(viewsets.ModelViewSet):
    queryset = FootballPlayer.objects.all()
    serializer_class = FootballPlayerSerializer


class FootballMemberViewSet(viewsets.ModelViewSet):
    queryset = FootballPlayer.objects.all()
    serializer_class = FootballMemberSerializer

    def list(self, request, *args, **kwargs):
        team_id = request.GET.get('team', None)
        queryset = FootballPlayer.objects.all()
        if team_id:
            queryset = queryset.filter(team=team_id)
        serial = FootballMemberSerializer(queryset, many=True)
        return Response(data=serial.data)


class BasketballPlayerViewSet(viewsets.ModelViewSet):
    queryset = BasketballPlayer.objects.all()
    serializer_class = BasketballPlayerSerializer


class BasketballMemberViewSet(viewsets.ModelViewSet):
    queryset = BasketballPlayer.objects.all()
    serializer_class = BasketballMemberSerializer

    def list(self, request, *args, **kwargs):
        team_id = request.GET.get('team', None)
        queryset = BasketballPlayer.objects.all()
        if team_id:
            queryset = queryset.filter(team=team_id)
        serial = BasketballMemberSerializer(queryset, many=True)
        return Response(data=serial.data)


class FootballPlayerStatViewSet(viewsets.ModelViewSet):
    queryset = FootballPlayerStat.objects.all()
    serializer_class = FootballPlayerStatSerializer

    def list(self, request, *args, **kwargs):
        player_id = request.GET.get('player', None)
        queryset = FootballPlayerStat.objects.all()
        if player_id:
            queryset = queryset.filter(player=player_id)
        serial = FootballPlayerStatSerializer(queryset, many=True)
        return Response(data=serial.data)


class BasketballPlayerStatViewSet(viewsets.ModelViewSet):
    queryset = BasketballPlayerStat.objects.all()
    serializer_class = BasketballPlayerStatSerializer

    def list(self, request, *args, **kwargs):
        player_id = request.GET.get('player', None)
        queryset = BasketballPlayerStat.objects.all()
        if player_id:
            queryset = queryset.filter(player=player_id)
        serial = BasketballPlayerStatSerializer(queryset, many=True)
        return Response(data=serial.data)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def list(self, request, *args, **kwargs):
        team_id = request.GET.get('team', None)
        queryset = Staff.objects.all()
        if team_id:
            queryset = queryset.filter(team=team_id)
        serial = StaffSerializer(queryset, many=True)
        return Response(data=serial.data)


class MatchTileViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchTileSerializer

    def list(self, request, *args, **kwargs):
        team1 = request.GET.get('team1', None)
        team2 = request.GET.get('team2', None)
        win = request.GET.get('win', None)
        lost = request.GET.get('lost', None)
        drawn = request.GET.get('drawn', None)
        queryset = Match.objects.all().order_by('-date')
        if team1:
            queryset = queryset.filter(Q(home=team1) | Q(away=team1)).order_by('-date')
            if team2:
                queryset = queryset.filter(Q(home__name=team2) | Q(away__name=team2))
            if win:
                queryset = queryset.filter((Q(home=team1) & Q(home_score__gt=F('away_score'))) |
                                           (Q(away=team1) & Q(away_score__gt=F('home_score'))))
            elif drawn:
                queryset = queryset.filter((Q(home=team1) & Q(home_score__exact=F('away_score'))) |
                                           (Q(away=team1) & Q(away_score__exact=F('home_score'))))
            elif lost:
                queryset = queryset.filter((Q(home=team1) & Q(home_score__lt=F('away_score'))) |
                                           (Q(away=team1) & Q(away_score__lt=F('home_score'))))

        serial = MatchTileSerializer(queryset, many=True)
        return Response(data=serial.data)


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

    def list(self, request, *args, **kwargs):
        current_year = request.GET.get('current', None)
        year = request.GET.get('year', None)
        archive = request.GET.get('archive', None)
        queryset = League.objects.all()
        if current_year:
            queryset = queryset.filter(season_pre__exact=current_year)
        if year:
            queryset = queryset.filter(Q(season_pre=year) | Q(season_post=year))
        if archive:
            queryset = queryset.filter(Q(season_post__lte=archive))
        serial = LeagueSerializer(queryset, many=True)
        return Response(data=serial.data)
