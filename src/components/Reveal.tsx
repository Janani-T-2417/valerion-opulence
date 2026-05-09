import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 30, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.7, 0, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] tracking-luxe text-gold uppercase">
      <span className="w-8 h-px bg-gold" />
      {children}
    </div>
  );
}
