import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(17);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const { data } = await supabase
          .from("founding_customer_slots")
          .select("claimed_slots, total_slots")
          .limit(1)
          .single();
        if (data) setRemaining((data.total_slots ?? 20) - (data.claimed_slots ?? 3));
      } catch { /* fallback */ }
    };
    fetchSlots();
  }, []);

  const faqs = [
    {
      q: "Was ist Decivio — und was unterscheidet es von Monday oder Jira?",
      a: "Monday.com und Jira sind Projektmanagement-Tools — sie verwalten Tasks, Projekte und Sprints. Decivio löst ein anderes Problem: Wer entscheidet was, wann, warum — und was kostet es wenn die Entscheidung nicht fällt? Der Fokus liegt auf Entscheidungskosten sichtbar machen, Compliance-Dokumentation automatisieren und Freigabeprozesse beschleunigen. Beides kann sich ergänzen.",
    },
    {
      q: "Für welche Unternehmensgrößen ist Decivio geeignet?",
      a: "Starter ist ab 2 Personen sinnvoll. Professional ist optimiert für Teams von 5–25 Personen die an Entscheidungsprozessen beteiligt sind — nicht die Gesamtmitarbeiterzahl. Enterprise für Konzerne mit SSO-Pflicht, Custom Branding oder On-Premise-Bedarf.",
    },
    {
      q: "Wie lange dauert der Einstieg wirklich?",
      a: "Branche auswählen → erste Entscheidung anlegen → Reviewer einladen. Das Onboarding ist auf unter 5 Minuten ausgelegt. Keine IT-Abteilung, keine Installation, kein Projekt.",
    },
    {
      q: "Ist Decivio DSGVO-konform? Wo liegen die Daten?",
      a: "Ja. Server in Deutschland (EU-Region Frankfurt). Auftragsverarbeitungsvertrag (AVV) ist in allen Plänen inklusive — kein Zusatzvertrag nötig. Datenexport nach Art. 20 und vollständige Datenlöschung nach Art. 17 sind direkt in der Plattform verfügbar.",
    },
    {
      q: "Können externe Partner ohne Account genehmigen?",
      a: "Ja. Externe Reviewer — Lieferanten, Rechtsanwälte, Wirtschaftsprüfer — erhalten einen sicheren Token-Link per E-Mail. Sie öffnen die Entscheidung im Browser, geben Feedback und genehmigen oder lehnen ab. Keine Registrierung, kein Passwort. Alle Aktionen landen im Audit Trail.",
    },
    {
      q: "Was genau ist der SHA-256 Audit Trail — und warum ist das wichtig?",
      a: "Jede Änderung, Genehmigung und Ablehnung wird als Hash-verketteter Audit-Log-Eintrag gespeichert. Jeder neue Eintrag enthält den Hash des vorherigen — vergleichbar mit einer Blockchain. Nachträgliche Änderungen sind mathematisch erkennbar. ISO 9001-, IATF- und NIS2-Auditoren können die Kette verifizieren und als PDF exportieren.",
    },
    {
      q: "Was kostet das Founding Program und wann endet es?",
      a: `Professional für €89/Mo statt €149 — lebenslang fixiert, solange Sie Kunde sind. Kein Ablaufdatum, kein automatischer Preisanstieg. Nur für die ersten 20 Founding Customers. Aktuell noch ${remaining} Plätze verfügbar — live aus der Datenbank gelesen.`,
    },
    {
      q: "Gibt es eine Mindestlaufzeit oder Kündigungsfrist?",
      a: "Nein. Monatliche Zahlung ist jederzeit zum Monatsende kündbar. Jährliche Zahlung spart 17% (2 Monate gratis) und ist nach 12 Monaten kündbar. Datenlöschung auf Wunsch sofort nach Kündigung via DSGVO Art. 17.",
    },
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--destructive) / 0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-destructive/20 bg-destructive/5 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
            <span className="text-[11px] font-semibold text-destructive tracking-[0.15em] uppercase">FAQ</span>
          </motion.div>
          <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.04em]">
            Häufige Fragen.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openItem === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease }}
              >
                <div
                  className={`group relative rounded-2xl border px-6 transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-card/80 border-destructive/20 shadow-[0_0_30px_-10px_hsl(var(--destructive)/0.15)]"
                      : "bg-card/40 border-border/20 hover:border-border/40 hover:bg-card/60"
                  }`}
                >
                  {/* Subtle left accent line */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${
                      isOpen
                        ? "bg-gradient-to-b from-destructive/60 via-destructive/40 to-transparent"
                        : "bg-transparent group-hover:bg-gradient-to-b group-hover:from-muted-foreground/20 group-hover:via-muted-foreground/10 group-hover:to-transparent"
                    }`}
                  />

                  <button
                    onClick={() => setOpenItem(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 py-5 text-left"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isOpen
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted/50 text-muted-foreground/50 group-hover:bg-muted/80 group-hover:text-muted-foreground/70"
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className={`text-[15px] font-semibold flex-1 leading-snug transition-colors duration-300 ${
                      isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground/90"
                    }`}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-destructive/10"
                          : "bg-transparent group-hover:bg-muted/50"
                      }`}
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                        isOpen ? "text-destructive" : "text-muted-foreground/40"
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="text-[14px] text-muted-foreground leading-[1.85] pb-6 pl-12">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
