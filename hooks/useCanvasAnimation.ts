"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseCanvasAnimationOptions {
  enabled?: boolean;
  onFrame: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    deltaTime: number
  ) => void;
}

export function useCanvasAnimation({
  enabled = true,
  onFrame,
}: UseCanvasAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const onFrameRef = useRef(onFrame);

  onFrameRef.current = onFrame;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (time: number) => {
      const deltaTime = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;
      onFrameRef.current(ctx, canvas, deltaTime);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [enabled, resizeCanvas]);

  return canvasRef;
}
