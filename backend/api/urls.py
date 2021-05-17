from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('dinners', views.DinnerViewSet, basename='dinners')
router.register('users', views.UserViewset, basename='users')
router.register('attends', views.AttendsViewSet, basename='attends')
router.register('rating', views.RatingViewSet, basename='rating')



urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/', views.CustomObtainAuthToken.as_view())
]
