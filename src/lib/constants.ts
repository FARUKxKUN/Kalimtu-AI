// Design tokens — shared between Tailwind config and components
export const COLORS = {
  background: "#0A0A0F",
  card: "#1A1A2E",
  primary: "#C1FF00",
  textPrimary: "#FFFFFF",
  textMuted: "#9CA3AF",
  border: "#2D3748",
} as const;

// Waitlist config
export const WAITLIST = {
  TABLE_NAME: "waitlist",
  MAX_REQUESTS_PER_MINUTE: 5,
  RATE_LIMIT_WINDOW_MS: 60_000,
  SOURCES: {
    HERO: "hero",
    WAITLIST_SECTION: "waitlist-section",
    FINAL_CTA: "final-cta",
    PRICING: "pricing",
  },
} as const;

// Email config
export const EMAIL = {
  FROM: process.env.EMAIL_FROM || "onboarding@resend.dev",
  SUBJECT: "Welcome to the Kalimtu waitlist!",
} as const;
