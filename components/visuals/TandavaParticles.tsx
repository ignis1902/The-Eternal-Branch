"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: "dissolve" | "reform";
}

export default function TandavaParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
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

    let lastSpawn = 0;

    const spawnParticles = (width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height * 0.45;
      const reformX = width / 2 + 30;
      const reformY = height * 0.55;

      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1;
        particlesRef.current.push({
          x: centerX + (Math.random() - 0.5) * 20,
          y: centerY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          opacity: 0.8,
          life: 0,
          maxLife: 3000 + Math.random() * 2000,
          type: "dissolve",
        });
      }

      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 60;
        particlesRef.current.push({
          x: reformX + Math.cos(angle) * dist,
          y: reformY + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          opacity: 0,
          life: 0,
          maxLife: 3000 + Math.random() * 2000,
          type: "reform",
        });
      }
    };

    const animate = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2;
      const centerY = height * 0.45;
      const reformX = width / 2 + 30;
      const reformY = height * 0.55;

      if (!reducedMotion && time - lastSpawn > 300) {
        spawnParticles(width, height);
        lastSpawn = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Silhouette placeholder
      ctx.fillStyle = "rgba(75, 0, 130, 0.15)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 40, 60, 0, 0, Math.PI * 2);
      ctx.fill();

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += 16;
        const progress = p.life / p.maxLife;

        if (p.type === "dissolve") {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = 0.8 * (1 - progress);
        } else {
          const t = Math.min(progress * 1.5, 1);
          const startAngle = Math.atan2(p.y - reformY, p.x - reformX);
          const startDist = Math.hypot(p.x - reformX, p.y - reformY);
          const currentDist = startDist * (1 - t);
          p.x = reformX + Math.cos(startAngle) * currentDist;
          p.y = reformY + Math.sin(startAngle) * currentDist;
          p.opacity = t * 0.8;
        }

        if (p.opacity <= 0.01 && progress > 0.5) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle =
          p.type === "dissolve"
            ? `rgba(255, 153, 51, ${p.opacity})`
            : `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();

        return p.life < p.maxLife;
      });

      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (reducedMotion) {
      spawnParticles(canvas.clientWidth, canvas.clientHeight);
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
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
