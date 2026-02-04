import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { PLANS, SERVICES, SITE, FAQS } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <section className="pt-14 sm:pt-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:items-start sm:text-left">
            <div className="w-fit rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 ring-1 ring-inset ring-zinc-200 backdrop-blur-xl dark:bg-zinc-950/40 dark:text-zinc-300 dark:ring-zinc-800">
              Premium, lightweight builds
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                {SITE.title}
              </h1>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8">
                {SITE.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/contact" className="w-full sm:w-auto">
                Book a Call
              </Button>
              <Button
                href="/pricing"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                See Pricing
              </Button>
            </div>

            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {SITE.trustLine}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="What we do"
            title="Simple systems that remove friction"
            subtitle="Minimal, conversion-focused delivery—so your business runs smoother, faster, and clearer."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {SERVICES.map((s) => (
              <GlassCard key={s.title} className="h-full">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-900/60 dark:bg-zinc-100/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="Fast, focused, and clear"
            subtitle="A simple process designed for speed—without sacrificing quality."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              {
                title: "Quick scope",
                text: "Send a message (or book a short call). We define the outcome and the fastest path.",
              },
              {
                title: "Build fast",
                text: "You get a clean first delivery quickly. We keep it minimal, premium, and mobile-first.",
              },
              {
                title: "Refine + handoff",
                text: "We iterate once, polish, and hand over with simple guidance so it’s easy to use.",
              },
            ].map((step, idx) => (
              <GlassCard key={step.title}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      {step.text}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Results"
            title="Speed you can feel"
            subtitle="Clear deliverables, quick timelines, and systems built to reduce daily friction."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { stat: "48h", label: "Starter delivery" },
              { stat: "3–4 days", label: "Pro delivery" },
              { stat: "1 system", label: "for clarity & execution" },
            ].map((item) => (
              <GlassCard key={item.stat} className="text-center sm:text-left">
                <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {item.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Pricing"
            title="Choose a plan, ship fast"
            subtitle="Project-based, one-time pricing. Clear scope. Fast delivery."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {PLANS.map((p) => (
              <GlassCard
                key={p.name}
                className="relative flex h-full flex-col"
              >
                {p.popular ? (
                  <div className="absolute -top-3 right-5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    Most popular
                  </div>
                ) : null}

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {p.name}
                  </h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    {p.billing}
                  </p>
                </div>

                <p className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {p.priceRange}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-900/60 dark:bg-zinc-100/60" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3">
                  <Button href={`/contact?plan=${encodeURIComponent(p.name)}`}>
                    Start with {p.name}
                  </Button>
                  <Button href="/pricing" variant="secondary">
                    View full pricing
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900 hover:decoration-zinc-500 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-white dark:hover:decoration-zinc-300"
            >
              Compare plans →{" "}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Quick answers"
            subtitle="No fluff—just the essentials."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6">
            {FAQS.map((item) => (
              <GlassCard key={item.q} className="p-0">
                <details className="group rounded-3xl p-6">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900 outline-none transition group-open:opacity-90 dark:text-zinc-50">
                    <span className="flex items-center justify-between gap-6">
                      <span>{item.q}</span>
                      <span className="text-zinc-400 transition group-open:rotate-45 dark:text-zinc-500">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {item.a}
                  </p>
                </details>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
