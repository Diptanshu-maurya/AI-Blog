from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class CommentSerializer(serializers.ModelSerializer):
  user=serializers.StringRelatedField(read_only=True)
  class Meta:
    model=Comment
    fields='__all__'





class PostSerializer(serializers.ModelSerializer):
  user=serializers.StringRelatedField(read_only=True)
  comments=CommentSerializer(many=True,read_only=True)
  
  class Meta:
    model=Post
    fields=['id','title','content','category','comments','user']

