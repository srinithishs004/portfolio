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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; email: string }>({ isOpen: false, email: '' });

  useGsapReveal();
  useScrollVelocitySkew();

  // Show a custom global toast alert
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Globally intercept mailto: links to show custom email options modal
  useEffect(() => {
    const handleMailtoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // If it's a mailto link and NOT inside our modal (to allow the modal button to launch default client)
      if (anchor && anchor.href && anchor.href.startsWith('mailto:') && !anchor.classList.contains('modal-mailto-link')) {
        e.preventDefault();
        const email = anchor.href.replace('mailto:', '');
        setEmailModal({ isOpen: true, email });
      }
    };

    document.addEventListener('click', handleMailtoClick);
    return () => document.removeEventListener('click', handleMailtoClick);
  }, []);

  const btnStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f0f0f0',
    padding: '0.85rem 1rem',
    borderRadius: '4px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s',
  };

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

      {/* Custom Email Options Modal */}
      {emailModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            animation: 'toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          onClick={() => setEmailModal({ isOpen: false, email: '' })}
        >
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '2.5rem',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 32px 64px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()} // Prevent close on interior click
          >
            {/* Header */}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#6b6b6b',
                  marginBottom: '0.5rem',
                }}
              >
                Contact Sri Nithish S.
              </span>
              <p style={{ color: '#8a8a8a', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                Select your preferred application to send an email:
              </p>
            </div>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              {/* Gmail (Web) */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailModal.email}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEmailModal({ isOpen: false, email: '' })}
                style={btnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                Send via Gmail (Web)
              </a>

              {/* Outlook (Web) */}
              <a
                href={`https://outlook.live.com/default.aspx?rru=compose&to=${emailModal.email}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEmailModal({ isOpen: false, email: '' })}
                style={btnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                Send via Outlook (Web)
              </a>

              {/* Default Mail App (triggers standard mailto:) */}
              <a
                href={`mailto:${emailModal.email}`}
                className="modal-mailto-link"
                onClick={() => setEmailModal({ isOpen: false, email: '' })}
                style={btnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                Open Mail App (Outlook/Mail)
              </a>

              {/* Copy to Clipboard */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(emailModal.email)
                    .then(() => {
                      showToast('Email address copied to clipboard!', 'success');
                    });
                  setEmailModal({ isOpen: false, email: '' });
                }}
                style={{
                  ...btnStyle,
                  background: '#f0f0f0',
                  color: '#0a0a0a',
                  border: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Copy to Clipboard
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setEmailModal({ isOpen: false, email: '' })}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b6b6b',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                marginTop: '0.5rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b6b6b')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom Global Floating Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: '#0d0d0d',
            border: toast.type === 'error' ? '1px solid rgba(255, 77, 77, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem 2rem',
            borderRadius: '6px',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            animation: 'toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            willChange: 'transform, opacity',
            maxWidth: '360px',
          }}
        >
          {/* Status blip indicator */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: toast.type === 'error' ? '#ff4d4d' : '#f0f0f0',
              animation: 'blink 1.5s infinite',
            }}
          />
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: toast.type === 'error' ? '#ff4d4d' : '#6b6b6b',
                marginBottom: '0.2rem',
              }}
            >
              {toast.type === 'error' ? 'System Error' : 'System Alert'}
            </span>
            <p style={{ color: '#f0f0f0', fontSize: '0.8rem', lineHeight: 1.5, margin: 0, letterSpacing: '-0.01em' }}>
              {toast.message}
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={() => setToast(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a4a4a',
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: '0.2rem',
              marginLeft: 'auto',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a4a4a')}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
