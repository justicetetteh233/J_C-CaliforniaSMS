from .models import *
from .serializer import *
from math import *


class SchoolFinance():
    alllfees = StudentFeesPayable.objects.all()

    def allfees(self):
        totalfees = 0
        for sfee in self.alllfees:
            totalfees = sfee.fee.amount + totalfees

        print(totalfees)
        return (totalfees)

    def totalfeesforterm(self, term_id):
        totalfees = 0
        term = TermDetails.objects.get(pk=term_id)
        termfeespayable = StudentFeesPayable.objects.filter(Term=term)
        for studentfeespayable in termfeespayable:
            totalfees = studentfeespayable.fee.amount + totalfees

        return totalfees

    # this is used to show all the fees a student is expected to pay based on his class or term
    def studenttotalfeespayableforterm(self, term_id, student_id):
        totalfees = 0
        feespayable = []
        student = Student.objects.get(pk=student_id)
        term = TermDetails.objects.get(pk=term_id)
        all_fees_to_be_paid_by_student = StudentFeesPayable.objects.filter(student=student, Term=term)
        for debt in all_fees_to_be_paid_by_student:
            feeDetail = {
                "feename": debt.fee.name,
                "feeamount": debt.fee.amount
            }
            feespayable.append(feeDetail)
            totalfees = debt.fee.amount + totalfees

        debttotal = {"totaldebt": totalfees}
        feespayable.append(debttotal)
        return feespayable

    def studentFeesPaidForTerm(self, term_id, student_id):
        student = Student.objects.get(pk=student_id)
        term = TermDetails.objects.get(pk=term_id)
        feesPaid = StudentFeesPaid.objects.filter(student=student, term=term)
        feesPaidForTerm = []
        totalPayments = 0
        for fees in feesPaid:
            totalPayments = totalPayments + fees.amount
            feesPaidDetail = {
                "date": fees.date,
                "name": fees.feeType.name,
                "amount": fees.amount,
            }
            feesPaidForTerm.append(feesPaidDetail)
        totalAmountPaid = {"total_payments": totalPayments}
        feesPaidForTerm.append(totalAmountPaid)
        return feesPaidForTerm

    def studentBalanceForTerm(self, term_id, student_id):
        return {"Total_Balance": self.studenttotalfeespayableforterm(term_id, student_id)[-1]["totaldebt"] -
                                 self.studentFeesPaidForTerm(term_id, student_id)[-1]["total_payments"]}

    def studentBalanceForTheVariousTypesOfFees(self, term_id, student_id):
        student = Student.objects.get(pk=student_id)
        term = TermDetails.objects.get(pk=term_id)
        fees_to_be_paid_by_student = StudentFeesPayable.objects.filter(student=student, Term=term)
        variousFeesBalance = []
        for fees in fees_to_be_paid_by_student:
            feetype = fees.fee
            payment_on_this_particular_fee = StudentFeesPaid.objects.filter(term=term, student=student, feeType=feetype)
            totalPaymentsmade = 0

            for paymentsmade in payment_on_this_particular_fee:
                totalPaymentsmade = totalPaymentsmade + paymentsmade.amount

            name = fees.fee.name
            balanceforthefee = fees.fee.amount - totalPaymentsmade
            debtBalance = {f"Balance of {name}": balanceforthefee}
            variousFeesBalance.append(debtBalance)

        variousFeesBalance.append(self.studentBalanceForTerm(term_id, student_id))
        return variousFeesBalance

    def studentFinancialReport(self, term_id, student_id):
        responsedata = [
            [{"Debit": "Debit"},
             self.studenttotalfeespayableforterm(term_id, student_id)],
            [{"credit": "credit"},
             self.studentFeesPaidForTerm(term_id, student_id),
             {"Balances": "Balances"},
             self.studentBalanceForTheVariousTypesOfFees(term_id, student_id),
             {"TOTAL": self.studentFeesPaidForTerm(term_id, student_id)[-1]["total_payments"] +
                       self.studentBalanceForTerm(term_id, student_id)["Total_Balance"]}
             ]
        ]

        return responsedata
    
    """this User story is as a proprietor I want to  get fees payment based on the following 
    1 -> classes 
    2 -> Name of the studetent 
    3 -> date 
    4 -> term
    5 -> feeType 
    """


    def getFeesPaidByStudents(self, term_id=None, student_name=None, date=None, classes_id=None):
        if term_id is not None:
            term_fees = StudentFeesPaid.objects.filter(term=term_id)
            
            if student_name is not None:
                term_fees = term_fees.filter(student__surname__icontains=student_name)
                term_fees = term_fees.values('id','student__id','date', 'student__surname', 'feeType__name', 'amount')
                return term_fees
            
            
            if date is not None:
                term_fees = term_fees.filter(date = date)
                term_fees = term_fees.values('id','student__id','date', 'student__surname', 'feeType__name', 'amount')
                return term_fees
            
            
            if classes_id is not None:
                term_fees = term_fees.filter(student__classLevel__id = classes_id)
                term_fees = term_fees.values('id','student__id','date', 'student__surname', 'feeType__name', 'amount')
                return term_fees
            
            return  term_fees.values('id','student__id','date','student__surname','feeType__name','amount')
                    
        else:
            term_fees = StudentFeesPaid.objects.all()
            return term_fees.values('id','student__id','date','student__surname','feeType__name','amount')

                    