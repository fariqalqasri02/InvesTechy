import "./cta.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>
          Ready to Make Smarter{' '}
          <span>IT Investment Decisions?</span>
        </h2>
        
        <p className="cta-subtitle">
          Discover the potential of your investment — fast, simple, and data-driven.
        </p>

        <button className="btn-cta">
          Get Started &gt;
        </button>
      </div>
    </section>
  );
}