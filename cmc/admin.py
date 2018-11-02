from django.contrib import admin

from .models import Employee, Contact, Group, GroupContractMap,SystemConfiguration
# Registering models to access from admin console

admin.site.register(Employee)
admin.site.register(Contact)
admin.site.register(Group)
admin.site.register(GroupContractMap)
admin.site.register(SystemConfiguration)

# from django.contrib import admin
# from .models import Employee
#
#
# @admin.register(Employee)
# class EmployeeAdmin(admin.ModelAdmin):
#     list_display = ('user',)