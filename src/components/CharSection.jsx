import "./chart.css";

export default function ChartSection({ data = [], type = "admin" }) {
  const maxValue = Math.max(...data.map((item) => item.rawValue ?? item.value ?? 0), 0);
  const axisTopValue = maxValue > 0 ? Math.ceil(maxValue / 5) * 5 : 5;
  const yAxisLabels = type === "admin"
    ? Array.from({ length: 6 }, (_, index) => {
        const step = 5 - index;
        return Math.round((axisTopValue * step) / 5).toString();
      })
    : ["IDR.50M", "IDR.40M", "IDR.30M", "IDR.20M", "IDR.10M", "0"];

  return (
    <div className={`chart-container ${type === "admin" ? "chart-container-admin" : ""}`}>
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

          <div className={`chart-bars ${type === "admin" ? "chart-bars-admin" : ""}`}>
            {data.map((item, i) => (
              <div key={i} className={`bar-wrapper ${type === "admin" ? "bar-wrapper-admin" : ""}`}>
                <div className={`bar ${type === "admin" ? "bar-admin" : ""}`} style={{ height: `${item.value}%` }}></div>
                <span className="x-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
