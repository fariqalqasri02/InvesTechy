import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../components/profile.css';

const Profile = () => {
  const navigate = useNavigate();

  // State untuk mengontrol mode edit
  const [isEditing, setIsEditing] = useState(false);

  // State data user (Idealnya diambil dari localStorage/Context saat login)
  const [userData, setUserData] = useState({
    name: "Mas Rusdi",
    email: "rusdi.pro@example.com", 
    businessName: "Rusdi Tech Solution",
    role: "UMKM Owner",
    profilePic: "https://via.placeholder.com/150" 
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Simpan perubahan
  const handleSave = () => {
    // Logic API update data bisa ditaruh di sini
    console.log("Saving data...", userData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // Fungsi Log Out
  const handleLogout = () => {
    // Bersihkan session/token jika ada
    // localStorage.clear(); 
    navigate('/login');
  };

  return (
    <div className="profile-layout">
      {/* Sidebar tanpa menu aktif */}
      <Sidebar activeMenu="" />

      <main className="profile-main-content">
        <div className="profile-inner-container">
          
          {/* Header Section */}
          <header className="profile-header">
            <div className="user-profile-info">
              <div className="avatar-wrapper">
                <img src={userData.profilePic} alt="User Avatar" className="profile-avatar-img" />
                {isEditing && (
                  <button className="edit-photo-badge" title="Change Photo">
                    ✎
                  </button>
                )}
              </div>
              <h1 className="user-display-name">{userData.name}</h1>
            </div>

            <div className="profile-header-actions">
              <button 
                className={`btn-action-save ${!isEditing ? 'is-disabled' : ''}`}
                onClick={handleSave}
                disabled={!isEditing}
              >
                Save Changes
              </button>
              <button 
                className="btn-action-edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </header>

          {/* Form Section */}
          <section className="profile-form-card">
            <div className="profile-form-grid">
              
              {/* Name Group */}
              <div className="form-input-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your Name"
                />
              </div>

              {/* Email Group - Locked */}
              <div className="form-input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={userData.email}
                  disabled={true} 
                  className="input-locked"
                  placeholder="Registered Email"
                />
              </div>

              {/* Business Name Group */}
              <div className="form-input-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  name="businessName"
                  value={userData.businessName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your Business Name"
                />
              </div>

              {/* Role Group - Locked */}
              <div className="form-input-group">
                <label>Role</label>
                <input 
                  type="text" 
                  value={userData.role}
                  disabled={true}
                  className="input-locked"
                  placeholder="Ur Role"
                />
              </div>

            </div>

            {/* Logout Section */}
            <div className="profile-footer">
              <button className="btn-profile-logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Profile;