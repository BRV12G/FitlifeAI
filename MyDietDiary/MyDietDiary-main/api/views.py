from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import RecommendationSerializer, UserSerializer
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import UserProfileInput
from .serializers import UserProfileInputSerializer
from django.contrib.auth.models import User
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

# @api_view(['POST'])
# def login_user(request):
#     """
#     Login API for React Native app.
#     Expects JSON: { "emailOrUsername": "user", "password": "pass" }
#     """
#     email_or_username = request.data.get('emailOrUsername')
#     password = request.data.get('password')

#     if not email_or_username or not password:
#         return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

#     user = authenticate(username=email_or_username, password=password)

#     if user is not None:
#         return Response({'message': 'Login successful', 'user': user.username}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
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

class UserInputView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user):
        profile, created = UserProfileInput.objects.get_or_create(user=user)
        return profile

    def get(self, request):
        profile = self.get_object(request.user)
        serializer = UserProfileInputSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile = self.get_object(request.user)
        serializer = UserProfileInputSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def signup_view(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     firstname = request.data.get('firstname')
#     lastname = request.data.get('lastname')
#     email = request.data.get('email')


#     if username and password and firstname and lastname and email:
#         return Response({'message': 'User created'}, status=status.HTTP_201_CREATED)
#     return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

