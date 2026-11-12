'use client';

import { useEffect, useRef } from 'react';
import { arcCards } from '@/lib/data';

/** Лента карточек, которые плывут по дуге (как в hero референса). */
export default function ArcCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLDivElement>('.arc-card'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let gap = 0;
    let total = 1;
    let offset = 0;
    let last = performance.now();
    let paused = false;
    let raf = 0;

    const measure = () => {
      width = root.clientWidth;
      const cw = width < 600 ? 112 : 150;
      cards.forEach((c) => {
        c.style.width = `${cw}px`;
        c.style.height = `${cw * 1.27}px`;
        c.style.marginLeft = `${-cw / 2}px`;
      });
      gap = cw + (width < 600 ? 10 : 14);
      total = gap * cards.length;
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!paused && !reduce) offset = (offset + dt * 0.035) % total;
      const half = width / 2;
      const curve = width < 600 ? 0.0011 : 0.00042;
      cards.forEach((c, i) => {
        const x = (((i * gap - offset) % total) + total) % total - total / 2;
        const y = curve * x * x;
        const rot = (Math.atan(2 * curve * x) * 180) / Math.PI;
        c.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`;
        c.style.visibility = Math.abs(x) < half + gap ? 'visible' : 'hidden';
      });
      raf = requestAnimationFrame(frame);
    };

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    measure();
    window.addEventListener('resize', measure);
    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      root.removeEventListener('mouseenter', pause);
      root.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <div className="arc" ref={rootRef} aria-hidden="true">
      {arcCards.map((c) => (
        <div key={c.img} className={`arc-card${c.product ? ' product' : ''}`}>
          <img src={c.img} alt="" />
          <span className="tag">{c.tag}</span>
        </div>
      ))}
    </div>
  );
}
