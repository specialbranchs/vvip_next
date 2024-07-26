
import os
from django.core import serializers
from django.http import JsonResponse
import json
from django.db.models import Count


from django.shortcuts import render

# Create your views here.

from vvip.models import Organization
from vvip.organization.serializers import OrganizationSerializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class OrganizationApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     organizationlist=Organization.objects.all()
     serializers=OrganizationSerializers(organizationlist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       organization=Organization.objects.create(**data)
       organization.save()
       serializers=OrganizationSerializers(organization)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          organization=Organization.objects.get(pk=data['id'])
          organization.name=data['name']
          organization.organization_short_name=data['organization_short_name']
          organization.remarks=data['remarks']
          organization.save()
          serializers=OrganizationSerializers(organization)
          return Response(serializers.data)
       except Organization.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          organization=Organization.objects.get(pk=data['id'])
          organization.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Organization.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})