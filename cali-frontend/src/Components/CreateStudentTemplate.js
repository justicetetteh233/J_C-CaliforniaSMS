import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStudentForm = () => {
  const [formData, setFormData] = useState({
    surname: '',
    otherName: '',
    dateOfBirth: '',
    age: '',
    mothersName: '',
    mothersTell: '',
    fathersName: '',
    fathersTell: '',
    guardianName: '',
    guardianTell: '',
    relationshipToChild: '',
    residentialAddress: '',
    previousSchoolAttended: '',
    classLevel: '', // Will store the selected class ID
    paymentMade: '',
    balance: '',
  });

  const [classLevels, setClassLevels] = useState([]);

  useEffect(() => {
    // Fetch the list of class levels from your Django backend when the component mounts
    axios.get('http://127.0.0.1:8000/api/class-level/').then((response) => {
      setClassLevels(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/student/', formData)
      .then((response) => {
        console.log('Student created successfully:', response.data);
        // Reset the form after successful creation if needed
        setFormData({
          surname: '',
          otherName: '',
          dateOfBirth: '',
          age: '',
          mothersName: '',
          mothersTell: '',
          fathersName: '',
          fathersTell: '',
          guardianName: '',
          guardianTell: '',
          relationshipToChild: '',
          residentialAddress: '',
          previousSchoolAttended: '',
          classLevel: '',
          paymentMade: '',
          balance: '',
        });
      })
      .catch((error) => {
        console.error('Error creating student:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="surname">Surname:</label>
      <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />

      <label htmlFor="otherName">Other Name:</label>
      <input type="text" id="otherName" name="otherName" value={formData.otherName} onChange={handleChange} required />

      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <label htmlFor="age">Age:</label>
      <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />

      <label htmlFor="mothersName">Mother's Name:</label>
      <input type="text" id="mothersName" name="mothersName" value={formData.mothersName} onChange={handleChange} required />

      <label htmlFor="mothersTell">Mother's Telephone:</label>
      <input
        type="text"
        id="mothersTell"
        name="mothersTell"
        value={formData.mothersTell}
        onChange={handleChange}
        required
      />

      <label htmlFor="fathersName">Father's Name:</label>
      <input type="text" id="fathersName" name="fathersName" value={formData.fathersName} onChange={handleChange} required />

      <label htmlFor="fathersTell">Father's Telephone:</label>
      <input
        type="text"
        id="fathersTell"
        name="fathersTell"
        value={formData.fathersTell}
        onChange={handleChange}
        required
      />

      <label htmlFor="guardianName">Guardian's Name:</label>
      <input
        type="text"
        id="guardianName"
        name="guardianName"
        value={formData.guardianName}
        onChange={handleChange}
        required
      />

      <label htmlFor="guardianTell">Guardian's Telephone:</label>
      <input
        type="text"
        id="guardianTell"
        name="guardianTell"
        value={formData.guardianTell}
        onChange={handleChange}
        required
      />

      <label htmlFor="relationshipToChild">Relationship to Child:</label>
      <input
        type="text"
        id="relationshipToChild"
        name="relationshipToChild"
        value={formData.relationshipToChild}
        onChange={handleChange}
        required
      />

      <label htmlFor="residentialAddress">Residential Address:</label>
      <input
        type="text"
        id="residentialAddress"
        name="residentialAddress"
        value={formData.residentialAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="previousSchoolAttended">Previous School Attended:</label>
      <input
        type="text"
        id="previousSchoolAttended"
        name="previousSchoolAttended"
        value={formData.previousSchoolAttended}
        onChange={handleChange}
        required
      />

      <label htmlFor="classLevel">Select Class:</label>
      <select id="classLevel" name="classLevel" value={formData.classLevel} onChange={handleChange} required>
        <option value="">-- Select Class --</option>
        {classLevels.map((classLevel) => (
          <option key={classLevel.id} value={classLevel.id}>
            {classLevel.name}
          </option>
        ))}
      </select>

      <label htmlFor="paymentMade">Payment Made:</label>
      <input type="number" id="paymentMade" name="paymentMade" value={formData.paymentMade} onChange={handleChange} required />

      <label htmlFor="balance">Balance:</label>
      <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required />

      <button type="submit">Create Student</button>
    </form>
  );
};

export default CreateStudentForm;
