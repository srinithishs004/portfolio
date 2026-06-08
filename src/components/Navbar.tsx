import React, { useState, useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';
import gsap from 'gsap';

interface NavbarProps {
  scrollPct: number;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#case-studies' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrollPct }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial mount stagger reveal
    const ctx = gsap.context(() => {
      const elms = navRef.current?.querySelectorAll('.nav-anim-item');
      if (elms && elms.length > 0) {
        gsap.from(elms, {
          y: -15,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
        });
      }
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`navbar ${scrollPct > 0.01 ? 'scrolled' : ''}`}>
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="nav-anim-item"
        data-magnetic
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.12em',
          color: '#f0f0f0',
          textDecoration: 'none',
          textTransform: 'uppercase',
          cursor: 'none',
        }}
      >
        Sri Nithish
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        className="hidden-mobile">
        {NAV_LINKS.map(link => (
          <li key={link.href} className="nav-anim-item">
            <a
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              data-magnetic
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#6b6b6b',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b6b6b')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`mailto:${profile.email}`}
        className="hidden-mobile nav-anim-item"
        data-magnetic
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          background: '#f0f0f0',
          padding: '0.5rem 1.25rem',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Hire Me
      </a>

      {/* Mobile menu toggle */}
      <button
        className="show-mobile nav-anim-item"
        onClick={() => setMenuOpen(v => !v)}
        style={{ background: 'none', border: 'none', color: '#f0f0f0', cursor: 'none', fontSize: '1.25rem' }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
          zIndex: 200,
        }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#6b6b6b',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
