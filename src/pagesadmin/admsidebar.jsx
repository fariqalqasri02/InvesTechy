import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/InvesTechy.jpg'; 
import './admsidebar.css';

const SidebarAdmin = ({ activeMenu }) => {
  const navigate = useNavigate();

  const menus = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard',
      icon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=053B29" 
    },
    { 
      name: 'Consultant', 
      path: '/admin/consultant',
      icon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=053B29"
    },
    { 
      name: 'Settings', 
      path: '/admin/settings',
      icon: "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=053B29"
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="InvesTechy Admin" />
      </div>
      
      <nav className="sidebar-nav">
        {menus.map((menu) => {
          const isActive = activeMenu === menu.name;
          return (
            <div
              key={menu.name}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(menu.path)}
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
      <div className="sidebar-footer-line"></div>
    </div>
  );
};

export default SidebarAdmin;