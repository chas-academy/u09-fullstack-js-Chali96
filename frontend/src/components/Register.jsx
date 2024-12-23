import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import { useSnackbar } from 'notistack';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    // Define the data to be sent
    const data = {
      email,
      password    
    };
  
    axios.post('http://localhost:3001/signup', data)
      .then((res) => {
        // Hantera svaret från servern
        if (res.data.success) {
          enqueueSnackbar("Registration successful! Please log in.", { variant: "success" });
          console.log("Registration successful");
          navigate('/login');
        } else {
          enqueueSnackbar("An error occurred during registration.", { variant: "error" });
        }
      })
      .catch((error) => {
        // Hantera felet
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
            type="text" 
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)} 
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
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select 
            name="role" 
            id="role" 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> 
        <button className="btn-register" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Register;
