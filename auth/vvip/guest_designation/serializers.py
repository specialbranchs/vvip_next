
from vvip.models import Guest_designations
from rest_framework import serializers

class Guest_designationsSerializers(serializers.ModelSerializer):

    class Meta:
        model=Guest_designations
        fields='__all__'
        depth=1
