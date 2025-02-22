from rest_framework import serializers
from .models import CustomUser as User,Country
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.authtoken.models import Token


class UserLoginSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    email = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'
        depth=2


class UserRegisterSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {"write_only": True}
        }

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            detail = {
                "detail": "User Already exist!"
            }
            raise ValidationError(detail=detail)
        return username

    def validate(self, instance):
        if instance['password'] != instance['password2']:
            raise ValidationError({"message": "Both password must match"})

        if User.objects.filter(email=instance['email']).exists():
            raise ValidationError({"message": "Email already taken!"})

        return instance

    def create(self, validated_data):
        passowrd = validated_data.pop('password')
        passowrd2 = validated_data.pop('password2')
        user = User.objects.create(**validated_data)
        user.set_password(passowrd)
        user.save()
        Token.objects.create(user=user)
        return user
    

class CountrSerializer(serializers.ModelSerializer):
    class Meta:
        model=Country
        fields='__all__'