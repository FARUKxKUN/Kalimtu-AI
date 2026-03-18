"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/shared/waitlist-form";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="section-padding relative">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C1FF00]/5 rounded-full blur-[150px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Badge className="mb-4">Early Access</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Get <span className="text-gradient-lime">Early Access</span>
          </h2>
          <p className="text-[#A0A0B8] text-lg mb-8">
            Join the waitlist and be among the first to experience Kalimtu.
            Limited spots available for our private beta.
          </p>

          <div className="flex justify-center">
            <WaitlistForm
              source="waitlist-section"
              showCount
              className="w-full max-w-md"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6 text-xs text-[#6B6B80]"
          >
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C1FF00]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C1FF00]" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C1FF00]" />
              Free tier forever
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
