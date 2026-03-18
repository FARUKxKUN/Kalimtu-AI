"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SendButton } from "@/components/ui/send-button";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

type FormStatus = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  readonly source?: string;
  readonly className?: string;
  readonly showCount?: boolean;
}

export function WaitlistForm({
  source = "hero",
  className,
  showCount = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  // Fetch waitlist count on mount
  useEffect(() => {
    if (!showCount) return;

    const fetchCount = async () => {
      try {
        const response = await fetch("/api/waitlist");
        const data = await response.json();
        if (data.success && typeof data.data.count === "number") {
          setCount(data.data.count);
        }
      } catch (err) {
        console.error("Failed to fetch waitlist count:", err);
      }
    };

    fetchCount();
  }, [showCount]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const result = emailSchema.safeParse(email);
      if (!result.success) {
        setErrorMessage(result.error.issues[0]?.message || 'Invalid email');
        setStatus("error");
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Something went wrong");
        }

        setStatus("success");
        setEmail("");
        if (data.meta?.total) {
          setCount(data.meta.total);
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    },
    [email, source]
  );

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-[#C1FF00]"
          >
            <div className="w-8 h-8 rounded-full bg-[#C1FF00]/10 flex items-center justify-center">
              <Check size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">You&apos;re on the list!</p>
              <p className="text-xs text-[#A0A0B8]">
                We&apos;ll reach out when beta is ready.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:items-center"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              error={status === "error" ? errorMessage : undefined}
              className="sm:min-w-[280px]"
              disabled={status === "loading"}
            />
            <SendButton
              isLoading={status === "loading"}
              disabled={!email}
              type="submit"
            />
          </motion.form>
        )}
      </AnimatePresence>

      {showCount && count !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-[#6B6B80]"
        >
          <span className="text-[#C1FF00] font-medium">{count}</span> people
          already on the waitlist
        </motion.p>
      )}
    </div>
  );
}
