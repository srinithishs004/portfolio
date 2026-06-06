import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal project cards sequentially
      const cards = gsap.utils.toArray('.project-card-node');
      cards.forEach((card: any, idx: number) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(3px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate background wave shape
      gsap.fromTo('.river-wave',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* Deep river blue/teal background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040609]/40 to-black/30 z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[#1b4f62]/10 blur-[100px] z-0 pointer-events-none" />

      {/* ========== STYLIZED RIVER SVG WAVE BACKGROUND ========== */}
      <div className="absolute inset-x-0 top-[40%] h-48 opacity-10 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
          <path 
            className="river-wave"
            d="M0,96 C240,160 480,160 720,96 C960,32 1200,32 1440,96 L1440,200 L0,200 Z" 
            stroke="#326477" 
            strokeWidth="3"
            strokeDasharray="1000"
            fill="none"
          />
          <path 
            d="M0,130 C200,180 500,80 800,150 C1100,220 1300,100 1440,130" 
            stroke="#1f4756" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4a8fa8]">Featured Projects</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-2 mb-4 text-[#f0f4f0]">
            Engineering Case Studies
          </h2>
          <div className="w-12 h-[2px] bg-[#4a8fa8] mx-auto" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4 font-light">
            Illuminated boats floating downstream. Explore the telemetry architectures, full-stack consoles, and integrations designed by Sri Nithish.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-12"
        >
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="project-card-node glass-card rounded-2xl p-6 md:p-8 border border-border/40 hover:border-[#4a8fa8]/40 hover:shadow-2xl hover:shadow-[#4a8fa8]/5 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Boat-shaped gradient outline glow */}
              <div className="absolute inset-0 bg-[#326477]/[0.01] group-hover:bg-[#326477]/[0.02] transition-colors pointer-events-none rounded-2xl" />

              <div>
                {/* Banner indicator */}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] text-[#4a8fa8] bg-[#4a8fa8]/10 border border-[#4a8fa8]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    Project 0{idx + 1}
                  </span>
                  <div className="text-2xl w-10 h-10 rounded-lg bg-[#326477]/10 flex items-center justify-center border border-[#326477]/20 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold font-display text-foreground mb-3 group-hover:text-[#4a8fa8] transition-colors">
                  {project.name}
                </h3>

                {/* Project Description */}
                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Project Highlights */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider block mb-2">Key Outcomes:</span>
                  <ul className="space-y-1.5 list-none pl-0">
                    {project.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx} className="text-xs text-[#79adc2] flex items-center gap-1.5">
                        <span className="text-[#4a8fa8]">✔</span> {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Chips & Buttons */}
              <div className="mt-4 pt-4 border-t border-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-mono bg-white/[0.02] border border-border/50 text-[#79adc2] px-2.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Code link */}
                {project.github && (
                  <a
                    href={`https://${project.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-foreground hover:text-[#4a8fa8] transition-colors inline-flex items-center gap-1 self-end sm:self-auto"
                  >
                    View Code <i className="fa-brands fa-github text-sm"></i>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Projects;
