import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InteractiveLogo } from "@/components/brand/InteractiveLogo";
import { ValueProps } from "./ValueProps";

export function Hero() {
  const { hero } = site;
  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      {/* soft decorative blooms */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-mosaic-pink/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-mosaic-teal/10 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Copy */}
          <div className="animate-fade-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-cream/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta shadow-soft">
              <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
              {hero.eyebrow}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal-soft">
              {hero.sub}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-9">
              <ValueProps />
            </div>
          </div>

          {/* Interactive logo */}
          <div className="relative animate-float-slow">
            <div className="absolute inset-6 -z-10 rounded-full bg-gradient-to-br from-gold/15 via-mosaic-pink/10 to-mosaic-teal/15 blur-2xl" />
            <InteractiveLogo />
            <p className="mt-3 text-center text-sm font-medium text-charcoal-soft">
              Made with love in <span className="text-terracotta">{site.town}</span>
              <span className="text-mosaic-pink"> ♥</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
