"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Search, Shield, Globe, Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: Globe,
    title: "Tunisian Dialect Expert",
    description: "Built specifically for Tunisian speakers. Understands local dialect, code-switching (Arabic/French/English), and the natural way Tunisians speak—not trained on generic Arabic.",
    highlight: true,
  },
  {
    icon: Mic,
    title: "99%+ Accuracy on Tunisian",
    description: "Where Whisper gets 75%+ WER on Tunisian, our model achieves superior accuracy. Finally, transcription that actually works for your language.",
  },
  {
    icon: Cpu,
    title: "Smart Summaries & Action Items",
    description: "AI automatically extracts summaries, key decisions, and action items from your meetings. Get the essential notes without manual effort.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Search your entire library of conversations by concept, not just keywords. Find that one specific detail instantly across all languages.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Watch as words turn into text in real-time during your meeting. Zero lag, zero waiting, pure productivity.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data is encrypted at rest and in transit. Military-grade privacy and compliance for your sensitive conversations.",
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding bg-[#0A0A0F] relative">
      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="lime" className="mb-4">Why Kalimtu</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            The only transcription built for <span className="text-[#C1FF00]">Tunisian speakers</span>
          </h2>
          <p className="text-[#A0A0B8] max-w-2xl text-lg">
            Forget generic AI. Kalimtu understands your language, your dialect, and the way you really talk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={feature.highlight ? "lg:col-span-2" : ""}
            >
              <Card
                className={`h-full group hover:border-[#C1FF00]/50 transition-all duration-300 ${
                  feature.highlight
                    ? "border-[#C1FF00]/40 bg-linear-to-br from-[#C1FF00]/5 to-transparent"
                    : ""
                }`}
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  feature.highlight
                    ? "bg-[#C1FF00]/10 border-[#C1FF00]/40 text-[#C1FF00]"
                    : "bg-[#1A1A2E] border-[#2D2D44] text-[#C1FF00]"
                }`}>
                  <feature.icon size={24} />
                </div>
                <h3 className={`font-bold mb-3 font-display ${
                  feature.highlight
                    ? "text-2xl text-[#C1FF00]"
                    : "text-xl text-white"
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  feature.highlight
                    ? "text-[#A0A0B8]"
                    : "text-[#6B6B80]"
                }`}>
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
