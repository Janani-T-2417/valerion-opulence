import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — House of Valerion" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <Reveal>
        <SectionLabel>YOUR PRIVATE EDIT</SectionLabel>
        <h1 className="font-display text-5xl md:text-6xl mt-4">Saved <span className="italic text-gradient-gold">desires.</span></h1>
        <p className="text-muted-foreground mt-3 max-w-md">Pieces you've marked for the moment. Return when the time arrives.</p>
      </Reveal>

      <div className="hairline my-12" />

      {items.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="w-10 h-10 text-gold/60 mx-auto" />
          <div className="font-display text-3xl mt-6">Your wishlist awaits.</div>
          <p className="text-muted-foreground mt-3">Begin curating your private edit from the collection.</p>
          <Link to="/shop" className="inline-block mt-8 px-7 py-3 bg-gold text-background text-[11px] tracking-luxe uppercase hover:bg-foreground transition-colors">
            Discover Pieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
