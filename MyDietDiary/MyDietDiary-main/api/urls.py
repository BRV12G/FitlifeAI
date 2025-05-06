from django.urls import path
from .views import get_recommendations, login_user, UserInputView, signup_view
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('recommendations/', get_recommendations, name='get-recommendations'),
    path('login/', login_user, name='login_user'),
    path('user-input/', UserInputView.as_view(), name='user-input'),
    path('token/', obtain_auth_token, name='api-token'),
    path('signup/', signup_view, name='signup_view'),
]
