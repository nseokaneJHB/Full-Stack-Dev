from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        write_only_fields = ['password']
            
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id','username']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        # fields = '__all__'
        # read_only_fields = ['user']
        exclude = ['user']
        read_only_fields = ['id']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogModel
        fields = '__all__'
        read_only_fields = ['date_created', 'time_created']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentModel
        fields = '__all__'
        read_only_fields = ['date_created', 'time_created']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = '__all__'


class BlogCommentSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(source='commentmodel_set', many=True, read_only=True)

    class Meta:
        model = BlogModel
        fields = '__all__'
        read_only_fields = ['date_created', 'time_created', 'author']


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(source='profilemodel', many=False)

    class Meta:
        model = User
        exclude = ["password", "last_login", "is_superuser", "is_staff", "is_active", "date_joined", "groups", "user_permissions"]
