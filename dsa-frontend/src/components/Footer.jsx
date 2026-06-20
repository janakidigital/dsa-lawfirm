import logo from "../assets/logo.png";
 
const PRACTICE_LINKS = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Compliance",
  "Litigation",
  "Employment Law",
];
 
const QUICK_LINKS = [
  { label: "About DSA", href: "#about" },
  { label: "Our Attorneys", href: "#attorneys" },
  { label: "Client Stories", href: "#testimonials" },
  { label: "News & Insights", href: "#" },
  { label: "Client Portal", href: "#" },
  { label: "Contact Us", href: "#contact" },
];
 
const CONTACT_LINKS = [
  { label: "Kathmandu Office", href: "#" },
  { label: "+977 9700227418", href: "tel:+9779700227418" },
  { label: "janakidigitalsolutions@gmail.com", href: "mailto:janakidigitalsolutions@gmail.com" },
  { label: "Mon–Fri: 9AM – 6PM", href: "#" },
];
 
const SOCIALS = [
  { label: "in", href: "#" },
  { label: "tw", href: "#" },
  { label: "fb", href: "#" },
  { label: "yt", href: "#" },
];
 
export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href === "#") return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <footer>
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="DSA Logo" />
          </div>
          <p className="footer-desc">
            DSA Corporate Solutions — Premier corporate legal counsel delivering
            excellence, strategy, and unwavering results since 2010.
          </p>
          <div className="footer-social">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} className="social-btn">
                {label}
              </a>
            ))}
          </div>
        </div>
 
        {/* Practice Areas */}
        <div className="footer-col">
          <div className="footer-col-title">Practice Areas</div>
          <div className="footer-links">
            {PRACTICE_LINKS.map((item) => (
              <a href="#practice" key={item} onClick={(e) => handleNavClick(e, "#practice")}>
                {item}
              </a>
            ))}
          </div>
        </div>
 
        {/* Quick Links */}
        <div className="footer-col">
          <div className="footer-col-title">Quick Links</div>
          <div className="footer-links">
            {QUICK_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            ))}
          </div>
        </div>
 
        {/* Contact */}
        <div className="footer-col">
          <div className="footer-col-title">Contact</div>
          <div className="footer-links">
            {CONTACT_LINKS.map(({ label, href }) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copy">
          © 2025 <span>DSA Corporate Solutions</span>. All rights reserved.
          Developed by{" "}
          <span>Janaki Digital Solutions Pvt. Ltd.</span>
        </div>
        <div className="footer-copy">
          Privacy Policy · Terms of Service · Disclaimer ·{" "}
          <a href="/admin" style={{ opacity: 0.4, fontSize: "11px", color: "inherit", textDecoration: "none" }}>
             Admin
          </a>
        </div>
      </div>
    </footer>
  );
}