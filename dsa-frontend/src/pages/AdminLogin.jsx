import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; //

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      localStorage.setItem("dsa_admin_token", data.token);
      localStorage.setItem("dsa_admin_user", data.admin.username);
      navigate("/admin/dashboard");
    } catch {
      setError("Cannot connect to server.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--dark)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-ui)" }}>
      <div style={{ width:"100%", maxWidth:"420px", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"40px" }}>
          <img src={logo} alt="DSA" style={{ width:"90px", height:"90px", borderRadius:"50%", objectFit:"contain", background:"#fff", padding:"8px", border:"2px solid var(--gold)" }} />
          <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", fontWeight:"700", color:"var(--gold)", letterSpacing:"3px", marginTop:"16px" }}>DSA ADMIN</div>
          <div style={{ fontSize:"12px", color:"var(--text-muted)", letterSpacing:"2px", textTransform:"uppercase", marginTop:"4px" }}>Corporate Solutions Dashboard</div>
        </div>
        <div style={{ background:"rgba(27,58,107,0.08)", border:"1px solid rgba(201,168,76,0.2)", padding:"40px 36px" }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--white)", marginBottom:"28px", textAlign:"center", letterSpacing:"1px" }}>Sign In</h2>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--gold)" }}>Username</label>
              <input type="text" placeholder="dsaadmin" value={form.username} onChange={e => setForm(p => ({...p, username: e.target.value}))} required style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,168,76,0.2)", color:"var(--cream)", padding:"12px 16px", fontFamily:"var(--font-ui)", fontSize:"14px", outline:"none", width:"100%", boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--gold)" }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} required style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,168,76,0.2)", color:"var(--cream)", padding:"12px 16px", fontFamily:"var(--font-ui)", fontSize:"14px", outline:"none", width:"100%", boxSizing:"border-box" }} />
            </div>
            {error && <div style={{ background:"rgba(220,53,69,0.1)", border:"1px solid rgba(220,53,69,0.3)", padding:"10px 14px", fontSize:"13px", color:"#ff6b6b" }}>⚠️ {error}</div>}
            <button type="submit" disabled={loading} style={{ background:"var(--gold)", color:"var(--navy)", border:"none", padding:"14px", fontFamily:"var(--font-ui)", fontSize:"11px", letterSpacing:"2.5px", textTransform:"uppercase", cursor: loading ? "wait" : "pointer", marginTop:"8px", fontWeight:"600" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>
        <div style={{ textAlign:"center", marginTop:"20px" }}>
          <a href="/" style={{ fontSize:"12px", color:"var(--text-muted)", textDecoration:"none", letterSpacing:"1px" }}>← Back to Website</a>
        </div>
      </div>
    </div>
  );
}