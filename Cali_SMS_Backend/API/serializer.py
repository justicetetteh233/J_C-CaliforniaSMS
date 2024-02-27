from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'userType']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'userType']  # Add more fields as needed
        read_only_fields = ['id', 'userType']

        # def create(self, validated_data):
        #     userType = validated_data.pop('userType', None)
        #     instance = self.Meta.model(**validated_data)
        #     instance.userType = userType
        #     instance.save()
        #     return instance


class ProprietorSerializer(serializers.ModelSerializer):
    # user = CustomUserSerializer()  # TODO:"make sure to change this field in the future"

    class Meta:
        model = Proprietor
        fields = '__all__'


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class StaffSalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffSalary
        fields = '__all__'


class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = '__all__'


class ClassLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLevel
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class TermDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermDetails
        fields = '__all__'

class ClassTeacherMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassTeacherMap
        fields = '__all__'


class StudentTerminalReportDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTerminalReportDetails
        fields = '__all__'


class StudentFeesPayableSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFeesPayable
        fields = '__all__'


class StudentFeesPaidSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFeesPaid
        fields = '__all__'

class AllowancesPaidForObserverStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllowancesPaidForObserverStudent
        fields = '__all__'

class ObserverAllowancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObserverAllowances
        fields = '__all__'


class SchoolCommitteesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolCommittees
        fields = '__all__'