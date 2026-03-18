"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "primary" | "secondary" | "ghost";
  readonly size?: "sm" | "md" | "lg";
  readonly children: React.ReactNode;
}

const VARIANT_STYLES = {
  primary:
    "bg-[#C1FF00] text-[#0A0A0F] hover:bg-[#D4FF4D] font-semibold shadow-[0_0_20px_rgba(193,255,0,0.15)] hover:shadow-[0_0_30px_rgba(193,255,0,0.3)]",
  secondary:
    "bg-transparent border border-[#2D2D44] text-white hover:border-[#C1FF00] hover:text-[#C1FF00]",
  ghost:
    "bg-transparent text-[#A0A0B8] hover:text-white hover:bg-white/5",
} as const;

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
