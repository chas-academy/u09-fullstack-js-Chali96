import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = ({ setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4002/auth/login", {
        email,
        password
      }, { withCredentials: true });

      if (response.data.token) {
        // Spara token och roll i localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Uppdatera roll i React state om du skickar in setRole som prop
        if (setRole) {
          setRole(response.data.role);
        }

        console.log("Got token =>", response.data.token);
        navigate("/dashboard"); // Navigera till /dashboard (eller valfri sida)
      }
    } catch (error) {
      console.error("Login error:", error);

      // Rensa localStorage om du vill nollställa ev. gamla token/role
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      alert("Login failed, please check your credentials.");
    }
  };

  return (
    <div className="login_page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2><br />
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

        <button className="btn-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
