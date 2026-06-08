import React from 'react';
import { profile } from '../../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>

        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="num-accent">08</span>
          <h2 className="section-title">Get in Touch</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>

          {/* Left: channels */}
          <div data-reveal="left">
            <p style={{ color: '#6b6b6b', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '3rem', maxWidth: '380px' }}>
              Have a project, opportunity, or just want to connect? Reach out — I read every message.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { label: 'LinkedIn', value: 'linkedin.com/in/srinithishs', href: `https://${profile.linkedin}` },
                { label: 'GitHub', value: profile.github, href: `https://${profile.github}` },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr',
                    gap: '1.5rem',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'padding-left 0.25s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0.75rem'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0'; }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', paddingTop: '2px' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#7a7a7a', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7a7a7a')}
                  >
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div data-reveal="right" data-delay="0.15">
            <form
              action={`https://formsubmit.co/${profile.email}`}
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Redirect back to the portfolio site after submission */}
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
              
              {/* Subject line for incoming emails */}
              <input type="hidden" name="_subject" value="New Portfolio Message!" />

              <div>
                <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Name</label>
                <input type="text" name="name" placeholder="Your name" required className="bw-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Email</label>
                <input type="email" name="email" placeholder="you@email.com" required className="bw-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Message</label>
                <textarea rows={5} name="message" placeholder="What's on your mind?" required className="bw-input" style={{ resize: 'none' }} />
              </div>
              <button
                type="submit"
                data-magnetic
                style={{
                  background: '#f0f0f0',
                  color: '#0a0a0a',
                  border: 'none',
                  padding: '0.9rem 2rem',
                  borderRadius: '4px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                  transition: 'opacity 0.2s',
                  alignSelf: 'flex-start',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
