from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Employee, Contact, Group, GroupContractMap, SystemConfiguration
# this file holds all serializers required fot rest
# communication between django and angular app


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = '__all__'


class GroupContractMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = GroupContractMap
        fields = '__all__'


class SystemConfigurationSerializer(serializers.ModelSerializer):

    class Meta:
        model = SystemConfiguration
        fields = '__all__'
