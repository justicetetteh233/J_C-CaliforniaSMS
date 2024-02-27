from .models import *
from .serializer import *
from math import *

class report():
    def getTermDetail(self, term_id):
        term = TermDetails.objects.get(pk= term_id)
        termDetails = {
            "id" : term.id,
            "term_name" : term.term_name,
            "term_opening_date" : term.term_opening_date,
            "term_vacation_date" : term.term_vacation_date,
            "next_term_reopening_date" : term.next_term_reopening_date,
            "term_midterm_date" : term.term_midterm_date,
            "next_resume_reopening_date": term.next_resume_reopening_date,
            "term_number_of_days" : term.term_number_of_days,
            "other_term_details": term.other_term_details
        }
        return termDetails
    def reportdetails(self,student_id,term_details_id):
        student = Student.objects.get(pk=student_id)
        term_details = TermDetails.objects.get(pk=term_details_id)
        student_terminal_report_details = StudentTerminalReportDetails.objects.get(student=student,
                                                                                   term=term_details)

        response_data = {
            "subject_of_interest": student_terminal_report_details.subject_of_interest,
            "conduct": student_terminal_report_details.conduct,
            "special_skill_observed": student_terminal_report_details.special_skill_observed,
            "progress_in_reading": student_terminal_report_details.progress_in_reading,
            "class_teachers_remarks": student_terminal_report_details.class_teachers_remarks,
            "Total attendance ": student_terminal_report_details.term_attendance
        }
        return response_data
    def gradeAndRemarksProvider(self,total_marks):
        grade = "notdefined"
        remarks = "notdefined"

        if (total_marks > 79):
            grade = "A"
            remarks = "EXCELLENT"
        if (total_marks > 74 and total_marks < 80):
            grade = "B+"
            remarks = "VERY GOOD"
        if (total_marks > 69 and total_marks < 75):
            grade = "B"
            remarks = "GOOD"
        if (total_marks > 64 and total_marks < 70):
            grade = "C+"
            remarks = "AVERAGE"

        if (total_marks > 59 and total_marks < 65):
            grade = "C"
            remarks = "BELOW AVERAGE"

        if (total_marks > 54 and total_marks < 60):
            grade = "D+"
            remarks = "CREDIT"

        if (total_marks > 49 and total_marks < 55):
            grade = "D"
            remarks = "BELOW CREDIT"

        if (total_marks > 44 and total_marks < 50):
            grade = "E"
            remarks = "PASS"

        if (total_marks < 45):
            grade = "F"
            remarks = "FAIL"

        return {"grade" : grade , "remarks" : remarks}
    def subjectsFeildDetailsProvider(self,student_id,term_id):
        def position(num):
            if num % 10 == 1:
                txt = "st"
            elif num % 10 == 2:
                txt = "nd"
            elif num % 10 == 3:
                txt = "rd"
            else:
                txt = "th"
            return f"{num} {txt}"

        student = Student.objects.get(pk=student_id)
        term = TermDetails.objects.get(pk = term_id)
        class_level = student.classLevel
        class_level_students = Student.objects.filter(classLevel=class_level)

        number_on_roll = 0
        for class_level_student in class_level_students:
            number_on_roll = number_on_roll + 1



        student_courses = CourseStudent.objects.filter(student=student,term = term)
        course_details = []

        for student_course in student_courses:
            course_id = student_course.course.id
            total_marks = student_course.exams_score + student_course.class_score

            course = Course.objects.get(pk=course_id)
            course_students = CourseStudent.objects.filter(course=course)
            course_student_marks = []


            for course_student in course_students:
                student_total_marks = course_student.class_score + course_student.exams_score
                course_student_marks.append(student_total_marks)

            course_student_marks.sort()
            course_student_marks.reverse()
            positionnum = course_student_marks.index(total_marks) + 1



            course_data = {
                "course_id": student_course.course.id,
                "course_name": student_course.course.subject_name,
                "class_score": student_course.class_score,
                "exams_score": student_course.exams_score,
                "total_marks": total_marks,
                "position": position(positionnum),
                "grade": self.gradeAndRemarksProvider(total_marks)["grade"],
                "remarks": self.gradeAndRemarksProvider(total_marks)["remarks"]
            }
            course_details.append(course_data)

        return {"course_details":course_details , "number_on_roll": number_on_roll}
    def terminalreportProvider(self, student_id,Term_details_id):
        student = Student.objects.get(pk=student_id)
        term_details =self.getTermDetail(Term_details_id)
        student_report_teachers_remarks = self.reportdetails(student_id, Term_details_id)

        response_data = {
            "student_name": f"{student.surname} {student.otherName}",
            "class_level": student.classLevel.name,

            "term_name": term_details["term_name"],
            "term_vacation_date": term_details["term_vacation_date"],
            "next_resume_reopening_date": term_details["next_resume_reopening_date"],
            "term_number_of_days": term_details["term_number_of_days"],

            "number_on_roll": self.subjectsFeildDetailsProvider(student_id, Term_details_id)["number_on_roll"],
            "course_details": self.subjectsFeildDetailsProvider(student_id, Term_details_id)["course_details"],
            "student_teachers_remarks": student_report_teachers_remarks
        }
        return response_data