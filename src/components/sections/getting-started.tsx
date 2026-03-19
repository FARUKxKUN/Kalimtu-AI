"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const STEPS = [
  {
    number: "01",
    title: "Join the Beta",
    description:
      "Sign up with your email and get instant access. No credit card needed.",
    accent: "from-[#C1FF00]/20 to-transparent",
  },
  {
    number: "02",
    title: "Start Recording",
    description:
      "Connect to Zoom, Teams, or Google Meet. Kalimtu starts transcribing automatically.",
    accent: "from-[#818CF8]/20 to-transparent",
  },
  {
    number: "03",
    title: "Get Insights",
    description:
      "Receive automatic summaries, action items, and searchable transcripts instantly.",
    accent: "from-[#10B981]/20 to-transparent",
  },
];

const StepCard = ({ step, index }: { step: typeof STEPS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="relative group"
  >
    {/* Card background with gradient */}
    <div
      className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
    />

    <div className="relative p-8 rounded-2xl border border-[#2D2D44] bg-[#12121C]/50 backdrop-blur transition-all duration-300 hover:border-[#C1FF00]/30 hover:bg-[#12121C]/80 h-full flex flex-col">
      {/* Number */}
      <div className="mb-6">
        <span className="text-7xl font-bold text-[#C1FF00]/20 font-display">
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white mb-4 font-display">
          {step.title}
        </h3>
        <p className="text-[#A0A0B8] leading-relaxed">{step.description}</p>
      </div>

      {/* Connector line (hidden on last) */}
      {index < STEPS.length - 1 && (
        <div className="hidden lg:block absolute -right-6 top-1/2 w-12 h-0.5 bg-gradient-to-r from-[#C1FF00]/30 to-transparent" />
      )}
    </div>
  </motion.div>
);

export function GettingStarted() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#C1FF00]/4 blur-[120px] rounded-full pointer-events-none" />

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
            Get Started in Minutes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display"
          >
            Three simple steps to transform your meetings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A0A0B8] text-lg max-w-2xl mx-auto"
          >
            From signup to first transcription, get running in under 5 minutes.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {STEPS.map((step, idx) => (
            <StepCard key={idx} step={step} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
