import React from 'react';
import { profile } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '5rem 3rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}>
              {profile.name}
            </div>
            <p style={{ color: '#3a3a3a', fontSize: '0.8rem' }}>{profile.currentRole}</p>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { label: 'Email', href: `mailto:${profile.email}` },
              { label: 'LinkedIn', href: `https://${profile.linkedin}` },
              { label: 'GitHub', href: `https://${profile.github}` },
              { label: 'Resume', href: profile.resumeUrl },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#3a3a3a',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3a3a3a')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2a2a2a' }}>
            © {new Date().getFullYear()} {profile.name} · All rights reserved
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2a2a2a' }}>
            {profile.location}
          </span>
        </div>

      </div>
    </footer>
  );
}
