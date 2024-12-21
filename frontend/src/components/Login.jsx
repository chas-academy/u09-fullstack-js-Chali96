import React, { useState } from 'react'
import{useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../css/Login.css"
import { useSnackbar } from "notistack";


const Login = ({setRoleVar}) => {
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[role,setRole]=useState('admin')
  const navigate= useNavigate()
  const { enqueueSnackbar } = useSnackbar();


    axios.defaults.withCredentials=true;
  const  handleSubmit =()=>{
  
        // Define the data to be sent
        const data = {
            username,
            password,
            role
        };
    axios.post('http://localhost:3000/auth/login',data)
    .then((res) => {
      console.log(res)
      if(res.data.wrongUsername)
      {
        enqueueSnackbar("Invalid Username", { variant: "info" });
        console.log("Username not match, check the username")

      }
      if(res.data.wrongPassword)
      {
        enqueueSnackbar("Invalid Password", { variant: "info" });
        console.log("password not match, check the password")

      }
      if(res.data.login && res.data.role==='admin'){
        setRoleVar('admin')
        console.log("admin login successfull")
        navigate('/dashboard')
      }
      else if(res.data.login && res.data.role==='student'){
        if(res.data.wrongUsername)
        {
          enqueueSnackbar("Invalid Username", { variant: "info" });
          console.log("Username not match, check the username")
  
        }
        if(res.data.wrongPassword)
        {
          enqueueSnackbar("Invalid Password", { variant: "info" });
          console.log("password not match, check the password")
  
        }
        setRoleVar('student')
        console.log("Student login successfull")
        navigate('/')
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className='login_page'>
      <div className='login-container'>
        <h2 className='login-title'>Login</h2><br/>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input type='text' placeholder='Enter Username'
          onChange={(e)=> setUsername(e.target.value)}/> 
        </div>
        <div className='form-group'>
          <label htmlFor=' password'>Password:</label> 
          <input type='password' placeholder='Enter Password' 
          onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div className='form-group'>
          <label htmlFor='role'>Role:</label>
          <select name='role' id='role' 
          onChange={(e)=> setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            </select> 
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login