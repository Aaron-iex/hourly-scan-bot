import { useEffect, useRef, useState, useCallback } from "react";
import { Calendar, ChevronRight, Clock, Flame, Crosshair, Radio, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntroSequence, INTRO_KEY } from "./IntroSequence";
import heroPlate from "@/assets/hero-plate.jpg";
import heroBoy from "@/assets/hero-boy.png";

/* ─── Floating Ember Particle Canvas ─── */
function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId = 0;
    let visible = true;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const count = window.innerWidth < 640 ? 22 : 45;
    type Ember = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number };
    const embers: Ember[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.6 + 0.12),
      r: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.5 + 0.08,
      hue: Math.random() > 0.6 ? 35 : Math.random() > 0.3 ? 55 : 15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        if (e.y < -6) {
          e.y = canvas.height + 6;
          e.x = Math.random() * canvas.width;
        }
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
      if (visible) rafId = requestAnimationFrame(draw);
    };
    draw();
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = !!entry?.isIntersecting;
      if (nowVisible && !visible) {
        visible = true;
        draw();
      } else if (!nowVisible) {
        visible = false;
        cancelAnimationFrame(rafId);
      }
    });
    io.observe(canvas);
    return () => {
      visible = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 size-full pointer-events-none" aria-hidden />;
}

/* ─── Animated SVG Radar Sweep behind the figure ─── */
function RadarSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 400 400" className="size-[240px] opacity-20 sm:size-[380px] md:size-[440px]">
        {[60, 120, 180].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="var(--primary)" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.6" />
        ))}
        <g className="animate-radar-sweep" style={{ transformOrigin: "200px 200px" }}>
          <defs>
            <linearGradient id="sweep-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M200,200 L200,20 A180,180,0,0,1,356,116 Z" fill="url(#sweep-grad)" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}

/* ─── Split-Flap Countdown Digit ─── */
function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-[2px]">
        {value.split("").map((char, i) => (
          <div
            key={i}
            className="relative flex size-8 items-center justify-center border border-primary/30 bg-black/45 sm:size-11 md:size-12"
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-primary/15" />
            <span className="font-display text-lg font-black tabular-nums text-foreground sm:text-2xl md:text-3xl">
              {char}
            </span>
          </div>
        ))}
      </div>
      <span className="font-mono-tech text-[8px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

/* ─── HUD Corner Brackets ─── */
function HudBrackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -top-1.5 -left-1.5 size-4 border-t-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute -top-1.5 -right-1.5 size-4 border-t-2 border-r-2 border-primary/50" />
      <div className="pointer-events-none absolute -bottom-1.5 -left-1.5 size-4 border-b-2 border-l-2 border-accent/50" />
      <div className="pointer-events-none absolute -bottom-1.5 -right-1.5 size-4 border-b-2 border-r-2 border-accent/50" />
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let rafId = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.002;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(224,76,17,0.75)";
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const noise = Math.sin(x * 0.03 + t * 0.7) * 6 + Math.cos(x * 0.02 + t * 1.1) * 10;
        const y = h / 2 + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      const scanX = (t * 50) % w;
      ctx.fillStyle = "rgba(224,76,17,0.15)";
      ctx.fillRect(scanX - 1, 0, 3, h);
      rafId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="size-full" aria-hidden />;
}

/* ─── Pointer parallax for the figure ─── */
function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: ((e.clientX - cx) / cx) * 10, y: ((e.clientY - cy) / cy) * 6 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return offset;
}

/* ─── HERO ─── */
export function Hero({ onRegister }: { onRegister: () => void }) {
  const [clock, setClock] = useState<string | null>(null);
  const [operatives, setOperatives] = useState(0);
  const [cd, setCd] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [intro, setIntro] = useState(false);
  const parallax = useParallax();

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && !reduced) setIntro(true);
  }, []);

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntro(false);
  }, []);

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
      {intro && <IntroSequence onComplete={handleIntroDone} />}
      <section id="top" className="relative isolate overflow-hidden scanlines">
        {/* BG plate */}
        <img
          src={heroPlate}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 size-full object-cover object-[center_35%] opacity-55 brightness-[0.8] contrast-110"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_20%,var(--background)_92%)]" />
        <div className="absolute inset-0 -z-10 grid-tactical opacity-25" />
        <EmberCanvas />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background to-transparent sm:h-48" />

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4 text-center sm:px-6 sm:py-8 lg:px-8">
          {/* ── DEFCON Badge ── */}
          <div className="animate-rise mb-4 inline-flex max-w-full items-center gap-2 border border-primary/60 bg-primary/15 px-3 py-1.5 clip-tactical sm:px-4">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <Radio className="size-3 shrink-0 text-primary" aria-hidden />
            <span className="truncate font-mono-tech text-[9px] font-bold tracking-[0.2em] text-accent sm:text-[10px] sm:tracking-[0.25em]">
              DEFCON 1 PROTOCOL {clock ? `// ${clock}` : ""}
            </span>
          </div>

          {/* ── College Header ── */}
          <div className="animate-rise w-full max-w-5xl">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-6">
              <div className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/50 bg-black/70 sm:size-20 md:size-24">
                <img src="/images/jec-emblem.png" alt="Jaya Educational Trust emblem" className="size-full object-cover" />
              </div>
              <div className="min-w-0 text-center">
                <h2 className="font-display text-[13px] leading-tight font-black uppercase tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                  Jaya Engineering College
                </h2>
                <p className="mt-1 font-mono-tech text-[7px] text-muted-foreground sm:text-xs md:text-sm">
                  Accredited by NAAC &amp; NBA | Approved by AICTE | Affiliated to Anna University
                </p>
                <p className="mt-0.5 font-mono-tech text-[7px] font-bold tracking-wide text-accent sm:text-[11px]">
                  CTH Road, Thiruninravur, Chennai — 602024
                </p>
              </div>
              <div className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-accent/50 bg-black/70 sm:size-20 md:size-24">
                <img src="/images/jec-31years.png" alt="31 years of excellence" className="size-full object-cover" />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <p className="font-mono-tech text-[9px] font-black uppercase tracking-[0.15em] text-primary sm:text-sm sm:tracking-[0.2em] md:text-base">
                Department of Electronics and Communication Engineering
              </p>
              <span className="inline-block border border-accent/50 bg-accent/15 px-4 py-1 clip-tactical font-mono-tech text-[9px] font-bold uppercase tracking-[0.3em] text-accent sm:text-xs">
                // Presents
              </span>
            </div>
          </div>

          {/* ── STAGE: MAKEATHON · figure · ZEROTH HOUR ── */}
          <div className="relative mt-6 grid w-full items-center gap-2 sm:mt-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
            {/* LEFT — MAKEATHON */}
            <h1 className="animate-rise order-1 font-display text-[clamp(2.1rem,12vw,3.2rem)] leading-[0.85] font-black uppercase tracking-tighter text-foreground md:order-none md:justify-self-end md:text-right md:text-[clamp(2.6rem,5.4vw,4.6rem)]">
              Make<span className="block md:inline">athon</span>
            </h1>

            {/* CENTER — the figure, popping out */}
            <div className="relative order-2 flex items-end justify-center md:order-none">
              <RadarSweep />
              {/* ground glow */}
              <div
                className="pointer-events-none absolute bottom-1 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[50%] bg-primary/45 blur-xl sm:h-8"
                aria-hidden
              />
              <img
                src={heroBoy}
                alt="Student operative holding a glowing laptop amid the crisis zone"
                width={231}
                height={532}
                className="animate-float relative z-10 h-[210px] w-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.75)] transition-transform duration-300 ease-out sm:h-[300px] md:h-[360px] lg:h-[420px]"
                style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
              />
            </div>

            {/* RIGHT — ZEROTH HOUR */}
            <div className="animate-rise order-3 md:order-none md:justify-self-start md:text-left">
              <p className="font-display text-[clamp(1.6rem,9vw,2.4rem)] leading-[0.9] font-black uppercase tracking-tight text-primary md:text-[clamp(2rem,4.4vw,3.6rem)]">
                Zeroth
                <span className="block text-accent">Hour</span>
              </p>
              <p className="mt-2 font-mono-tech text-[9px] uppercase tracking-[0.28em] text-muted-foreground sm:text-[11px]">
                Sept 11 // 5-hour sprint
              </p>
            </div>
          </div>

          {/* ── Countdown ── */}
          <HudBrackets className="animate-rise mt-8 border border-primary/20 bg-black/25 px-3 py-3 sm:mt-10 sm:px-8 sm:py-5">
            <div className="mb-2 flex items-center justify-center gap-1.5 sm:mb-3">
              <Shield className="size-3 text-primary sm:size-3.5" aria-hidden />
              <span className="font-mono-tech text-[8px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[10px]">
                Time to Zero Hour
              </span>
            </div>
            <div className="flex items-start justify-center gap-1.5 sm:gap-3">
              <FlipDigit value={cd.d} label="Days" />
              <span className="mt-1 font-display text-base font-black text-primary sm:mt-2 sm:text-2xl">:</span>
              <FlipDigit value={cd.h} label="Hrs" />
              <span className="mt-1 font-display text-base font-black text-primary sm:mt-2 sm:text-2xl">:</span>
              <FlipDigit value={cd.m} label="Min" />
              <span className="mt-1 font-display text-base font-black text-primary sm:mt-2 sm:text-2xl">:</span>
              <FlipDigit value={cd.s} label="Sec" />
            </div>
          </HudBrackets>

          {/* ── Date & Venue ── */}
          <div className="animate-rise mt-5 flex w-full max-w-md items-center gap-3 border border-accent/60 bg-accent/10 px-4 py-2.5 text-left clip-tactical">
            <Calendar className="size-5 shrink-0 text-accent" aria-hidden />
            <div className="min-w-0">
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-accent sm:text-sm">
                Sept 11 // 5-hour makeathon
              </p>
              <p className="font-mono-tech text-[10px] text-muted-foreground">
                Venue: Jaya Auditorium · Registration queue open
              </p>
            </div>
          </div>

          {/* ── CTA Buttons ── */}
          <div className="animate-rise mt-5 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Button
              variant="alert"
              onClick={onRegister}
              className="group w-full min-h-11 sm:w-auto transition-transform duration-200 hover:scale-[1.02]"
            >
              <Flame className="size-4 transition-transform group-hover:rotate-12" aria-hidden />
              Enlist your squad
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1.5" aria-hidden />
            </Button>
            <Button variant="tactical" asChild className="group w-full min-h-11 sm:w-auto">
              <a href="#roadmap">
                <Clock className="size-4" aria-hidden />
                View build schedule
              </a>
            </Button>
          </div>

          {/* ── Prize + Registration Cards ── */}
          <div className="animate-rise mt-5 flex w-full max-w-lg justify-center gap-2 sm:gap-3">
            <HudBrackets className="flex flex-1 flex-col items-center justify-center gap-1 border border-primary/15 bg-black/30 px-2 py-3 transition-colors hover:bg-primary/12 sm:px-3">
              <p className="font-mono-tech text-[8px] tracking-[0.2em] text-accent sm:text-[10px]">PRIZE CACHE</p>
              <p className="font-display text-xl font-black text-foreground sm:text-3xl">₹22K</p>
              <p className="text-center font-mono-tech text-[7px] text-muted-foreground sm:text-[9px]">+ MERCH &amp; CERTS</p>
            </HudBrackets>
            <HudBrackets className="flex flex-1 flex-col items-center justify-center gap-1 border border-accent/15 bg-black/30 px-2 py-3 transition-colors hover:bg-accent/12 sm:px-3">
              <p className="font-mono-tech text-[8px] tracking-[0.2em] text-accent sm:text-[10px]">REGISTRATION</p>
              <p className="font-display text-xl font-black text-foreground sm:text-3xl">₹200</p>
              <p className="text-center font-mono-tech text-[7px] text-muted-foreground sm:text-[9px]">FOOD &amp; WI-FI INCLUDED</p>
            </HudBrackets>
          </div>

          {/* ── Live Tactical Readouts ── */}
          <div className="animate-rise mt-6 grid w-full max-w-lg grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            {[
              { label: "THREAT LEVEL", value: "CRITICAL", color: "text-primary", icon: Zap },
              { label: "OPERATIVES", value: `${operatives}+`, color: "text-foreground", icon: Shield },
              { label: "ECE TRACKS", value: "05", color: "text-accent", icon: Crosshair },
            ].map((item) => (
              <div
                key={item.label}
                className="group panel-tactical p-2.5 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-4"
              >
                <item.icon className="mx-auto mb-1.5 size-4 text-primary transition-transform group-hover:scale-125" aria-hidden />
                <p className="font-mono-tech text-[8px] tracking-[0.16em] text-muted-foreground sm:text-[9px] sm:tracking-[0.2em]">
                  {item.label}
                </p>
                <p className={`mt-0.5 font-display text-base font-black sm:text-xl ${item.color}`}>{item.value}</p>
                <div className="mx-auto mt-1.5 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* ── Live Waveform ── */}
          <div className="animate-rise mt-6 w-full max-w-3xl">
            <div className="mb-1 flex items-center justify-between font-mono-tech text-[8px] tracking-[0.2em] text-muted-foreground sm:text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                RF SPECTRUM — LIVE
              </span>
              <span className="font-bold text-primary">2.4 GHz</span>
            </div>
            <HudBrackets>
              <div className="relative h-10 overflow-hidden border border-primary/15 bg-black/30 sm:h-14 md:h-16">
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
