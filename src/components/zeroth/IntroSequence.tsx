import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const FRAMES = [
  { label: "SEISMIC BREACH", sub: "FAULT LINE RUPTURE", cls: "from-primary/45 via-black to-black" },
  { label: "TSUNAMI SURGE", sub: "COASTAL GRID LOST", cls: "from-chart-1/40 via-black to-black" },
  { label: "FIRESTORM", sub: "WILDFIRE UNCONTAINED", cls: "from-accent/40 via-primary/25 to-black" },
  { label: "BLACKOUT", sub: "GLOBAL COMMS DOWN", cls: "from-black via-black to-black" },
  { label: "ZEROTH HOUR", sub: "PROTOCOL INITIATED", cls: "from-primary/55 via-black to-black" },
];

const FRAME_MS = 260;

export const INTRO_KEY = "zh-intro-seen";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [frame, setFrame] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (frame < FRAMES.length) {
      const id = setTimeout(() => setFrame((f) => f + 1), FRAME_MS);
      return () => clearTimeout(id);
    }
    setLeaving(true);
    const id = setTimeout(onComplete, 420);
    return () => clearTimeout(id);
  }, [frame, onComplete]);

  const active = FRAMES[Math.min(frame, FRAMES.length - 1)]!;

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-background transition-all duration-400 ${
        leaving ? "opacity-0 scale-[1.04]" : "opacity-100"
      }`}
      aria-hidden
    >
      <div key={frame} className={`absolute inset-0 animate-rise bg-gradient-to-b ${active.cls}`} />
      <div className="absolute inset-0 grid-tactical opacity-20" />
      <div className="absolute inset-0 scanlines opacity-50" />

      {/* shutter wipe */}
      <div
        className={`absolute inset-x-0 top-0 bg-background transition-all duration-400 ${
          leaving ? "h-0" : "h-0"
        }`}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <AlertTriangle className="mb-4 size-8 text-primary sm:size-12" />
        <p
          key={`t-${frame}`}
          className="animate-slide-x font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-5xl"
        >
          {active.label}
        </p>
        <p
          key={`s-${frame}`}
          className="animate-slide-x mt-2 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-primary sm:text-xs"
        >
          {active.sub}
        </p>

        <div className="mt-6 h-px w-40 overflow-hidden bg-border sm:w-64">
          <div
            className="h-full bg-primary transition-all duration-200 ease-linear"
            style={{ width: `${(Math.min(frame + 1, FRAMES.length) / FRAMES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
