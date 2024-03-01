import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FeeCollector = () => {
  // Define the Student class here...
  class Student {
    constructor(id, name, actualFees, feesLeft) {
      this.id = id;
      this.name = name;
      this.actualFees = actualFees;
      this.feesLeft = feesLeft;
    }
  }
  Student.prototype.setFeesLeft = function (amt) {
    this.feesLeft = this.actualFees - amt;
  };

  Student.prototype.getFeesLeft = function () {
    return this.feesLeft;
  };

  const s1 = new Student(1, 'John Doe', 1000, 200);
  const s2 = new Student(2, 'Jane Smith', 1500, 500);
  const s3 = new Student(3, 'Bob Johnson', 1200, 300);
  const s4 = new Student(4, 'Alice Williams', 1800, 800);

  const studentList = [s1, s2, s3, s4];

  const [searchId, setSearchId] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [feePaid, setFeePaid] = useState(0);

  const handleSearch = () => {
    const student = studentList.find((student) => student.id === parseInt(searchId));
    if (student) {
      setSearchedStudent(student); // Assign the found student instance to searchedStudent
      setFeePaid(0); // Reset feePaid when a new student is searched
      setEditMode(false); // Exit edit mode when a new student is searched
    } else {
      setSearchedStudent(null);
      setFeePaid(0); // Reset feePaid when no student is found
      setEditMode(false); // Exit edit mode when no student is found
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
  if (feePaid >= 0 && feePaid <= searchedStudent.actualFees) {
    const updatedStudent = new Student(
      searchedStudent.id,
      searchedStudent.name,
      searchedStudent.actualFees,
      searchedStudent.actualFees - feePaid // Calculate the updated feesLeft value
    );
    setSearchedStudent(updatedStudent);
    setEditMode(false);
  }
};


  const handleDelete = () => {
  // Update the feesLeft of the searchedStudent before removing from studentList
  const updatedStudent = new Student(
    searchedStudent.id,
    searchedStudent.name,
    searchedStudent.actualFees,
    searchedStudent.actualFees - feePaid // Calculate the updated feesLeft value before deleting
  );

  const updatedStudentList = studentList.filter((student) => student.id !== searchedStudent.id);
  setSearchId('');
  setSearchedStudent(null);
  setEditMode(false);
  setFeePaid(0);
  // Now, you can choose to update the studentList with the updatedStudent or keep it as is,
  // depending on how you want to handle the data after deleting the row.
};

  return (
    <div className="fee--container-main">
      <div className="fee--header">
        <h4 className="fee--title">Fees Payment</h4>
        <div className="searchBar">
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>
      <div className="fee--container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Name</th>
              <th>Fee Paid</th>
              <th>Fee Left</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedStudent && (
              <tr>
                <td>
                  <input type="date" />
                </td>
                <td><input type="number" value={searchedStudent.id}/></td>
                <td><input type="text" value={searchedStudent.name}/></td>
                <td>
                  {editMode ? (
                    <input
                      type="number"
                      value={feePaid}
                      onChange={(e) => setFeePaid(parseInt(e.target.value))}
                    />
                  ) : (
                    searchedStudent.getFeesLeft() // Now, getFeesLeft() will work on the instance
                  )}
                </td>
                <td>
                  <input type="number" value={searchedStudent.name} readOnly />
                </td>
                <td>
                  {editMode ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleDelete} style={{color: 'red',background: 'none',border: '1px solid red',
                        margin:'2px', }}>Delete</button>
                    </>
                  ) : (
                    <button onClick={handleEdit}>Edit</button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeCollector;
