



# Create your views here.

from .serializers import ColorTemplateSerializers
from vvip.models import color_template

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class ColorTemplateApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     agencylist=color_template.objects.all()
     serializers=ColorTemplateSerializers(agencylist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       agency=color_template.objects.create(color=data['color'])
       agency.requisition_id=data['requisition']
       agency.grandfather_id=data['grandfather']
       if data['father'] != 0:
          agency.father_id=data['father']
       if data['son'] != 0:
          agency.son_id=data['son']
       agency.save()
       serializers=ColorTemplateSerializers(agency)
       return Response(serializers.data)


    def put(self,request):
       data=request.data
       try:
          agency=color_template.objects.get(pk=data['id'])
          agency.color=data['color']
          agency.save()
          serializers=ColorTemplateSerializers(agency)
          return Response(serializers.data)
       
       except color_template.DoesNotExist:
          return Response({"data":'Data not Found'})
       

    def patch(self,request):
       data=request.data
       try:
          agency=color_template.objects.get(pk=data['id'])
          agency.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except color_template.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       

