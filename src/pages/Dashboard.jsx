import { useEffect } from "react";
<<<<<<< HEAD
=======
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // TAMBAHAN: Import Link
>>>>>>> ec4629a4bb2a311dba967fcfef8669e3eab2eae9
import Sidebar from "../components/sidebar";
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/CharSection";
import AnalyticsTable from "../components/AnalyticsTable";
import InsightBox from "../components/InsightBox";
import "./dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.remove("page-exit");
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar activeMenu="Dashboard" />

      <main className="main-content">
        <div className="content-wrapper">
          <header className="top-bar">
            <div className="welcome-message">
              <h1 className="text-2xl font-bold">Hello, Mas Rusdi</h1>
              <p className="text-gray-500">Welcome back</p>
            </div>

            <div className="top-bar-right">
              <div className="search-wrapper">
                <span>Search</span>
                <input type="text" placeholder="Search for anything..." />
              </div>

              <div className="profile-info">
<<<<<<< HEAD
                <span className="notif">Alerts</span>
                <div className="user-profile">
                  <img src="./assets/AkUnpad.png" alt="Avatar" className="avatar" />
=======
                <span className="notif">🔔</span>
                
                {/* LINK MENUJU PROFILE (GAMBAR 2) */}
                <Link 
                  to="/profile" 
                  className="user-profile" 
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <img 
                    src="./assets/AkUnpad.png" 
                    alt="Avatar" 
                    className="avatar" 
                  />
>>>>>>> ec4629a4bb2a311dba967fcfef8669e3eab2eae9
                  <div className="user-detail">
                    <span className="user-name">Mas Rusdi</span>
                    <span className="user-role">UMKM Owner</span>
                  </div>
                </Link>

              </div>
            </div>
          </header>

          <div className="summary-grid">
            <SummaryCard title="Total Investment" value="Rp. 50.000.000" />
            <SummaryCard title="ROI Estimation" value="200%" />
            <SummaryCard title="Payback Period" value="8.2 Month" />
            <SummaryCard title="Annual Benefit" value="Rp. 12.000.000" />
          </div>

          <div className="charts-layout">
            <div className="chart-left">
              <ChartSection />
            </div>
            <div className="chart-right">
              <InsightBox />
            </div>
          </div>

          <div className="table-section">
            <AnalyticsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
