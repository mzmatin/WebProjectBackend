from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *


class FootballPlayerViewSet(viewsets.ModelViewSet):
    queryset = FootballPlayer.objects.all()
    serializer_class = FootballPlayerSerializer
