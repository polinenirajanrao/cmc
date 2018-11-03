from django.urls import path, include
from rest_framework import routers

from . import views, api

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'users', views.UserViewSet)
# router.register(r'register', api.RegisterEmployee, base_name='register_employee')

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'', views.index, name='index'),
    path(r'register/', api.RegisterEmployee.as_view())
]
