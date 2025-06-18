from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserProfileInput(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Page 1
    gender = models.CharField(max_length=10)
    age = models.PositiveIntegerField()
    occupation = models.CharField(max_length=50)
    physical_activity = models.CharField(max_length=20)

    # Page 2
    sleep_hours = models.PositiveIntegerField(null=True, blank=True)
    quality_of_sleep = models.IntegerField(null=True, blank=True)
    stress_level = models.CharField(max_length=10, null=True, blank=True)

    # Page 3
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)

    # Page 4
    bp_category = models.CharField(max_length=30, null=True, blank=True)
    systolic = models.PositiveIntegerField(null=True, blank=True)
    diastolic = models.PositiveIntegerField(null=True, blank=True)
    bmi = models.FloatField(null=True, blank= True)
    bmi_category = models.CharField(max_length=50, null=True, blank=True)

    # Page 5
    heart_rate = models.PositiveIntegerField(null=True, blank=True)
    daily_steps = models.PositiveIntegerField(null=True, blank=True)
    sleep_disorder = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return self.user.username
    

class FitnessData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="fitness_data")
    injury = models.CharField(max_length=255, blank=True)
    workout_preference = models.CharField(max_length=255)
    goal = models.CharField(max_length=255)
    weight_goal = models.IntegerField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fitness data for {self.user.username}"