import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../components/auth.css'; 
import logoImg from '../assets/InvesTechy.jpg'; 

const ForgotPassword = () => {
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini biasanya ada logika API untuk kirim email
    // Setelah berhasil, pindah ke halaman reset-password
    navigate('/reset-password'); 
  };

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
              Enter your email for the verification process, we will send <br/>
              a password reset link to your email.
            </p>

            <form onSubmit={handleSubmit}> {/* 3. Tambahkan onSubmit */}
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