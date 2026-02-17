"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);
  const scrolledRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const menuTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    [reduceMotion],
  );

  const isActive = useMemo(() => {
    return (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    };
  }, [pathname]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (open) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
      return;
    }

    toggleButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
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
    const onScroll = () => {
      const next = window.scrollY > 8;
      if (scrolledRef.current === next) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !open) return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
        return;
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navLinkBase =
    "group relative text-sm font-medium text-slate-900 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";
  const navLinkUnderline =
    "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2563eb] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100";

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
          <Logo className="scale-[0.7] origin-left" priority />
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
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_30px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none"
          >
            Book a Call
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 ring-1 ring-inset ring-slate-200 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none touch-manipulation sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          ref={toggleButtonRef}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col items-center justify-center gap-1">
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div className="sm:hidden">
        <AnimatePresence initial={false}>
          {open ? (
            <>
              <motion.div
                key="mobile-backdrop"
                className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: menuTransition }}
                exit={{ opacity: 0, transition: menuTransition }}
                onClick={() => setOpen(false)}
                aria-hidden="true"
                style={{ willChange: "opacity" }}
              />
              <motion.div
                key="mobile-panel"
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                className="fixed right-0 top-0 z-[60] h-full w-[78%] max-w-xs overflow-y-auto bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
                initial={{ x: "100%" }}
                animate={{ x: 0, transition: menuTransition }}
                exit={{ x: "100%", transition: menuTransition }}
                ref={panelRef}
                style={{ willChange: "transform" }}
              >
                <div className="flex h-[76px] items-center justify-between border-b border-slate-200/70 px-5">
                  <span className="text-sm font-semibold text-slate-900">Menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-900 ring-1 ring-inset ring-slate-200 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none touch-manipulation"
                  >
                    <span className="sr-only">Close menu</span>
                    <span className="relative block h-4 w-4">
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-slate-900" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-slate-900" />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  {NAV_LINKS.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex min-h-11 items-center rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-100 hover:text-[#2563eb] active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none",
                        isActive(item.href) && "bg-slate-100 text-slate-900",
                      )}
                      ref={index === 0 ? firstLinkRef : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="mt-2 inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.25)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_28px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none"
                    onClick={() => setOpen(false)}
                  >
                    Book a Call
                  </Link>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
