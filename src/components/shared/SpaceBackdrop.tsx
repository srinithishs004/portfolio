import React, { useMemo } from 'react';

interface SpaceBackdropProps {
  scrollProgress: number;
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  opacity: number;
  delay?: string;
}

export const SpaceBackdrop: React.FC<SpaceBackdropProps> = ({ scrollProgress }) => {
  // Calculate opacities for different nebula/sky gradient layers based on scroll progress
  const skyHeroOpacity = Math.max(0, 1 - scrollProgress / 0.15);
  
  const skyProfileOpacity = useMemo(() => {
    if (scrollProgress < 0.12) {
      return scrollProgress / 0.12;
    } else if (scrollProgress < 0.45) {
      return 1;
    } else {
      return Math.max(0, 1 - (scrollProgress - 0.45) / 0.15);
    }
  }, [scrollProgress]);

  const skyExpertiseOpacity = useMemo(() => {
    if (scrollProgress < 0.40) {
      return 0;
    } else if (scrollProgress < 0.52) {
      return (scrollProgress - 0.40) / 0.12;
    } else if (scrollProgress < 0.78) {
      return 1;
    } else {
      return Math.max(0, 1 - (scrollProgress - 0.78) / 0.12);
    }
  }, [scrollProgress]);

  const skyFooterOpacity = useMemo(() => {
    if (scrollProgress < 0.75) {
      return 0;
    } else {
      return Math.min(1, (scrollProgress - 0.75) / 0.20);
    }
  }, [scrollProgress]);

  // Generate 3 layers of stars with useMemo to keep coordinate matrices stable between re-renders
  const farStars = useMemo(() => {
    const list: Star[] = [];
    for (let i = 0; i < 150; i++) {
      list.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${0.6 + Math.random() * 0.8}px`,
        opacity: 0.2 + Math.random() * 0.5
      });
    }
    return list;
  }, []);

  const midStars = useMemo(() => {
    const list: Star[] = [];
    for (let i = 0; i < 80; i++) {
      list.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${1.2 + Math.random() * 0.8}px`,
        opacity: 0.4 + Math.random() * 0.5,
        delay: `${Math.random() * 3}s`
      });
    }
    return list;
  }, []);

  const nearStars = useMemo(() => {
    const list: Star[] = [];
    for (let i = 0; i < 25; i++) {
      list.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${2.0 + Math.random() * 1.2}px`,
        opacity: 0.6 + Math.random() * 0.4,
        delay: `${Math.random() * 4}s`
      });
    }
    return list;
  }, []);

  // Generate drifting cosmic stardust
  const cosmicDust = useMemo(() => {
    const list = [];
    for (let i = 0; i < 18; i++) {
      list.push({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        size: `${2.0 + Math.random() * 2.5}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${10 + Math.random() * 12}s`,
        driftX: `${(Math.random() - 0.5) * 60}px`,
        driftY: `${-40 - Math.random() * 70}px`
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-black">
      
      {/* ==================== COSMIC NEBULA GLOWS ==================== */}
      
      {/* 1. Hero: Deep Space Black & Indigo Nebula */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#050612] to-[#0a081c] transition-opacity duration-300 ease-out" 
        style={{ opacity: skyHeroOpacity }}
      />
      
      {/* 2. Profile: Deep Violet & Purple Nebula */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#030208] via-[#0e071c] to-[#1a082c] transition-opacity duration-300 ease-out" 
        style={{ opacity: skyProfileOpacity }}
      />
      
      {/* 3. Expertise / Milestones: Deep Indigo & Space Teal */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#051422] to-[#07242e] transition-opacity duration-300 ease-out" 
        style={{ opacity: skyExpertiseOpacity }}
      />
      
      {/* 4. Footer: Obsidian Space Black & Cosmic Cyan Dust */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#010204] via-[#03060c] to-[#021415] transition-opacity duration-300 ease-out" 
        style={{ opacity: skyFooterOpacity }}
      />

      {/* Floating Nebula Gas Clouds (Blurry ambient orbs) */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[130px] transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollProgress * -100}px)` }}
      />
      <div 
        className="absolute bottom-[10%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-purple-500/[0.03] blur-[140px] transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollProgress * -200}px)` }}
      />

      {/* ==================== PARALLAX STARFIELDS ==================== */}

      {/* Layer 1: Far Tiny Stars (Move Slowest) */}
      <div 
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollProgress * -60}px)` }}
      >
        {farStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Layer 2: Midground Stars (Blinking, Move Medium) */}
      <div 
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollProgress * -160}px)` }}
      >
        {midStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/90 animate-pulse"
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
      </div>

      {/* Layer 3: Near Foreground Large Stars (Glittering, Move Fastest) */}
      <div 
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollProgress * -300}px)` }}
      >
        {nearStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* ==================== COSMIC DUST SPARKLES ==================== */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {cosmicDust.map((dust) => (
          <div
            key={dust.id}
            className="absolute rounded-full bg-primary animate-drift"
            style={{
              top: dust.top,
              left: dust.left,
              width: dust.size,
              height: dust.size,
              animationDelay: dust.delay,
              animationDuration: dust.duration,
              boxShadow: '0 0 6px #2dfd38, 0 0 12px rgba(74, 253, 56, 0.3)',
              opacity: 0.15 + Math.random() * 0.40,
              '--drift-x': dust.driftX,
              '--drift-y': dust.driftY,
            } as any}
          />
        ))}
      </div>

      {/* Decorative Shooting Star effect */}
      <div className="absolute top-[15%] left-[20%] w-[120px] h-[1px] bg-gradient-to-r from-white via-white/50 to-transparent transform -rotate-[35deg] opacity-0 animate-shooting-star pointer-events-none" />

    </div>
  );
};
export default SpaceBackdrop;
