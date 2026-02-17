import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { PLAN_NAMES, type PlanName } from "@/lib/leads";
import { SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message to Evolence. We reply within 24 hours.",
};

type SearchParams = Record<string, string | string[] | undefined>;

type ContactPageProps = {
  searchParams: Promise<SearchParams>;
};

function getPlanFromSearchParams(searchParams: SearchParams): PlanName | undefined {
  const raw = searchParams?.plan;
  const plan = Array.isArray(raw) ? raw[0] : raw;
  if (!plan) return undefined;
  return PLAN_NAMES.includes(plan as PlanName) ? (plan as PlanName) : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const sp = await searchParams;
  const plan = getPlanFromSearchParams(sp);
  const socials = [
    SOCIALS.whatsapp ? { href: SOCIALS.whatsapp, label: "WhatsApp" } : null,
    SOCIALS.instagram ? { href: SOCIALS.instagram, label: "Instagram" } : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <section className="py-16 sm:py-24" data-reveal>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Contact"
              as="h1"
              title="Let&apos;s build something clean and fast."
              subtitle="Tell us what you want to ship. We reply within 24h."
            />

            {socials.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-900 ring-1 ring-inset ring-slate-200 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-50 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none"
                  >
                    Contact via {s.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-10 space-y-3 text-sm leading-7 text-slate-600">
              <p>
                Share your goal, current setup, and what &quot;done&quot; looks like. If
                you selected a plan, we&apos;ll match the scope to it.
              </p>
              <p>
                Prefer the fastest path? Starter is designed for quick wins and
                tight, premium delivery.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GlassCard>
              <ContactForm plan={plan} />
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

