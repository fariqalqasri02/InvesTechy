import "./chart.css";

export default function ChartSection({ data = [], type = "admin" }) {
  const yAxisLabels = type === "admin" 
    ? ["100", "80", "60", "40", "20", "0"]
    : ["IDR.50M", "IDR.40M", "IDR.30M", "IDR.20M", "IDR.10M", "0"];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="subtitle">Statistics</span>
      </div>

      <div className="chart-content">
        <div className="y-axis">
          {yAxisLabels.map((label, index) => <span key={index}>{label}</span>)}
        </div>

        <div className="chart-main">
          <div className="chart-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="grid-line"></div>)}
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