"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export function VideoSection() {
  return (
    <section id="demo" className="section-padding">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Demo</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            See Kalimtu <span className="text-gradient-lime">in Action</span>
          </h2>
          <p className="text-[#A0A0B8] text-lg max-w-2xl mx-auto">
            Watch how Kalimtu transforms your meetings into actionable insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Video placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1E1E2E] bg-[#12121C]">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C1FF00]/5 via-transparent to-[#C1FF00]/3" />

            {/* Fake UI preview */}
            <div className="absolute inset-6 flex flex-col gap-3 opacity-30">
              <div className="h-4 bg-[#1E1E2E] rounded w-1/3" />
              <div className="h-3 bg-[#1E1E2E] rounded w-2/3" />
              <div className="h-3 bg-[#1E1E2E] rounded w-1/2" />
              <div className="flex-1" />
              <div className="flex gap-2">
                <div className="h-8 bg-[#1E1E2E] rounded-lg w-20" />
                <div className="h-8 bg-[#1E1E2E] rounded-lg w-24" />
              </div>
            </div>

            {/* Play button */}
            <button className="absolute inset-0 flex items-center justify-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-[#C1FF00] flex items-center justify-center shadow-[0_0_40px_rgba(193,255,0,0.3)] group-hover:shadow-[0_0_60px_rgba(193,255,0,0.5)] group-hover:scale-110 transition-all duration-300">
                <Play size={28} className="text-[#0A0A0F] ml-1" />
              </div>
            </button>
          </div>

          {/* Reflection glow */}
          <div className="absolute -bottom-8 inset-x-8 h-16 bg-[#C1FF00]/5 blur-2xl rounded-full" />
        </motion.div>
      </Container>
    </section>
  );
}
