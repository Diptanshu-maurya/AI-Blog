
from django.urls import path
from .views import *

urlpatterns = [
    path('all-post/',PostView.as_view()),
    path('comment/',CommentView.as_view()),
    path('detailPost/<int:pk>',DetailPostView.as_view()),
    
]
