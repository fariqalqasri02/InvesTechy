import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./editData.css";

export default function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);

  // ✅ FIX BUG BLANK PAGE
  useEffect(() => {
    document.body.classList.remove("page-exit");
  }, []);

  const handleSave = () => {
    alert("Data saved!");
    navigate(`/report-list/${id}`);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Project List" />

      {/* MAIN CONTENT */}
      <main className={`main-content ${isChatOpen ? "shrink" : ""}`}>
        <div className="header">
          <div>
            <h1>Edit Data</h1>
            <p>Edit the AI suggestions to match your requirements</p>
          </div>
        </div>

        {/* GRID */}
        <div className="edit-grid">
          {["CAPEX", "OPEX", "Tangible Results", "Intangible Results"].map(
            (section, i) => (
              <div className="input-card" key={i}>
                <div className="card-header">
                  <h3>{section}</h3>
                  <div className="actions">
                    <span>✎</span>
                    <span>+</span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Item</label>
                  <input type="text" placeholder="Item..." />

                  <label>Nominal</label>
                  <input type="text" defaultValue="IDR 1.000.000" />
                </div>
              </div>
            )
          )}
        </div>

        {/* FOOTER */}
        <div className="footer-actions">
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>

          <div className="ai-trigger" onClick={() => setIsChatOpen(true)}>
            <div className="ai-icon">🤖</div>
            <span>AI Helpy</span>
          </div>
        </div>
      </main>

      {/* AI CHAT SIDEBAR */}
      <div className={`ai-chat ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-title">
            🤖 <span>AI Helpy</span>
          </div>

          <button onClick={() => setIsChatOpen(false)}>✕</button>
        </div>

        <div className="chat-body">
          <h2>What are you working on?</h2>
        </div>

        <div className="chat-footer">
          <input type="text" placeholder="Ask anything you need..." />
        </div>
      </div>
    </div>
  );
}
