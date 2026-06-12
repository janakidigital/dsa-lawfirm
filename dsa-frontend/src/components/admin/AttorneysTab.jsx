import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const token = () => localStorage.getItem("dsa_admin_token");

const EMPTY = { name: "", role: "", spec: "", order: 0, active: true };
const cardStyle = { background:"rgba(27,58,107,0.08)", border:"1px solid rgba(201,168,76,0.12)", padding:"24px", marginBottom:"12px" };
const inputStyle = { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,168,76,0.2)", color:"var(--cream)", padding:"10px 14px", fontFamily:"var(--font-ui)", fontSize:"13px", outline:"none", width:"100%", boxSizing:"border-box" };
const labelStyle = { fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--gold)", display:"block", marginBottom:"5px" };
const btnPrimary = { background:"var(--gold)", color:"var(--navy)", border:"none", padding:"10px 22px", fontFamily:"var(--font-ui)", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer", fontWeight:"600" };
const btnOutline = { background:"transparent", color:"var(--gold)", border:"1px solid rgba(201,168,76,0.4)", padding:"8px 18px", fontFamily:"var(--font-ui)", fontSize:"11px", letterSpacing:"1px", cursor:"pointer" };
const btnDanger = { background:"transparent", color:"#ff6b6b", border:"1px solid rgba(220,53,69,0.3)", padding:"8px 16px", fontFamily:"var(--font-ui)", fontSize:"11px", cursor:"pointer" };

export default function AttorneysTab() {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/admin/attorneys`, {
      headers: { Authorization: `Bearer ${token()}` }
    });
    const data = await res.json();
    setAttorneys(data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditItem(null); setShowForm(true); setMsg(""); };
  const openEdit = (item) => { setForm({ name:item.name, role:item.role, spec:item.spec, order:item.order, active:item.active }); setEditItem(item._id); setShowForm(true); setMsg(""); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editItem ? `${API_URL}/api/admin/attorneys/${editItem}` : `${API_URL}/api/admin/attorneys`;
    const method = editItem ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type":"application/json", Authorization:`Bearer ${token()}` }, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (res.ok) { setMsg("✓ Saved!"); fetchAll(); setTimeout(() => { setShowForm(false); setMsg(""); }, 1200); }
    else setMsg("⚠️ " + data.message);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await fetch(`${API_URL}/api/admin/attorneys/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token()}` } });
    fetchAll();
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
        <div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--white)", margin:0 }}>Attorney Profiles</h2>
          <p style={{ fontSize:"12px", color:"var(--text-muted)", margin:"4px 0 0" }}>{attorneys.length} attorneys</p>
        </div>
        <button style={btnPrimary} onClick={openAdd}>+ Add Attorney</button>
      </div>

      {showForm && (
        <div style={{ ...cardStyle, border:"1px solid rgba(201,168,76,0.35)", marginBottom:"28px" }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"16px", color:"var(--gold)", margin:"0 0 20px" }}>
            {editItem ? "Edit Attorney" : "Add New Attorney"}
          </h3>
          <form onSubmit={handleSave}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
              <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm(p => ({...p, name:e.target.value}))} placeholder="Rajesh Sharma" required /></div>
              <div><label style={labelStyle}>Role / Title *</label><input style={inputStyle} value={form.role} onChange={e => setForm(p => ({...p, role:e.target.value}))} placeholder="Senior Partner" required /></div>
            </div>
            <div style={{ marginBottom:"16px" }}>
              <label style={labelStyle}>Specialization *</label>
              <input style={inputStyle} value={form.spec} onChange={e => setForm(p => ({...p, spec:e.target.value}))} placeholder="Corporate Law · M&A · 20 Years" required />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
              <div><label style={labelStyle}>Display Order</label><input style={inputStyle} type="number" value={form.order} onChange={e => setForm(p => ({...p, order:Number(e.target.value)}))} /></div>
              <div style={{ display:"flex", alignItems:"flex-end", paddingBottom:"2px" }}>
                <label style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer", fontSize:"12px", color:"var(--text-muted)" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(p => ({...p, active:e.target.checked}))} />
                  Show on website
                </label>
              </div>
            </div>
            {msg && <div style={{ marginBottom:"12px", fontSize:"13px", color: msg.startsWith("✓") ? "var(--gold)" : "#ff6b6b" }}>{msg}</div>}
            <div style={{ display:"flex", gap:"12px" }}>
              <button type="submit" style={btnPrimary} disabled={saving}>{saving ? "Saving..." : editItem ? "Update Attorney" : "Add Attorney"}</button>
              <button type="button" style={btnOutline} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign:"center", padding:"40px", color:"var(--text-muted)", fontSize:"13px" }}>Loading...</div>
      ) : attorneys.length === 0 ? (
        <div style={{ ...cardStyle, textAlign:"center", padding:"48px" }}>
          <div style={{ fontSize:"32px", marginBottom:"12px" }}>👨‍⚖️</div>
          <div style={{ fontSize:"14px", color:"var(--text-muted)" }}>No attorneys yet. Click "Add Attorney" to get started.</div>
        </div>
      ) : (
        attorneys.map(a => (
          <div key={a._id} style={{ ...cardStyle, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"16px", flex:1 }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>👨‍⚖️</div>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"16px", color:"var(--white)", fontWeight:"600" }}>{a.name}</div>
                <div style={{ fontSize:"11px", color:"var(--gold)", letterSpacing:"1px", textTransform:"uppercase", marginTop:"2px" }}>{a.role}</div>
                <div style={{ fontSize:"12px", color:"var(--text-muted)", marginTop:"3px" }}>{a.spec}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
              {!a.active && <span style={{ fontSize:"10px", color:"var(--text-muted)", border:"1px solid rgba(255,255,255,0.1)", padding:"2px 8px" }}>HIDDEN</span>}
              <button style={btnOutline} onClick={() => openEdit(a)}>Edit</button>
              <button style={btnDanger} onClick={() => handleDelete(a._id, a.name)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}