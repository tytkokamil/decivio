import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative py-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Main beam line */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          <motion.div
            style={{ scaleX, opacity }}
            className="absolute inset-0 origin-center"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--destructive) / 0.6), hsl(var(--accent-violet) / 0.4), transparent)",
              }}
            />
          </motion.div>
          {/* Center glow dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            animate={{
              boxShadow: [
                "0 0 8px 2px hsl(var(--destructive) / 0.3)",
                "0 0 20px 6px hsl(var(--destructive) / 0.5)",
                "0 0 8px 2px hsl(var(--destructive) / 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              opacity: opacity as any,
              background: "hsl(var(--destructive))",
            }}
          />
        </div>
        {/* Ambient glow */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[60px] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse, hsl(var(--destructive) / 0.08) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionDivider;
