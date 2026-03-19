"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/shared/waitlist-form";
import { useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Mid-sized Logo on the Left Empty Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 left-6 md:top-14 md:left-14 z-20 hidden sm:block"
      >
        <img 
          src="/logo.svg" 
          alt="Kalimtu" 
          className="w-20 md:w-28 lg:w-36 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
        />
      </motion.div>

      {/* Background Glow — shifted left */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-[#C1FF00]/5 blur-[140px] rounded-full pointer-events-none" />
      {/* Secondary glow — behind video */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#C1FF00]/3 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ═══ Left: Text Content ═══ */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="lime" className="mb-6">
                <Sparkles size={12} className="mr-1.5" />
                Revolutionizing Transcription
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-6 font-display leading-[0.95]"
            >
              Transcription That <br />
              <span className="text-gradient-lime">Understands Tunisian</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-[#A0A0B8] mb-10 max-w-lg leading-relaxed"
            >
              Finally, AI transcription built for Tunisian speakers. Our model
              understands Tunisian dialect, code-switching, and the natural way
              you mix Arabic, French, and English in one sentence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md"
            >
              <WaitlistForm showCount />
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-14 flex flex-col items-start gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#C1FF00]/10 border border-[#C1FF00]/30 flex items-center justify-center text-[10px] font-bold text-[#C1FF00]"
                    >
                      TN
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#A0A0B8]">
                  <span className="font-semibold text-white">500+</span> Tunisian professionals using Kalimtu
                </p>
              </div>
              <p className="text-xs uppercase tracking-widest text-[#6B6B80] font-semibold">
                Works with
              </p>
              <div className="flex flex-wrap gap-6">
                {["Google Meet", "Zoom", "Microsoft Teams"].map((platform) => (
                  <span
                    key={platform}
                    className="text-sm font-semibold text-white opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══ Right: Video Animation ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Decorative ring behind video */}
            <div className="absolute inset-0 -m-4 rounded-[32px] bg-linear-to-br from-[#C1FF00]/10 via-transparent to-[#C1FF00]/5 blur-sm pointer-events-none" />

            <div className="relative w-full max-w-[540px] hero-video-container">
              {/* Lime accent line — top left corner */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-[#C1FF00]/40 rounded-tl-[20px] pointer-events-none" />
              {/* Lime accent line — bottom right corner */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-[#C1FF00]/40 rounded-br-[20px] pointer-events-none" />

              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl shadow-2xl shadow-black/40"
                style={{
                  border: "1px solid rgba(30, 30, 46, 0.8)",
                }}
              >
                <source src="/hero-demo.mp4" type="video/mp4" />
              </video>

              {/* Floating pulse dot */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-[#C1FF00] shadow-[0_0_16px_rgba(193,255,0,0.5)]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
