import { useEffect, useState } from "react";
import { Activity, Award, Calendar, ChevronRight, Clock, Cpu, Flame, Users, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cataclysm.jpg";

const TELEMETRY = [
  { label: "SIGNAL STRENGTH", icon: Activity, id: "signal" },
  { label: "TARGET LOCK", icon: Timer, id: "countdown" },
  { label: "ECE TRACKS", icon: Cpu, value: "05", id: "tracks" },
  { label: "OPERATIVES", icon: Users, id: "operatives" },
];

export function Hero({ onRegister }: { onRegister: () => void }) {
  const [threat, setThreat] = useState(94.8);
  const [clock, setClock] = useState<string | null>(null);
  const [operatives, setOperatives] = useState(0);
  const [countdown, setCountdown] = useState("00:00:00:00");

  useEffect(() => {
    const tick = () => {
      setThreat((p) => +Math.min(99.4, Math.max(88, p + (Math.random() * 0.6 - 0.3))).toFixed(1));
      setClock(new Date().toUTCString().slice(17, 25) + " UTC");
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2500;
    const endValue = 500;

    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setOperatives(Math.floor(ease * endValue));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-09-11T09:30:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        setCountdown("00:00:00:00");
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    
    updateCountdown();
    const id = setInterval(updateCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden scanlines">
      <img
        src={heroImage}
        alt="Circuit traces glowing on a dark silicon substrate"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_78%)]" />
      <div className="absolute inset-0 -z-10 grid-tactical opacity-60" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-6 text-center sm:px-6 lg:px-8 lg:py-16">
        <div className="animate-rise inline-flex items-center gap-2 border border-primary/60 bg-primary/12 px-3 py-1 clip-tactical">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono-tech text-[10px] tracking-[0.25em] text-accent">
            DEFCON 1 PROTOCOL {clock ? `· ${clock}` : ""}
          </span>
        </div>

        {/* College & Department */}
        <div className="animate-rise mt-4 space-y-1 max-w-3xl">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-foreground">
            JAYA ENGINEERING COLLEGE
          </h2>
          <p className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] uppercase text-primary font-bold">
            DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING
          </p>
          <div className="pt-1">
            <span className="inline-block border border-accent/40 bg-accent/10 px-3 py-0.5 clip-tactical font-mono-tech text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent font-semibold">
              // PRESENTS
            </span>
          </div>
        </div>

        {/* Main Event Title - Same size for Makeathon, reduced Project Zeroth Hour */}
        <h1 className="animate-rise mt-3 font-display uppercase">
          <span className="block text-xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
            MAKEATHON
          </span>
          <span className="mt-1 block text-lg sm:text-2xl md:text-3xl font-extrabold animate-flicker text-alert-gradient tracking-wide">
            PROJECT ZEROTH HOUR
          </span>
        </h1>

        <p className="animate-rise mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
          Embedded systems, signal processing, RF, and VLSI challenges are pushing electronics past
          their limits. Join the brightest minds in a 5-hour sprint to prototype hardware and
          communication tech that actually works.
        </p>

        <div className="animate-rise mt-4 flex w-full max-w-md items-center gap-3 border border-accent/60 bg-accent/10 px-4 py-2.5 clip-tactical text-left">
          <Calendar className="size-4 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-accent">
              SEPT 11 // 5-HOUR MAKEATHON
            </p>
            <p className="font-mono-tech text-[10px] text-muted-foreground">
              Venue: Jaya Auditorium · Registration queue open
            </p>
          </div>
        </div>

        <div className="animate-rise mt-4 flex flex-col gap-2.5 sm:flex-row w-full sm:w-auto">
          <Button variant="alert" size="default" onClick={onRegister} className="w-full sm:w-auto">
            <Flame className="size-4" aria-hidden />
            Enlist your squad
            <ChevronRight className="size-4" aria-hidden />
          </Button>
          <Button variant="tactical" size="default" asChild className="w-full sm:w-auto">
            <a href="#roadmap">
              <Clock className="size-4" aria-hidden />
              View build schedule
            </a>
          </Button>
        </div>

        <div className="animate-rise mt-4 flex w-full max-w-md flex-row gap-3 justify-center">
          <div className="flex flex-1 flex-col items-center justify-center gap-1 border border-primary/60 bg-primary/10 px-3 py-3 clip-tactical">
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent">PRIZE CACHE</p>
            <p className="font-display text-xl sm:text-2xl font-black text-foreground drop-shadow-[0_0_15px_rgba(224,76,17,0.5)]">
              22,000 INR
            </p>
            <p className="font-mono-tech text-[9px] text-muted-foreground text-center">
              + MERCH & CERTIFICATES
            </p>
          </div>
          
          <div className="flex flex-1 flex-col items-center justify-center gap-1 border border-accent/60 bg-accent/10 px-3 py-3 clip-tactical">
            <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent">REGISTRATION</p>
            <p className="font-display text-xl sm:text-2xl font-black text-foreground drop-shadow-[0_0_15px_rgba(255,200,0,0.5)]">
              ₹200
            </p>
            <p className="font-mono-tech text-[9px] text-muted-foreground text-center">
              FOOD & WI-FI INCLUDED
            </p>
          </div>
        </div>

        <dl className="mt-8 grid w-full grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-4">
          {TELEMETRY.map((item) => (
            <div key={item.id} className="panel-tactical p-4 text-left">
              <dt className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                {item.label}
                <item.icon className="size-3.5 text-primary" aria-hidden />
              </dt>
              <dd className="mt-2 font-display text-2xl font-black text-foreground">
                {item.id === "signal" && (
                  <span className="text-primary">
                    {threat}
                    <span className="text-sm text-accent"> dBm</span>
                  </span>
                )}
                {item.id === "countdown" && (
                  <span className="text-accent tracking-wider">{countdown}</span>
                )}
                {item.id === "tracks" && item.value}
                {item.id === "operatives" && (
                  <span>
                    {operatives}<span className="text-primary">+</span>
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 w-full max-w-3xl">
          <div className="mb-1 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] text-muted-foreground">
            <span>RF SPECTRUM WAVEFORM</span>
            <span className="text-primary">2.4 GHz ACTIVE</span>
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
