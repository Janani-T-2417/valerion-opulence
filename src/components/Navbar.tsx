import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import editorialMenu from "@/assets/editorial-3.jpg";
import { products, allCategories } from "@/lib/products";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cart, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  const results = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || search ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, search]);

  return (
    <>
      <div className="bg-onyx border-b border-border/40 text-[11px] tracking-luxe uppercase text-muted-foreground">
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee py-2.5 gap-12">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 shrink-0">
                <span>Complimentary worldwide delivery on orders above $500</span>
                <span className="text-gold">✦</span>
                <span>Bespoke atelier appointments now open in Milan</span>
                <span className="text-gold">✦</span>
                <span>The Winter Collection — Available now</span>
                <span className="text-gold">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "bg-background/30 backdrop-blur-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <button onClick={() => setOpen(true)} className="lg:hidden text-foreground hover:text-gold transition-colors" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden lg:flex gap-9 text-[12px] tracking-luxe uppercase">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="luxe-link text-foreground/80 hover:text-gold" activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 select-none">
            <div className="text-center leading-none">
              <div className="font-display italic text-xl lg:text-[24px] tracking-[0.14em] text-gradient-gold whitespace-nowrap">House of Valerion</div>
              <div className="text-[9px] tracking-[0.5em] text-muted-foreground mt-1.5">MAISON · EST. MMXXV</div>
            </div>
          </Link>

          <div className="flex items-center gap-5 text-foreground/80">
            <button onClick={() => setSearch(true)} aria-label="Search" className="hover:text-gold transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="hover:text-gold transition-colors relative">
              <Heart className="w-[18px] h-[18px]" />
              {wishlist.length > 0 && <span className="absolute -top-2 -right-2.5 text-[10px] bg-gold text-background rounded-full w-4 h-4 flex items-center justify-center font-medium">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" aria-label="Cart" className="hover:text-gold transition-colors relative">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2.5 text-[10px] bg-gold text-background rounded-full w-4 h-4 flex items-center justify-center font-medium">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-background grid grid-cols-1 lg:grid-cols-2"
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.7,0,0.3,1] }}
              className="relative flex flex-col h-full max-h-screen overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-border/40">
                <Link to="/" onClick={() => setOpen(false)} className="font-display italic tracking-[0.14em] text-gradient-gold text-lg">House of Valerion</Link>
                <button onClick={() => setOpen(false)} aria-label="close" className="hover:text-gold transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 gap-1 py-10">
                <div className="text-[10px] tracking-luxe text-gold mb-8">MENU</div>
                {links.map((l, i) => (
                  <motion.div key={l.to}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.7,0,0.3,1] }}>
                    <Link to={l.to} onClick={() => setOpen(false)}
                      className="group block py-2 font-display text-4xl md:text-5xl leading-tight text-foreground hover:text-gold transition-colors">
                      <span className="text-[10px] tracking-luxe text-muted-foreground align-top mr-3">0{i+1}</span>
                      <span className="italic group-hover:not-italic transition-all">{l.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="px-8 lg:px-16 pb-10 border-t border-border/40 pt-6 flex flex-col gap-2">
                <div className="text-[10px] tracking-luxe text-gold">CONCIERGE</div>
                <div className="text-sm text-muted-foreground">Via Montenapoleone 12 · Milano</div>
                <div className="text-sm text-muted-foreground">+39 02 7600 0000</div>
              </div>
            </motion.div>
            <div className="hidden lg:block relative overflow-hidden">
              <motion.img
                src={editorialMenu} alt=""
                initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.7,0,0.3,1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 vignette" />
              <div className="absolute bottom-10 left-10 text-[10px] tracking-luxe text-gold">CHAPTER I · WINTER MMXXVI</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex items-start pt-24 lg:pt-32 justify-center px-6 overflow-y-auto"
            onClick={() => setSearch(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.7,0,0.3,1] }}
              className="w-full max-w-3xl pb-24" onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] tracking-luxe text-gold">SEARCH THE HOUSE</div>
                <button onClick={() => setSearch(false)} className="text-muted-foreground hover:text-gold transition-colors text-[10px] tracking-luxe uppercase flex items-center gap-2">
                  Close <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center border-b-2 border-gold pb-4">
                <Search className="w-5 h-5 text-gold mr-4" />
                <input
                  autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blazers, cashmere, tuxedos…"
                  className="flex-1 bg-transparent text-2xl md:text-4xl font-display italic outline-none placeholder:text-muted-foreground/40"
                />
              </div>

              {results.length > 0 ? (
                <div className="mt-10">
                  <div className="text-[10px] tracking-luxe text-muted-foreground uppercase mb-5">Results</div>
                  <div className="divide-y divide-border/40">
                    {results.map(p => (
                      <Link key={p.id} to="/product/$id" params={{ id: p.id }} onClick={() => { setSearch(false); setQuery(""); }}
                        className="flex items-center gap-5 py-4 group">
                        <img src={p.image} alt="" className="w-16 h-20 object-cover" />
                        <div className="flex-1">
                          <div className="text-[10px] tracking-luxe text-muted-foreground uppercase">{p.category}</div>
                          <div className="font-display text-xl group-hover:text-gold transition-colors">{p.name}</div>
                        </div>
                        <div className="font-display text-gold">${p.price}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-12">
                    <div className="text-[10px] tracking-luxe text-muted-foreground uppercase mb-5">Browse Categories</div>
                    <div className="flex flex-wrap gap-3">
                      {allCategories.filter(c => c !== "All").map(c => (
                        <Link key={c} to="/shop" onClick={() => setSearch(false)}
                          className="px-5 py-2.5 border border-border/60 text-[11px] tracking-luxe uppercase hover:border-gold hover:text-gold transition-colors">
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="text-[10px] tracking-luxe text-muted-foreground uppercase mb-5">Most Desired</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {products.slice(0, 4).map(p => (
                        <Link key={p.id} to="/product/$id" params={{ id: p.id }} onClick={() => setSearch(false)}
                          className="group block">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
                          </div>
                          <div className="font-display mt-3 text-sm group-hover:text-gold transition-colors">{p.name}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}