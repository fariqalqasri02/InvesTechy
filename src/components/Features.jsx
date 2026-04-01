import React from 'react';
import './features.css';

const InvesTechy = () => {
  const data = [
    {
      title: "Decision Oriented",
      desc: "Designed to support better decision-making, not just data display. Get clear insights and practical recommendations you can act on.",
      icon: "✏️" 
    },
    {
      title: "Market-Based Pricing",
      desc: "Built using realistic cost assumptions aligned with current market conditions. Helps you estimate investment value based on real-world scenarios.",
      icon: "🛒"
    },
    {
      title: "UMKM Focused",
      desc: "Tailored specifically for small and medium-sized businesses. Simple, relevant, and aligned with real operational needs.",
      icon: "👥"
    },
    {
      title: "Easy to Use",
      desc: "No technical expertise required. Just input your data and get insights quickly and effortlessly.",
      icon: "⭐"
    }
  ];

  return (
    <div className="investechy-wrapper">
      <header className="investechy-header">
        <h1>Smarter IT Investment Decisions <br /> <span>Powered by AI</span></h1>
        <p>
          We help small and medium-sized businesses evaluate IT investments with simple, AI-assisted insights. 
          Understand potential costs, estimate returns, and make better decisions — all in minutes.
        </p>
      </header>

      <main className="investechy-content">
        <h2 className="main-subtitle">Why InvesTechy?</h2>
        
        <div className="features-grid">
          {data.map((item, index) => (
            <div key={index} className="feature-item">
              <div className="icon-circle">
                {/* Anda bisa ganti icon ini dengan SVG atau Image */}
                <span>{item.icon}</span>
              </div>
              <div className="text-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InvesTechy;