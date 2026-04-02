import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../components/auth.css'; 
import logoImg from '../assets/InvesTechy.jpg'; 

const Register = () => {
  const navigate = useNavigate(); // 2. Inisialisasi hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const eyeOpen = "https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000";
  const eyeClosed = "https://img.icons8.com/?size=100&id=FThUtBIXcPnM&format=png&color=000000";
  const dropdownIcon = "https://img.icons8.com/?size=100&id=5jRysPx2JtDa&format=png&color=000000";

  // 3. Fungsi untuk menangani submit
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Di sini nanti tempat memanggil API Register
    alert("Registration Successful! Please login.");
    navigate('/login'); // 4. Pindah ke halaman login
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo-container"> 
              <img src={logoImg} alt="InvesTechy Logo" className="banner-logo" />
            </div>
            <h1 className="banner-title">
              Smarter IT Investment <br />
              <span className="highlight">Starts Here</span>
            </h1>
            <p className="banner-subtitle">
              Make smarter digital investment decisions in minutes <br/>
              no complexity, just data-driven insights.
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-box">
            <h2>Register</h2>
            <p className="form-subtext">
              Already have an account? <a href="/login">Login</a>
            </p>

            <form onSubmit={handleRegister}> {/* Tambahkan onSubmit */}
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>

              <div className="input-group">
                <label>E-mail</label>
                <input type="email" placeholder="example@gmail.com" required />
              </div>

              <div className="input-group">
                <label>Business Name</label>
                <input type="text" placeholder="Input Your Business Name" />
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="**********" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  {password.length > 0 && (
                    <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                      <img src={showPassword ? eyeOpen : eyeClosed} alt="toggle view" />
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="**********" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                  {confirmPassword.length > 0 && (
                    <span className="password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="toggle view" />
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Role</label>
                <div className="input-wrapper">
                  <select defaultValue="" required>
                    <option value="" disabled>Choose Your Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <img src={dropdownIcon} alt="dropdown" className="dropdown-icon-img" />
                </div>
              </div>

              <div className="term-condition">
                <input type="checkbox" required />
                <label>
                    I agree to the <strong>Terms of Service</strong> and acknowledge the <strong>Privacy Policy</strong>.
                </label>
              </div>

              <button type="submit" className="btn-auth-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;