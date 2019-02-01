from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from . import views
from cheesy.views import *

router = routers.DefaultRouter()
router.register(r'football-player', FootballPlayerViewSet)
router.register(r'basketball-player', BasketballPlayerViewSet)
router.register(r'football-player-stat', FootballPlayerStatViewSet)
router.register(r'basketball-player-stat', BasketballPlayerStatViewSet)
router.register(r'team', TeamViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'match-tile', MatchTileViewSet)
router.register(r'football-member', FootballMemberViewSet)
router.register(r'basketball-member', BasketballMemberViewSet)
router.register(r'league', LeagueViewSet)
router.register(r'team-stat', TeamStatViewSet)
router.register(r'news', NewsViewSet)
router.register(r'comment', CommentViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    url(r'^', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('send_mail/', views.SendMail.as_view()),
    path('auth_mail/', views.AuthMail.as_view()),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]