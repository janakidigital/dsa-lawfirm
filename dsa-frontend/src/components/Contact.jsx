import { useState } from "react";
import { MapPinIcon, PhoneIcon, MailIcon } from "./icons";

const PRACTICE_OPTIONS = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Compliance & Regulatory",
  "Corporate Litigation",
  "Employment Law",
];

const CONTACT_ITEMS = [
  { Icon: MapPinIcon, label: "Office Address", value: "Tripureshwor, Kathmandu 44600, Nepal" },
  { Icon: PhoneIcon,  label: "Phone",          value: "+977 9700227418" },
  { Icon: MailIcon,   label: "Email",           value: "dsacorporatesolutions@gmail.com" },
];

const INITIAL_FORM = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", practiceArea: "", message: "",
};

// ── API URL — change this when you deploy ─────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show validation errors from backend
        if (data.errors) {
          setErrorMsg(data.errors.map((e) => e.message).join(", "));
        } else {
          setErrorMsg(data.message || "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(INITIAL_FORM);

      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (err) {
      setErrorMsg("Cannot connect to server. Please try again later.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact">
      <div className="section-inner">
        <div className="contact-grid">

          {/* Left — Info */}
          <div>
            <div className="section-label reveal">Get In Touch</div>
            <h2 className="section-title reveal reveal-delay-1">
              Schedule Your<br />
              <span className="gold">Free</span> <span className="italic">Consultation</span>
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "48px" }}>
              Take the first step towards securing your corporate future. Our attorneys are ready to assess your legal needs and provide strategic counsel.
            </p>

            <div className="contact-info">
              {CONTACT_ITEMS.map(({ Icon, label, value }, i) => (
                <div className={`contact-item reveal reveal-delay-${i + 2}`} key={label}>
                  <div className="contact-icon-wrap">
                    <Icon size={22} color="var(--gold)" />
                  </div>
                  <div>
                    <div className="contact-item-label">{label}</div>
                    <div className="contact-item-value" style={{ whiteSpace: "pre-line" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" placeholder="John"
                  value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" placeholder="Doe"
                  value={form.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="john@company.com"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+977 9800000000"
                  value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input id="company" name="company" type="text" placeholder="Your Company Ltd."
                value={form.company} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="practiceArea">Practice Area</label>
              <select id="practiceArea" name="practiceArea"
                value={form.practiceArea} onChange={handleChange}>
                <option value="">Select a practice area...</option>
                {PRACTICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Brief Description of Your Matter</label>
              <textarea id="message" name="message"
                placeholder="Please describe your legal needs..."
                value={form.message} onChange={handleChange} rows={5} />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div style={{ background: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", padding: "12px 16px", fontFamily: "var(--font-ui)", fontSize: "13px", color: "#ff6b6b" }}>
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", border: "none", cursor: status === "loading" ? "wait" : "pointer", fontSize: "12px" }}
              disabled={status === "loading" || status === "success"}
            >
              {status === "success" && <span>✓ Request Sent — We'll Contact You Within 24 Hours</span>}
              {status === "loading" && <span>Sending...</span>}
              {(status === "idle" || status === "error") && (
                <><span>Request Free Consultation</span><span>→</span></>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
