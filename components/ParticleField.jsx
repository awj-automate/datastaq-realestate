'use client';

import { useEffect, useRef } from 'react';

/**
 * Canvas particle field with subtle real-estate iconography —
 * drifting gold dots, tiny house silhouettes and map pins.
 * Particle count auto-scales down on mobile; honours
 * prefers-reduced-motion by rendering a single static frame.
 */
export default function ParticleField({ className = '', density = 1, theme = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles = [];

    const rand = (a, b) => a + Math.random() * (b - a);
    const goldRGB = theme === 'dark' ? '229,196,99' : '201,162,39';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = () => ({
      x: rand(0, w || 1),
      y: rand(0, h || 1),
      vx: rand(-0.16, 0.16),
      vy: rand(-0.3, -0.04),
      r: rand(1, 3.4),
      kind: Math.random(),
      alpha: rand(0.14, 0.6),
      tw: rand(0, Math.PI * 2),
      twSpeed: rand(0.006, 0.022),
    });

    const drawHouse = (x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + s, y - s * 0.1);
      ctx.lineTo(x + s * 0.66, y - s * 0.1);
      ctx.lineTo(x + s * 0.66, y + s * 0.8);
      ctx.lineTo(x - s * 0.66, y + s * 0.8);
      ctx.lineTo(x - s * 0.66, y - s * 0.1);
      ctx.lineTo(x - s, y - s * 0.1);
      ctx.closePath();
      ctx.stroke();
    };

    const drawPin = (x, y, s) => {
      ctx.beginPath();
      ctx.arc(x, y - s * 0.25, s * 0.6, Math.PI * 0.15, Math.PI * 0.85, true);
      ctx.lineTo(x, y + s);
      ctx.closePath();
      ctx.stroke();
    };

    const drawKey = (x, y, s) => {
      ctx.beginPath();
      ctx.arc(x - s * 0.4, y, s * 0.5, 0, Math.PI * 2);
      ctx.moveTo(x + s * 0.1, y);
      ctx.lineTo(x + s, y);
      ctx.moveTo(x + s * 0.7, y);
      ctx.lineTo(x + s * 0.7, y + s * 0.4);
      ctx.stroke();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.twSpeed;
        if (p.y < -14) {
          p.y = h + 14;
          p.x = rand(0, w);
        }
        if (p.x < -14) p.x = w + 14;
        if (p.x > w + 14) p.x = -14;

        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.tw));
        if (p.kind < 0.76) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${goldRGB},${a})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = `rgba(${goldRGB},${a})`;
          ctx.lineWidth = 1;
          ctx.lineJoin = 'round';
          const s = p.r * 2.6;
          if (p.kind < 0.86) drawHouse(p.x, p.y, s);
          else if (p.kind < 0.94) drawPin(p.x, p.y, s);
          else drawKey(p.x, p.y, s);
        }
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    const isMobile = window.innerWidth < 768;
    const count = Math.round((isMobile ? 16 : 46) * density);
    particles = Array.from({ length: count }, make);
    frame();

    window.addEventListener('resize', resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
