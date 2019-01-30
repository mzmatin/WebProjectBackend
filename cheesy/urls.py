from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from cheesy.views import *

router = routers.DefaultRouter()
router.register(r'football-player', FootballPlayerViewSet)
router.register(r'basketball-player', BasketballPlayerViewSet)
router.register(r'football-player-stat', FootballPlayerStatViewSet)
router.register(r'basketball-player-stat', BasketballPlayerStatViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]