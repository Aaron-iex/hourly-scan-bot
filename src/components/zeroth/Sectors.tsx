import { useState } from "react";
import { Anchor, Flame, Rocket, Waves, Zap, type LucideIcon, ChevronRight, Trophy, Sparkles, X, AlertTriangle, ShieldCheck, Cpu, Activity, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS, type Track } from "@/data/zeroth";

const ICONS = {
  waves: Waves,
  flame: Flame,
  rocket: Rocket,
  anchor: Anchor,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

const TRACK_COLORS = [
  { accent: "oklch(0.61 0.22 35)", glow: "rgba(224,76,17,0.25)", border: "rgba(224,76,17,0.5)" },
  { accent: "oklch(0.7 0.22 205)", glow: "rgba(56,182,255,0.25)", border: "rgba(56,182,255,0.5)" },
  { accent: "oklch(0.72 0.2 140)", glow: "rgba(74,222,128,0.25)", border: "rgba(74,222,128,0.5)" },
  { accent: "oklch(0.85 0.18 90)", glow: "rgba(234,179,8,0.25)", border: "rgba(234,179,8,0.5)" },
  { accent: "oklch(0.65 0.22 300)", glow: "rgba(168,85,247,0.25)", border: "rgba(168,85,247,0.5)" },
  { accent: "oklch(0.8 0.2 60)", glow: "rgba(255,200,0,0.35)", border: "rgba(255,200,0,0.6)" },
];

export function Sectors({ onRegister }: { onRegister: (track: string) => void }) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <section id="sectors" className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">

      {/* ── HIGHLY NOTICEABLE MANDATORY CORE DIRECTIVE BANNER ── */}
      <div className="relative mb-10 overflow-hidden border-2 border-primary bg-black/90 p-4 sm:p-6 shadow-[0_0_40px_rgba(224,76,17,0.3)] clip-tactical">
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2 font-mono-tech text-[10px] sm:text-xs tracking-[0.25em] text-primary font-black uppercase">
            <AlertTriangle className="size-4 animate-bounce text-primary" />
            CORE EVENT LOOP PROTOCOL // MANDATORY RULE
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-display font-black text-xl sm:text-3xl md:text-4xl uppercase text-foreground tracking-wide">
            <span className="px-2.5 py-1 bg-red-950/80 border border-red-500/60 text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              CRISIS
            </span>
            <span className="text-primary font-mono-tech text-base sm:text-xl font-bold">→</span>
            <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/60 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              SENSE
            </span>
            <span className="text-primary font-mono-tech text-base sm:text-xl font-bold">→</span>
            <span className="px-2.5 py-1 bg-blue-950/80 border border-blue-500/60 text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              THINK
            </span>
            <span className="text-primary font-mono-tech text-base sm:text-xl font-bold">→</span>
            <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
              ADAPT
            </span>
            <span className="text-primary font-mono-tech text-base sm:text-xl font-bold">→</span>
            <span className="px-2.5 py-1 bg-accent/20 border border-accent text-accent drop-shadow-[0_0_15px_rgba(255,200,0,0.6)]">
              SURVIVE
            </span>
          </div>

          <p className="max-w-2xl font-mono-tech text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
            Every submission must demonstrate a physical sensor, real-time decision logic, and tangible hardware actuation.
          </p>
        </div>
      </div>

      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block h-px w-8 bg-primary" />
          <span className="font-mono-tech text-[11px] tracking-[0.28em] text-primary uppercase font-bold">
            // STUDENT MAKEATHON CRISIS SECTORS
          </span>
        </div>
        <h2 className="font-display text-3xl font-black uppercase sm:text-5xl leading-tight">
          Choose Your Crisis:{" "}
          <span className="text-alert-gradient inline-block">Sense, Adapt & Survive</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Select a high-stakes engineering problem below. Click <strong className="text-primary">"View Crisis Details"</strong> to expand scenario specifications, hardware challenges, and implementation examples!
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
              onClick={() => setSelectedTrack(track)}
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
                  MOST POPULAR // BRING YOUR OWN CRISIS
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
                  {track.code}
                </span>
              </div>

              <div className="mt-4">
                <span className="font-mono-tech text-[10px] text-muted-foreground tracking-widest uppercase font-bold">
                  {track.crisisName}
                </span>
                <h3
                  className="relative mt-1 font-display text-xl font-bold transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: isFeatured ? "var(--accent)" : "var(--foreground)" }}
                >
                  {track.title}
                </h3>
              </div>

              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {track.brief}
              </p>

              <div
                className="relative mt-5 flex items-center justify-between border-t pt-4 transition-colors duration-300"
                style={{ borderColor: `color-mix(in oklab, ${color.border} 40%, var(--border))` }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTrack(track);
                  }}
                  className="flex items-center gap-1.5 font-mono-tech text-[11px] tracking-[0.15em] uppercase font-bold text-primary hover:text-white transition-colors"
                >
                  <Activity className="size-3.5" />
                  View Crisis Details
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister(track.title);
                  }}
                  className="flex items-center gap-1 font-mono-tech text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:gap-2"
                  style={{ color: color.accent }}
                >
                  Register
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
            Not sure which crisis to pick? Enlist your squad now and choose your theme on the makeathon day!
          </p>
          <Button variant="alert" onClick={() => onRegister("")} className="relative w-full group-hover:shadow-[0_0_20px_rgba(255,200,0,0.4)] transition-shadow duration-300 font-bold">
            Register Any Idea
          </Button>
        </article>
      </div>

      {/* ── EXPANDABLE CRISIS DETAIL MODAL ── */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary p-6 sm:p-8 clip-tactical shadow-[0_0_50px_rgba(224,76,17,0.4)]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground border border-border hover:border-primary transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono-tech text-xs tracking-[0.2em] font-bold text-primary px-2.5 py-0.5 border border-primary/40 bg-primary/10">
                {selectedTrack.code}
              </span>
              <span className="font-mono-tech text-xs text-muted-foreground uppercase font-bold tracking-widest">
                {selectedTrack.crisisName}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              {selectedTrack.title}
            </h2>

            <div className="mt-6 space-y-6">
              {/* Scenario */}
              <div className="border-l-2 border-primary/80 pl-4 py-1 bg-primary/5">
                <h4 className="font-mono-tech text-xs tracking-[0.2em] text-primary uppercase font-bold mb-1 flex items-center gap-2">
                  <AlertTriangle className="size-4 text-primary" />
                  SCENARIO BRIEFING
                </h4>
                <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                  "{selectedTrack.scenario}"
                </p>
              </div>

              {/* Engineering Problem */}
              <div className="border border-border bg-card/40 p-4">
                <h4 className="font-mono-tech text-xs tracking-[0.2em] text-accent uppercase font-bold mb-2 flex items-center gap-2">
                  <Cpu className="size-4 text-accent" />
                  ENGINEERING PROBLEM
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-semibold">
                  {selectedTrack.engineeringProblem}
                </p>
              </div>

              {/* Example Ideas */}
              <div>
                <h4 className="font-mono-tech text-xs tracking-[0.2em] text-emerald-400 uppercase font-bold mb-3 flex items-center gap-2">
                  <Lightbulb className="size-4 text-emerald-400" />
                  EXAMPLE IMPLEMENTATION CONCEPTS
                </h4>
                <ul className="grid gap-2">
                  {selectedTrack.exampleIdeas.map((idea, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground bg-muted/20 border border-muted/30 p-3">
                      <span className="font-mono-tech text-xs font-bold text-primary shrink-0 mt-0.5">0{i+1}.</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Constraint (if any) */}
              {selectedTrack.constraint && (
                <div className="border border-amber-500/50 bg-amber-950/20 p-4">
                  <h4 className="font-mono-tech text-xs tracking-[0.2em] text-amber-400 uppercase font-bold mb-1 flex items-center gap-2">
                    <ShieldCheck className="size-4 text-amber-400" />
                    HARDWARE CONSTRAINT
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-200/90">
                    {selectedTrack.constraint}
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons inside pop up */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="tactical"
                onClick={() => setSelectedTrack(null)}
                className="w-full sm:w-auto font-mono-tech text-xs tracking-wider"
              >
                ← RETURN TO CRISIS LIST
              </Button>

              <Button
                variant="alert"
                onClick={() => {
                  const title = selectedTrack.title;
                  setSelectedTrack(null);
                  onRegister(title);
                }}
                className="w-full sm:w-auto font-bold tracking-wider"
              >
                REGISTER FOR THIS CRISIS →
              </Button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

