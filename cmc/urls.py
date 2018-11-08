from django.urls import path, include, re_path
from rest_framework import routers
# from django.conf.urls import url

from . import views, api

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'group', views.GroupViewSet)
router.register(r'contact', views.ContactViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'', views.index, name='index'),
    path(r'register/', api.RegisterEmployee.as_view()),
    path(r'create-group/', api.CreateGroup.as_view()),
    path(r'create-contact/', api.CreateContact.as_view()),
    path(r'groups-for-employee/', api.GetGroupsForEmployee.as_view()),
    path(r'contacts-for-employee/', api.GetContactsForEmployee.as_view()),
    path(r'contacts-for-group/', api.GetContactsForGroup.as_view()),
    path(r'get-current-employee/', api.EmployeeDetails.as_view()),
    path(r'toggle-group-status/', api.ToggleGroupStatus.as_view()),
    path(r'toggle-contact-status/', api.ToggleContactStatus.as_view()),
    path(r'delete-contact/', api.DeleteContact.as_view()),
    path(r'delete-group/', api.DeleteGroup.as_view()),
    path(r'group-details/', api.GroupDetails.as_view()),
    path('contact/<int:pk>/', views.ContactDetail.as_view()),
    path('group/<int:pk>/', views.ContactDetail.as_view()),
    path('groups-by-name/', api.GroupsByName.as_view()),
    path('search-contacts/', api.SearchContacts.as_view()),
]

urlpatterns += router.urls