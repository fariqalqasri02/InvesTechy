import { FaPen, FaRocket, FaFileAlt } from "react-icons/fa";
import "./steps.css";

export default function Steps() {
  return (
    <section className="steps container">

      <p className="steps-subtitle">
        From uncertainty to clarity in
      </p>

      <h2>3 Simple Steps</h2>

      
      <div className="steps-grid">

        {/* STEP 1 */}
        <div className="step-item">
          <div className="step-card">
            <span className="icon">✏️</span>
          </div>
          <h3>Input Data</h3>
          <p>
            Enter your business profile, number of employees, revenue,
            and investment preferences.
          </p>
        </div>

        
        <div className="step-item">
          <div className="step-card">
            <span className="icon">🚀</span>
          </div>
          <h3>AI Process</h3>
          <p>
            Our AI engine analyzes your investment, estimating costs,
            benefits, ROI, and potential risks.
          </p>
        </div>

      
        <div className="step-item">
          <div className="step-card">
            <span className="icon">📄</span>
          </div>
          <h3>Get Your Report</h3>
          <p>
            Receive a complete recommendation.
          </p>
        </div>

      </div>
    </section>
  );
}