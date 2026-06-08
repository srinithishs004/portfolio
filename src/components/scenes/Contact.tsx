import React, { useState } from 'react';
import { profile } from '../../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    // Automatically clear it after 4.5 seconds
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS Credentials
    const serviceId = 'service_ood5mjs';
    const templateId = 'template_h4vz4bv'; // EmailJS Template ID
    const publicKey = 'Bk1iQS0PwGK2olUC3';   // EmailJS Public Key

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            name: form.name,
            reply_to: form.email,
            email: form.email,
            from_email: form.email,
            sender_email: form.email,
            user_email: form.email,
            contact_email: form.email,
            message: form.message,
          },
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        showNotification('Message sent successfully!', 'success');
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send email via EmailJS');
      }
    } catch (error) {
      console.error(error);
      showNotification('Failed to send message. Please check connection or email directly.', 'error');
      setStatus('idle');
    }
  };

  return (
    <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
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
            {status === 'sent' ? (
              <div style={{
                padding: '3rem',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.01)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#f0f0f0', animation: 'pulse-dot 2s infinite' }}>✓</div>
                <p style={{ color: '#8a8a8a', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Message received. I'll be in touch soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '2rem',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#8a8a8a',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '4px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#f0f0f0'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#8a8a8a'; }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    className="bw-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                    required
                    className="bw-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.6rem' }}>Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="What's on your mind?"
                    required
                    className="bw-input"
                    style={{ resize: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  data-magnetic
                  style={{
                    background: status === 'sending' ? 'rgba(240,240,240,0.6)' : '#f0f0f0',
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
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Custom Floating Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: '#0d0d0d',
            border: notification.type === 'error' ? '1px solid rgba(255, 77, 77, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem 2rem',
            borderRadius: '6px',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            animation: 'toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            willChange: 'transform, opacity',
            maxWidth: '360px',
          }}
        >
          {/* Status blip indicator */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: notification.type === 'error' ? '#ff4d4d' : '#f0f0f0',
              animation: 'blink 1.5s infinite',
            }}
          />
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: notification.type === 'error' ? '#ff4d4d' : '#6b6b6b',
                marginBottom: '0.2rem',
              }}
            >
              {notification.type === 'error' ? 'Error Alert' : 'System Alert'}
            </span>
            <p style={{ color: '#f0f0f0', fontSize: '0.8rem', lineHeight: 1.5, margin: 0, letterSpacing: '-0.01em' }}>
              {notification.message}
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a4a4a',
              cursor: 'pointer',
              fontSize: '0.85rem',
              padding: '0.2rem',
              marginLeft: 'auto',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a4a4a')}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
