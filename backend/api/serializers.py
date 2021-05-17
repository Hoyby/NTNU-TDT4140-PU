from rest_framework import serializers
from .models import Dinner, User, Attends, Rating
from rest_framework.authtoken.views import Token


# ModelSerializer
class DinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dinner
        fields = ['id', 
            'title', 
            'description',  
            'timePlanned', 
            'totalCost', 
            'seatsCapacity', 
            'seatsTaken', 
            'host',
            'timeCreated', 
            'lastModified',
            'containsGluten',
            'containsMilk',
            'containsNuts',
            'containsEgg',
            'isMeat',
            'isFish',
            'isVegan']
        read_only_fields = ['host', 
            'timeCreated', 
            'lastModified']
            
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 
            'username', 
            'password', 
            'email', 
            'first_name', 
            'last_name', 
            'address', 
            'is_superuser', 
            'date_joined', 
            'last_login']
        read_only_fields = ['date_joined', 
            'last_login']

        # Hide password in api
        extra_kwargs = {'password':{
            'write_only':True,
            'required':True,
        }}
    
    # Create new users (with autocreated token)
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class AttendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attends
        fields = [
            'guest',
            'dinner'
        ]
        read_only_fields = [
            'guest',
            'dinner'
        ]

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = [
            'rater',
            'rated',
            'value',
            'feedback'
        ]
        read_only_fields = [
            'rater',
            'rated',
            'value',
            'feedback'
        ]
