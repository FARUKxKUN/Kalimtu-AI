"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { LogoSparkles } from "@/components/ui/logo-sparkles";
import { Pricing } from "@/components/sections/pricing";
import { Stats } from "@/components/sections/stats";
import { Comparison } from "@/components/sections/comparison";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { GettingStarted } from "@/components/sections/getting-started";
import { PremiumCTA } from "@/components/sections/premium-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] noise-overlay relative">
      <Header />
      <LogoSparkles />

      <main>
        <Hero />
        <Stats />
        <Comparison />
        <Testimonials />
        <GettingStarted />
        <FAQ />
        <PremiumCTA />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
