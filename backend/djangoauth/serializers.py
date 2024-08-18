from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import *
from django.contrib.auth.models import User 

# class UserResgistrationSerializers(serializers.Serializer):
 # password2=serializers.CharField(styles=   {'input_type':'password'},write_only=True)
#   class Meta:
#     model=User
#     fields=['email','name','password','password2','tc']
#     extra_kwargs={
#       'password':{'write_only':True}
#     }


#   def validate(self, attrs):
#     password=attrs.get('password')
#     password2=attrs.get('password2')
#     if password!=password2:
#       raise serializers.ValidationError('password and confirm password not equal')
#     return attrs
  
#   def create(self,validate_data):
#     return User.objects.create_user(**validate_data)

class UserRegistrationSerializer(serializers.ModelSerializer):
  #password2=serializers.CharField(style={'input_type':'password'},write_only=True)
  class Meta:
    model=User
    fields=['email','username','password']
    extra_kwargs={
      'password':{'write_only':True},
      'email': {'required': True}
      }
  # def validate(self, attrs):
  #   password=attrs.get('password')
  #   password2=attrs.get('password2')
  #   if password != password2:
  #     raise serializers.ValidationError("pasword and confirm password does not match")
  #   return attrs
  def create(self, validated_data):
    return User.objects.create_user(**validated_data)
  
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

  # def validate(self, attrs):
  #   print('inside validate')
  #   email=attrs.get('email')
  #   password=attrs.get('password')
  #   user=authenticate(email=email,password=password)
  #   if user:
  #     return user
  #   raise serializers.ValidationError("user does not exits")

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields=['id','email','username']

class UserChangePasswordSerializer(serializers.Serializer):
  password=serializers.CharField(max_length=255,style=   {'input_type':'password'},write_only=True)
  password2=serializers.CharField(max_length=255,style=   {'input_type':'password'},write_only=True)
  # class Meta:
  #   fields=['password','password2']

  def validate(self, attrs):
    password=attrs.get('password')
    password2=attrs.get('password2')
    user=self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("pasword and confirm password does not match")
    user.set_password(password)
    user.save()
    return attrs
  
class SendPasswordResetEmailSerializer(serializers.Serializer):
  email=serializers.EmailField(max_length=225)
  class Meta:
    fields=['email']
  
  def validate(self, attrs):
    email=attrs.get('email')
    if User.objects.filter(email=email).exists():
      user=User.objects.get(email=email)
      uid=urlsafe_base64_encode(force_bytes(user.id))
      token=PasswordResetTokenGenerator().make_token(user)
      link='http://localhost:3000/api/user/reset/'+uid+'/'+token
      body='click the link to reset your password'+link
      data={
        'subject':'reset your password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      print(data)
    else:
      raise serializers.ValidationError("you are not register")
    return super().validate(attrs)

class UserPasswordResetSerializer(serializers.Serializer):
  password=serializers.CharField(max_length=255,style=   {'input_type':'password'},write_only=True)
  password2=serializers.CharField(max_length=255,style=   {'input_type':'password'},write_only=True)
  # class Meta:
  #   fields=['password','password2']

  def validate(self, attrs):
  #  try:
     password=attrs.get('password')
     password2=attrs.get('password2')
     uid=self.context.get('uid')
     token=self.context.get('token')
     print("uid",uid)
     if password != password2:
       raise serializers.ValidationError("pasword and confirm password does not match")
     id = smart_str(urlsafe_base64_decode(uid))
     user = User.objects.get(id=id)
            
     if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not valid or expired')

     user.set_password(password)
     user.save()
     return attrs
  #  except DjangoUnicodeDecodeError as identifier:
  #    PasswordResetTokenGenerator().check_token(user,token)
  #    raise serializers.ValidationError("token is not valid")

# class NotesSerializer(serializers.ModelSerializer):
#   class Meta:
#     model=Notes
#     fields=['id','user','content']
     
