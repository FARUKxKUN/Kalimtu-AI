"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LogoSparkles() {
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random sparkles
    const newSparkles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0% to 100% of container width
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 30 + 20, // 20s to 50s falling time
      delay: Math.random() * 20, // Staggered start
      xWobble: Math.random() * 60 - 30, // Random sway amount
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute top-[160px] md:top-[200px] bottom-0 left-6 md:left-14 w-20 md:w-28 lg:w-36 z-0 pointer-events-none overflow-hidden hidden sm:block">
      {/* 
        This container matches the x-position and width of the logo in the hero section.
        It starts just below the logo and spans to the very bottom of the page.
      */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-[#C1FF00]"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.left}%`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size / 2}px rgba(193, 255, 0, 0.4)`,
          }}
          initial={{ top: "-1%", opacity: 0 }}
          animate={{
            top: ["-1%", "100%"],
            opacity: [0, 1, 1, 0],
            x: [0, sparkle.xWobble, 0], // slight horizontal sway as it falls
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
