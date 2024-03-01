import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/LoginPage';
import AdminDashboardPage from "./Components/AdminDashboard";
import { useState } from "react";
import UserRegistration from "./Components/UserRegistration";
import CreateProprietorTemplate from "./Components/CreateProprietorTemplate";
import CreateSchoolTemplate from "./Components/CreateSchoolTemplate";
import DisplayClass from "./Components/DisplayClass";
import CreateDepartment from "./Components/CreateDepartment";
import CreateFeeTemplate from "./Components/CreateFeeTemplate";
import CreateCourse from "./Components/CreateCourse";
import DashboardPage from "./Components/DashboardPage";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Perform authentication logic here, and if successful, set isLoggedIn to true.
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UserRegistration />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/dashboard/*" element={<AdminDashboardPage />} />
                    <Route path="/create_proprietor" element={<CreateProprietorTemplate />} />
                    <Route path="/create_school" element={<CreateSchoolTemplate />} />
                    <Route path="/create_department" element={<CreateDepartment />} />
                    <Route path="/create_fees" element={<CreateFeeTemplate />} />
                    <Route path="/create_course" element={<CreateCourse />} />
                </Routes>
            </div>
        </Router>

        // <DashboardPage />

    );
};
export default App;
