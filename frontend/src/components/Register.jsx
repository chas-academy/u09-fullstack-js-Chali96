import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import { useSnackbar } from 'notistack';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    axios.defaults.withCredentials = true;

    const handleSubmit = () => {
        const data = {
            email,
            username,
            password
        };

        axios.post('http://localhost:4001/auth/register', data)
            .then((res) => {
                if (res.data.success) {
                    enqueueSnackbar("Registration successful! Please log in.", { variant: "success" });
                    navigate('/login');
                } else {
                    enqueueSnackbar(res.data.message || "An error occurred during registration.", { variant: "error" });
                }
            })
            .catch((error) => {
                console.error(error);
                enqueueSnackbar("An error occurred during registration.", { variant: "error" });
            });
    };

    return (
        <div className="register_page">
            <div className="register-container">
                <h2 className="register-title">Register</h2><br />
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button className="btn-register" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;

