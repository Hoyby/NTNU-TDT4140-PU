from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class User(AbstractUser):
    address = models.CharField(max_length=100, blank=True)


class Dinner(models.Model):
    title           = models.CharField(max_length=100)
    description     = models.TextField()
    timePlanned     = models.DateTimeField()
    totalCost       = models.IntegerField(default=0)
    seatsCapacity   = models.IntegerField(default=1)
    seatsTaken      = models.IntegerField(default=0)
    host            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, )
    timeCreated     = models.DateTimeField(auto_now_add=True) # Will not show in admin field due to editable='False' default
    lastModified    = models.DateTimeField(auto_now=True) #same astime Crated
    containsGluten = models.BooleanField(default=False)
    containsMilk = models.BooleanField(default=False)
    containsNuts = models.BooleanField(default=False)
    containsEgg = models.BooleanField(default=False)
    isMeat = models.BooleanField(default=False)
    isFish = models.BooleanField(default=False)
    isVegan = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Attends(models.Model):
    guest           = models.ForeignKey(User, on_delete=models.CASCADE)
    dinner          = models.ForeignKey(Dinner, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("guest", "dinner"),)
    
class Rating(models.Model):
    rater           = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratingRater')
    rated           = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratingRated')
    value           = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(0)])
    feedback        = models.TextField(default="")
