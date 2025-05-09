from rest_framework import serializers
from .models import UserProfileInput, FitnessData
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
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = UserProfileInput
        fields = '__all__'
        read_only_fields = ['user']

class Page1Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileInput
        fields = ['gender', 'age', 'occupation', 'physical_activity']

class Page2Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileInput
        fields = ['sleep_hours', 'quality_of_sleep', 'stress_level']

class Page3Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileInput
        fields = ['height', 'weight', 'bmi', 'bmi_category']

class Page4Serializer(serializers.ModelSerializer):
    bloodPressureCategory = serializers.CharField(source='bp_category')
    systolicPressure = serializers.IntegerField(source='systolic')
    diastolicPressure = serializers.IntegerField(source='diastolic')
    class Meta:
        model = UserProfileInput
        fields = ['bloodPressureCategory', 'systolicPressure', 'diastolicPressure']
        # fields = ['bp_category', 'systolic', 'diastolic']

class Page5Serializer(serializers.ModelSerializer):
    heartrate = serializers.IntegerField(source='heart_rate')
    dailySteps = serializers.IntegerField(source='daily_steps')
    sleepDisorder = serializers.CharField(source='sleep_disorder')
    class Meta:
        model = UserProfileInput
        fields = ['heartrate', 'dailySteps', 'sleepDisorder']

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
    

class FitnessDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessData
        fields = ['injury', 'workout_preference', 'goal', 'weight_goal']

    def create(self, validated_data):
        user = self.context['request'].user
        # Create or update the user's fitness data
        fitness_data, created = FitnessData.objects.update_or_create(
            user=user,
            defaults=validated_data
        )
        return fitness_data