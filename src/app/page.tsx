import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

/** Placeholder band for sections we build in later slices. */
function ComingSoon({ id, title, blurb }: { id: string; title: string; blurb: string }) {
  return (
    <Section id={id} className="border-t border-charcoal/5">
      <div className="rounded-xl border border-dashed border-charcoal/15 bg-cream/60 p-10 text-center">
        <h2 className="font-display text-3xl font-semibold text-charcoal">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-charcoal-soft">{blurb}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
          Next slice
        </p>
      </div>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ComingSoon
        id="menu"
        title="The Flavor Menu"
        blurb="17+ loaded teas — County Fair, Orange Push Pop, Mystery Machine and more — split by local pickup and shipped."
      />
      <ComingSoon
        id="builder"
        title="Build Your 12-Pack"
        blurb="Mix and match any twelve flavors into one bundle. Live inventory keeps sold-out teas out of your pack."
      />
      <ComingSoon
        id="about"
        title="Our Story"
        blurb="Real nutrition, real people, made right here in Truro. No sugar bombs — just good energy for your day."
      />
      <ComingSoon
        id="contact"
        title="Find Us"
        blurb="Local pickup, pop-up events, and 12-packs shipped anywhere. Venmo, Square, or cash."
      />
      <ComingSoon
        id="order"
        title="Place Your Order"
        blurb="Pick your teas, choose pickup / pop-up / ship, and we’ll reach out to finalize. No card needed now."
      />
    </>
  );
}
