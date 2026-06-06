import React, { useMemo } from 'react';
import { profile } from '../../data/portfolio';

export const Footer: React.FC = () => {
  // Generate random coordinate arrays for 100 CSS stars
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 80; i++) {
      list.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${0.8 + Math.random() * 1.8}px`,
        delay: `${Math.random() * 3}s`,
        opacity: 0.3 + Math.random() * 0.7
      });
    }
    return list;
  }, []);

  return (
    <footer 
      id="footer" 
      className="relative min-h-[60vh] py-20 bg-transparent flex items-center justify-center overflow-hidden border-t border-border/20"
    >
      {/* ========== PURE CSS STARRY SKY ========== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, idx) => (
          <div 
            key={idx}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              opacity: star.opacity
            }}
          />
        ))}
        {/* Bioluminescent mushroom glow orbs on the floor */}
        <div className="absolute bottom-[-50px] left-[20%] w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-[-30px] right-[25%] w-40 h-40 bg-[#ff6b35]/5 rounded-full blur-[50px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        
        {/* Glow orb */}
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-xl mb-6 shadow-inner animate-pulse">
          🌙
        </div>

        {/* Narrative closing */}
        <h2 className="text-2xl md:text-4xl font-bold font-display text-foreground mb-4 leading-tight">
          Thank You
        </h2>
        
        <p className="text-muted-foreground text-sm font-accent italic mb-8 max-w-md mx-auto leading-relaxed">
          "Thank you for exploring my professional journey."
        </p>

        {/* Signature */}
        <div className="font-display text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-[#ff6b35] bg-clip-text text-transparent mb-10 select-none">
          — {profile.name}
        </div>

        {/* Footer info links */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] md:text-xs font-mono uppercase tracking-wider text-muted-foreground/50 border-t border-border/20 pt-8 mt-4">
          <span>India</span>
          <span>·</span>
          <span>© {new Date().getFullYear()} Sri Nithish S</span>
          <span>·</span>
          <span>All rights reserved</span>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
