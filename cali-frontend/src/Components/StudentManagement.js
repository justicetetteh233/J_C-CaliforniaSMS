import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagement = () => {
  const [classLevels, setClassLevels] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch class levels from Django API
    axios
      .get('http://127.0.0.1:8000/api/class-level/')
      .then((response) => {
        setClassLevels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class levels:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch students based on selected class or all students
    if (selectedClass === null) {
      // If "All" is selected, fetch all students
      axios
        .get('http://127.0.0.1:8000/api/student/')
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    } else {
      // Fetch students for the selected class
      axios
        .get(`http://127.0.0.1:8000/api/student/get-students-by-class/${selectedClass}/`)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <div>
      <h2>Class Selection:</h2>
      <select onChange={handleClassChange}>
        <option value="">Select a class or choose "All"</option>
        <option value="all">All</option>
        {classLevels.map((classLevel) => (
          <option key={classLevel.id} value={classLevel.id}>
            {classLevel.name}
          </option>
        ))}
      </select>

      <div>
        <h2>Students:</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.otherName} {student.surname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentManagement;

//    const [classes, setClasses] = useState([]);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [students, setStudents] = useState([]);

//   // const fetchClasses =async () => {
//     //     try{
//     //         const response = await axios.get('http://127.0.0.1:8000/api/class-level/');
//     //         setClasses(response.data);
//     //     }catch(error){
//     //         console.error('error getting classes in the school',error);
//     //     }
//     // }

//     useEffect(()=>{
//       axios
//           .get('http://127.0.0.1:8000/api/class-level/')
//           .then((response)=>
//           setClasses(response.data),
//           console.log('classes have been fetched'))
//           .catch((error)=>{
//               console.error('error getting classes', error)});
//   })

//   useEffect(()=>{
//       // fetchTerms().then(r => console.log('terms have been fetched '));
//       fetchStudentFees().then(r => console.log('student fees have been fetched '));
//       // fetchClasses().then(r=> console.log('classes have been fetched '));
//   })


//   useEffect(() => {
//       // Fetch students based on selected class or all students
//       if (selectedClass === null) {
//         // If "All" is selected, fetch all students
//         axios
//           .get('http://127.0.0.1:8000/api/student/')
//           .then((response) => {
//             setStudents(response.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching students:', error);
//           });
//       } else {
//         // Fetch students for the selected class
//         axios
//           .get(`http://127.0.0.1:8000/api/student/get-students-by-class/${selectedClass}/`)
//           .then((response) => {
//             setStudents(response.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching students:', error);
//           });
//       }
//     }, [selectedClass]);
  
//   const handleClassChange = (event) => {
//       setSelectedClass(event.target.value);
//     };

//     <div>
//                     <lable htmlFor ='classes'>select classes</lable>
//                     <select   onChange={handleClassChange}>
//                     <option value="">Select a class or choose "All"</option>
//                             {
//                                 classes.map((cclass) => (
//                                     <option key ={cclass.id} value = {cclass.id}>
//                                      {cclass.name}
//                                     </option>
//                                 ))
// }
//                             </select>
//                 </div>
//                 <div>
//                     <lable htmlFor ='students'>Select Student</lable>
//                         <select name='student'value={students.id}>
//                                     {
//                                     students.map((student) => (
//                                         <option key ={student.id} value = {student.id}>
//                                         {student.surname}
//                                         </option>
//                                     ))}
//                                 </select>
//                 </div>