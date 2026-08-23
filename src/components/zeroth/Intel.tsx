import { useState } from "react";
import { ChevronDown, ChevronRight, Radio, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQS, STATS } from "@/data/zeroth";

import { Linkedin, Phone, Mail } from "lucide-react";

// Hardcoded or filtered mentor profiles for precise structure
const HOD = {
  name: "Dr. A. Saravanan",
  role: "Head of Department, ECE",
  org: "Faculty Mentor",
  initials: "AS",
  image: "/images/coordinators/hod.jpg",
  imagePos: "center -2%",
};

const FACULTY_COORDINATORS = [
  {
    name: "V. Jaya Prakash",
    role: "Faculty Coordinator",
    org: "Department of ECE",
    initials: "VJ",

  },
];

const STUDENT_COORDINATORS = [
  {
    name: "Aaron Nissi",
    role: "Event Head",
    org: "Student Coordinator",
    specialty: "Overall Operations & Lead",
    phone: "+91-6381198548",
    image: "/images/coordinators/aaron.jpg",
    imagePos: "center 62%",
    initials: "AN",
    linkedin: "https://www.linkedin.com/in/aaron-nissi-mylabathula/",
  },
  {
    name: "K.J John Victor",
    role: "Technical Head",
    org: "Student Coordinator",
    specialty: "Infrastructure & Tools",
    phone: "+91-9566227078",
    image: "/images/coordinators/john.jpg",
    imagePos: "center 18%",
    initials: "JV",
    linkedin: "https://www.linkedin.com/in/john-victor-0828702a5/",
  },
  {
    name: "R. Dhanush",
    role: "Registration Lead",
    org: "Student Coordinator",
    specialty: "Onboarding & Operations",
    phone: "+91-8883396400",
    image: "/images/coordinators/dhanushr.jpg",
    imagePos: "center 10%",
    initials: "RD",
    linkedin: "https://www.linkedin.com/in/dhanush-raja-4203962a6/",
  },
  {
    name: "K. Vigneshwaran",
    role: "Logistics Head",
    org: "Student Coordinator",
    specialty: "Venue & Equipment",
    phone: "+91-9840102544",
    initials: "KV",
    linkedin: "https://www.linkedin.com/in/vigneswaran-k-a2b5722a5/",
  },
  {
    name: "Sai Rahul",
    role: "Media Head",
    org: "Student Coordinator",
    specialty: "Broadcast & Communications",
    initials: "SR",
    phone: "+91-9789051578",
    linkedin: "https://www.linkedin.com/in/sai-rahul1113/",
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
            <div className="mt-6 max-w-md">
              <article className="panel-tactical p-6 border border-primary/40">
                <div className="flex items-center justify-between">
                  {HOD.image ? (
                    <div className="relative size-24 overflow-hidden rounded-md border-2 border-primary/60 bg-black/40 shadow-[0_0_12px_rgba(224,76,17,0.3)]">
                      <img
                        src={HOD.image}
                        alt={HOD.name}
                        style={{ objectPosition: HOD.imagePos || "center center" }}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="grid size-14 place-items-center border-2 border-accent/60 bg-accent/15 font-display text-lg font-black text-accent clip-tactical">
                      {HOD.initials}
                    </span>
                  )}
                  {HOD.linkedin && (
                    <a
                      href={HOD.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn profile"
                      className="grid size-9 place-items-center border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Linkedin className="size-4" />
                    </a>
                  )}
                </div>
                <h4 className="mt-5 font-display text-xl font-black text-foreground tracking-wide">{HOD.name}</h4>
                <p className="mt-1 font-mono-tech text-xs tracking-wider text-primary font-bold uppercase">
                  {HOD.role}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium">{HOD.org}</p>
              </article>
            </div>
          </div>

          {/* Faculty Coordinators Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-black uppercase">
              Faculty <span className="text-accent">Co-ordinators</span>
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 max-w-3xl">
              {FACULTY_COORDINATORS.map((m) => (
                <article key={m.name} className="panel-tactical p-6 border border-border hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center border-2 border-accent/60 bg-accent/15 font-display text-lg font-black text-accent clip-tactical">
                      {m.initials}
                    </span>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn profile"
                        className="grid size-9 place-items-center border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Linkedin className="size-4" />
                      </a>
                    )}
                  </div>
                  <h4 className="mt-5 font-display text-xl font-black text-foreground tracking-wide">{m.name}</h4>
                  <p className="mt-1 font-mono-tech text-xs tracking-wider text-primary font-bold uppercase">
                    {m.role}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground font-medium">{m.org}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Student Coordinators Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-black uppercase">
              Student <span className="text-accent">Co-ordinators</span>
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STUDENT_COORDINATORS.map((m) => (
                <article
                  key={m.name}
                  className="panel-tactical p-6 border border-border/80 hover:border-primary/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      {m.image ? (
                        <div className="relative size-24 overflow-hidden rounded-md border-2 border-primary/60 bg-black/40 shadow-[0_0_12px_rgba(224,76,17,0.3)]">
                          <img
                            src={m.image}
                            alt={m.name}
                            style={{ objectPosition: m.imagePos || "center center" }}
                            className="size-full object-cover"
                          />
                        </div>
                      ) : (
                        <span className="grid size-14 place-items-center border-2 border-accent/60 bg-accent/15 font-display text-lg font-black text-accent clip-tactical">
                          {m.initials}
                        </span>
                      )}

                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${m.name} LinkedIn`}
                          className="grid size-9 place-items-center border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Linkedin className="size-4" />
                        </a>
                      )}
                    </div>

                    <h4 className="mt-5 font-display text-xl font-black text-foreground tracking-wide">
                      {m.name}
                    </h4>
                    <p className="mt-1 font-mono-tech text-xs tracking-wider text-primary font-bold uppercase">
                      {m.role}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground font-medium">{m.org}</p>
                    <p className="mt-2 font-mono-tech text-xs text-accent font-semibold">
                      // {m.specialty}
                    </p>
                  </div>

                  {m.phone && (
                    <div className="mt-5 border-t border-border/80 pt-4">
                      <a
                        href={`tel:${m.phone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-2 font-mono-tech text-sm font-bold text-accent transition-colors hover:text-primary"
                      >
                        <Phone className="size-3.5 text-primary" />
                        {m.phone}
                      </a>
                    </div>
                  )}
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
                      className={`size-4 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""
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
