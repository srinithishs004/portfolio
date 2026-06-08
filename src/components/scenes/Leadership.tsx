import React, { useEffect, useRef, useState } from 'react';
import { leadershipRoles, leadershipPhilosophy, achievements, impactCounters } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimCounter({ value, label }: { value: string; label: string }) {
  const num = parseInt(value) || 0;
  const hasPlus = value.includes('+');
  const [display, setDisplay] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: num,
      duration: 1.6,
      ease: 'elastic.out(1, 0.4)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        setDisplay(Math.round(obj.val));
      }
    });

    return () => {
      tween.kill();
    };
  }, [num]);

  return (
    <div ref={containerRef} data-reveal="up" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
      <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>
        {display}{hasPlus && <span style={{ fontSize: '0.6em', color: '#3a3a3a' }}>+</span>}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3a3a3a' }}>
        {label}
      </div>
    </div>
  );
}

function LeadershipRoleCard({ role, delay }: { role: typeof leadershipRoles[0]; delay: string }) {
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
        background: hovered ? 'rgba(255,255,255,0.02)' : '#0a0a0a',
        padding: '3rem 2.5rem',
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        transition: 'background 0.25s',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div>
        <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: hovered ? '#8a8a8a' : '#3a3a3a', marginBottom: '0.75rem', transition: 'color 0.25s' }}>
          {role.type}
        </span>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', color: hovered ? '#f0f0f0' : '#d0d0d0', transition: 'color 0.25s' }}>{role.role}</h3>
        <span style={{ color: hovered ? '#6b6b6b' : '#5a5a5a', fontSize: '0.85rem', transition: 'color 0.25s' }}>— {role.organization}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {role.tags.map((tag, ti) => (
          <span key={ti} className="skill-tag" style={{ fontSize: '0.58rem' }}>{tag}</span>
        ))}
      </div>
      <p style={{ color: hovered ? '#8a8a8a' : '#4a4a4a', fontSize: '0.82rem', lineHeight: 1.75, transition: 'color 0.25s' }}>{role.description}</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        {role.contributions.map((c, ci) => (
          <li key={ci} style={{ display: 'flex', gap: '0.75rem', color: hovered ? '#8a8a8a' : '#3a3a3a', fontSize: '0.78rem', lineHeight: 1.6, transition: 'color 0.25s' }}>
            <span style={{ flexShrink: 0, marginTop: '0.25rem', color: hovered ? '#4a4a4a' : '#2a2a2a', transition: 'color 0.25s' }}>—</span> {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AchievementCard({ ach, delay }: { ach: typeof achievements[0]; delay: string }) {
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
        background: hovered ? 'rgba(255,255,255,0.025)' : '#0a0a0a',
        padding: '1.75rem 1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        transition: 'background 0.25s',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span style={{ fontSize: '1.4rem', lineHeight: 1, marginBottom: '0.25rem' }}>{ach.icon}</span>
      <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: hovered ? '#f0f0f0' : '#d0d0d0', transition: 'color 0.25s' }}>{ach.title}</h4>
      <p style={{ color: hovered ? '#8a8a8a' : '#4a4a4a', fontSize: '0.75rem', lineHeight: 1.65, transition: 'color 0.25s' }}>{ach.details}</p>
    </div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">05</span>
          <h2 className="section-title">Leadership</h2>
        </div>

        {/* Impact counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.05)',
          marginBottom: '6rem',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {impactCounters.map((c, i) => (
            <AnimCounter key={i} value={c.value} label={c.label} />
          ))}
        </div>

        {/* Leadership roles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '5rem' }}>
          {leadershipRoles.map((role, i) => (
            <LeadershipRoleCard
              key={i}
              role={role}
              delay={(i * 0.12).toString()}
            />
          ))}
        </div>

        {/* Philosophy quote */}
        <blockquote
          data-reveal="up"
          style={{
            maxWidth: '700px', margin: '0 auto 5rem',
            padding: '3rem',
            borderLeft: '2px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.75, color: '#8a8a8a' }}>
            "{leadershipPhilosophy}"
          </p>
        </blockquote>

        {/* Achievements */}
        <span data-reveal="fade" className="section-label" style={{ display: 'block', marginBottom: '2rem' }}>Recognitions</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
          {achievements.map((ach, i) => (
            <AchievementCard
              key={i}
              ach={ach}
              delay={((i % 3) * 0.08).toString()}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
