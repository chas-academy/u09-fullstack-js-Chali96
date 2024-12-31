import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const AdminLogin = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:4002/auth/admin-login", data, { withCredentials: true });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // Uppdatera roll => Navbar uppdateras direkt
        setRole(response.data.role);

        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed, please check your credentials.");
    }
  };


  return (
    <div className="login_page">
      <div>
        <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-title">Admin Login</h2><br />
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
