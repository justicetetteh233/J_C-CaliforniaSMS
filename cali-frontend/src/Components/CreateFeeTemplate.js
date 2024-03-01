import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/CreateFeeTemplate.css';
import Select from 'react-select';

const CreateFeeTemplate = () => {
    
    const initialState = {
        name: '',
        school: '',
        department: '',
        is_termly: false,
        description: '',
        amount: '',
        date_created: '',
    };
    
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [schools, setSchools] = useState([]);
    const [departments, setDepartments] = useState([]);
    
    
    const fetchSchools = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/school/');
            setSchools(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };
    
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/department/');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };
    
    useEffect(() => {
        // Fetch schools and departments with console messages
        fetchSchools().then(r => console.log("Schools fetched"));
        fetchDepartments().then(r => console.log("Departments fetched"));
    }, []);
    
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'is_termly' ? checked : newValue,
        }));
        console.log(formData);
    };
    
    
    
    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/fee/', formData)
            .then((response) => {
                setSuccessMessage('Fee created successfully');
                setErrorMessage('');
                setFormData(initialState);
                navigate('/dashboard/');
                console.log('Fee created successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error creating fee:', error);
                setErrorMessage('Failed to create fee.');
                setSuccessMessage('');
            });
    };
    
    return (
        <div className="create-fee-page">
            <div className="create-fee-page-box">
                <div className="create-fee-page-header">
                    <img className="create-fee-page-img" src="/ic_fees.png" alt="User Icon" />
                    <span className="create-fee-page-h1">Create a Fee</span>
                </div>
                
                <form className="create-fee-page-form" onSubmit={handleSubmit}>
                    <div className="create-fee-page-form-item">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>School</label>
                        <select
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                        >
                            <option value="">Select School</option>
                            {schools.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>Date Created</label>
                        <input
                            type="date"
                            name="date_created"
                            value={formData.date_created}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="create-fee-page-form-item">
                        <label>Is Termly</label>
                        <input className="create-fee-page-form-item-checkbox"
                            type="checkbox"
                            name="is_termly"
                            value={formData.is_termly}
                            onChange={handleChange}/>
                    </div>
                    <div className="create-fee-page-form-item">
                        <button className="create-fee-page-form-btn" type="submit">
                            Create Fee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeeTemplate;
