import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2.5 text-foreground",
        className,
      )}
      aria-label="Atelier Estate"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-forest-700 text-sand-50 shadow-sm shadow-forest-900/20 transition-transform group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-medium tracking-tight">
          Atelier Estate
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Private Advisory
        </span>
      </span>
    </a>
  );
}
