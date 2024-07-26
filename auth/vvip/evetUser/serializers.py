
from vvip.models import CustomUser,storeAccess,EventAttendent
from rest_framework import serializers

class AccessSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model=storeAccess
        fields='__all__'
     

class EventUserSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    access=AccessSerializer(many=True)
    quota=serializers.SerializerMethodField()
    class Meta:
        model=CustomUser
        # fields='__all__'
        exclude=['password']
        depth=2

    def get_quota(self,obj):
        count=EventAttendent.objects.filter(user=obj).count()
        return count
