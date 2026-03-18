"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { WorkflowTutorial } from "@/components/sections/workflow-tutorial";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] noise-overlay">
      <Header />

      <main>
        <Hero />
        <BackgroundPaths
          title="Experience Tunisian Transcription"
          subtitle="Join hundreds of Tunisian professionals who are capturing every word, perfectly. Real-time AI transcription built specifically for how you speak."
          cta="Join the Beta"
          onCtaClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        />
        <WorkflowTutorial />
        <HowItWorks />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
