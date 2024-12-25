// AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:4001/auth/admin-login', data, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Spara token
        localStorage.setItem('role', response.data.role);  // Spara användarens roll
        navigate('/admin-dashboard');  // Navigera till admin-dashboard
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="login_page">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2><br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn-login" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
