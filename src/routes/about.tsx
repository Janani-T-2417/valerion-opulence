import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import hero from "@/assets/hero-1.jpg";
import { Reveal, SectionLabel } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — House of Valerion" },
      { name: "description", content: "The story of House of Valerion — a modern atelier crafting cinematic menswear in Italy." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative h-[80svh] min-h-[520px] flex items-end overflow-hidden">
        <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4 }} src={editorial2} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 w-full">
          <Reveal>
            <SectionLabel>THE HOUSE</SectionLabel>
            <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[0.9] max-w-[14ch]">A house of <span className="italic text-gradient-gold">heirlooms.</span></h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-24 text-center">
        <Reveal>
          <SectionLabel><span className="mx-auto">OUR STORY</span></SectionLabel>
          <p className="font-display text-3xl md:text-4xl leading-[1.3] mt-8">
            "We do not chase the season. We compose pieces that outlive it — quietly, deliberately, with the discipline of an old-world atelier and the spirit of a modern man."
          </p>
          <div className="text-[10px] tracking-luxe text-gold mt-8">— LORENZO VALERION, FOUNDER</div>
        </Reveal>
      </section>

      {/* Editorial split */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={editorial1} alt="" className="w-full h-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <SectionLabel>THE ATELIER</SectionLabel>
          <h2 className="font-display text-5xl mt-4 leading-[1]">Cut by hand. Finished by ritual.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            From our atelier on Via Montenapoleone, every Valerion piece passes through twelve master hands across forty-four operations. Italian wool, Egyptian cotton, Venetian silk — sourced from the same mills that have served Europe's quiet aristocracy for a century.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our garments are not assembled. They are composed.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[["100+","Hours per suit"],["44","Hand operations"],["12","Master tailors"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-gradient-gold">{n}</div>
                <div className="text-[10px] tracking-luxe text-muted-foreground mt-1 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal className="order-2 lg:order-1">
          <SectionLabel>THE PHILOSOPHY</SectionLabel>
          <h2 className="font-display text-5xl mt-4 leading-[1]">Quiet luxury, loud presence.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Valerion exists for the man whose ambition is greater than his ego. The pieces speak in whispers — a perfectly canvassed lapel, a hand-rolled hem, a button of mother-of-pearl rather than plastic. The discerning will notice. The rest will simply feel something.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-3 mt-10 luxe-link text-[11px] tracking-luxe uppercase">
            Explore the collection →
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="order-1 lg:order-2">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={hero} alt="" className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel><span className="mx-auto">THE PRINCIPLES</span></SectionLabel>
            <h2 className="font-display text-5xl mt-4">What endures.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "I", t: "Material Honesty", d: "Only the finest natural fibres. Sourced traceably, used without compromise." },
            { n: "II", t: "Considered Craft", d: "Slow stitched in Italy. Every garment is a conversation between hand and cloth." },
            { n: "III", t: "Lifetime Loyalty", d: "We restore, alter, and re-make every Valerion piece — for as long as you wear it." },
          ].map((v, i) => (
            <Reveal key={v.n} delay={i * 0.1}>
              <div className="border border-border/60 p-10 h-full glass">
                <div className="font-display text-7xl text-gradient-gold leading-none">{v.n}</div>
                <h3 className="font-display text-2xl mt-6">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
