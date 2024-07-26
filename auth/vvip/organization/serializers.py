
from vvip.models import Organization
from rest_framework import serializers

class OrganizationSerializers(serializers.ModelSerializer):
    class Meta:
        model=Organization
        fields='__all__'
