"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/content";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function OmGlyph() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20 text-gold animate-pulse-slow md:h-24 md:w-24"
      aria-hidden="true"
    >
      <path
        d="M50 15 C35 15 25 25 25 38 C25 48 32 55 42 57 L42 70 C42 78 38 82 32 82 C28 82 25 79 25 75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M58 57 C68 55 75 48 75 38 C75 25 65 15 50 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="38" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M50 65 C50 65 55 72 50 82 C45 72 50 65 50 65"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30 88 Q50 92 70 88"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10 flex flex-col items-center gap-6">
        {reducedMotion ? (
          <>
            <OmGlyph />
            <h1 className="font-serif text-5xl font-light tracking-wide text-starlight md:text-7xl lg:text-8xl">
              {heroContent.title}
            </h1>
            <p className="max-w-xl text-lg text-starlightMuted md:text-xl">
              {heroContent.subline}
            </p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <OmGlyph />
            </motion.div>
            <motion.h1
              className="font-serif text-5xl font-light tracking-wide text-starlight md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {heroContent.title}
            </motion.h1>
            <motion.p
              className="max-w-xl text-lg text-starlightMuted md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              {heroContent.subline}
            </motion.p>
          </>
        )}
      </div>
      <ScrollIndicator />
    </section>
  );
}
