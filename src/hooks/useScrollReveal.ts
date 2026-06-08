import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Signal to CSS that JS is active (progressive enhancement)
    document.body.setAttribute('data-js', 'true');

    const show = (el: Element) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delayStr = (entry.target as HTMLElement).dataset.delay || '0';
            const delayMs = parseFloat(delayStr) * 1000;
            setTimeout(() => show(entry.target), delayMs);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const attach = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        observer.observe(el);
      });
    };

    // Small timeout to let React paint DOM
    const t1 = setTimeout(attach, 80);

    // Safety fallback: show everything after 2.5 seconds
    const t2 = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(show);
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, []);
}
