import { useEffect, useRef, useState, useCallback } from "react";
import { Calendar, ChevronRight, Clock, Flame, Crosshair, Radio, Shield, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cataclysm.jpg";

/* ─── Cinematic Opening Sequence ─── */
const DISASTER_SEQUENCE = [
  { text: "⚠ SEISMIC BREACH DETECTED", color: "text-red-500" },
  { text: "◈ CORE MELTDOWN IMMINENT", color: "text-orange-400" },
  { text: "◉ RF BLACKOUT — ALL BANDS", color: "text-yellow-400" },
  { text: "△ GLOBAL COMMS FAILURE", color: "text-red-400" },
  { text: "▣ INITIATING ZEROTH HOUR PROTOCOL", color: "text-primary" },
];

const INTRO_SESSION_KEY = "zh_intro_played_session_v3";

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0-4 = disaster lines, 5 = fade out
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (phase < DISASTER_SEQUENCE.length) {
      const id = setTimeout(() => setPhase((p) => p + 1), 600);
      return () => clearTimeout(id);
    } else {
      // start fade out
      setOpacity(0);
      const id = setTimeout(onComplete, 700);
      return () => clearTimeout(id);
    }
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none transition-opacity duration-700"
      style={{ opacity }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-60" />
      {/* Grid */}
      <div className="absolute inset-0 grid-tactical opacity-15" />

      {/* Central warning icon */}
      <div className="relative mb-6">
        <AlertTriangle className="size-10 sm:size-14 text-primary animate-pulse" />
        <div className="absolute inset-0 animate-ping">
          <AlertTriangle className="size-10 sm:size-14 text-primary opacity-30" />
        </div>
      </div>

      {/* Disaster lines */}
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        {DISASTER_SEQUENCE.map((item, i) => (
          <div
            key={i}
            className={`font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
              i < phase ? `${item.color} opacity-100 translate-y-0 font-bold` : "opacity-0 translate-y-4"
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Bottom flash bar */}
      {phase >= 3 && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-primary animate-pulse" />
      )}
    </div>
  );
}

/* ─── Floating Ember Particle Canvas ─── */
function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    type Ember = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number; decay: number };
    const embers: Ember[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.6 + 0.12),
      r: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.55 + 0.08,
      hue: Math.random() > 0.6 ? 35 : Math.random() > 0.3 ? 55 : 15,
      decay: Math.random() * 0.002 + 0.001,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((e) => {
        e.x += e.vx + Math.sin(Date.now() * 0.001 + e.y) * 0.08;
        e.y += e.vy;
        e.alpha += (Math.random() - 0.5) * 0.015;
        e.alpha = Math.max(0.03, Math.min(0.6, e.alpha));
        if (e.y < -6) { e.y = canvas.height + 6; e.x = Math.random() * canvas.width; e.alpha = 0.4; }
        ctx.save();
        ctx.globalAlpha = e.alpha;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3.5);
        g.addColorStop(0, `hsl(${e.hue}, 100%, 75%)`);
        g.addColorStop(0.4, `hsla(${e.hue}, 100%, 50%, 0.3)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 size-full pointer-events-none" aria-hidden />;
}

/* ─── Animated SVG Radar Sweep behind title ─── */
function RadarSweep() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10" aria-hidden>
      <svg viewBox="0 0 400 400" className="size-[180px] sm:size-[320px] md:size-[420px] opacity-10 sm:opacity-15">
        {[60, 120, 180].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.5" />
        ))}
        <line x1="200" y1="20" x2="200" y2="380" stroke="var(--primary)" strokeWidth="0.3" opacity="0.3" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="var(--primary)" strokeWidth="0.3" opacity="0.3" />
        <g className="animate-radar-sweep" style={{ transformOrigin: "200px 200px" }}>
          <defs>
            <linearGradient id="sweep-grad" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(0 0.5 0.5)">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M200,200 L200,20 A180,180,0,0,1,356,116 Z" fill="url(#sweep-grad)" opacity="0.4" />
        </g>
        {[
          { cx: 260, cy: 130 }, { cx: 145, cy: 270 }, { cx: 310, cy: 220 },
          { cx: 120, cy: 140 }, { cx: 250, cy: 290 },
        ].map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="var(--accent)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

/* ─── Split-Flap Countdown Digit (Compact Size) ─── */
function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative flex gap-[2px]">
        {value.split("").map((char, i) => (
          <div
            key={i}
            className="relative size-6 sm:size-8 md:size-10 flex items-center justify-center
                       bg-black/70 backdrop-blur-md
                       border border-primary/35 shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            style={{ clipPath: "inset(0 round 2px)" }}
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            <span className="font-display text-sm sm:text-lg md:text-xl font-black text-foreground tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
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
      {/* TL */}
      <div className="absolute -top-1.5 -left-1.5 size-4 border-t-2 border-l-2 border-primary/50 pointer-events-none" />
      {/* TR */}
      <div className="absolute -top-1.5 -right-1.5 size-4 border-t-2 border-r-2 border-primary/50 pointer-events-none" />
      {/* BL */}
      <div className="absolute -bottom-1.5 -left-1.5 size-4 border-b-2 border-l-2 border-accent/50 pointer-events-none" />
      {/* BR */}
      <div className="absolute -bottom-1.5 -right-1.5 size-4 border-b-2 border-r-2 border-accent/50 pointer-events-none" />
      {children}
    </div>
  );
}

/* ─── Animated Waveform ─── */
function LiveWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId: number;
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; };
    resize();
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.002;
      // primary wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(224,76,17,0.7)";
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const noise = Math.sin(x * 0.04 + t) * 8 + Math.sin(x * 0.015 + t * 1.3) * 14 + Math.random() * 2;
        const y = h / 2 + noise + (x > w * 0.3 && x < w * 0.4 ? Math.sin(x * 0.1) * 25 : 0)
                + (x > w * 0.6 && x < w * 0.75 ? Math.cos(x * 0.08 + t) * 20 : 0);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // accent glow wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,200,0,0.3)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x++) {
        const noise = Math.sin(x * 0.03 + t * 0.7) * 6 + Math.cos(x * 0.02 + t * 1.1) * 10;
        const y = h / 2 + noise;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // scan line
      const scanX = ((t * 50) % w);
      ctx.fillStyle = "rgba(224,76,17,0.2)";
      ctx.fillRect(scanX - 1, 0, 3, h);
      rafId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="size-full" aria-hidden />;
}

/* ─── HERO ─── */
export function Hero({ onRegister }: { onRegister: () => void }) {
  const [clock, setClock] = useState<string | null>(null);
  const [operatives, setOperatives] = useState(0);
  const [cd, setCd] = useState({ d: "00", h: "00", m: "00", s: "00" });

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
      const p = Math.min((ts - start) / 2500, 1);
      setOperatives(Math.floor((p === 1 ? 1 : 1 - Math.pow(2, -10 * p)) * 500));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, []);

  useEffect(() => {
    const target = new Date("2026-09-17T09:30:00").getTime();
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

  // Check if intro has already run in this session so it won't repeat when switching tabs
  const [introDone, setIntroComplete] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem(INTRO_SESSION_KEY);
    }
    return false;
  });

  const handleIntroDone = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "true");
      } catch {}
    }
    setIntroComplete(true);
  }, []);

  return (
    <>
    {!introDone && <CinematicIntro onComplete={handleIntroDone} />}
    <section id="top" className="relative isolate overflow-hidden scanlines">
      {/* BG Layers — keep image visible */}
      <img src={heroImage} alt="" width={1920} height={1088}
        className="absolute inset-0 -z-20 size-full object-cover object-[center_30%] opacity-60 brightness-[0.85] contrast-110 saturate-[1.15]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,transparent_25%,var(--background)_90%)]" />
      <div className="absolute inset-0 -z-10 grid-tactical opacity-30" />
      <EmberCanvas />
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-48 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-2 py-2 text-center sm:px-6 lg:px-8 sm:py-8">

        {/* ── DEFCON Badge ── */}
        <div className="animate-rise inline-flex items-center gap-2.5 border border-primary/60 bg-primary/15 px-4 py-1.5 clip-tactical mb-3 animate-pulse-glow">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <Radio className="size-3 text-primary animate-pulse" />
          <span className="font-mono-tech text-[10px] tracking-[0.25em] text-accent font-bold">
            DEFCON 1 PROTOCOL {clock ? `// ${clock}` : ""}
          </span>
        </div>

        {/* ── College Header ── */}
        <div className="animate-rise w-full max-w-5xl px-1 sm:px-4">
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="shrink-0">
              <div className="size-16 sm:size-24 md:size-32 flex items-center justify-center transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)] animate-float">
                <img src="/images/jec-emblem.png?v=20260826" alt="Jaya Educational Trust Emblem" className="size-full object-contain filter drop-shadow-md" />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-center">
              <h2 className="font-display text-sm sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight sm:tracking-wide text-foreground leading-tight">
                JAYA ENGINEERING COLLEGE
              </h2>
              <p className="mt-1 font-mono-tech text-[7px] sm:text-xs md:text-sm text-muted-foreground font-medium">
                Accredited by NAAC & NBA | Approved by AICTE | Affiliated to Anna University
              </p>
              <p className="mt-0.5 font-mono-tech text-[7px] sm:text-[11px] text-accent font-bold tracking-wide">
                📍 CTH Road, Thiruninravur, Chennai — 602024
              </p>
            </div>
            <div className="shrink-0">
              <div className="size-16 sm:size-24 md:size-32 flex items-center justify-center transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)] animate-float" style={{ animationDelay: "1s" }}>
                <img src="/images/jec-31years.png?v=20260826" alt="31 Years of Excellence" className="size-full object-contain filter drop-shadow-md" />
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 space-y-2">
            <p className="font-mono-tech text-[10px] sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary font-black">
              DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING
            </p>
            <span className="inline-block border border-accent/50 bg-accent/15 px-4 py-1 clip-tactical font-mono-tech text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent font-bold">
              // PRESENTS
            </span>
          </div>
        </div>

        {/* ── Main Event Title with Radar (Clean, No Box Frame) ── */}
        <div className="relative mt-6 sm:mt-8">
          <RadarSweep />
          <div className="px-4 py-2 sm:px-8 sm:py-4">
            <h1 className="animate-rise font-display uppercase">
              <span className="block text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter"
                    style={{ textShadow: "0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(224,76,17,0.15)" }}>
                MAKEATHON
              </span>
              <span className="mt-2 block text-lg sm:text-3xl md:text-4xl lg:text-5xl font-extrabold shimmer-text tracking-wide">
                PROJECT ZEROTH HOUR
              </span>
            </h1>
          </div>
          {/* Floating crosshair */}
          <Crosshair className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 size-6 sm:size-8 text-primary/40 animate-float" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* ── Breathing gap — BG image visible ── */}
        <div className="mt-4 sm:mt-6" />

        {/* ── Compact Split-Flap Countdown (Clean, No Box Frame) ── */}
        <div className="animate-rise mt-3 sm:mt-4 px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1.5 justify-center">
            <Shield className="size-3 sm:size-3.5 text-primary" />
            <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.22em] text-primary font-bold uppercase">
              Time to Zero Hour
            </span>
          </div>
          <div className="flex items-start gap-1 sm:gap-2 justify-center">
            <FlipDigit value={cd.d} label="Days" />
            <span className="font-display text-sm sm:text-lg font-black text-primary mt-0.5 sm:mt-1 animate-flicker">:</span>
            <FlipDigit value={cd.h} label="Hrs" />
            <span className="font-display text-sm sm:text-lg font-black text-primary mt-0.5 sm:mt-1 animate-flicker">:</span>
            <FlipDigit value={cd.m} label="Min" />
            <span className="font-display text-sm sm:text-lg font-black text-primary mt-0.5 sm:mt-1 animate-flicker">:</span>
            <FlipDigit value={cd.s} label="Sec" />
          </div>
        </div>

        {/* ── Date & Venue (High Opacity, High Readability) ── */}
        <div className="animate-rise mt-4 flex w-full max-w-md items-center gap-3 border border-accent/70 bg-black/80 backdrop-blur-md px-4 py-2.5 clip-tactical text-left group hover:bg-black/90 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <Calendar className="size-5 shrink-0 text-accent group-hover:animate-bounce" aria-hidden />
          <div>
            <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-accent">
              SEPT 17 // 5-HOUR MAKEATHON
            </p>
            <p className="font-mono-tech text-[10px] sm:text-[11px] text-white/90 font-medium">
              Venue: Jaya Auditorium · Registration queue open
            </p>
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="animate-rise mt-5 flex flex-col gap-2.5 sm:flex-row w-full sm:w-auto">
          <Button variant="alert" size="default" onClick={onRegister}
            className="w-full sm:w-auto group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(224,76,17,0.6)] hover:scale-[1.02]">
            <Flame className="size-4 transition-transform group-hover:rotate-12 group-hover:scale-110" aria-hidden />
            Enlist your squad
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1.5" aria-hidden />
          </Button>
          <Button variant="tactical" size="default" asChild
            className="w-full sm:w-auto group transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,200,0,0.25)] hover:scale-[1.02]">
            <a href="#roadmap">
              <Clock className="size-4 transition-transform group-hover:rotate-[-15deg]" aria-hidden />
              View build schedule
            </a>
          </Button>
        </div>

        {/* ── Prize + Registration Cards (High Opacity, High Readability) ── */}
        <div className="animate-rise mt-4 sm:mt-5 flex w-full max-w-lg flex-row gap-2 sm:gap-3 justify-center">
          <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-black/80 backdrop-blur-md px-3 py-3 rounded border border-primary/50 group hover:border-primary transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <p className="font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-accent font-bold">PRIZE CACHE</p>
            <p className="font-display text-xl sm:text-3xl font-black text-foreground">₹22K</p>
            <p className="font-mono-tech text-[8px] sm:text-[10px] text-white/90 font-semibold text-center">+ MERCH & CERTS</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-black/80 backdrop-blur-md px-3 py-3 rounded border border-accent/50 group hover:border-accent transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <p className="font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-accent font-bold">REGISTRATION</p>
            <p className="font-display text-xl sm:text-3xl font-black text-foreground">₹200</p>
            <p className="font-mono-tech text-[8px] sm:text-[10px] text-white/90 font-semibold text-center">FOOD & WI-FI INCLUDED</p>
          </div>
        </div>

        {/* ── Live Tactical Readouts ── */}
        <div className="animate-rise mt-5 sm:mt-7 grid w-full grid-cols-3 gap-3 max-w-lg">
          {[
            { label: "THREAT LEVEL", value: "CRITICAL", color: "text-primary", icon: Zap },
            { label: "OPERATIVES", value: `${operatives}+`, color: "text-foreground", icon: Shield },
            { label: "ECE TRACKS", value: "05", color: "text-alert-gradient", icon: Crosshair },
          ].map((item, i) => (
            <div key={i} className="group panel-tactical p-3 sm:p-4 text-center transition-all duration-300 hover:-translate-y-1 bg-black/75">
              <item.icon className="size-4 text-primary mx-auto mb-1.5 transition-transform group-hover:scale-125 group-hover:rotate-12" aria-hidden />
              <p className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.2em] text-muted-foreground font-semibold">{item.label}</p>
              <p className={`font-display text-lg sm:text-xl font-black mt-0.5 ${item.color}`}>{item.value}</p>
              <div className="mt-1.5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-500 mx-auto" />
            </div>
          ))}
        </div>

        {/* ── Live Waveform ── */}
        <div className="animate-rise mt-5 sm:mt-6 w-full max-w-3xl">
          <div className="mb-1 flex items-center justify-between font-mono-tech text-[8px] sm:text-[10px] tracking-[0.2em] text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              RF SPECTRUM — LIVE SCAN
            </span>
            <span className="text-primary font-bold">2.4 GHz ACTIVE</span>
          </div>
          <HudBrackets>
            <div className="relative h-10 sm:h-14 md:h-16 bg-black/70 backdrop-blur-md overflow-hidden border border-primary/25 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              <LiveWaveform />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background),transparent_15%,transparent_85%,var(--background))]" />
            </div>
          </HudBrackets>
        </div>
      </div>
    </section>
    </>
  );
}
