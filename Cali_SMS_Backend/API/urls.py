from django.urls import path
from . import views
from .views import *

urlpatterns = [
    # Proprietor URLs
    path('proprietor/', ProprietorListView.as_view(), name='proprietor-list'),
    path('proprietor/<int:pk>/', ProprietorDetailView.as_view(), name='proprietor-detail'),

    # School URLs
    path('school/', SchoolListView.as_view(), name='school-list'),
    path('school/<int:pk>/', SchoolDetailView.as_view(), name='school-detail'),

    # Staff URLs
    path('staff/', StaffListView.as_view(), name='staff-list'),
    path('staff/<int:pk>/', StaffDetailView.as_view(), name='staff-detail'),

    # StaffSalary URLs
    path('staffsalary/', StaffSalaryListView.as_view(), name='staffsalary-list'),
    path('staffsalary/<int:pk>/', StaffSalaryDetailView.as_view(), name='staffsalary-detail'),

    path('department/', DepartmentListView.as_view(), name='department-list'),
    path('create-department/', DepartmentListView.as_view(), name='create-department'),
    path('department/<int:pk>/', DepartmentDetailView.as_view(), name='department-details'),
    path('delete-department/<int:pk>/', DepartmentDetailView.as_view(), name='delete-department'),
    path('update-department/<int:pk>/', DepartmentDetailView.as_view(), name='update-department'),

    # Fees URLs
    path('fee/', FeeListView.as_view(), name='fee-list'),
    path('fee/classbases/<int:class_id>/', FeeListView.as_view(), name='fee-list'),
    path('fee/<int:pk>/', FeeDetailView.as_view(), name='fee-detail'),

    # Class Levels urls
    path('class-level/', ClassLevelListView.as_view(), name='class-level-list'),
    path('class-level/<int:pk>/', ClassLevelDetailView.as_view(), name='class-level-detail'),

    # url for front end class details
    path('classInTheSchool/<int:school_id>/', FrontEndClassLevelListView.as_view(), name='class-level-detail'),

    # Students URLs
    path('student/', StudentListView.as_view(), name='student-list'),
    path('student/get-students-by-class/<int:class_id>/', StudentListView.as_view(), name='get-students-by-class'),
    path('student/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),

    # User and Authentications URLs
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('user/', UserListView.as_view(), name='user-list'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('token-auth/', CustomAuthToken.as_view(), name='api-token-auth'),

    # for all courses purposes urls
    path('courses/', CourseView.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseView.as_view(), name='course-detail'),

    # getting score of a course for a student
    path('report/get-scores/<int:student_id>/<int:course_id>/', ReportGeneratorView.as_view(), name='get_scores'),
    path('students/<int:student_id>/<int:Term_details_id>/courses/', ReportGeneratorView.as_view(),
         name='student-courses'),

    # getting score of a course for a student
    # path('report/get-scores/<int:student_id>/<int:course_id>/', ReportGeneratorView.as_view(), name='get_scores'),
    path('students/<int:student_id>/<int:Term_details_id>/courses/', ReportGeneratorView.as_view(),
         name='student-courses'),

    # changing the scores of a student url
    path('report/<int:student_id>/change_scores/', ReportGeneratorView.as_view(), name='change-scores'),
    path('report/<int:student_id>/<int:course_id>/change_scores/', ReportGeneratorView.as_view(),
         name='change-scores-by-course'),

    # getting score of a course for a student
    path('students/<int:student_id>/<int:Term_details_id>/courses/', ReportGeneratorView.as_view(),
         name='student-courses'),
    # getting detail of teachers remarks on student report
    path('students/<int:student_id>/<int:term_details_id>/reportRemarks/', StudentTerminalReportDetailsView.as_view(),
         name='student-courses'),

    # changing the scores of a student url
    path('report/<int:student_id>/change_scores/', ReportGeneratorView.as_view(), name='change-scores'),
    path('report/<int:student_id>/<int:course_id>/change_scores/', ReportGeneratorView.as_view(),
         name='change-scores-by-course'),

    # getting list of terms
    path('terms/<int:school_id>/', TermDetailsListView.as_view(), name='term-list'),

    # getting student financial report
    path('studentfinancialstatement/<int:term_id>/<int:student_id>/', SchoolFinanceViews.as_view(), name='total-fees'),

    # Backup and restore database
    path('backup/', views.backup_database, name='backup_database'),
    path('restore/', views.restore_database, name='restore_database'),

    # getting list of student fees paid by term
#     path('studentfeesforterm/<int:term_id>/<str:date>/<str:student_name>/<int:classes_id>/', StudentFeesPaidViews.as_view(), name='totalfees'),
    path('studentfeespayment/<int:term_id>/<int:classes_id>/',StudentFeesPaidViews.as_view(),name='paymentofschoolfeesbystudents'),
   
   #getting student fees payable

#    <str:date>/<str:student_name>/<int:classes_id>/<str:student_name>/
]
