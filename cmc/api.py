from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User

from .models import Employee


class RegisterEmployee(APIView):
    """
    View to register an employee in system

    * anyone can access this view.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """
        Register an employee
        """
        try:
            # retrieve details from post request
            email = request.data.get("username")
            password = request.data.get("password")
            first_name = request.data.get("first_name")
            last_name = request.data.get("last_name")
            aadhar = request.data.get("aadhar")
            employee_id = request.data.get("employee_id")

            # register user in django auth
            user = User.objects.create_user(username=first_name + '.'+ last_name,
                                            email=email,
                                            password=password)
            user.first_name = first_name
            user.last_name = last_name

            user.save()

            # create employee
            employee = Employee()
            employee.first_name = first_name
            employee.last_name = last_name
            employee.aadhar_no = aadhar
            employee.emp_id = employee_id
            employee.email = email
            employee.user = user

            employee.save()

            return Response("Registration successful")
        except Exception as e:
            return Response("Registration failed."+ str(e))