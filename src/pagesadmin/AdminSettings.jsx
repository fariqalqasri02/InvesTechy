import React, { useEffect, useState } from "react";
import SidebarAdmin from "./admsidebar";
import { useAppSettings } from "../context/AppSettingsContext";
import "./AdminSettings.css";

const AdminSettings = () => {
  const { settings, updateSettings, t } = useAppSettings();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("id");
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);

  useEffect(() => {
    setTheme(settings.theme || "light");
    setLanguage(settings.language || "id");
    setIsNotifEnabled(Boolean(settings.notifications));
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      ...settings,
      theme,
      language,
      notifications: isNotifEnabled,
    });
    alert(t("settingsSaved"));
  };

  return (
    <div className="admin-container">
      <SidebarAdmin activeMenu="Settings" />

      <main className="admin-content">
        <div className="settings-card">
          <h1 className="settings-title">{t("systemPreferences")}</h1>

          <div className="form-group">
            <label>{t("theme")}</label>
            <select className="form-control" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">{t("light")}</option>
              <option value="dark">{t("dark")}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t("language")}</label>
            <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="id">{t("indonesian")}</option>
              <option value="en">{t("english")}</option>
            </select>
          </div>

          <div className="notification-section">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={isNotifEnabled}
                onChange={() => setIsNotifEnabled((prev) => !prev)}
                style={{ accentColor: "#053B29", width: "20px", height: "20px" }}
              />
            </div>

            <button className="btn-enable" type="button">
              {t("notifications")}
            </button>
          </div>

          <div className="settings-actions">
            <button className="btn-save-settings" type="button" onClick={handleSave}>
              {t("saveChanges")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
