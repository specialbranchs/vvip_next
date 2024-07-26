



# Create your views here.

from vvip.models import Requisition,sb_attendent,Verification_Status, sb_user_status, sb_verification_status,user_status
from .serializers import EventSBAttendentSerializers, EventSBAttendentUploadSerializers, EventSBAttendentVerificationStatusSerializers,RequisitionSrializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.base import  ContentFile
import base64
from rest_framework.permissions import IsAuthenticated
class EventWiseSBAttendentApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,eventId):
     attendentlist=sb_attendent.objects.filter(event=eventId)
     serializers=EventSBAttendentSerializers(attendentlist,many=True)
     return Response(serializers.data)
    
class EventSBAttendentUploadApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
       data=request.data
       serializer = EventSBAttendentUploadSerializers(data=data)
       if serializer.is_valid():
            serializer.save()
            data = serializer.data
            return Response(data=data)
       return Response(serializer.errors, status=400)
    
    def patch(self,request):
       data=request.data
       try:
          attendent=sb_attendent.objects.get(pk=data['id'])
          attendent.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except sb_attendent.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       


class RequisitionApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request):
      reqlist=Requisition.objects.all()
      serializer=RequisitionSrializer(reqlist,many=True)
      return Response(serializer.data)
   


class EventSBAttendentVerificationStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,userId):
         attendentlist=sb_attendent.objects.filter(user=userId)         
         serializers=EventSBAttendentVerificationStatusSerializers(attendentlist,many=True)
         return Response(serializers.data)

class EventSBAttendentStatusBasedApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,eventId,status):
         attendentlist=sb_attendent.objects.filter(event=eventId,print_status=status)      
         serializers=EventSBAttendentVerificationStatusSerializers(attendentlist,many=True)
         return Response(serializers.data)



class EventSBAttendentSingleVerificationStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      data=request.data
      id=data['id']
     
      try:
         status=sb_verification_status.objects.get(pk=id)
         status.status=data['status']
         status.status_type_id=data['status_type']
         status.approved_user_id=data['approved_user']
         status.save()

      except sb_verification_status.DoesNotExist:
         status=sb_verification_status.objects.create(
            attendent_id=data['attendent']
         )
         status.status=data['status']
         status.status_type_id=data['status_type']
         status.approved_user_id=data['approved_user']
         status.save()
      attendent=sb_attendent.objects.get(pk=status.attendent_id)       
      serializers=EventSBAttendentVerificationStatusSerializers(attendent)
      return Response(serializers.data)
   



class EventSBAttendentUserStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      data=request.data
      id=data['id']
      try:
         status=sb_user_status.objects.get(pk=id)
         status.status=data['status']
       
         status.approved_user_id=data['approved_user']
         status.save()

      except sb_user_status.DoesNotExist:
         status=sb_user_status.objects.create(
            attendent_id=data['attendent']
         )
         status.status=data['status']
         status.approved_user_id=data['approved_user']
         status.save()
      attendent=sb_attendent.objects.get(pk=status.attendent_id)       
      serializers=EventSBAttendentVerificationStatusSerializers(attendent)
      return Response(serializers.data)
   

# 0=pending, 1=printable 2=rejected
class SBPrintStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      id=request.data['id']
      status=request.data['status']
      try:
         attendent=sb_attendent.objects.get(pk=id)
         attendent.print_status=status
         attendent.save()
         return Response({"status":"Status is Changed"})
      except sb_attendent.DoesNotExist:
         return Response({"status":"Data not Exists"})