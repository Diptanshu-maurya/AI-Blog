from django.core.mail import EmailMessage
import os
from django.conf import settings


class Util:
  @staticmethod
  def send_email(data):
    email=EmailMessage(
      subject=data.get('subject'),
      body=data.get('body'),
      from_email=os.environ.get('EMAIL_FROM'),
      to=[data.get('to_email')]

    )
    email.send()
# class Util:
#     @staticmethod
#     def send_email(data):
#         try:
#             email = EmailMessage(
#                 subject=data.get('subject', ''),
#                 body=data.get('body', ''),
#                 from_email=settings.EMAIL_HOST_USER,  # Use Django settings
#                 to=[data.get('to_email', '')]
#             )
#             email.send(fail_silently=False)  # fail_silently=False will raise an error if sending fails
#         except Exception as e:
#             # Log the error or handle it as needed
#             print(f"An error occurred: {e}")