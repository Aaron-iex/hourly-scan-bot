import { Github, Radio, ShieldAlert, Satellite } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center border border-primary/60 bg-primary/15 text-primary clip-tactical">
              <ShieldAlert className="size-4.5" aria-hidden />
            </span>
            <span className="font-display text-sm font-black tracking-[0.2em]">ZEROTH HOUR</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Global disaster mitigation and planetary survival tech hackathon. 48 hours, five threat
            sectors, one deadline that never moves.
          </p>
          <div className="mt-5 flex gap-2">
            {[Radio, Satellite, Github].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                className="grid size-10 place-items-center border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary clip-tactical"
                aria-label="Communication channel"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav>
          <h4 className="font-mono-tech text-[11px] tracking-[0.22em] text-accent">NAVIGATION</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              ["#briefing", "Mission briefing"],
              ["#sectors", "Threat sectors"],
              ["#roadmap", "Evacuation roadmap"],
              ["#intel", "Mentors & FAQ"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="font-mono-tech text-[11px] tracking-[0.22em] text-accent">
            EMERGENCY CONTACT
          </h4>
          <ul className="mt-4 space-y-2 font-mono-tech text-xs text-muted-foreground">
            <li>ops@zerothhour.earth</li>
            <li>PRESS: broadcast@zerothhour.earth</li>
            <li>STATUS: DEFCON 1 — DATES TBA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
        © {new Date().getFullYear()} PROJECT ZEROTH HOUR // ALL BROADCASTS SIMULATED
      </div>
    </footer>
  );
}
