import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faGraduationCap, faUser } from "@fortawesome/free-solid-svg-icons";
import "../Styles/DashboardPage.css";

const DashboardSection = ({ icon, title, description }) => {
    return (
        <div className="dashboard-page-section-item">
            <FontAwesomeIcon className="dashboard-page-section-item-icon" icon={icon} />
            <div className="dashboard-page-section-item-button">
                <span>{title}</span>
                <p>{description}</p>
            </div>
        </div>
    );
};

const DashboardPage = ({ selectedSchool }) => {
    return (
        <div className="dashboard-page">
            <span className="dashboard-page-intro">Welcome to your dashboard {selectedSchool}</span>
            <div className="dashboard-page-sections">
                <DashboardSection
                    icon={faUser}
                    title="Manage Users"
                    description="Easily create, modify, and control user accounts and their permissions within the system"
                />
                <DashboardSection
                    icon={faChalkboardTeacher}
                    title="Add classes"
                    description="Effortlessly create and organize class information, streamlining class management in the system"
                />
                <DashboardSection
                    icon={faGraduationCap}
                    title="Add students"
                    description="Seamlessly add and manage student profiles, ensuring accurate and up-to-date student information in the system"
                />
            </div>
        </div>
    );
};

export default DashboardPage;