"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navLinkBase =
    "group relative text-sm font-medium text-slate-900 transition-colors hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";
  const navLinkUnderline =
    "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2563eb] after:transition-transform after:duration-300 after:content-[''] group-hover:after:scale-x-100";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/70 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm"
          : "bg-white",
      )}
    >
      <Container className="flex h-[76px] items-center justify-between">
        <Link
          href="/"
          aria-label="Evolence home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
        >
          <Logo className="scale-[0.72] origin-left" />
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 sm:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                navLinkBase,
                navLinkUnderline,
                isActive(item.href) && "text-slate-900 after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_30px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
          >
            Book a Call
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col items-center justify-center gap-1">
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-300",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-300",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div className={cn("sm:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          className={cn(
            "fixed inset-0 z-[55] bg-slate-900/20 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          className={cn(
            "fixed right-0 top-0 z-[60] h-full w-[78%] max-w-xs bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-slate-200/70 px-5">
            <span className="text-sm font-semibold text-slate-900">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            >
              <span className="sr-only">Close menu</span>
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-slate-900" />
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-slate-900" />
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-2 p-5">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 hover:text-[#2563eb]",
                  isActive(item.href) && "bg-slate-100 text-slate-900",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_28px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
