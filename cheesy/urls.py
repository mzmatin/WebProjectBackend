from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

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
router.register(r'token-auth', obtain_jwt_token),
router.register(r'current_user', current_user),
router.register(r'users', UserList),
router.register(r'send_mail', SendMail),
router.register(r'auth_mail', AuthMail),

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]