"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function FinalCtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C1FF00]/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Ready to capture{" "}
            <span className="text-gradient-lime">every word</span>?
          </h2>
          <p className="text-[#A0A0B8] text-lg max-w-xl mx-auto mb-8">
            Stop missing important details. Let Kalimtu handle the notes so you
            can focus on the conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist">
              <button className="inline-flex items-center gap-2 bg-[#C1FF00] text-[#0A0A0F] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#D4FF4D] transition-all duration-300 shadow-[0_0_20px_rgba(193,255,0,0.15)] hover:shadow-[0_0_30px_rgba(193,255,0,0.3)] cursor-pointer">
                Join the Waitlist
                <ArrowRight size={16} />
              </button>
            </a>
            <a
              href="#demo"
              className="text-sm text-[#A0A0B8] hover:text-white transition-colors underline underline-offset-4 decoration-[#2D2D44] hover:decoration-[#C1FF00]"
            >
              Watch the demo first
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
