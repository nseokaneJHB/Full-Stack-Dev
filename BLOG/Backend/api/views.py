from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout

from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import BlogModel, CommentModel, ProfileModel
from .serializer import *


@api_view(['GET'])
def APIOverview(request):
    api_urls = {
        "LOGIN TO GET A TOKEN": "/api-token-auth",
        "GET, UPDATE, DELETE Post": "/post/id",
        "GET, UPDATE, DELETE User": "/user/id",
        "All Posts": "/posts",
        "All Users": "/users",
    }

    return Response(api_urls)


# ================================================ Signin & Signout ==================================================
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


def Logout(request):
    return logout(request)
# ================================================ Signin & Signout ==================================================

# ================================================ My Profile ==================================================
@api_view(['GET', 'PUT'])
@permission_classes((IsAuthenticated,))
def Profile(request):
    user = User.objects.get(id=request.user.id)

    if request.method == 'GET':
        serializer = UserProfileSerializer(instance=user, many=False)
        return Response(serializer.data, status=201)
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(instance=user)
        serializer1 = UserSerializer(data=request.data)
        serializer2 = ProfileSerializer(data=request.data)
        if serializer1.is_valid():
            if serializer2.is_valid():
                serializer1.save()
                serializer2.save()

            return Response(serializer.data, status=201)

        else:
            return Response(serializer1.errors, status=400)

    else:
        return Response(serializer.errors, status=400)
# ================================================ My Profile ==================================================

# ================================================ User ==================================================
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def TheUsers(request):
    users = User.objects.all()

    if request.method == 'GET':
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=201)

    # elif request.method == 'POST':
    #     serializer = CreateUserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)

    #     else:
    #         return Response(serializer.errors, status=400)
    
    else:
        return Response(serializer.error, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def TheUser(request, pk):
    user = User.objects.get(id=pk)

    if request.method == 'GET':
        serializer = UserSerializer(instance=user, many=False)
        return Response(serializer.data, status=201)

    elif request.method == 'PUT': 
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        else:
            return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return Response('User deleted!', status=201)
    
    else:
        return Response(serializer.error, status=400)
# ================================================ User ==================================================

# ================================================ Post ==================================================
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def ThePosts(request):
    user = request.user.profilemodel

    if request.method == 'GET':
        posts = BlogModel.objects.prefetch_related('commentmodel_set').order_by('-date_created', '-time_created')
        serializer = BlogCommentSerializer(posts, many=True)
        return Response(serializer.data, status=201)

    elif request.method == 'POST':
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        else:
            return Response(serializer.errors, status=400)
    
    else:
        return Response(serializer.error, status=400)


@api_view(['GET', 'PUT', 'DELETE', 'POST'])
# @permission_classes((IsAuthenticated,))
def ThePost(request, pk):
    post = BlogModel.objects.get(id=pk)

    if request.method == 'GET':
        serializer = BlogCommentSerializer(instance=post, many=False)
        return Response(serializer.data, status=201)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        else:
            return Response(serializer.errors, status=400)

    elif request.method == 'PUT': 
        serializer = BlogCommentSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        else:
            return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        post.delete()
        return Response('Post deleted!', status=201)

    else:
        return Response(serializer.errors, status=400)
# ================================================ Post ==================================================

# ================================================ Comment ==================================================
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def TheComment(request, pk):
    comment = CommentModel.objects.get(id=pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data, status=201)

    elif request.method == 'PUT':
        serializer = CommentSerializer(instance=comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        else:
            return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        comment.delete()
        return Response('Comment deleted!', status=201)

    else:
        return Response(serializer.errors, status=400)
# ================================================ Comment ==================================================