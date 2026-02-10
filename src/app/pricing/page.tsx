import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, project-based pricing. Choose a plan and ship fast with Evolence.",
};

export default function PricingPage() {
  return (
    <div>
      <Pricing mode="full" as="h1" />

      <section className="pb-14 sm:pb-20" data-reveal>
        <Container>
          <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#0f172a]">
                Not sure which plan fits?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Send a message and we'll recommend the fastest option for your
                goal.
              </p>
            </div>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}

