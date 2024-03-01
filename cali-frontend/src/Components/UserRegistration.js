import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/UserRegistration.css";
import ic_user from "../images/ic_user.png";
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Remove confirmPassword field before sending the request
    const { confirmPassword, ...dataWithoutConfirmPassword } = formData;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', dataWithoutConfirmPassword);
      console.log('User registered:', response.data);
      // You can add code here to handle successful registration, e.g., redirecting to another page.
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
      // You can add code here to display an error message to the user.
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <div className="user-registration-container">
        <div className="user-registration-container-box">
          <div className="user-reg-con-box-header">
              <img className="user-reg-con-box-img" src={ic_user} alt="User Icon" />
              <span className="user-reg-con-box-h1">Create a User</span>
          </div>

          <form className="user-reg-con-box-form" onSubmit={handleSubmit}>
            <div className="user-reg-con-box-form-item">
              <label>Username</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
              />
            </div>
            <div className="user-reg-con-box-form-item">
              <label>Password</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>
            <div className="user-reg-con-box-form-item">
              <label>Confirm Password</label>
              <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
              />
            </div>
            {passwordError && (
                <p className="user-reg-con-box-password-err">{passwordError}</p>
            )}
            <div className="user-reg-con-box-form-item">
              <button className="user-reg-con-box-form-btn" type="submit">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserRegistration;
