import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Attorneys() {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/public/attorneys`)
      .then(res => res.json())
      .then(data => {
        setAttorneys(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return (
    <section id="attorneys">
      <div className="section-inner">
        <div style={{ textAlign: "center", padding: "80px", color: "var(--text-muted)" }}>Loading...</div>
      </div>
    </section>
  );

  return (
    <section id="attorneys">
      <div className="section-inner">
        <div className="attorneys-header">
          <div>
            <div className="section-label">Our Team</div>
            <h2 className="section-title">
              Meet Our <span className="gold">Distinguished</span>
              <br />
              <span className="italic">Attorneys</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline" >
            View All Attorneys
          </a>
        </div>
        <div className="attorneys-grid">
          {attorneys.map(({ _id, image, role, name, spec }, i) => (
            <div className="attorney-card" key={_id}>
              <div className="attorney-img">
                {image ? (
                  <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
                    ?????
                  </div>
                )}
                <div className="attorney-img-overlay" />
                <div className="attorney-hover-line" />
                <div className="attorney-info">
                  <div className="attorney-role">{role}</div>
                  <div className="attorney-name">{name}</div>
                  <div className="attorney-spec">{spec}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
