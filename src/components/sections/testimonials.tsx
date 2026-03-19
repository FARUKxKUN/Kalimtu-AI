"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    quote:
      "Finally, a tool that understands how I actually speak. No more fixing transcriptions manually.",
    author: "Amira Ben Youssef",
    role: "Legal Consultant, Tunis",
    rating: 5,
  },
  {
    quote:
      "The accuracy is unreal. We've cut our note-taking time by 80%. This is a game-changer for our team.",
    author: "Khalid Dhouib",
    role: "Sales Director, Sfax",
    rating: 5,
  },
  {
    quote:
      "Reshaped how we handle client meetings. The automatic summaries alone save us hours every week.",
    author: "Leila Mansouri",
    role: "Startup Founder, Sousse",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Accent glow */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-[#C1FF00]/5 blur-[150px] rounded-full pointer-events-none" />

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
            Loved by Tunisian Professionals
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight"
          >
            Hear from people who use Kalimtu daily
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl border border-[#2D2D44] bg-[#12121C]/40 backdrop-blur transition-all duration-300 hover:border-[#C1FF00]/40 hover:bg-[#12121C]/60 hover:shadow-lg hover:shadow-[#C1FF00]/10">
                {/* Stars */}
                <div className="flex gap-1.5 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[#C1FF00] text-[#C1FF00]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg text-white mb-8 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-[#2D2D44] pt-6">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-[#A0A0B8]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
