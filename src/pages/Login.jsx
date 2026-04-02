import React, { useState } from 'react';
import '../components/auth.css'; 
import logoImg from '../assets/InvesTechy.jpg'; 
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState(''); // State baru untuk isi password
  const [showPassword, setShowPassword] = useState(false);

  const eyeOpen = "https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000";
  const eyeClosed = "https://img.icons8.com/?size=100&id=FThUtBIXcPnM&format=png&color=000000";

  return (
    <div className="auth-body">
      <div className="auth-container">
        {/* --- BANNER KIRI --- */}
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

        {/* --- FORM KANAN --- */}
        <div className="auth-form-section">
          <div className="form-box">
            <h2>Login</h2>
            <p className="form-subtext">
              Don’t have an account? <a href="/register">Create Now</a>
            </p>

            <form>
              <div className="input-group">
                <label>E-mail</label>
                <input type="email" placeholder="example@gmail.com" required />
              </div>

              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password</label>
                  <a href="/forgot-password" style={{ fontSize: '12px', color: '#053B29', fontWeight: 'bold', textDecoration: 'none' }}>
                    Forgot Password?
                  </a>
                </div>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="**********" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state saat mengetik
                    required 
                  />
                  
                  {/* LOGIKA: Ikon mata hanya muncul jika password.length > 0 */}
                  {password.length > 0 && (
                    <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                      <img src={showPassword ? eyeOpen : eyeClosed} alt="toggle view" />
                    </span>
                  )}
                </div>
              </div>

              <div className="term-condition" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" id="remember" style={{ margin: '0 10px 0 0' }} />
                <label htmlFor="remember" style={{ cursor: 'pointer', fontSize: '14px' }}>Remember me</label>
              </div>

              <button type="submit" className="btn-auth-primary">Login</button>
              
              <div className="divider" style={{ textAlign: 'center', margin: '20px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></span>
                <span style={{ padding: '0 10px', color: '#718096', fontSize: '14px' }}>OR</span>
                <span style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></span>
              </div>

              <button type="button" className="btn-google" style={{ 
                width: '100%', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', 
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                <span style={{ fontWeight: '600', color: '#4A5568' }}>Continue with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;