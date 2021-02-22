from django.urls import path
from . import views


# Routes
urlpatterns = [
    path('', views.apiOverview, name='api'),
    path('tasks/', views.allTasks, name='tasks'),

    path('add', views.addTask, name='add-task'),
    
    path('task/<str:pk>', views.getTask, name='task'),
]
