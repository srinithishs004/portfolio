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
  if (progress < 0.15) return '👤 Sri Nithish S';
  if (progress < 0.35) return '🌿 Professional Profile';
  if (progress < 0.55) return '☁️ Technical Expertise';
  if (progress < 0.75) return '🔥 Career Milestones';
  if (progress < 0.92) return '🌊 Featured Projects';
  if (progress < 0.98) return '🦋 Get in Touch';
  return '🌙 Starry Sky';
};
