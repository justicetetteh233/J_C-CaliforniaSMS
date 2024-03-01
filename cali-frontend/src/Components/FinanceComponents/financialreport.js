import React, { useState, useEffect } from 'react';
import  "../../Styles/FinanceComponentStyles/financialreport.css"

const StudentFinancialStatement = ({ selectedTerm, selectedStudent }) => {
  const [studentfinancialreport, setStudentFinancialReport] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const currentDate = new Date();

  
  const apiUrl = `http://127.0.0.1:8000/api/studentfinancialstatement/${selectedTerm}/${selectedStudent}/`;
  
  const StudentapiUrl = `http://127.0.0.1:8000/api/student/${selectedStudent}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStudentFinancialReport(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(StudentapiUrl);
        const data = await response.json();
        setStudentDetails(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [StudentapiUrl]);


  if (studentfinancialreport.length === 0) {
    return (<div>student or term is not selected</div>);
  };

  return (
    <div className='mainpage'>
    <div className='s-details'>
      <center><span className='heading'>Financial Statment for {studentDetails['surname']} {studentDetails['otherName']} as at {currentDate.toLocaleString()}</span></center>  
    </div>
    <div className='T-account'>
      <div className='Debt'>
        {/* <h1> {studentfinancialreport[0][0].Debit}</h1> */}
        <span>School Fees Payable</span>
        <table>
          <tr>
            <th>Fee name</th>
            <th> Amount GHC </th>
            <th>Debit Balance</th>
          </tr>
      
          {studentfinancialreport[0][1].map((obj, index) => (
          <tr key={index}>
            {Object.entries(obj).map(([key, content]) => (
              <td  key={key}>
              {content}
              </td>
            ))}
        
          </tr>
          ))}


          <tr>
            
            <td className='t-f'>Total Debits</td>
            <td></td>
            <td  className='t-b'>{studentfinancialreport[0][2].TotalFeesPayable}</td>
          </tr>
        </table>
      </div>

      <div className='payments'>

      <div>
        <span>Payments By Student</span>
        <table>
          <tr>
            <th>date</th>
            <th>Fee name</th>
            <th> Amount GHC </th>
            <th>Credit Balances</th>
          </tr>
      
          {studentfinancialreport[1][1].map((obj, index) => (
          <tr key={index}>
            {Object.entries(obj).map(([key, content]) => (
            <td  key={key}>
            {content}
            </td>
            ))}
          </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className='t-a'>{studentfinancialreport[1][2].totalpayments}</td>
          </tr>
  
          <span>Balances of Fee</span>

        <tr>
          <th></th>
          <th>Fee name</th>
          <th> Balance GHC </th>
        </tr>
  
        {studentfinancialreport[1][4].map((obj, index) => (
        <tr key={index}>
          <td></td>
          {Object.entries(obj).map(([key, content]) => (
          <td  key={key}>
          {content}
          </td>
        ))}
        </tr>
        ))}
        <tr>
            <td>{currentDate.toLocaleString()}</td>
            <td className='t-f'>{studentfinancialreport[1][5]["Total "]}</td>
            <td></td>
            <td className='t-a'>{studentfinancialreport[1][5]["Total_Balance"]}</td>
        </tr>
        <td>
          <td></td>
          <td></td>
          <td></td>
          </td>
        <tr>
          <td></td>
          <td className='t-f'>Total Credit</td>
          <td></td>
          <td className='t-b'>{studentfinancialreport[1][6]["TOTAL"]}</td>
        </tr>
      </table>
      </div>

      </div>
  </div>
  </div>
  );
};

export default StudentFinancialStatement;
