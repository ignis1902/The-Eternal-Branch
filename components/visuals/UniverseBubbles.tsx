"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxLife: number;
  life: number;
  vx: number;
  vy: number;
}

export default function UniverseBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnBubble = (width: number, height: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = reducedMotion ? 0 : 0.3 + Math.random() * 0.5;
      bubblesRef.current.push({
        x: width / 2 + (Math.random() - 0.5) * 40,
        y: height / 2 + (Math.random() - 0.5) * 40,
        radius: 2 + Math.random() * 4,
        opacity: 0.6 + Math.random() * 0.4,
        maxLife: 8000 + Math.random() * 4000,
        life: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      });
    };

    let lastSpawn = 0;

    const animate = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!reducedMotion && time - lastSpawn > 400) {
        spawnBubble(width, height);
        lastSpawn = time;
      }

      ctx.clearRect(0, 0, width, height);

      bubblesRef.current = bubblesRef.current.filter((b) => {
        b.life += 16;
        b.x += b.vx;
        b.y += b.vy;

        const progress = b.life / b.maxLife;
        const fadeOpacity = b.opacity * (1 - progress);

        if (fadeOpacity <= 0) return false;

        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius * 3);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${fadeOpacity})`);
        gradient.addColorStop(0.5, `rgba(106, 13, 173, ${fadeOpacity * 0.5})`);
        gradient.addColorStop(1, "rgba(106, 13, 173, 0)");

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (reducedMotion) {
      for (let i = 0; i < 8; i++) spawnBubble(canvas.clientWidth, canvas.clientHeight);
      animate(0);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
