import { useEffect, useState } from "react";
import { Menu, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#briefing", label: "Briefing" },
  { href: "#sectors", label: "Sectors" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#intel", label: "Intel" },
];

export function SiteNav({ onRegister }: { onRegister: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-primary/35 bg-background/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center border border-primary/60 bg-primary/15 clip-tactical text-primary">
            <ShieldAlert className="size-4.5" aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-black tracking-[0.2em] text-foreground">
              ZEROTH HOUR
            </span>
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-muted-foreground">
              GLOBAL CRISIS HACKATHON
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <Button variant="alert" size="default" className="ml-3" onClick={onRegister}>
            Register
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center border border-border text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 pb-4 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button
            variant="alert"
            className="mt-4 w-full"
            onClick={() => {
              setOpen(false);
              onRegister();
            }}
          >
            Register squad
          </Button>
        </div>
      )}
    </header>
  );
}
