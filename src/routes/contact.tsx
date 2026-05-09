import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge — House of Valerion" },
      { name: "description", content: "Contact the House of Valerion concierge for bespoke appointments and atelier services." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Bespoke", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your dispatch has been received", { description: "Our concierge will respond within 24 hours." });
    setForm({ name: "", email: "", subject: "Bespoke", message: "" });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <Reveal>
        <SectionLabel>THE CONCIERGE</SectionLabel>
        <h1 className="font-display text-6xl md:text-7xl mt-4 leading-[1] max-w-[14ch]">A private <span className="italic text-gradient-gold">conversation.</span></h1>
        <p className="text-muted-foreground mt-5 max-w-lg">By appointment, by telephone, or by dispatch — our concierge is at your service.</p>
      </Reveal>

      <div className="hairline my-16" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">
        <Reveal>
          <form onSubmit={submit} className="space-y-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label className="text-[10px] tracking-luxe text-gold">NAME</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full mt-2 bg-transparent border-b border-border focus:border-gold outline-none px-0 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-[10px] tracking-luxe text-gold">EMAIL</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full mt-2 bg-transparent border-b border-border focus:border-gold outline-none px-0 py-2.5 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-luxe text-gold">INTEREST</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full mt-2 bg-transparent border-b border-border focus:border-gold outline-none px-0 py-2.5 text-sm">
                {["Bespoke","Atelier appointment","Press","Collaboration","Other"].map(o => <option key={o} value={o} className="bg-background">{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-luxe text-gold">MESSAGE</label>
              <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full mt-2 bg-transparent border-b border-border focus:border-gold outline-none px-0 py-2.5 text-sm resize-none" />
            </div>
            <div className="flex flex-wrap gap-4 items-center pt-4">
              <button type="submit" className="px-8 py-4 bg-gold text-background text-[11px] tracking-luxe uppercase hover:bg-foreground transition-colors">Send Dispatch</button>
              <a href="https://wa.me/390276000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-4 border border-gold/40 text-[11px] tracking-luxe uppercase hover:border-gold hover:text-gold transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Concierge
              </a>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass border border-gold/20 p-8 space-y-7">
            <h3 className="font-display text-2xl">House Address</h3>
            {([
              { Icon: MapPin, a: "Via Montenapoleone 12", b: "Milano, Italia 20121" },
              { Icon: Phone, a: "+39 02 7600 0000", b: "Mon–Sat · 10–19" },
              { Icon: Mail, a: "concierge@valerion.com", b: "Reply within 24 hours" },
            ] as const).map(({ Icon, a, b }, i) => (
              <div key={i} className="flex gap-4">
                <Icon className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <div className="text-sm text-foreground">{a}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b}</div>
                </div>
              </div>
            ))}

            <div className="hairline" />

            <div>
              <div className="text-[10px] tracking-luxe text-gold mb-3">FOLLOW THE HOUSE</div>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="social">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Map */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-16 aspect-[16/7] overflow-hidden border border-border/60 relative">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.116!2d9.193!3d45.467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6ad8eb12345%3A0x0!2sVia%20Montenapoleone%2C%20Milano!5e0!3m2!1sen!2sit!4v1700000000"
          loading="lazy"
          className="w-full h-full grayscale contrast-125 brightness-50"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-gold/10" />
      </motion.div>
    </div>
  );
}
