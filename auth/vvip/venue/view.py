
import os
from django.core import serializers
from django.http import JsonResponse
import json
from django.db.models import Count


from django.shortcuts import render

# Create your views here.

from vvip.models import Venue
from vvip.venue.serializers import VenueSerializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
class VenueApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     venuelist=Venue.objects.all()
     serializers=VenueSerializers(venuelist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       venue=Venue.objects.create(**data)
       venue.save()
       serializers=VenueSerializers(venue)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          venue=Venue.objects.get(pk=data['id'])
          venue.name=data['name']
          venue.venue_short_name=data['venue_short_name']
          venue.remarks=data['remarks']
          venue.save()
          serializers=VenueSerializers(venue)
          return Response(serializers.data)
       except Venue.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          venue=Venue.objects.get(pk=data['id'])
          venue.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Venue.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})