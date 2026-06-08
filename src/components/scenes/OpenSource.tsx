import React, { useRef, useState } from 'react';
import { openSourceContributions, profile } from '../../data/portfolio';
import gsap from 'gsap';

const PROJECT_ICONS: Record<string, string> = {
  'Paper Cups': '◈',
  'Penpot': '⬡',
  'Home Assistant': '◉',
  'n8n': '⬥',
};

function OSContributionCard({ proj, delay, icon }: { proj: typeof openSourceContributions[0]; delay: string; icon: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card spotlight-card"
      data-reveal="up"
      data-delay={delay}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : '#0a0a0a',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'background 0.25s',
        cursor: 'default',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span style={{ fontSize: '1.5rem', color: hovered ? '#f0f0f0' : '#3a3a3a', fontWeight: 300, lineHeight: 1, transition: 'color 0.25s' }}>
        {icon}
      </span>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-0.01em', color: hovered ? '#f0f0f0' : '#d0d0d0', transition: 'color 0.25s' }}>{proj.name}</h3>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: hovered ? '#8a8a8a' : '#3a3a3a',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '0.75rem',
        transition: 'color 0.25s',
      }}>
        {proj.focus}
      </span>
      <p style={{ color: hovered ? '#8a8a8a' : '#4a4a4a', fontSize: '0.82rem', lineHeight: 1.75, transition: 'color 0.25s' }}>{proj.description}</p>
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: hovered ? '#4a4a4a' : '#2a2a2a', marginBottom: '0.4rem', transition: 'color 0.25s' }}>
          Learned
        </span>
        <p style={{ color: hovered ? '#6b6b6b' : '#3a3a3a', fontSize: '0.78rem', lineHeight: 1.65, transition: 'color 0.25s' }}>{proj.learned}</p>
      </div>
    </div>
  );
}

export default function OpenSource() {
  return (
    <section id="opensource" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">04</span>
          <h2 className="section-title">Open Source</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
          {openSourceContributions.map((proj, i) => (
            <OSContributionCard
              key={i}
              proj={proj}
              delay={(i * 0.1).toString()}
              icon={PROJECT_ICONS[proj.name] || '◆'}
            />
          ))}
        </div>

        <div data-reveal="fade" style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href={`https://${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.85rem 2rem',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '4px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#6b6b6b',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              cursor: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#f0f0f0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#6b6b6b'; }}
          >
            GitHub Profile ↗
          </a>
        </div>

      </div>
    </section>
  );
}
