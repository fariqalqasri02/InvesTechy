import React from 'react';
import '../components/auth.css'; 
import logoImg from '../assets/InvesTechy.jpg'; 

const ForgotPassword = () => {
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
            <h2 style={{ color: '#053B29' }}>Confirm Your Email</h2>
            <h3 style={{ color: '#D4AF37', fontWeight: '400', fontSize: '32px', marginTop: '-10px' }}>Forgot password</h3>
            
            <p className="form-subtext" style={{ marginTop: '20px' }}>
              Enter your email for the verification process, we will send 4 digits code to your email.
            </p>

            <form>
              <div className="input-group">
                <label>E-mail</label>
                <input type="email" placeholder="Enter email" required />
              </div>

              <button type="submit" className="btn-auth-primary" style={{ marginTop: '10px' }}>
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;