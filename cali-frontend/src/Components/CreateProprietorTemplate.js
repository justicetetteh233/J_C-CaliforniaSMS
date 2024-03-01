import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/CreateProprietorTemplate.css"
import { useNavigate } from 'react-router-dom';

const CreateProprietor = () => {
  const initialState = {
    surname: '',
    otherName: '',
    dateOfBirth: '',
    age: '10', // Remove the age field from here
    phone: '',
    email: '',
    residentialAddress: '',
    parentName: 'Empty',
    otherInformation: 'Empty',
    user: '',
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/user/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error.response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Calculate age based on date of birth
    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        age: age, // Update the age field here
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/proprietor/', formData)
      .then((response) => {
        setSuccessMessage('Proprietor created successfully!');
        setFormData(initialState);
        setErrorMessage('');
        navigate('/create_school');
        console.log('Proprietor created successfully:', response.data);
      })
      .catch((error) => {
        setErrorMessage('Error creating proprietor. Please check your inputs and try again.');
        console.error('Error creating proprietor:', error.response.data);
      });
  };

  return (
    <div className="create-proprietor-page">
      <div className="create-prop-page-box">
        <div className="create-prop-page-header">
          <img src="/ic_proprietor.jpeg" alt="Proprietor Icon"/>
          <span>Create a Proprietor</span>
        </div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="create-prop-page-form">
          <div className="create-prop-page-form-item">
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="otherName">Other Name</label>
            <input type="text" id="otherName" name="otherName" value={formData.otherName} onChange={handleChange} />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="residentialAddress">Address</label>
            <input
                type="text"
                id="residentialAddress"
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleChange}
            />
          </div>
          <div className="create-prop-page-form-item">
            <label htmlFor="user">User</label>
            <select id="user" name="user" value={formData.user} onChange={handleChange}>
              <option value="">Select User</option>
              {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
              ))}
            </select>
          </div>
          <button className="create-prop-page-form-button" type="submit">Create Proprietor</button>
        </form>

      </div>

    </div>
  );
};

export default CreateProprietor;
