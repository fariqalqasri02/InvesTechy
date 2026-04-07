import React, { useState } from 'react';
import SidebarAdmin from './admsidebar';
import './AdminSettings.css';

const AdminSettings = () => {
  const [theme, setTheme] = useState('Light');
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);

  return (
    <div className="admin-container">
      {/* Sidebar tetap di kiri */}
      <SidebarAdmin activeMenu="Settings" />

      {/* Konten Utama */}
      <main className="admin-content">
        <div className="settings-card">
          <h1 className="settings-title">System Preferences</h1>

          <div className="form-group">
            <label>Theme</label>
            <select 
              className="form-control" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select 
              className="form-control" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
          </div>

          <div className="notification-section">
            <div className="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    checked={isNotifEnabled}
                    onChange={() => setIsNotifEnabled(!isNotifEnabled)}
                    style={{ accentColor: '#053B29', width: '20px', height: '20px' }}
                />
            </div>
            
            <button className="btn-enable">
              Enable <br /> Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;