import shirt from "@/assets/p-shirt.jpg";
import blazer from "@/assets/p-blazer.jpg";
import suit from "@/assets/p-suit.jpg";
import loafers from "@/assets/p-loafers.jpg";
import watch from "@/assets/p-watch.jpg";
import jacket from "@/assets/p-jacket.jpg";
import trousers from "@/assets/p-trousers.jpg";
import accessory from "@/assets/p-accessory.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "Shirts" | "Blazers" | "Suits" | "Jackets" | "Trousers" | "Watches" | "Loafers" | "Accessories";
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "New" | "Bestseller" | "Limited";
  description: string;
};

const sizesClothing = ["XS", "S", "M", "L", "XL", "XXL"];
const sizesShoe = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
const sizesOne = ["One Size"];

export const products: Product[] = [
  { id: "valerion-noir-tux", name: "Noir Sovereign Tuxedo", tagline: "Midnight wool · Gold trim", price: 2480, category: "Suits", image: suit, colors: [{name:"Onyx",hex:"#0c0c0c"},{name:"Midnight",hex:"#0a1430"}], sizes: sizesClothing, badge:"Limited", description: "A masterpiece in midnight wool, hand-finished with delicate gold trim. The Noir Sovereign embodies timeless elegance for the man who commands every room." },
  { id: "valerion-onyx-blazer", name: "Onyx Atelier Blazer", tagline: "Italian wool · Peak lapel", price: 1180, category: "Blazers", image: blazer, colors:[{name:"Onyx",hex:"#0c0c0c"},{name:"Charcoal",hex:"#2a2a2a"}], sizes: sizesClothing, badge:"Bestseller", description:"Tailored in pure Italian wool with a sharp peak lapel and silken bemberg lining. Architectural shoulders meet effortless drape." },
  { id: "valerion-ivory-shirt", name: "Ivory Heritage Shirt", tagline: "Egyptian cotton · Mother-of-pearl", price: 245, category: "Shirts", image: shirt, colors:[{name:"Ivory",hex:"#f4ecd8"},{name:"White",hex:"#ffffff"},{name:"Slate",hex:"#48505a"}], sizes: sizesClothing, badge:"New", description:"Woven from 200-thread Egyptian cotton with mother-of-pearl buttons. Subtle sheen, infinite restraint." },
  { id: "valerion-cognac-loafer", name: "Cognac Sovereign Loafer", tagline: "Hand-stitched leather", price: 690, category: "Loafers", image: loafers, colors:[{name:"Cognac",hex:"#8a4a24"},{name:"Espresso",hex:"#3a2418"}], sizes: sizesShoe, badge:"Bestseller", description:"Hand-cut Italian calfskin, patina-finished and Blake-stitched in Florence. A loafer that ages with grace." },
  { id: "valerion-gold-chrono", name: "Aurelia Gold Chronograph", tagline: "Sapphire · Swiss movement", price: 3400, category: "Watches", image: watch, colors:[{name:"Gold/Black",hex:"#caa45a"}], sizes: sizesOne, badge:"Limited", description:"18k gold case, sapphire crystal, Swiss automatic movement. The watch is not the time — it is the statement." },
  { id: "valerion-overcoat", name: "Monolith Overcoat", tagline: "Cashmere blend · Double-breasted", price: 1890, category: "Jackets", image: jacket, colors:[{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, badge:"New", description:"A column of pure cashmere-wool, double-breasted with horn buttons. Built for cinematic winters." },
  { id: "valerion-trousers", name: "Cassio Pleated Trouser", tagline: "Wool flannel · Tapered", price: 320, category: "Trousers", image: trousers, colors:[{name:"Onyx",hex:"#0c0c0c"},{name:"Charcoal",hex:"#2a2a2a"}], sizes: sizesClothing, description:"Single-pleat front, tapered leg, finished with side adjusters. Wool flannel with quiet authority." },
  { id: "valerion-silk-tie", name: "Obsidian Silk Tie & Cufflinks", tagline: "7-fold silk · 24k accents", price: 220, category: "Accessories", image: accessory, colors:[{name:"Obsidian",hex:"#0c0c0c"}], sizes: sizesOne, badge:"New", description:"Seven-fold silk tie with hand-rolled edges, paired with 24k gold-plated cufflinks. Quiet luxury, loud presence." },
];

export const allCategories = ["All","Shirts","Blazers","Suits","Jackets","Trousers","Watches","Loafers","Accessories"] as const;
export const allColors = ["Onyx","Charcoal","Ivory","White","Cognac","Espresso","Gold/Black","Midnight","Slate","Obsidian"];
export const allSizes = ["XS","S","M","L","XL","XXL","UK 7","UK 8","UK 9","UK 10","One Size"];

export function findProduct(id: string) {
  return products.find(p => p.id === id);
}
export function relatedTo(id: string, n = 4) {
  const p = products.find(x => x.id === id);
  if (!p) return products.slice(0, n);
  return products.filter(x => x.id !== id && x.category === p.category)
    .concat(products.filter(x => x.id !== id && x.category !== p.category))
    .slice(0, n);
}
