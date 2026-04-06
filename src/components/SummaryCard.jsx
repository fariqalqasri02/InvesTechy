import "./summaryCard.css";

export default function SummaryCard({ title, value }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}