import '../Styles/CreateCourse.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const CreateCourse = () => {
    
    const initialState = {
        subject_name: '',
        Teacher_code: '',
        
    };
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/courses/', formData)
            .then((response) => {
                setSuccessMessage('Course created successfully');
                setErrorMessage('');
                setFormData(initialState);
                navigate('/dashboard/');
                console.log('Course created successfully:', response.data);
            })
            .catch((error) => {
                setErrorMessage('An error occurred');
                setSuccessMessage('');
                console.error('Error creating department:', error.response.data);
            });
    };
    
    return (
        <div className="create-course-page">
            <div className="create-cor-page-box">
                <div className="create-cor-page-header">
                    <img src="/ic_course.png" alt="Course Icon"/>
                    <span>Create a Course</span>
                </div>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="create-cor-page-form">
                    <div className="create-cor-page-form-item">
                        <label htmlFor="subject_name">Name</label>
                        <input type="text" id="subject_name" name="subject_name" value={formData.subject_name} onChange={handleChange} />
                    </div>
                    <div className="create-cor-page-form-item">
                        <label htmlFor="Teacher_code">Teacher Code</label>
                        <input type="text" id="Teacher_code" name="Teacher_code" value={formData.Teacher_code} onChange={handleChange} />
                    </div>
                    
                    <button className="create-cor-page-form-button" type="submit">Create Course</button>
                </form>
            
            </div>
        
        </div>
    )
}

export default CreateCourse;