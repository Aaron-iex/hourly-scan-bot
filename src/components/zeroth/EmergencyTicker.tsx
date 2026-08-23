import { TriangleAlert as AlertTriangle, Radio } from "lucide-react";

const ALERTS = [
  "PRIORITY BROADCAST // BUILD MODE ACTIVE",
  "ECE HACKATHON — EMBEDDED · DSP · RF · VLSI · OPEN INNOVATION",
  "EVENT DATE: SEPT 11 | 5-HOUR SPRINT — DETAILED TIMELINE TBA",
  "SQUAD REGISTRATION QUEUE IS OPEN — CLEARANCE PASSES ISSUING",
  "OVERALL PRIZE CACHE: 22,000 INR UNLOCKED FOR ECE SURVIVAL TECH",
];

export function EmergencyTicker() {
  const line = [...ALERTS, ...ALERTS];

  return (
    <div className="relative flex h-9 items-center overflow-hidden border-b border-primary/40 bg-primary/12">
      <div className="z-10 flex h-full shrink-0 items-center gap-2 bg-primary px-3 text-primary-foreground">
        <Radio className="size-3.5 animate-pulse" aria-hidden />
        <span className="font-mono-tech text-[10px] tracking-[0.2em]">LIVE</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-ticker items-center">
          {line.map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap px-6 font-mono-tech text-[11px] tracking-[0.18em] text-accent"
            >
              <AlertTriangle className="size-3 text-primary" aria-hidden />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
