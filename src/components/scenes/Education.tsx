import React from 'react';
import { education } from '../../data/portfolio';

export default function Education() {
  return (
    <section id="education" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">06</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          <div data-reveal="left">
            <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '1.25rem' }}>
              Academic Background
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                {education.institution}
              </h3>
              <p style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>{education.degree}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '2rem' }}>
              <div>
                <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.35rem' }}>Duration</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{education.duration}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.35rem' }}>CGPA</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{education.cgpa}</span>
              </div>
            </div>
            <p style={{ color: '#4a4a4a', fontSize: '0.82rem', lineHeight: 1.8 }}>{education.description}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div data-reveal="right" data-delay="0.1">
              <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '1.25rem' }}>
                Key Areas
              </span>
              <div data-reveal="fade" data-stagger="0.04" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {education.keyAreas.map((area, i) => (
                  <span key={i} className="skill-tag">{area}</span>
                ))}
              </div>
            </div>

            <div data-reveal="right" data-delay="0.2">
              <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '1.25rem' }}>
                Highlights
              </span>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {education.highlights.map((hl, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '0.85rem',
                    color: '#4a4a4a', fontSize: '0.82rem', lineHeight: 1.65,
                    padding: '0.6rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <span style={{ flexShrink: 0 }}>—</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
