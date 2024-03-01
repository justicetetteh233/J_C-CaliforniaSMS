import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/DashboardComponentStyles/LeftDashboardNav.css';
import Axios from "axios";

const LeftNavbar = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [schoolList, setSchoolList] = useState([]);

    useEffect(() => {
        // Fetch the list of schools from the backend using Axios
        Axios.get('http://127.0.0.1:8000/api/school/') // Replace '/api/schools' with the actual API endpoint
            .then((response) => {
                const schools = response.data; // Assuming the response contains an array of school objects
                setSchoolList(schools);

                // Set the initially selected school (e.g., the first school in the list)
                if (schools.length > 0) {
                    setSelectedSchool(schools[0].name); // Display the name of the school
                }
            })
            .catch((error) => {
                console.error('Error fetching schools:', error);
            });
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    const handleSchoolSelect = (school) => {
        setSelectedSchool(school);
    };


    return (
        <nav className="left-navbar">
            <div className="left-navbar-school-info">
                <div className="left-navbar-logo">
                    <img src="/ic_logo.svg" alt="Company Logo" />
                </div>
                <div className="left-navbar-school-name">
                    <span>{selectedSchool}</span>
                    <div className="left-navbar-dropdown">
                        <button className="left-navbar-dropdown-btn">
                            <img src="/ic_arrow_down.svg" alt="arrow down" />
                        </button>
                        <div className="left-navbar-dropdown-content">
                            {schoolList.map((school, index) => (
                                <div key={index} onClick={() => handleSchoolSelect(school.name)}>
                                    {school.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="left-navbar-horizontal-bar"></div>

            <ul className="left-navbar-menu">
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard">
                        <img src="/ic_dashboard.svg" alt="Dashboard Icon" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard/display_class">
                        <img src="/ic_students.svg" alt="Students Icon" />
                        <span>Students</span>
                    </Link>
                </li>
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard/teachers">
                        <img src="/ic_teacher.svg" alt="Teachers Icon" />
                        <span>Teachers</span>
                    </Link>
                </li>
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard/staff">
                        <img src="/ic_staff.svg" alt="Staff Icon" />
                        <span>Staff</span>
                    </Link>
                </li>
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard/finance">
                        <img src="/ic_finance.svg" alt="Finance Icon" />
                        <span>Finance</span>
                    </Link>
                </li>
                <li className="left-navbar-menu-item">
                    <Link to="/dashboard/backup">
                        <img src="/ic_backup.svg" alt="Backup Icon" />
                        <span>Backup</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default LeftNavbar;