import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/InvesTechy.jpg";
import { useAppSettings } from "../context/AppSettingsContext";
import "./admsidebar.css";

const SidebarAdmin = ({ activeMenu }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useAppSettings();

  const menus = [
    {
      name: t("navDashboard"),
      key: "Dashboard",
      path: "/admin/dashboard",
      icon: "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=FFFFFF",
      activeIcon:
        "https://img.icons8.com/?size=100&id=sUJRwjfnGwbJ&format=png&color=053B29",
    },
    {
      name: "Consultant",
      key: "Consultant",
      path: "/admin/consultant",
      icon: "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=FFFFFF",
      activeIcon:
        "https://img.icons8.com/?size=100&id=8kHOhdrNngb3&format=png&color=053B29",
    },
    {
      name: t("navSettings"),
      key: "Settings",
      path: "/admin/settings",
      icon: "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=FFFFFF",
      activeIcon:
        "https://img.icons8.com/?size=100&id=CcpTg57jVuhI&format=png&color=053B29",
    },
  ];

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isOpen);

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isOpen]);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <button
        type="button"
        className="admin-sidebar-toggle"
        aria-label={isOpen ? "Close admin navigation menu" : "Open admin navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`admin-sidebar-backdrop ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="InvesTechy Admin" />
        </div>

        <nav className="sidebar-nav">
          {menus.map((menu) => {
            const isActive = activeMenu === menu.key;
            return (
              <div
                key={menu.key}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigate(menu.path)}
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

        <div className="sidebar-footer">
          <div className="sidebar-footer-line"></div>
          <div className="nav-item logout-item" onClick={handleLogout}>
            <img
              src="https://img.icons8.com/?size=100&id=2445&format=png&color=FFFFFF"
              alt="Logout"
              className="sidebar-icon-img"
            />
            <span className="menu-text">Log Out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
