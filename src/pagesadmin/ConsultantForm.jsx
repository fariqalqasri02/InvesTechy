import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarAdmin from './admsidebar';
import './ConsultantForm.css';

const ConsultantForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    whatsapp: '', position: '', fee: '',
    photoPreview: null
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        firstName: 'Audelia', lastName: 'Nainggolan',
        email: 'audelia@investechy.com', whatsapp: '08123456789',
        position: 'UI/UX Designer', fee: '150000',
        photoPreview: null 
      });
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photoPreview: URL.createObjectURL(file) });
    }
  };

  const handleDeletePhoto = () => {
    setFormData({ ...formData, photoPreview: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/consultant');
  };

  return (
    <div className="admin-page-layout">
      <SidebarAdmin activeMenu="Consultant" />
      
      <main className="admin-content-area">
        {/* Header Sejajar */}
        <header className="form-header-container">
          <h2 className="form-title">Consultant Profile</h2>
          <div className="header-actions">
            <button type="button" className="btn-rect cancel" onClick={() => navigate('/admin/consultant')}>Cancel</button>
            <button type="submit" form="profileForm" className="btn-rect save">Save Changes</button>
          </div>
        </header>
        
        <form id="profileForm" className="profile-form-container" onSubmit={handleSubmit}>
          {/* Section Foto */}
          <div className="photo-section-group">
            <label className="input-label">Photo</label>
            <div className="photo-box-wrapper">
              <div className="photo-display-area" onClick={() => fileInputRef.current.click()}>
                {formData.photoPreview ? (
                  <img src={formData.photoPreview} alt="Preview" className="img-preview-fill" />
                ) : (
                  <div className="upload-placeholder">
                    <img src="https://img.icons8.com/?size=100&id=2445&format=png&color=BBBBBB" alt="icon" />
                    <span>Tap to upload</span>
                  </div>
                )}
              </div>
              
              {formData.photoPreview && (
                <div className="photo-action-container">
                  <button type="button" className="photo-btn edit-photo" onClick={() => fileInputRef.current.click()}>Edit Photo</button>
                  <button type="button" className="photo-btn delete-photo" onClick={handleDeletePhoto}>Delete Photo</button>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
          </div>

          {/* Grid Inputs */}
          <div className="inputs-grid-layout">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <input type="text" name="firstName" placeholder="Your First Name" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input type="text" name="lastName" placeholder="Your Last Name" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" name="email" placeholder="Registered Email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">WhatsApp Number</label>
              <input type="text" name="whatsapp" placeholder="Enter Number (+62)" value={formData.whatsapp} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Position</label>
              <select name="position" value={formData.position} onChange={handleInputChange}>
                <option value="">Choose Your Position</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Front End Dev">Front End Dev</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">per Session Fee</label>
              <input type="text" name="fee" placeholder="IDR" value={formData.fee} onChange={handleInputChange} />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ConsultantForm;