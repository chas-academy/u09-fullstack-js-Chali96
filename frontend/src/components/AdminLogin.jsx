// AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const AdminLogin = ({ setRole }) => { // Få setRole via props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:4002/auth/admin-login', data, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Spara token
        localStorage.setItem('role', response.data.role);    // Spara användarens roll
        setRole(response.data.role);                         // Uppdatera state
        navigate('/admin-dashboard');                         // Navigera till admin-dashboard
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button className="btn-login" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
