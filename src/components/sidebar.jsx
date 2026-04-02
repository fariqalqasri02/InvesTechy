import React from 'react';
import './sidebar.css';
import logo from '../assets/InvesTechy.jpg'; 

const Sidebar = ({ activeMenu }) => {
  const menus = [
    { 
      name: 'Dashboard', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/grid-3.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/grid-3.png"
    },
    { 
      name: 'New Project', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/add-property.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/add-property.png"
    },
    { 
      name: 'Project List', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/wallet.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/wallet.png"
    },
    { 
      name: 'Report List', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/document.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/document.png"
    },
    { 
      name: 'Consult', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/comments.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/comments.png"
    },
    { 
      name: 'Settings', 
      icon: "https://img.icons8.com/material-outlined/24/ffffff/settings.png",
      activeIcon: "https://img.icons8.com/material-outlined/24/053B29/settings.png"
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="InvesTechy" />
      </div>
      
      <nav className="sidebar-nav">
        {menus.map((menu) => {
          const isActive = activeMenu === menu.name;
          return (
            <div 
              key={menu.name} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <img 
                src={isActive ? menu.activeIcon : menu.icon} 
                alt={menu.name} 
                className="sidebar-icon-img"
              />
              <span className="menu-text">{menu.name}</span>
            </div>
          );
        })}
      </nav>
      
      {/* Garis dekoratif bawah sesuai gambar referensi */}
      <div className="sidebar-footer-line"></div>
    </div>
  );
};

export default Sidebar;