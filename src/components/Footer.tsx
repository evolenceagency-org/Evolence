import Link from "next/link";

import { cn } from "@/lib/cn";
import { NAV_LINKS, SOCIALS } from "@/lib/site";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    SOCIALS.whatsapp ? { href: SOCIALS.whatsapp, label: "WhatsApp" } : null,
    SOCIALS.instagram ? { href: SOCIALS.instagram, label: "Instagram" } : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <footer className="border-t border-slate-200/60 py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
          >
            <Logo className="scale-[0.85] origin-left" />
          </Link>
          <p className="text-sm text-slate-600">
            (c) {year} Evolence. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
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
                    "inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-900 ring-1 ring-inset ring-slate-200 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-50 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none",
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
