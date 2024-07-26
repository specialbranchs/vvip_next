from django.urls import path


from vvip.report.views import DashBoardApiView, NumberOfPassApiView 
from  vvip.colorTemplate.views import ColorTemplateApiView
from  vvip.sb_attendent.view import  EventSBAttendentSingleVerificationStatusApiView, EventSBAttendentStatusBasedApiView, EventSBAttendentUploadApiView, EventSBAttendentUserStatusApiView, SBPrintStatusApiView
from  vvip.attendent.view import EventAttendentStatusBasedApiView, PrintStatusApiView, EventAttendentSingleVerificationStatusApiView, EventAttendentApiView, EventAttendentUserStatusApiView, EventWiseAttendentApiView, RequisitionApiView,EventAttendentVerificationStatusApiView
from vvip.request.view import AddressApiView, PendingRequestApiView
from vvip.evetUser.views import EventUserAddApiView, EventWiseUserApiView, sendMailApiView
from vvip.event.views import EventAddApiView
from vvip.agency.views import AgencyApiView, LocationApiView,PassTypeApiView
from vvip.chief_guest.view import Chief_guestApiView
from vvip.guest_designation.view import Guest_designationsApiView
from vvip.organization.view import OrganizationApiView
from vvip.venue.view import VenueApiView
from .views import CountryApiView, TokenAuthnticationApiView, UserLoginAPIView
from .views import UserRegisterAPIView
from .views import UserLogoutAPIView
urlpatterns = [
    path("login/", UserLoginAPIView.as_view(), name="user_login"),
    path("register/", UserRegisterAPIView().as_view(), name="user_register"),
    path("logout/", UserLogoutAPIView.as_view(), name="user_logout"),
    path('token/', TokenAuthnticationApiView.as_view(), name='token_obtain_pair'),

    path('venue/',VenueApiView.as_view()),
    path('organization/',OrganizationApiView.as_view()),
    path('guest_designations/',Guest_designationsApiView.as_view()),
    path('chief_guest/',Chief_guestApiView.as_view()),
    path('agency/',AgencyApiView.as_view()),
    path('country/',CountryApiView.as_view()),
    path('passtype/',PassTypeApiView.as_view()),

    path('event/',EventAddApiView.as_view()),
    path('eventUser/',EventUserAddApiView.as_view()),
    path('eventUser/<int:userId>/',EventWiseUserApiView.as_view()),
    path('address/',AddressApiView.as_view()),
    path('sendEmail/',sendMailApiView.as_view()),
    path('pending_request/',PendingRequestApiView.as_view()),
    path('requisition/',RequisitionApiView.as_view()),
 
#  attendent goes here
     path('attendent/<int:userId>/',EventWiseAttendentApiView.as_view()),
     path('attendent/',EventAttendentApiView.as_view()),
     path('attendentstatus/<int:userId>/',EventAttendentVerificationStatusApiView.as_view()),
     path('attendentstatus/<int:userId>/<int:status>/',EventAttendentStatusBasedApiView.as_view()),
     path('attendentstatus/',EventAttendentSingleVerificationStatusApiView.as_view()),
     path('attendentuserstatus/',EventAttendentUserStatusApiView.as_view()),
     path('printstatus/',PrintStatusApiView.as_view()),
     path('location/',LocationApiView.as_view()),

    # color template   
    path('colortemplate/',ColorTemplateApiView.as_view()),

    #  sb_attendent goes here
     path('sb_attendentupload/',EventSBAttendentUploadApiView.as_view()),
     path('sb_attendentstatus/<int:eventId>/<int:status>/',EventSBAttendentStatusBasedApiView.as_view()),
     path('sb_attendentstatus/',EventSBAttendentSingleVerificationStatusApiView.as_view()),
     path('sb_attendentuserstatus/',EventSBAttendentUserStatusApiView.as_view()),
     path('sb_printstatus/',SBPrintStatusApiView.as_view()),
     path('report/',DashBoardApiView.as_view()),
      path('numberofpass/<int:userId>/',NumberOfPassApiView.as_view()),
]