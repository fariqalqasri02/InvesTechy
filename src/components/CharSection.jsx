import "./chart.css";

export default function ChartSection() {
  // Data dummy (dalam juta agar sesuai format IDR)
  const chartData = [
    { label: "YEAR 1", value: 40 },
    { label: "YEAR 2", value: 60 },
    { label: "YEAR 3", value: 75 },
    { label: "YEAR 4", value: 85 },
    { label: "YEAR 5", value: 95 },
  ];

  const yAxisLabels = ["IDR.50.000.000", "IDR.40.000.000", "IDR.30.000.000", "IDR.20.000.000", "IDR.10.000.000", "Rp. 0"];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="subtitle">Statistics</span>
        <h2 className="chart-title">5 Year Benefit Projection</h2>
      </div>

      <div className="chart-content">
        {/* SUMBU Y (KIRI) */}
        <div className="y-axis">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        {/* AREA GRAFIK */}
        <div className="chart-main">
          {/* Garis-garis horizontal (Grid) */}
          <div className="chart-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="grid-line"></div>)}
          </div>

          {/* BATANG GRAFIK */}
          <div className="chart-bars">
            {chartData.map((item, i) => (
              <div key={i} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${item.value}%` }}
                ></div>
                {/* SUMBU X (BAWAH) */}
                <span className="x-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}