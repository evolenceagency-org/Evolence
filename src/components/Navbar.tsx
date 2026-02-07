"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "@/components/Container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = useMemo(() => {
    return (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/40">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          className="rounded-md text-sm font-semibold tracking-tight text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:text-zinc-50 dark:focus-visible:ring-white/20"
        >
          Evolence
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                isActive(item.href) &&
                  "font-medium text-zinc-900 dark:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:ring-white/20"
          >
            Book a Call
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full bg-white/70 px-4 text-sm font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:bg-zinc-900/50 dark:text-zinc-100 dark:ring-zinc-800 dark:hover:bg-zinc-900/70 dark:focus-visible:ring-white/20 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "sm:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="pb-4">
          <div className="rounded-3xl border border-white/40 bg-white/70 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/40">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/10",
                    isActive(item.href) &&
                      "bg-zinc-900/5 font-medium dark:bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:ring-white/20"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
