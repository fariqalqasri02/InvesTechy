import React from "react";

export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="summary-card">
      <div className="card-icon-bg">
        <img src={icon} alt={title} className="card-icon-img" />
      </div>
      <div className="card-details">
        <span className="card-title">{title}</span>
        <h3 className="card-value">{value}</h3>
      </div>
    </div>
  );
}