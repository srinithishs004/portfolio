import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { profile } from '../../data/portfolio';

export const Ch6_TheClearing = () => {
  const progress = useScrollProgress();
  const isVisible = progress > 0.77 && progress < 0.90;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thanks! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <group>
      {/* Contact form and links */}
      <ContactWidget 
        isVisible={isVisible} 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit} 
      />
    </group>
  );
};

function ContactWidget({ isVisible, formData, setFormData, onSubmit }) {
  const { email, linkedin, github } = profile;
  
  return (
    <Html>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(20, 30, 20, 0.95)',
          color: '#f5a623',
          padding: '30px',
          borderRadius: '16px',
          border: '2px solid #4a7c59',
          width: '90vw',
          maxWidth: '460px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s',
          pointerEvents: isVisible ? 'auto' : 'none',
          zIndex: 30,
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', textAlign: 'center', color: '#ffffff' }}>
          Let's Connect
        </h2>
        
        {/* Social links */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '24px' }}>
          <a
            href={`mailto:${email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              backgroundColor: '#4a7c59',
              borderRadius: '50%',
              color: '#f0f8f0',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'background-color 0.3s',
            }}
            title="Email"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              backgroundColor: '#4a7c59',
              borderRadius: '50%',
              color: '#f0f8f0',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'background-color 0.3s',
            }}
            title="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href={`https://${github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              backgroundColor: '#4a7c59',
              borderRadius: '50%',
              color: '#f0f8f0',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'background-color 0.3s',
            }}
            title="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        {/* Contact form */}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: '#1a3a1a',
              color: '#ffffff',
              fontSize: '13px',
              outline: 'none',
            }}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: '#1a3a1a',
              color: '#ffffff',
              fontSize: '13px',
              outline: 'none',
            }}
            required
          />
          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: '#1a3a1a',
              color: '#ffffff',
              fontSize: '13px',
              minHeight: '80px',
              resize: 'vertical',
              outline: 'none',
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#4a7c59',
              color: '#f0f8f0',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '5px',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </Html>
  );
}
export default Ch6_TheClearing;
