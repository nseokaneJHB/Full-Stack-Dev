from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('api-token-auth/', views.CustomAuthToken.as_view(), name='api_token_auth'),

    path('users/', views.getUsers, name='users'),
    path('user/<str:pk>/', views.getUser, name='user'),

    path('posts/', views.posts, name='posts'),
    path('post/<str:pk>/', views.modifyPost, name='post'),

    path('', views.apiOverview),
]
