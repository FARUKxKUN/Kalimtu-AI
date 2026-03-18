import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingTier } from "@/lib/types";

const TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "0 TND",
    period: "/mo",
    description: "Ideal for beginners and light users.",
    features: [
      "45 minutes of transcription/mo",
      "AI-powered summary",
      "7-day history storage",
      "Basic speaker labeling",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "60 TND",
    priceYearly: "45 TND",
    period: "/mo",
    description: "For professionals needing more power.",
    features: [
      "Everything in Free",
      "6h/week (24h/month) of calls",
      "AI Notes & Action items",
      "Unlimited history (forever)",
      "Priority processing speed",
    ],
    cta: "Join Pro Waitlist",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "Custom",
    period: "",
    description: "Tailored for your specific business needs.",
    features: [
      "Everything in Pro",
      "Flexible credit packages",
      "Premium priority support",
      "24/7 dedicated assistance",
      "Minimum Pro-level credits",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
  {
    name: "Team",
    price: "Soon",
    period: "",
    description: "Collaboration tools for your entire squad.",
    features: [
      "Shared workspaces",
      "Team-wide search",
      "Centralized billing",
      "Admin controls",
    ],
    cta: "Join Waitlist",
    highlighted: false,
    comingSoon: true,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="section-padding bg-[#0A0A0F] relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#C1FF00]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="muted" className="mb-4 bg-[#C1FF00]/5 text-[#C1FF00] border-[#C1FF00]/20 px-4 py-1">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
            Level up your <span className="text-[#C1FF00] drop-shadow-[0_0_15px_rgba(193,255,0,0.3)]">productivity</span>
          </h2>
          <p className="text-[#A0A0B8] max-w-2xl text-lg leading-relaxed mb-10">
            Simple credits system. 1 credit = 1 minute. Choose the plan that scales with you.
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center gap-4 p-1 bg-[#1A1A2E] rounded-full border border-[#2D2D44]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly ? "bg-[#C1FF00] text-[#0A0A0F] shadow-[0_0_20px_rgba(193,255,0,0.2)]" : "text-[#A0A0B8] hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                isYearly ? "bg-[#C1FF00] text-[#0A0A0F] shadow-[0_0_20px_rgba(193,255,0,0.2)]" : "text-[#A0A0B8] hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-6 -right-2 bg-[#C1FF00]/10 text-[#C1FF00] text-[10px] px-2 py-0.5 rounded-full border border-[#C1FF00]/20 font-bold whitespace-nowrap">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card 
                className={`flex flex-col w-full relative group transition-all duration-500 hover:translate-y-[-8px] ${
                  tier.highlighted 
                    ? "border-[#C1FF00]/40 bg-[#0E0E1B] shadow-[0_0_50px_rgba(193,255,0,0.05)] ring-1 ring-[#C1FF00]/20" 
                    : tier.comingSoon ? "border-[#1E1E2E] bg-[#0A0A0F] opacity-75" : "border-[#1E1E2E] bg-[#0D0D16]"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge variant="lime" className="bg-[#C1FF00] text-[#0A0A0F] font-bold px-4 shadow-[0_4px_15px_rgba(193,255,0,0.3)]">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                {tier.comingSoon && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10">
                    <Badge variant="muted" className="bg-white/10 text-white border-white/20 px-6 py-2 text-lg font-bold">
                      SOON
                    </Badge>
                  </div>
                )}
                
                <div className="p-8 flex flex-col h-full text-left">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2 font-display">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isYearly ? "yearly" : "monthly"}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-4xl font-bold text-white tracking-tight"
                        >
                          {isYearly && tier.priceYearly ? tier.priceYearly : tier.price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[#6B6B80] font-medium">{tier.period}</span>
                    </div>
                    <p className="text-sm text-[#A0A0B8] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="grow space-y-4 mb-10">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#C1FF00]/10 flex items-center justify-center border border-[#C1FF00]/20">
                          <Check size={12} className="text-[#C1FF00]" />
                        </div>
                        <span className="text-sm text-[#D1D1E0]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant={tier.highlighted ? "primary" : "secondary"} 
                    className={`w-full py-6 text-base font-bold transition-all duration-300 ${
                      tier.highlighted 
                        ? "bg-[#C1FF00] text-[#0A0A0F] hover:shadow-[0_0_25px_rgba(193,255,0,0.3)] hover:scale-[1.02]" 
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                    disabled={tier.comingSoon}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-[#6B6B80]">
          <div className="flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Info size={14} className="text-[#C1FF00]" />
            <span>Need a custom plan for your team? <a href="#" className="text-white hover:text-[#C1FF00] transition-colors underline underline-offset-4">Talk to an expert</a></span>
          </div>
        </div>
      </Container>
    </section>
  );
}
