
from django.urls import path,include
from djangoauth.views import *
from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)


urlpatterns = [
    
    path('register/',UserResgistrationView.as_view(),name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # path('login/',UserLoginView.as_view(),name='login'),
    path('profile/',UserProfileView.as_view(),name='login'),
    path('changePassword/',UserChangePasswordView.as_view(),name='changePassword'),
    path('send-password-reset-email/',SendPasswordResetEmailView.as_view(),name='changePassword'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password-reset/<uid>/<token>/',UserPasswordResetView.as_view(),name='changePassword'),

]