import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">BOOK VERSE</Link>
      </div>
      <div className="navbar-right">
        {role === '' && (
          <>
          <Link to="/books" className='navbar-link'>Books</Link>
            <Link to="/register" className='navbar-link'>Register</Link>
            <Link to="/login" className='navbar-link'>Login</Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link to="/addbook" className='navbar-link'>Add Book</Link>
            <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
          </>
        )}
        {role !== '' && (
          <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
        )}
          {role !== '' && (
          <Link to="/books" className='navbar-link'>Books</Link>
        )}
         {role !== '' && (
          <Link to="/" className='navbar-link' onClick={handleLogout}>Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
