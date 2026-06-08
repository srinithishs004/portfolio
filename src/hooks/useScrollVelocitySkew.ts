import { useEffect } from 'react';
import gsap from 'gsap';

export function useScrollVelocitySkew() {
  useEffect(() => {
    const targets = document.querySelectorAll('.skew-target');
    if (targets.length === 0) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let velocity = 0;
    let currentSkew = 0;
    const maxSkew = 2.0;

    // Create setters for all targets
    const setters = Array.from(targets).map(t => gsap.quickSetter(t, 'skewY', 'deg'));

    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      velocity += (delta - velocity) * 0.1;
      const skew = Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.15));
      currentSkew += (skew - currentSkew) * 0.08;

      if (Math.abs(currentSkew) > 0.005) {
        setters.forEach(set => set(currentSkew));
      } else {
        setters.forEach(set => set(0));
        currentSkew = 0;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      // Reset skew on all targets
      setters.forEach(set => set(0));
    };
  }, []);
}
