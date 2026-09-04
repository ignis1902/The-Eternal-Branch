"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reflectionContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Reflection() {
  const [text, setText] = useState("");
  const [releasing, setReleasing] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleRelease = () => {
    if (!text.trim() || releasing) return;

    // No data is stored or transmitted — this is a purely visual/local interaction by design.
    setReleasing(true);

    setTimeout(() => {
      setText("");
      setReleasing(false);
    }, reducedMotion ? 100 : 1200);
  };

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <h2 className="mb-8 font-serif text-3xl font-light text-gold md:text-4xl">
            {reflectionContent.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {reflectionContent.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-starlightMuted md:text-xl">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.3}>
          <div className="relative mt-12">
            <AnimatePresence mode="wait">
              {!releasing ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 1 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -20, scale: 0.98 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={reflectionContent.placeholder}
                    rows={4}
                    className="w-full resize-none border-0 border-b border-starlightMuted/30 bg-transparent px-0 py-3 text-lg text-starlight placeholder:text-starlightMuted/50 focus:border-gold focus:outline-none focus-visible:ring-0"
                    aria-label="Reflection textarea"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="released"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center text-starlightMuted italic"
                >
                  ...
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleRelease}
              disabled={!text.trim() || releasing}
              className="mt-6 rounded border border-gold/40 px-6 py-2 text-sm uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              {reflectionContent.releaseButton}
            </button>
            <p className="mt-4 text-xs text-starlightMuted/60">
              {reflectionContent.releaseHint}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
