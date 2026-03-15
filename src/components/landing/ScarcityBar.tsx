import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFoundingSlots } from "@/hooks/useFoundingSlots";

const ScarcityBar = () => {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("scarcity_closed") === "true");
  const { data } = useFoundingSlots();
  const { claimed, total: totalSlots, remaining } = data;

  const soldOut = remaining <= 0;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("scarcity_closed", "true");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -48, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[60]"
      >
        <div
          className="flex items-center justify-center gap-4 md:gap-6 py-2.5 px-4 text-[12px] font-medium"
          style={{
            background: soldOut
              ? "linear-gradient(90deg, hsl(220 15% 20%), hsl(220 15% 15%))"
              : "linear-gradient(90deg, hsl(38 92% 50% / 0.9), hsl(347 87% 50% / 0.8))",
            color: "white",
          }}
        >
          {soldOut ? (
            <>
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Founding Program ausgebucht
              </span>
              <span className="hidden md:inline w-px h-3.5 bg-white/30" />
              <Link to="/founding" className="hidden md:inline underline underline-offset-2 hover:text-white/80 transition-colors">
                Warteliste beitreten →
              </Link>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span className="hidden md:inline">⚡ Founding Program:</span> Noch <span className="font-bold">{claimed} von {totalSlots}</span> Plätzen vergeben
                <span className="hidden md:inline">— Professional €89/Mo statt €149, lebenslang fixiert</span>
              </span>

              <Link
                to="/auth?founding=true"
                className="hidden md:inline-flex items-center gap-1 font-bold text-[11px] px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
              >
                Platz sichern <ArrowRight className="w-3 h-3" />
              </Link>
            </>
          )}

          <button
            onClick={handleDismiss}
            className="ml-2 p-0.5 rounded hover:bg-white/20 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScarcityBar;
