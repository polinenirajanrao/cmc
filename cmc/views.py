from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import Employee, Group, Contact
from . import serializers
from .permissions import ReadOnly

from django.shortcuts import redirect


def index(request, path=''):
    """
    The home page. This renders the container for the single-page app.
    """
    return render(request, 'index.html')


class UserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (ReadOnly, )


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Employee model
    """
    queryset = Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


def handler404(request, exception):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('')  # or redirect('name-of-index-url')


class GroupViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Group model
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        employee = Employee.objects.filter(user=self.request.user)
        serializer.save(employee=employee)


class ContactViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Blog Post model
    """
    queryset = Contact.objects.all()
    serializer_class = serializers.ContactSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        employee = Employee.objects.filter(user=self.request.user)
        serializer.save(created_emp=employee)