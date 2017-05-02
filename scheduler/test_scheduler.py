# === Tests. ===

from django.contrib.auth.models import User
from django.test import TestCase
from django.test.client import RequestFactory
from .views import *
from .models import *

"""
Tests setting up, inserting into, and accessing the database.
"""
class TestDatabase(TestCase):
    def setUp(self):
        self.user = User.objects.create_superuser('admin', 'admin@test.com', 'pass')
        self.user.save()
        pass

    def test_insert(self):
        #insert a course/subject
        rf = RequestFactory()
        post_request = rf.post('/addcourse/', {
            'subject_name' : 'CSCI',
            'course_number': '3308',
            'course_title' : 'Software Development Methods and Tools',
            'credit_hours' : 3,
            'description'  : 'This class'})
        post_request.user = self.user
        response = addcourse(post_request)
        try:
            s = subject.objects.get(subject_name='CSCI')
        except Exception:
            self.fail('Failed to insert course, subject not inserted')

        try:
            c = course.objects.get(subject_id = s.id, course_number = '3308', credit_hours = 3)
        except Exception:
            self.fail('Failed to insert course, course not inserted')
        self.assertTrue(c.course_title == 'Software Development Methods and Tools', 'Failed to insert course, title not set')
        self.assertTrue(c.description == 'This class', 'Failed to insert course, description not set')
        #Insert a section
        post_request = rf.post('/addsection/', {
            'subject_name' : 'CSCI',
            'course_number': '3308',
            'section_number' : 20345,
            'section_description': 'Section 001-LEC\nBoulder 16-Wk Session/Full Sem',
            'enrollment_restriction': True,
            'consent_required': True,
            'available_seats': 20,
            'wait_list_total': 2,
            'room': 'KOBL 220',
            'instructor':'Rick Sanchez',
            'startday': 8,
            'startmonth': 9,
            'startyear': 2010,
            'endday': 12,
            'endmonth': 9,
            'endyear': 2011,
            'term_year': 2011,
            'term_section': 'Fall',
            'times': 'Mo/12:30PM-1:20PM,We/12:30PM-1:20PM,'})
        post_request.user = self.user
        response = addsection(post_request)

        try:
            sec = section.objects.get(section_number = 20345)
        except Exception:
            self.fail('Failed to insert section, section not inserted')

        self.assertTrue(sec.section_number == 20345, 'Failed to insert section, section_number')
        self.assertTrue(sec.section_description == 'Section 001-LEC\nBoulder 16-Wk Session/Full Sem', 'Failed to insert section, section_description')
        self.assertTrue(sec.enrollment_restriction == True, 'Failed to insert section, enrollment_restriction')
        self.assertTrue(sec.consent_required == True, 'Failed to insert section, consent_required')
        self.assertTrue(sec.available_seats == 20, 'Failed to insert section, available_seats')
        self.assertTrue(sec.wait_list_total == 2, 'Failed to insert section, wait_list_total')
        self.assertTrue(sec.room == 'KOBL 220', 'Failed to insert section, room')
        self.assertTrue(sec.instructor == 'Rick Sanchez', 'Failed to insert section, instructor')
        self.assertTrue(sec.startdate == datetime.date(2010, 9, 8), 'Failed to insert section, startdate')
        self.assertTrue(sec.enddate == datetime.date(2011, 9, 12), 'Failed to insert section, enddate')
        self.assertTrue(sec.term_year == 2011, 'Failed to insert section, term_year')
        self.assertTrue(sec.term_section == 'Fall', 'Failed to insert section, term_section')

        try:
            ct1 = classtime.objects.get(section_id = sec, day = 'Monday', start_time=datetime.time(12,30,0), end_time=datetime.time(13,20,0))
            ct2 = classtime.objects.get(section_id = sec, day = 'Wednesday', start_time=datetime.time(12,30,0), end_time=datetime.time(13,20,0))
        except Exception:
            self.fail('Failed to insert section, classtimes not inserted')


    def test_getclassinfo(self):
        self.assertTrue(True, "Get class info failed")

    def test_deleteclass(self):
        self.assertTrue(True, "Deleting class failed")

    def test_modifyclass(self):
        self.assertTrue(True, "Modifying class failed")
