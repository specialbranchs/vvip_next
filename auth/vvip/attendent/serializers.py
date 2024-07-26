
from vvip.event.serializers import EventSerializers
from vvip.models import FatherTemplate, GrandFatherTemplate, color_template, user_status, Verification_Type,Requisition,EventAttendent,Verification_Status,CustomUser
from rest_framework import serializers
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
class EventAttendentSerializers(serializers.ModelSerializer):
    vr_status=Verification_StatusSrializer(many=True)
    class Meta:
        model=EventAttendent
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

class EventAttendentVerificationStatusSerializers(serializers.ModelSerializer):
    vr_status=serializers.SerializerMethodField()
    user_status=serializers.SerializerMethodField()
    printing_status=serializers.SerializerMethodField()
    event=serializers.SerializerMethodField()
    class Meta:
        model=EventAttendent
        exclude=['user']
        depth=2
    def get_event(self,obj):
        user=CustomUser.objects.get(pk=obj.user.id)
        return EventSerializers(user.event).data
    
    def get_printing_status(self,obj):
        user=CustomUser.objects.get(pk=obj.user.id)
        tem={
            "middletitle":"",
            "boundrytitle":"",
            "boundry":"",
            "middle":""
         }
        media=user.agency
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
                Q(grandfather_id=GrandFatherTemplate.objects.filter(name='Duty').first().id),
                Q(requisition_id=Requisition.objects.filter(name='Non Govt').first().id)).first().color

                middle=color_template.objects.filter(
                 Q(grandfather_id=GrandFatherTemplate.objects.filter(name='Media').first().id)).first().color
                tem["boundry"]=duty.color
                tem["middle"]=middle.color
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
              vs=Verification_Status.objects.get(attendent=obj,status_type=vt)
              res.append({
                      "id":vs.id,
                      "status_type":Verification_TypeSerializer(vt).data,
                      "status":vs.status,
                      "approved_user":UserSerializer(vs.approved_user).data
                      })
            except Verification_Status.DoesNotExist:
                  res.append({
                      "id":None,
                      "status_type":Verification_TypeSerializer(vt).data,
                      "status":False,
                      "approved_user":None
                      }
                  )

      
        
        return res
    
    def get_user_status(self,obj):
        vslist=user_status.objects.filter(attendent=obj)
        res=[]
        for vs in vslist:
              res.append({
                      "id":vs.id,
                      "status":vs.status,
                      "approved_user":UserSerializer(vs.approved_user).data,
                      })

      
        
        return res
    

