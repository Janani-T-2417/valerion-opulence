import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import hero from "@/assets/hero-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { Reveal, SectionLabel } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House of Valerion — The Winter Collection" },
      { name: "description", content: "Cinematic menswear for the modern gentleman. Tuxedos, blazers, watches, loafers — tailored in Italy." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  const trending = products.slice(2, 6);
  const newArrivals = products.filter(p => p.badge === "New").concat(products).slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={hero} alt="House of Valerion"
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.7, 0, 0.3, 1] }}
            className="w-full h-full object-cover object-[60%_center]"
            width={1920} height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <SectionLabel>WINTER MMXXV · CHAPTER I</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.7,0,0.3,1] }}
            className="font-display text-[14vw] md:text-[8vw] lg:text-[7rem] leading-[0.9] mt-6 max-w-[16ch]"
          >
            Cinema, <br/><span className="italic text-gradient-gold">tailored.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-6 max-w-md text-muted-foreground leading-relaxed"
          >
            A new chapter in modern menswear — sculpted in Italian wool, finished in 24-karat detail. For the man who is the moment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/shop" className="group px-8 py-4 bg-gold text-background text-[11px] tracking-luxe uppercase font-medium flex items-center gap-3 hover:bg-foreground transition-colors">
              Discover Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="px-8 py-4 border border-foreground/30 text-[11px] tracking-luxe uppercase hover:border-gold hover:text-gold transition-colors">
              The Atelier
            </Link>
          </motion.div>
        </div>

        <div className="absolute right-6 lg:right-10 bottom-10 hidden md:flex flex-col items-center gap-3 text-[10px] tracking-luxe text-muted-foreground">
          <span>SCROLL</span>
          <span className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border/40 py-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["MILANO", "Crafted in Italy"],
            ["BESPOKE", "Atelier service"],
            ["GLOBAL", "Concierge delivery"],
            ["100 YR", "Lifetime restoration"],
          ].map(([t, s]) => (
            <div key={t}>
              <div className="font-display text-2xl text-gradient-gold">{t}</div>
              <div className="text-[10px] tracking-luxe text-muted-foreground mt-1">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <Reveal>
          <SectionLabel>FEATURED COLLECTIONS</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-6">
            <h2 className="font-display text-5xl md:text-6xl max-w-[14ch] leading-[1]">The art of <span className="italic text-gradient-gold">presence.</span></h2>
            <Link to="/shop" className="luxe-link text-[11px] tracking-luxe uppercase">View All Collections</Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-14">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* EDITORIAL CINEMATIC */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden my-12">
        <img src={editorial1} alt="Editorial" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center">
          <Reveal className="max-w-xl">
            <SectionLabel>THE HOUSE STORY</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1]">An heirloom <br/><span className="italic text-gradient-gold">in motion.</span></h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded in the cobbled streets of Milano, House of Valerion was born from a singular vow — that every piece must outlive the season, the trend, the lifetime. We do not chase fashion. We compose it.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 mt-10 luxe-link text-[11px] tracking-luxe uppercase">
              Read our story <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>NOW TRENDING</SectionLabel>
              <h2 className="font-display text-5xl mt-4">The desired pieces.</h2>
            </div>
            <Link to="/shop" className="luxe-link text-[11px] tracking-luxe uppercase">Shop the Edit</Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {[
          { img: editorial2, label: "BESPOKE TAILORING", title: "Made for one." },
          { img: editorial1, label: "THE GENTLEMAN'S WARDROBE", title: "Forever pieces." },
        ].map((c) => (
          <Reveal key={c.label}>
            <Link to="/shop" className="block group relative aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <SectionLabel>{c.label}</SectionLabel>
                <h3 className="font-display text-4xl md:text-5xl mt-4">{c.title}</h3>
                <span className="luxe-link text-[11px] tracking-luxe uppercase mt-6 self-start">Explore →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <SectionLabel>NEW ARRIVALS</SectionLabel>
          <h2 className="font-display text-5xl mt-4">Fresh from the atelier.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {newArrivals.map((p, i) => <ProductCard key={p.id + i} product={p} index={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel><span className="mx-auto">VOICES OF THE HOUSE</span></SectionLabel>
            <h2 className="font-display text-5xl mt-4">Worn by the world's most considered.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: "Valerion turned a black-tie evening into a chapter of memory. Tailoring as cinema.", a: "Marco D.", r: "Milano" },
            { q: "The fit, the fabric, the quiet confidence — they have understood elegance again.", a: "Vikram S.", r: "Mumbai" },
            { q: "Every piece feels considered for a lifetime. The atelier service is unmatched.", a: "Henri L.", r: "Paris" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-border/60 p-8 h-full glass">
                <div className="flex gap-1 text-gold mb-5">{[...Array(5)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-gold" />)}</div>
                <p className="font-display text-xl leading-relaxed">"{t.q}"</p>
                <div className="hairline my-6" />
                <div className="text-[10px] tracking-luxe text-muted-foreground uppercase">{t.a} · {t.r}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <SectionLabel>FASHION GALLERY</SectionLabel>
          <h2 className="font-display text-5xl mt-4 mb-12">In frame.</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[products[0], products[1], products[3], products[4], products[2], products[5], products[6], products[7]].map((p, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <div className={`relative overflow-hidden ${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[3/4]"}`}>
                <img src={p.image} loading="lazy" alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
