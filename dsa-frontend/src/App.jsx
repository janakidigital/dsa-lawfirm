import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import PracticeArea from "./components/PracticeArea";
import Attorneys from "./components/Attorneys";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import useScrollReveal from "./hooks/useScrollReveal";
import useCounter from "./hooks/useCounter";
import { LogoProvider } from "./LogoContext";
import "./styles/global.css";

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + "px"; cursor.style.top = mouseY + "px";
    };
    document.addEventListener("mousemove", onMove);
    let rafId;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();
    const expand = () => { cursor.classList.add("expanded"); ring.classList.add("expanded"); };
    const shrink = () => { cursor.classList.remove("expanded"); ring.classList.remove("expanded"); };
    const targets = document.querySelectorAll("a, button, .practice-card, .attorney-card");
    targets.forEach(el => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);
}

// ── Preloader ─────────────────────────────────────────────────────────────────
function Preloader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <div id="preloader">
      <img src="/logo.png" alt="DSA" className="preloader-logo" />
      <div className="preloader-bar" />
    </div>
  );
}

// ── Main Website ──────────────────────────────────────────────────────────────
function MainSite() {
  const [loading, setLoading] = useState(true);
  useScrollReveal();
  useCounter();
  useCursor();
  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <PracticeArea />
      <Attorneys />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

// ── Protected Route ───────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("dsa_admin_token");
  return token ? children : <Navigate to="/admin" replace />;
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LogoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </LogoProvider>
  );
}