import { motion } from "framer-motion";
import editorial from "@/assets/editorial-2.jpg";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="relative my-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={editorial} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      <div className="max-w-2xl mx-auto text-center px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="text-[11px] tracking-luxe text-gold mb-4">THE PRIVATE LIST</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Receive the House dispatch.</h2>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
            Private previews, atelier invitations, and the season's most desired pieces — delivered before they reach the public.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
          >
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-border focus:border-gold outline-none px-1 py-3 text-sm tracking-wide placeholder:text-muted-foreground/60 transition-colors"
            />
            <button type="submit" className="px-7 py-3 bg-gold text-background text-[11px] tracking-luxe uppercase font-medium hover:bg-foreground transition-colors">
              {done ? "Welcomed ✦" : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
