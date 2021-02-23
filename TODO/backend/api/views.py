from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import taskSerializer
from .models import TODO


# View the links available to use for the api
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        "Tasks": "/tasks/",
        "Add Task": "/tasks/",
        "Get, Update, Delete Task": "/task/:id",
    }

    return Response(api_urls)


# View all the TODO Tasks
@api_view(['GET', 'POST'])
def allTasks(request):
    if request.method == 'GET':
        tasks = TODO.objects.all()
        serializer = taskSerializer(tasks, many=True)

    elif request.method == 'POST':
        serializer = taskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

    return Response(serializer.data)


# Get a TODO Task
@api_view(['GET', 'PUT', 'DELETE'])
def getTask(request, pk):
    task = TODO.objects.get(id=pk)
    
    if request.method == 'GET':
        serializer = taskSerializer(instance=task)

    elif request.method == 'PUT':
        serializer = taskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
    elif request.method == 'DELETE':
        task.delete()
        return Response("Deleted succesfully!")

    return Response(serializer.data)