
from vvip.models import Agency, GrandFatherTemplate,FatherTemplate,SonTemplate,location
from rest_framework import serializers

class AgencySerializers(serializers.ModelSerializer):

    class Meta:
        model=Agency
        fields='__all__'
        depth=1

class SonSerialzers(serializers.ModelSerializer):
 class Meta:
        model=SonTemplate
        fields='__all__'


class FatherSerialzers(serializers.ModelSerializer):
    son=SonSerialzers(many=True)
    class Meta:
        model=FatherTemplate
        fields='__all__'

class GrandFatherSerialzers(serializers.ModelSerializer):
    father=FatherSerialzers(many=True)
    class Meta:
        model=GrandFatherTemplate
        fields='__all__'

class LocationSerialzers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=location
        fields='__all__'
        
