export const COLORS = {
  background: "#0A0A0F",
  backgroundSecondary: "#0F0F17",
  card: "#12121C",
  cardHover: "#1A1A2E",
  border: "#1E1E2E",
  borderHover: "#2D2D44",
  lime: "#C1FF00",
  limeDim: "#8FB800",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0B8",
  textMuted: "#6B6B80",
} as const;

export const TYPOGRAPHY = {
  fontDisplay: "'Sora', sans-serif",
  fontBody: "'Inter', sans-serif",
} as const;

export const ANIMATION = {
  staggerDelay: 0.08,
  entranceDuration: 0.6,
  hoverScale: 1.02,
  springConfig: { type: "spring" as const, stiffness: 300, damping: 25 },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
