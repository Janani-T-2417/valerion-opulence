import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore, formatPrice } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, inWishlist } = useStore();
  const liked = inWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.7, 0, 0.3, 1] }}
      className="group relative"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-card">
          <div className="absolute inset-0 opacity-30 pointer-events-none z-10" style={{ background: "var(--gradient-radial-gold)" }} />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900} height={1200}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 z-20 text-[10px] tracking-luxe px-2.5 py-1 bg-background/70 backdrop-blur-sm border border-gold/40 text-gold uppercase">
              {product.badge}
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            aria-label="wishlist"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass flex items-center justify-center hover:border-gold transition-all"
          >
            <Heart className={`w-4 h-4 transition-colors ${liked ? "fill-gold text-gold" : "text-foreground"}`} />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-20 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="glass border border-gold/30 text-center py-3 text-[11px] tracking-luxe uppercase text-foreground hover:text-gold">
              Discover
            </div>
          </div>
        </div>

        <div className="pt-5 px-1 flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] tracking-luxe text-muted-foreground uppercase mb-1.5">{product.category}</div>
            <h3 className="font-display text-lg leading-tight text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{product.tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-lg text-gold">{formatPrice(product.price)}</div>
            <div className="flex gap-1 mt-2 justify-end">
              {product.colors.slice(0, 4).map(c => (
                <span key={c.name} className="w-2.5 h-2.5 rounded-full border border-border" style={{ background: c.hex }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
