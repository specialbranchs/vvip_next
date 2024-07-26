
from vvip.models import Event_guest,Event
from rest_framework import serializers

class Event_GuestSerialzers(serializers.ModelSerializer):
 class Meta:
        model=Event_guest
        exclude=['event']
        depth=2

class EventSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    event_guest=Event_GuestSerialzers(many=True)
    class Meta:
        model=Event
        fields='__all__'
        depth=2
