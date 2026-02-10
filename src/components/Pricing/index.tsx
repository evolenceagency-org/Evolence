import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/cn";
import { PLANS } from "@/lib/site";

type PricingProps = {
  mode?: "compact" | "full";
  as?: "h1" | "h2";
  showHeader?: boolean;
};

const tierArt: Record<string, string> = {
  Starter: "/assets/cards/bronze-card.svg",
  Pro: "/assets/cards/gold-card.svg",
  Elite: "/assets/cards/diamond-card.svg",
};

export function Pricing({
  mode = "compact",
  as = "h2",
  showHeader = true,
}: PricingProps) {
  return (
    <section className="py-14 sm:py-20" data-reveal>
      <Container>
        {showHeader ? (
          <SectionTitle
            eyebrow="Pricing"
            as={as}
            title="Choose a plan, ship fast"
            subtitle="Project-based, one-time pricing. Clear scope. Fast delivery."
            className="max-w-2xl"
          />
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isPro = plan.name === "Pro";
            const isElite = plan.name === "Elite";
            const features =
              mode === "compact" ? plan.features.slice(0, 3) : plan.features;

            return (
              <div
                key={plan.name}
                className={cn(
                  "pricing-card",
                  isPro && "pricing-card--pro",
                  isElite && "pricing-card--elite",
                )}
                data-reveal
              >
                {isPro ? (
                  <div className="pricing-pill pricing-pill--pro">
                    Most popular
                  </div>
                ) : null}

                <div className="pricing-card-art">
                  <Image
                    src={tierArt[plan.name]}
                    alt=""
                    width={320}
                    height={420}
                    className="h-auto w-[min(220px,70%)]"
                    sizes="(max-width: 1024px) 70vw, 220px"
                    priority={isPro}
                  />
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[#0f172a]">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    {plan.billing}
                  </p>
                </div>

                <p className="text-3xl font-semibold tracking-tight text-[#0f172a]">
                  {plan.priceRange}
                </p>

                <ul className="space-y-2 text-sm text-slate-600">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Button
                    href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                    className="w-full"
                  >
                    Start with {plan.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {mode === "compact" ? (
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500"
            >
              Compare plans →
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
