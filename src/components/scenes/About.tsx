import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Terminal from '../Terminal';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const stones = [
    {
      title: "Cloud Infrastructure Specialist",
      text: "Designing high-throughput cloud environments and serverless architectures based in India.",
      icon: "☁️",
      align: "left"
    },
    {
      title: "IoT Systems Integrator",
      text: "Building real-time MQTT data streaming nodes and connecting ESP32 edge processors to serverless databases.",
      icon: "📡",
      align: "right"
    },
    {
      title: "Full-Stack Developer",
      text: "Engineering corporate management micro-endpoints (Java/Python) and modular frontends (React/TypeScript).",
      icon: "💻",
      align: "left"
    },
    {
      title: "Resource & Staffing Coordinator",
      text: "Directing technical recruitment pipelines and sourcing cross-functional engineering teams internationally.",
      icon: "👥",
      align: "right"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the path line drawing downward
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      );

      // Animate each stone tablet card sliding in
      const cards = gsap.utils.toArray('.stone-card');
      cards.forEach((card: any, idx: number) => {
        const alignLeft = idx % 2 === 0;
        gsap.fromTo(card,
          {
            opacity: 0,
            x: alignLeft ? -40 : 40,
            y: 30,
            filter: 'blur(4px)'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
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
      id="about" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent text-foreground overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-radial-gradient from-[#0d1e0d]/10 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Profile</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-2 mb-4 text-[#f0f4f0]">
            Professional Profile
          </h2>
          <div className="w-12 h-[2px] bg-primary mx-auto" />
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4 font-light">
            Connecting the dots from edge processors to secure serverless systems.
          </p>
        </div>

        {/* Vertical Timeline / Path */}
        <div className="relative mt-16 pb-12">
          {/* Central Vertical Trail Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-muted/20 z-0">
            <div 
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top scale-y-0"
            />
          </div>

          {/* Path Stone Cards */}
          <div className="space-y-24 relative z-10">
            {stones.map((stone, idx) => (
              <div 
                key={idx}
                className={`flex flex-col md:flex-row items-center w-full ${
                  idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div 
                  className={`stone-card w-full md:w-[45%] p-6 md:p-8 rounded-xl glass-card relative transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 border border-border/40 ${
                    idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl mb-4 text-primary">
                    {stone.icon}
                  </div>
                  
                  {/* Card Title */}
                  <h3 className="text-lg md:text-xl font-bold font-display mb-2 text-foreground">
                    {stone.title}
                  </h3>
                  
                  {/* Card Body */}
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {stone.text}
                  </p>

                  {/* Decorative glowing marker on the timeline */}
                  <div className={`hidden md:block absolute top-10 w-4 h-4 rounded-full bg-primary border-4 border-background z-20 ${
                    idx % 2 === 0 
                      ? '-right-[calc(11.1%_+_8px)]' 
                      : '-left-[calc(11.1%_+_8px)]'
                  }`} />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Interactive Terminal Shell */}
        <div className="mt-28 max-w-3xl mx-auto relative z-20">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold font-display text-foreground mb-2">
              Interactive Profile Shell
            </h3>
            <p className="text-muted-foreground text-xs font-light">
              Query the developer database or run quick fact scripts using command line syntax.
            </p>
          </div>
          <Terminal />
        </div>

      </div>
    </section>
  );
};
export default About;
