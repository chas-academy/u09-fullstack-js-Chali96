import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:4002/auth/login', data, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Spara token
        localStorage.setItem('role', response.data.role);  // Spara användarens roll
        console.log('Got token => ', response.data.token);

        setRole(response.data.role);


        // Navigera till Dashboard om inloggningen lyckas
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    
      // Rensa localstorage om login misslyckas
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="login_page">
      <div className="login-container">
        <h2 className="login-title">Login</h2><br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn-login" onClick={handleSubmit}>Login</button>

        <div className="form-group">
          <Link className="admin-login-link" to="/admin-login">Login as Admin</Link>
        </div>
      </div>
      </div>
  );
};

export default Login;