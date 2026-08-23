import { useEffect, useState } from "react";
import { Menu, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS: { id: "home" | "events" | "about"; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "about", label: "About" },
];

export function SiteNav({
  onRegister,
  activeTab,
  onTabChange,
}: {
  onRegister: () => void;
  activeTab: "home" | "events" | "about";
  onTabChange: (tab: "home" | "events" | "about") => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTab = (tab: "home" | "events" | "about") => {
    onTabChange(tab);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "border-primary/35 bg-background/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleTab("home")}
          className="flex items-center gap-3"
          aria-label="Go to home tab"
        >
          <span className="grid size-9 place-items-center border border-primary/60 bg-primary/15 clip-tactical text-primary">
            <ShieldAlert className="size-4.5" aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-black tracking-[0.2em] text-foreground">
              ZEROTH HOUR
            </span>
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-muted-foreground">
              GLOBAL CRISIS MAKEATHON
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {TABS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleTab(l.id)}
              className={`relative px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] transition-colors group ${
                activeTab === l.id ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
              aria-current={activeTab === l.id ? "page" : undefined}
            >
              {l.label}
              <span
                className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                  activeTab === l.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
          <Button variant="alert" size="default" className="ml-3" onClick={onRegister}>
            Register
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button variant="alert" size="sm" onClick={onRegister} className="font-mono-tech text-[10px] tracking-wider px-2.5 py-1">
            REGISTER
          </Button>
          <button
            className="grid size-9 place-items-center border border-border text-foreground clip-tactical"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/98 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden animate-rise">
          {TABS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => handleTab(l.id)}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={`animate-slide-x flex w-full items-center justify-between border-b border-border/60 py-3.5 text-left font-mono-tech text-xs uppercase tracking-[0.2em] transition-colors ${
                activeTab === l.id ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
            >
              <span>{l.label}</span>
              {activeTab === l.id && <span className="size-1.5 rounded-full bg-accent" />}
            </button>
          ))}
          <Button
            variant="alert"
            className="mt-4 w-full group hover:shadow-[0_0_20px_rgba(224,76,17,0.4)] transition-shadow"
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
