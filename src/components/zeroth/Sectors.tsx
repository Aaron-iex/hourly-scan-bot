import { Anchor, Flame, Rocket, Waves, Zap, type LucideIcon, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/zeroth";

const ICONS = {
  waves: Waves,
  flame: Flame,
  rocket: Rocket,
  anchor: Anchor,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

const TRACK_COLORS = [
  { accent: "oklch(0.7 0.22 205)", glow: "rgba(56,182,255,0.25)", border: "rgba(56,182,255,0.4)" },
  { accent: "oklch(0.61 0.22 35)", glow: "rgba(224,76,17,0.25)",  border: "rgba(224,76,17,0.4)" },
  { accent: "oklch(0.72 0.2 140)", glow: "rgba(74,222,128,0.25)", border: "rgba(74,222,128,0.4)" },
  { accent: "oklch(0.85 0.18 90)", glow: "rgba(234,179,8,0.25)",  border: "rgba(234,179,8,0.4)"  },
  { accent: "oklch(0.7 0.2 300)",  glow: "rgba(192,132,252,0.25)",border: "rgba(192,132,252,0.4)"},
];

export function Sectors({ onRegister }: { onRegister: (track: string) => void }) {
  return (
    <section id="sectors" className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block h-px w-8 bg-primary" />
          <span className="font-mono-tech text-[11px] tracking-[0.28em] text-primary uppercase">
            // THREAT SECTORS
          </span>
        </div>
        <h2 className="font-display text-3xl font-black uppercase sm:text-5xl leading-tight">
          Five fronts of{" "}
          <span className="text-alert-gradient glitch-text inline-block">Planetary Defence</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Pick a threat sector at enlistment. Each sector features its own dedicated challenges,
          mentor pool, and judging rubric.
        </p>
      </div>

      {/* Prize Banner */}
      <div className="relative mt-8 overflow-hidden border border-accent/50 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 px-5 py-4 clip-tactical">
        <div className="absolute inset-0 grid-tactical opacity-20" />
        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-accent animate-pulse" aria-hidden />
            <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.2em] text-accent font-bold uppercase">
              Overall Prize Cache
            </span>
          </div>
          {[
            { pos: "1ST", amt: "₹10,000" },
            { pos: "2ND", amt: "₹7,000" },
            { pos: "3RD", amt: "₹5,000" },
          ].map(({ pos, amt }) => (
            <div key={pos} className="flex items-baseline gap-1.5">
              <span className="font-mono-tech text-[9px] text-muted-foreground">{pos}</span>
              <span className="font-display text-lg sm:text-xl font-black text-alert-gradient">{amt}</span>
            </div>
          ))}
          <span className="font-mono-tech text-[9px] text-muted-foreground text-center">
            TOP 3 OVERALL · IRRESPECTIVE OF SECTOR
          </span>
        </div>
      </div>

      {/* Track Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track, idx) => {
          const Icon = ICONS[track.icon];
          const color = TRACK_COLORS[idx % TRACK_COLORS.length]!;
          return (
            <article
              key={track.id}
              className="group relative overflow-hidden panel-tactical flex flex-col p-6 transition-all duration-500
                         hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                         cursor-pointer"
              style={{
                "--track-glow": color.glow,
                "--track-border": color.border,
              } as React.CSSProperties}
            >
              {/* Animated background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${color.glow} 0%, transparent 65%)` }}
              />

              {/* Animated corner accent */}
              <div
                className="absolute top-0 right-0 size-16 opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(225deg, ${color.border} 0%, transparent 60%)`,
                }}
              />

              <div className="relative flex items-center justify-between">
                {/* Icon with animated ring */}
                <div className="relative">
                  <div
                    className="grid size-12 place-items-center border-2 transition-all duration-300
                               group-hover:scale-110"
                    style={{
                      borderColor: color.border,
                      background: `color-mix(in oklab, ${color.accent} 12%, transparent)`,
                      color: color.accent,
                      boxShadow: `0 0 0 0 ${color.glow}`,
                    }}
                  >
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </div>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 rounded-sm border"
                    style={{ borderColor: color.border }}
                  />
                </div>

                <span
                  className="font-mono-tech text-[10px] tracking-[0.2em] transition-colors duration-300"
                  style={{ color: `color-mix(in oklab, ${color.accent} 70%, var(--muted-foreground))` }}
                >
                  {track.code}
                </span>
              </div>

              <h3
                className="relative mt-5 font-display text-lg font-bold transition-all duration-300 group-hover:translate-x-1"
                style={{ color: `color-mix(in oklab, ${color.accent} 0%, var(--foreground))` }}
              >
                <span className="group-hover:hidden">{track.title}</span>
                <span
                  className="hidden group-hover:inline shimmer-text"
                  style={{
                    background: `linear-gradient(90deg, var(--foreground) 0%, ${color.accent} 50%, var(--foreground) 100%)`,
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    animation: "shimmer 1.8s linear infinite",
                  }}
                >
                  {track.title}
                </span>
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {track.brief}
              </p>

              <div
                className="relative mt-5 flex items-center justify-between border-t pt-4 transition-colors duration-300"
                style={{ borderColor: `color-mix(in oklab, ${color.border} 40%, var(--border))` }}
              >
                <span
                  className="font-mono-tech text-[10px] tracking-[0.2em] font-bold transition-colors duration-300"
                  style={{ color: color.accent }}
                >
                  {track.threat}
                </span>
                <button
                  onClick={() => onRegister(track.title)}
                  className="flex items-center gap-1 font-mono-tech text-[10px] tracking-[0.15em] uppercase transition-all duration-300 hover:gap-2"
                  style={{ color: color.accent }}
                >
                  Deploy here
                  <ChevronRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}

        {/* Wild card article */}
        <article className="relative overflow-hidden panel-tactical flex flex-col justify-center gap-4 p-6 text-center
                            group hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-primary/30">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
               style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(224,76,17,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <div className="mx-auto mb-2 size-14 grid place-items-center border-2 border-primary/40 bg-primary/10 group-hover:border-primary group-hover:bg-primary/20 transition-all duration-300">
              <Flame className="size-7 text-primary animate-pulse" aria-hidden />
            </div>
            <h3 className="font-display text-xl font-black uppercase text-alert-gradient">
              Undecided operative?
            </h3>
          </div>
          <p className="relative text-sm text-muted-foreground max-w-xs mx-auto">
            Enlist without a sector — squad matching assigns you where the signal is strongest.
          </p>
          <Button variant="alert" onClick={() => onRegister("")} className="relative w-full group-hover:shadow-[0_0_20px_rgba(224,76,17,0.4)] transition-shadow duration-300">
            Enlist now
          </Button>
        </article>
      </div>
    </section>
  );
}
