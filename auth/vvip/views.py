from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from .models import CustomUser as User,Country

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# serilaizer
from .serializers import CountrSerializer, UserRegisterSerializer
from .serializers import UserLoginSerializer


class UserLoginAPIView(APIView):
    def post(self, request, *args, **kargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "email": {
                    "detail": "User Doesnot exist!"
                }
            }
            user=User.objects.get(email=request.data['email'])
            if user is None:
                return Response(response, status=status.HTTP_200_OK)
            if user.check_password(request.data['password']):
                user = User.objects.get(email=request.data['email'])
                token, created = Token.objects.get_or_create(user=user)
                response = {
                    'success': True,
                    'name': user.name,
                    'email': user.email,
                    'is_superuser':user.is_superuser,
                    'token': token.key
                }
                return Response(response, status=status.HTTP_200_OK)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterAPIView(APIView):
    def post(self, request, *args, **kargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'success': True,
                'user': serializer.data,
                'token': Token.objects.get(user=User.objects.get(email=serializer.data['email'])).key
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)


class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({"success": True, "detail": "Logged out!"}, status=status.HTTP_200_OK)
    

import datetime
class TokenAuthnticationApiView(APIView):
     def post(self, request, *args, **kargs):
            response = {
                "data":None,
                'success': False,
                'token':None
            }
            email=request.data['email']
            password=request.data['password']
            now=datetime.datetime.now()
            userlist=User.objects.filter(validate_date__gte=now)
            # print(userlist)
            allowUser=None
            for user in userlist:
                if user.email==email and user.check_password(password):
                      allowUser=user
                      break
                
            print(allowUser)
            if allowUser is None:
                return Response(response, status=status.HTTP_200_OK)
            token, created = Token.objects.get_or_create(user=user)
            serializers = UserLoginSerializer(user)
                # print(serializers.data)
            response = { 
                'success': True,
                'data':serializers.data,
                'token': token.key
            }
            return Response(response, status=status.HTTP_200_OK)
          
       


class CountryApiView(APIView):
    def get(self,request):
        country=Country.objects.all()
        serilizers=CountrSerializer(country,many=True)
        return Response(serilizers.data)
    



