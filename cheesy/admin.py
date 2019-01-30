from django.contrib import admin
from .models import *

# Register your models here.


admin.site.register(Team)
admin.site.register(League)
admin.site.register(FootballPlayer)
admin.site.register(BasketballPlayer)
admin.site.register(FootballPlayerStat)
admin.site.register(BasketballPlayerStat)


