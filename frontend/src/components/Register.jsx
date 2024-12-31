import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password })
        .then(result => {
            console.log(result);
            navigate("/login");
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="register_page">
            <div>
                <form className="register-container" onSubmit={handleSubmit}>
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
                    <button className="btn-register" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
