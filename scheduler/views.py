from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.core.urlresolvers import reverse
from django.views import generic

def index(request):
    return render(request, 'scheduler/home.html', {})

# Create your views here.
