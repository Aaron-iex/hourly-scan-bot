const SPONSORS = [
  { name: "Cooper Elevators", src: "/images/sponsors/image.png" },
  { name: "Your brand here", src: null },
  { name: "Your brand here", src: null },
];

export function Sponsors() {
  return (
    <section aria-labelledby="sponsors-heading" className="border-b border-border bg-card/30 py-8 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="shrink-0 border-r border-primary/30 pr-8">
          <p id="sponsors-heading" className="font-mono-tech text-[10px] tracking-[0.24em] text-primary">SUPPORTED BY</p>
          <p className="mt-1 font-display text-sm font-bold uppercase text-foreground">Mission partners</p>
        </div>
        <div className="flex min-w-max animate-[ticker_28s_linear_infinite] items-center gap-5" aria-label="Sponsors">
          {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
            <div key={`${sponsor.name}-${index}`} className="flex h-16 min-w-52 items-center justify-center border border-border bg-background/70 px-6 transition-colors hover:border-accent/60">
              {sponsor.src ? (
                <img src={sponsor.src} alt={`${sponsor.name} sponsor logo`} className="max-h-12 max-w-40 object-contain" />
              ) : (
                <span className="font-mono-tech text-[10px] tracking-[0.18em] text-muted-foreground">SPONSOR SLOT OPEN</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
