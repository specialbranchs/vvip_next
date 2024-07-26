



# Create your views here.

from .serializers import DashBoardSerializers
from vvip.models import Event,EventAttendent,CustomUser,sb_attendent,Organization
from django.db.models import Count, OuterRef, Subquery,F
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from rest_framework.permissions import IsAuthenticated
class DashBoardApiView(APIView): # event->user->attendent
    permission_classes = [IsAuthenticated]
    def get(self,request):
     now=datetime.datetime.now()
     totalEvent=Event.objects.filter(end_date__gte=now).count()
     event=Event.objects.all()
     serializers=DashBoardSerializers(event,many=True)
     common_verified=EventAttendent.objects.values('print_status').annotate(
        status=Count('print_status')
     ).order_by()
     sb_verified=sb_attendent.objects.values('print_status').annotate(
        status=Count('print_status')
     ).order_by()

     obj={
        'Event':{
           'totalEvent':totalEvent,
           'common':common_verified,
           'sb':sb_verified,
           'organization':Organization.objects.count()
        },
        'event_pass':serializers.data
     }
     return Response(obj)
    
  

class NumberOfPassApiView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self,request,userId):
      passNumber=CustomUser.objects.get(pk=userId).number_of_pass
      return Response({'pass':passNumber})