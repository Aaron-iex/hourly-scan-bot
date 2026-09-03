import { Anchor, Flame, Rocket, Waves, Zap, type LucideIcon, ChevronRight, Trophy, Sparkles } from "lucide-react";
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
  { accent: "oklch(0.8 0.2 60)",   glow: "rgba(255,200,0,0.35)",  border: "rgba(255,200,0,0.6)" },
];

export function Sectors({ onRegister }: { onRegister: (track: string) => void }) {
  return (
    <section id="sectors" className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block h-px w-8 bg-primary" />
          <span className="font-mono-tech text-[11px] tracking-[0.28em] text-primary uppercase font-bold">
            // STUDENT MAKEATHON TRACKS
          </span>
        </div>
        <h2 className="font-display text-3xl font-black uppercase sm:text-5xl leading-tight">
          Choose Your Track:{" "}
          <span className="text-alert-gradient inline-block">Prediction, Prevention & Open Innovation</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Designed specifically for student developers & engineers. Pick a domain that matches your skills, or enter <strong className="text-accent">Open Innovation</strong> with your own hardware, software, IoT, or AI project!
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
            { pos: "1ST PRIZE", amt: "₹10,000" },
            { pos: "2ND PRIZE", amt: "₹7,000" },
            { pos: "3RD PRIZE", amt: "₹5,000" },
          ].map(({ pos, amt }) => (
            <div key={pos} className="flex items-baseline gap-1.5">
              <span className="font-mono-tech text-[9px] text-muted-foreground">{pos}</span>
              <span className="font-display text-lg sm:text-xl font-black text-alert-gradient">{amt}</span>
            </div>
          ))}
          <span className="font-mono-tech text-[9px] text-muted-foreground text-center">
            OPEN TO ALL DEPARTMENTS & COLLEGES
          </span>
        </div>
      </div>

      {/* Track Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track, idx) => {
          const Icon = ICONS[track.icon];
          const color = TRACK_COLORS[idx % TRACK_COLORS.length]!;
          const isFeatured = track.featured;

          return (
            <article
              key={track.id}
              onClick={() => onRegister(track.title)}
              className={`group relative overflow-hidden panel-tactical flex flex-col p-6 transition-all duration-500
                         hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                         cursor-pointer ${
                           isFeatured
                             ? "md:col-span-2 lg:col-span-1 border-2 border-accent/80 bg-accent/10 shadow-[0_0_30px_rgba(255,200,0,0.15)]"
                             : "border border-border"
                         }`}
              style={{
                "--track-glow": color.glow,
                "--track-border": color.border,
              } as React.CSSProperties}
            >
              {/* Featured Ribbon Header for Open Innovation */}
              {isFeatured && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground font-mono-tech text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 flex items-center gap-1 shadow-md z-10">
                  <Sparkles className="size-3 animate-spin" />
                  MOST POPULAR // BRING YOUR OWN IDEA
                </div>
              )}

              {/* Animated background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${color.glow} 0%, transparent 65%)` }}
              />

              <div className="relative flex items-center justify-between mt-1">
                {/* Icon with animated ring */}
                <div className="relative">
                  <div
                    className={`grid size-12 place-items-center border-2 transition-all duration-300 group-hover:scale-110 ${
                      isFeatured ? "bg-accent/20 border-accent text-accent" : ""
                    }`}
                    style={{
                      borderColor: color.border,
                      background: isFeatured ? "rgba(255,200,0,0.2)" : `color-mix(in oklab, ${color.accent} 12%, transparent)`,
                      color: color.accent,
                      boxShadow: isFeatured ? "0 0 15px rgba(255,200,0,0.3)" : `0 0 0 0 ${color.glow}`,
                    }}
                  >
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </div>
                </div>

                <span
                  className="font-mono-tech text-[10px] tracking-[0.2em] font-bold px-2 py-0.5 border border-primary/30 bg-primary/10 rounded-none uppercase"
                  style={{ color: color.accent }}
                >
                  {track.category}
                </span>
              </div>

              <h3
                className="relative mt-5 font-display text-lg font-bold transition-all duration-300 group-hover:translate-x-1"
                style={{ color: isFeatured ? "var(--accent)" : "var(--foreground)" }}
              >
                {track.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {track.brief}
              </p>

              <div
                className="relative mt-5 flex items-center justify-between border-t pt-4 transition-colors duration-300"
                style={{ borderColor: `color-mix(in oklab, ${color.border} 40%, var(--border))` }}
              >
                <span
                  className="font-mono-tech text-[10px] tracking-[0.18em] font-bold uppercase"
                  style={{ color: color.accent }}
                >
                  {track.threat}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister(track.title);
                  }}
                  className="flex items-center gap-1 font-mono-tech text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:gap-2"
                  style={{ color: color.accent }}
                >
                  Register track
                  <ChevronRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}

        {/* Quick Enlist card */}
        <article className="relative overflow-hidden panel-tactical flex flex-col justify-center gap-4 p-6 text-center
                            group hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-accent/40 bg-accent/5">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
               style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,200,0,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <div className="mx-auto mb-2 size-14 grid place-items-center border-2 border-accent/50 bg-accent/15 group-hover:border-accent group-hover:bg-accent/25 transition-all duration-300">
              <Zap className="size-7 text-accent animate-pulse" aria-hidden />
            </div>
            <h3 className="font-display text-xl font-black uppercase text-alert-gradient">
              Open Registration
            </h3>
          </div>
          <p className="relative text-sm text-muted-foreground max-w-xs mx-auto">
            Not sure which sector to choose? Register your team now and decide your track on the event day!
          </p>
          <Button variant="alert" onClick={() => onRegister("")} className="relative w-full group-hover:shadow-[0_0_20px_rgba(255,200,0,0.4)] transition-shadow duration-300 font-bold">
            Register Any Idea
          </Button>
        </article>
      </div>
    </section>
  );
}
