import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainNavbar from './DashboardComponents/LeftDashboardNav';
import TopNavbar from './DashboardComponents/TopDashboardNav';
import DashboardPage from "./DashboardPage";
import StudentAdmission from "./StudentAdmission";
import  FinancePage from "./FinanceComponents/MainFinancePageTemplate";
import '../Styles/AdminDashboard.css';
import DisplayClass from "./DisplayClass";

const DashboardPageContent = () => {
    return (
        <div className="dashboard-page-content">
            <switch>
            <Routes>
                <Route index element={<DashboardPage />} />
                <Route path="/students/add-student" element={<StudentAdmission />} />
                <Route path="/display_class" element={<DisplayClass /> } />
                <Route  path="/finance/*" element={<FinancePage/>} />
            </Routes>
            </switch>
        </div>
    );
};


const AdminDashboardPage = () => {
    return (
        <div className="main-dashboard">
            <div className="main-dashboard-left-section">
                <MainNavbar />
            </div>

            <div className= "main-dashboard-right-section">
                <div className="main-dashboard-top-navbar">
                    <TopNavbar />
                </div>

                {/* Use the <Outlet> to render child components */}
                <div className="main-dashboard-content-wrapper">
                    <DashboardPageContent />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
