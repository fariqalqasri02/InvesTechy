import React, { useState } from 'react';
import '../components/auth.css'; 
import logoImg from '../assets/InvesTechy.jpg'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-body">
      <div className="auth-container">
        {/* --- BAGIAN KIRI: BANNER --- */}
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
              Make smarter digital investment decisions in minutes no complexity, just data-driven insights.
            </p>
          </div>
        </div>

        {/* --- BAGIAN KANAN: FORM LOGIN --- */}
        <div className="auth-form-section">
          <div className="form-box">
            <h2>Login</h2>
            <p className="form-subtext">
              Don’t have an account? <a href="/register">Create now</a>
            </p>

            <form>
              {/* E-mail Input */}
              <div className="input-group">
                <label>E-mail</label>
                <input type="email" placeholder="example@gmail.com" required />
              </div>

              {/* Password Input dengan Toggle */}
              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>Password</label>
                  <a href="/forgot-password" style={{ fontSize: '12px', color: '#053B29', fontWeight: 'bold' }}>
                    Forgot Password?
                  </a>
                </div>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="**********" 
                    required 
                  />
                  <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="term-condition" style={{ marginBottom: '20px' }}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn-auth-primary">Login</button>
              
              {/* Optional: Separator OR */}
              <div style={{ textAlign: 'center', margin: '20px 0', color: '#718096', fontSize: '14px' }}>
                <hr style={{ border: '0.5px solid #E2E8F0', marginBottom: '-10px' }} />
                <span style={{ background: '#FDFBFA', padding: '0 10px' }}>OR</span>
              </div>

              {/* Optional: Continue with Google (Sesuai gambar referensi Anda) */}
              <button type="button" className="btn-auth-google" style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #E2E8F0', 
                borderRadius: '8px', 
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;