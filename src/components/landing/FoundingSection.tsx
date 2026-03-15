import { motion } from "framer-motion";
import { ArrowRight, Crown, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useFoundingSlots } from "@/hooks/useFoundingSlots";

const ease = [0.16, 1, 0.3, 1] as const;

const FoundingSection = () => {
  const { data } = useFoundingSlots();
  const { claimed, total, remaining } = data;
  const progress = (claimed / total) * 100;

  if (remaining <= 0) return null;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent-amber) / 0.06) 0%, transparent 60%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-40" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg, hsl(var(--accent-amber) / 0.15), hsl(var(--accent-amber) / 0.05))",
              border: "1px solid hsl(var(--accent-amber) / 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Crown className="w-4 h-4 text-accent-amber" />
            <span className="text-[12px] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--accent-amber))" }}>
              Founding Customer Program
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
            className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-foreground"
          >
            Professional für{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent-amber)), hsl(var(--accent-rose)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              €89/Mo
            </span>
            {" "}statt €149.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
            className="text-[16px] max-w-md mx-auto leading-relaxed mb-8 text-muted-foreground"
          >
            Lebenslang fixierter Preis für die ersten {total} Kunden.
            Nur noch {remaining} Plätze verfügbar.
          </motion.p>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="max-w-xs mx-auto mb-10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Flame className="w-3.5 h-3.5 inline-block mr-1 text-accent-amber" />
                {claimed}/{total} vergeben
              </span>
              <span className="text-[12px] font-bold" style={{ color: "hsl(var(--accent-amber))" }}>
                {remaining} frei
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--accent-amber)), hsl(var(--accent-rose)))" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease }}
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
          >
            <Link
              to="/founding"
              className="group relative inline-flex items-center justify-center gap-2.5 text-[15px] font-bold px-10 py-4 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent-amber)), hsl(var(--accent-rose) / 0.85))",
                color: "hsl(38 80% 12%)",
                boxShadow: "0 0 50px -10px hsl(var(--accent-amber) / 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Mehr erfahren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundingSection;
