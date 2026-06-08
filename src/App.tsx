import React, { useEffect, useState } from 'react';
import { useGsapReveal } from './hooks/useGsapReveal';
import { useScrollVelocitySkew } from './hooks/useScrollVelocitySkew';
import Navbar from './components/Navbar';
import Hero from './components/scenes/Hero';
import About from './components/scenes/About';
import Skills from './components/scenes/Skills';
import CaseStudies from './components/scenes/CaseStudies';
import OpenSource from './components/scenes/OpenSource';
import Leadership from './components/scenes/Leadership';
import Education from './components/scenes/Education';
import Certifications from './components/scenes/Certifications';
import Contact from './components/scenes/Contact';
import Footer from './components/scenes/Footer';
import CursorTracker from './components/shared/CursorTracker';

export default function App() {
  const [scrollPct, setScrollPct] = useState(0);

  useGsapReveal();
  useScrollVelocitySkew();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="grain-overlay" style={{ background: '#0a0a0a', color: '#f0f0f0', minHeight: '100vh' }}>
      {/* Custom magnetic cursor */}
      <CursorTracker />

      {/* Reading progress */}
      <div
        className="reading-bar"
        style={{ transform: `scaleX(${scrollPct})` }}
      />

      <Navbar scrollPct={scrollPct} />

      <main>
        {/* Hero is pinned, do not skew */}
        <Hero />
        
        {/* Non-pinned sections are skewed */}
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <About />
        </div>
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <Skills />
        </div>
        
        {/* Case studies is pinned, do not skew */}
        <CaseStudies />
        
        {/* Non-pinned sections are skewed */}
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <OpenSource />
        </div>
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <Leadership />
        </div>
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <Education />
        </div>
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <Certifications />
        </div>
        <div className="skew-target" style={{ willChange: 'transform' }}>
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
