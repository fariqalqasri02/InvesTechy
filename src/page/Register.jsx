import React, { useState } from 'react';
// Gunakan CSS yang sama dari folder components/Auth
import '../components/auth.css'; 
// Import Logo
import logoImg from '../assets/InvesTechy.jpg'; 

// ... (bagian import tetap sama)

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-body">
      <div className="auth-container">
        {/* --- BAGIAN KIRI: BANNER --- */}
        <div className="auth-banner">
          <div className="banner-content">
            {/* Mengembalikan class banner-logo-container jika ingin border biru sesuai gambar referensi */}
            <div className="banner-logo-container"> 
              <img src={logoImg} alt="InvesTechy Logo" className="banner-logo" />
            </div>
            <h1 className="banner-title">
              Smarter IT Investment <br />
              <span className="highlight">Starts Here</span>
            </h1>
            <p className="banner-subtitle">
              Make smarter digital investment decisions in minutes no complexity, just data-driven insights.
            </p>
          </div>
        </div>

        {/* --- BAGIAN KANAN: FORM --- */}
        <div className="auth-form-section">
          <div className="form-box">
            <h2>Register</h2>
            <p className="form-subtext">
              Already have an account? <a href="/login">Login</a>
            </p>

            <form>
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
                <input type="text" placeholder="Paragon Corp" />
              </div>

              {/* Password Input dengan Toggle Unicode */}
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="**********" 
                    required 
                  />
                  <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                  </span>
                </div>
              </div>

              {/* Confirm Password Input dengan Toggle Unicode */}
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="1234567890" 
                    required 
                  />
                  <span className="password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  </span>
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="input-group">
                <label>Role</label>
                <div className="input-wrapper">
                  <select defaultValue="" required>
                    <option value="" disabled>Choose Ur Role</option>
                    <option value="investor">Investor</option>
                    <option value="expert">IT Expert</option>
                    <option value="startup">Startup Founder</option>
                  </select>
                </div>
              </div>

              <div className="term-condition">
                <input type="checkbox" required />
                <label>
                  I agree to the <a href="#">Terms of Service</a> and acknowledge the <a href="#">Privacy Policy</a>.
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