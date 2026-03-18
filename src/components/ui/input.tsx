"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, error, ...props }, ref) {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full bg-[#12121C] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder:text-[#6B6B80] outline-none transition-all duration-300",
            "focus:border-[#C1FF00] focus:ring-1 focus:ring-[#C1FF00]/20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
