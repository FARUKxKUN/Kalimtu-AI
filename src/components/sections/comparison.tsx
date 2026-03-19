"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";

const COMPARISON = [
  { feature: "Tunisian Dialect Support", kalimtu: true, competitors: false },
  { feature: "Real-time Transcription", kalimtu: true, competitors: true },
  { feature: "Code-switching (AR/FR/EN)", kalimtu: true, competitors: false },
  { feature: "Automatic Summaries", kalimtu: true, competitors: false },
  { feature: "Enterprise Security", kalimtu: true, competitors: true },
  { feature: "Semantic Search", kalimtu: true, competitors: false },
  { feature: "99%+ Accuracy on Tunisian", kalimtu: true, competitors: false },
];

export function Comparison() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Glow accent */}
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-[#C1FF00]/4 blur-[150px] rounded-full pointer-events-none" />

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
            vs. The Competition
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display"
          >
            Built for Tunisians. Period.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A0A0B8] text-lg max-w-2xl mx-auto"
          >
            Generic transcription tools weren't made with your language in mind. Kalimtu is.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2D2D44]">
                <th className="text-left py-6 px-6 text-white font-semibold">
                  Feature
                </th>
                <th className="text-center py-6 px-6 text-[#C1FF00] font-semibold">
                  Kalimtu
                </th>
                <th className="text-center py-6 px-6 text-[#A0A0B8] font-semibold">
                  Others
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="border-b border-[#2D2D44]/50 hover:bg-[#12121C]/40 transition-colors"
                >
                  <td className="py-4 px-6 text-[#A0A0B8]">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {row.kalimtu ? (
                      <Check
                        size={20}
                        className="mx-auto text-[#C1FF00]"
                        strokeWidth={3}
                      />
                    ) : (
                      <X
                        size={20}
                        className="mx-auto text-[#6B6B80]"
                        strokeWidth={3}
                      />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.competitors ? (
                      <Check
                        size={20}
                        className="mx-auto text-[#6B6B80]"
                        strokeWidth={3}
                      />
                    ) : (
                      <X
                        size={20}
                        className="mx-auto text-[#6B6B80]"
                        strokeWidth={3}
                      />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  );
}
