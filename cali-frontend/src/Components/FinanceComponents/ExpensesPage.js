import React from "react";
import StudentFinancialStatement  from "./financialreport"
const ExpensesPage = () => {
    const selectedTerm =5;
    const selectedStudent = 2;
  
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