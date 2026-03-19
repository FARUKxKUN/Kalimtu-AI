"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, error, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push("/");
    } catch (err) {
      // Error is handled by useAuth hook
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C1FF00]/5 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-[#A0A0B8] mb-8">
            {isSignUp
              ? "Join Kalimtu to get early access"
              : "Sign in to access Kalimtu"}
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-1 focus:ring-[#C1FF00] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-1 focus:ring-[#C1FF00] transition-all duration-200"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#C1FF00] hover:bg-[#B8E600] text-slate-900 font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle signup/login */}
          <p className="text-center text-[#A0A0B8] text-sm mt-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#C1FF00] hover:text-[#B8E600] font-medium transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

          {/* Back to home */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/"
              className="text-center block text-[#A0A0B8] hover:text-white text-sm transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}