"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const STATS = [
  {
    number: "99.2",
    suffix: "%",
    label: "Accuracy on Tunisian",
    description: "The highest accuracy rate for Tunisian dialect transcription",
  },
  {
    number: "45",
    suffix: "s",
    label: "Average Processing Time",
    description: "Real-time transcription with minimal latency",
  },
  {
    number: "2.5",
    suffix: "M+",
    label: "Words Transcribed",
    description: "Across thousands of Tunisian professionals",
  },
  {
    number: "15",
    suffix: "+",
    label: "Supported Languages",
    description: "Including Arabic, French, English, and local dialects",
  },
];

const StatCard = ({ stat, index }: { stat: typeof STATS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center"
  >
    <div className="mb-6 relative">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C1FF00]/10 to-transparent rounded-full blur-xl -z-10" />

      <div className="text-5xl md:text-6xl font-bold font-display">
        <span className="text-[#C1FF00]">{stat.number}</span>
        <span className="text-3xl text-[#A0A0B8]">{stat.suffix}</span>
      </div>
    </div>

    <h3 className="text-white font-semibold text-lg mb-2">{stat.label}</h3>
    <p className="text-[#A0A0B8] text-sm">{stat.description}</p>
  </motion.div>
);

export function Stats() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-[#C1FF00]/5 via-transparent to-transparent blur-[100px] pointer-events-none" />

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
            By The Numbers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-display"
          >
            Results that speak for themselves
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
