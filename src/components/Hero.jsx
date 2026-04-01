import React from 'react';
import './hero.css'; // Mengimpor file CSS eksternal

// Pastikan Anda menempatkan file gambar ilustrasi Anda di folder 'public'
// Contoh: public/investment-illustration.png
const heroIllustration = '/investment-illustration.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        
        {/* Kolom Teks (Kiri) */}
        <div className="hero-text">
          <h1 className="hero-title">
            Smarter IT Investment <br />
            <span className="hero-title-green">Starts Here</span>
          </h1>
          
          <p className="hero-description">
            Make smarter digital investment decisions in minutes
            no complexity, just data-driven insights.
          </p>
          
          <button className="get-started-btn">
            Get Started &gt;
          </button>
        </div>

        {/* Kolom Ilustrasi (Kanan) */}
        <div className="hero-image-container">
          <img 
            src={heroIllustration} 
            alt="Investment Data Analysis Illustration" 
            className="hero-image"
          />
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;