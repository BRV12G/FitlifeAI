from django.contrib import admin
from .models import UserProfileInput

# Register your models here.

@admin.register(UserProfileInput)
class UserProfileInputAdmin(admin.ModelAdmin):
    list_display= ['user', 'age', 'height', 'weight', 'occupation', 'gender', 'bp_category', 'systolic', 'diastolic', 'heart_rate', 'daily_steps', 'sleep_disorder', 'bmi', 'bmi_category']