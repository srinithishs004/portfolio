import { useEffect, useState } from 'react';

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Helper to get chapter name based on scroll position
export const getChapterName = (progress: number): string => {
  if (progress < 0.11) return '👤 Sri Nithish';
  if (progress < 0.22) return '🌿 About Me';
  if (progress < 0.33) return '☁️ Skills & Expertise';
  if (progress < 0.44) return '📜 Certifications';
  if (progress < 0.55) return '🤝 Open Source Contributions';
  if (progress < 0.66) return '🌊 Case Studies';
  if (progress < 0.77) return '🔥 Leadership & Achievements';
  if (progress < 0.88) return '🎓 Education';
  return '🦋 Get in Touch';
};
