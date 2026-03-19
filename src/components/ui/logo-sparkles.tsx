"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LogoSparkles() {
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random sparkles
    const newSparkles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0% to 100% of container width
      size: Math.random() * 5 + 3, // 3px to 8px
      duration: Math.random() * 20 + 15, // faster falling time
      delay: Math.random() * 15, // Staggered start
      xWobble: Math.random() * 80 - 40, // More Random sway amount
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute top-[140px] md:top-[180px] bottom-0 left-4 md:left-8 xl:left-10 w-12 md:w-14 lg:w-16 z-0 pointer-events-none overflow-hidden hidden xl:block">
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
            boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.size}px rgba(193, 255, 0, 0.8)`,
          }}
          initial={{ top: "-2%", opacity: 0 }}
          animate={{
            top: ["-2%", "100%"],
            opacity: [0, 1, 1, 0.5, 0],
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
