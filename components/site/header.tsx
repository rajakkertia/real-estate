"use client";

import * as React from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why us" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#get-started">
              Start my brief
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" className="md:hidden" variant="default">
            <a href="#get-started">Start</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-sand-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container flex flex-col py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/50 py-4 text-[15px] font-medium text-foreground last:border-0"
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="mt-4" size="lg">
            <a href="#get-started" onClick={() => setOpen(false)}>
              Start your brief
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
