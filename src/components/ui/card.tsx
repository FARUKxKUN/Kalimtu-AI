import { cn } from "@/lib/utils";

interface CardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly gradient?: boolean;
}

export function Card({ children, className, gradient = false }: CardProps) {
  return (
    <div
      className={cn(
        gradient ? "gradient-border" : "glass-card",
        "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
