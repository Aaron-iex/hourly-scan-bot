import { useState } from "react";
import { ChevronDown, ChevronRight, Radio, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQS, STATS } from "@/data/zeroth";

// Hardcoded or filtered mentor profiles for precise structure
const HOD = {
  name: "Dr. A. Saravanan",
  role: "Head of Department, ECE",
  org: "Faculty Mentor",
  specialty: "Signal Processing & VLSI",
  initials: "AS",
};

const FACULTY_COORDINATORS = [
  {
    name: "Faculty Coordinator I",
    role: "Faculty Coordinator",
    org: "Department of ECE",
    specialty: "Embedded Systems",
    initials: "FC",
  },
  {
    name: "Faculty Coordinator II",
    role: "Faculty Coordinator",
    org: "Department of ECE",
    specialty: "RF & Wireless",
    initials: "FC",
  },
];

const STUDENT_COORDINATORS = [
  {
    name: "Student Event Head",
    role: "Event Head",
    org: "Student Coordinator",
    specialty: "Overall Operations",
    initials: "SH",
  },
  {
    name: "Technical Head",
    role: "Technical Head",
    org: "Student Coordinator",
    specialty: "Infrastructure & Tools",
    initials: "TH",
  },
  {
    name: "Registration Lead",
    role: "Registration Lead",
    org: "Student Coordinator",
    specialty: "Onboarding & Ops",
    initials: "RL",
  },
  {
    name: "Logistics Coordinator",
    role: "Logistics",
    org: "Student Coordinator",
    specialty: "Venue & Equipment",
    initials: "LC",
  },
  {
    name: "Media Head",
    role: "Media Head",
    org: "Student Coordinator",
    specialty: "Broadcast & Comm",
    initials: "MH",
  },
];

export function Intel({ preview, onExpand }: { preview?: boolean; onExpand?: () => void }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="intel" className="mx-auto max-w-7xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
      <div id="briefing" className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="font-mono-tech text-[11px] tracking-[0.25em] text-primary">
            // MISSION BRIEFING
          </span>
          <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-5xl">
            Engineering the <span className="text-accent">last hour</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Zeroth Hour is a 5-hour crisis engineering hackathon built around one premise: the
            warning already fired. Operatives prototype systems that predict, contain, and survive
            planetary-scale disaster — judged by researchers who fight these events for a living.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every submission is stress-tested by a live disaster injection at the sprint midpoint.
            Systems that hold get deployment funding; systems that fail get a debrief.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono-tech text-[11px] tracking-[0.18em] text-primary clip-tactical">
              <ShieldCheck className="size-3.5" aria-hidden /> 200 INR/TEAM
            </span>
            <span className="flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono-tech text-[11px] tracking-[0.18em] text-accent clip-tactical">
              <Radio className="size-3.5" aria-hidden /> HYBRID · GLOBAL STREAM
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="panel-tactical p-5">
              <dt className="font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-black text-alert-gradient">
                {s.value}
              </dd>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </dl>
      </div>

      {preview ? (
        <div className="mt-10 text-center">
          <Button variant="tactical" size="xl" onClick={onExpand}>
            <ChevronRight className="size-4" aria-hidden />
            View full mission briefing
          </Button>
        </div>
      ) : (
        <>
          {/* ECE HOD Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-black uppercase">
              ECE <span className="text-accent">HOD</span>
            </h3>
            <div className="mt-6 max-w-sm">
              <article className="panel-tactical p-5">
                <span className="grid size-12 place-items-center border border-accent/50 bg-accent/12 font-display text-sm font-black text-accent">
                  {HOD.initials}
                </span>
                <h4 className="mt-4 font-display text-base font-bold">{HOD.name}</h4>
                <p className="mt-1 font-mono-tech text-[10px] tracking-[0.15em] text-primary">
                  {HOD.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{HOD.org}</p>
                <p className="mt-3 border-t border-border pt-3 font-mono-tech text-[10px] tracking-[0.15em] text-accent">
                  {HOD.specialty}
                </p>
              </article>
            </div>
          </div>

          {/* Faculty Coordinators Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-black uppercase">
              Faculty <span className="text-accent">Co-ordinators</span>
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-2xl">
              {FACULTY_COORDINATORS.map((m) => (
                <article key={m.name} className="panel-tactical p-5">
                  <span className="grid size-12 place-items-center border border-accent/50 bg-accent/12 font-display text-sm font-black text-accent">
                    {m.initials}
                  </span>
                  <h4 className="mt-4 font-display text-base font-bold">{m.name}</h4>
                  <p className="mt-1 font-mono-tech text-[10px] tracking-[0.15em] text-primary">
                    {m.role}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.org}</p>
                  <p className="mt-3 border-t border-border pt-3 font-mono-tech text-[10px] tracking-[0.15em] text-accent">
                    {m.specialty}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Student Coordinators Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-black uppercase">
              Student <span className="text-accent">Co-ordinators</span>
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STUDENT_COORDINATORS.map((m) => (
                <article key={m.name} className="panel-tactical p-5">
                  <span className="grid size-12 place-items-center border border-accent/50 bg-accent/12 font-display text-sm font-black text-accent">
                    {m.initials}
                  </span>
                  <h4 className="mt-4 font-display text-base font-bold">{m.name}</h4>
                  <p className="mt-1 font-mono-tech text-[10px] tracking-[0.15em] text-primary">
                    {m.role}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.org}</p>
                  <p className="mt-3 border-t border-border pt-3 font-mono-tech text-[10px] tracking-[0.15em] text-accent">
                    {m.specialty}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h3 className="font-display text-2xl font-black uppercase">
              Frequently intercepted <span className="text-accent">questions</span>
            </h3>
            <div className="divide-y divide-border border-y border-border">
              {FAQS.map((f, i) => (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={open === i}
                  >
                    <span className="font-display text-base font-bold">{f.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-primary transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {open === i && (
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
