import React from 'react';
import './sidebar.css';
import logo from '../assets/InvesTechy.jpg';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate();

  const menus = [
    { name: 'Dashboard', path: '/dashboard',
      icon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=053B29"
    },
    { name: 'New Project', path: '/new-project',
      icon: "https://img.icons8.com/?size=100&id=gxFxowCaQoBQ&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=gxFxowCaQoBQ&format=png&color=053B29"
    },
    { name: 'Project List', path: '/project-list',
      icon: "https://img.icons8.com/?size=100&id=aslXiAMR2V7S&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=aslXiAMR2V7S&format=png&color=053B29"
    },
    { name: 'Report List', path: '/report-list',
      icon: "https://img.icons8.com/?size=100&id=Ss9HzIp5VFDD&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=Ss9HzIp5VFDD&format=png&color=053B29"
    },
    { name: 'Consult', path: '/consult',
      icon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=FFFFFF",
      activeIcon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=053B29"
    },
    { name: 'Settings', path: '/settings',
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
            <div
              key={menu.name}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                document.body.classList.add("page-exit");
                setTimeout(() => {
                  navigate(menu.path);
                }, 250);
              }}
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
    </div>
  );
};

export default Sidebar;