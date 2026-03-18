"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Video, Zap, Mic, Square, BarChart3, Target, Bolt, Lock } from "lucide-react";

const AUTO_PLAY_INTERVAL_MS = 5000;
const PROGRESS_BAR_DURATION = 4.9;

const WORKFLOW_STEPS = [
  {
    id: 1,
    title: "Start Your Meeting",
    description: "Join a Zoom, Google Meet, or Microsoft Teams call",
    Icon: Video,
    details: "Works with any video conferencing platform",
    color: "from-[#1A1A2E] to-[#252538]",
    borderColor: "border-[#3D3D54]",
    accentColor: "#C1FF00",
  },
  {
    id: 2,
    title: "Kalimtu Activates",
    description: "Our extension popup appears and starts recording",
    Icon: Zap,
    details: "One-click activation, zero setup friction",
    color: "from-[#1A1A2E] to-[#252538]",
    borderColor: "border-[#3D3D54]",
    accentColor: "#C1FF00",
  },
  {
    id: 3,
    title: "Real-time Transcription",
    description: "AI transcribes in real-time with Tunisian dialect support",
    Icon: Mic,
    details: "Understands code-switching (Arabic/French/English)",
    color: "from-[#1A1A2E]/80 to-[#252538]/80",
    borderColor: "border-[#C1FF00]/40",
    accentColor: "#C1FF00",
    isHighlight: true,
  },
  {
    id: 4,
    title: "Meeting Ends",
    description: "Recording stops automatically when you disconnect",
    Icon: Square,
    details: "No manual cleanup required",
    color: "from-[#1A1A2E] to-[#252538]",
    borderColor: "border-[#3D3D54]",
    accentColor: "#C1FF00",
  },
  {
    id: 5,
    title: "Get Your Results",
    description: "Full transcript, summary, notes & action items",
    Icon: BarChart3,
    details: "Speaker identification included for every word",
    color: "from-[#1A1A2E] to-[#252538]",
    borderColor: "border-[#3D3D54]",
    accentColor: "#C1FF00",
  },
];

export function WorkflowTutorial() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlay(false);
  };

  return (
    <section id="workflow" className="section-padding bg-[#0A0A0F] relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="lime" className="mb-4">
            How Kalimtu Works
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            Five Simple Steps to <span className="text-[#C1FF00]">Perfect Transcriptions</span>
          </h2>
          <p className="text-[#A0A0B8] max-w-2xl text-lg">
            From meeting start to detailed notes—all automated, all Tunisian-dialect smart.
          </p>
        </div>

        {/* Main Animation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left: Animated Step Display */}
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[#C1FF00]/5 blur-3xl rounded-full pointer-events-none" />

            {/* Step Cards Stack */}
            <div className="relative w-full max-w-md h-96" role="tabpanel" aria-live="polite" aria-label="Current workflow step">
              <AnimatePresence mode="wait">
                {WORKFLOW_STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  const isNext = index === (activeStep + 1) % WORKFLOW_STEPS.length;
                  const isPrev = index === (activeStep - 1 + WORKFLOW_STEPS.length) % WORKFLOW_STEPS.length;

                  if (!isActive && !isNext && !isPrev) return null;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0, scale: 1, zIndex: 30 }
                          : isNext
                            ? { opacity: 0.4, y: 20, scale: 0.95, zIndex: 20 }
                            : { opacity: 0.2, y: 40, scale: 0.9, zIndex: 10 }
                      }
                      exit={{ opacity: 0, y: -40, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <div
                        className={`h-full w-full rounded-3xl border p-8 flex flex-col justify-between ${step.borderColor} ${step.color} bg-linear-to-br`}
                      >
                        {/* Icon */}
                        <div className="mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#C1FF00]/10 border border-[#C1FF00]/30 flex items-center justify-center">
                            <step.Icon size={28} className="text-[#C1FF00]" />
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#C1FF00]/20 border border-[#C1FF00]/40 flex items-center justify-center text-sm font-bold text-[#C1FF00]">
                              {step.id}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                          <p className="text-white text-sm leading-relaxed mb-4">{step.description}</p>
                          <p className="text-[#A0A0B8] text-xs">{step.details}</p>
                        </div>

                        {/* Progress indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            exit={{ width: 0 }}
                            transition={{ duration: PROGRESS_BAR_DURATION }}
                            className="h-1 bg-[#C1FF00] rounded-full mt-6"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Step Navigator */}
          <div className="flex flex-col gap-4" role="tablist" aria-label="Workflow steps">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleStepClick(index);
                    }
                    if (e.key === "ArrowDown" && index < WORKFLOW_STEPS.length - 1) {
                      handleStepClick(index + 1);
                    }
                    if (e.key === "ArrowUp" && index > 0) {
                      handleStepClick(index - 1);
                    }
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative text-left"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Step ${step.id}: ${step.title}. ${step.description}`}
                  tabIndex={isActive ? 0 : -1}
                >
                  <div
                    className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "border-[#C1FF00]/60 bg-[#C1FF00]/10"
                        : isCompleted
                          ? "border-[#C1FF00]/30 bg-[#C1FF00]/5"
                          : "border-[#2D2D44] bg-[#1A1A2E]/50 hover:border-[#C1FF00]/40"
                    }`}
                  >
                    {/* Checkmark for completed steps */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle2 size={20} className="text-[#C1FF00]" />
                      </motion.div>
                    )}

                    {/* Content */}
                    <div className="flex items-start gap-4">
                      {/* Step icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#C1FF00]/20 border border-[#C1FF00]/40"
                            : isCompleted
                              ? "bg-[#C1FF00]/10 border border-[#C1FF00]/30"
                              : "bg-[#2D2D44] border border-[#3D3D54]"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={20} className="text-[#C1FF00]" />
                        ) : (
                          <step.Icon
                            size={20}
                            className={isActive ? "text-[#C1FF00]" : "text-[#A0A0B8]"}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold mb-1 text-white text-sm">{step.title}</h4>
                        <p className="text-xs text-white leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Auto-play toggle */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="mt-4 px-4 py-2 rounded-lg border border-[#2D2D44] text-[#A0A0B8] text-sm hover:text-white hover:border-[#C1FF00]/40 transition-colors"
            >
              {isAutoPlay ? "Pause Auto-play" : "Resume Auto-play"}
            </motion.button>
          </div>
        </div>

        {/* Bottom: Key Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-12 border-t border-[#2D2D44]"
        >
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#C1FF00]/10 border border-[#C1FF00]/30 flex items-center justify-center">
              <Target size={24} className="text-[#C1FF00]" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">99%+ Accuracy</h4>
              <p className="text-sm text-white">On Tunisian dialect and code-switching</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#C1FF00]/10 border border-[#C1FF00]/30 flex items-center justify-center">
              <Bolt size={24} className="text-[#C1FF00]" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">Real-time Processing</h4>
              <p className="text-sm text-white">Watch transcription happen live</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#C1FF00]/10 border border-[#C1FF00]/30 flex items-center justify-center">
              <Lock size={24} className="text-[#C1FF00]" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">Enterprise Security</h4>
              <p className="text-sm text-white">Military-grade encryption & privacy</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
