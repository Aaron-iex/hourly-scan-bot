import { Anchor, Flame, Rocket, Waves, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRACKS } from "@/data/zeroth";

const ICONS = {
  waves: Waves,
  flame: Flame,
  rocket: Rocket,
  anchor: Anchor,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export function Sectors({ onRegister }: { onRegister: (track: string) => void }) {
  return (
    <section id="sectors" className="mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="font-mono-tech text-[11px] tracking-[0.25em] text-primary">
          // THREAT SECTORS
        </span>
        <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-5xl">
          Five fronts of <span className="text-accent">Planetary Defence</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick a threat sector at enlistment. Each sector features its own dedicated challenges,
          mentor pool, and judging rubric.
        </p>
      </div>

      <div className="mt-6 border border-accent/40 bg-accent/10 px-5 py-4 clip-tactical">
        <p className="text-center font-display text-sm font-bold uppercase tracking-[0.12em] text-accent">
          OVERALL PRIZE CACHE: 1ST 10,000 · 2ND 7,000 · 3RD 5,000 INR — TOP 3 OVERALL, IRRESPECTIVE
          OF SECTOR
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track) => {
          const Icon = ICONS[track.icon];
          return (
            <article
              key={track.id}
              className="group panel-tactical flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-panel)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center border border-primary/50 bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                  {track.code}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-bold text-foreground group-hover:text-accent">
                {track.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {track.brief}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono-tech text-[10px] tracking-[0.2em] text-primary">
                  {track.threat}
                </span>
                <Button variant="link" size="sm" onClick={() => onRegister(track.title)}>
                  Deploy here →
                </Button>
              </div>
            </article>
          );
        })}

        <article className="panel-tactical flex flex-col justify-center gap-4 p-6 text-center">
          <h3 className="font-display text-xl font-black uppercase text-accent">
            Undecided operative?
          </h3>
          <p className="text-sm text-muted-foreground">
            Enlist without a sector — squad matching assigns you where the signal is strongest.
          </p>
          <Button variant="alert" onClick={() => onRegister("")}>
            Enlist now
          </Button>
        </article>
      </div>
    </section>
  );
}
