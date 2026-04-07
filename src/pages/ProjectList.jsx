import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { fetchProjects } from "../store/projectThunk";
import "./projectList.css";

const normalizeStatus = (status = "") => status.replaceAll("_", " ");

export default function ProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const { projectList, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    document.body.classList.remove("page-exit");
    setAnimate(true);
    dispatch(fetchProjects());
  }, [dispatch]);

  const stats = useMemo(() => {
    const counts = {
      total: projectList.length,
      calculated: 0,
      waiting: 0,
      drafting: 0,
      error: 0,
    };

    projectList.forEach((project) => {
      if (project.status === "CALCULATED") counts.calculated += 1;
      if (project.status === "WAITING_USER_INPUT") counts.waiting += 1;
      if (project.status === "DRAFTING") counts.drafting += 1;
      if (project.status === "ERROR") counts.error += 1;
    });

    return counts;
  }, [projectList]);

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Project List" />

      <main className={`main-content ${animate ? "page-enter" : ""}`}>
        <div className="header">
          <div>
            <h1>Projects Portfolio</h1>
            <p>Manage and simulate your IT investment projects</p>
          </div>

          <div className="profile">JD</div>
        </div>

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

        <div className="project-header">
          <h2>Recent Projects</h2>
          <button className="btn-primary" onClick={() => navigate("/new-project")}>
            + New Project
          </button>
        </div>

        {loading && <p>Loading projects...</p>}
        {error && <p style={{ color: "#b42318" }}>{error}</p>}

        {!loading && !error && (
          <div className="project-grid">
            {projectList.length === 0 ? (
              <div className="project-card">
                <div className="card-top">
                  <div>
                    <p className="label">Project</p>
                    <h3>No projects yet</h3>
                  </div>
                </div>
                <div className="tag">Start by creating your first analysis</div>
              </div>
            ) : (
              projectList.map((item) => (
                <div className="project-card" key={item.id}>
                  <div className="card-top">
                    <div>
                      <p className="label">Project ID</p>
                      <h3>{item.id}</h3>
                    </div>

                    <span className="status waiting">{normalizeStatus(item.status)}</span>
                  </div>

                  <div className="tag">{item.industry}</div>

                  <div className="card-footer">
                    <div>
                      <p className="label">Created At</p>
                      <h4>{item.date}</h4>
                    </div>

                    <button className="btn-detail" disabled>
                      View Detail
                    </button>
                  </div>
                </div>
<<<<<<< HEAD
              ))
            )}
          </div>
        )}
=======

                <button className="btn-detail"onClick={() => navigate(`/edit-data/${item.id}`)}>
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>

>>>>>>> ec4629a4bb2a311dba967fcfef8669e3eab2eae9
      </main>
    </div>
  );
}
