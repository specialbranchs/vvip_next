



# Create your views here.

from .serializers import EventSerializers
from vvip.models import Event,Event_guest

from rest_framework.views import APIView
from rest_framework.response import Response
import json
import datetime
from rest_framework.permissions import IsAuthenticated
class EventAddApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
     now=datetime.datetime.now()
     eventlist=Event.objects.filter(end_date__gte=now)
     serializers=EventSerializers(eventlist,many=True)
     return Response(serializers.data)
    
    def post(self,request):
       data=request.data
       name=data['name']
       logo=data['logo']
       start_date=data['start_date']
       end_date=data['end_date']
       text=data['text']
       remarks=data['remarks']
       venue=data['venue']
       organization=data['organization']
       event_guest=json.loads(data['event_guest'])
       if logo == 'null':
          logo=None

       event=Event.objects.create(name=name,logo=logo
                                  ,start_date=start_date,end_date=end_date,
                                  text=text,remarks=remarks,venue_id=venue,organization_id=organization)
       event.save()
       for guest in event_guest:
          instance=Event_guest.objects.create(event=event,guest_id=guest)
          instance.save()
       
       serializer=EventSerializers(event)
       
       return Response(serializer.data)
       
    
    def put(self,request):
       data=request.data
       id=data['id']
       name=data['name']
       logo=data['logo']
       start_date=data['start_date']
       end_date=data['end_date']
       text=data['text']
       remarks=data['remarks']
       venue=data['venue']
       organization=data['organization']
       event_guest=json.loads(data['event_guest'])
       if logo == 'null':
          logo=None
       try:
          event=Event.objects.get(pk=id)
          event.name=name
          event.text=text
          event.remarks=remarks
          event.start_date=start_date
          event.end_date=end_date
          event.venue_id=venue
          event.organization_id=organization
          event.logo=logo
          event.save()
          serializers=EventSerializers(event)
          return Response(serializers.data)
       except Event.DoesNotExist:
          return Response({"data":'Data not Found'})
       
    def patch(self,request):
       data=request.data
       try:
          event=Event.objects.get(pk=data['id'])
          event.delete()
          return Response({"data":'Deleted Successfully',"delete":True})
          
       except Event.DoesNotExist:
          return Response({"data":'Data not Found',"delete":False})
       


