"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  {
    number: "01",
    title: "Upload or Stream",
    description: "Connect your mic for live meetings or upload existing audio and video files in any major format.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our neural engines process the audio, identifying speakers, transcribing text, and extracting key insights.",
  },
  {
    number: "03",
    title: "Collaborate & Share",
    description: "Edit the transcript, add comments, and share highlights with your team in a few clicks.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-[#0F0F17]">
      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="muted" className="mb-4">The Process</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-display)]">
            How Kalimtu <span className="text-[#C1FF00]">Works</span>
          </h2>
          <p className="text-[#A0A0B8] max-w-2xl text-lg">
            A simple three-step process to turn your voice data into 
            actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-[#C1FF00]/0 via-[#C1FF00]/20 to-[#C1FF00]/0" />
          
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#0A0A0F] border border-[#2D2D44] flex items-center justify-center text-[#C1FF00] font-bold text-xl mb-6 shadow-[0_0_20px_rgba(193,255,0,0.1)]">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-display)]">
                {step.title}
              </h3>
              <p className="text-[#6B6B80] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
