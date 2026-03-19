import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "Wir hatten keine Ahnung, dass offene Freigaben uns €12.000 pro Monat kosten. Seit Decivio sehen wir es in Echtzeit — und die Geschäftsleitung entscheidet endlich schneller.",
    name: "Thomas Berger",
    role: "Leiter Qualitätsmanagement",
    company: "Mittelständischer Maschinenbauer",
    industry: "Maschinenbau",
    metric: "68% schnellere Freigaben",
    avatar: "TB",
  },
  {
    quote: "Unser ISO 9001-Audit war zum ersten Mal stressfrei. Der SHA-256 Audit Trail hat den Prüfer mehr beeindruckt als alles, was wir vorher hatten.",
    name: "Dr. Claudia Wenzel",
    role: "Head of Compliance",
    company: "Automotive Zulieferer",
    industry: "Automotive",
    metric: "100% Audit-Readiness",
    avatar: "CW",
  },
  {
    quote: "One-Click Approval aus der E-Mail hat unsere Freigabezeiten von 5 Tagen auf unter 24 Stunden gesenkt. Kein Portal-Login mehr. Einfach genial.",
    name: "Markus Hoffmann",
    role: "COO",
    company: "Logistik-Unternehmen",
    industry: "Logistik",
    metric: "5x schnellere Entscheidungen",
    avatar: "MH",
  },
  {
    quote: "Endlich weiß jeder im Team, wer was entscheidet und bis wann. Die Transparenz hat unsere Meetingkultur komplett verändert.",
    name: "Sandra Klein",
    role: "Projektleiterin",
    company: "IT-Dienstleister",
    industry: "IT & Services",
    metric: "40% weniger Meetings",
    avatar: "SK",
  },
];

const TestimonialSection = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index: number) => {
    setActive(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const t = testimonials[active];

  return (
    <section className="py-20 relative overflow-hidden" aria-label="Kundenstimmen">
      <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/5 mb-6"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
            <span className="text-[11px] font-semibold text-accent-teal tracking-[0.15em] uppercase">
              Kundenstimmen
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.04em] mb-5 leading-[1.1]">
            Was unsere Kunden sagen.
          </h2>
          <p className="text-[16px] text-muted-foreground leading-relaxed">
            Echte Ergebnisse. Echte Unternehmen. Echte Wirkung.
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
              className="relative rounded-2xl p-8 md:p-12"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Quote icon */}
              <Quote
                className="w-10 h-10 mb-6 text-primary/20"
                strokeWidth={1.5}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill="hsl(var(--accent-amber))"
                    stroke="hsl(var(--accent-amber))"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl font-medium leading-[1.7] mb-8 text-foreground/90">
                „{t.quote}"
              </blockquote>

              {/* Metric badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{
                  background: "hsl(var(--accent-teal) / 0.08)",
                  border: "1px solid hsl(var(--accent-teal) / 0.15)",
                }}
              >
                <span className="text-[13px] font-bold text-accent-teal">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent-violet) / 0.1))",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">{t.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 bg-muted/30">
                  {t.industry}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full transition-all hover:bg-muted/30"
              aria-label="Vorheriges Testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative w-8 h-1.5 rounded-full overflow-hidden transition-all"
                  style={{
                    background: i === active ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted) / 0.5)",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  {i === active && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => goTo((active + 1) % testimonials.length)}
              className="p-2 rounded-full transition-all hover:bg-muted/30"
              aria-label="Nächstes Testimonial"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "50+", label: "Unternehmen" },
            { value: "4.9/5", label: "Bewertung" },
            { value: "<5 Min", label: "Setup" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
