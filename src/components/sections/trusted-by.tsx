"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const LOGOS = [
  { name: "Google", width: 90 },
  { name: "Zoom", width: 80 },
  { name: "Slack", width: 75 },
  { name: "Microsoft", width: 110 },
  { name: "Salesforce", width: 100 },
] as const;

function LogoPlaceholder({
  name,
  width,
}: {
  readonly name: string;
  readonly width: number;
}) {
  return (
    <div
      className="flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale hover:grayscale-0"
      style={{ width }}
    >
      <span className="text-sm sm:text-base font-semibold text-[#6B6B80] tracking-wide uppercase">
        {name}
      </span>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-16 border-y border-[#1E1E2E]/50">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[#6B6B80] mb-10">
            Trusted by teams at
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <LogoPlaceholder name={logo.name} width={logo.width} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
