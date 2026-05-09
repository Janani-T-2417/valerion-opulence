import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Truck, Shield, Undo2, Star, Minus, Plus } from "lucide-react";
import { findProduct, relatedTo, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore, formatPrice } from "@/lib/store";
import { toast } from "sonner";
import { Reveal, SectionLabel } from "@/components/Reveal";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — House of Valerion` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="text-center py-40">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/shop" className="text-gold luxe-link mt-6 inline-block text-[11px] tracking-luxe uppercase">Browse the collection</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [size, setSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });
  const liked = inWishlist(product.id);
  const related = relatedTo(product.id, 4);

  const onAdd = () => {
    addToCart({ id: product.id, size, color, qty });
    toast.success(`${product.name} added to bag`, { description: `Size ${size} · ${color}` });
  };

  return (
    <div>
      {/* breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 text-[11px] tracking-luxe text-muted-foreground uppercase">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> / <span className="text-foreground">{product.category}</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
        {/* gallery */}
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-card overflow-hidden cursor-zoom-in"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100, active: true });
            }}
            onMouseLeave={() => setZoom(z => ({ ...z, active: false }))}
          >
            <img
              src={product.image} alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={zoom.active ? { transform: `scale(2)`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            {product.badge && (
              <div className="absolute top-5 left-5 text-[10px] tracking-luxe px-3 py-1.5 bg-background/70 backdrop-blur border border-gold/40 text-gold uppercase">{product.badge}</div>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square bg-card overflow-hidden border border-border/40 hover:border-gold transition-colors cursor-pointer">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="lg:sticky lg:top-32 self-start">
          <SectionLabel>{product.category.toUpperCase()}</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl mt-4 leading-tight">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.tagline}</p>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex gap-1 text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-gold" />)}</div>
            <span className="text-xs text-muted-foreground">142 considered reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <div className="font-display text-4xl text-gradient-gold">{formatPrice(product.price)}</div>
            <div className="text-xs text-muted-foreground">Tax included · Worldwide</div>
          </div>

          <div className="hairline my-8" />

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[11px] tracking-luxe text-foreground">COLOUR · {color}</h4>
            </div>
            <div className="flex gap-3">
              {product.colors.map(c => (
                <button key={c.name} onClick={() => setColor(c.name)} title={c.name}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${color === c.name ? "border-gold scale-110" : "border-border hover:border-foreground"}`}
                  style={{ background: c.hex }} aria-label={c.name} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[11px] tracking-luxe text-foreground">SIZE · {size}</h4>
              <a href="#" className="text-[11px] tracking-luxe text-muted-foreground luxe-link uppercase">Size guide</a>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSize(s)} className={`h-12 text-[11px] tracking-luxe uppercase border transition-colors ${size === s ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border h-12">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-full flex items-center justify-center hover:text-gold"><Minus className="w-3.5 h-3.5" /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-12 h-full flex items-center justify-center hover:text-gold"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <button onClick={onAdd} className="flex-1 h-12 bg-gold text-background text-[11px] tracking-luxe uppercase flex items-center justify-center gap-2 hover:bg-foreground transition-colors">
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`w-12 h-12 border flex items-center justify-center transition-colors ${liked ? "border-gold text-gold" : "border-border hover:border-gold hover:text-gold"}`} aria-label="wishlist">
              <Heart className={`w-4 h-4 ${liked ? "fill-gold" : ""}`} />
            </button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="hairline my-8" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            {[
              [Truck, "Complimentary delivery", "Express, worldwide."],
              [Undo2, "30-day exchange", "Easy and effortless."],
              [Shield, "Lifetime restoration", "By our atelier."],
            ].map(([Icon, t, s], i) => {
              const I = Icon as typeof Truck;
              return (
                <div key={i} className="border border-border/60 p-4">
                  <I className="w-4 h-4 text-gold mb-2" />
                  <div className="text-[11px] tracking-luxe uppercase text-foreground">{t as string}</div>
                  <div className="text-muted-foreground mt-1">{s as string}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* reviews */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <SectionLabel>VOICES OF THE HOUSE</SectionLabel>
          <h2 className="font-display text-4xl mt-4 mb-12">Considered reviews.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: "Alessandro F.", q: "The tailoring is impeccable. Fits like a second skin.", r: 5 },
            { n: "Rohan M.", q: "Quality you can feel the moment you touch the fabric.", r: 5 },
            { n: "James W.", q: "Worth every cent. The atelier service is unmatched.", r: 5 },
          ].map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-border/60 p-7 glass">
                <div className="flex gap-1 text-gold mb-3">{[...Array(r.r)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-gold" />)}</div>
                <p className="font-display text-lg leading-relaxed">"{r.q}"</p>
                <div className="text-[10px] tracking-luxe text-muted-foreground uppercase mt-5">— {r.n}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* related */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <SectionLabel>YOU MAY ALSO DESIRE</SectionLabel>
          <h2 className="font-display text-4xl mt-4 mb-12">Complete the composition.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
