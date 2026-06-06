import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ visible: false, loading: false, success: false, text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({
      visible: true,
      loading: true,
      success: false,
      text: 'Sending your message...'
    });

    // Simulate sending mail telemetry
    setTimeout(() => {
      setFormStatus({
        visible: true,
        loading: false,
        success: true,
        text: `Success! Thank you ${formData.name}. Sri Nithish will reply at ${profile.email} shortly.`
      });
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-box',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.contact-box',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent flex items-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090d16]/30 to-black/30 pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-2 mb-4 text-[#f0f4f0]">
            Connect &amp; Collaborate
          </h2>
          <div className="w-12 h-[2px] bg-primary mx-auto" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4 font-light">
            Have a project discussion, a cloud architecture role, or an international resource need? Transmit your message below.
          </p>
        </div>

        {/* ========== SPLIT CONTACT BOARD ========== */}
        <div className="contact-box grid grid-cols-1 md:grid-cols-5 gap-8 bg-black/45 border border-border/45 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle panel glows */}
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none z-0" />
          
          {/* Left panel (2 cols): Social links details */}
          <div className="md:col-span-2 flex flex-col justify-between gap-8 z-10">
            <div>
              <h3 className="text-xl font-bold font-display text-foreground mb-4">Direct Channels</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
                Feel free to reach out via email or connect with me directly on my professional networks. I'm always open to discussing new opportunities.
              </p>
            </div>

            {/* Link badges */}
            <div className="flex flex-col gap-4">
              <a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-[#161b26]/50 hover:border-primary/40 hover:bg-[#161b26] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-mono uppercase tracking-wider">Email Address</span>
                  <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors">{profile.email}</span>
                </div>
              </a>

              <a 
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-[#161b26]/50 hover:border-primary/40 hover:bg-[#161b26] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg group-hover:scale-105 transition-transform">
                  <i className="fa-brands fa-linkedin-in"></i>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-mono uppercase tracking-wider">LinkedIn Connect</span>
                  <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors">linkedin.com/in/srinithishs</span>
                </div>
              </a>

              <a 
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-[#161b26]/50 hover:border-primary/40 hover:bg-[#161b26] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg group-hover:scale-105 transition-transform">
                  <i className="fa-brands fa-github"></i>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-mono uppercase tracking-wider">GitHub Workspace</span>
                  <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors">github.com/srinithishs</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right panel (3 cols): Contact Form */}
          <div className="md:col-span-3 bg-white/[0.02] border border-border/40 rounded-xl p-6 z-10">
            <h3 className="text-lg font-bold font-display text-foreground mb-4">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border/60 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-background/80 transition-colors"
                  required 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@domain.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border/60 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-background/80 transition-colors"
                  required 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Type your message here..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border/60 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-background/80 transition-colors resize-none"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-widest rounded-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-paper-plane"></i> Send Message
              </button>

              {formStatus.visible && (
                <div className={`p-3 rounded-md text-xs flex items-center gap-2 border ${
                  formStatus.loading 
                    ? 'bg-primary/5 border-primary/20 text-primary' 
                    : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                }`}>
                  {formStatus.loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                  {formStatus.success && <i className="fa-solid fa-circle-check"></i>}
                  <span>{formStatus.text}</span>
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Contact;
