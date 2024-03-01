import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/CreateSchoolTemplate.css"
import { useNavigate } from 'react-router-dom';


const CreateSchool = () => {
  const navigate = useNavigate();
  const initialState = {
    name: '',
    schoolMotto: '',
    phone: '',
    email: '',
    residentialAddress: '',
    registrationDateOfTheSchool: '',
    otherInformation: '',
    proprietor: '', // To store the selected proprietor's ID
  };

  const [formData, setFormData] = useState(initialState);
  const [proprietors, setProprietors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch existing proprietors from the backend
    axios
      .get('http://127.0.0.1:8000/api/proprietor/')
      .then((response) => {
        setProprietors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching proprietors:', error);
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
      .post('http://127.0.0.1:8000/api/school/', formData)
      .then((response) => {
        setSuccessMessage('School created successfully!');
        setFormData(initialState); // Reset the form after successful submission
        setErrorMessage(''); // Clear any previous error message
        console.log('School created successfully:', response.data);
        navigate('/create_department');
      })
      .catch((error) => {
        setErrorMessage('Error creating school. Please check your inputs and try again.');
        console.error('Error creating school:', error.response.data);
      });
  };

  return (
    <div className="create-school-page">
      <div className="create-schl-page-box">
        <div className="create-schl-page-header">
          <img src="/ic_school.jpeg" alt="School's icon"/>
          <span>Create a School</span>
        </div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form className="create-schl-page-form" onSubmit={handleSubmit}>
          <div className="create-schl-page-form-item">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="schoolMotto">School's Motto</label>
            <input type="text" id="schoolMotto" name="schoolMotto" value={formData.schoolMotto} onChange={handleChange} />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="residentialAddress">Residential Address</label>
            <input
                type="text"
                id="residentialAddress"
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleChange}
            />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="registrationDateOfTheSchool">Registration Date</label>
            <input
                type="date"
                id="registrationDateOfTheSchool"
                name="registrationDateOfTheSchool"
                value={formData.registrationDateOfTheSchool}
                onChange={handleChange}
            />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="otherInformation">Other Information</label>
            <input
                type="text"
                id="otherInformation"
                name="otherInformation"
                value={formData.otherInformation}
                onChange={handleChange}
            />
          </div>
          <div className="create-schl-page-form-item">
            <label htmlFor="proprietor">Proprietor</label>
            <select id="proprietor" name="proprietor" value={formData.proprietor} onChange={handleChange}>
              <option value="">Select Proprietor</option>
              {proprietors.map((proprietor) => (
                  <option key={proprietor.id} value={proprietor.id}>
                    {proprietor.surname} {proprietor.otherName}
                  </option>
              ))}
            </select>
          </div>
          <button className="create-schl-page-form-button" type="submit">Create School</button>
        </form>

      </div>

    </div>
  );
};

export default CreateSchool;
