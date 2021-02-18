from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout

from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import BlogModel, CommentModel
from .serializer import *


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        "All Posts": "/posts",
    }

    return Response(api_urls)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })


def logOut(request):
    return logout(request)


# User
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def getUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, many=False)

    return Response(serializer.data)


# Post
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def posts(request):

    if request.method == 'GET':
        posts = BlogModel.objects.prefetch_related(
            'commentmodel_set').order_by('-date_created')
        serializer = BlogCommentLikeSerializer(posts, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BlogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


@api_view(['POST', 'GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def modifyPost(request, pk):
    post = BlogModel.objects.get(id=pk)

    if request.method == 'GET':
        serializer = BlogCommentLikeSerializer(instance=post, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = BlogCommentLikeSerializer(
            instance=post, data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    elif request.method == 'DELETE':
        return Response('Deleting post...')


def comments(request, pk):
    pass
