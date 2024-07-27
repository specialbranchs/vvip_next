from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
@admin.register(CustomUser)
class CustomAdmin(admin.ModelAdmin):
    list_display=("id",'username',"name","validate_date","email","is_superuser","is_admin","is_staff","created")

@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Venue._meta.fields if field.name != "id"]

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Organization._meta.fields if field.name != "id"]

# @admin.register(Country)
# class CountryAdmin(admin.ModelAdmin):
#     list_display=[field.name for field in Country._meta.fields if field.name != "id"]

@admin.register(Guest_designations)
class Guest_designationsAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Guest_designations._meta.fields if field.name != "id"]

@admin.register(Chief_guest)
class Chief_guestAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Chief_guest._meta.fields if field.name != "id"]

@admin.register(Security_agency_type)
class Security_agency_typeAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Security_agency_type._meta.fields if field.name != "id"]

@admin.register(Agency_type)
class Agency_typeAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Agency_type._meta.fields if field.name != "id"]

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Agency._meta.fields if field.name != "id"]

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Event._meta.fields if field.name != "id"]

@admin.register(Event_guest)
class Event_guestAdmin(admin.ModelAdmin):
    list_display=[field.name for field in Event_guest._meta.fields if field.name != "id"]


from import_export import resources
from  .models import district,division,thana
admin.site.register(district,ImportExportModelAdmin)
admin.site.register(division,ImportExportModelAdmin)
admin.site.register(thana,ImportExportModelAdmin)
admin.site.register(color_template,ImportExportModelAdmin)
admin.site.register(storeAccess)
admin.site.register(Verification_Type)
admin.site.register(Verification_Status)
admin.site.register(Requisition,ImportExportModelAdmin)
admin.site.register(EventAttendent)

class CountryResource(resources.ModelResource):
    class Meta:
        model = Country
        # fields ='__all__'

class CountryAdmin(ImportExportModelAdmin):
    resource_class =CountryResource

admin.site.register(Country,CountryAdmin)
admin.site.register(user_status)
admin.site.register(GrandFatherTemplate,ImportExportModelAdmin)
admin.site.register(FatherTemplate,ImportExportModelAdmin)
admin.site.register(SonTemplate,ImportExportModelAdmin)

admin.site.register(location)
admin.site.register(sb_attendent)
admin.site.register(sb_verification_status)

admin.site.register(sb_user_status)