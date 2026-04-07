import "./summaryCard.css";

export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="card">
      <div className="card-header-flex">
        {icon && <span className="card-icon">{icon}</span>}
        <p className="card-title">{title}</p>
      </div>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}