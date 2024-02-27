import os
from datetime import datetime
from django.db.models.functions import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from .finance import *
from .report import *
from django.core.exceptions import ImproperlyConfigured
from rest_framework.parsers import FileUploadParser
from .serializer import *
from .models import Proprietor
# from math import *
import subprocess
from django.http import JsonResponse
from django.core import management
from rest_framework.decorators import api_view, parser_classes


# @api_view(['POST'])
# def backup_database():
#     try:
#         management.call_command('dbbackup', '--clean', '--verbosity', '0')
#         return JsonResponse({'message': 'Database backup successful.'})
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)
#
#
# @api_view(['POST'])
# @parser_classes([FileUploadParser])
# def restore_database(request):
#     if 'file' not in request.FILES:
#         return JsonResponse({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
#
#     uploaded_file = request.FILES['file']
#     try:
#         management.call_command('flush', '--noinput')
#         management.call_command('migrate', '--noinput')
#         management.call_command('dbrestore', '--noinput', '--verbosity', '0')
#         return JsonResponse({'message': 'Database restore successful.'})
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@require_POST
def backup_database(request):
    try:
        # Specify the directory where backups should be stored
        backup_directory = os.path.join(settings.BASE_DIR, 'API/management/backups')

        # Create the backup directory if it doesn't exist
        os.makedirs(backup_directory, exist_ok=True)

        # Generate a timestamp for the backup file
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')

        # Create a backup file name with timestamp
        backup_file = os.path.join(backup_directory, f"backup_{timestamp}.sql")

        # Run the mysqldump command to create a backup
        subprocess.run(
            [
                'mysqldump',
                '--user=' + settings.DATABASES['default']['USER'],
                '--password=' + settings.DATABASES['default']['PASSWORD'],
                '--host=' + settings.DATABASES['default']['HOST'],
                '--port=' + settings.DATABASES['default']['PORT'],
                settings.DATABASES['default']['NAME'],
            ],
            stdout=open(backup_file, 'w'),
        )

        return JsonResponse({'message': f'Database backup created: {backup_file}'})
    except Exception as e:
        return JsonResponse({'error': f'Error creating database backup: {e}'}, status=500)


@csrf_exempt
@require_POST
def restore_database(request):
    try:
        backup_file = request.FILES['backupFile']

        # Specify the directory where backups should be stored
        backup_directory = os.path.join(settings.BASE_DIR, 'API/management/backups')

        # Create the backup directory if it doesn't exist
        os.makedirs(backup_directory, exist_ok=True)

        # Save the uploaded backup file
        backup_file_path = os.path.join(backup_directory, backup_file.name)
        with open(backup_file_path, 'wb') as destination:
            for chunk in backup_file.chunks():
                destination.write(chunk)

        # Run the mysql command to restore the database from the specified backup file
        subprocess.run(
            [
                'mysql',
                '--user=' + settings.DATABASES['default']['USER'],
                '--password=' + settings.DATABASES['default']['PASSWORD'],
                '--host=' + settings.DATABASES['default']['HOST'],
                '--port=' + settings.DATABASES['default']['PORT'],
                settings.DATABASES['default']['NAME'],
            ],
            stdin=open(backup_file_path, 'rb'),
        )

        # Clean up: delete the uploaded backup file after restoration
        os.remove(backup_file_path)

        return JsonResponse({'message': f'Database restored from backup.'})
    except Exception as e:
        return JsonResponse({'error': f'Error restoring database from backup: {e}'}, status=500)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({
            'token': token.key,
            'user': CustomUserSerializer(user).data,
        })


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Invalidate or delete the token here
        request.auth.delete()
        return Response({"detail": "Logout successful"})


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(userType='admin', )  # TODO: "usertype needs to be dynamic"
            token, _ = Token.objects.get_or_create(user=user)
            response_data = {
                "token": token.key,
                "user": serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#       User type permissions
class UserTypePermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.userType in (CustomUser.Types.ADMIN, CustomUser.Types.PROPRIETOR):
            return True  # Admins have all permissions
        elif user.userType == CustomUser.Types.HEADMASTER:
            return request.method in ('GET', 'POST')  # Heads can only read and create
        return False  # Other user types have no permissions


class YourView(APIView):
    permission_classes = [UserTypePermission]


class UserListView(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        userType = self.request.data.get('userType')
        if userType is None:
            serializer.save(userType=None)
        else:
            serializer.save(userType=userType)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer


# Proprietor views
class ProprietorListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        proprietors = Proprietor.objects.all()
        serializer = ProprietorSerializer(proprietors, many=True)
        return Response(serializer.data)

    def post(self, request):
        proprietor_serializer = ProprietorSerializer(data=request.data)
        if proprietor_serializer.is_valid():
            # Retrieve the user instance if it exists
            existing_user = None
            try:
                existing_user = CustomUser.objects.get(
                    username=proprietor_serializer.validated_data['user'].username)
            except CustomUser.DoesNotExist:
                pass  # User doesn't exist, this is expected

            if existing_user:
                # Associate the existing user with the new Proprietor instance
                proprietor_serializer.validated_data['user'] = existing_user
            else:
                user_serializer = CustomUserSerializer(data={
                    'username': proprietor_serializer.validated_data['user']['username'],
                    'password': 'defaultpassword',  # Set a default password
                    'userType': 'proprietor',
                })

                if user_serializer.is_valid():
                    user = user_serializer.save()  # Save the user instance
                    proprietor_serializer.validated_data['user'] = user  # Assign user to proprietor
                else:
                    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            proprietor = proprietor_serializer.save()  # Save the proprietor instance

            # Create an authentication token for the user
            token, _ = Token.objects.get_or_create(user=proprietor.user)

            response_data = {
                "token": token.key,
                "proprietor": proprietor_serializer.data,
                "user": CustomUserSerializer(proprietor.user).data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(proprietor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Individual Proprietor views
class ProprietorDetailView(APIView):
    def get_object(self, pk):
        try:
            return Proprietor.objects.get(pk=pk)
        except Proprietor.DoesNotExist:
            return None

    def get(self, request, pk):
        proprietor = self.get_object(pk)
        if not proprietor:
            return Response({"detail": "Proprietor not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProprietorSerializer(proprietor)
        return Response(serializer.data)

    def put(self, request, pk):
        proprietor = self.get_object(pk)
        if not proprietor:
            return Response({"detail": "Proprietor not found."}, status=status.HTTP_404_NOT_FOUND)

        proprietor_serializer = ProprietorSerializer(proprietor, data=request.data)
        if proprietor_serializer.is_valid():
            user_serializer = CustomUserSerializer(proprietor.user, data={
                'userType': 'proprietor',  # Ensure userType is 'proprietor'
            })

            if user_serializer.is_valid():
                proprietor_serializer.save()
                user_serializer.save()
                return Response(proprietor_serializer.data)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(proprietor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        proprietor = self.get_object(pk)
        if not proprietor:
            return Response({"detail": "Proprietor not found."}, status=status.HTTP_404_NOT_FOUND)

        proprietor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # DEPARTMENT VIEWS


class DepartmentListView(APIView):
    def get(self, request):
        department = Department.objects.all()
        serializer = DepartmentSerializer(department, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentDetailView(APIView):
    serializers = DepartmentSerializer

    def get_object(self, pk):
        return get_object_or_404(Department, pk=pk)

    def get(self, request, pk):
        department = self.get_object(pk)
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)

    def put(self, request, pk):
        department = self.get_object(pk)
        serializer = DepartmentSerializer(department, data=request.data)
        if not department:
            return Response({"detail": "Department not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DepartmentSerializer(department, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        department = self.get_object(pk)
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ALL STUDENTS VIEW AND MANUPULATIONS
class StudentListView(generics.ListCreateAPIView):
    # collecting list of students in a class or all students
    def get_students_by_class(self, class_id):
        if class_id == 'all':
            students = Student.objects.all()
        else:
            students = Student.objects.filter(classLevel_id=class_id)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def get(self, request, class_id=None):
        if class_id is not None:
            return self.get_students_by_class(class_id)
        else:
            students = Student.objects.all()
            serializer = StudentSerializer(students, many=True)
            return Response(serializer.data)

    # adding a student to the school
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Individual Student view AND MANUPILATIONS
class StudentDetailView(APIView):
    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return None

    def get(self, request, pk):
        student = self.get_object(pk)
        if not student:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk):
        student = self.get_object(pk)
        if not student:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = self.get_object(pk)
        if not student:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Schools Views ALL SCHOOLS VIEW AND MANIPULATIONS
class SchoolListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        school = School.objects.all()
        serializer = SchoolSerializer(school, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Individual SCHOOL VIEW AND MANIPULATIONS
class SchoolDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return School.objects.get(pk=pk)
        except School.DoesNotExist:
            return None

    def get(self, request, pk):
        school = self.get_object(pk)
        if not school:
            return Response({"detail": "School not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SchoolSerializer(school)
        return Response(serializer.data)

    def put(self, request, pk):
        school = self.get_object(pk)
        if not school:
            return Response({"detail": "School not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SchoolSerializer(school, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        school = self.get_object(pk)
        if not school:
            return Response({"detail": "School not found."}, status=status.HTTP_404_NOT_FOUND)

        school.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ALL STAFF VIEW AND MANIPULATIONS
class StaffListView(APIView):
    def get(self, request):
        staff = Staff.objects.all()
        serializer = StaffSerializer(staff, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            user_serializer = CustomUserSerializer(data={
                'username': serializer.validated_data['username'],
                'password': 'defaultpassword',  # Set a default password
                'userType': 'staff',
            })
            if user_serializer.is_valid():
                user = user_serializer.save()  # Save the user instance
                serializer.validated_data['user'] = user  # Assign user to staff
                staff = serializer.save()  # Save the staff instance
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# INDIVIDUAL STAFF VIEW AND MANIPULATIONS
class StaffDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Staff, pk=pk)

    def get(self, request, pk):
        staff = self.get_object(pk)
        serializer = StaffSerializer(staff)
        return Response(serializer.data)

    def put(self, request, pk):
        staff = self.get_object(pk)
        serializer = StaffSerializer(staff, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        staff = self.get_object(pk)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ALL STAFF SALARIES MANIPULATIONS
class StaffSalaryListView(APIView):
    def get(self, request):
        staff_salaries = StaffSalary.objects.all()
        serializer = StaffSalarySerializer(staff_salaries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StaffSalarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# INDIVIDUAL SALARY VIEW AND MANUPULATIONS
class StaffSalaryDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(StaffSalary, pk=pk)

    def get(self, request, pk):
        staff_salary = self.get_object(pk)
        serializer = StaffSalarySerializer(staff_salary)
        return Response(serializer.data)

    def put(self, request, pk):
        staff_salary = self.get_object(pk)
        serializer = StaffSalarySerializer(staff_salary, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        staff_salary = self.get_object(pk)
        staff_salary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ALL CLASSES VIEW AND MANUPULATION
# List all class levels and create a new class level
class ClassLevelListView(APIView):

    def get(self, request):
        class_levels = ClassLevel.objects.all()
        serializer = ClassLevelSerializer(class_levels, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClassLevelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve, update, or delete a class level instance
class ClassLevelDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(ClassLevel, pk=pk)

    def get(self, request, pk):
        class_level = self.get_object(pk)
        serializer = ClassLevelSerializer(class_level)
        return Response(serializer.data)

    def put(self, request, pk):
        class_level = self.get_object(pk)
        serializer = ClassLevelSerializer(class_level, data=request.data)
        if not class_level:
            return Response({"detail": "Class Level not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClassLevelSerializer(class_level, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        class_level = self.get_object(pk)
        class_level.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# List all fees and create a new fee
class FeeListView(APIView):
    def get_fees_in_a_class(self, class_id ):
        classlevels = ClassLevel.objects.get(pk = class_id)
        classFees = classlevels.fees
        serializer = FeeSerializer(classFees,many =True)
        return Response(serializer.data)

    def get(self, request,class_id = None):
        if class_id is not None:
          return self.get_fees_in_a_class(class_id ) 
        else: 
            fees = Fee.objects.all()
            serializer = FeeSerializer(fees, many=True)
            return Response(serializer.data)


    def post(self, request):
        serializer = FeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve, update, or delete a fee instance
class FeeDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Fee, pk=pk)

    def get(self, request, pk):
        fee = self.get_object(pk)
        serializer = FeeSerializer(fee)
        return Response(serializer.data)

    def put(self, request, pk):
        fee = self.get_object(pk)

        serializer = FeeSerializer(fee, data=request.data)

        if not fee:
            return Response({"detail": "Fee not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = FeeSerializer(fee, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        fee = self.get_object(pk)
        fee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FrontEndClassLevelListView(APIView):
    def classgetter(self, school_id):
        school = School.objects.get(pk=school_id)
        classLevels = ClassLevel.objects.filter(school=school)
        classes_in_the_school = []
        for classes in classLevels:
            classteacher = "NONE"
            class_teacher_map = ClassTeacherMap.objects.filter(classLevel=classes)
            if class_teacher_map.__len__() != 0:
                classteacher = class_teacher_map[0].staff.otherName
            # if classMaster.DoesNotExist:
            #     classMaster = "none"
            numberonroll = 0
            numberoffemales = 0
            numberofmales = 0
            for students in Student.objects.all():
                if students.classLevel == classes:
                    numberonroll = numberonroll + 1
                    if students.gender == "Female":
                        numberoffemales = numberoffemales + 1
                    if students.gender == "Male":
                        numberofmales = numberofmales + 1

            classdata = {
                "className": classes.name,
                "numberOnRoll": numberonroll,
                "numberOfFemales": numberoffemales,
                "numberOfMales": numberofmales,
                "Teacher": classteacher,
                "numberOfMales": numberofmales,
                "Teacher": "none"

            }
            classes_in_the_school.append(classdata)

        return classes_in_the_school

    def get(self, request, school_id):
        try:
            return Response(self.classgetter(school_id), status=status.HTTP_200_OK)


        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# This is reponsible for creating,deleting,updating  courses that will be done in a class
class CourseView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        course = Course.objects.get(pk=pk)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        course = Course.objects.get(pk=pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TermDetailsListView(APIView):
    def get(self, request):
        term = TermDetails.objects.all()
        serializer = TermDetailsSerializer(term, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TermDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleTermDetailsView(APIView):
    Report = report()

    def get(self, request, term_id):
        try:
            return Response(self.Report.getTermDetail(term_id), status=status.HTTP_200_OK)

        except TermDetails.DoesNotExist:
            return Response({"detail": "term not found for ID: {}".format(term_id)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# This will contain methods  providing for sending and receving json file which contains the report
class StudentTerminalReportDetailsView(APIView):
    Report = report()

    def get(self, request, student_id, term_details_id):

        try:
            return Response(self.Report.reportdetails(student_id, term_details_id), status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"detail": "Student not found for ID: {}".format(student_id)},
                            status=status.HTTP_404_NOT_FOUND)


class ReportGeneratorView(APIView):
    Report = report()

    def get(self, request, student_id, Term_details_id):
        try:
            return Response(self.Report.terminalreportProvider(student_id, Term_details_id), status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({"detail": "Student not found for ID: {}".format(student_id)},
                            status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, student_id, course_id):
        try:
            new_class_score = request.data.get('new_class_score')
            new_exams_score = request.data.get('new_exams_score')

            student = Student.objects.get(pk=student_id)
            course = Course.objects.get(pk=course_id)

            if student and course:
                course_student = CourseStudent.objects.get(student=student, course=course)
                course_student.class_score = new_class_score
                course_student.exams_score = new_exams_score
                course_student.save()

                return Response({"detail": f"Updated scores for student {student_id} in course {course_id}."},
                                status=status.HTTP_200_OK)
            else:
                return Response({"detail": f"Student or course not found."}, status=status.HTTP_404_NOT_FOUND)

        except Student.DoesNotExist:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({"detail": "Course not found."}, status=status.HTTP_404_NOT_FOUND)
        except CourseStudent.DoesNotExist:
            return Response({"detail": "Student is not registered in the course."},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TranscriptGeneratorView(APIView):
    pass


class SchoolFinanceViews(APIView):
    financedetail = SchoolFinance()

    def get(self, request, term_id, student_id):
        try:
            return Response(self.financedetail.studentFinancialReport(term_id, student_id), status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class StudentFeesPaidViews(APIView):
    def get(self, request,term_id):
        Term = TermDetails.objects.get(pk=term_id)
        try:
            term_fees_paid = StudentFeesPaid.objects.filter(term =Term )
            serializer = StudentFeesPaidSerializer(term_fees_paid, many=True)
            return Response(serializer.data)
            
        except Term.DoesNotExist:
            return Response({"error": "Term does not exist"}, status=status.HTTP_400_BAD_REQUEST )
        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        serializer = StudentFeesPaidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class StudentFeesPayableViews(APIView):
    def get(self, request):
        try:
            feespayable = StudentFeesPayable.objects.all()
            serializer = StudentFeesPayableSerializer(feespayable,many =True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"detail": "An error occurred: {}".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

