from django.conf import settings
from .SchoolConstrains import *
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from .models_For_Finance import *


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, userType=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)

        if not username:
            raise ValueError("The Username field must be set")

        user = self.model(username=username, userType=userType, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('userType', 'superuser')

        return self.create_user(username, password, **extra_fields)

    def create_staff(self, username, password=None, **extra_fields):
        return self.create_user(username, password, userType='staff', **extra_fields)

    def create_proprietor(self, username, password=None, **extra_fields):
        return self.create_user(username, password, userType='proprietor', **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    userType = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    objects = CustomUserManager()
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    class Types(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        HEADMASTER = 'headmaster', 'Headmaster'
        PROPRIETOR = 'proprietor', 'Proprietor'

    userType = models.CharField(max_length=100, choices=Types.choices, default=Types.ADMIN)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['userType']

    def get_full_name(self):
        # Implement get_full_name method
        pass

    def get_short_name(self):
        # Implement get_short_name method
        pass

    def __str__(self):
        return self.username


class Proprietor(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    surname = models.CharField(max_length=200, null=True)
    otherName = models.CharField(max_length=200, null=True)
    dateOfBirth = models.DateField(null=True)
    age = models.IntegerField(null=True)
    phone = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    residentialAddress = models.CharField(max_length=200, null=True)
    parentName = models.CharField(max_length=200, null=True)
    otherInformation = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.surname + ' ' + self.otherName


# Other model definitions...
class School(models.Model):
    name = models.CharField(max_length=200, null=True)
    schoolMotto = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    residentialAddress = models.CharField(max_length=200, null=True)
    registrationDateOfTheSchool = models.CharField(max_length=200, null=True)
    otherInformation = models.CharField(max_length=200, null=True)
    proprietor = models.ForeignKey(Proprietor, null=True, on_delete=models.SET_NULL)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.name} id is {self.id} "


class StaffSalary(models.Model):
    user = models.OneToOneField(CustomUser, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    amount = models.FloatField(null=True)


class TermDetails(models.Model):
    term_name = models.CharField(max_length=200, null=True, blank=True)
    term_opening_date = models.DateField(auto_now_add=True, null=True, blank=True)
    term_vacation_date = models.DateField(auto_now_add=True, null=True, blank=True)
    next_term_reopening_date = models.DateField(auto_now_add=True, null=True, blank=True)
    term_midterm_date = models.DateField(auto_now_add=True, null=True, blank=True)
    next_resume_reopening_date = models.DateField(auto_now_add=True, null=True, blank=True)
    term_number_of_days = models.IntegerField(null=True, blank=True)
    other_term_details = models.CharField(max_length=200, blank=True)
    school = models.ForeignKey(School, null=True, on_delete=models.SET_NULL, blank=True)

    def save(self, *args, **kwargs):
        if self.id is None:
            super().save(*args, **kwargs)
            # save the instance created and perform system update from SchoolConstrains on new term created
            SchoolConstrains().termlyUpdates(self)

        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f" {self.term_name} id is {self.id}"


class Course(models.Model):
    subject_name = models.CharField(max_length=200, null=True)
    Teacher_code = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.subject_name


class Department(models.Model):
    name = models.CharField(max_length=200, null=True)
    school = models.ForeignKey(School, null=True, on_delete=models.SET_NULL)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name


class SchoolCommittees(models.Model):
    name = models.CharField(max_length=200, null=True)
    school = models.ForeignKey(School, null=True, on_delete=models.SET_NULL)
    description = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name


class Fee(models.Model):
    name = models.CharField(max_length=200, null=True)
    school = models.ForeignKey(School, null=True, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True)
    amount = models.FloatField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    SchoolBodies_that_pay = models.ForeignKey(SchoolCommittees, null=True, on_delete=models.CASCADE)
    paymentIntervals = models.CharField(max_length=15,
                                        choices=[('Daily', 'Daily'), ('Weekly', 'Weekly'), ('Monthly', 'Monthly'),
                                                 ('Termly', 'Termly'), ('Yearly', 'Yearly'),
                                                 ('Occationally', 'Occationally')], null=True, blank=True)

    def __str__(self):
        return self.name


class ClassLevel(models.Model):
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    fees = models.ManyToManyField(Fee)
    course = models.ManyToManyField(Course)
    school = models.ForeignKey(School, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Staff(models.Model):
    date_registered = models.DateTimeField(auto_now_add=True, null=True)
    surname = models.CharField(max_length=200, null=True)
    otherName = models.CharField(max_length=200, null=True)
    dateOfBirth = models.DateField(max_length=200, null=True)
    school = models.ManyToManyField(School)
    school_committee = models.ForeignKey(SchoolCommittees, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.otherName


class ClassTeacherMap(models.Model):
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    classLevel = models.ForeignKey(ClassLevel, null=True, blank=True, on_delete=models.SET_NULL)
    staff = models.ForeignKey(Staff, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.classLevel.name} {self.staff.surname}"


class Student(models.Model):
    surname = models.CharField(max_length=200, null=True)
    otherName = models.CharField(max_length=200, null=True)
    dateOfBirth = models.DateField(max_length=200, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    mothersName = models.CharField(max_length=200, null=True, blank=True)
    mothersTell = models.CharField(max_length=200, null=True, blank=True)
    fathersName = models.CharField(max_length=200, null=True, blank=True)
    fathersTell = models.CharField(max_length=200, null=True, blank=True)
    guardianName = models.CharField(max_length=200, null=True, blank=True)
    guardianTell = models.CharField(max_length=200, null=True, blank=True)
    relationshipToChild = models.CharField(max_length=200, null=True, blank=True)
    residentialAddress = models.CharField(max_length=200, null=True, blank=True)
    classLevel = models.ForeignKey(ClassLevel, null=True, on_delete=models.SET_NULL, blank=True)
    date_registered = models.DateTimeField(auto_now_add=True, null=True)
    previous_school_attended = models.CharField(max_length=200, null=True, blank=True)

    admission_term = models.ForeignKey(TermDetails, null=True, blank=True, on_delete=models.SET_NULL)
    admission_fees_payable = models.ForeignKey(Fee, null=True, on_delete=models.SET_NULL, blank=True)
    admission_payments = models.FloatField(default=0, null=True)

    school_committee = models.ForeignKey(SchoolCommittees, null=True, blank=True, on_delete=models.SET_NULL)
    balance = models.FloatField(null=True, default=0)
    student_status = models.CharField(max_length=100, choices=[('Enrolling', 'Enrolling'), ('Completed', 'Completed'),
                                                               ('Left', 'Left')], null=True, blank=True)
    is_observer = models.BooleanField(null=False)

    def __str__(self):
        return f" {self.otherName} id is {self.id}"

    def save(self, *args, **kwargs):
        if self.id is None:
            super().save(*args, **kwargs)
            # this code performs student creation constrains in the school
            SchoolConstrains().studentNeccesaryUpdateWhenCreated(self)

        else:
            super().save(*args, **kwargs)


# other personalities about a student for all the term part to be filled for the terminal report by the teacher
class StudentTerminalReportDetails(models.Model):
    student = models.ForeignKey(Student, null=True, on_delete=models.SET_NULL)
    term = models.ForeignKey(TermDetails, null=True, on_delete=models.SET_NULL)
    subject_of_interest = models.CharField(max_length=200, null=True, blank=True)
    conduct = models.CharField(max_length=200, null=True, blank=True)
    special_skill_observed = models.CharField(max_length=200, null=True, blank=True)
    progress_in_reading = models.CharField(max_length=200, null=True, blank=True)
    class_teachers_remarks = models.CharField(max_length=200, null=True, blank=True)
    term_attendance = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.student} report detail for {self.term}"


# they do with their marks they had
class CourseStudent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    term = models.ForeignKey(TermDetails, on_delete=models.CASCADE)
    class_score = models.FloatField(null=True, default=0)
    exams_score = models.FloatField(null=True, default=0)

    def __str__(self):
        return f"{self.student} - {self.course}-{self.id}"


"""
FINANCE SECTION A (STUDENT FINANCE LEDGER)
Tables to handle the fee payment and  fee allocation to students within  every period or term
"""


# this table shows  all the fees supposed to be received in the school from any student
class StudentFeesPayable(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    fee = models.ForeignKey(Fee, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Term = models.ForeignKey(TermDetails, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} -{self.student}- {self.fee} amount {self.fee.amount}"


# this table show all the payment the students have made to the school
class StudentFeesPaid(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    feeType = models.ForeignKey(Fee, on_delete=models.CASCADE)
    term = models.ForeignKey(TermDetails, on_delete=models.CASCADE)
    amount = models.FloatField(null=True, default=0)

    def __str__(self):
        return f"{self.student} - {self.feeType} amount {self.amount}"


# this table contains all the  allowances the school decides to pay on behalf of any student
# based on observer conditions
class AllowancesPaidForObserverStudent(models.Model):
    date = models.DateField(auto_now_add=True, null=True)
    term = models.ForeignKey(TermDetails, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    feeType = models.ForeignKey(Fee, on_delete=models.CASCADE)
    amount = models.FloatField(null=True, default=0)

    def __str__(self):
        return f"{self.student} allowed to be observed on  {self.feeType}  at {self.amount} paid "


#  this is a table that contain  list of people the school has accepted as observers and so are with the fees and amount
class ObserverAllowances(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    feeType = models.ForeignKey(Fee, on_delete=models.CASCADE)
    amount = models.FloatField(null=True, default=0)
    term = models.ForeignKey(TermDetails, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student} allowed to be observed on  {self.feeType}  at {self.amount} "

    def save(self, *args, **kwargs):

        if self.id is None:
            if self.student.is_observer:
                # This is a new instance being created
                super().save(*args, **kwargs)
                # this is used to update the system with the newly registered student allowance
                SchoolConstrains().observerCreateUpdate(self)

            if not self.student.is_observer:
                print("this student is not an observer")

        else:
            super().save(*args, **kwargs)


"""
FINANCE SECTION B (STAFF DAY BOOKS OR LEDGER)
this contain all the details of the  kinds of payments the school makes to all its 
based on the debt they owe them
"""


class Wage(models.Model):
    Date = models.DateField(auto_now=True, null=True)
    title = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f"{self.title}"


class StaffWage(models.Model):
    staff = models.ForeignKey(Staff, null=True, on_delete=models.SET_NULL, blank=True)
    WageType = models.ForeignKey(Wage, null=True, on_delete=models.SET_NULL, blank=True)
    amount = models.FloatField(null=True)

    def __str__(self):
        return f"{self.staff}  {self.WageType}  {self.amount}"


class PaymentPeriod(models.Model):
    date = models.DateTimeField(auto_now_add=True, null=True)
    name = models.CharField(max_length=200, null=True)
    school = models.ForeignKey(School, null=True, on_delete=models.SET_NULL, blank=True)
    wages_to_be_paid = models.ManyToManyField(Wage)

    def save(self, *args, **kwargs):
        if self.id is None:
            super().save(*args, **kwargs)

        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f" {self.name}  {self.school} {self.wages_to_be_paid.count()}"


class PeriodFinanceUpdate(models.Model):
    date = models.DateTimeField(auto_now_add=True, null=True)
    period = models.ForeignKey(PaymentPeriod, null=True, on_delete=models.SET_NULL, blank=True)
    confirm = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id} confirm  at {self.date}"

    def save(self, *args, **kwargs):
        if self.id is None:
            super().save(*args, **kwargs)
            # this session of the code activates all the rules of appling to school session
            SchoolConstrains().PaymentUpdate(self)

        else:
            super().save(*args, **kwargs)


class StaffSalariesPayable(models.Model):
    period = models.ForeignKey(PaymentPeriod, null=True, on_delete=models.SET_NULL, blank=True)
    debt = models.ForeignKey(StaffWage, null=True, on_delete=models.SET_NULL, blank=True)

    def __str__(self):
        return f" {self.period.name}  debt of  kind {self.debt.amount} is payable"


class StaffSalaryPaid(models.Model):
    specific_debt = models.ForeignKey(StaffSalariesPayable, null=True, on_delete=models.SET_NULL, blank=True)
    amount = models.FloatField(null=True)

    def __str(self):
        return f"{self.staff.surname}  has been paid  {self.amount} for {self.period.name} with id of {self.id}"
