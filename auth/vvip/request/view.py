



# Create your views here.

from vvip.models import Organization,district
from vvip.request.serializers import OrganizationSerializers,DistrictSrializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class PendingRequestApiView(APIView):
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
       

class AddressApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request):
      districtlist=district.objects.all()
      serializer=DistrictSrializer(districtlist,many=True)
      return Response(serializer.data)


