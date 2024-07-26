
from vvip.models import Venue
from rest_framework import serializers

class VenueSerializers(serializers.ModelSerializer):
    class Meta:
        model=Venue
        fields='__all__'
