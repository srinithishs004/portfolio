import React from 'react';
import { certifications } from '../../data/portfolio';

export default function Certifications() {
  return (
    <section id="certifications" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">07</span>
          <h2 className="section-title">Certifications</h2>
        </div>

        <p data-reveal="up" style={{ maxWidth: '460px', color: '#6b6b6b', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '4rem' }}>
          Alongside academic and professional experience, I've completed certifications to strengthen my understanding of software engineering, application development, and modern practices.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {certifications.map((cert, i) => (
            <div
              key={i}
              data-reveal="up"
              data-delay={`${i * 0.08}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.25s, padding-left 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(255,255,255,0.02)';
                el.style.paddingLeft = '0.75rem';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'transparent';
                el.style.paddingLeft = '0';
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#2a2a2a' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>{cert.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a3a3a' }}>
                  {cert.issuer}
                </div>
              </div>
              <span style={{ fontSize: '1.25rem', opacity: 0.4 }}>{cert.icon || '📜'}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
