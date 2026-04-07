import React, { useState } from "react";
import SidebarAdmin from "./admsidebar"; 
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/CharSection";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [filter, setFilter] = useState('WEEKLY');
  
  const dataWeekly = [
    { label: "MON", value: 30 }, { label: "TUE", value: 45 }, { label: "WED", value: 60 },
    { label: "THU", value: 40 }, { label: "FRI", value: 70 }, { label: "SAT", value: 90 }, { label: "SUN", value: 55 }
  ];

  const dataMonthly = [
    { label: "JAN", value: 40 }, { label: "FEB", value: 65 }, 
    { label: "MAR", value: 82 }, { label: "APR", value: 95 }, { label: "MAY", value: 105 }
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin activeMenu="Dashboard" />
      <main className="admin-content">
        
        {/* Header Section */}
        <header className="top-bar">
          <div className="welcome">
            <h1>Hello, Mike!</h1>
            <p>Welcome back, we miss you coming</p>
          </div>
          <div className="top-bar-right">
            <div className="search-wrapper">
              <input type="text" placeholder="Search for anything...." />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="summary-grid">
          <SummaryCard 
            title="TOTAL USERS" 
            value="1000" 
            icon="https://img.icons8.com/?size=100&id=1Wf241bLN9LO&format=png&color=00381e" 
          />
          <SummaryCard 
            title="TOTAL PROJECTS" 
            value="1500" 
            icon="https://img.icons8.com/?size=100&id=xhmDNaoYW1Mf&format=png&color=00381e" 
          />
          <SummaryCard 
            title="ACTIVITY" 
            value="550" 
            icon="https://img.icons8.com/?size=100&id=IOdrUofMto8h&format=png&color=00381e" 
          />
          <SummaryCard 
            title="CONSULTANTS" 
            value="5" 
            icon="https://img.icons8.com/?size=100&id=fT3liaAJWLmA&format=png&color=00381e" 
          />
        </div>

        {/* Chart Section */}
        <div className="chart-wrapper">
          <div className="chart-header-row">
            <h2>TOTAL PROJECTS</h2>
            <div className="toggle-buttons">
              <button 
                className={filter === 'WEEKLY' ? 'active' : ''} 
                onClick={() => setFilter('WEEKLY')}
              >
                WEEKLY
              </button>
              <button 
                className={filter === 'MONTH' ? 'active' : ''} 
                onClick={() => setFilter('MONTH')}
              >
                MONTH
              </button>
            </div>
          </div>
          <ChartSection 
            data={filter === 'WEEKLY' ? dataWeekly : dataMonthly} 
            type="admin" 
          />
        </div>
      </main>
    </div>
  );
}