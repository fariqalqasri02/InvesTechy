import React, { useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import '../components/pages.css';

const NewProject = () => {
  const [formData, setFormData] = useState({
    businessSector: '',
    location: '',
    employeeCount: '',
    investmentType: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Proyek Baru:", formData);
  };

  const arrowIcon = "https://img.icons8.com/?size=100&id=5jRysPx2JtDa&format=png&color=053B29";

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="New Project" />
      
      <main className="main-content">
        <h1 className="page-title">Business Profile</h1>
        <p className="page-subtitle">Fill in a few details about your business to generate your IT investment analysis</p>

        <div className="content-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Business Sector</label>
                <select 
                  name="businessSector" 
                  value={formData.businessSector} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Sector...</option>
                  <option value="retail">Retail</option>
                  <option value="tech">Technology</option>
                  <option value="fnb">Food & Beverage</option>
                </select>
                <img src={arrowIcon} className="dropdown-icon" alt="arrow" />
              </div>

              <div className="form-group">
                <label>Location</label>
                <select 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Location...</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                </select>
                <img src={arrowIcon} className="dropdown-icon" alt="arrow" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of Employee</label>
                <input 
                  type="number" 
                  name="employeeCount"
                  placeholder="Input your Number of Employee..." 
                  value={formData.employeeCount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>IT Investment Type</label>
                <input 
                  type="text" 
                  name="investmentType"
                  placeholder="Tell us what you want to invest here..." 
                  value={formData.investmentType}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <button type="submit" className="btn-next">Next</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewProject;