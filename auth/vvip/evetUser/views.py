



# Create your views here.

import os
import uuid

from  vvip.evetUser.sendMail import send_email
from  vvip.evetUser.secure import decryption, encryption
from .serializers import EventUserSerializers
from vvip.models import CustomUser as User ,storeAccess
import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class EventWiseUserApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,userId):
       userlist=User.objects.filter(event=userId).order_by('-created')
       serializers=EventUserSerializers(userlist,many=True)
       return Response(serializers.data)

class EventUserAddApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     userlist=User.objects.filter(is_admin=False,is_superuser=False,is_staff=True).order_by('-created')
     serializers=EventUserSerializers(userlist,many=True)
     return Response(serializers.data)
   
    def post(self,request):
       data=request.data
       name=data['name']
       upload=data['upload']
       validate_date=data['validate_date']
       email=data['email']
       phone=data['phone']
       number_of_pass=data['number_of_pass']
       event=data['event']
       agency=data['agency']
       user = str(uuid.uuid4())
      
       if upload == 'null':
          upload=None

       userInstanse=User.objects.create(username=user,name=name,upload=upload
                                  ,validate_date=validate_date,email=email,
                                  phone=phone,number_of_pass=number_of_pass,event_id=event,agency_id=agency,is_staff=True)
       
       characters = string.ascii_letters + string.digits
       password = ''.join(random.choice(characters) for i in range(8))
       print("Random password is:", password)
       userInstanse.set_password(password)
       userInstanse.save()
       store=storeAccess.objects.create(user=userInstanse,access=encryption(password))
       store.save()
     
       serializer=EventUserSerializers(userInstanse)
      
       return Response(serializer.data)
       
    
    def put(self,request):
       data=request.data
       id=data['id']
       name=data['name']
       upload=data['upload']
       validate_date=data['validate_date']
       email=data['email']
       phone=data['phone']
       number_of_pass=data['number_of_pass']
       event=data['event']
       agency=data['agency']
      #  if upload == 'null':
      #     upload=None
       print(data)
       try:
          userIns=User.objects.get(pk=id)
          userIns.name=name
          userIns.phone=phone
          userIns.number_of_pass=number_of_pass
          userIns.validate_date=validate_date
          userIns.email=email
          userIns.event_id=event
          userIns.agency_id=agency
          if upload != 'null':
             if len(userIns.upload)>0:
                os.remove(userIns.upload.path)
             userIns.upload=upload
          userIns.save()
          serializers=EventUserSerializers(userIns)
         
          return Response(serializers.data)
       except User.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          userIns=User.objects.get(pk=data['id'])
          userIns.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except User.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       


class sendMailApiView(APIView):
   permission_classes = [IsAuthenticated]
   def post(self,request):
       postData=request.data
       mailData={
          'email':postData['email'],
           'access':decryption(postData['access']),
           'upload':postData['upload']
       }
       send_email(mailData)
    
       return Response({'data':12})
      