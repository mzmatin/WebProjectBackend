from rest_framework import viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *


class FootballPlayerViewSet(viewsets.ModelViewSet):
    queryset = FootballPlayer.objects.all()
    serializer_class = FootballPlayerSerializer


class BasketballPlayerViewSet(viewsets.ModelViewSet):
    queryset = BasketballPlayer.objects.all()
    serializer_class = BasketballPlayerSerializer


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
