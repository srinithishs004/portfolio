import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, testimonials } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger timeline item reveals
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            x: -30,
            filter: 'blur(4px)'
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Reveal testimonials
      gsap.fromTo('.testimonial-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.testimonial-section',
            start: 'top 85%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* Campfire atmospheric background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#ff531a]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Floating sparks (pure CSS particles) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 bg-orange-500 rounded-full blur-[1px] animate-ping duration-[3000ms]" />
        <div className="absolute bottom-[40%] left-[45%] w-1 h-1 bg-yellow-400 rounded-full animate-bounce duration-[4000ms]" />
        <div className="absolute bottom-[15%] right-[25%] w-2 h-2 bg-orange-600 rounded-full blur-[2px] animate-ping duration-[2500ms]" />
        <div className="absolute bottom-[60%] right-[35%] w-1 h-1 bg-yellow-500 rounded-full animate-bounce duration-[5000ms]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b35]">Career Milestones</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-2 mb-4 text-[#f0f4f0]">
            Professional Experience
          </h2>
          <div className="w-12 h-[2px] bg-[#ff6b35] mx-auto" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4 font-light">
            Gather around the warmth of the fire to unfold stories of leadership, database scalability, and international team coordinations.
          </p>
        </div>

        {/* ========== CSS ANIMATED CAMPFIRE ========== */}
        <div className="flex flex-col items-center mb-20 relative">
          <div className="w-24 h-24 relative flex items-end justify-center">
            {/* Flickering flame orbs */}
            <div className="absolute w-12 h-16 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full blur-[6px] animate-bounce duration-[800ms] opacity-80" />
            <div className="absolute w-8 h-12 bg-gradient-to-t from-red-600 to-orange-500 rounded-full blur-[4px] animate-pulse duration-[500ms] opacity-90 bottom-1" />
            <div className="absolute w-6 h-8 bg-gradient-to-t from-yellow-300 to-white rounded-full blur-[2px] animate-ping duration-[1200ms] bottom-2" />
            
            {/* Logs */}
            <div className="absolute bottom-0 w-16 h-3 bg-[#3e240c] rounded-full transform rotate-12 origin-center shadow-md border border-black/20" />
            <div className="absolute bottom-0 w-16 h-3 bg-[#4a2e19] rounded-full transform -rotate-12 origin-center shadow-md border border-black/20" />
          </div>
          {/* Ground fire shadow ring */}
          <div className="w-32 h-2 bg-[#ff531a]/15 rounded-full blur-[10px] mt-1.5 animate-pulse duration-[1000ms]" />
        </div>

        {/* Timeline Wrap */}
        <div className="relative border-l border-[#ff6b35]/20 ml-4 md:ml-12 pl-6 md:pl-10 space-y-16">
          {experience.map((job, idx) => (
            <div 
              key={idx}
              className="timeline-item relative group"
            >
              {/* Timeline marker with custom colors based on row index */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#ff6b35] border-4 border-[#060906] flex items-center justify-center text-[10px] text-black shadow-lg shadow-[#ff6b35]/20 group-hover:scale-110 transition-transform">
                🔥
              </div>

              {/* Wooden scroll-like glassmorphic card */}
              <div className="glass-card rounded-xl p-6 border border-border/40 hover:border-[#ff6b35]/30 hover:shadow-2xl hover:shadow-[#ff6b35]/5 transition-all duration-300 relative">
                {/* Flickering edge backlight glow */}
                <div className="absolute inset-0 bg-[#ff6b35]/[0.01] group-hover:bg-[#ff6b35]/[0.02] transition-colors rounded-xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground group-hover:text-[#ff6b35] transition-colors">
                      {job.company}
                    </h3>
                    <p className="text-[#ff6b35] text-sm font-semibold tracking-wide mt-0.5">
                      {job.role}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-[#ff6b35]/10 text-[#ff6b35] px-3 py-1 rounded-full border border-[#ff6b35]/20 self-start sm:self-auto">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2.5 text-muted-foreground text-sm font-light leading-relaxed mb-4 list-none pl-0">
                  {job.highlights.map((hl, hlIdx) => (
                    <li key={hlIdx} className="flex items-start gap-2">
                      <span className="text-[#ff6b35] mt-1.5 text-xs">◆</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                  {job.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-mono bg-white/[0.02] border border-border/60 text-muted-foreground px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Scrolls Section */}
        <div className="testimonial-section mt-24 border-t border-border/20 pt-16">
          <h3 className="text-xl md:text-2xl font-bold font-display text-center mb-10 text-foreground">
            🤝 Professional Endorsements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-xl border border-border/40 hover:border-[#ff6b35]/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <p className="text-muted-foreground text-sm italic font-accent leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff6b35]/15 border border-[#ff6b35]/20 flex items-center justify-center text-lg">
                    {t.image}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t.author}</h4>
                    <span className="text-[10px] text-muted-foreground tracking-wide font-mono">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default Experience;
