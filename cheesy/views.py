from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import F
from django.db.models import Q

from django.contrib.sites import requests
from django.core.mail import send_mail
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from WebProject import settings
from .models import *
from .serializers import *
import requests
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendMail(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        userPassword = request.data['password']
        userEmail = request.data['userEmail']
        userName = request.data['username']
        userVerifyToken = get_random_string(20)

        UnAuthUser(
            userName=userName,
            password=userPassword,
            email=userEmail,
            token=userVerifyToken
        ).save()

        authLink = 'http://localhost:8000/signupres/?name=' + userName + '&email=' + userEmail + '&pass=' + userPassword + '&token=' + userVerifyToken
        msg_plain = render_to_string('authMail.txt', {'link': authLink})
        msg_html = render_to_string('authMail.html', {'link': authLink})

        send_mail(
            'Cheesy news account verification',
            msg_plain,
            settings.EMAIL_HOST_USER,
            [userEmail],
            html_message=msg_html,
            fail_silently=False
        )
        return Response("{\"status\":\"success\"}", status=status.HTTP_200_OK)


class AuthMail(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            user = UnAuthUser.objects.get(
                userName=request.data['name'],
                email=request.data['email'],
                token=request.data['token'],
                password=request.data['pass']
            )
            userData = {
                'username': user.userName,
                'password': user.password,
                'email': user.email
            }
            r = requests.post('http://127.0.0.1:8000/api/users/', data=userData)
            if r.status_code == 201:
                return Response("{\"success\":true,\"status\":" + str(r.status_code) + "}")
            else:
                return Response("{\"success\":false,\"status\":" + str(r.status_code) + "}")
        except UnAuthUser.DoesNotExist:
            return Response("{\"success\":false}")


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
        league = request.GET.get('league', None)
        week = request.GET.get('week', None)
        queryset = Match.objects.all().order_by('-date')
        if league and week:
            queryset = queryset.filter(Q(league=league) & Q(week=week))
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


class TeamStatViewSet(viewsets.ModelViewSet):
    queryset = TeamStat.objects.all()
    serializer_class = TeamStatSerializer

    def list(self, request, *args, **kwargs):
        league = request.GET.get('league', None)
        queryset = TeamStat.objects.all()
        if league:
            queryset = queryset.filter(Q(league=league)).order_by('-points')
        serial = TeamStatSerializer(queryset, many=True)
        return Response(data=serial.data)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
