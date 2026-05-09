import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CartItem = { id: string; size: string; color: string; qty: number };

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (i: CartItem) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("hov_cart");
      const w = localStorage.getItem("hov_wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("hov_cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("hov_wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);

  const addToCart: StoreCtx["addToCart"] = (item) => {
    setCart(prev => {
      const i = prev.findIndex(p => p.id === item.id && p.size === item.size && p.color === item.color);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
  };
  const removeFromCart: StoreCtx["removeFromCart"] = (id, size, color) => {
    setCart(prev => prev.filter(p => !(p.id === id && p.size === size && p.color === color)));
  };
  const updateQty: StoreCtx["updateQty"] = (id, size, color, qty) => {
    setCart(prev => prev.map(p => (p.id === id && p.size === size && p.color === color) ? { ...p, qty: Math.max(1, qty) } : p));
  };
  const clearCart = () => setCart([]);
  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const inWishlist = (id: string) => wishlist.includes(id);

  return (
    <Ctx.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, inWishlist }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}

export function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}
