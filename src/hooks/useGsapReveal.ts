import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal() {
  useEffect(() => {
    document.body.setAttribute('data-js', 'true');

    // Small delay so DOM is fully painted
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-reveal]');

      elements.forEach((el) => {
        const type = el.getAttribute('data-reveal') || 'up';
        const delayAttr = el.getAttribute('data-delay');
        const delay = delayAttr ? parseFloat(delayAttr) : 0;
        const staggerAttr = el.getAttribute('data-stagger');

        // Set initial state
        const fromVars: gsap.TweenVars = { opacity: 0 };
        const toVars: gsap.TweenVars = {
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        };

        if (type === 'up') {
          fromVars.y = 56;
          toVars.y = 0;
        } else if (type === 'left') {
          fromVars.x = -48;
          toVars.x = 0;
        } else if (type === 'right') {
          fromVars.x = 48;
          toVars.x = 0;
        } else if (type === 'scale') {
          fromVars.scale = 0.92;
          fromVars.y = 20;
          toVars.scale = 1;
          toVars.y = 0;
        } else if (type === 'fade') {
          fromVars.y = 8;
          toVars.y = 0;
        }

        // Stagger children if data-stagger is set
        if (staggerAttr) {
          const children = Array.from(el.children);
          gsap.set(children, fromVars);
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(children, {
                ...toVars,
                stagger: parseFloat(staggerAttr),
              });
            },
          });
        } else {
          gsap.set(el, fromVars);
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(el, toVars);
            },
          });
        }
      });

      // Line reveal elements
      document.querySelectorAll('[data-reveal-line]').forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || '0');
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = el.getAttribute('data-inline') ? 'inline-block' : 'block';
        el.parentNode?.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        gsap.set(el, { y: '110%' });
        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              y: '0%',
              duration: 0.85,
              delay,
              ease: 'power4.out',
            });
          },
        });
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
