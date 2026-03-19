"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

export function PremiumCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C1FF00]/8 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C1FF00]/5 blur-[140px] rounded-full pointer-events-none animate-pulse" style={{animationDelay: "1s"}} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C1FF00]/10 border border-[#C1FF00]/30 mb-8"
          >
            <Sparkles size={16} className="text-[#C1FF00]" />
            <span className="text-sm font-semibold text-[#C1FF00]">
              Join 500+ professionals
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-display leading-[1.1]"
          >
            Ready to{" "}
            <span className="text-gradient-lime">transform your meetings?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0B8] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get instant transcriptions, automatic summaries, and actionable insights. All built specifically for how Tunisians speak.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("waitlist")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#C1FF00] text-[#0A0A0F] font-bold text-lg hover:shadow-[0_0_40px_rgba(193,255,0,0.4)] transition-all duration-300 cursor-pointer group"
          >
            Join the Beta
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          {/* Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-[#6B6B80] mt-8"
          >
            No credit card required. Full feature access during beta.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
