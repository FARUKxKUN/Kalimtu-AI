"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useState } from "react";

const FAQS = [
  {
    question: "How accurate is Kalimtu for Tunisian dialect?",
    answer:
      "Kalimtu achieves 99.2% accuracy on Tunisian dialect, significantly higher than generic transcription tools. We've trained our model specifically on thousands of hours of Tunisian speech, including code-switching patterns.",
  },
  {
    question: "Does it work with other languages mixed in?",
    answer:
      "Yes! Kalimtu excels at handling code-switching. You can mix Tunisian Arabic, French, English, and other languages in the same sentence, and our model understands the context perfectly.",
  },
  {
    question: "How quickly does it transcribe?",
    answer:
      "Kalimtu provides real-time transcription with an average latency of 45 seconds. You'll see words appearing in your document as you speak.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your conversations are encrypted at rest and in transit using military-grade encryption (AES-256). We comply with GDPR, SOC 2, and other enterprise security standards.",
  },
  {
    question: "Can I integrate it with Zoom, Teams, or Google Meet?",
    answer:
      "Absolutely. Kalimtu integrates seamlessly with all major meeting platforms. Just click 'Start Recording' and Kalimtu handles the rest automatically.",
  },
  {
    question: "What happens when my subscription ends?",
    answer:
      "Your data stays yours forever. You can export all your transcriptions, summaries, and insights at any time. No vendor lock-in.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Glow accent */}
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-[#C1FF00]/3 blur-[130px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest font-semibold text-[#C1FF00] mb-4"
          >
            Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full text-left p-6 rounded-xl border border-[#2D2D44] bg-[#12121C]/40 backdrop-blur hover:border-[#C1FF00]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#C1FF00] transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: openIndex === idx ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-colors ${
                        openIndex === idx
                          ? "text-[#C1FF00]"
                          : "text-[#A0A0B8]"
                      }`}
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#A0A0B8] mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
