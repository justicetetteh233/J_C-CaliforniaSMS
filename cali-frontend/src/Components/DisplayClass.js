import React, {useEffect, useState} from "react";
import '../Styles/DisplayClass.css';
import axios from "axios";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from 'react-select';


const DisplayClass = () => {

    // Lists and States
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [department, setDepartment] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [feeList, setFeeList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [schoolList, setSchoolList] = useState([]);
    
    
    const[formData, setFormData] = useState({
        date_created: '',
        department: '',
        name: '',
        fees: [],
        course: [],
        school: '',
    });
    
    const fetchClasses = async () => {
        Axios.get('http://127.0.0.1:8000/api/class-level/')
            .then((response) => {
                const classes = response.data;
                setClasses(classes);
                
            })
            .catch((error) => {
                console.error('Error fetching classes:', error);
            })
    }

    const fetchDepartments = async () => {
        Axios.get('http://127.0.0.1:8000/api/department/')
            .then((response) => {
                const departments = response.data;
                setDepartmentList(departments);
            })
            .catch((error) => {
                console.error('Error fetching departments:', error);
            })
    }
    
    const fetchFees = async () => {
        Axios.get('http://127.0.0.1:8000/api/fee/')
            .then((response) => {
                const fees = response.data;
                setFeeList(fees);
            })
            .catch((error) => {
                console.error('Error fetching fees:', error);
            })
    }
    
    const fetchCourses = async () => {
        Axios.get('http://127.0.0.1:8000/api/courses/')
            .then((response) => {
                const courses = response.data;
                setCourseList(courses);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            })
    }
    
    const fetchSchools = async () => {
        Axios.get('http://127.0.0.1:8000/api/school/')
            .then((response) => {
                const schools = response.data;
                setSchoolList(schools);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            })
    }

    useEffect(() => {
        fetchClasses().then(r => console.log("Classes fetched"));
        fetchDepartments().then(r => console.log("Departments fetched"));
        fetchCourses().then(r => console.log("Courses fetched"));
        fetchFees().then(r => console.log("Fees fetched"));
        fetchSchools().then(r => console.log("Schools fetched"));
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/class-level/', formData);
            console.log('Class level created:', response.data);
            // Reset the form after successful submission
            setFormData({
                date_created: '',
                department: '',
                name: '',
                fees: '',
                course: '',
                school: '',
            });
        } catch (error) {
            console.error('Error creating class level:', error);
            }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        
        console.log(formData);
    };
    
    
    return (
        <div className="display-class">
            <div className="display-class-buttons">
                <button className="add-button" onClick={() => setShowForm(!showForm)}>
                    Add Class
                </button>
                <button className="del-button" onClick={() => setShowDelete(!showDelete)}>
                    Delete Class
                </button>
            </div>
            <div>
                {showForm && (
                    <form onSubmit={handleSubmit} className="class-form">
                        <div className="display-class-form-field">
                            <label>Class Name</label>
                            <input
                                name={"name"}
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="display-class-form-field">
                            <label>Department</label>
                            <select
                                name={"department"}
                                value={formData.department}
                                onChange={handleChange}
                                required>
                                <option value="">Select Department</option>
                                {departmentList.map((department, index) => (
                                    <option key={index} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="display-class-form-field">
                            <label>Fee</label>
                            <Select
                                name="fees"
                                value={feeList.filter(fee => formData.fees.includes(fee.id)).map(fee => ({ value: fee.id, label: fee.name }))}
                                isMulti
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(option => option.value);
                                    setFormData({ ...formData, fees: selectedValues });
                                }}
                                required
                                options={feeList.map((fee) => ({ value: fee.id, label: fee.name }))}
                            />
                        
                        
                        
                        </div>
                        <div className="display-class-form-field">
                            <label>Courses</label>
                            <Select
                                name="courses"
                                value={courseList.filter(course => formData.course.includes(course.id)).map(course => ({ value: course.id, label: course.subject_name }))}
                                isMulti
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(option => option.value);
                                    setFormData({ ...formData, course: selectedValues });
                                }}
                                required
                                options={courseList.map((course) => ({ value: course.id, label: course.subject_name }))}
                            />
                        </div>
                        <div className="display-class-form-field">
                            <label>School</label>
                            <select
                                name={"school"}
                                value={formData.school}
                                onChange={handleChange}
                                required>
                                <option value="">Select School</option>
                                {schoolList.map((school, index) => (
                                    <option key={index} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="display-class-form-field">
                            <label>Date Created</label>
                            <input
                                name={"date_created"}
                                type="date"
                                value={formData.date_created}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="class-form-submit-button" type="submit">
                            Submit
                        </button>
                    </form>
                )}
                {showDelete && (
                    <div className="display-class-delete-form">
                        <select value={'Select Class to Delete'}
                            onChange={handleChange}>
                            <option value={''}>Select Class</option>
                            {classes.map((classItem, index) => (
                                <option key={index} value={classItem.id}>
                                    {classItem.name}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <button className="delete-form-submit-button">Submit</button>
                    </div>
                )}
                
            </div>

        </div>
    )
}
export default DisplayClass;
