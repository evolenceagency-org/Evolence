import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { PLANS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, project-based pricing. Choose a plan and ship fast with Evolence.",
};

export default function PricingPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="Pricing"
          as="h1"
          title="Simple pricing. Fast delivery."
          subtitle="One-time project pricing with clear scope and premium execution."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {PLANS.map((p) => (
            <GlassCard key={p.name} className="relative flex h-full flex-col">
              {p.popular ? (
                <div className="absolute -top-3 right-5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  Most popular
                </div>
              ) : null}

              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {p.name}
                </h2>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {p.billing}
                </p>
              </div>

              <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {p.priceRange}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-900/60 dark:bg-zinc-100/60" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={`/contact?plan=${encodeURIComponent(p.name)}`}>
                  Start with {p.name}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12">
          <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Not sure which plan fits?
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Send a message and we’ll recommend the fastest option for your
                goal.
              </p>
            </div>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
