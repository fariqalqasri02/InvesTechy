import "./chart.css";

export default function ChartSection({ title, data = [], type = "user" }) {
  // Sumbu Y otomatis: Jika type="admin" pakai angka, jika "user" pakai IDR
  const yAxisLabels = type === "admin" 
    ? ["100", "80", "60", "40", "20", "0"]
    : ["IDR.50.000.000", "IDR.40.000.000", "IDR.30.000.000", "IDR.20.000.000", "IDR.10.000.000", "Rp. 0"];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="subtitle">Statistics</span>
        <h2 className="chart-title">{title}</h2>
      </div>

      <div className="chart-content">
        <div className="y-axis">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        <div className="chart-main">
          <div className="chart-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="grid-line"></div>)}
          </div>

          <div className="chart-bars">
            {/* Map data yang dikirim dari Dashboard masing-masing */}
            {data.map((item, i) => (
              <div key={i} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="x-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}