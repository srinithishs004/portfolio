import React, { useEffect, useRef } from 'react';
import { profile, skillCategories } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const whoIAmRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Section title clip-path slide reveal
    if (headerRef.current) {
      const title = headerRef.current.querySelector('.section-title');
      const num = headerRef.current.querySelector('.num-accent');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
        }
      });
      
      tl.fromTo(title, 
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(num,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.8'
      );
    }

    // Profile photo parallax
    if (photoRef.current && photoContainerRef.current) {
      gsap.fromTo(photoRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: photoContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    // "Who I Am" label clip reveal
    if (whoIAmRef.current) {
      gsap.fromTo(whoIAmRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whoIAmRef.current,
            start: 'top 90%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent" style={{ willChange: 'opacity, transform' }}>01</span>
          <h2 className="section-title" style={{ willChange: 'clip-path' }}>About</h2>
        </div>

        {/* 2-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem', alignItems: 'start' }}>

          {/* Left: Photo + role badge */}
          <div data-reveal="up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              ref={photoContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                aspectRatio: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <img
                ref={photoRef}
                src={profile.profilePhoto}
                alt={profile.name}
                style={{
                  width: '100%',
                  height: '124%', // slightly taller for parallax scroll headroom
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.05)',
                  display: 'block',
                  position: 'absolute',
                  top: '-12%',
                  willChange: 'transform',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '1.5rem 1rem 1rem',
                zIndex: 2,
              }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.7)' }}>
                  {profile.location} · {profile.pronouns}
                </p>
              </div>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.6rem 1rem',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              maxWidth: 'max-content',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0f0f0', animation: 'blink 1.5s ease infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b' }}>
                {profile.currentCompany}
              </span>
            </div>
          </div>

          {/* Right: Bio text */}
          <div data-reveal="up" data-delay="0.15">
            <span
              ref={whoIAmRef}
              className="section-label"
              style={{ display: 'block', marginBottom: '1.5rem', willChange: 'clip-path' }}
            >
              Who I Am
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {profile.bio.split('\n\n').map((para, i) => (
                <p key={i} style={{ color: '#6b6b6b', lineHeight: 1.85, fontSize: '0.95rem' }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem', marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { label: 'Email', value: profile.email },
                { label: 'Location', value: profile.location },
                { label: 'GitHub', value: profile.github },
                { label: 'LinkedIn', value: 'srinithishs' },
              ].map(item => (
                <div key={item.label}>
                  <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.35rem' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#9a9a9a' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling marquee */}
        <div data-reveal="fade" style={{ marginTop: '6rem', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(to right, #0a0a0a, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(to left, #0a0a0a, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div className="marquee-track">
            {[...skillCategories, ...skillCategories].flatMap(cat => cat.items).map((item, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 1.25rem',
                marginRight: '0.75rem',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '2px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#4a4a4a',
                whiteSpace: 'nowrap',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
