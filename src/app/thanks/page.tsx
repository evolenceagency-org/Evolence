import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";

export const metadata: Metadata = {
  title: "Thanks",
  description: "Message received. We&apos;ll reply within 24 hours.",
};

export default function ThanksPage() {
  return (
    <section className="py-14 sm:py-20" data-reveal>
      <Container>
        <div className="mx-auto max-w-2xl">
          <GlassCard className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Success
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
              Thanks - we got your message.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We&apos;ll reply within 24 hours with the next step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="/">Back to Home</Button>
              <Button href="/pricing" variant="secondary">
                See Pricing
              </Button>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}

