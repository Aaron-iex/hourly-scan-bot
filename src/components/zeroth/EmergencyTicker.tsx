import { Zap, AlertTriangle, Radio, Cpu } from "lucide-react";

const ALERTS = [
  "JAYA ENGINEERING COLLEGE // DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING",
  "PRESENTS // MAKEATHON — PROJECT ZEROTH HOUR",
  "5-HOUR SPRINT — EMBEDDED · DSP · RF · VLSI · OPEN INNOVATION",
  "EVENT DATE: SEPT 17 // REGISTRATION: ₹200 PER SQUAD — QUEUE IS OPEN",
  "CLEARANCE PASSES ISSUING — DEFCON 1 PROTOCOL ACTIVE — ENLIST NOW",
  "OVERALL PRIZE CACHE: ₹22,000 INR UNLOCKED FOR ECE SURVIVAL TECH",
];

export function EmergencyTicker() {
  const line = [...ALERTS, ...ALERTS];

  return (
    <div className="relative flex h-10 items-center overflow-hidden border-b border-primary/50 bg-primary/15 backdrop-blur-sm">
      {/* Glowing left badge */}
      <div className="z-10 flex h-full shrink-0 items-center gap-2 bg-primary px-3.5 text-primary-foreground shadow-[4px_0_16px_rgba(224,76,17,0.4)]">
        <Radio className="size-3.5 animate-pulse" aria-hidden />
        <span className="font-mono-tech text-[10px] font-bold tracking-[0.22em]">LIVE</span>
      </div>

      {/* Scrolling ticker */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left + right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background/30 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background/30 to-transparent z-10" />

        <div className="flex w-max animate-ticker items-center">
          {line.map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap px-6 font-mono-tech text-[11px] tracking-[0.18em]"
            >
              {i % 3 === 0 ? (
                <Zap className="size-3 text-accent shrink-0" aria-hidden />
              ) : i % 3 === 1 ? (
                <AlertTriangle className="size-3 text-primary shrink-0" aria-hidden />
              ) : (
                <Cpu className="size-3 text-primary/70 shrink-0" aria-hidden />
              )}
              <span className={i % 2 === 0 ? "text-accent" : "text-foreground/80"}>
                {text}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Right accent */}
      <div className="z-10 flex h-full shrink-0 items-center px-2.5 border-l border-primary/40 bg-primary/10">
        <span className="font-mono-tech text-[9px] tracking-[0.2em] text-primary font-bold">ECE</span>
      </div>
    </div>
  );
}
