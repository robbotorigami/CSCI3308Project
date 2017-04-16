from __future__ import unicode_literals
import datetime

from django.db import models
from django.utils import timezone

class subject(models.Model):
    subject_name = models.CharField(max_length=4)
    def __str__(self):
        return self.subject_name

class course(models.Model):
    subject_id = models.ForeignKey(subject, on_delete=models.CASCADE)
    course_number = models.CharField(max_length=4)
    course_title = models.CharField(max_length=100)
    credit_hours = models.IntegerField()
    description = models.CharField(max_length=2000)

    def __str__(self):
        return self.subject_id.__str__() + self.course_number


class section(models.Model):
    course_id = models.ForeignKey(course, on_delete=models.CASCADE)
    section_number = models.IntegerField() #class number/primary key
    section_description = models.CharField(max_length=100)
    enrollment_restriction = models.BooleanField()
    consent_required = models.BooleanField()
    available_seats = models.IntegerField()
    wait_list_total = models.IntegerField()
    room = models.CharField(max_length=20)
    instructor = models.CharField(max_length=40)
    startdate = models.DateField()
    enddate = models.DateField()
    term_year = models.IntegerField()
    FALL = 'F'
    SPRING = 'S'
    SUMMER = 'U'
    TERM_SECTION_CHOICES = (
        (FALL, 'Fall'),
        (SPRING, 'Spring'),
        (SUMMER, 'Summer'),
    )
    term_section = models.CharField(max_length=2, choices=TERM_SECTION_CHOICES)

    def __str__(self):
        return self.course_id.subject_id.__str__() + self.course_id.__str__() + self.section_description

class classtime(models.Model):
    section_id = models.ForeignKey(section, on_delete=models.CASCADE)
    SUNDAY = 'S'
    MONDAY = 'M'
    TUESDAY = 'T'
    WEDNESDAY = 'W'
    THURSDAY = 'R'
    FRIDAY = 'F'
    SATURDAY = 'A'
    DAY_CHOICES = (
        (SUNDAY, 'Sunday'),
        (MONDAY, 'Monday'),
        (TUESDAY, 'Tuesday'),
        (WEDNESDAY, 'Wednesday'),
        (THURSDAY, 'Thursday'),
        (FRIDAY, 'Friday'),
        (SATURDAY, 'Saturday'),
    )
    day = models.CharField(max_length=1, choices = DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.section.section_description + self.day

# Create your models here.
