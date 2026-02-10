import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Notion systems, AI automation, and modern web presence - built fast and designed to convert.",
};

export default function ServicesPage() {
  return (
    <section className="py-14 sm:py-20" data-reveal>
      <Container>
        <SectionTitle
          eyebrow="Services"
          as="h1"
          title="Three core services. Zero clutter."
          subtitle="A minimal offer stack designed for speed, clarity, and premium execution."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6">
          {SERVICES.map((s) => (
            <GlassCard key={s.title}>
              <h2 className="text-xl font-semibold tracking-tight text-[#0f172a]">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {s.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/pricing">See pricing</Button>
          <Button href="/contact" variant="secondary">
            Book a Call
          </Button>
        </div>
      </Container>
    </section>
  );
}

