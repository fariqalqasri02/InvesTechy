import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import '../components/pages.css';

const NewProject = () => {
  const navigate = useNavigate();
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
    // Simpan data ke sessionStorage agar bisa digabung di halaman survey
    sessionStorage.setItem('temp_project_base', JSON.stringify(formData));
    // Pindah ke step survey
    navigate('/new-project/survey');
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
                <select name="businessSector" value={formData.businessSector} onChange={handleChange} required>
                  <option value="" disabled>Select Sector...</option>
                  <option value="Retail">Retail</option>
                  <option value="Technology">Technology</option>
                  <option value="F&B">Food & Beverage</option>
                </select>
                <img src={arrowIcon} className="dropdown-icon" alt="arrow" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <select name="location" value={formData.location} onChange={handleChange} required>
                  <option value="" disabled>Select Location...</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bandung">Bandung</option>
                </select>
                <img src={arrowIcon} className="dropdown-icon" alt="arrow" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of Employee</label>
                <input type="number" name="employeeCount" placeholder="Input number..." value={formData.employeeCount} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>IT Investment Type</label>
                <input type="text" name="investmentType" placeholder="What do you want to invest?" value={formData.investmentType} onChange={handleChange} required />
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