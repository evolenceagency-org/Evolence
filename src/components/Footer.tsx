import Link from "next/link";

import { cn } from "@/lib/cn";
import { NAV_LINKS, SOCIALS } from "@/lib/site";
import { Container } from "@/components/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    SOCIALS.whatsapp ? { href: SOCIALS.whatsapp, label: "WhatsApp" } : null,
    SOCIALS.instagram ? { href: SOCIALS.instagram, label: "Instagram" } : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-white/10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="w-fit rounded-md text-sm font-semibold text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:text-zinc-50 dark:focus-visible:ring-white/20"
          >
            Evolence
          </Link>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            © {year} Evolence. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {socials.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-9 items-center justify-center rounded-full bg-white/70 px-4 text-sm font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200 transition-colors hover:bg-white dark:bg-zinc-900/50 dark:text-zinc-100 dark:ring-zinc-800 dark:hover:bg-zinc-900/70",
                  )}
                >
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

