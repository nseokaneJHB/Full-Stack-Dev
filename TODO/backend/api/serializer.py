from .models import TODO
from rest_framework import serializers


# Serializer class to save and view data in an api mode
class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
        