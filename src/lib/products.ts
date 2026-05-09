import shirt from "@/assets/p-shirt.jpg";
import blazer from "@/assets/p-blazer.jpg";
import suit from "@/assets/p-suit.jpg";
import jacket from "@/assets/p-jacket.jpg";
import trousers from "@/assets/p-trousers.jpg";
import hoodie from "@/assets/p-hoodie.jpg";
import polo from "@/assets/p-polo.jpg";
import knit from "@/assets/p-knit.jpg";
import oversized from "@/assets/p-oversized.jpg";
import tee from "@/assets/p-tee.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category:
    | "Shirts"
    | "Oversized Shirts"
    | "T-Shirts"
    | "Polos"
    | "Knitwear"
    | "Hoodies"
    | "Blazers"
    | "Suits"
    | "Jackets"
    | "Trousers";
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "New" | "Bestseller" | "Limited";
  description: string;
};

const sizesClothing = ["XS", "S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  { id: "valerion-noir-tux", name: "Noir Sovereign Tuxedo", tagline: "Midnight wool · Gold trim", price: 2480, category: "Suits", image: suit, colors: [{name:"Onyx",hex:"#0c0c0c"},{name:"Midnight",hex:"#0a1430"}], sizes: sizesClothing, badge:"Limited", description: "A masterpiece in midnight wool, hand-finished with delicate gold trim. The Noir Sovereign embodies timeless elegance for the man who commands every room." },
  { id: "valerion-onyx-blazer", name: "Onyx Atelier Blazer", tagline: "Italian wool · Peak lapel", price: 1180, category: "Blazers", image: blazer, colors:[{name:"Onyx",hex:"#0c0c0c"},{name:"Charcoal",hex:"#2a2a2a"}], sizes: sizesClothing, badge:"Bestseller", description:"Tailored in pure Italian wool with a sharp peak lapel and silken bemberg lining. Architectural shoulders meet effortless drape." },
  { id: "valerion-ivory-shirt", name: "Ivory Heritage Shirt", tagline: "Egyptian cotton · Mother-of-pearl", price: 245, category: "Shirts", image: shirt, colors:[{name:"Ivory",hex:"#f4ecd8"},{name:"White",hex:"#ffffff"},{name:"Slate",hex:"#48505a"}], sizes: sizesClothing, badge:"New", description:"Woven from 200-thread Egyptian cotton with mother-of-pearl buttons. Subtle sheen, infinite restraint." },
  { id: "valerion-overcoat", name: "Monolith Overcoat", tagline: "Cashmere blend · Double-breasted", price: 1890, category: "Jackets", image: jacket, colors:[{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, badge:"New", description:"A column of pure cashmere-wool, double-breasted with horn buttons. Built for cinematic winters." },
  { id: "valerion-trousers", name: "Cassio Pleated Trouser", tagline: "Wool flannel · Tapered", price: 320, category: "Trousers", image: trousers, colors:[{name:"Onyx",hex:"#0c0c0c"},{name:"Charcoal",hex:"#2a2a2a"}], sizes: sizesClothing, description:"Single-pleat front, tapered leg, finished with side adjusters. Wool flannel with quiet authority." },
  { id: "valerion-noir-hoodie", name: "Noir Heavyweight Hoodie", tagline: "Loopback cotton · Sculpted hood", price: 380, category: "Hoodies", image: hoodie, colors:[{name:"Onyx",hex:"#0c0c0c"},{name:"Charcoal",hex:"#2a2a2a"}], sizes: sizesClothing, badge:"Bestseller", description:"A 480gsm loopback cotton hoodie, garment-dyed in Portugal. Street luxury with the hand of cashmere." },
  { id: "valerion-midnight-polo", name: "Midnight Mercerised Polo", tagline: "Mercerised cotton · Italian knit", price: 290, category: "Polos", image: polo, colors:[{name:"Midnight",hex:"#0a1430"},{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, description:"Mercerised cotton-piqué knitted in Bergamo, with mother-of-pearl placket buttons. The polo, refined." },
  { id: "valerion-camel-knit", name: "Camel Cashmere Rollneck", tagline: "Pure cashmere · Hand-finished", price: 720, category: "Knitwear", image: knit, colors:[{name:"Camel",hex:"#a87a4a"},{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, badge:"New", description:"Spun from grade-A Mongolian cashmere, hand-linked rollneck with whisper-soft hand. The winter staple, elevated." },
  { id: "valerion-onyx-oversized", name: "Onyx Oversized Shirt", tagline: "Drape silhouette · Soft poplin", price: 295, category: "Oversized Shirts", image: oversized, colors:[{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, badge:"New", description:"A sculpted oversized silhouette in compact poplin. Architectural drape, effortless presence." },
  { id: "valerion-ivory-tee", name: "Ivory Heavyweight Tee", tagline: "320gsm Supima · Tubular knit", price: 145, category: "T-Shirts", image: tee, colors:[{name:"Ivory",hex:"#f4ecd8"},{name:"White",hex:"#ffffff"},{name:"Onyx",hex:"#0c0c0c"}], sizes: sizesClothing, badge:"Bestseller", description:"Tubular-knit Supima cotton at 320gsm, garment-washed for the perfect hand. The premium tee, perfected." },
];

export const allCategories = ["All","Shirts","Oversized Shirts","T-Shirts","Polos","Knitwear","Hoodies","Blazers","Suits","Jackets","Trousers"] as const;
export const allColors = ["Onyx","Charcoal","Ivory","White","Midnight","Slate","Camel"];
export const allSizes = ["XS","S","M","L","XL","XXL"];

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
