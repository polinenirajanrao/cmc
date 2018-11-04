from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User
from .models import Employee, Contact, Group, GroupContractMap, SystemConfiguration
from rest_framework import views
from .serializers import ContactSerializer, GroupSerializer, GroupContractMapSerializer,SystemConfigurationSerializer


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
            email = request.data.get("email")
            password = request.data.get("password")
            first_name = request.data.get("first_name")
            last_name = request.data.get("last_name")
            aadhar = request.data.get("aadhar")
            employee_id = request.data.get("employee_id")

            # register user in django auth
            user = User.objects.create_user(username=email,
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


class GetContactsForEmployee(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        employee = Employee.objects.filter(user=self.request.user).first()
        queryset = Contact.objects.filter(created_emp_id=employee.id)
        serializer = ContactSerializer(queryset, many=True)

        return Response(serializer.data)


class GetGroupsForEmployee(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        employee = Employee.objects.filter(user=self.request.user).first()
        queryset = Group.objects.filter(employee_id=employee.id)
        serializer = GroupSerializer(queryset, many=True)
        permission_classes = (permissions.IsAuthenticated,)

        return Response(serializer.data)


class GetContactsForGroup(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = GroupContractMap.objects.filter(
            employee_id=request.data.get("employee_id"),
            group_id=request.data.get("group_id"))
        serializer = GroupContractMapSerializer
        permission_classes = (permissions.IsAuthenticated,)

        return Response(serializer.data)


class CreateGroup(APIView):
    """
    View to register a group in system

    * only authenticated users can access this view.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        """
        create a group
        """
        try:
            # retrieve details from post request
            group_name = request.data.get("group_name")

            # create group
            group = Group()
            group.group_name = group_name
            employee = Employee.objects.filter(user=self.request.user).first()
            group.employee = employee
            group.save()

            return Response("Group saved.")
        except Exception as e:
            return Response("Group creation failed failed."+ str(e))


class CreateContact(APIView):
    """
    View to register a group in system

    * only authenticated users can access this view.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        """
        create a contact
        """
        try:
            # retrieve details from post request
            email = request.data.get("email")
            first_name = request.data.get("first_name")
            last_name = request.data.get("last_name")
            phone = request.data.get("phone")

            # create contact
            contact = Contact()
            contact.email = email
            contact.first_name = first_name
            contact.last_name = last_name
            contact.phone = phone
            employee = Employee.objects.filter(user=self.request.user).first()
            contact.employee = employee
            contact.save()

            return Response("Contact saved.")
        except Exception as e:
            return Response("Contact creation failed failed."+ str(e))
