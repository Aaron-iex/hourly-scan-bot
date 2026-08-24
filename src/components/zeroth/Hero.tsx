import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronRight, Clock, Flame, Radio, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBoy from "@/assets/hero-boy.png";
import heroPlate from "@/assets/hero-cataclysm.jpg";
import { IntroSequence } from "@/components/zeroth/IntroSequence";

/* ─── Floating Ember Particle Canvas (Optimized + Offscreen Pause) ─── */
function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = !!entry?.isIntersecting;
    });
    observer.observe(canvas);

    type Ember = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number };
    const embers: Ember[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.45 + 0.15),
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.6 ? 38 : Math.random() > 0.3 ? 50 : 18,
    }));

    const draw = () => {
      if (!isVisible || document.hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((e) => {
        e.x += e.vx + Math.sin(Date.now() * 0.001 + e.y) * 0.05;
        e.y += e.vy;
        e.alpha += (Math.random() - 0.5) * 0.01;
        e.alpha = Math.max(0.05, Math.min(0.45, e.alpha));
        if (e.y < -6) {
          e.y = canvas.height + 6;
          e.x = Math.random() * canvas.width;
          e.alpha = 0.35;
        }

        ctx.save();
        ctx.globalAlpha = e.alpha;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3);
        g.addColorStop(0, `hsl(${e.hue}, 100%, 72%)`);
        g.addColorStop(0.5, `hsla(${e.hue}, 100%, 50%, 0.2)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 size-full pointer-events-none" aria-hidden />;
}

/* ─── Split-Flap Countdown Digit ─── */
function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
      <div className="relative flex gap-[2px]">
        {value.split("").map((char, i) => (
          <div
            key={i}
            className="relative size-6 sm:size-9 md:size-11 flex items-center justify-center
                       bg-black/60 backdrop-blur-md
                       border border-primary/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.5)]"
            style={{ clipPath: "inset(0 round 3px)" }}
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            <span className="font-display text-sm sm:text-xl md:text-2xl font-black text-foreground tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {char}
            </span>
          </div>
        ))}
      </div>
      <span className="font-mono-tech text-[6px] sm:text-[8px] tracking-[0.16em] text-muted-foreground uppercase font-semibold">
        {label}
      </span>
    </div>
  );
}

/* ─── HUD Corner Brackets ─── */
function HudBrackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-1.5 -left-1.5 size-3.5 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
      <div className="absolute -top-1.5 -right-1.5 size-3.5 border-t-2 border-r-2 border-primary/60 pointer-events-none" />
      <div className="absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-accent/60 pointer-events-none" />
      <div className="absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-accent/60 pointer-events-none" />
      {children}
    </div>
  );
}

/* ─── Animated Waveform Canvas ─── */
function LiveWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = !!entry?.isIntersecting;
    });
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible || document.hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.002;

      // Primary wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(224,76,17,0.7)";
      ctx.lineWidth = 2.5;
      for (let x = 0; x < w; x++) {
        const noise = Math.sin(x * 0.04 + t) * 7 + Math.sin(x * 0.015 + t * 1.3) * 12;
        const y = h / 2 + noise + (x > w * 0.3 && x < w * 0.45 ? Math.sin(x * 0.08) * 18 : 0);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Accent sub-wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(234,179,8,0.4)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x++) {
        const noise = Math.sin(x * 0.03 + t * 0.7) * 5 + Math.cos(x * 0.02 + t * 1.1) * 8;
        const y = h / 2 + noise;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Scan cursor line
      const scanX = (t * 45) % w;
      ctx.fillStyle = "rgba(224,76,17,0.2)";
      ctx.fillRect(scanX - 1, 0, 3, h);

      rafId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="size-full" aria-hidden />;
}

/* ═══════════════════════════════════════════════════════
   HERO COMPONENT
   Boy Center Stage • One Word Makeathon • Clock In Header
   ═══════════════════════════════════════════════════════ */
export function Hero({ onRegister }: { onRegister: () => void }) {
  const [clock, setClock] = useState<string | null>(null);
  const [operatives, setOperatives] = useState(0);
  const [cd, setCd] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const tick = () => setClock(new Date().toUTCString().slice(17, 25) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let start: number | null = null;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2200, 1);
      setOperatives(Math.floor((p === 1 ? 1 : 1 - Math.pow(2, -10 * p)) * 500));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, []);

  useEffect(() => {
    const target = new Date("2026-09-11T09:30:00").getTime();
    const update = () => {
      const dist = Math.max(0, target - Date.now());
      setCd({
        d: String(Math.floor(dist / 86400000)).padStart(2, "0"),
        h: String(Math.floor((dist % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((dist % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((dist % 60000) / 1000)).padStart(2, "0"),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}

      <section id="top" className="relative isolate overflow-hidden bg-background">
        {/* Background Ruined City Plate */}
        <img
          src={heroPlate}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 -z-30 size-full object-cover object-[center_30%] opacity-45 brightness-90 contrast-110 saturate-[1.1]"
        />

        {/* Ambient Overlays */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,transparent_20%,var(--background)_85%)]" />
        <div className="absolute inset-0 -z-20 grid-tactical opacity-25" />
        <EmberCanvas />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none -z-10" />

        {/* ════════ MAIN CONTENT CONTAINER ════════ */}
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-3 sm:px-6 lg:px-8 sm:py-6">

          {/* ── 1. TOP: DEFCON Badge ── */}
          <div className="inline-flex items-center gap-2 border border-primary/50 bg-primary/15 px-3.5 py-1.5 clip-tactical mb-2.5 shadow-[0_0_15px_rgba(224,76,17,0.2)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <Radio className="size-3.5 text-primary animate-pulse" />
            <span className="font-mono-tech text-[10px] tracking-[0.22em] text-accent font-bold uppercase">
              DEFCON 1 PROTOCOL {clock ? `// ${clock}` : ""}
            </span>
          </div>

          {/* ── 2. TOP: College Branding Header with Integrated Countdown Clock ── */}
          <div className="w-full max-w-5xl rounded-lg bg-black/45 backdrop-blur-sm border border-white/5 p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-6">
              {/* College Logo */}
              <div className="shrink-0">
                <div className="size-12 sm:size-16 md:size-20 rounded-full overflow-hidden border border-primary/50 bg-black/70 shadow-[0_0_15px_rgba(224,76,17,0.25)] flex items-center justify-center">
                  <img src="/images/jec-emblem.png" alt="Jaya Engineering College" className="size-full object-cover scale-105" />
                </div>
              </div>

              {/* Title & Affiliation Details */}
              <div className="flex-1 min-w-0 text-center">
                <h2 className="font-display text-xs sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-foreground leading-tight">
                  JAYA ENGINEERING COLLEGE
                </h2>
                <p className="mt-0.5 font-mono-tech text-[7px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">
                  Accredited by NAAC & NBA | Approved by AICTE | Affiliated to Anna University
                </p>
                <p className="font-mono-tech text-[7px] sm:text-[10px] md:text-xs text-accent font-bold tracking-wide">
                  📍 CTH Road, Thiruninravur, Chennai — 602024
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <span className="font-mono-tech text-[8px] sm:text-xs tracking-[0.14em] text-primary font-bold uppercase">
                    DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING
                  </span>
                  <span className="inline-block border border-accent/40 bg-accent/15 px-2 py-0.2 clip-tactical font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-accent font-bold">
                    PRESENTS
                  </span>
                </div>
              </div>

              {/* 31 Years Badge */}
              <div className="shrink-0">
                <div className="size-12 sm:size-16 md:size-20 rounded-full overflow-hidden border border-accent/50 bg-black/70 shadow-[0_0_15px_rgba(234,179,8,0.25)] flex items-center justify-center">
                  <img src="/images/jec-31years.png" alt="31 Years of Excellence" className="size-full object-cover scale-105" />
                </div>
              </div>
            </div>

            {/* ── Integrated Countdown Clock In Between / Below College Header ── */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock className="size-3 text-primary animate-pulse" />
                <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.22em] text-primary font-bold uppercase">
                  Time to Zero Hour
                </span>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2.5 justify-center">
                <FlipDigit value={cd.d} label="Days" />
                <span className="font-display text-sm sm:text-xl font-black text-primary mt-0.5 sm:mt-1 animate-pulse">:</span>
                <FlipDigit value={cd.h} label="Hours" />
                <span className="font-display text-sm sm:text-xl font-black text-primary mt-0.5 sm:mt-1 animate-pulse">:</span>
                <FlipDigit value={cd.m} label="Mins" />
                <span className="font-display text-sm sm:text-xl font-black text-primary mt-0.5 sm:mt-1 animate-pulse">:</span>
                <FlipDigit value={cd.s} label="Secs" />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              3. CENTER STAGE: 3-COLUMN HERO (BOY CENTERPIECE - NO HOVER)
              Left MAKEATHON (One Word) | Center Boy Cutout | Right ZEROTH HOUR
             ═══════════════════════════════════════════════════════ */}
          <div className="relative w-full my-2 sm:my-3">

            {/* Desktop 3-Column Grid */}
            <div className="hidden md:grid md:grid-cols-[1.1fr_auto_1.1fr] items-center justify-center gap-4 lg:gap-8 max-w-6xl mx-auto">

              {/* Left Column: MAKEATHON (One Single Word) */}
              <div className="text-right flex flex-col items-end justify-center pr-2">
                <div className="inline-flex items-center gap-2 mb-2 font-mono-tech text-xs tracking-[0.25em] text-primary font-bold uppercase border-r-2 border-primary pr-3">
                  <Flame className="size-3.5 text-primary" />
                  <span>5-HOUR HARDWARE SPRINT</span>
                </div>
                <h1 className="font-display font-black text-4xl lg:text-6xl xl:text-7xl uppercase tracking-tighter text-foreground leading-none select-none">
                  MAKEATHON
                </h1>
                <p className="mt-2.5 max-w-xs text-xs font-mono-tech tracking-wide text-muted-foreground leading-relaxed">
                  EMBEDDED · DSP · RF · VLSI · INNOVATION
                </p>
                <div className="mt-3.5 flex items-center gap-2 text-[10px] font-mono-tech text-accent font-semibold tracking-wider bg-accent/10 border border-accent/30 px-3 py-1 clip-tactical">
                  <Zap className="size-3 text-accent" />
                  <span>₹22K CASH PRIZE CACHE</span>
                </div>
              </div>

              {/* Center Stage: The Boy Cutout (Clean & Static, No Hover) */}
              <div className="relative flex flex-col items-center justify-center px-2">
                {/* Subtle Radial Floor Glow */}
                <div className="absolute bottom-2 inset-x-0 h-28 bg-[radial-gradient(ellipse_at_center,rgba(224,76,17,0.45)_0%,transparent_70%)] pointer-events-none -z-10" />

                {/* The Static Cutout Image */}
                <div className="relative z-10 select-none">
                  <img
                    src={heroBoy}
                    alt="Makeathon Operative"
                    className="h-[300px] lg:h-[400px] xl:h-[440px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Stage Pedestal Line */}
                <div className="mt-[-6px] h-1 w-44 lg:w-56 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
              </div>

              {/* Right Column: ZEROTH HOUR */}
              <div className="text-left flex flex-col items-start justify-center pl-2">
                <div className="inline-flex items-center gap-2 mb-2 font-mono-tech text-xs tracking-[0.25em] text-accent font-bold uppercase border-l-2 border-accent pl-3">
                  <Shield className="size-3.5 text-accent" />
                  <span>PLANETARY DEFENCE</span>
                </div>
                <h1 className="font-display font-black text-4xl lg:text-6xl xl:text-7xl uppercase tracking-tighter text-foreground leading-none select-none">
                  ZEROTH <span className="text-alert-gradient">HOUR</span>
                </h1>
                <p className="mt-2.5 max-w-xs text-xs font-mono-tech tracking-wide text-muted-foreground leading-relaxed">
                  HARDWARE DEFENCE UNDER DEFCON 1 PRESSURE
                </p>
                <div className="mt-3.5 flex items-center gap-2 text-[10px] font-mono-tech text-primary font-semibold tracking-wider bg-primary/10 border border-primary/30 px-3 py-1 clip-tactical">
                  <Clock className="size-3 text-primary" />
                  <span>SEPTEMBER 11, 2026</span>
                </div>
              </div>

            </div>

            {/* Mobile Stacked Layout (Clean separation, zero text on boy) */}
            <div className="flex md:hidden flex-col items-center text-center">
              {/* Top Title: MAKEATHON (One Word) */}
              <div className="w-full">
                <span className="font-mono-tech text-[9px] tracking-[0.25em] text-primary font-bold uppercase">
                  // 5-HOUR HARDWARE SPRINT
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-foreground leading-none mt-0.5">
                  MAKEATHON
                </h1>
              </div>

              {/* Center: Boy Cutout (Static, No Hover) */}
              <div className="relative my-2">
                <div className="absolute bottom-0 inset-x-0 h-20 bg-[radial-gradient(ellipse_at_center,rgba(224,76,17,0.4)_0%,transparent_70%)] pointer-events-none -z-10" />
                <img
                  src={heroBoy}
                  alt="Makeathon Operative"
                  className="h-[220px] sm:h-[260px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] mx-auto"
                />
                <div className="mt-[-4px] h-0.5 w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 mx-auto" />
              </div>

              {/* Bottom Title: PROJECT ZEROTH HOUR */}
              <div className="w-full">
                <span className="font-mono-tech text-[9px] tracking-[0.25em] text-accent font-bold uppercase">
                  PROJECT
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-alert-gradient leading-none">
                  ZEROTH HOUR
                </h2>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════
              4. ACTION CONTROLS & DETAILS
             ═══════════════════════════════════════════════════════ */}

          {/* Date & Venue Badge */}
          <div className="mt-2 flex w-full max-w-md items-center gap-3 border border-accent/60 bg-black/60 backdrop-blur-sm px-4 py-2.5 clip-tactical text-left group hover:border-accent transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <Calendar className="size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-accent">
                SEPT 11 // 5-HOUR MAKEATHON
              </p>
              <p className="font-mono-tech text-[9px] sm:text-[10px] text-muted-foreground">
                Venue: Jaya Auditorium · Registration queue open
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row w-full sm:w-auto">
            <Button
              variant="alert"
              size="default"
              onClick={onRegister}
              className="w-full sm:w-auto group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,76,17,0.5)] hover:scale-[1.02]"
            >
              <Flame className="size-4 transition-transform group-hover:rotate-12 group-hover:scale-110" aria-hidden />
              Enlist your squad
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
            <Button
              variant="tactical"
              size="default"
              asChild
              className="w-full sm:w-auto group transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:scale-[1.02]"
            >
              <a href="#roadmap">
                <Clock className="size-4 transition-transform group-hover:rotate-[-15deg]" aria-hidden />
                View build schedule
              </a>
            </Button>
          </div>

          {/* Prize + Fee Cards */}
          <div className="mt-3.5 flex w-full max-w-md flex-row gap-3 justify-center">
            <HudBrackets className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-black/50 backdrop-blur-sm px-3 py-2.5 border border-primary/30 group hover:border-primary transition-colors">
              <p className="font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-accent font-bold">PRIZE CACHE</p>
              <p className="font-display text-xl sm:text-3xl font-black text-foreground">₹22K</p>
              <p className="font-mono-tech text-[7px] sm:text-[9px] text-muted-foreground text-center font-medium">+ MERCH & CERTS</p>
            </HudBrackets>
            <HudBrackets className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-black/50 backdrop-blur-sm px-3 py-2.5 border border-accent/30 group hover:border-accent transition-colors">
              <p className="font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-accent font-bold">REGISTRATION</p>
              <p className="font-display text-xl sm:text-3xl font-black text-foreground">₹200</p>
              <p className="font-mono-tech text-[7px] sm:text-[9px] text-muted-foreground text-center font-medium">FOOD & WI-FI INCLUDED</p>
            </HudBrackets>
          </div>

          {/* Live Tactical Readouts */}
          <div className="mt-3.5 sm:mt-5 grid w-full grid-cols-3 gap-2.5 max-w-lg">
            {[
              { label: "THREAT LEVEL", value: "CRITICAL", color: "text-primary", icon: Zap },
              { label: "OPERATIVES", value: `${operatives}+`, color: "text-foreground", icon: Shield },
              { label: "ECE TRACKS", value: "05", color: "text-alert-gradient", icon: Radio },
            ].map((item, i) => (
              <div key={i} className="group panel-tactical p-2.5 sm:p-3.5 text-center transition-all duration-300 hover:-translate-y-0.5 bg-black/40">
                <item.icon className="size-3.5 sm:size-4 text-primary mx-auto mb-1 transition-transform group-hover:scale-110" aria-hidden />
                <p className="font-mono-tech text-[7px] sm:text-[9px] tracking-[0.18em] text-muted-foreground font-semibold">{item.label}</p>
                <p className={`font-display text-base sm:text-xl font-black mt-0.5 ${item.color}`}>{item.value}</p>
                <div className="mt-1 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-400 mx-auto" />
              </div>
            ))}
          </div>

          {/* Live Waveform Monitor */}
          <div className="mt-3.5 sm:mt-5 w-full max-w-2xl">
            <div className="mb-1 flex items-center justify-between font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                RF SPECTRUM — LIVE SCAN
              </span>
              <span className="text-primary font-bold">2.4 GHz ACTIVE</span>
            </div>
            <HudBrackets>
              <div className="relative h-10 sm:h-14 bg-black/60 backdrop-blur-sm overflow-hidden border border-primary/25">
                <LiveWaveform />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background),transparent_12%,transparent_88%,var(--background))]" />
              </div>
            </HudBrackets>
          </div>

        </div>
      </section>
    </>
  );
}
