import React from 'react';
import './sidebar.css';
import logo from '../assets/InvesTechy.jpg'; 

const Sidebar = ({ activeMenu }) => {
  const menus = [
    { 
      name: 'Dashboard', 
      icon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=053B29"
    },
    { 
      name: 'New Project', 
      icon: "https://img.icons8.com/?size=100&id=gxFxowCaQoBQ&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=gxFxowCaQoBQ&format=png&color=053B29"
    },
    { 
      name: 'Project List', 
      icon: "https://img.icons8.com/?size=100&id=aslXiAMR2V7S&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=aslXiAMR2V7S&format=png&color=053B29"
    },
    { 
      name: 'Report List', 
      icon: "https://img.icons8.com/?size=100&id=Ss9HzIp5VFDD&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=Ss9HzIp5VFDD&format=png&color=053B29"
    },
    { 
      name: 'Consult', 
      icon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=053B29"
    },
    { 
      name: 'Settings', 
      // Menggunakan ID ikon baru: CcpTg57jVuhI
      icon: "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=053B29"
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
            <div key={menu.name} className={`nav-item ${isActive ? 'active' : ''}`}>
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
    </div>
  );
};

export default Sidebar;