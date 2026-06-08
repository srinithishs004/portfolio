import React, { useState, useRef } from 'react';
import { skillCategories, expertiseAreas } from '../../data/portfolio';
import gsap from 'gsap';

function ExpertiseCard({ title, description, delay }: { title: string; description: string; delay: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for spotlight
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3D tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 8; // max tilt 8 deg
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
        padding: '2.5rem 2rem',
        background: hovered ? 'rgba(255,255,255,0.04)' : '#0a0a0a',
        transition: 'background 0.25s ease',
        cursor: 'default',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{
        width: hovered ? '48px' : '28px',
        height: '1px',
        background: hovered ? '#f0f0f0' : 'rgba(255,255,255,0.2)',
        marginBottom: '1.25rem',
        transition: 'background 0.3s ease, width 0.3s ease',
      }} />
      <h3 style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        marginBottom: '0.75rem',
        color: hovered ? '#f0f0f0' : '#8a8a8a',
        transition: 'color 0.25s',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.8rem',
        color: hovered ? '#8a8a8a' : '#4a4a4a',
        lineHeight: 1.7,
        transition: 'color 0.25s',
      }}>
        {description}
      </p>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">02</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </div>

        {/* Expertise areas */}
        <div style={{ marginBottom: '6rem' }}>
          <span data-reveal="fade" className="section-label" style={{ display: 'block', marginBottom: '2rem' }}>Areas of Expertise</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {expertiseAreas.map((area, i) => (
              <ExpertiseCard
                key={i}
                title={area.title}
                description={area.description}
                delay={(i * 0.07).toString()}
              />
            ))}
          </div>
        </div>

        {/* Skills by category */}
        <div>
          <span data-reveal="fade" className="section-label" style={{ display: 'block', marginBottom: '2rem' }}>Tech Stack</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {skillCategories.map((cat, catIdx) => (
              <div
                key={catIdx}
                data-reveal="up"
                data-delay={(catIdx * 0.06).toString()}
                style={{
                  display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  alignItems: 'start',
                }}
              >
                <div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: '#3a3a3a',
                  }}>
                    {cat.category}
                  </span>
                </div>
                <div data-reveal="fade" data-stagger="0.03" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.items.map((item, ii) => (
                    <span key={ii} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
