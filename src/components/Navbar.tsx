import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cart, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "bg-background/30 backdrop-blur-sm"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <button onClick={() => setOpen(true)} className="lg:hidden text-foreground" aria-label="Menu">
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex justify-between items-center p-6 border-b border-border/40">
              <span className="font-display italic tracking-[0.14em] text-gradient-gold text-lg">House of Valerion</span>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col p-8 gap-6 font-display text-3xl">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-foreground hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search modal */}
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] glass flex items-start pt-32 justify-center px-6"
            onClick={() => setSearch(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl" onClick={e => e.stopPropagation()}
            >
              <div className="text-[10px] tracking-luxe text-gold mb-4">SEARCH THE HOUSE</div>
              <div className="flex items-center border-b-2 border-gold pb-4">
                <Search className="w-5 h-5 text-gold mr-4" />
                <input autoFocus placeholder="Blazers, knitwear, hoodies…" className="flex-1 bg-transparent text-2xl font-display outline-none placeholder:text-muted-foreground/50" />
                <button onClick={() => setSearch(false)} className="text-muted-foreground hover:text-gold ml-4"><X className="w-5 h-5" /></button>
              </div>
              <div className="mt-6 text-xs tracking-luxe text-muted-foreground">
                POPULAR · <Link onClick={() => setSearch(false)} to="/shop" className="text-foreground hover:text-gold ml-2">Tuxedo</Link>
                <Link onClick={() => setSearch(false)} to="/shop" className="text-foreground hover:text-gold ml-4">Cashmere</Link>
                <Link onClick={() => setSearch(false)} to="/shop" className="text-foreground hover:text-gold ml-4">Hoodies</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
