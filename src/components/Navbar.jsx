import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Bagian Logo */}
      <div className="nav-logo">
        <img src="/InvesTechy.png" alt="InvesTechy Logo" className="logo-img" />
        <span className="logo-text">InvesTechy</span>
      </div>

      {/* Bagian Menu Tengah */}
      <ul className="nav-links">
        <li><a href="#get-started">Get Started</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Bagian Tombol Aksi (Kanan) */}
      <div className="nav-actions">
        <button className="btn-login">Log In</button>
        <button className="btn-register">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;