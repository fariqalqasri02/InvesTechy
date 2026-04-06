import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/CharSection";
import AnalyticsTable from "../components/AnalyticsTable";
import InsightBox from "../components/InsightBox";
import { generateAnalysis } from "../store/analysisThunk";
import "./dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.analysis);

  useEffect(() => {
    dispatch(generateAnalysis());

    // 🔥 RESET ANIMASI SETIAP MASUK HALAMAN
    document.body.classList.remove("page-exit");
  }, [dispatch]);

  return (
    <div className="dashboard-wrapper">
      
      {/* SIDEBAR */}
      <Sidebar activeMenu="Dashboard" />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="content-wrapper">
          
          {/* HEADER */}
          <header className="top-bar">
            <div className="welcome-message">
              <h1 className="text-2xl font-bold">
                Hello, Mas Rusdi 👋
              </h1>
              <p className="text-gray-500">
                Welcome back, We miss u coming
              </p>
            </div>

            <div className="top-bar-right">
              
              {/* SEARCH */}
              <div className="search-wrapper">
                <span>🔍</span>
                <input type="text" placeholder="Search for anything..." />
              </div>

              {/* PROFILE */}
              <div className="profile-info">
                <span className="notif">🔔</span>
                <div className="user-profile">
                  <img 
                    src="./assets/AkUnpad.png" 
                    alt="Avatar" 
                    className="avatar" 
                  />
                  <div className="user-detail">
                    <span className="user-name">Mas Rusdi</span>
                    <span className="user-role">UMKM Owner</span>
                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* SUMMARY */}
          <div className="summary-grid">
            <SummaryCard title="Total Investment" value="Rp. 50.000.000" />
            <SummaryCard title="ROI Estimation" value="200%" />
            <SummaryCard title="Payback Period" value="8.2 Month" />
            <SummaryCard title="Annual Benefit" value="Rp. 12.000.000" />
          </div>

          {/* CHART + INSIGHT */}
          <div className="charts-layout">
            <div className="chart-left">
              <ChartSection />
            </div>
            <div className="chart-right">
              <InsightBox />
            </div>
          </div>

          {/* TABLE */}
          <div className="table-section">
            <AnalyticsTable />
          </div>

        </div>
      </main>
    </div>
  );
}