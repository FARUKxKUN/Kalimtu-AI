"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Zap,
  Lock,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const BENEFITS = [
  {
    icon: Clock,
    title: "Save 10+ Hours Weekly",
    description:
      "No more manual transcription cleanup. Kalimtu gets it right the first time.",
  },
  {
    icon: Lightbulb,
    title: "Never Miss a Detail",
    description:
      "Semantic search lets you find any discussion across all your meetings instantly.",
  },
  {
    icon: TrendingUp,
    title: "Close More Deals",
    description:
      "Automatic insights and summaries help you spot patterns and opportunities faster.",
  },
  {
    icon: CheckCircle2,
    title: "100% Compliance Ready",
    description:
      "Enterprise security, automatic redaction, and audit trails for regulated industries.",
  },
  {
    icon: Zap,
    title: "Instant Action Items",
    description:
      "AI extracts decisions and tasks from meetings automatically. Everyone stays aligned.",
  },
  {
    icon: Lock,
    title: "Your Data, Your Control",
    description:
      "Military-grade encryption. Your conversations never leave your infrastructure.",
  },
];

export function Benefits() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-96 h-96 bg-[#C1FF00]/4 blur-[140px] rounded-full pointer-events-none" />

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
            Immediate Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight"
          >
            What you'll gain <br className="hidden md:inline" /> with Kalimtu
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C1FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                <div className="p-8 rounded-2xl border border-[#2D2D44] bg-[#12121C]/50 backdrop-blur transition-all duration-300 hover:border-[#C1FF00]/30 hover:bg-[#12121C]/80">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C1FF00]/10 to-[#C1FF00]/5 border border-[#C1FF00]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#C1FF00]/40 transition-all duration-300">
                    <Icon
                      size={28}
                      className="text-[#C1FF00] group-hover:text-[#E8FF80] transition-colors"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#A0A0B8] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
