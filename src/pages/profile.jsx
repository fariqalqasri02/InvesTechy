import React, { useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import '../components/profile.css';

const Profile = () => {
  // Simulasi data dari registrasi/database
  const [userData, setUserData] = useState({
    name: "Mas Rusdi",
    email: "rusdi@example.com",
    businessName: "Rusdi Tech",
    role: "UMKM Owner",
    profilePic: "https://via.placeholder.com/150" // Ganti dengan path avatar Anda
  });

  return (
    <div className="profile-container">
      <Sidebar activeMenu="Settings" /> {/* Sesuaikan menu aktifnya */}
      
      <main className="profile-content">
        <header className="profile-header">
          <div className="profile-info-top">
            <div className="avatar-wrapper">
              <img src={userData.profilePic} alt="User Avatar" className="profile-avatar" />
              <button className="edit-avatar-btn">✎</button>
            </div>
            <h1>{userData.name}</h1>
          </div>
          <div className="profile-actions">
            <button className="btn-save">Save Changes</button>
            <button className="btn-edit">Edit Profile</button>
          </div>
        </header>

        <form className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={userData.name} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={userData.email} className="readonly-input" readOnly />
            </div>
            <div className="form-group">
              <label>Business Name</label>
              <input type="text" value={userData.businessName} readOnly />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" value={userData.role} readOnly />
            </div>
          </div>
          
          <div className="logout-section">
            <button type="button" className="btn-logout">Log Out</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;