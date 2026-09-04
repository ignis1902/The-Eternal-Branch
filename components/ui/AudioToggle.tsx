"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      try {
        await audio.play();
      } catch {
        // Autoplay may be blocked; keep muted state
        audio.muted = true;
        return;
      }
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      {/* Placeholder: replace /audio/ambient-drone.mp3 with a royalty-free ambient track */}
      <audio ref={audioRef} src="/audio/ambient-drone.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-voidDeep/80 text-starlight backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </>
  );
}
