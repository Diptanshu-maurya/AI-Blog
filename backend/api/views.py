from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.contrib.auth.models import User

# Create your views here.
class PostView(APIView):
  def get(self,request):
    post=Post.objects.all()
    serializer=PostSerializer(post,many=True)
    return Response(serializer.data)
  
  def post(self,request):
    
    print('data',request.data)
    
    serializer=PostSerializer(data=request.data)

    if serializer.is_valid():
      serializer.save()
      return Response({'msg':'post is created','data':serializer.data})
    return Response(serializer.errors)
  
class DetailPostView(APIView):

  def get(self,request,pk):
    post=Post.objects.get(id=pk)
    serializer=PostSerializer(post)
    return Response(serializer.data)
    

  
  
class CommentView(APIView):
    def post(self,request):
      serializer=CommentSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response({"msg":"your comment is posted","data":serializer.data})
      return Response(serializer.errors)
  

  
  
  


