



# Create your views here.

from .serializers import AgencySerializers, GrandFatherSerialzers, LocationSerialzers
from vvip.models import Agency,GrandFatherTemplate, location

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class AgencyApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     agencylist=Agency.objects.all()
     serializers=AgencySerializers(agencylist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       agency=Agency.objects.create(name=data['name'])
       agency.remarks=data['remarks']
       agency.grandfather_id=data['grandfather']
       if data['father'] != 0:
          agency.father_id=data['father']
       if data['son'] != 0:
          agency.son_id=data['son']
       agency.save()
       serializers=AgencySerializers(agency)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          agency=Agency.objects.get(pk=data['id'])
          agency.remarks=data['remarks']
          agency.name=data['name']
          agency.save()
          serializers=AgencySerializers(agency)
          return Response(serializers.data)
       except Agency.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          agency=Agency.objects.get(pk=data['id'])
          agency.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Agency.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       


class PassTypeApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request):
      passtype=GrandFatherTemplate.objects.all()
      serializers=GrandFatherSerialzers(passtype,many=True)
      return Response(serializers.data)

class LocationApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request):
      locations=location.objects.all()
      serializers=LocationSerialzers(locations,many=True)
      return Response(serializers.data)
      