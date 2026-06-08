import React, { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Animated character split for the name */
function SplitName({ name }: { name: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); }, []);

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0' }}>
      {name.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(60px)',
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04 + 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.04 + 0.1}s`,
            whiteSpace: 'pre',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* Typewriter for the tagline */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === target) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    } else {
      const speed = deleting ? 40 : 70;
      timeout = setTimeout(() => {
        setDisplayed(prev =>
          deleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {displayed}<span className="cursor-blink" />
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const scrollToWork = () => {
    document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const typewriterTexts = [
    'Software Engineer',
    'Cloud Infrastructure',
    'Full-Stack Developer',
    'IoT Systems Builder',
  ];

  // Mouse tracking for background orb
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const updateOrb = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentX * 120}px, ${currentY * 120}px)`;
      }
      animationFrameId = requestAnimationFrame(updateOrb);
    };
    updateOrb();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP scroll pinning and scaling
  useEffect(() => {
    if (!heroRef.current || !nameContainerRef.current || !contentRef.current || !scrollHintRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tl.to(nameContainerRef.current, {
        scale: 1.5,
        transformOrigin: 'left center',
        ease: 'none',
      }, 0)
      .to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: 'none',
      }, 0)
      .to(gridRef.current, {
        yPercent: -15,
        ease: 'none',
      }, 0)
      .to(scrollHintRef.current, {
        opacity: 0,
        y: 15,
        ease: 'none',
      }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 3rem 4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Faint grid background */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Orb background */}
      <div ref={orbRef} className="hero-orb" style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(12px)',
            transition: 'all 0.6s ease 0.1s',
            marginBottom: '1.5rem',
          }}
        >
          <span className="section-label">Portfolio · {new Date().getFullYear()}</span>
        </div>

        {/* Big name */}
        <h1
          ref={nameContainerRef}
          style={{
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '1.5rem',
            overflow: 'hidden',
            width: 'fit-content',
            willChange: 'transform',
          }}
        >
          <SplitName name={profile.name} />
        </h1>

        {/* Wrapper for content to fade out during pin */}
        <div ref={contentRef} style={{ willChange: 'opacity, transform' }}>
          {/* Typewriter role */}
          <div style={{
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: '#6b6b6b',
            marginBottom: '2.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'all 0.6s ease 0.6s',
          }}>
            <Typewriter texts={typewriterTexts} />
          </div>

          {/* Divider line */}
          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            maxWidth: '480px',
            marginBottom: '2.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s',
          }} />

          {/* Short bio */}
          <p style={{
            maxWidth: '520px',
            color: '#6b6b6b',
            fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
            lineHeight: 1.75,
            marginBottom: '3rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'all 0.6s ease 1.1s',
          }}>
            Building digital experiences across the full stack — from backend APIs and cloud infrastructure to mobile apps and connected systems.
            <br /><br />
            Currently: <span style={{ color: '#f0f0f0', fontWeight: 500 }}>{profile.currentRole}</span> at <span style={{ color: '#f0f0f0', fontWeight: 500 }}>{profile.currentCompany}</span>.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'all 0.6s ease 1.3s',
          }}>
            <button
              onClick={scrollToWork}
              data-magnetic
              style={{
                background: '#f0f0f0',
                color: '#0a0a0a',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '4px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              View Work
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              style={{
                background: 'transparent',
                color: '#f0f0f0',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.85rem 2rem',
                borderRadius: '4px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'none',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '-4rem',
            left: 0,
            opacity: 0.3,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            willChange: 'opacity, transform',
          }}
        >
          <div style={{
            width: '24px', height: '40px',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}>
            <div style={{
              width: '3px', height: '8px',
              background: '#fff',
              borderRadius: '99px',
              animation: 'char-float 1.5s ease-in-out infinite',
            }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
