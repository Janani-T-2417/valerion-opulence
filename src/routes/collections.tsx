import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import editorial3 from "@/assets/editorial-3.jpg";
import atelierDetail from "@/assets/atelier-detail.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — House of Valerion" },
      { name: "description", content: "The chapters of House of Valerion — Winter MMXXVI, Black Tie Sovereign, and the Atelier Edit. Cinematic menswear, curated by season." },
      { property: "og:title", content: "Collections — House of Valerion" },
      { property: "og:description", content: "Curated chapters of cinematic menswear." },
    ],
  }),
  component: CollectionsPage,
});

const collections = [
  {
    label: "WINTER · MMXXVI",
    title: "The Overcoat",
    subtitle: "Architectural cashmere · Sculpted silhouettes",
    body: "Dressed for the long Italian winter. Hand-woven cashmere, double-faced wool, and overcoats built like architecture.",
    img: editorial3,
    categories: ["Jackets", "Knitwear"] as const,
  },
  {
    label: "BLACK TIE",
    title: "Sovereign",
    subtitle: "Midnight wool · Gold finishings",
    body: "For the room you walk into and the one you leave behind. Tuxedos, dinner jackets and ivory shirts shaped for cinematic evenings.",
    img: editorial2,
    categories: ["Suits", "Blazers", "Shirts"] as const,
  },
  {
    label: "EVERYDAY · ELEVATED",
    title: "Atelier Edit",
    subtitle: "Soft tailoring · Luxury essentials",
    body: "The wardrobe of a man who needs nothing else. Heavyweight tees, mercerised polos, hoodies cut like couture.",
    img: editorial1,
    categories: ["T-Shirts", "Polos", "Hoodies", "Oversized Shirts", "Trousers"] as const,
  },
];

function CollectionsPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden vignette">
        <img src={atelierDetail} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-16 z-10">
          <SectionLabel>THE COLLECTIONS</SectionLabel>
          <h1 className="font-display text-[14vw] md:text-[7rem] leading-[0.9] mt-6 max-w-[14ch] text-shadow-luxe">
            Three <span className="italic text-gradient-gold">chapters.</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Each season at Valerion is composed like a film — three chapters, one continuous story of tailored elegance.
          </p>
        </div>
      </section>

      {/* Chapters */}
      {collections.map((c, idx) => {
        const items = products.filter(p => (c.categories as readonly string[]).includes(p.category)).slice(0, 4);
        const reverse = idx % 2 === 1;
        return (
          <section key={c.title} className="max-w-[1400px] mx-auto px-6 lg:px-10 py-28">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="lg:col-span-7 relative aspect-[4/3] overflow-hidden">
                <img src={c.img} loading="lazy" alt={c.title} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 vignette" />
                <div className="absolute top-6 left-6 text-[10px] tracking-luxe text-gold">CHAPTER {String(idx + 1).padStart(2, "0")}</div>
              </Reveal>
              <Reveal className="lg:col-span-5" delay={0.15}>
                <SectionLabel>{c.label}</SectionLabel>
                <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1]">
                  {c.title.split(" ")[0]} <span className="italic text-gradient-gold">{c.title.split(" ").slice(1).join(" ")}</span>
                </h2>
                <p className="mt-2 text-[11px] tracking-luxe text-muted-foreground uppercase">{c.subtitle}</p>
                <p className="mt-6 text-muted-foreground leading-loose">{c.body}</p>
                <Link to="/shop" className="inline-flex items-center gap-3 mt-10 luxe-link text-[11px] tracking-luxe uppercase">
                  Shop the Chapter <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
              {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        );
      })}

      {/* Closing */}
      <section className="relative h-[60vh] min-h-[420px] my-20 overflow-hidden">
        <img src={editorial2} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <SectionLabel><span className="mx-auto">FIN.</span></SectionLabel>
          <h2 className="font-display text-5xl md:text-7xl mt-6 max-w-3xl text-shadow-luxe">
            The next chapter is <span className="italic text-gradient-gold">yours.</span>
          </h2>
          <Link to="/shop" className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-gold text-background text-[11px] tracking-luxe uppercase hover:bg-foreground transition-colors">
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}