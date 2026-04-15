export function TrustBar() {
  const items = [
    "Monocle",
    "Financial Times",
    "Architectural Digest",
    "Condé Nast Traveler",
    "Wallpaper*",
    "Kinfolk",
  ];
  return (
    <section aria-label="As seen in" className="relative border-y border-border/50">
      <div className="container flex flex-col items-center gap-5 py-10 md:flex-row md:justify-between md:gap-10 md:py-7">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-muted-foreground/80">
          Quietly written about in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 md:flex-1 md:justify-end">
          {items.map((item) => (
            <span
              key={item}
              className="font-display text-[15px] tracking-tight text-foreground/55 transition-colors hover:text-foreground/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
