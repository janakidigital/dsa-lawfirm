function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-4h6v4" />
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      <path d="M12 5.36 8.87 8.5a2.13 2.13 0 0 0 0 3h0a2.13 2.13 0 0 0 3.02 0L12 11l.11-.5a2.13 2.13 0 0 0 3.02 0h0a2.13 2.13 0 0 0 0-3z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const PRACTICES = [
  { num: "01", Icon: BuildingIcon,  name: "Corporate Law",           desc: "Full-spectrum corporate legal services — governance, structure, bylaws, shareholder agreements, and board advisory." },
  { num: "02", Icon: HandshakeIcon, name: "Mergers & Acquisitions",  desc: "Expert M&A counsel from due diligence and deal structuring through negotiation, documentation, and seamless closing." },
  { num: "03", Icon: LightbulbIcon, name: "Intellectual Property",   desc: "Protect your innovations — trademark registration, patent filings, copyright enforcement, and IP litigation support." },
  { num: "04", Icon: ClipboardIcon, name: "Compliance & Regulatory", desc: "Navigating complex regulatory frameworks — securities law, financial compliance, and government regulatory affairs." },
  { num: "05", Icon: GavelIcon,     name: "Corporate Litigation",    desc: "Aggressive, strategic courtroom representation for commercial disputes, contract breaches, and corporate conflicts." },
  { num: "06", Icon: UsersIcon,     name: "Employment Law",          desc: "HR compliance, employment contracts, workplace investigations, and executive compensation structuring." },
];

export default function PracticeArea() {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="practice">
      <div className="section-inner">
        <div className="practice-header">
          <div className="section-label reveal">What We Do</div>
          <h2 className="section-title reveal reveal-delay-1">
            Our <span className="gold">Practice</span> <span className="italic">Areas</span>
          </h2>
          <p className="reveal reveal-delay-2" style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.7" }}>
            Comprehensive legal solutions across all facets of corporate law, tailored to your business needs.
          </p>
        </div>

        <div className="practice-grid">
          {PRACTICES.map(({ num, Icon, name, desc }, i) => (
            <div className={`practice-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ""}`} key={num}>
              <div className="practice-num">{num}</div>
              <div className="practice-icon"><Icon /></div>
              <div className="practice-name">{name}</div>
              <div className="practice-desc">{desc}</div>
              <a href="#contact" className="practice-link" onClick={handleClick}>Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}