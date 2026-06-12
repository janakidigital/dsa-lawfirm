import logo from "../assets/logo.png";

function ScaleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 9l9-6 9 6M5 21h14M5 12l7 3 7-3" />
      <path d="M5 12V8l7-4 7 4v4" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4" />
      <path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="M6 3h12v8a6 6 0 0 1-12 0V3z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const VALUES = [
  { Icon: ScaleIcon,  title: "Integrity",  text: "Unwavering ethical standards in every case" },
  { Icon: TrophyIcon, title: "Excellence", text: "Award-winning legal representation" },
  { Icon: TargetIcon, title: "Strategy",   text: "Results-driven approach to every matter" },
  { Icon: ShieldIcon, title: "Protection", text: "Comprehensive corporate risk management" },
];

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-image-wrap reveal">
            <div className="about-img-placeholder">
              <img src={logo} alt="DSA Logo" className="about-logo-centered" />
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", opacity: 0.6 }}>
                Corporate Solutions Law Firm
              </div>
            </div>
            <div className="about-img-badge">
              <span className="badge-num">15+</span>
              <span className="badge-text">Years of Legal Excellence</span>
            </div>
          </div>

          <div className="about-text">
            <div className="section-label reveal">About DSA</div>
            <h2 className="section-title reveal reveal-delay-1">
              Where <span className="italic">Strategy</span> Meets
              <br />
              <span className="gold">Legal Mastery</span>
            </h2>
            <p className="about-desc reveal reveal-delay-2">
              <strong>DSA Corporate Solutions</strong> is a premier corporate law firm dedicated to providing exceptional legal counsel to businesses of all sizes. With over 15 years of industry experience, our seasoned attorneys combine deep legal knowledge with a strategic mindset to deliver outcomes that matter.
            </p>
            <p className="about-desc reveal reveal-delay-2">
              We are more than legal advisors — <strong>strategic partners</strong> committed to safeguarding your corporate interests, navigating complex regulatory landscapes, and ensuring long-term business success.
            </p>
            <div className="about-values reveal reveal-delay-3">
              {VALUES.map(({ Icon, title, text }) => (
                <div className="value-item" key={title}>
                  <div className="value-icon"><Icon /></div>
                  <div>
                    <div className="value-title">{title}</div>
                    <div className="value-text">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}