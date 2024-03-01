import React from "react";
import StudentFinancialStatement  from "./financialreport"
const ExpensesPage = () => {
    const selectedTerm =3;
    const selectedStudent = 1;
  
    return (
      <div>
        <StudentFinancialStatement
          selectedTerm={selectedTerm}
          selectedStudent={selectedStudent}
        />
      </div>
    );
  };
  

export default ExpensesPage;