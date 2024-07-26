
from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class division(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    bn_name=models.CharField(max_length=255,null=True,blank=True)
    url=models.CharField(max_length=255,null=True,blank=True)

    def _str_(self):
      return "{}".format(self.id)
    
class district(models.Model):
    division=models.ForeignKey(division,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=255,null=True,blank=True)
    bn_name=models.CharField(max_length=255,null=True,blank=True)

    @property
    def thana(self):
        return self.thana_set.all()
    
    def _str_(self):
      return "{}".format(self.id)
    
class thana(models.Model):
    district=models.ForeignKey(district,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=255,null=True,blank=True)
    bn_name=models.CharField(max_length=255,null=True,blank=True)
    
    def _str_(self):
      return "{}".format(self.id)


class Venue(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    venue_short_name=models.CharField(max_length=255,null=True,blank=True)
    remarks=models.TextField(null=True,blank=True)
    created =models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class Organization(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    organization_short_name=models.CharField(max_length=255,null=True,blank=True)
    remarks=models.TextField(null=True,blank=True)
    created =models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Country(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    created =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Guest_designations(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    country=models.ForeignKey(Country,on_delete=models.CASCADE,blank=True,null=True)
    created =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Chief_guest(models.Model):
    designation=models.ForeignKey(Guest_designations,on_delete=models.CASCADE,blank=True,null=True)
    name=models.CharField(max_length=255,null=True,blank=True)
    remarks=models.CharField(max_length=255,null=True,blank=True)
    created =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    



        

class Security_agency_type(models.Model):
    name=models.CharField(max_length=255)
    color=models.CharField(max_length=255)
    created =models.DateTimeField(auto_now_add=True)

 
    
    def __str__(self):
        return self.name
    
    @property
    def agency(self):
        return self.agency_type_set.all()
    
    
class Agency_type(models.Model):
    security_agency_type=models.ForeignKey(Security_agency_type,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=255)
    created =models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class GrandFatherTemplate(models.Model):   #security 
     name=models.CharField(max_length=255)
     created =models.DateTimeField(auto_now_add=True)

     @property
     def father(self):
         return self.fathertemplate_set.all()
     def __str__(self):
        return self.name

class FatherTemplate(models.Model):   # sb
     grandfather=models.ForeignKey(GrandFatherTemplate,on_delete=models.CASCADE,null=True,blank=True,)
     name=models.CharField(max_length=255)
     color=models.CharField(max_length=255)
     created =models.DateTimeField(auto_now_add=True)

     @property
     def son(self):
         return self.sontemplate_set.all()
     def __str__(self):
        return self.name

class SonTemplate(models.Model): # inside outside
     father=models.ForeignKey(FatherTemplate,on_delete=models.CASCADE,null=True,blank=True,)
     name=models.CharField(max_length=255)
     created =models.DateTimeField(auto_now_add=True)
     
     def __str__(self):
        return self.name
        
class Agency(models.Model):
    grandfather=models.ForeignKey(GrandFatherTemplate,on_delete=models.CASCADE,null=True,blank=True,)
    father=models.ForeignKey(FatherTemplate,on_delete=models.CASCADE,null=True,blank=True)
    son=models.ForeignKey(SonTemplate,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=255)
    remarks=models.CharField(max_length=255)
    created =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
class Event(models.Model):
    venue=models.ForeignKey(Venue,on_delete=models.CASCADE,null=True,blank=True)
    organization=models.ForeignKey(Organization,on_delete=models.CASCADE,null=True,blank=True)
    logo = models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
    name=models.CharField(max_length=255,blank=False,null=True)
    start_date=models.DateField(blank=True,null=True)
    end_date=models.DateField(blank=True,null=True)
    text=models.CharField(max_length=255,null=True,blank=True)
    remarks=models.CharField(max_length=255,null=True,blank=True)
    created=models.DateTimeField(auto_now_add=True)
    

    @property
    def event_guest(self):
        return self.event_guest_set.all()
    
    def __str__(self):
        return self.name

class Event_guest(models.Model):
    event=models.ForeignKey(Event,on_delete=models.CASCADE,null=True,blank=True)
    guest=models.ForeignKey(Chief_guest,on_delete=models.CASCADE,null=True,blank=True)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.id)
     
class MyUserManager(BaseUserManager):
   
    def create_superuser(self, username, password=None):
        user = self.model(
            username=username
        )
        user.is_admin = True
        user.is_superuser=True
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_adminuser(self, username,password=None):
        user = self.model(
            username=username
        )
        user.is_admin = True
        user.is_superuser=False
        user.is_staff=False
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_user(self, username,password=None):
        user = self.model(
            username=username
        )
        user.is_admin = False
        user.is_superuser=False
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser,PermissionsMixin):
    username=models.CharField(max_length=255,unique=True)
    name=models.CharField(max_length=255)
    phone=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
    event=models.ForeignKey(Event,on_delete=models.CASCADE,null=True,blank=True)
    number_of_pass=models.IntegerField(default=0)
    validate_date=models.DateField(blank=True,null=True)
    designation=models.CharField(max_length=255,null=True,blank=True)
    password=models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    upload = models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)

    created =models.DateTimeField(auto_now_add=True)
    
    
    USERNAME_FIELD='username'
    REQUIRED_FIELDS=[]
    objects = MyUserManager()
    
    @property
    def access(self):
        return self.storeaccess_set.all()
    
    def __str__(self):
        return self.email
   
class storeAccess(models.Model):
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
     access=models.CharField(max_length=255,null=True,blank=True)
     
     def __str__(self):
      return "{}".format(self.id)
     
class uploadFile(models.Model):
     file=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='user_upload')
     picture = models.FileField(upload_to='report-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
     
     def __str__(self):
      return "{}".format(self.id)
     


class EventUser(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    event=models.ForeignKey(Event,on_delete=models.CASCADE,null=True,blank=True)
    agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
    upload = models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
    name=models.CharField(max_length=255,blank=False,null=True)
    validate_date=models.DateField(blank=True,null=True)
    phone=models.CharField(max_length=255,null=True,blank=True)
    email=models.CharField(max_length=255,null=True,blank=True)
    number_of_pass=models.IntegerField(default=0)
    created=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
      return "{}".format(self.id)

class Requisition(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)

    def __str__(self):
      return "{}".format(self.name)
    
class EventAttendent(models.Model):
   user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
   requisition=models.ForeignKey(Requisition,on_delete=models.CASCADE,null=True,blank=True)
   district=models.ForeignKey(district,on_delete=models.CASCADE,null=True,blank=True)
   thana=models.ForeignKey(thana,on_delete=models.CASCADE,null=True,blank=True)
   nid=models.CharField(max_length=255,null=True,blank=True)
   date_of_birth=models.CharField(max_length=255,null=True,blank=True)
   name_bn=models.CharField(max_length=255,null=True,blank=True)
   name_en=models.CharField(max_length=255,null=True,blank=True)
   email=models.CharField(max_length=255,null=True,blank=True)
   designation=models.CharField(max_length=255,null=True,blank=True)
   father_en=models.CharField(max_length=255,null=True,blank=True)
   father_bn=models.CharField(max_length=255,null=True,blank=True)
   phone=models.CharField(max_length=255,null=True,blank=True)
   village=models.CharField(max_length=255,null=True,blank=True)
   address=models.CharField(max_length=255,null=True,blank=True)
   profile = models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
   signature = models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
   created=models.DateTimeField(auto_now_add=True)
   print_status=models.IntegerField(default=0)
   @property
   def vr_status(self):
       return self.verification_status_set.all()
   
   def __str__(self):
      return "{}".format(self.id)

class Verification_Type(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    def __str__(self):
      return "{}".format(self.id)
    
class Verification_Status(models.Model):
      attendent=models.ForeignKey(EventAttendent,on_delete=models.CASCADE,null=True,blank=True)
      status_type=models.ForeignKey(Verification_Type,on_delete=models.CASCADE,null=True,blank=True)
      approved_user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
      created=models.DateTimeField(auto_now_add=True)
      status=models.BooleanField(default=False)

      def __str__(self):
       return "{}".format(self.id)

class user_status(models.Model):
     attendent=models.ForeignKey(EventAttendent,on_delete=models.CASCADE,null=True,blank=True)
     approved_user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
     status=models.BooleanField(default=False)
     created=models.DateTimeField(auto_now_add=True)

     def __str__(self):
       return "{}".format(self.id)



class location(models.Model):
    name=models.CharField(max_length=255)

    def __str__(self):
       return "{}".format(self.name)

class sb_attendent(models.Model): 
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    event=models.ForeignKey(Event,on_delete=models.CASCADE,null=True,blank=True)
    agency=models.ForeignKey(Agency,on_delete=models.CASCADE,null=True,blank=True)
    requisition=models.ForeignKey(Requisition,on_delete=models.CASCADE,null=True,blank=True)
    location=models.ForeignKey(location,on_delete=models.CASCADE,null=True,blank=True)
    bp_number=models.CharField(max_length=255)
    name=models.CharField(max_length=255)
    designation=models.CharField(max_length=255)
    posting=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    phone=models.CharField(max_length=255)
    picture=models.ImageField(upload_to='picture-gallary-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
    created=models.DateTimeField(auto_now_add=True)
    print_status=models.IntegerField(default=0)

    def __str__(self):
       return "{}".format(self.id)

class sb_verification_status(models.Model):
      attendent=models.ForeignKey(sb_attendent,on_delete=models.CASCADE,null=True,blank=True)
      status_type=models.ForeignKey(Verification_Type,on_delete=models.CASCADE,null=True,blank=True)
      approved_user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
      created=models.DateTimeField(auto_now_add=True)
      status=models.BooleanField(default=False)
      created=models.DateTimeField(auto_now_add=True)
      def __str__(self):
       return "{}".format(self.id)

class sb_user_status(models.Model):
     attendent=models.ForeignKey(sb_attendent,on_delete=models.CASCADE,null=True,blank=True)
     approved_user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
     status=models.BooleanField(default=False)
     created=models.DateTimeField(auto_now_add=True)
     created=models.DateTimeField(auto_now_add=True)
     def __str__(self):
       return "{}".format(self.id)
     
class color_template(models.Model):
    grandfather=models.ForeignKey(GrandFatherTemplate,on_delete=models.CASCADE,null=True,blank=True)
    father=models.ForeignKey(FatherTemplate,on_delete=models.CASCADE,null=True,blank=True)
    son=models.ForeignKey(SonTemplate,on_delete=models.CASCADE,null=True,blank=True)
    requisition=models.ForeignKey(Requisition,on_delete=models.CASCADE,null=True,blank=True)
    color=models.CharField(max_length=255,null=False,blank=False)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return "{}".format(self.id)