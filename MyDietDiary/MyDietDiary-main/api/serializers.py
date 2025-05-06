from rest_framework import serializers
from .models import UserProfileInput
from django.contrib.auth.models import User

class FoodSerializer(serializers.Serializer):
    name = serializers.CharField()
    calories = serializers.FloatField()
    protein = serializers.FloatField()
    fat = serializers.FloatField()
    carbs = serializers.FloatField()
    image_url = serializers.CharField()

class RecommendationSerializer(serializers.Serializer):
    breakfast = FoodSerializer(many=True)
    lunch = FoodSerializer(many=True)
    dinner = FoodSerializer(many=True)
    bmi = serializers.FloatField()
    bmi_info = serializers.CharField()

class UserProfileInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileInput
        fields = '__all__'
        read_only_fields = ['user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])  # Hash password
        user.save()
        return user