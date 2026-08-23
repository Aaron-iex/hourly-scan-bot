import { useEffect, useState } from "react";
import { Activity, Award, Calendar, ChevronRight, Clock, Cpu, Flame, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cataclysm.jpg";

const TELEMETRY = [
  { label: "THREAT LEVEL", icon: Activity, dynamic: true },
  { label: "PRIZE CACHE", icon: Award, value: "$50,000+" },
  { label: "THREAT SECTORS", icon: Cpu, value: "05" },
  { label: "OPERATIVES", icon: Users, value: "500+" },
];

export function Hero({ onRegister }: { onRegister: () => void }) {
  const [threat, setThreat] = useState(94.8);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setThreat((p) => +Math.min(99.4, Math.max(88, p + (Math.random() * 0.6 - 0.3))).toFixed(1));
      setClock(new Date().toUTCString().slice(17, 25) + " UTC");
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden scanlines">
      <img
        src={heroImage}
        alt="Cracked fault line splitting a burning city skyline"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_78%)]" />
      <div className="absolute inset-0 -z-10 grid-tactical opacity-60" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="animate-rise inline-flex items-center gap-3 border border-primary/60 bg-primary/12 px-4 py-2 clip-tactical">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono-tech text-[11px] tracking-[0.25em] text-accent">
            DEFCON 1 ACTIVE {clock ? `· ${clock}` : ""}
          </span>
        </div>

        <h1 className="animate-rise mt-8 font-display text-4xl font-black uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
          The earth is at its
          <span className="mt-2 block animate-flicker text-alert-gradient">Zeroth Hour</span>
        </h1>

        <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Catastrophic seismic shifts, unchecked wildfire infernos, and oceanic surges are
          overwhelming global infrastructure. Join 500+ crisis engineers in a 5-hour emergency
          sprint to prototype life-saving disaster technology.
        </p>

        <div className="animate-rise mt-8 flex w-full max-w-lg items-center gap-3 border border-accent/60 bg-accent/10 px-5 py-4 clip-tactical text-left">
          <Calendar className="size-5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-accent">
              SEPT 11 // 5-HOUR HACKATHON
            </p>
            <p className="font-mono-tech text-[11px] text-muted-foreground">
              Registration queue open — lock clearance before lockdown.
            </p>
          </div>
        </div>

        <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="alert" size="xl" onClick={onRegister}>
            <Flame className="size-4" aria-hidden />
            Enlist your squad
            <ChevronRight className="size-4" aria-hidden />
          </Button>
          <Button variant="tactical" size="xl" asChild>
            <a href="#roadmap">
              <Clock className="size-4" aria-hidden />
              View evacuation roadmap
            </a>
          </Button>
        </div>

        <dl className="mt-16 grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
          {TELEMETRY.map(({ label, icon: Icon, value, dynamic }) => (
            <div key={label} className="panel-tactical p-4 text-left">
              <dt className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                {label}
                <Icon className="size-3.5 text-primary" aria-hidden />
              </dt>
              <dd className="mt-2 font-display text-2xl font-black text-foreground">
                {dynamic ? (
                  <span className="text-primary">
                    {threat}
                    <span className="text-sm text-accent"> % SEISMIC</span>
                  </span>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 w-full max-w-3xl">
          <div className="mb-1 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
            <span>TECTONIC STRAIN WAVEFORM</span>
            <span className="text-primary">RICHTER 8.9 PREDICTED</span>
          </div>
          <div className="relative h-14 border border-primary/40 bg-card/70 p-1">
            <svg viewBox="0 0 500 40" className="size-full fill-none stroke-primary" aria-hidden>
              <path
                d="M 0,20 L 50,20 L 70,5 L 85,35 L 100,10 L 115,25 L 130,20 L 200,20 L 210,38 L 225,2 L 240,38 L 255,15 L 270,25 L 285,20 L 370,20 L 385,5 L 400,35 L 415,20 L 500,20"
                strokeWidth="1.5"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background),transparent_25%,transparent_75%,var(--background))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
