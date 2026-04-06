import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import "./settings.css";


export default function Settings() {
  const [form, setForm] = useState({
    name: "Mas Rusdi",
    email: "user@email.com",
    company: "InvesTechy",
    theme: "light",
    language: "id", // 🔥 tambah ini
    notifications: true,
    password: "",
    confirmPassword: ""
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    document.body.classList.remove("page-exit");
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    // 🔥 simpan ke localStorage
    localStorage.setItem("app_settings", JSON.stringify(form));

    alert("Settings berhasil disimpan!");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Settings" />

      <main className={`main-content ${animate ? "page-enter" : ""}`}>
        
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your account preferences and system configuration
        </p>

        {/* PROFILE */}
        <div className="settings-card">
          <h2>Profile Information</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange}/>
          </div>
        </div>

        {/* SYSTEM */}
        <div className="settings-card">
          <h2>System Preferences</h2>

          <div className="form-group">
            <label>Theme</label>
            <select name="theme" value={form.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* 🔥 LANGUAGE SELECTOR */}
          <div className="form-group">
            <label>Language</label>
            <select name="language" value={form.language} onChange={handleChange}>
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>
        </div>

        {/* SECURITY */}
        <div className="settings-card">
          <h2>Security</h2>

          <div className="form-group">
            <label>New Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}/>
          </div>
        </div>

        <div className="settings-action">
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>

      </main>
    </div>
  );
}