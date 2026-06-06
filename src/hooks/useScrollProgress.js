import { useEffect, useState } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

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
export const getChapterName = (progress) => {
  if (progress < 0.12) return '🌅 The Forest Awakens';
  if (progress < 0.25) return '🌿 The Path';
  if (progress < 0.38) return '☁️ The Cloud Grove';
  if (progress < 0.51) return '🏕️ Campfire Stories';
  if (progress < 0.64) return '🌊 River of Projects';
  if (progress < 0.77) return '⚡ The Signal Tower';
  if (progress < 0.90) return '🦋 The Clearing';
  return '🌙 Night Falls';
};
