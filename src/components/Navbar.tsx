"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const NAV_LINK_BASE =
  "group relative text-sm font-medium text-slate-900 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";

const NAV_LINK_UNDERLINE =
  "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#2563eb] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100";

const ICON_BUTTON_CLASS =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 ring-1 ring-inset ring-slate-200 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none touch-manipulation";

const CTA_BUTTON_CLASS =
  "inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_14px_30px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none";

const MENU_BAR_CLASS =
  "block h-0.5 w-5 rounded-full bg-slate-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

function isPathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousOpenRef = useRef(open);
  const scrolledRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const menuTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    [reduceMotion],
  );

  useEffect(() => {
    if (previousOpenRef.current === open) return;

    if (open) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    } else {
      toggleButtonRef.current?.focus();
    }

    previousOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setOpen(false);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

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
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );

      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, open]);

  const toggleMenu = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 supports-[backdrop-filter]:bg-white/80 backdrop-blur transition-[background-color,box-shadow] duration-300",
        scrolled && "shadow-[0_10px_30px_rgba(15,23,42,0.08)]",
      )}
    >
      <Container className="flex h-[74px] items-center justify-between md:h-[76px]">
        <Link
          href="/"
          aria-label="Evolence home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
        >
          <Logo className="origin-left scale-[0.74] sm:scale-[0.8]" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((item) => {
            const active = isPathActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  NAV_LINK_BASE,
                  NAV_LINK_UNDERLINE,
                  active && "text-slate-900 after:scale-x-100",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/contact" className={CTA_BUTTON_CLASS}>
            Book a Call
          </Link>
        </nav>

        <button
          type="button"
          className={cn(ICON_BUTTON_CLASS, "md:hidden")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          ref={toggleButtonRef}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col items-center justify-center gap-1">
            <span
              className={cn(
                MENU_BAR_CLASS,
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
                MENU_BAR_CLASS,
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {open ? (
            <>
              <motion.div
                key="mobile-backdrop"
                className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: menuTransition }}
                exit={{ opacity: 0, transition: menuTransition }}
                onClick={closeMenu}
                aria-hidden="true"
                style={{ willChange: "opacity" }}
              />
              <motion.div
                key="mobile-panel"
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="fixed right-0 top-0 z-[60] h-[100dvh] w-[84%] max-w-sm overflow-y-auto bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
                initial={{ x: "100%" }}
                animate={{ x: 0, transition: menuTransition }}
                exit={{ x: "100%", transition: menuTransition }}
                ref={panelRef}
                style={{ willChange: "transform" }}
              >
                <div className="flex h-[74px] items-center justify-between border-b border-slate-200/70 px-5">
                  <span className="text-sm font-semibold text-slate-900">Menu</span>
                  <button
                    type="button"
                    onClick={closeMenu}
                    className={cn(ICON_BUTTON_CLASS, "rounded-lg")}
                  >
                    <span className="sr-only">Close menu</span>
                    <span className="relative block h-4 w-4">
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-slate-900" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-slate-900" />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  {NAV_LINKS.map((item, index) => {
                    const active = isPathActive(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex min-h-11 items-center rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-100 hover:text-[#2563eb] active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none",
                          active && "bg-slate-100 text-slate-900",
                        )}
                        aria-current={active ? "page" : undefined}
                        ref={index === 0 ? firstLinkRef : undefined}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    className={cn(CTA_BUTTON_CLASS, "mt-2 min-h-11 rounded-2xl px-5")}
                    onClick={closeMenu}
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
