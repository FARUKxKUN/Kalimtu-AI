import { cn } from "@/lib/utils";

interface BadgeProps {
  readonly children: React.ReactNode;
  readonly variant?: "lime" | "muted";
  readonly className?: string;
}

export function Badge({ children, variant = "lime", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variant === "lime" &&
          "bg-[#C1FF00]/10 text-[#C1FF00] border border-[#C1FF00]/20",
        variant === "muted" &&
          "bg-white/5 text-[#A0A0B8] border border-[#1E1E2E]",
        className
      )}
    >
      {children}
    </span>
  );
}
