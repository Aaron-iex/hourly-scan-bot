const SPONSORS = [
  { name: "Cooper Elevators", image: "/images/sponsors/image.png" },
  { name: "Cooper Elevators", image: "/images/sponsors/image copy.png" },
  { name: "Cooper Elevators", image: "/images/sponsors/image copy 2.png" },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono-tech text-[11px] tracking-[0.25em] text-primary">
            // INDUSTRY CONNECT
          </span>
          <h2 className="mt-3 font-display text-2xl font-black uppercase sm:text-4xl">
            Powered by <span className="text-accent">our sponsors</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Our industry partners help students turn electronics, communication, and embedded ideas
            into solutions that can move beyond the lab.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPONSORS.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="group flex min-h-32 items-center justify-center border border-primary/30 bg-background/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[var(--shadow-panel)]"
            >
              <img
                src={sponsor.image}
                alt={`${sponsor.name} logo`}
                className="max-h-20 w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
              />
            </div>
          ))}
          <div className="flex min-h-32 items-center justify-center border border-dashed border-border bg-background/30 p-6 text-center">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Partner spaces open
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
