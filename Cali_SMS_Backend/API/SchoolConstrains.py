from math import *
class SchoolConstrains():
    """this constrain is used when ever a new term is created, it allows the system to automatically create report
    records for all the current students in the term based on that term, the school finance system with all the debt
    the students are supposed to pay to aid financial statement calculation"""
    def termlyUpdates(self, term):
        # print("i have also started ")
        from .models import Student,StudentTerminalReportDetails,CourseStudent,StudentFeesPayable,ObserverAllowances,AllowancesPaidForObserverStudent
        # create terminal report field to be filled by the student when a new term is registered
        current_term = term
        for student in Student.objects.all():
            if (student.classLevel.school == current_term.school):
                StudentTerminalReportDetails.objects.create(student=student, term=current_term)

                # create all Courses for students terminal report
                for course in student.classLevel.course.all():
                    CourseStudent.objects.create(course=course, student=student, term=current_term)

                # making all students pay for that terms debt
                for fees in student.classLevel.fees.all():
                    if fees.payment_intervals=="Termly"  and  student.student_status == "Enrolling":
                        StudentFeesPayable.objects.create(fee=fees, student=student, Term=current_term)

                #deducting fees that are allowed from that of special student from it
                if student.is_observer  and  student.student_status == "Enrolling":
                    observations = ObserverAllowances.objects.filter(student = student)
                    for observe in observations:
                        AllowancesPaidForObserverStudent.objects.create(term= current_term,student = student, feeType = observe.feeType, amount = observe.amount)

    """this constrain is used when a new student is created or admitted
   it automatically creates report cards entry feilds, creates all the financial obligations the student is expected to pay for admission term
    and handles non termly fees like admission fees """
    def studentNeccesaryUpdateWhenCreated(self,student):
        # auto create terminal report for a student when ever he or she is admitted newly
        from   .models import StudentTerminalReportDetails,CourseStudent,StudentFeesPaid,StudentFeesPayable
        StudentTerminalReportDetails.objects.create(student=student, term=student.admission_term)

        # auto create courses,fees payable, fees paid for a student when he or she is newly admitted
        if student.classLevel:
            for course in student.classLevel.course.all():
                CourseStudent.objects.create(course=course, student=student, term=student.admission_term)

            StudentFeesPayable.objects.create(fee=student.admission_fees_payable, student=student, Term=student.admission_term)
            StudentFeesPaid.objects.create(term=student.admission_term,student = student, feeType = student.admission_fees_payable, amount = student.admission_payments)
            for fees in student.classLevel.fees.all():
                if fees.paymentIntervals=="Termly":
                    StudentFeesPayable.objects.create(fee=fees, student=student, Term=student.admission_term)

    # this function is used when ever a student is initiated for observer allowance
    def observerCreateUpdate(self,allowance):
        from .models import AllowancesPaidForObserverStudent
        AllowancesPaidForObserverStudent.objects.create(term=allowance.term, student=allowance.student,
                                                        feeType=allowance.feeType,
                                                        amount=allowance.amount)
                    
    """this constrain works when ever a payment period is created an update is also confirmed. it  involves updating 
        all staff financial account with the necessary payments or collection of salaries registered to be paid within that 
        period. This helps when generating the financial statement of the firm  or individual staff of the company """
    def PaymentUpdate(self, paymentperiod):
        from .models import StaffWage, PaymentPeriod , StaffSalariesPayable

        staff_salaries_registered = StaffWage.objects.all()
        payment_period_instance = PaymentPeriod.objects.first()
        intermediate_table = payment_period_instance.wages_to_be_paid.through
        period_wages = intermediate_table.objects.filter(paymentperiod =paymentperiod.period)
        for wages in period_wages:
            # print(wages.wage.title)
            for salaries in staff_salaries_registered:
                # print(salaries.WageType.title)
                if wages.wage == salaries.WageType:
                    print("yes")
                    StaffSalariesPayable.objects.create(period= paymentperiod.period, debt = salaries )

            # print(wages.paymentperiod.name)
