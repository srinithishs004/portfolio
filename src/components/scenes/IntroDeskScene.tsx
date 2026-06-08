import React, { useEffect, useRef, useState } from 'react';
import { createTimeline, Timeline } from 'animejs';

export const IntroDeskScene: React.FC = () => {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const lampGlowRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [zoomProgress, setZoomProgress] = useState(0);
  const timelineRef = useRef<Timeline | null>(null);

  // Zoom completes when scroll reaches 1.0 (scrollY = innerHeight)
  const isZoomed = zoomProgress >= 1.0;

  useEffect(() => {
    // Scroll listener for the zoom phase
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
      setZoomProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Define the Anime.js timeline
    const timeline = createTimeline({
      autoplay: false,
      duration: 1000,
      easing: 'easeOutQuad'
    });

    // 1. Zoom and translate the workspace to center on the monitor
    timeline.add({
      targets: workspaceRef.current,
      scale: [1, 5.0],
      translateY: ['0%', '30%'],
      duration: 1000,
    }, 0);

    // 2. Fade out desk & person silhouettes
    timeline.add({
      targets: [deskRef.current, personRef.current],
      opacity: [1, 0],
      duration: 700,
    }, 0);

    timeline.add({
      targets: lampGlowRef.current,
      opacity: [0.15, 0],
      duration: 600,
    }, 0);

    // 3. Fade out monitor borders
    timeline.add({
      targets: monitorRef.current,
      borderColor: ['rgba(38, 38, 38, 1)', 'rgba(38, 38, 38, 0)'],
      backgroundColor: ['rgba(10, 10, 10, 1)', 'rgba(0, 0, 0, 0)'],
      boxShadow: [
        '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(74, 253, 56, 0.05)',
        '0 0px 0px rgba(0, 0, 0, 0), 0 0 0px rgba(0, 0, 0, 0)'
      ],
      duration: 800,
    }, 100);

    // 4. Fade to solid color transition flash
    timeline.add({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 300,
    }, 700);

    timelineRef.current = timeline;
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(zoomProgress * 1000);
    }
  }, [zoomProgress]);

  return (
    <div 
      className={`fixed inset-0 w-full h-full z-40 flex items-center justify-center overflow-hidden transition-all duration-500 ${
        isZoomed ? 'pointer-events-none opacity-0 invisible' : 'pointer-events-auto opacity-100 visible'
      }`}
      style={{
        backgroundColor: '#0a0a0c',
      }}
    >
      {/* Outer workspace wrapper that scales up */}
      <div 
        ref={workspaceRef}
        className="relative w-[1200px] h-[800px] flex flex-col items-center justify-end pb-24 origin-[50%_38%]"
      >
        {/* Ambient Lamp Cone Glow */}
        <div 
          ref={lampGlowRef}
          className="absolute top-[25%] left-[5%] w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[90px] pointer-events-none z-0"
        />

        {/* Anglepoise Desk Lamp */}
        <div ref={deskRef} className="absolute bottom-[28%] left-[10%] w-32 h-64 z-10 flex flex-col items-center origin-bottom select-none">
          <div className="w-12 h-3 bg-neutral-800 rounded-t-sm shadow-md" />
          <div className="w-1.5 h-24 bg-neutral-700 transform rotate-[20deg] origin-bottom -mt-1" />
          <div className="w-1.5 h-24 bg-neutral-700 transform -rotate-[45deg] origin-bottom -mt-1 ml-4" />
          <div className="w-10 h-10 bg-neutral-600 rounded-full border border-neutral-700 transform rotate-[105deg] ml-8 -mt-2 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-amber-200 shadow-inner" />
          </div>
          <div 
            className="absolute top-[50%] left-[100%] w-[400px] h-[300px] bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent origin-left opacity-80"
            style={{
              clipPath: 'polygon(0 0, 100% 40%, 100% 80%, 0 20%)',
            }}
          />
        </div>

        {/* The Desk Surface */}
        <div 
          ref={deskRef}
          className="absolute bottom-0 w-full h-[32%] bg-[#121215] border-t border-white/10 shadow-2xl flex flex-col items-center justify-start pt-6 z-20"
        >
          {/* Keyboard */}
          <div className="w-96 h-6 bg-neutral-800 rounded-md border border-neutral-700 flex items-center justify-between px-3 shadow-md">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-3 h-2 bg-neutral-900 rounded-xs opacity-70"></div>
            ))}
          </div>

          {/* Mouse & pad */}
          <div className="absolute right-[22%] top-6 w-12 h-8 bg-neutral-900 rounded-md border border-neutral-800 shadow-inner flex items-center justify-center">
            <div className="w-4 h-6 bg-neutral-800 rounded-full border border-neutral-700"></div>
          </div>

          {/* Cozy Coffee Mug */}
          <div className="absolute left-[24%] top-3 w-7 h-9 bg-[#2e1c0c] rounded-md border border-[#3e2c1c] shadow-md flex flex-col items-center justify-between py-1 group select-none">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 opacity-40 flex justify-between">
              <span className="w-0.5 h-3 bg-white/20 rounded-full animate-bounce duration-[1500ms]" />
              <span className="w-0.5 h-3 bg-white/20 rounded-full animate-bounce duration-[2000ms] delay-200" />
              <span className="w-0.5 h-3 bg-white/20 rounded-full animate-bounce duration-[1200ms] delay-400" />
            </div>
            <div className="w-1.5 h-4 border-r-2 border-t-2 border-b-2 border-[#3e2c1c] rounded-r-md absolute -right-2 top-2.5" />
          </div>
        </div>

        {/* ========== THE MAIN COMPUTER MONITOR ========== */}
        <div 
          ref={monitorRef}
          className="relative w-[600px] h-[380px] bg-neutral-950 rounded-2xl border-[10px] border-neutral-800 shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
        >
          <div 
            ref={screenContentRef}
            className="w-full h-full relative overflow-hidden bg-[#0d0d10]"
          >
            {/* Code lines typing terminal preview */}
            <div className="absolute inset-0 p-6 flex flex-col gap-2 font-mono text-[9px] text-[#2dfd38]/70 select-none">
              <div className="flex gap-2 text-white/40">
                <span>srinithish:~$</span>
                <span className="text-[#a855f7]">run portfolio.sh</span>
              </div>
              <div>&gt; Initializing cloud systems... OK</div>
              <div>&gt; Mapping edge telemetry... OK</div>
              <div>&gt; Spawning intelligent agents... OK</div>
              <div className="text-white font-bold text-xs mt-6 tracking-wide drop-shadow-md">
                SRI NITHISH
              </div>
              <div className="text-[#8cc8f8] text-[8px] uppercase tracking-widest mt-0.5">
                Software Engineer · Cloud Infrastructure
              </div>
              
              <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-primary/10 border-t-primary/55 animate-spin duration-[3000ms]"></div>
              </div>
            </div>

            <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Monitor Stand */}
        <div ref={deskRef} className="w-20 h-24 bg-neutral-700 shadow-lg relative -mt-0.5 z-0 flex flex-col justify-end items-center">
          <div className="w-48 h-2.5 bg-neutral-800 rounded-t-sm shadow-md" />
        </div>

        {/* ========== CHAIR & PERSON SILHOUETTE ========== */}
        <div 
          ref={personRef}
          className="absolute bottom-[-15%] w-80 h-[380px] flex flex-col items-center justify-start z-30 select-none pointer-events-none"
        >
          <div className="w-28 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-md" />
          <div className="w-4 h-6 bg-neutral-800 shadow-inner" />
          <div className="relative w-44 h-48 bg-neutral-950 rounded-t-[50px] shadow-2xl flex flex-col items-center pt-2">
            <div className="w-36 h-28 bg-[#030303] rounded-t-[40px] absolute top-[-6px]" />
            <div className="w-4 h-6 bg-neutral-950 rounded-full absolute left-3 top-16 transform -rotate-12" />
            <div className="w-4 h-6 bg-neutral-950 rounded-full absolute right-3 top-16 transform rotate-12" />
          </div>
          <div className="w-64 h-48 bg-neutral-900 border border-neutral-800 rounded-t-[40px] shadow-2xl -mt-24" />
        </div>

      </div>

      {/* Screen flash transition overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#0d0d10] z-50 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default IntroDeskScene;
