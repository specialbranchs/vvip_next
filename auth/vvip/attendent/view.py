



# Create your views here.

from vvip.models import EventAttendent,Requisition,EventAttendent,Verification_Status,user_status,CustomUser
from .serializers import EventAttendentSerializers, EventAttendentVerificationStatusSerializers,RequisitionSrializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.base import  ContentFile
import base64
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
class EventWiseAttendentApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,userId):
     print(userId)
     attendentlist=EventAttendent.objects.filter(user=userId)
     serializers=EventAttendentSerializers(attendentlist,many=True)
     return Response(serializers.data)
    
class EventAttendentApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
       data=request.data
       user=data['user']
       try:
         userObj=CustomUser.objects.get(pk=user)
         sbm=EventAttendent.objects.filter(user_id=user).count()
         if userObj.number_of_pass==sbm:
            return Response({'err':'Limit cross'},status=status.HTTP_429_TOO_MANY_REQUESTS)
      
       except CustomUser.DoesNotExist:
          content = {'err': 'nothing to see here'}
          return Response(content,status=status.HTTP_404_NOT_FOUND)

       
       requisition=data['requisition']
       name_bn=data['name_bn']
       name_en=data['name_en']
       email=data['email']
       phone=data['phone']
       nid=data['nid']
       date_of_birth=data['date_of_birth']
       father_bn=data['father_bn']
       father_en=data['father_en']
       address=data['address']
       village=data['village']
       designation=data['designation']
       district=data['district']
       thana=data['thana']
       attendent=EventAttendent.objects.create(user_id=user,requisition_id=requisition)
       attendent.name_bn=name_bn
       attendent.name_en=name_en
       attendent.email=email
       attendent.phone=phone
       attendent.nid=nid
       attendent.date_of_birth=date_of_birth
       attendent.father_bn=father_bn
       attendent.father_en=father_en
       attendent.address=address
       attendent.village=village
       attendent.designation=designation
       attendent.district_id=district
       attendent.thana_id=thana
       
       pic_str=data['profile']
       sig_str=data['signature']
       profile_name=data['profile_name']
       signature_name=data['signature_name']
       pic = ContentFile(base64.b64decode(pic_str+"===="))
       sig= ContentFile(base64.b64decode(sig_str+"===="))
       attendent.profile.save(profile_name,pic,save=True)
       attendent.signature.save(signature_name,sig,save=True)
       attendent.save()
       serializers=EventAttendentSerializers(attendent)
       return Response(serializers.data)
    
    def put(self,request):
       data=request.data
       try:
          attendent=EventAttendent.objects.get(pk=data['id'])
          attendent.name=data['name']
          attendent.attendent_short_name=data['attendent_short_name']
          attendent.remarks=data['remarks']
          attendent.save()
          serializers=EventAttendentSerializers(attendent)
          return Response(serializers.data)
       except EventAttendent.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          attendent=EventAttendent.objects.get(pk=data['id'])
          attendent.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except EventAttendent.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       


class RequisitionApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request):
      reqlist=Requisition.objects.all()
      serializer=RequisitionSrializer(reqlist,many=True)
      return Response(serializer.data)
   


class EventAttendentVerificationStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,userId):
         attendentlist=EventAttendent.objects.filter(user=userId)         
         serializers=EventAttendentVerificationStatusSerializers(attendentlist,many=True)
         return Response(serializers.data)

class EventAttendentStatusBasedApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,userId,status):
         attendentlist=EventAttendent.objects.filter(user=userId,print_status=status)         
         serializers=EventAttendentVerificationStatusSerializers(attendentlist,many=True)
         return Response(serializers.data)



class EventAttendentSingleVerificationStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      data=request.data
      id=data['id']
      try:
         status=Verification_Status.objects.get(pk=id)
         status.status=data['status']
         status.status_type_id=data['status_type']
         status.approved_user_id=data['approved_user']
         status.save()

      except Verification_Status.DoesNotExist:
         status=Verification_Status.objects.create(
            attendent_id=data['attendent']
         )
         status.status=data['status']
         status.status_type_id=data['status_type']
         status.approved_user_id=data['approved_user']
         status.save()
      attendent=EventAttendent.objects.get(pk=status.attendent_id)       
      serializers=EventAttendentVerificationStatusSerializers(attendent)
      return Response(serializers.data)
   



class EventAttendentUserStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      data=request.data
      id=data['id']
      try:
         status=user_status.objects.get(pk=id)
         status.status=data['status']
       
         status.approved_user_id=data['approved_user']
         status.save()

      except user_status.DoesNotExist:
         status=user_status.objects.create(
            attendent_id=data['attendent']
         )
         status.status=data['status']
         status.approved_user_id=data['approved_user']
         status.save()
      attendent=EventAttendent.objects.get(pk=status.attendent_id)       
      serializers=EventAttendentVerificationStatusSerializers(attendent)
      return Response(serializers.data)
   

# 0=pending, 1=printable 2=rejected
class PrintStatusApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
      id=request.data['id']
      status=request.data['status']
      try:
         attendent=EventAttendent.objects.get(pk=id)
         attendent.print_status=status
         attendent.save()
         return Response({"status":"Status is Changed"})
      except EventAttendent.DoesNotExist:
         return Response({"status":"Data not Exists"})