from rest_framework import serializers
from .models import *


class FootballPlayerSerializer(serializers.ModelSerializer):
    team = serializers.CharField(source='team.name')
    class Meta:
        model = FootballPlayer
        fields = ('name', 'age', 'height', 'weight', 'nationality', 'team', 'position')
