from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template import loader
from django.core.urlresolvers import reverse
from django.views import generic
from django.contrib.auth.decorators import user_passes_test
from django.contrib.admin.views.decorators import staff_member_required
from .models import *

def index(request):
    return render(request, 'scheduler/home.html', {})

@staff_member_required
def addcourse(request):
    if request.method != 'POST':
        raise Http404("No course info provided")
    subj, _ = subject.objects.get_or_create(subject_name = request.POST['subject_name'])
    c, _ = course.objects.get_or_create(subject_id = subj, course_number = request.POST['course_number'], credit_hours = request.POST['credit_hours'])
    c.course_title = request.POST['course_title']
    c.description = request.POST['description']
    c.save()
    return HttpResponse("{}{} - {} for {}".format(subj.subject_name, c.course_number, c.course_title, c.credit_hours))

@staff_member_required
def addsection(request):
    if request.method != 'POST':
        raise Http404("No course info provided")
    subj = subject.objects.get(subject_name = request.POST['subject_name'])
    c = course.objects.get(subject_id = subj, course_number = request.POST['course_number'])
    try:
        sect = section.objects.get(section_number = request.POST['section_number'])
    except section.DoesNotExist:
        sect = section()
        sect.section_number = request.POST['section_number']
    sect.course_id = c
    sect.section_description = request.POST['section_description']
    sect.enrollment_restriction = request.POST['enrollment_restriction']
    sect.consent_required = request.POST['consent_required']
    sect.available_seats = request.POST['available_seats']
    sect.wait_list_total = request.POST['wait_list_total']
    sect.room = request.POST['room']
    sect.instructor = request.POST['instructor']
    sect.startdate = datetime.date(int(request.POST['startyear']),int(request.POST['startmonth']),int(request.POST['startday']))
    sect.enddate = datetime.date(int(request.POST['endyear']),int(request.POST['endmonth']),int(request.POST['endday']))
    sect.term_year = request.POST['term_year']
    sect.term_section = request.POST['term_section']

    sect.save()
    return HttpResponse("Added section" + sect.__str__())


# Create your views here.
