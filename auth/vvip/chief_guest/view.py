
import os
from django.core import serializers
from django.http import JsonResponse
import json
from django.db.models import Count


from django.shortcuts import render

# Create your views here.

from vvip.chief_guest.serializers import Chief_guestSerializers
from vvip.models import Chief_guest

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class Chief_guestApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     guestlist=Chief_guest.objects.all()
     serializers=Chief_guestSerializers(guestlist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       guest=Chief_guest.objects.create(**data)
       guest.save()
       serializers=Chief_guestSerializers(guest)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          guest=Chief_guest.objects.get(pk=data['id'])
          guest.name=data['name']
          guest.designation_id=data['designation_id']
          guest.save()
          serializers=Chief_guestSerializers(guest)
          return Response(serializers.data)
       except Chief_guest.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          guest=Chief_guest.objects.get(pk=data['id'])
          guest.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Chief_guest.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})