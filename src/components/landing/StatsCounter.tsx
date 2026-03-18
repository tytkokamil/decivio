import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  { value: 4.7, suffix: " Tage", label: "Ø Wartezeit", sublabel: "pro Freigabe im Mittelstand" },
  { value: 47, suffix: "k", prefix: "€", label: "Monatliche Kosten", sublabel: "durch verzögerte Entscheidungen" },
  { value: 83, suffix: "%", label: "Ohne Dokumentation", sublabel: "der Entscheidungen nicht audit-sicher" },
  { value: 3, suffix: " Min", label: "Setup-Zeit", sublabel: "bis zur ersten Entscheidung" },
];

const useCountUp = (target: number, duration: number, inView: boolean) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);
      if (progress >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return current;
};

const StatItem = React.memo(({ stat, index }: { stat: Stat; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.value, 1.8, inView);

  const displayValue = stat.value % 1 !== 0
    ? count.toFixed(1)
    : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease }}
      className="relative text-center group"
    >
      <div className="mb-3">
        <span
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tabular-nums tracking-tighter"
          style={{
            background: index === 3
              ? "linear-gradient(135deg, hsl(var(--accent-teal)), hsl(var(--primary)))"
              : "linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--accent-rose)))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {stat.prefix}{displayValue}{stat.suffix}
        </span>
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
      <p className="text-xs text-muted-foreground/60">{stat.sublabel}</p>
      
      {/* Glow behind number */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-20 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: index === 3
            ? "radial-gradient(ellipse, hsl(var(--accent-teal) / 0.1) 0%, transparent 70%)"
            : "radial-gradient(ellipse, hsl(var(--destructive) / 0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
};

const StatsCounter = () => (
  <section className="py-16 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px]"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--destructive) / 0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsCounter;
