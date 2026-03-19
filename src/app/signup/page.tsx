"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";

// Password strength calculation
function calculatePasswordStrength(password: string): {
  strength: "weak" | "fair" | "strong" | "excellent";
  score: number;
  message: string;
  color: string;
} {
  let score = 0;
  const checks = [
    password.length >= 8,
    password.length >= 12,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  score = checks.filter(Boolean).length;

  if (score < 2) return { strength: "weak", score: 1, message: "Too weak", color: "bg-red-500" };
  if (score < 4) return { strength: "fair", score: 2, message: "Fair", color: "bg-orange-500" };
  if (score < 6) return { strength: "strong", score: 3, message: "Strong", color: "bg-yellow-500" };
  return { strength: "excellent", score: 4, message: "Excellent", color: "bg-lime-500" };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signUp, error, loading } = useAuth();
  const router = useRouter();

  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password]);
  const isPasswordValid = password.length >= 8;
  const isConfirmValid = password === confirmPassword && confirmPassword.length >= 8;
  const isFormValid = email && fullName && isPasswordValid && isConfirmValid && agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-hidden">
      {/* Animated background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C1FF00]/5 rounded-full blur-[150px]"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left side - Brand info (visible on desktop) */}
            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">Join Kalimtu Today</h2>
                  <p className="text-[#A0A0B8] text-lg leading-relaxed">
                    Get early access to the AI transcription service built for Tunisian professionals.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      num: "01",
                      title: "Create Your Account",
                      desc: "Sign up with your email and secure password",
                    },
                    {
                      num: "02",
                      title: "Verify Your Email",
                      desc: "We'll send you a confirmation link",
                    },
                    {
                      num: "03",
                      title: "Start Transcribing",
                      desc: "Access Kalimtu's full suite of AI tools",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 8 }}
                      className="flex gap-4"
                    >
                      <div className="text-2xl font-bold text-[#C1FF00] flex-shrink-0">{step.num}</div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-[#A0A0B8]">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="mt-12 p-6 rounded-2xl border border-[#C1FF00]/20 bg-[#C1FF00]/5 backdrop-blur"
                >
                  <p className="text-sm italic text-[#A0A0B8] mb-2">
                    "Kalimtu changed how I manage transcripts. It's fast, accurate, and designed for my needs."
                  </p>
                  <p className="text-xs font-semibold text-[#C1FF00]">— Early Access User</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div variants={itemVariants} className="w-full">
              {/* Logo */}
              <motion.div variants={itemVariants} className="mb-12">
                <Link href="/" className="text-2xl font-bold text-white hover:text-[#C1FF00] transition-colors">
                  Kalimtu
                </Link>
              </motion.div>

              {/* Heading */}
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-5xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-[#A0A0B8] text-lg">
                  Get early access to Kalimtu's AI transcription service
                </p>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <motion.form onSubmit={handleSubmit} variants={containerVariants} className="space-y-6">
                {/* Full Name field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="fullname" className="block text-sm font-medium text-white mb-3">
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/20 transition-all duration-200"
                  />
                </motion.div>

                {/* Email field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-3">
                    Email Address
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/20 transition-all duration-200"
                    />
                    {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-5 h-5 text-[#C1FF00]" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* Password field */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-3">
                    Password
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0B8] hover:text-[#C1FF00] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </motion.div>

                  {/* Password strength indicator */}
                  <AnimatePresence>
                    {password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                              transition={{ duration: 0.3 }}
                              className={`h-full ${passwordStrength.color}`}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#A0A0B8]">
                            {passwordStrength.message}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B6B80]">
                          {password.length < 8
                            ? `${8 - password.length} more characters`
                            : "Strong password ✓"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm password */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="confirm" className="block text-sm font-medium text-white mb-3">
                    Confirm Password
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/40 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0B8] hover:text-[#C1FF00] transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </motion.div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-xs text-red-400 mt-2">Passwords don't match</p>
                  )}
                  {confirmPassword && confirmPassword === password && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 mt-2">
                      <Check className="w-4 h-4 text-[#C1FF00]" />
                      <p className="text-xs text-[#C1FF00]">Passwords match</p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Terms checkbox */}
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-[#C1FF00] checked:border-[#C1FF00] cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-[#A0A0B8] cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-[#C1FF00] hover:text-[#B8E600] underline">
                      Terms of Service
                    </a>
                  </label>
                </motion.div>

                {/* Submit button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={!isFormValid || loading}
                  whileHover={isFormValid && !loading ? { scale: 1.02 } : undefined}
                  whileTap={isFormValid && !loading ? { scale: 0.98 } : undefined}
                  className="w-full bg-[#C1FF00] hover:bg-[#B8E600] disabled:bg-[#6B6B80] text-slate-900 font-semibold py-3 rounded-xl cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? "Creating Account..." : "Create Account"}
                  </span>
                  {!loading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </motion.form>

              {/* Sign in link */}
              <motion.p variants={itemVariants} className="text-center text-[#A0A0B8] text-sm mt-8">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#C1FF00] hover:text-[#B8E600] font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </motion.p>

              {/* Back link */}
              <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href="/"
                  className="text-center block text-[#A0A0B8] hover:text-white text-sm transition-colors"
                >
                  ← Back to home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
