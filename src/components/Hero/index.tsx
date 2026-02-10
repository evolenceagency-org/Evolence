import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="pt-16 sm:pt-24" data-reveal>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6" data-reveal>
            <div className="w-fit rounded-full border border-slate-200/70 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Premium, lightweight builds
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-[#0f172a] sm:text-5xl">
                {SITE.title}
              </h1>
              <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
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
            <p className="text-sm font-medium text-slate-500">
              {SITE.trustLine}
            </p>
          </div>

          <div
            className="flex items-center justify-center lg:justify-end"
            data-reveal
          >
            <div className="hero-gear-stack">
              <img
                src="/assets/hero/hero-gear-shadow.svg"
                alt=""
                className="hero-gear hero-gear-shadow animate-gear-slower"
                aria-hidden="true"
              />
              <img
                src="/assets/hero/hero-gear-front.svg"
                alt=""
                className="hero-gear animate-gear-slow"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
