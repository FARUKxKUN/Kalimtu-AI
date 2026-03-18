"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";

export function BackgroundDemo() {
  const handleGetStarted = () => {
    // Navigate to waitlist or demo
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BackgroundPaths
      title="Experience Tunisian Transcription"
      subtitle="Join hundreds of Tunisian professionals who are capturing every word, perfectly. Real-time AI transcription built specifically for how you speak."
      cta="Join the Beta"
      onCtaClick={handleGetStarted}
    />
  );
}
