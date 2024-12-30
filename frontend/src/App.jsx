// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Logout from './components/Logout';
import AdminDashboard from './components/AdminDashboard'; 
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Funktion för att kontrollera om användaren är admin
  const isAdmin = () => {
    return role === 'admin';
  };

  // Funktion för att kontrollera om användaren är inloggad
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  

  return (
    <BrowserRouter>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        <Route path='/' element={<Home setRole={setRole} />} />
        <Route path='/books' element={<Books role={role} />} />
        <Route path='/login' element={<Login setRoleVar={setRole} />} />
        <Route path='/admin-login' element={<AdminLogin setRole={setRole} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
        } />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/edit/:id' element={<EditBook />} />
        <Route path='/delete/:id' element={<DeleteBook />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />

        {/* Admin Dashboard Route */}
        <Route path='/admin-dashboard' element={
          isAdmin() ? <AdminDashboard /> : <Navigate to="/admin-dashboard" />
        } />
          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer role={role} />
    </BrowserRouter>
  );
}

export default App;

