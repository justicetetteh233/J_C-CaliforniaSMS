import React, { useState, useEffect } from 'react';
import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ListOfFeesPaid = ({ term_id = 3 }) => {
  const [listOfFees, setListOfFees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paidFeesListUrl = `http://127.0.0.1:8000/api/studentfeesforterm/${term_id}/?page=${currentPage}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(paidFeesListUrl);
        const data = await response.json();
        setListOfFees(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [paidFeesListUrl]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const FeeStudent = ({ student_id }) => {
    const [student, setStudent] = useState('');

    useEffect(() => {
      const getStudentData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/student/${student_id}/`);
          const data = await response.json();
          setStudent(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching student data: ', error);
        }
      };

      getStudentData();
    }, [student_id]);

    return (
      <Typography
        variant="subtitle1"
        component="div"
        style={{
          cursor: 'pointer',
          transition: 'color 0.3s',
        }}
        // Add hover effect
        sx={{
          ':hover': {
            color: 'blue',
          },
        }}
      >
        {student["surname"]}
      </Typography>
    );
  };

  const FeeType = ({ fee_id }) => {
    const [feeType, setFeeType] = useState('');

    useEffect(() => {
      const getStudentData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/fee/${fee_id}/`);
          const data = await response.json();
          setFeeType(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching FeeType: ', error);
        }
      };

      getStudentData();
    }, [fee_id]);

    return (
      <Typography variant="subtitle1" component="div">
        {feeType["name"]}
      </Typography>
    );
  };

  return (
    <Box>
        
      <TableContainer component={Paper} style={{ position: 'relative' }}>
        <Table>

            <TableHead >
            <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Student</StyledTableCell>
                <StyledTableCell>Fee Type</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
            </TableHead>
          <TableBody>
            {listOfFees.map((obj, index) => (
              <TableRow key={index}>
                <TableCell>{obj["date"]}</TableCell>
                <TableCell>
                  <FeeStudent student_id={obj["student"]} />
                </TableCell>
                <TableCell>
                  <FeeType fee_id={obj["feeType"]} />
                </TableCell>
                <TableCell>{obj["amount"]}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" style={{ marginRight: '8px' }}>
                    Delete
                  </Button>
                  <Button variant="contained" color="info">
                    View Receipt
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Add a transparent div to hold the space for the fixed header */}
        <div style={{ height: '56px', position: 'absolute', top: 0, width: '100%', zIndex: 100 }}></div>
      </TableContainer>

      <Box mt={2}>
        <Button variant="contained" onClick={handlePreviousPage} style={{ marginRight: '8px' }}>
          Previous
        </Button>
        <Button variant="contained"   onClick={handleNextPage} >Next</Button>
      </Box>
    </Box>
  );
};

const StyledTableCell = ({ children, ...props }) => (
  <TableCell
    style={{
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
      borderBottom: '1px solid #ccc',
    }}
    {...props}
  >
    {children}
  </TableCell>
);

export default ListOfFeesPaid;
