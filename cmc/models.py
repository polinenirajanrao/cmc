from django.db import models
from django.core.validators import MaxValueValidator
from django.conf import settings


# Create your models here.
# Employee model, this has relationship with User model of django auth
class Employee(models.Model):
    email = models.EmailField(max_length=70, blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=25, blank=False)
    last_name = models.CharField(max_length=25, blank=False)
    aadhar_no = models.CharField(max_length=12, blank=False)
    emp_id = models.PositiveIntegerField(validators=[MaxValueValidator(999999)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)


# Group model, this has relationship with employee who crated this Group
class Group(models.Model):
    group_name = models.CharField(max_length=25, blank=False, null=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)


# Contact model, this has relationship with employee who crated this Contact
class Contact(models.Model):
    email = models.EmailField(max_length=70, blank=True, null=True, unique=True)
    first_name = models.CharField(max_length=25, blank=False)
    last_name = models.CharField(max_length=25, blank=False)
    phone = models.CharField(max_length=15, blank=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


# System Configuration model to save configuration related data, saved as key value pairs
class SystemConfiguration(models.Model):
    key = models.CharField(max_length=25, blank=False)
    value = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=False)
