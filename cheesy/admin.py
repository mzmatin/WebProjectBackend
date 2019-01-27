from django.contrib import admin
from .models import FootballPlayer, BasketballPlayer, Team

# Register your models here.


admin.site.register(Team)
admin.site.register(FootballPlayer)
admin.site.register(BasketballPlayer)


