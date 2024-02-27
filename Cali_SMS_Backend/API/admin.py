from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import *
CustomUser = get_user_model()
admin.site.register(CustomUser)
admin.site.register(Proprietor)
admin.site.register(School)
admin.site.register(SchoolCommittees)
admin.site.register(Department)
admin.site.register(Fee)
admin.site.register(Course)
admin.site.register(ClassLevel)

admin.site.register(TermDetails)


admin.site.register(Student)
admin.site.register(ObserverAllowances)
admin.site.register(StudentTerminalReportDetails)

admin.site.register(StudentFeesPaid)
admin.site.register(AllowancesPaidForObserverStudent)
admin.site.register(StudentFeesPayable)

admin.site.register(Wage)
admin.site.register(Staff)
admin.site.register(StaffWage)

admin.site.register(StaffSalariesPayable)
admin.site.register(StaffSalaryPaid)


admin.site.register(ClassTeacherMap)
admin.site.register(PaymentPeriod)
admin.site.register(PeriodFinanceUpdate)

admin.site.register(CourseStudent)
admin.site.register(StaffSalary)



# Register your models here.