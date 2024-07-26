
import os
from django.core import serializers
from django.http import JsonResponse
import json
from django.db.models import Count


from django.shortcuts import render

# Create your views here.

from vvip.guest_designation.serializers import Guest_designationsSerializers
from vvip.models import Guest_designations

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class Guest_designationsApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     designationslist=Guest_designations.objects.all()
     serializers=Guest_designationsSerializers(designationslist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       designations=Guest_designations.objects.create(**data)
       designations.save()
       serializers=Guest_designationsSerializers(designations)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          designations=Guest_designations.objects.get(pk=data['id'])
          designations.name=data['name']
          designations.country_id=data['country_id']
          designations.save()
          serializers=Guest_designationsSerializers(designations)
          return Response(serializers.data)
       except Guest_designations.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          designations=Guest_designations.objects.get(pk=data['id'])
          designations.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Guest_designations.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})