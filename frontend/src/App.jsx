import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Books from './components/Books'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import { useState,useEffect } from 'react'
import Logout from './components/Logout'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'
import DeleteBook from './components/DeleteBook'
import axios from 'axios'

function App() {
  const[role,setRole]=useState('')

  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/verify')
    .then((res)=>{
      if(res.data.login){
        setRole(res.data.role)
      }
      else{
        setRole('')
      }
      console.log(res)

    }).catch((err)=>{
      console.log(err)
    })
  },[])


  return (
    <BrowserRouter>
    <Navbar  role={role}/>
    <Routes>
      <Route path='/' element={<Home setRole={setRole}/>}/>
      <Route path='/books' element={<Books role={role}/>}/>
      <Route path='/login' element={<Login setRoleVar={setRole}/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/addstudent' element={<AddStudent/>}/>
      <Route path='/addbook' element={<AddBook/>}/>
      <Route path='/edit/:id' element={<EditBook/>}/>
      <Route path='/delete/:id' element={<DeleteBook/>}/>
      <Route path='/logout' element={<Logout setRole={setRole}/>}/>
    
    </Routes>
    </BrowserRouter>
   
  )
}

export default App