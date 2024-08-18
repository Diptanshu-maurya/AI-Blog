from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class=MyTokenObtainPairSerializer


# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

# class UserResgistrationView(APIView):
#   def post(self,request,format=None):
#     serializer=UserResgistrationSerializers(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#       user=serializer.save()
#       return Response({'msg':'registration Successful'},status=status.HTTP_201_CREATED),
#     return Response({'msg':'Resgistration Success'})
class UserResgistrationView(APIView):
  def post(self,request):
    serializer=UserRegistrationSerializer(data=request.data)
    print("hello")
    if serializer.is_valid():
      user=serializer.save()
      #token=get_tokens_for_user(user)
      user_data=UserRegistrationSerializer(user).data
      print("user",user)
      return Response({"msg":"success","user":user_data})
    
    return Response(serializer.errors)
  
# class UserLoginView(APIView):
#   def post(self,request):
#     #print('request',request)
#     serializer=UserLoginSerializer(data=request.data)
#     print("serializer",serializer)
    
    
#     if serializer.is_valid():
      
#       username = serializer.validated_data.get('username')
#       password = serializer.validated_data.get('password')
      
#       user=authenticate(username=username,password=password)
#       if user:
#         token=get_tokens_for_user(user)
#         user_data=UserLoginSerializer(user).data
        
       
#         return Response({"msg":"login success","token":token,"user":user_data})
#       return Response({"msg":"user does not exits"})
#       #return Response({"msg":"login success"})
#     print(serializer.errors)
#     return Response(serializer.errors)
  
class UserProfileView(APIView):
  permission_classes=[IsAuthenticated]
  def get(self,request):
    serializer=UserProfileSerializer(request.user) 
    return Response(serializer.data)

class UserChangePasswordView(APIView):
  permission_classes=[IsAuthenticated]
  def post(self,request):
    print('user',request.user)
    serializer=UserChangePasswordSerializer(data=request.data,context={'user':request.user})
    if serializer.is_valid():
      return Response({"msg":"password changed successfully"})
    return Response(serializer.errors)
  
class SendPasswordResetEmailView(APIView):
  def post(self,request):
    serializer=SendPasswordResetEmailSerializer(data=request.data)
    if serializer.is_valid():
      return Response({"msg":"password reset link send.please check your email"})
    return Response(serializer.errors)
  
class UserPasswordResetView(APIView):

  def post(self,request,uid,token):
    
    serializer=UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
    print('uid',uid)
    if serializer.is_valid():
      return Response({"msg":"password reset successfully"})
    return Response(serializer.errors)
  

    


  
    