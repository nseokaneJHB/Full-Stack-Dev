from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    # Link for authentication
    path('api-token-auth/', views.CustomAuthToken.as_view(), name='api_token_auth'),

    # Link for profile
    path('profile/', views.Profile, name='profile'),

    # Links for users
    path('users/', views.TheUsers, name='users'),
    path('user/<str:pk>/', views.TheUser, name='user'),

    # Links for posts
    path('posts/', views.ThePosts, name='posts'),
    path('post/<str:pk>/', views.ThePost, name='post'),

    # Link for comment
    path('comment/<str:pk>/', views.TheComment, name='comment'),

    # Home_view link
    path('', views.APIOverview, name='home'),
]
