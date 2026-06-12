import React from 'react';

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function WhyUs() {
  return (
    <section id="why">
      <div className="section-inner">
        <div className="why-grid">
          <div>
            <div className="section-label reveal">Why DSA</div>
            <h2 className="section-title reveal reveal-delay-1">
              The <span className="gold">Standard</span> of<br />
              <span className="italic">Corporate Excellence</span>
            </h2>
            <div className="why-features">
              <div className="why-feature reveal reveal-delay-1">
                <div className="why-num">01</div>
                <div className="why-content">
                  <div className="why-title">Proven Track Record</div>
                  <div className="why-desc">Over 500 successfully resolved corporate cases across diverse industries with a 98% client satisfaction rate.</div>
                </div>
                <div className="why-arrow"><ArrowIcon /></div>
              </div>
              <div className="why-feature reveal reveal-delay-2">
                <div className="why-num">02</div>
                <div className="why-content">
                  <div className="why-title">Industry-Specific Expertise</div>
                  <div className="why-desc">Deep specialization across technology, finance, real estate, healthcare, and manufacturing sectors.</div>
                </div>
                <div className="why-arrow"><ArrowIcon /></div>
              </div>
              <div className="why-feature reveal reveal-delay-3">
                <div className="why-num">03</div>
                <div className="why-content">
                  <div className="why-title">Bespoke Legal Strategy</div>
                  <div className="why-desc">Every client receives a fully customized legal strategy — never cookie-cutter solutions for complex problems.</div>
                </div>
                <div className="why-arrow"><ArrowIcon /></div>
              </div>
              <div className="why-feature reveal reveal-delay-4">
                <div className="why-num">04</div>
                <div className="why-content">
                  <div className="why-title">24/7 Client Support</div>
                  <div className="why-desc">Dedicated attorney availability for urgent corporate matters — because business doesn't wait for business hours.</div>
                </div>
                <div className="why-arrow"><ArrowIcon /></div>
              </div>
            </div>
          </div>
          <div className="why-right">
            <div className="why-quote-block reveal">
              <p className="why-quote">"DSA Corporate Solutions transformed how we approach legal challenges. Their strategic acumen and unwavering commitment to our interests set them apart from every firm we've worked with."</p>
              <div className="why-quote-author">— CEO, Fortune 500 Client</div>
            </div>
            <div className="why-metrics reveal reveal-delay-1">
              <div className="metric"><span className="metric-num">500+</span><span className="metric-label">Cases Resolved</span></div>
              <div className="metric"><span className="metric-num">98%</span><span className="metric-label">Win Rate</span></div>
              <div className="metric"><span className="metric-num">15+</span><span className="metric-label">Years Active</span></div>
              <div className="metric"><span className="metric-num">200+</span><span className="metric-label">Corporate Clients</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}