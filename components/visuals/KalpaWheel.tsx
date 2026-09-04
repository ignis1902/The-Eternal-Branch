"use client";

import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { breathOfBrahmaContent } from "@/lib/content";

export default function KalpaWheel() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const phases = breathOfBrahmaContent.kalpaPhases;

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-xs md:max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full ${reducedMotion || paused ? "" : "animate-rotate-slow"}`}
        role="img"
        aria-label="Kalpa cycle wheel showing Creation, Sustenance, Dissolution, and Rest"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="#4b0082" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#ff9933" strokeWidth="0.5" opacity="0.3" />

        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos(((angle - 90) * Math.PI) / 180)}
            y2={100 + 90 * Math.sin(((angle - 90) * Math.PI) / 180)}
            stroke="#b8b3d1"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        <circle cx="100" cy="100" r="6" fill="#d4af37" opacity="0.8" />

        {phases.map((phase) => {
          const rad = ((phase.angle - 90) * Math.PI) / 180;
          const labelX = 100 + 62 * Math.cos(rad);
          const labelY = 100 + 62 * Math.sin(rad);

          return (
            <text
              key={phase.label}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-starlight text-[8px] font-sans"
              style={{ fontSize: "8px" }}
            >
              {phase.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
