import { useState, useEffect, useRef } from "react";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const TESTIMONIALS = [
  { initials: "AK", text: "DSA handled our entire M&A process with extraordinary precision. Their due diligence uncovered risks we never would have found, saving us millions. Truly world-class corporate counsel.", name: "Anil Kumar", role: "CEO, TechVenture India" },
  { initials: "SM", text: "When we faced a complex regulatory challenge, DSA's team moved swiftly and strategically. Their depth of knowledge in compliance law is unmatched. We are loyal clients for life.", name: "Sunita Mehta", role: "CFO, Meridian Pharmaceuticals" },
  { initials: "RJ", text: "Our IP portfolio is our most valuable asset. DSA built a comprehensive protection strategy that has withstood multiple challenges. Their attorneys are razor-sharp and deeply strategic.", name: "Rohit Joshi", role: "Founder, InnovateTech Labs" },
  { initials: "PG", text: "I've worked with law firms across three continents, and DSA Corporate Solutions stands among the absolute best. Professional, responsive, and devastatingly effective in litigation.", name: "Pradeep Gupta", role: "MD, Global Holdings Group" },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const sliderRef = useRef(null);

  const isMobile = () => window.innerWidth <= 768;
  const totalSlides = () => (isMobile() ? TESTIMONIALS.length : 2);

  const updateSlider = (slide) => {
    if (!trackRef.current || !sliderRef.current) return;
    const sliderWidth = sliderRef.current.offsetWidth;
    if (isMobile()) {
      trackRef.current.style.transform = `translateX(-${slide * (sliderWidth + 32)}px)`;
    } else {
      trackRef.current.style.transform = `translateX(-${slide * (sliderWidth / 2 + 16) * 2}px)`;
    }
  };

  const goToSlide = (i) => { setCurrentSlide(i); updateSlider(i); };

  const slide = (dir) => {
    setCurrentSlide((prev) => {
      const next = (prev + dir + totalSlides()) % totalSlides();
      updateSlider(next);
      return next;
    });
  };

  useEffect(() => {
    autoRef.current = setInterval(() => slide(1), 5000);
    return () => clearInterval(autoRef.current);
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => { setCurrentSlide(0); updateSlider(0); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = isMobile() ? TESTIMONIALS.length : 2;

  return (
    <section id="testimonials">
      <div className="section-inner">
        <div className="testimonials-header">
          <div className="section-label reveal">Testimonials</div>
          <h2 className="section-title reveal reveal-delay-1">
            What Our <span className="gold">Clients</span> <span className="italic">Say</span>
          </h2>
        </div>

        <div className="testimonials-slider reveal reveal-delay-2" ref={sliderRef}>
          <div className="testimonials-track" ref={trackRef}>
            {TESTIMONIALS.map(({ initials, text, name, role }) => (
              <div className="testimonial-card" key={name}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <span className="star" key={i}><StarIcon /></span>
                  ))}
                </div>
                <p className="testimonial-text">"{text}"</p>
                <div className="testimonial-client">
                  <div className="client-avatar">{initials}</div>
                  <div>
                    <div className="client-name">{name}</div>
                    <div className="client-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-controls">
          <button className="slider-btn" onClick={() => slide(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
          </button>
          <div className="slider-dots">
            {Array.from({ length: slides }).map((_, i) => (
              <button key={i} className={`slider-dot${currentSlide === i ? " active" : ""}`} onClick={() => goToSlide(i)} />
            ))}
          </div>
          <button className="slider-btn" onClick={() => slide(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}