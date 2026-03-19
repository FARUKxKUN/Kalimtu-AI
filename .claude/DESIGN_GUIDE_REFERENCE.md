# Kalimtu Design Guide Reference

## Quick Color Reference

```css
/* Primary Brand */
--lime: #C1FF00;           /* Main CTA, accents, highlights */
--lime-dim: #8FB800;       /* Hover state, secondary */
--lime-glow: rgba(193, 255, 0, 0.15);        /* Subtle glow */
--lime-glow-strong: rgba(193, 255, 0, 0.3);  /* Strong glow */

/* Backgrounds */
--background: #0A0A0F;           /* Page background */
--background-secondary: #0F0F17; /* Subtle variation */
--card-bg: #12121C;              /* Card base */
--card-bg-hover: #1A1A2E;        /* Card hover state */

/* Text */
--text-primary: #FFFFFF;    /* Headlines, primary text */
--text-secondary: #A0A0B8;  /* Body text, descriptions */
--text-muted: #6B6B80;      /* Secondary labels, hints */

/* Borders & Dividers */
--border: #1E1E2E;          /* Subtle divider */
--border-hover: #2D2D44;    /* Active border */
```

---

## Typography Hierarchy

### Headlines (Space Grotesk, Bold)
```
H1: 56px (desktop), 36px (mobile) — Hero page titles
H2: 48px (desktop), 32px (mobile) — Section headers
H3: 32px (desktop), 24px (mobile) — Card titles
H4: 24px (desktop), 20px (mobile) — Sub-headers
```

### Body (DM Sans, Regular)
```
Large:    16px — Primary descriptions
Default:  14px — Secondary text
Small:    12px — Labels, captions
```

---

## Component Patterns

### Buttons

#### Primary CTA (Lime)
```jsx
<button className="bg-[#C1FF00] hover:bg-[#E8FF80] text-[#0A0A0F]
  px-6 py-3 rounded-lg font-semibold cursor-pointer
  transition-all duration-200 hover:shadow-lg">
  Join the Beta
</button>
```

#### Secondary (Indigo)
```jsx
<button className="bg-[#818CF8] hover:bg-[#A5B4FC] text-white
  px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200">
  Learn More
</button>
```

#### Ghost (Lime Border)
```jsx
<button className="border border-[#C1FF00] text-[#C1FF00]
  hover:bg-[#C1FF00]/10 px-6 py-3 rounded-lg
  transition-colors duration-200">
  Explore
</button>
```

---

### Cards

#### Standard Card
```jsx
<div className="p-8 rounded-2xl border border-[#2D2D44]
  bg-[#12121C]/50 backdrop-blur
  hover:border-[#C1FF00]/30 hover:bg-[#12121C]/80
  transition-all duration-300">
  {/* Content */}
</div>
```

#### Feature Card (Highlighted)
```jsx
<div className="p-8 rounded-2xl border border-[#C1FF00]/40
  bg-linear-to-br from-[#C1FF00]/5 to-transparent
  hover:border-[#C1FF00]/50 hover:shadow-lg
  hover:shadow-[#C1FF00]/20 transition-all duration-300">
  {/* Content */}
</div>
```

---

### Icons

#### Icon Container (24px)
```jsx
<div className="w-12 h-12 rounded-xl border flex items-center justify-center
  bg-[#1A1A2E] border-[#2D2D44] text-[#C1FF00]
  group-hover:scale-110 transition-transform duration-300">
  <IconComponent size={24} />
</div>
```

#### Large Icon Container (48px)
```jsx
<div className="w-14 h-14 rounded-xl
  bg-linear-to-br from-[#C1FF00]/10 to-[#C1FF00]/5
  border border-[#C1FF00]/20
  flex items-center justify-center
  group-hover:scale-110 group-hover:border-[#C1FF00]/40
  transition-all duration-300">
  <IconComponent size={28} className="text-[#C1FF00]" />
</div>
```

---

### Input Fields

```jsx
<input
  className="bg-[#12121C] border border-[#2D2D44] rounded-lg
  px-4 py-3 text-white placeholder-[#6B6B80]
  focus:border-[#C1FF00] focus:ring-1 focus:ring-[#C1FF00]
  transition-all duration-200"
  placeholder="Enter your email"
/>
```

---

## Animation Presets

### Quick entrance (UI elements)
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Staggered children
```jsx
variants={{
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}}
```

### Hover scale (cards)
```jsx
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
```

### Icon pulse
```jsx
animate={{
  scale: [1, 1.1, 1],
  opacity: [0.6, 1, 0.6],
}}
transition={{
  duration: 2.5,
  repeat: Infinity,
}}
```

---

## Layout Utilities

### Container (max-width 7xl)
```jsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Section padding
```jsx
/* Desktop: 80px top/bottom */
/* Tablet: 60px top/bottom */
/* Mobile: 40px top/bottom */
className="py-24 md:py-32 px-4"
```

### Grid patterns
```jsx
/* 1 column (mobile), 2 columns (tablet), 3 columns (desktop) */
className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"

/* 1 column (mobile), 2 columns (desktop) */
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

---

## Effects & Shadows

### Card glow (hover)
```jsx
hover:shadow-lg hover:shadow-[#C1FF00]/20
transition-shadow duration-300
```

### Text glow (Lime)
```css
text-shadow: 0 0 10px rgba(193, 255, 0, 0.4);
```

### Background glow
```jsx
<div className="w-96 h-96 bg-[#C1FF00]/5 blur-[140px]
  rounded-full pointer-events-none" />
```

---

## Accessibility Checklist

Every component must have:
- [ ] Focus ring visible: `focus:outline-2 outline-offset-2 outline-[#C1FF00]`
- [ ] Sufficient contrast: Text on lime must be dark, text on dark must be light
- [ ] Keyboard navigable: Tab order matches visual order
- [ ] ARIA labels: Icon-only buttons need `aria-label`
- [ ] Reduced motion: Respect `prefers-reduced-motion` in animations

---

## Responsive Breakpoints

```css
Mobile:   375px — Default styling
Tablet:   768px — md: prefix
Desktop: 1024px — lg: prefix
Large:   1440px — xl: prefix (if needed)
```

---

## Common Patterns

### Badge (label accent)
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2
  rounded-full bg-[#C1FF00]/10 border border-[#C1FF00]/30">
  <IconComponent size={14} className="text-[#C1FF00]" />
  <span className="text-xs font-semibold text-[#C1FF00]">
    Label Text
  </span>
</div>
```

### Section label (small caps)
```jsx
<p className="text-xs uppercase tracking-widest font-semibold
  text-[#C1FF00] mb-4">
  Section Label
</p>
```

### Gradient text (lime)
```jsx
<span className="text-gradient-lime">
  Text with gradient
</span>

/* CSS in globals.css */
.text-gradient-lime {
  background: linear-gradient(135deg, #C1FF00 0%, #E8FF80 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## When Building New Sections

1. **Start with the heading** — Use H2 (Space Grotesk, 700), lime gradient for key word
2. **Add a section label** — Uppercase, lime, tracked letter-spacing
3. **Grid the content** — Choose layout pattern (1col, 2col, 3col, table)
4. **Apply hover effects** — Border color, shadow, background shift
5. **Add animations** — Fade-up entrance, staggered items (50-100ms delay)
6. **Test accessibility** — Focus states, color contrast, keyboard nav
7. **Responsive check** — Works at 375px, 768px, 1024px, 1440px

---

## Color Application Rules

| Element | Color | Notes |
|---------|-------|-------|
| **Buttons (CTA)** | `#C1FF00` | Primary action |
| **Links** | `#C1FF00` | Hover: brighter |
| **Icons (interactive)** | `#C1FF00` | Hover: scale 1.1 |
| **Borders (hover)** | `#C1FF00/30` | Subtle glow |
| **Labels** | `#C1FF00` | Small caps, tracking |
| **Headlines (key words)** | Lime gradient | Emphasis only |
| **Body text** | `#A0A0B8` | Primary read |
| **Secondary text** | `#6B6B80` | Captions, hints |
| **Card backgrounds** | `#12121C` | Base card color |

---

## File Structure Reference

```
src/
├── components/
│   ├── ui/              # Base components (Button, Card, Badge, Input)
│   ├── shared/          # Layout (Header, Footer, Waitlist Form)
│   └── sections/        # Page sections (Hero, Features, Benefits, etc.)
│
├── lib/
│   ├── constants.ts     # Color tokens, design system values
│   ├── utils.ts         # Utility functions (cn for classnames)
│   └── types.ts         # TypeScript interfaces
│
└── app/
    ├── page.tsx         # Main landing page (imports all sections)
    ├── layout.tsx       # Root layout with fonts
    └── globals.css      # Global styles, animations, CSS variables
```

---

**Last Updated:** 2026-03-19
**Design System Version:** 1.0 (Kalimtu Master)
**Status:** Production Ready ✅
