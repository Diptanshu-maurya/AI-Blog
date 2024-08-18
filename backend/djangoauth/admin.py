from django.contrib import admin
# from django.contrib.auth.models import User  # Ensure the correct import
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from djangoauth.models import *




# Register your models here.
# class UserModelAdmin(BaseUserAdmin):
#     # The forms to add and change user instances are handled by the base UserAdmin

#     # The fields to be used in displaying the User model.
#     # These override the definitions on the base UserAdmin
#     # that reference specific fields on auth.User.
#     list_display = ('id', 'email', 'name', 'tc', 'is_admin')
#     list_filter = ('is_admin',)  # Correct list_filter syntax with comma
#     fieldsets = (
#         ('User Credentials', {'fields': ('email', 'password')}),
#         ('Personal info', {'fields': ('name', 'tc')}),
#         ('Permissions', {'fields': ('is_admin',)}),
#     )
#     # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
#     # overrides get_fieldsets to use this attribute when creating a user.
#     add_fieldsets = (
#         (
#             None,
#             {
#                 'classes': ('wide',),
#                 'fields': ('email', 'name', 'tc', 'password1', 'password2'),
#             },
#         ),
#     )
#     search_fields = ('email',)
#     ordering = ('email', 'id')
#     filter_horizontal = ()

# admin.site.register(User, UserModelAdmin)
