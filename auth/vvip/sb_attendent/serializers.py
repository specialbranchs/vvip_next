
from vvip.models import FatherTemplate, GrandFatherTemplate, color_template, sb_attendent, sb_user_status, sb_verification_status, user_status, Verification_Type,Requisition,Verification_Status,CustomUser
from rest_framework import serializers

from drf_extra_fields.fields import Base64ImageField
from django.db.models import Q
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','name','designation']

class Verification_StatusSrializer(serializers.ModelSerializer):
    class Meta:
        model=Verification_Status
        exclude=['attendent']
        depth=2

class EventSBAttendentUploadSerializers(serializers.ModelSerializer):
    # vr_status=Verification_StatusSrializer(many=True)
    id = serializers.IntegerField(required=False)
    picture = Base64ImageField(required=False)
    
    class Meta:
        model=sb_attendent
        fields='__all__'
    def create(self,validated_data):
        ins=sb_attendent.objects.create(**validated_data)
        return ins
    
class EventSBAttendentSerializers(serializers.ModelSerializer):
    # vr_status=Verification_StatusSrializer(many=True)
    class Meta:
        model=sb_attendent
        exclude=['user']
        depth=2

class RequisitionSrializer(serializers.ModelSerializer):
    class Meta:
        model=Requisition
        fields='__all__'

class Verification_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Verification_Type
        fields='__all__'

class EventSBAttendentVerificationStatusSerializers(serializers.ModelSerializer):
    vr_status=serializers.SerializerMethodField()
    user_status=serializers.SerializerMethodField()
    printing_status=serializers.SerializerMethodField()
    class Meta:
        model=sb_attendent
        exclude=['user']
        depth=2
    def get_printing_status(self,obj):
        tem={
            "middletitle":"",
            "boundrytitle":"",
            "boundry":"",
            "middle":""
         }
        media=obj.agency
        req=obj.requisition

        if media.grandfather and media.father and media.son:  #security
            if req.name=='Govt':
                tem["boundrytitle"]=media.grandfather.name +" Pass"
                tem['middletitle']=media.father.name
              
                tem["boundry"]=color_template.objects.filter(
                    grandfather_id=media.grandfather.id,father_id=media.father.id,son_id=media.son.id,requisition_id=req.id
                    ).first().color
                tem["middle"]=media.father.color
            else :
                duty=color_template.objects.filter(
                Q(grandfather=GrandFatherTemplate.objects.filter(name='Duty').first()),
                Q(requisition=Requisition.objects.filter(name='Non Govt').first())).first().color

                middle=color_template.objects.filter(
                 Q(grandfather=GrandFatherTemplate.objects.filter(name='Media').first())).first().color
                tem["boundry"]=duty
                tem["middle"]=middle
              
                tem["boundrytitle"]="Duty Pass"
                tem["middletitle"]=media.father.name

        elif media.grandfather and media.father:
            if req.name=='Govt':
                tem["boundry"]=color_template.objects.filter(
                    grandfather_id=media.grandfather.id,father_id=media.father.id,son__isnull=True,requisition_id=req.id
                    ).first().color
                tem["middle"]=media.father.color
                tem["boundrytitle"]="Duty Pass"
                tem["middletitle"]=media.name
                
            else :
                tem["boundry"]=color_template.objects.filter(
                    grandfather_id=media.grandfather.id,father_id=media.father.id,son__isnull=True,requisition_id=req.id
                    ).first().color
                tem["middle"]=media.father.color
                tem["boundrytitle"]="Duty Pass"
                tem["middletitle"]=media.name
           
        elif media.grandfather:
            if req.name=='Govt':
                tem["boundry"]=color_template.objects.filter(
                    grandfather_id=media.grandfather.id,father__isnull=True,son__isnull=True,requisition_id=req.id
                    ).first().color
                tem["middle"]=FatherTemplate.objects.filter(name='Media').first().color
                tem["boundrytitle"]="Duty Pass"
                tem["middletitle"]=req.name
                
            else :
                tem["boundry"]=color_template.objects.filter(
                    grandfather_id=media.grandfather.id,father__isnull=True,son__isnull=True,requisition_id=req.id
                    ).first().color
                tem["middle"]=FatherTemplate.objects.filter(name='Media').first().color
                tem["boundrytitle"]="Duty Pass"
                tem["middletitle"]=req.name
           

        return tem
    def get_vr_status(self,obj):
        vtlist=Verification_Type.objects.all()
        res=[]
        for vt in vtlist:
            try :
              vs=sb_verification_status.objects.get(attendent=obj,status_type=vt)
              res.append({
                      "id":vs.id,
                      "status_type":Verification_TypeSerializer(vt).data,
                      "status":vs.status,
                      "approved_user":UserSerializer(vs.approved_user).data
                      })
            except sb_verification_status.DoesNotExist:
                  res.append({
                      "id":None,
                      "status_type":Verification_TypeSerializer(vt).data,
                      "status":False,
                      "approved_user":None
                      }
                  )

      
        
        return res
    
    def get_user_status(self,obj):
        vslist=sb_user_status.objects.filter(attendent=obj)
        res=[]
        for vs in vslist:
              res.append({
                      "id":vs.id,
                      "status":vs.status,
                      "approved_user":UserSerializer(vs.approved_user).data,
                      })

      
        
        return res
    

