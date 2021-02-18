from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}, 'id': {'read_only': True}}


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogModel
        fields = ['id', 'post', 'likes', 'author']
        extra_kwargs = {'date_created': {'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentModel
        fields = '__all__'
        extra_kwargs = {'date_created': {'read_only': True}}


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = '__all__'


class UserPostSerializer(serializers.ModelSerializer):
    posts = BlogSerializer(source='blogmodel_set', many=True)

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        exclude = ['last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions']


class BlogCommentLikeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(source='commentmodel_set', many=True)

    class Meta:
        model = BlogModel
        fields = '__all__'
        extra_kwargs = {'date_created': {'read_only': True}}
