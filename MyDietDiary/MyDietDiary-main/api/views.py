from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import RecommendationSerializer, UserSerializer, FitnessDataSerializer
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import UserProfileInput
from .serializers import UserProfileInputSerializer, Page1Serializer, Page2Serializer, Page3Serializer, Page4Serializer, Page5Serializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from .fitness_plan_generator import generate_fitness_plan
from recommender.functions import Weight_Loss, Weight_Gain, Healthy  # Import functions

# @api_view(['POST'])
# def get_recommendations(request):
#     """
#     API endpoint to get food recommendations based on user inputs.
#     Expects JSON input: {"age": 25, "weight": 70, "height": 175, "goal": "weight_loss", "sleep_duration": 7, "quality_of_sleep": "Good", "physical_activity_level": "high", "stress_level": "high", "Blood_pressure_category": "Hypertension", "Heart_rate": 80, "Daily_steps" : 6000, "occupation": "Doctor"}
#     """
#     data = request.data
#     age = data.get("age")
#     weight = data.get("weight")
#     height = data.get("height")
#     goal = data.get("goal", "weight_loss")  # Default to weight loss

#     if not all([age, weight, height]):
#         return Response({"error": "Missing required parameters"}, status=400)

#     # Call the appropriate function
#     if goal == "weight_loss":
#         recommendations = Weight_Loss(age, weight, height)
#     elif goal == "weight_gain":
#         recommendations = Weight_Gain(age, weight, height)
#     elif goal == "healthy":
#         recommendations = Healthy(age, weight, height)
#     else:
#         return Response({"error": "Invalid goal. Use 'weight_loss', 'weight_gain', or 'healthy'."}, status=400)

#     # Check if recommendations contain required fields
#     if not recommendations or "bmi" not in recommendations or "bmi_info" not in recommendations:
#         return Response({"error": "No food recommendations found."}, status=400)

#     # Serialize the response correctly
#     serializer = RecommendationSerializer(recommendations)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    print("Signup data:", request.data)
    serializer = UserSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    user = get_object_or_404(User, username = request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status= status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user = user)
    serializer = UserSerializer(instance = user)
    return Response({"token": token.key, "user": serializer.data})
        
class Page1View(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page1Serializer(data)
        return Response(serializer.data)

    def post(self, request):
        try:
            # Try to get the existing user profile input
            data = UserProfileInput.objects.get(user=request.user)
            serializer = Page1Serializer(data, data=request.data, partial=True)
        except UserProfileInput.DoesNotExist:
            # Creating a new instance if it doesn't exist
            serializer = Page1Serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)  # Set the user manually
                return Response({'message': 'Page 1 data created successfully'})
            return Response(serializer.errors, status=400)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Page 1 data updated successfully'})
        return Response(serializer.errors, status=400)


class Page2View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page2Serializer(data)
        return Response(serializer.data)

    def post(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page2Serializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Page 2 data saved successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class Page3View(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page3Serializer(data)
        return Response(serializer.data)

    def post(self, request):
        try:
            user_data = UserProfileInput.objects.get(user=request.user)
        except UserProfileInput.DoesNotExist:
            user_data = None

        height = request.data.get('height')
        weight = request.data.get('weight')

        if not height or not weight:
            return Response({"error": "Both height and weight are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            height_m = float(height) / 100  # cm to meters
            weight_kg = float(weight)
            bmi = round(weight_kg / (height_m ** 2), 2)
        except (ValueError, ZeroDivisionError):
            return Response({"error": "Invalid height or weight value."}, status=status.HTTP_400_BAD_REQUEST)

        # Determine BMI category
        if bmi < 18.5:
            bmi_category = 'Underweight'
        elif 18.5 <= bmi < 25:
            bmi_category = 'Normal'
        elif 25 <= bmi < 30:
            bmi_category = 'Overweight'
        else:
            bmi_category = 'Obese'

        updated_data = {
            'height': height,
            'weight': weight,
            'bmi': bmi,
            'bmi_category': bmi_category,
        }

        if user_data:
            serializer = Page3Serializer(user_data, data=updated_data, partial=True)
        else:
            serializer = Page3Serializer(data=updated_data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'message': 'Page 3 data saved successfully'})
        return Response(serializer.errors, status=400)

class Page4View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page4Serializer(data)
        return Response(serializer.data)

    def post(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page4Serializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Page 4 data saved successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Page5View(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page5Serializer(data)
        return Response(serializer.data)

    def post(self, request):
        data, _ = UserProfileInput.objects.get_or_create(user=request.user)
        serializer = Page5Serializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Page 5 data saved successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def recommendations(request):
    user = request.user

    try:
        user_data = UserProfileInput.objects.get(user=user)
    except UserProfileInput.DoesNotExist:
        return Response({"error": "User input data not found."}, status=404)

    # Retrieve values from DB
    age = user_data.age
    weight = user_data.weight
    height = user_data.height
   # goal = user_data.goal or "weight_loss"  # Optional field in your model
    goal = "weight_loss"
    sleep_hours = user_data.sleep_hours
    quality_of_sleep = user_data.quality_of_sleep
    physical_activity = user_data.physical_activity
    stress_level = user_data.stress_level
    bp_category = user_data.bp_category
    heart_rate = user_data.heart_rate
    daily_steps = user_data.daily_steps
    occupation = user_data.occupation

    if not all([age, weight, height]):
        return Response({"error": "Missing required parameters"}, status=400)

    # Run appropriate recommendation logic
    if goal == "weight_loss":
        recommendations = Weight_Loss(age, weight, height)
    elif goal == "weight_gain":
        recommendations = Weight_Gain(age, weight, height)
    elif goal == "healthy":
        recommendations = Healthy(age, weight, height)
    else:
        return Response({"error": "Invalid goal."}, status=400)

    if not recommendations or "bmi" not in recommendations or "bmi_info" not in recommendations:
        return Response({"error": "No recommendations found."}, status=400)

    serializer = RecommendationSerializer(recommendations)
    return Response(serializer.data)


# @api_view(['POST'])
# def get_fitness_recommendation(request):
#     user_data = request.data
#     result = generate_fitness_plan(user_data)
#     return Response({"recommendation": result})

# from .fitness_model import generate_fitness_recommendation  # Your custom AI logic

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_fitness_plan(request):
    user = request.user

    # Get stored health data for the authenticated user
    try:
        health_data = UserProfileInput.objects.get(user=user)
    except UserProfileInput.DoesNotExist:
        return Response(
            {"error": "User health data not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    # Retrieve stored attributes
    age = health_data.age
    weight = health_data.weight
    height = health_data.height
    gender = health_data.gender

    # Get frontend-provided inputs
    injury = request.data.get("injury", "")
    workout_pref = request.data.get("workoutPreference", "")
    goal = request.data.get("goal", "")
    weight_goal = request.data.get("weightGoal", "")

    serializer = FitnessDataSerializer(data=request.data, context={"request": request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    fitness_data = serializer.save()

    # Optional: Input validation (e.g. required fields)
    if not workout_pref or not goal:
        return Response(
            {"error": "Please provide all required fields."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Call your AI model or rule-based logic
    try:
        recommendation = generate_fitness_plan(
            age, weight, height, gender,
            injury, workout_pref, goal, weight_goal
        )
    except Exception as e:
        return Response(
            {"error": f"Failed to generate recommendation: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response({"recommendation": recommendation}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def username(request):
    user = request.user
    return Response({
        "username" : user.username,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    try:
        profile = UserProfileInput.objects.get(user=user)
    except UserProfileInput.DoesNotExist:
        return Response({"error": "User profile not found."}, status=404)

    return Response({
        "firstname": user.first_name,
        "lastname": user.last_name,
        "email": user.email,
        "age": profile.age,
        "gender": profile.gender,
        "occupation": profile.occupation,
        "sleep_hours": profile.sleep_hours,
        "height": profile.height,
        "weight": profile.weight,
        # ... any other fields
    })