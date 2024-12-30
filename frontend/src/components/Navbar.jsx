import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole("");
    setIsMenuOpen(false); // Stäng menyn vid logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          BOOK VERSE
        </Link>
      </div>
      <div className="burger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        {role === "" && (
          <>
            <Link to="/books" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              BOOKS
            </Link>
            <Link to="/register" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              REGISTER
            </Link>
            <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              LOGIN
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/addbook" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              ADD BOOK
            </Link>
            <Link to="/admin-dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              DASHBOARD
            </Link>
          </>
        )}
        {role !== "" && (
          <>
            <Link to="/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              READING LIST
            </Link>
            <Link to="/books" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              BOOKS
            </Link>
            <Link to="/" className="navbar-link" onClick={handleLogout}>
              LOGOUT
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


