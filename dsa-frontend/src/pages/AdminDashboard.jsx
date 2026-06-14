import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AttorneysTab from "../components/admin/AttorneysTab";
import PracticeAreasTab from "../components/admin/PracticeAreasTab";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("attorneys");
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dsa_admin_token");
    const user = localStorage.getItem("dsa_admin_user");
    if (!token) { navigate("/admin"); return; }
    setAdmin(user);
    fetch(`${API_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => { if (!r.ok) handleLogout(); });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dsa_admin_token");
    localStorage.removeItem("dsa_admin_user");
    navigate("/admin");
  };

  const tabs = [
    { id: "attorneys", label: "Attorneys" },
    { id: "practice", label: "Practice Areas" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--dark)", fontFamily:"var(--font-ui)" }}>

      {/* Navbar */}
      <nav style={{ background:"rgba(8,14,32,0.98)", borderBottom:"1px solid rgba(201,168,76,0.15)", padding:"0 32px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <img src={logo} alt="DSA" style={{ width:"40px", height:"40px", borderRadius:"50%", objectFit:"contain", background:"#fff", padding:"3px" }} />
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"14px", fontWeight:"700", color:"var(--gold)", letterSpacing:"2px" }}>DSA ADMIN</div>
            <div style={{ fontSize:"10px", color:"var(--text-muted)", letterSpacing:"1.5px" }}>DASHBOARD</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <span style={{ fontSize:"12px", color:"var(--text-muted)" }}>👤 {admin}</span>
          <a href="/" target="_blank" style={{ fontSize:"11px", color:"var(--gold)", letterSpacing:"1px", textDecoration:"none" }}>View Site ↗</a>
          <button onClick={handleLogout} style={{ background:"transparent", border:"1px solid rgba(201,168,76,0.3)", color:"var(--gold)", padding:"6px 16px", fontFamily:"var(--font-ui)", fontSize:"11px", letterSpacing:"1px", cursor:"pointer" }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ marginBottom:"32px" }}>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"28px", fontWeight:"700", color:"var(--white)", margin:"0 0 6px" }}>Website Management</h1>
          <p style={{ fontSize:"13px", color:"var(--text-muted)", margin:0 }}>Update attorney profiles and practice areas shown on the DSA website.</p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"0", borderBottom:"1px solid rgba(201,168,76,0.15)", marginBottom:"32px" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background:"transparent", border:"none",
              borderBottom: activeTab === tab.id ? "2px solid var(--gold)" : "2px solid transparent",
              color: activeTab === tab.id ? "var(--gold)" : "var(--text-muted)",
              padding:"12px 28px", fontFamily:"var(--font-ui)", fontSize:"12px",
              letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer",
              transition:"all .2s", marginBottom:"-1px",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "attorneys" && <AttorneysTab />}
        {activeTab === "practice" && <PracticeAreasTab />}
      </div>
    </div>
  );
}