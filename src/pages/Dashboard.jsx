import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaChartLine,
  FaCoins,
  FaMoneyBillWave,
  FaSearch,
} from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import Sidebar from "../components/sidebar";
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/CharSection";
import AnalyticsTable from "../components/AnalyticsTable";
import InsightBox from "../components/InsightBox";
import avatarImg from "../assets/AkUnpad.png";
import { useAppSettings } from "../context/AppSettingsContext";
import "./dashboard.css";

export default function Dashboard() {
  const { t } = useAppSettings();
  const statisticsData = [
    { label: "JAN", value: 42 },
    { label: "FEB", value: 58 },
    { label: "MAR", value: 64 },
    { label: "APR", value: 71 },
    { label: "MAY", value: 79 },
    { label: "JUN", value: 86 },
  ];

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
              <h1 className="text-2xl font-bold">{t("dashboardGreeting")}</h1>
              <p className="text-gray-500">{t("dashboardWelcome")}</p>
            </div>

            <div className="top-bar-right">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input type="text" placeholder={t("dashboardSearch")} />
              </div>

              <div className="profile-info">
                <span className="notif">
                  <FaBell />
                </span>

                <Link
                  to="/profile"
                  className="user-profile"
                  style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  <img src={avatarImg} alt="Avatar" className="avatar" />
                  <div className="user-detail">
                    <span className="user-name">Mas Rusdi</span>
                    <span className="user-role">UMKM OWNER</span>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <div className="summary-grid">
            <SummaryCard
              title={t("totalInvestment")}
              value="Rp. 50.000.000"
              icon={<FaMoneyBillWave />}
            />
            <SummaryCard
              title={t("roiEstimation")}
              value="200%"
              icon={<FaChartLine />}
            />
            <SummaryCard
              title={t("paybackPeriod")}
              value="8.2 Month"
              icon={<FaCoins />}
            />
            <SummaryCard
              title={t("annualBenefit")}
              value="Rp. 12.000.000"
              icon={<LuBadgeDollarSign />}
            />
          </div>

          <div className="charts-layout">
            <div className="chart-left">
              <ChartSection data={statisticsData} type="user" />
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
