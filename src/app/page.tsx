import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { SERVICES, FAQS } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="py-14 sm:py-20" data-reveal>
        <Container>
          <SectionTitle
            eyebrow="What we do"
            title="Simple systems that remove friction"
            subtitle="Minimal, conversion-focused delivery - so your business runs smoother, faster, and clearer."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {SERVICES.map((s) => (
              <GlassCard key={s.title} className="h-full">
                <h3 className="text-lg font-semibold tracking-tight text-[#0f172a]">
                  {s.title}
                </h3>
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
        </Container>
      </section>

      <section className="py-14 sm:py-20" data-reveal>
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="Fast, focused, and clear"
            subtitle="A simple process designed for speed - without sacrificing quality."
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
                text: "We iterate once, polish, and hand over with simple guidance so it's easy to use.",
              },
            ].map((step, idx) => (
              <GlassCard key={step.title}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-[#0f172a] text-sm font-semibold text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#0f172a]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" data-reveal>
        <Container>
          <SectionTitle
            eyebrow="Results"
            title="Speed you can feel"
            subtitle="Clear deliverables, quick timelines, and systems built to reduce daily friction."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { stat: "48h", label: "Starter delivery" },
              { stat: "3-4 days", label: "Pro delivery" },
              { stat: "1 system", label: "for clarity & execution" },
            ].map((item) => (
              <GlassCard key={item.stat} className="text-center sm:text-left">
                <p className="text-3xl font-semibold tracking-tight text-[#0f172a]">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <Pricing mode="compact" />

      <section className="py-14 sm:py-20" data-reveal>
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Quick answers"
            subtitle="No fluff - just the essentials."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6">
            {FAQS.map((item) => (
              <GlassCard key={item.q} className="p-0">
                <details className="group rounded-3xl p-6">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#0f172a] outline-none transition">
                    <span className="flex items-center justify-between gap-6">
                      <span>{item.q}</span>
                      <span className="text-slate-400 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
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

