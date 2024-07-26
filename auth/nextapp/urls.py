from django.urls import path

from .views import *
# from django_nextjs.views import nextjs_page
from django_nextjs.views import nextjs_page
urlpatterns = [
     path("", django_index, name="django_index"),
]