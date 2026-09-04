"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1;
      setVisible(window.scrollY < threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-starlightMuted transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <ChevronDown
        className={`h-5 w-5 ${reducedMotion ? "" : "animate-bounce-gentle"}`}
      />
    </div>
  );
}
