import { Logo } from "./logo";

const columns = [
  {
    title: "Service",
    links: [
      { label: "Home buying", href: "#services" },
      { label: "Relocation", href: "#services" },
      { label: "Rental concierge", href: "#services" },
      { label: "Investment sourcing", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#why-us" },
      { label: "Clients", href: "#why-us" },
      { label: "Contact", href: "mailto:hello@atelierestate.com" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="container pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground text-pretty">
              A private advisory for buyers and tenants who value a calmer,
              more considered move. Based in Europe — working worldwide.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm text-muted-foreground">
              <a
                className="hover:text-foreground"
                href="mailto:hello@atelierestate.com"
              >
                hello@atelierestate.com
              </a>
              <a className="hover:text-foreground" href="tel:+34900000000">
                +34 900 000 000
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-forest-700">
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3 text-[14px]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/60 pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Atelier Estate. Crafted with care.
          </p>
          <div className="flex items-center gap-5">
            <a className="hover:text-foreground" href="#">
              Privacy
            </a>
            <a className="hover:text-foreground" href="#">
              Terms
            </a>
            <a className="hover:text-foreground" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
