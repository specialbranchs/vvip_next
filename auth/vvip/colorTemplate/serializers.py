
from vvip.models import color_template,GrandFatherTemplate,Requisition
from rest_framework import serializers
from django.db.models import Q
class ColorTemplateSerializers(serializers.ModelSerializer):
    template=serializers.SerializerMethodField()
    class Meta:
        model=color_template
        fields='__all__'
        depth=1

    def get_template(self,obj):
        tem={
            "boundry":"",
            "middle":""
        }
        if obj.grandfather and obj.father and obj.son:  #security
            if obj.requisition.name=='Govt':
                tem["boundry"]=obj.color
                tem["middle"]=obj.father.color
            else :
                duty=color_template.objects.filter(
                Q(grandfather_id=GrandFatherTemplate.objects.filter(name='Duty').first().id),
                Q(requisition_id=Requisition.objects.filter(name='Non Govt').first().id)).first()

                middle=color_template.objects.filter(
                 Q(grandfather_id=GrandFatherTemplate.objects.filter(name='Media').first().id)).first()
                tem["boundry"]=duty.color
                tem["middle"]=middle.color
        elif obj.grandfather and obj.father:
            if obj.requisition.name=='Govt':
                tem["boundry"]=obj.color
                tem["middle"]=obj.father.color
            else :
                tem["boundry"]=obj.color
                tem["middle"]=obj.father.color

           
        elif obj.grandfather and obj.requisition:
            middle=color_template.objects.filter(
                 Q(grandfather_id=GrandFatherTemplate.objects.filter(name='Media').first().id)).first()
            tem["boundry"]=obj.color
            tem["middle"]=middle.color


        return tem  
    
