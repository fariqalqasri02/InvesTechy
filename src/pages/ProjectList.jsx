import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import "./projectList.css";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 🔥 FIX UTAMA: hapus sisa animasi page sebelumnya
    document.body.classList.remove("page-exit");

    // trigger animasi masuk
    setAnimate(true);
  }, []);

  const stats = {
    total: 12,
    calculated: 8,
    waiting: 3,
    drafting: 1,
  };

  const projects = [
    {
      id: "7274AA84",
      industry: "Retail",
      status: "WAITING USER INPUT",
      date: "Mon, 6 Apr 2026",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Project List" />

      {/* 🔥 kasih animasi masuk */}
      <main className={`main-content ${animate ? "page-enter" : ""}`}>
        
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Projects Portfolio</h1>
            <p>Manage and simulate your IT investment projects</p>
          </div>

          <div className="profile">JD</div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Projects</p>
            <h2>{stats.total}</h2>
          </div>
          <div className="stat-card">
            <p>Calculated</p>
            <h2>{stats.calculated}</h2>
          </div>
          <div className="stat-card">
            <p>Waiting Input</p>
            <h2>{stats.waiting}</h2>
          </div>
          <div className="stat-card">
            <p>Drafting</p>
            <h2>{stats.drafting}</h2>
          </div>
        </div>

        {/* PROJECT HEADER */}
        <div className="project-header">
          <h2>Recent Projects</h2>
          <button 
            className="btn-primary"
            onClick={() => navigate("/new-project")}
          >
            + New Project
          </button>
        </div>

        {/* PROJECT CARD */}
        <div className="project-grid">
          {projects.map((item, index) => (
            <div className="project-card" key={index}>
              <div className="card-top">
                <div>
                  <p className="label">Project ID</p>
                  <h3>{item.id}</h3>
                </div>

                <span className="status waiting">
                  {item.status}
                </span>
              </div>

              <div className="tag">{item.industry}</div>

              <div className="card-footer">
                <div>
                  <p className="label">Created At</p>
                  <h4>{item.date}</h4>
                </div>

                <button className="btn-detail">
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}