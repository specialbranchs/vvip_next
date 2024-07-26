
from vvip.models import Chief_guest
from rest_framework import serializers

class Chief_guestSerializers(serializers.ModelSerializer):

    class Meta:
        model=Chief_guest
        fields='__all__'
        depth=2
