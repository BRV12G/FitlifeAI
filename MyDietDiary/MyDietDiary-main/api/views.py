from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import RecommendationSerializer, UserSerializer
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import UserProfileInput
from .serializers import UserProfileInputSerializer, Page1Serializer, Page2Serializer, Page3Serializer, Page4Serializer, Page5Serializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from recommender.functions import Weight_Loss, Weight_Gain, Healthy  # Import functions

@api_view(['POST'])
def get_recommendations(request):
    """
    API endpoint to get food recommendations based on user inputs.
    Expects JSON input: {"age": 25, "weight": 70, "height": 175, "goal": "weight_loss", "sleep_duration": 7, "quality_of_sleep": "Good", "physical_activity_level": "high", "stress_level": "high", "Blood_pressure_category": "Hypertension", "Heart_rate": 80, "Daily_steps" : 6000, "occupation": "Doctor"}
    """
    data = request.data
    age = data.get("age")
    weight = data.get("weight")
    height = data.get("height")
    goal = data.get("goal", "weight_loss")  # Default to weight loss

    if not all([age, weight, height]):
        return Response({"error": "Missing required parameters"}, status=400)

    # Call the appropriate function
    if goal == "weight_loss":
        recommendations = Weight_Loss(age, weight, height)
    elif goal == "weight_gain":
        recommendations = Weight_Gain(age, weight, height)
    elif goal == "healthy":
        recommendations = Healthy(age, weight, height)
    else:
        return Response({"error": "Invalid goal. Use 'weight_loss', 'weight_gain', or 'healthy'."}, status=400)

    # Check if recommendations contain required fields
    if not recommendations or "bmi" not in recommendations or "bmi_info" not in recommendations:
        return Response({"error": "No food recommendations found."}, status=400)

    # Serialize the response correctly
    serializer = RecommendationSerializer(recommendations)
    return Response(serializer.data)

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