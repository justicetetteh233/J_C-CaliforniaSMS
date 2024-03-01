import '../Styles/CreateDepartment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Select from "react-select";

const CreateDepartment = () => {

    const initialState = {
        name: '',
        school: null,
        description: '',
        date_created: '',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/school/')
            .then((response) => {
                setSchools(response.data);
                console.log('Schools fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching schools:', error.response.data);
            });
    }, []);
    
    useEffect(() => {
        console.log(formData.school); // Log the updated value of the school property
    }, [formData.school]);

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
            .post('http://127.0.0.1:8000/api/department/', formData)
            .then((response) => {
                setSuccessMessage('Department created successfully');
                setErrorMessage('');
                setFormData(initialState);
                navigate('/create_fees');
                console.log('Department created successfully:', response.data);
            })
            .catch((error) => {
                setErrorMessage('An error occurred');
                setSuccessMessage('');
                console.error('Error creating department:', error.response.data);
            });
    };

    return (
        <div className="create-department-page">
            <div className="create-dep-page-box">
                <div className="create-dep-page-header">
                    <img src="/ic_connection.png" alt="Proprietor Icon"/>
                    <span>Create a Department</span>
                </div>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="create-dep-page-form">
                    <div className="create-dep-page-form-item">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="create-dep-page-form-item">
                        <label htmlFor="school">School</label>
                        <select
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select School</option>
                            {schools.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    
                    </div>
                    
                    
                    <div className="create-dep-page-form-item">
                        <label htmlFor="date_created">Date Created</label>
                        <input type="date" id="date_created" name="date_created" value={formData.date_created} onChange={handleChange} />
                    </div>
                    <div className="create-dep-page-form-item">
                        <label htmlFor="phone">Description</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>

                    <button className="create-dep-page-form-button" type="submit">Create Department</button>
                </form>

            </div>

        </div>
    )
}

export default CreateDepartment;