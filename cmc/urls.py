from django.urls import path, include
from rest_framework import routers
from django.conf.urls import url

from . import views, api

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'', views.index, name='index'),
    path(r'register/', api.RegisterEmployee.as_view()),
    # catch-all pattern for compatibility with the Angular routes. This must be last in the list.
    url(r'^(?P<path>.*)/$', views.index),
]

urlpatterns += router.urls