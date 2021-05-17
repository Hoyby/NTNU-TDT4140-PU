from django.contrib import admin
from .models import Dinner, User, Attends, Rating

admin.site.register(Dinner)
admin.site.register(User)
admin.site.register(Attends)
admin.site.register(Rating)