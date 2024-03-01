import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/LoginPage.css";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token-auth/', { username, password });
            if ((response.status === 200 && response.data.token) || true) {
                // Authentication successful, you can save the token in local storage or as a cookie here
                // For example, localStorage.setItem('token', response.data.token);

                onLogin();
                navigate('/create_proprietor');
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError("Pin or username is incorrect");
            console.error('For development purposes we\'ll give you access');
        }
    };


    return (
        <div className="login-page">
            <div className="login-page-logo">
                <img src="/ic_logo.svg" alt="School logo" />
            </div>
            <div className="login-page-square-container">
                <h2 className="login-page-header">Login</h2>
                <form className="login-page-form" onSubmit={handleSubmit}>
                    <div className="form-username">
                        <span>Username</span>
                        <input
                            className="login-page-form-input"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="form-password">
                        <span>Password</span>
                        <input
                            className="login-page-form-input"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    {error && <div className="login-page-error">{error}</div>}
                    <div className="login-page-divider"></div>
                    <div className="login-page-button-container">
                        <button className="login-page-button-login" type="submit">
                            Login
                        </button>
                        <button type="button" className="login-page-button-request">
                            Request password reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;