from django.contrib import admin

from .models import *

admin.site.register(subject)
admin.site.register(course)
admin.site.register(section)
admin.site.register(classtime)

# Register your models here.
