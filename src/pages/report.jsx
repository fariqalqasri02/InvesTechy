import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { fetchProjects } from "../store/projectThunk";
import "../components/report.css";

const getLatestSimulation = (simulationHistory = []) => {
  if (!Array.isArray(simulationHistory) || simulationHistory.length === 0) {
    return null;
  }

  return [...simulationHistory].sort((a, b) => {
    const dateA = new Date(a?.calculatedAt || 0).getTime();
    const dateB = new Date(b?.calculatedAt || 0).getTime();
    return dateB - dateA;
  })[0];
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatPercent = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "-";
  return `${amount.toFixed(2)}%`;
};

const mapReportItem = (project) => {
  const latestSimulation = getLatestSimulation(project?.simulationHistory);
  const financialResults = latestSimulation?.financialResults || {};

  return {
    id: project?._id || project?.id,
    name:
      project?.businessName ||
      project?.projectName ||
      project?.industry ||
      project?.name ||
      "Untitled Project",
    date: latestSimulation?.calculatedAt || project?.updatedAt || project?.createdAt,
    roi: financialResults?.roi,
    status: financialResults?.feasibilityStatus || project?.status || "Unknown",
  };
};

const Report = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortType, setSortType] = useState("newest");
  const { projectList, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const reports = useMemo(() => {
    return projectList
      .filter((project) => Array.isArray(project?.simulationHistory) && project.simulationHistory.length > 0)
      .map(mapReportItem);
  }, [projectList]);

  const statusOptions = useMemo(() => {
    return [...new Set(reports.map((item) => item.status).filter(Boolean))];
  }, [reports]);

  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (filterStatus) {
      result = result.filter((item) => item.status === filterStatus);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return sortType === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [reports, filterStatus, sortType]);

  return (
    <div className="report-container">
      <Sidebar activeMenu="Report List" />

      <main className={`report-content ${isLoaded ? "page-fade-in" : ""}`}>
        <h1 className="report-title">Report List</h1>

        <div className="report-filters">
          <div className="custom-dropdown">
            <button
              className={`dropdown-btn ${isOrderOpen ? "active" : ""}`}
              onClick={() => {
                setIsOrderOpen(!isOrderOpen);
                setIsStatusOpen(false);
              }}
            >
              Order by
              <span className="arrow-icon-visible"></span>
            </button>

            {isOrderOpen && (
              <div className="dropdown-content border-style dropdown-animate">
                <div
                  className={`menu-item ${sortType === "newest" ? "selected" : ""}`}
                  onClick={() => {
                    setSortType("newest");
                    setIsOrderOpen(false);
                  }}
                >
                  Newest
                </div>
                <div
                  className={`menu-item ${sortType === "oldest" ? "selected" : ""}`}
                  onClick={() => {
                    setSortType("oldest");
                    setIsOrderOpen(false);
                  }}
                >
                  Oldest
                </div>
              </div>
            )}
          </div>

          <div className="custom-dropdown">
            <button
              className={`dropdown-btn ${isStatusOpen ? "active" : ""}`}
              onClick={() => {
                setIsStatusOpen(!isStatusOpen);
                setIsOrderOpen(false);
              }}
            >
              {filterStatus || "Status"}
              <span className="arrow-icon-visible"></span>
            </button>

            {isStatusOpen && (
              <div className="dropdown-content border-style dropdown-animate">
                <div
                  className="menu-item"
                  onClick={() => {
                    setFilterStatus("");
                    setIsStatusOpen(false);
                  }}
                >
                  All Status
                </div>
                {statusOptions.map((status) => (
                  <div
                    key={status}
                    className={`menu-item ${filterStatus === status ? "selected" : ""}`}
                    onClick={() => {
                      setFilterStatus(status);
                      setIsStatusOpen(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="report-card">
          <h2 className="card-subtitle">History</h2>

          {loading && <p>Loading reports...</p>}
          {error && <p style={{ color: "#b42318" }}>{error}</p>}

          {!loading && !error && (
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th className="text-left">Business Name</th>
                    <th>Date</th>
                    <th>ROI</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="5">No calculated reports available yet.</td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="row-animate">
                        <td className="report-name-cell">{report.name}</td>
                        <td className="report-date-cell">{formatDate(report.date)}</td>
                        <td>
                          <span className="roi-tag">{formatPercent(report.roi)}</span>
                        </td>
                        <td>
                          <span
                            className={`status-badge ${String(report.status)
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="action-cell">
                          <button
                            className="btn-open"
                            onClick={() => navigate(`/report-list/${report.id}`)}
                          >
                            Open
                          </button>
                          <span className="v-divider">|</span>
                          <button className="btn-delete-text" type="button">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Report;
