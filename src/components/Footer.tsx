import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/40 bg-onyx relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "var(--gradient-radial-gold)" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-2">
            <div className="font-display text-3xl tracking-[0.2em] text-gradient-gold">VALERION</div>
            <div className="text-[10px] tracking-[0.5em] text-muted-foreground mt-2">HOUSE OF · EST. MMXXV</div>
            <p className="text-sm text-muted-foreground mt-6 max-w-sm leading-relaxed">
              A modern atelier crafting cinematic menswear for the discerning few. Tailored in Italy, finished by hand.
            </p>
            <div className="flex gap-4 mt-8">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe text-gold mb-5">THE HOUSE</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-gold">The Atelier</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Bespoke</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe text-gold mb-5">CLIENTÈLE</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-gold">Concierge</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe text-gold mb-5">CONTACT</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Via Montenapoleone 12<br/>Milano, Italia</li>
              <li>+39 02 7600 0000</li>
              <li>concierge@valerion.com</li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-luxe text-muted-foreground uppercase">
          <span>© MMXXV House of Valerion · All rights reserved</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
