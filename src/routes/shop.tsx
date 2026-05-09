import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { products, allCategories, allColors, allSizes } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, SectionLabel } from "@/components/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — House of Valerion" },
      { name: "description", content: "Explore the full collection of luxury menswear from House of Valerion." },
    ],
  }),
  component: Shop,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price · Low to High" },
  { value: "high", label: "Price · High to Low" },
  { value: "name", label: "Alphabetical" },
];

function Shop() {
  const [cat, setCat] = useState<string>("All");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [openMobile, setOpenMobile] = useState(false);
  const perPage = 8;

  const filtered = useMemo(() => {
    let r = [...products];
    if (cat !== "All") r = r.filter(p => p.category === cat);
    if (colors.length) r = r.filter(p => p.colors.some(c => colors.includes(c.name)));
    if (sizes.length) r = r.filter(p => p.sizes.some(s => sizes.includes(s)));
    if (q) r = r.filter(p => (p.name + p.tagline + p.category).toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [cat, colors, sizes, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggle = (set: string[], v: string, setter: (s: string[]) => void) => {
    setter(set.includes(v) ? set.filter(x => x !== v) : [...set, v]);
    setPage(1);
  };

  const Filters = (
    <div className="space-y-10">
      <div>
        <h4 className="text-[11px] tracking-luxe text-gold mb-4">SEARCH</h4>
        <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search the house…" className="w-full bg-transparent border-b border-border focus:border-gold outline-none px-0 py-2 text-sm placeholder:text-muted-foreground/60" />
      </div>
      <div>
        <h4 className="text-[11px] tracking-luxe text-gold mb-4">CATEGORY</h4>
        <ul className="space-y-2.5 text-sm">
          {allCategories.map(c => (
            <li key={c}>
              <button onClick={() => { setCat(c); setPage(1); }} className={`luxe-link ${cat === c ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-[11px] tracking-luxe text-gold mb-4">COLOUR</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map(c => (
            <button key={c} onClick={() => toggle(colors, c, setColors)}
              className={`text-[10px] tracking-luxe uppercase px-3 py-1.5 border transition-colors ${colors.includes(c) ? "border-gold text-gold" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[11px] tracking-luxe text-gold mb-4">SIZE</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(s => (
            <button key={s} onClick={() => toggle(sizes, s, setSizes)}
              className={`text-[11px] tracking-luxe uppercase w-12 h-10 border transition-colors ${sizes.includes(s) ? "border-gold text-gold" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      {(cat !== "All" || colors.length || sizes.length || q) && (
        <button onClick={() => { setCat("All"); setColors([]); setSizes([]); setQ(""); setPage(1); }} className="text-[11px] tracking-luxe uppercase text-muted-foreground hover:text-gold">
          Reset all filters ✕
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* hero */}
      <section className="relative pt-16 pb-10 px-6 lg:px-10 max-w-[1400px] mx-auto text-center">
        <Reveal>
          <SectionLabel><span className="mx-auto">THE COLLECTION</span></SectionLabel>
          <h1 className="font-display text-5xl md:text-7xl mt-6">Curated. <span className="italic text-gradient-gold">Timeless.</span></h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Every piece, an heirloom. Filter the house archive by category, hue, and silhouette.</p>
        </Reveal>
      </section>
      <div className="hairline max-w-[1400px] mx-auto" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
        <aside className="hidden lg:block">{Filters}</aside>

        <div>
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="text-[11px] tracking-luxe text-muted-foreground">{filtered.length} PIECES</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setOpenMobile(true)} className="lg:hidden flex items-center gap-2 text-[11px] tracking-luxe uppercase border border-border px-4 py-2.5 hover:border-gold">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value)} className="appearance-none bg-transparent border border-border pl-4 pr-10 py-2.5 text-[11px] tracking-luxe uppercase focus:border-gold outline-none cursor-pointer">
                  {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-background">{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-32 text-muted-foreground">
              <div className="font-display text-3xl">Nothing matches your taste.</div>
              <p className="mt-3 text-sm">Try adjusting the filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1 mt-16">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 text-[11px] tracking-luxe border ${page === i + 1 ? "border-gold text-gold" : "border-border text-muted-foreground hover:text-foreground"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {openMobile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[70] bg-background/80 lg:hidden" onClick={() => setOpenMobile(false)}>
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-2xl">Filters</span>
              <button onClick={() => setOpenMobile(false)}><X className="w-5 h-5" /></button>
            </div>
            {Filters}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
