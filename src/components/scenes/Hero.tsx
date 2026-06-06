import React from 'react';
import { profile } from '../../data/portfolio';

interface HeroProps {
  scrollProgress: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollProgress }) => {
  // Fade out Hero content slightly as user scrolls past Chapter 0 (0% to 12%)
  const opacity = Math.max(0, 1 - (scrollProgress / 0.12));
  const translateY = -scrollProgress * 60;

  const handleCtaClick = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-end bg-transparent overflow-hidden"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      {/* ========== SLEEK 2D DARK FOREST BACKGROUND ========== */}
      {/* Depth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/50 z-0" />
      
      {/* Animated forest-green ambient glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/10 blur-[100px] animate-pulse duration-[8000ms] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      {/* Subtle organic vector tree outlines in the background */}
      <div className="absolute bottom-0 inset-x-0 h-48 opacity-10 flex justify-between items-end pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <svg 
            key={i} 
            className="w-32 md:w-48 text-[#1b3f1c]" 
            viewBox="0 0 120 180" 
            fill="currentColor"
            style={{ transform: `scale(${0.7 + Math.random() * 0.6})`, marginBottom: `${-10 - Math.random() * 15}px` }}
          >
            <path d="M60 10 L10 100 L40 100 L15 140 L45 140 L20 170 L100 170 L75 140 L105 140 L80 100 L110 100 Z" />
            <rect x="55" y="170" width="10" height="15" />
          </svg>
        ))}
      </div>

      {/* Dark overlay protecting contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      {/* Content Container (pointer-events-none allows scroll to bypass text nodes) */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-16 pb-16 md:pb-24 pt-32">
        
        {/* Title */}
        <h1 
          className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground mb-4 uppercase opacity-0 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          SRI NITHISH<span className="text-primary font-black"> S</span>
        </h1>

        {/* Subheading */}
        <p 
          className="text-foreground/85 text-[clamp(1.1rem,2.2vw,1.65rem)] font-light mb-4 md:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Cloud Infrastructure Engineer · Full-Stack Developer
        </p>

        {/* Description */}
        <p 
          className="text-muted-foreground text-[clamp(0.85rem,1.4vw,1.15rem)] font-light mb-6 md:mb-8 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '0.55s' }}
        >
          Specialized in secure cloud architecture, real-time edge telemetry, and international resource management. 
          I build scalable AWS serverless pipelines and zero-trust IoT networks that bridge people, data, and technology.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          <button 
            onClick={() => handleCtaClick('#contact')}
            className="bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-xs tracking-widest uppercase font-bold rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97] pointer-events-auto"
          >
            Connect with Me
          </button>
          <button 
            onClick={() => handleCtaClick('#projects')}
            className="bg-white text-background px-6 py-3 md:px-8 md:py-4 text-xs tracking-widest uppercase font-bold rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97] pointer-events-auto"
          >
            View Projects
          </button>
        </div>

        {/* Trust Line */}
        <p 
          className="text-muted-foreground/60 text-[10px] md:text-xs font-light mt-6 md:mt-8 tracking-wider uppercase opacity-0 animate-fade-up"
          style={{ animationDelay: '0.85s' }}
        >
          ☁️ AWS Automation & Security Specialist · Totex Energy · India
        </p>
      </div>

      {/* Floating Scroll Indicator Prompt */}
      {scrollProgress < 0.05 && (
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground/60 text-[10px] tracking-widest uppercase pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - (scrollProgress / 0.04)) }}
        >
          <span className="animate-bounce">↓</span>
          <span>Scroll to begin</span>
        </div>
      )}
    </section>
  );
};
export default Hero;
