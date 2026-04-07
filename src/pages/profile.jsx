import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../components/profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  const defaultAvatar = "https://img.icons8.com/?size=100&id=bC0O28EGsK5f&format=png&color=00381e";

  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  const [savedData, setSavedData] = useState({
    name: "Mas Rusdi",
    email: "rusdi.pro@example.com", 
    businessName: "Rusdi Tech Solution",
    role: "UMKM Owner",
    profilePic: null 
  });

  const [formData, setFormData] = useState({ ...savedData });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowPhotoMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
        setShowPhotoMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setFormData({ ...formData, profilePic: null });
    setShowPhotoMenu(false);
  };

  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEditing(false);
    setShowPhotoMenu(false);
  };

  return (
    <div className="profile-layout">
      <Sidebar activeMenu="" />

      <main className="profile-main-content">
        <div className="profile-inner-container">
          
          <header className="profile-header">
            <div className="user-profile-info">
              <div className="avatar-wrapper">
                <img 
                  src={formData.profilePic || defaultAvatar} 
                  alt="User Avatar" 
                  className="profile-avatar-img" 
                />
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                {isEditing && (
                  <div className="edit-photo-container" ref={menuRef}>
                    <button 
                      className="edit-photo-badge" 
                      onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                      type="button"
                    >
                      ✎
                    </button>

                    {showPhotoMenu && (
                      <div className="photo-options-menu">
                        <button type="button" onClick={() => fileInputRef.current.click()}>
                          Upload Photo
                        </button>
                        <button type="button" className="delete-btn" onClick={handleDeletePhoto}>
                          Delete Photo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <h1 className="user-display-name">{formData.name}</h1>
            </div>

            <div className="profile-header-actions">
              {isEditing ? (
                <>
                  <button className="btn-action-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn-action-save" onClick={handleSave}>
                    Save Changes
                  </button>
                </>
              ) : (
                <button className="btn-action-edit" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </header>

          <section className="profile-form-card">
            <div className="profile-form-grid">
              <div className="form-input-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="form-input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  disabled 
                  className="input-locked" 
                />
              </div>
              <div className="form-input-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  name="businessName" 
                  value={formData.businessName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="form-input-group">
                <label>Role</label>
                <input 
                  type="text" 
                  value={formData.role} 
                  disabled 
                  className="input-locked" 
                />
              </div>
            </div>

            {!isEditing && (
              <div className="profile-footer">
                <button className="btn-profile-logout" onClick={() => navigate('/login')}>
                  Log Out
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;