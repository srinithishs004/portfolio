import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorTracker() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only on desktop (no touch)
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.setAttribute('data-custom-cursor', 'true');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const text = textRef.current!;

    // GSAP quickTo for buttery spring physics
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power2.out' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power2.out' });

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let isMagnetic = false;
    let magnetTarget: Element | null = null;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Magnetic pull
      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 80;

        if (dist < radius) {
          const pull = (radius - dist) / radius;
          const px = centerX + dx * (1 - pull * 0.35);
          const py = centerY + dy * (1 - pull * 0.35);
          moveDotX(px - window.innerWidth / 2);
          moveDotY(py - window.innerHeight / 2);
          moveRingX(px - window.innerWidth / 2);
          moveRingY(py - window.innerHeight / 2);
          gsap.to(magnetTarget, {
            x: dx * 0.3,
            y: dy * 0.3,
            duration: 0.4,
            ease: 'power2.out',
          });
          return;
        } else {
          gsap.to(magnetTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        }
      }

      moveDotX(mouseX - window.innerWidth / 2);
      moveDotY(mouseY - window.innerHeight / 2);
      moveRingX(mouseX - window.innerWidth / 2);
      moveRingY(mouseY - window.innerHeight / 2);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      const isLink = target.closest('a, button, [data-cursor-hover], [data-magnetic]');
      const isCard = target.closest('[data-cursor-card]');
      const isView = target.closest('[data-cursor-view]');

      if (isLink) {
        isHovering = true;
        ring.classList.add('cursor--hovering');
        if (isLink.getAttribute('data-magnetic') !== null || isLink.tagName === 'A' || isLink.tagName === 'BUTTON') {
          isMagnetic = true;
          magnetTarget = isLink;
        }
        // Show text in ring
        if (isView) {
          text.textContent = 'VIEW';
          ring.classList.add('cursor--has-text');
        } else {
          ring.classList.remove('cursor--has-text');
        }
      } else if (isCard) {
        ring.classList.add('cursor--card');
        text.textContent = 'VIEW';
        ring.classList.add('cursor--has-text');
      } else {
        isHovering = false;
        isMagnetic = false;
        magnetTarget = null;
        ring.classList.remove('cursor--hovering', 'cursor--card', 'cursor--has-text');
      }
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 });
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    };
    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.35, ease: 'elastic.out(1,0.4)' });
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'elastic.out(1,0.4)' });
    };

    const onMouseLeave = () => {
      isHovering = false;
      isMagnetic = false;
      magnetTarget = null;
      ring.classList.remove('cursor--hovering', 'cursor--card', 'cursor--has-text');
      if (magnetTarget) {
        gsap.to(magnetTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      }
    };

    // Set initial position to center (hidden offscreen before move)
    gsap.set([dot, ring], { x: -200, y: -200 });

    // Show cursor on first move
    let shown = false;
    const showCursor = () => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', showCursor, { once: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseleave', onMouseLeave, { capture: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseleave', onMouseLeave, { capture: true });
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.removeAttribute('data-custom-cursor');
      if (magnetTarget) {
        gsap.to(magnetTarget, { x: 0, y: 0 });
      }
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {/* Outer ring */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={textRef} className="cursor-ring__text" />
      </div>
    </>
  );
}
