import React from 'react';
import '../../Styles/DashboardComponentStyles/TopDashboardNav.css'; // Import the CSS file

const TopNavbar = () => {
    const handleLogout = () => {
        // Implement logout logic here
        // For example, clear user session, redirect to login page, etc.
        console.log('Logged out'); // Replace this with actual logout logic
    };

    return (
        <div className="top-navbar">
            <div className="top-navbar-logo">
                <img className="top-navbar-school-logo" src="/ic_school_badge.svg" alt="School Logo" />
            </div>
            <div className="top-navbar-system-name">California School Management System</div>
            <div className="top-navbar-actions">
                <div className="notification-icon">
                    <img src="/ic_notification.svg" alt="Notification Icon" width={30} height={30} />
                </div>
                <button className="top-navbar-logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default TopNavbar;