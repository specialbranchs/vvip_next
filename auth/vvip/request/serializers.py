
from vvip.models import Organization,district,thana,Requisition
from rest_framework import serializers

class OrganizationSerializers(serializers.ModelSerializer):
    class Meta:
        model=Organization
        fields='__all__'

class ThanaSrializer(serializers.ModelSerializer):
    class Meta:
        model=thana
        fields='__all__'
class DistrictSrializer(serializers.ModelSerializer):
    thana=ThanaSrializer(many=True)
    class Meta:
        model=district
        fields='__all__'

