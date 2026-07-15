import React, { useEffect, useRef } from 'react';
import { caseStudies } from '../../data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !reelRef.current) return;

    const reel = reelRef.current;
    const mm = gsap.matchMedia();

    // Only apply horizontal pin on desktop screens (> 768px)
    mm.add("(min-width: 769px)", () => {
      const pinTween = gsap.to(reel, {
        x: () => -(reel.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${reel.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        pinTween.scrollTrigger?.kill();
        pinTween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="case-studies"
      className="case-section"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#0a0a0a',
      }}
    >
      <div ref={reelRef} className="case-reel">
        
        {/* Panel 0: Header & Intro */}
        <div className="case-panel case-intro-panel">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <span className="num-accent" style={{ fontSize: '1rem' }}>03</span>
            <h2 className="section-title">Case Studies</h2>
          </div>
          <p className="case-intro-text">
            A selection of projects demonstrating how I approach real problems — defining the challenge, designing the solution, and delivering outcomes.
          </p>
          <div className="case-scroll-indicator">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Scroll down to slide
            </span>
            <div style={{ width: '40px', height: '1px', background: '#fff', position: 'relative' }}>
              <div style={{
                position: 'absolute', right: 0, top: '-3px',
                width: '7px', height: '7px',
                borderTop: '1px solid #fff',
                borderRight: '1px solid #fff',
                transform: 'rotate(45deg)',
              }} />
            </div>
          </div>
        </div>

        {/* Case Study Panels */}
        {caseStudies.map((study, idx) => (
          <div key={idx} className="case-panel">
            <div className="case-content-grid">
              
              {/* Left Side: Title and metadata */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <span
                  className="case-panel-num"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f0f0f0', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {study.company}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {study.roleTitle} · {study.duration}
                  </span>
                </div>

                <div>
                  <h3 className="case-panel-title" style={{ fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                    {study.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {study.tags.map((tag, ti) => (
                      <span key={ti} className="skill-tag" style={{ fontSize: '0.65rem' }}>{tag}</span>
                    ))}
                  </div>

                  {study.liveLink && (
                    <a
                      href={study.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.65rem',
                        color: '#f0f0f0',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '3px',
                        width: 'fit-content',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      Project URL ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side: Details Grid */}
              <div className="case-details-grid">
                <div className="case-detail-cell">
                  <span className="case-detail-label">Challenge</span>
                  <p className="case-detail-text">{study.challenge}</p>
                </div>
                <div className="case-detail-cell">
                  <span className="case-detail-label">Solution</span>
                  <p className="case-detail-text">{study.solution}</p>
                </div>
                <div className="case-detail-cell">
                  <span className="case-detail-label">My Role</span>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {study.role.map((r, ri) => (
                      <li key={ri} style={{ display: 'flex', gap: '0.6rem', color: '#8a8a8a', fontSize: '0.82rem' }}>
                        <span style={{ color: '#4a4a4a' }}>—</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="case-detail-cell" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <span className="case-detail-label">Outcome</span>
                    <p className="case-detail-texthighlight" style={{ marginBottom: 0 }}>{study.outcome}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '4px', marginTop: 'auto' }}>
                    <span className="case-detail-label" style={{ color: '#f0f0f0', marginBottom: '0.4rem' }}>Quantified Impact</span>
                    <p className="case-detail-texthighlight" style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', margin: 0 }}>
                      {study.quantifiedOutcome}
                    </p>
                  </div>
                </div>

                {/* System Architecture spanning full-width */}
                <div className="case-detail-cell" style={{ gridColumn: '1 / -1' }}>
                  <span className="case-detail-label">System Architecture</span>
                  <pre style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    lineHeight: 1.45,
                    background: '#070707',
                    border: '1px solid rgba(255,255,255,0.04)',
                    padding: '1.25rem',
                    borderRadius: '4px',
                    color: '#8a8a8a',
                    overflowX: 'auto',
                    margin: '0.5rem 0 0 0',
                    whiteSpace: 'pre',
                  }}>{study.architecture}</pre>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      <style>{`
        /* Mobile defaults */
        .case-section {
          position: relative;
          height: auto;
          overflow: visible;
        }
        .case-reel {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          padding: 6rem 1.5rem;
          width: 100%;
        }
        .case-panel {
          width: 100%;
          height: auto;
          flex-shrink: 1;
          display: block;
          position: relative;
        }
        .case-intro-panel {
          padding: 0;
        }
        .case-intro-text {
          max-width: 100%;
          color: #8a8a8a;
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 2rem;
        }
        .case-scroll-indicator {
          display: none !important; /* Hide scroll hint on mobile */
        }
        .case-content-grid {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .case-panel-num {
          font-size: 3.5rem;
        }
        .case-panel-title {
          font-size: 1.75rem;
        }
        .case-details-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .case-detail-cell {
          border-left: 1px solid rgba(255,255,255,0.06);
          padding-left: 1.25rem;
        }
        .case-detail-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6b6b6b;
          margin-bottom: 0.6rem;
        }
        .case-detail-text {
          color: #8a8a8a;
          font-size: 0.85rem;
          line-height: 1.75;
        }
        .case-detail-texthighlight {
          color: #f0f0f0;
          font-size: 0.85rem;
          line-height: 1.75;
        }

        /* Desktop media query */
        @media (min-width: 769px) {
          .case-section {
            height: 100vh;
            overflow: hidden;
          }
          .case-reel {
            flex-direction: row;
            gap: 0;
            padding: 0;
            height: 100%;
            width: max-content;
          }
          .case-panel {
            width: 100vw;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 0 8vw;
            border-right: 1px solid rgba(255,255,255,0.03);
          }
          .case-intro-panel {
            padding: 0 8vw;
          }
          .case-intro-text {
            max-width: 600px;
            font-size: clamp(1rem, 2vw, 1.25rem);
            margin-bottom: 3rem;
          }
          .case-scroll-indicator {
            display: flex !important;
            align-items: center;
            gap: 1rem;
            opacity: 0.4;
          }
          .case-content-grid {
            display: grid;
            grid-template-columns: 1.2fr 2fr;
            gap: 6vw;
            width: 100%;
            align-items: start;
            padding-bottom: 0;
            border-bottom: none;
          }
          .case-panel-num {
            font-size: clamp(3rem, 8vw, 5rem);
          }
          .case-panel-title {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
          }
          .case-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem 2.5rem;
          }
          .case-detail-cell {
            border-left: 1px solid rgba(255,255,255,0.06);
            padding-left: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
