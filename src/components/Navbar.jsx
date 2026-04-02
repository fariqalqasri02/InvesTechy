import './navbar.css';
import logo from '../assets/InvesTechy.jpg';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Bagian Logo */}
      <div className="nav-logo">
        <img src= {logo} alt="InvesTechy Logo" className="logo-img" />
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
        <Link to="/login"className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;