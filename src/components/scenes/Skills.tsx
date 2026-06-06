import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the cloud items floating into view with stagger
      const clouds = gsap.utils.toArray('.cloud-card');
      clouds.forEach((cloud: any, idx: number) => {
        gsap.fromTo(cloud,
          {
            opacity: 0,
            y: 50,
            x: idx % 2 === 0 ? -20 : 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cloud,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* Background gradients simulating dawn breaking through the canopy */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/25 z-0 pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#ffd4a3]/5 blur-[90px] z-0 pointer-events-none" />

      {/* Floating background clouds (pure CSS/vector overlays) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-64 h-20 bg-white/40 rounded-full blur-[40px] animate-pulse duration-[6000ms]" />
        <div className="absolute top-[40%] right-[5%] w-96 h-28 bg-white/30 rounded-full blur-[50px] animate-pulse duration-[8000ms]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Technical Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-2 mb-4 text-[#f0f4f0]">
            Core Technical Expertise
          </h2>
          <div className="w-12 h-[2px] bg-primary mx-auto" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4 font-light">
            My skills touch the clouds. Toggle layers of infrastructure from low-power edge nodes to scalable computing systems.
          </p>
        </div>

        {/* Cloud Islands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {skills.map((skill, idx) => (
            <div 
              key={idx}
              className="cloud-card glass-card rounded-2xl p-8 border border-border/40 hover:border-primary/20 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Top border glow decoration */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/70 transition-all duration-500" />
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl shadow-inner shadow-primary/5">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                    {skill.island}
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                    Capability Segment {idx + 1}
                  </span>
                </div>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2.5">
                {skill.items.map((item, itemIdx) => (
                  <span 
                    key={itemIdx}
                    className="font-mono text-xs px-3.5 py-2 rounded-full bg-white/[0.03] border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Floating Cloud decoration */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/[0.01] rounded-full blur-[20px] pointer-events-none group-hover:bg-primary/[0.02] transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Skills;
