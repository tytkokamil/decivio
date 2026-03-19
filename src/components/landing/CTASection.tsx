import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const CTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-16 relative overflow-hidden" aria-label="Jetzt starten">
      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.04em] mb-5 leading-[1.1]">
            Bereit, Entscheidungskosten
            <br />
            <span className="gradient-text">sichtbar zu machen?</span>
          </h2>

          <p className="mb-8 text-[16px] text-muted-foreground max-w-md mx-auto leading-relaxed">
            Erste Entscheidung in 3 Minuten. Keine Kreditkarte. Kein IT-Projekt.
            <br />Ihr nächster Audit-Prüfer wird es Ihnen danken.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex -space-x-2">
              {["TB", "CW", "MH"].map((initials, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-background"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent-violet) / 0.2))`,
                    color: "hsl(var(--foreground) / 0.7)",
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-[12px] text-muted-foreground">
              <strong className="text-foreground/70">50+ Mittelständler</strong> vertrauen bereits auf Decivio
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              to="/auth"
              className="group relative inline-flex items-center justify-center gap-2.5 text-[15px] font-bold text-primary-foreground px-10 py-4.5 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: "hsl(0 84% 60%)",
                boxShadow: "0 0 50px -10px hsl(0 84% 60% / 0.5)",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                Kostenlos starten <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <a
              href="mailto:hallo@decivio.com"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-medium px-7 py-4 rounded-2xl text-muted-foreground hover:text-foreground transition-all"
              style={{
                background: "hsl(var(--card) / 0.6)",
                backdropFilter: "blur(20px) saturate(1.5)",
                border: "1px solid hsl(var(--border) / 0.3)",
              }}
            >
              Demo buchen
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
          >
            {["🇩🇪 Server in Deutschland", "🔒 DSGVO", "📋 AVV inklusive", "↕ Jederzeit kündbar"].map((item, i) => (
              <span key={i} className="text-[12px] font-medium text-muted-foreground">{item}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
