
from vvip.models import Event_guest,Event,CustomUser, EventAttendent,sb_attendent
from rest_framework import serializers

from django.db.models import Count, OuterRef, Subquery,F

class DashBoardSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    event_pass=serializers.SerializerMethodField()

    event_title=serializers.SerializerMethodField()
    sb_pass=serializers.SerializerMethodField()
    class Meta:
        model=Event
        fields=['id','event_title','event_pass','sb_pass']

    def get_event_pass(self,obj):
          
        user=CustomUser.objects.filter(
            pk__in=Subquery(EventAttendent.objects.values('user_id')),
            event_id=obj.id
            ).annotate(
                event_pass=Count('eventattendent')).values('event_pass').first()
        if user:
            return user['event_pass']
        return 0
    def get_event_title(self,obj):
        
        return obj.name
    def get_sb_pass(self,obj):
        sb_pass=sb_attendent.objects.filter(event_id=obj.id).count()
        return sb_pass