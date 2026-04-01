import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-wrapper">

        {/* LEFT */}
        <div className="footer-left">
          <h2>InvesTechy</h2>
          <p>
            Turning complex IT investment analysis into simple, actionable insight
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">

          {/* LINKS */}
          <div className="footer-section">
            <h3>Links</h3>
            <a href="#">About Us</a>
            <a href="#">Our Services</a>
            <a href="#">How It Works</a>
          </div>

          {/* CONTACT */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📧 email@example.com</p>
            <p>📞 +62 812 3456 7890</p>
            <p>📍 Indonesia</p>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 InvesTechy. All rights reserved.</p>
      </div>
    </footer>
  );
}