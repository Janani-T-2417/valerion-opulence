import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { findProduct } from "@/lib/products";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — House of Valerion" }] }),
  component: Cart,
});

function Cart() {
  const { cart, updateQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);

  const subtotal = cart.reduce((sum, item) => {
    const p = findProduct(item.id);
    return sum + (p?.price || 0) * item.qty;
  }, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const discount = applied ? Math.round(subtotal * applied) : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "VALERION10") { setApplied(0.1); toast.success("Coupon applied · 10% off"); }
    else { toast.error("Invalid coupon"); }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <Reveal>
        <SectionLabel>YOUR BAG</SectionLabel>
        <h1 className="font-display text-5xl md:text-6xl mt-4">The <span className="italic text-gradient-gold">composition.</span></h1>
      </Reveal>

      <div className="hairline my-12" />

      {cart.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="w-10 h-10 text-gold/60 mx-auto" />
          <div className="font-display text-3xl mt-6">Your bag is empty.</div>
          <p className="text-muted-foreground mt-3">Add pieces from the collection to begin.</p>
          <Link to="/shop" className="inline-block mt-8 px-7 py-3 bg-gold text-background text-[11px] tracking-luxe uppercase hover:bg-foreground transition-colors">
            Discover Pieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          <div className="space-y-2">
            <AnimatePresence>
              {cart.map(item => {
                const p = findProduct(item.id);
                if (!p) return null;
                return (
                  <motion.div
                    key={item.id + item.size + item.color}
                    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="flex gap-5 border-b border-border/50 py-6 group"
                  >
                    <Link to="/product/$id" params={{ id: p.id }} className="w-28 sm:w-36 aspect-[3/4] bg-card overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="text-[10px] tracking-luxe text-muted-foreground uppercase">{p.category}</div>
                          <Link to="/product/$id" params={{ id: p.id }} className="font-display text-xl mt-1 block hover:text-gold transition-colors">{p.name}</Link>
                          <div className="text-xs text-muted-foreground mt-2">Size {item.size} · {item.color}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-muted-foreground hover:text-gold" aria-label="remove">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-auto pt-4">
                        <div className="flex items-center border border-border h-10">
                          <button onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)} className="w-10 h-full flex items-center justify-center hover:text-gold"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)} className="w-10 h-full flex items-center justify-center hover:text-gold"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="font-display text-xl text-gold">{formatPrice(p.price * item.qty)}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="lg:sticky lg:top-32 self-start glass border border-gold/20 p-8">
            <h3 className="font-display text-2xl mb-6">Order Summary</h3>

            <div className="flex gap-2 mb-6">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Promo code" className="flex-1 bg-transparent border border-border focus:border-gold outline-none px-3 py-2.5 text-sm placeholder:text-muted-foreground/60" />
              <button onClick={applyCoupon} className="px-4 text-[11px] tracking-luxe uppercase border border-gold text-gold hover:bg-gold hover:text-background transition-colors">Apply</button>
            </div>
            <p className="text-[10px] tracking-luxe text-muted-foreground mb-6">TRY · VALERION10</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
              {applied > 0 && <div className="flex justify-between text-gold"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
            </div>
            <div className="hairline my-6" />
            <div className="flex justify-between items-baseline mb-8">
              <span className="text-[11px] tracking-luxe">TOTAL</span>
              <span className="font-display text-3xl text-gradient-gold">{formatPrice(total)}</span>
            </div>

            <button onClick={() => toast.success("Demo checkout — frontend only")} className="group w-full py-4 bg-gold text-background text-[11px] tracking-luxe uppercase font-medium hover:bg-foreground transition-colors flex items-center justify-center gap-3">
              Secure Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] tracking-luxe text-muted-foreground mt-4 text-center">SAFE · ENCRYPTED · WORLDWIDE</p>
          </div>
        </div>
      )}
    </div>
  );
}
