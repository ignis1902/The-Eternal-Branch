"use client";

import { useMemo } from "react";
import { useCanvasAnimation } from "@/hooks/useCanvasAnimation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

function getParticleCount(width: number): number {
  if (width < 480) return 100;
  if (width < 768) return 150;
  if (width < 1024) return 200;
  return 250;
}

export default function StarfieldBackground() {
  const reducedMotion = useReducedMotion();

  const particlesRef = useMemo<{ current: Particle[] }>(() => ({ current: [] }), []);
  const initializedRef = useMemo<{ current: boolean }>(() => ({ current: false }), []);

  const canvasRef = useCanvasAnimation({
    enabled: !reducedMotion,
    onFrame: (ctx, canvas, _deltaTime) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!initializedRef.current) {
        const count = getParticleCount(width);
        particlesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
        }));
        initializedRef.current = true;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 243, 255, ${p.opacity})`;
        ctx.fill();
      }
    },
  });

  // Static render for reduced motion
  const staticCanvasRef = useCanvasAnimation({
    enabled: reducedMotion,
    onFrame: (ctx, canvas) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!initializedRef.current) {
        const count = getParticleCount(width);
        particlesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          vx: 0,
          vy: 0,
        }));
        initializedRef.current = true;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 243, 255, ${p.opacity})`;
        ctx.fill();
      }
    },
  });

  const ref = reducedMotion ? staticCanvasRef : canvasRef;

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40"
      aria-hidden="true"
    />
  );
}
