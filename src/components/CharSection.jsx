import "./chart.css";

export default function ChartSection({
  data = [],
  type = "admin",
  subtitle = "Statistics",
  title = "",
  yAxisLabels,
  compact = false,
}) {
  const defaultYAxisLabels = type === "admin"
    ? ["100", "80", "60", "40", "20", "0"]
    : ["60", "50", "40", "30", "20", "0"];
  const labels = yAxisLabels || defaultYAxisLabels;

  return (
    <div className={`chart-container ${compact ? "compact" : ""}`}>
      <div className="chart-header">
        <span className="subtitle">{subtitle}</span>
        {title ? <h3 className="chart-title">{title}</h3> : null}
      </div>

      <div className="chart-content">
        <div className="y-axis">
          {labels.map((label, index) => <span key={index}>{label}</span>)}
        </div>

        <div className="chart-main">
          <div className="chart-grid">
            {[...Array(labels.length)].map((_, i) => <div key={i} className="grid-line"></div>)}
          </div>

          <div className="chart-bars">
            {data.map((item, i) => (
              <div key={i} className="bar-wrapper">
                <div className="bar" style={{ height: `${item.value}%` }}></div>
                <span className="x-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
