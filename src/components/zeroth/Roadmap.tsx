import { useState } from "react";
import { Clock, Flame, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMELINE, type Stage } from "@/data/zeroth";

const FILTERS: { id: Stage | "all"; label: string }[] = [
  { id: "all", label: "All phases" },
  { id: "prep", label: "Stage 1 · Briefing" },
  { id: "hacking", label: "Stage 2 · Lockdown" },
  { id: "pitch", label: "Stage 3 · Evacuation" },
];

export function Roadmap({ onRegister }: { onRegister: () => void }) {
  const [active, setActive] = useState<Stage | "all">("all");
  const events = active === "all" ? TIMELINE : TIMELINE.filter((e) => e.stage === active);

  return (
    <section id="roadmap" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono-tech text-[11px] tracking-[0.25em] text-primary">
            // TACTICAL TIMELINE
          </span>
          <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-5xl">
            Evacuation <span className="text-accent">roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From operative onboarding to final survival-tech deployment. Exact dates announced
            soon — pre-register for calendar alerts.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-2 clip-tactical font-mono-tech text-[11px] uppercase tracking-[0.18em] transition-all ${
                active === f.id
                  ? "bg-accent text-accent-foreground shadow-[var(--glow-warn)]"
                  : "border border-border bg-card text-muted-foreground hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ol className="relative mt-14 ml-4 space-y-6 border-l border-primary/40 pl-8 sm:ml-8 sm:pl-10">
          {events.map((evt) => (
            <li key={evt.title} className="group relative">
              <span className="absolute -left-[41px] top-4 grid size-4 place-items-center rounded-full border-2 border-primary bg-background transition-all group-hover:scale-125 group-hover:bg-primary sm:-left-[49px]" />
              <div className="panel-tactical p-5 transition-all hover:shadow-[var(--shadow-panel)] sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-primary/50 bg-primary/12 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.18em] text-primary">
                    {evt.phase}
                  </span>
                  <span className="flex items-center gap-1 font-mono-tech text-[11px] text-accent">
                    <Clock className="size-3.5" aria-hidden />
                    {evt.time}
                  </span>
                  <span className="ml-auto flex items-center gap-1 font-mono-tech text-[10px] text-muted-foreground">
                    <MapPin className="size-3" aria-hidden />
                    {evt.location}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold group-hover:text-accent sm:text-xl">
                  {evt.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {evt.description}
                </p>

                <div className="mt-4 border-t border-border pt-3 font-mono-tech text-[10px] tracking-[0.2em] text-accent">
                  STATUS: {evt.status}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="panel-tactical mt-16 space-y-4 p-8 text-center">
          <h3 className="font-display text-2xl font-black uppercase">
            Ready to deploy your team?
          </h3>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Free for students, crisis researchers, and apocalyptic builders. Secure your clearance
            badge before squad lockdown.
          </p>
          <Button variant="alert" size="xl" onClick={onRegister}>
            <Flame className="size-4" aria-hidden />
            Secure squad clearance
          </Button>
        </div>
      </div>
    </section>
  );
}
