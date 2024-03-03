// use this component to enable payment of non daily fees 
// <StudentsFeesPaymentPage  selectedSchool={id of the schoo is to be stored here}/>
import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import StudentFinancialStatement  from "./financialreport"
import  "../../Styles/FinanceComponentStyles/PaymentPage.css"
import { TextField, Button, Container, Stack, Select, MenuItem, FormControl, InputLabel, Typography, Snackbar } from '@mui/material';

const StudentsFeesPaymentPage = ({selectedSchool}) => {
  const initialState = {
    "date":"",
    "student": "",
    "feeType": "",
    "term": "",
    "amount":"",
  };

  const [formData, setFormData] = useState(initialState);

  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  const [feeTypes, setFeeType] = useState([]);
  
  const [classLevels, setClassLevels] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  


  useEffect(() => {
    if (selectedSchool === ''){
      axios.get('http://127.0.0.1:8000/api/class-level/')
      .then((response) => setClassLevels(response.data))
      .catch((error) => console.error('Error fetching class levels:', error));

    }else{
    axios.get(`http://127.0.0.1:8000/api/class-level/in_a_shool/${selectedSchool}/`)
      .then((response) => setClassLevels(response.data))
      .catch((error) => console.error('Error fetching class levels:', error));
    }
  }, []);

  useEffect(() => {
    if (selectedClass === '') {
      axios.get('http://127.0.0.1:8000/api/student/')
        .then((response) => setStudents(response.data))
        .catch((error) => console.error('Error fetching students:', error));
    } else {
      axios.get(`http://127.0.0.1:8000/api/student/get-students-by-class/${selectedClass}/`)
        .then((response) => setStudents(response.data))
        .catch((error) => console.error('Error fetching students:', error));
    }
  }, [selectedClass]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/terms/')
      .then((response) => setTerms(response.data))
      .catch((error) => console.error('Error getting term', error));
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/fee/classbases/${selectedClass}/`)
      .then((response) => setFeeType(response.data))
      .catch((error) => console.error('Error getting fee type', error));
  }, [selectedClass]);


  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const showAlert = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color);
    setOpenAlert(true);

    // Automatically close the alert after 3 seconds
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  };


  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  }

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/studentfeespayment/', formData)
      .then((response) => {
        showAlert("Payment made successfully", 'green');
        setFormData(initialState);
        console.log('Payment made successfully', response.data);
      })
      .catch((error) => {
        showAlert('An error occurred', 'red');
        console.error('Error during payment', error.response.data);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="class">Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={handleClassChange}
            >
              <MenuItem value="">Select a class or choose "All"</MenuItem>
              <MenuItem value="">All</MenuItem>
              {classLevels.map((classLevel) => (
                <MenuItem key={classLevel.id} value={classLevel.id}>
                  {classLevel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label=""
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Amount"
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel htmlFor="student">Student</InputLabel>
            <Select
              name="student"
              value={selectedStudent}
              onChange={(event) => { handleChange(event); handleStudentChange(event); }}
            >
              <MenuItem value="">Select a student</MenuItem>
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.otherName} {student.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="feeType">Fee Type</InputLabel>
            <Select
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
            >
              <MenuItem value="">Select a fee type</MenuItem>
              {feeTypes.map((feeType) => (
                <MenuItem key={feeType.id} value={feeType.id}>
                  {feeType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="term">Term</InputLabel>
            <Select
              name="term"
              value={formData.term}
              onChange={(event) => { handleChange(event); handleTermChange(event) }}
            >
              <MenuItem value="">Select a term</MenuItem>
              {terms.map((term) => (
                <MenuItem key={term.id} value={term.id}>
                  {term.term_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained">Make Payment</Button>

           <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        message={alertMessage}
        ContentProps={{ style: { backgroundColor: alertColor } }}
          />
          
        </Stack>
      </form>
    </Container>
  );
}

export default StudentsFeesPaymentPage;
