export function TrustBar() {
  const items = [
    "Featured in Monocle",
    "Financial Times",
    "Architectural Digest",
    "Condé Nast Traveler",
    "Wallpaper*",
    "Kinfolk",
  ];
  return (
    <section
      aria-label="As seen in"
      className="relative border-y border-border/50 bg-card/40"
    >
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          As featured in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:flex-1 md:justify-end">
          {items.map((item) => (
            <span
              key={item}
              className="font-display text-[15px] tracking-tight text-foreground/75"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
