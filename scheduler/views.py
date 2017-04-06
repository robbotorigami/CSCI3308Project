from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.core.urlresolvers import reverse
from django.views import generic
from django.contrib.auth.decorators import user_passes_test
from .models import *

def index(request):
    return render(request, 'scheduler/home.html', {})

def addcourse(request, subjectname, coursenum, title, hours, description):
    subj, _ = subject.objects.get_or_create(subject_name = subjectname)
    c, _ = course.objects.get_or_create(subject_id = subj, course_number = coursenum, credit_hours = hours)
    c.title = title
    c.description = description
    c.save()
    return HttpResponse("{}{} - {} for {}".format(subject,coursenum,title, hours))

# Create your views here.
