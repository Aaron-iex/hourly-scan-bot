import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const FRAMES = [
  { label: "SEISMIC BREACH", sub: "FAULT LINE RUPTURE", cls: "from-primary/45 via-black to-black" },
  { label: "TSUNAMI SURGE", sub: "COASTAL GRID LOST", cls: "from-blue-600/40 via-black to-black" },
  { label: "FIRESTORM", sub: "WILDFIRE UNCONTAINED", cls: "from-accent/40 via-primary/25 to-black" },
  { label: "BLACKOUT", sub: "GLOBAL COMMS DOWN", cls: "from-neutral-900 via-black to-black" },
  { label: "ZEROTH HOUR", sub: "PROTOCOL INITIATED", cls: "from-primary/55 via-black to-black" },
];

const FRAME_MS = 280;
export const INTRO_KEY = "zh-intro-seen-v2";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [frame, setFrame] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Check if user already saw intro in this session or prefers reduced motion
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem(INTRO_KEY);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (alreadySeen || prefersReduced) {
        onComplete();
        return;
      }
    }

    if (frame < FRAMES.length) {
      const id = setTimeout(() => setFrame((f) => f + 1), FRAME_MS);
      return () => clearTimeout(id);
    }

    // Finished sequence
    setLeaving(true);
    try {
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      // ignore storage errors
    }
    const id = setTimeout(onComplete, 450);
    return () => clearTimeout(id);
  }, [frame, onComplete]);

  const active = FRAMES[Math.min(frame, FRAMES.length - 1)]!;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background transition-all duration-500 pointer-events-none ${
        leaving ? "opacity-0 scale-[1.03]" : "opacity-100"
      }`}
      aria-hidden
    >
      <div key={frame} className={`absolute inset-0 animate-rise bg-gradient-to-b ${active.cls}`} />
      <div className="absolute inset-0 grid-tactical opacity-20" />
      <div className="absolute inset-0 scanlines opacity-50" />

      {/* Shutter wipe border effect */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-primary/80 transition-all duration-300 ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="relative flex flex-col items-center px-6 text-center z-10">
        <AlertTriangle className="mb-4 size-10 text-primary animate-pulse sm:size-14" />
        <p
          key={`t-${frame}`}
          className="animate-slide-x font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-5xl"
        >
          {active.label}
        </p>
        <p
          key={`s-${frame}`}
          className="animate-slide-x mt-2 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-primary sm:text-xs font-bold"
        >
          {active.sub}
        </p>

        <div className="mt-6 h-1 w-48 overflow-hidden bg-border/60 rounded-full sm:w-64">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200 ease-linear rounded-full"
            style={{ width: `${(Math.min(frame + 1, FRAMES.length) / FRAMES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
