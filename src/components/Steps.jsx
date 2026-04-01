import "./steps.css";

export default function Steps() {
  return (
    <section className="steps-section">
      <div className="steps-container">
        
        {/* Judul Utama */}
        <h2 className="steps-main-title">
          From Uncertainty to Clarity in <br />
          <span className="highlight">3 Simple Steps</span>
        </h2>

        <div className="steps-grid">
          {/* STEP 1 */}
          <div className="step-item">
            <div className="icon-card">
              <FaPen className="step-icon" />
            </div>
            <div className="step-content">
              <h3>Input Data</h3>
              <p>
                Enter your business profile, number of employees, revenue,
                and investment preferences.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="step-item">
            <div className="icon-card">
              <FaRocket className="step-icon" />
            </div>
            <div className="step-content">
              <h3>AI Process</h3>
              <p>
                Our AI engine analyzes your investment, estimating costs,
                benefits, ROI, and potential risks.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="step-item">
            <div className="icon-card">
              <FaLayers className="step-icon" />
            </div>
            <div className="step-content">
              <h3>Get Your Report</h3>
              <p>
                Receive a complete recommendation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}