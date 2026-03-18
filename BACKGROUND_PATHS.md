# BackgroundPaths Component

A customizable full-screen animated background component with floating lime accent paths, perfect for hero sections and landing pages.

## Features

- ✨ Animated SVG paths with lime (#C1FF00) color
- 🎯 Smooth letter-by-letter text entrance animations
- 🎨 Dark theme optimized for Kalimtu brand (#0A0A0F background)
- ♿ Accessible and responsive
- ⚙️ Fully customizable via props

## Usage

### Basic Example

```tsx
import { BackgroundPaths } from "@/components/ui/background-paths";

export function MyHero() {
  return (
    <BackgroundPaths
      title="Experience Tunisian Transcription"
      subtitle="Join hundreds of Tunisian professionals capturing every word, perfectly."
      cta="Join the Beta"
      onCtaClick={() => console.log("CTA clicked")}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Background Paths"` | Main heading text (splits by spaces) |
| `subtitle` | `string` | `""` | Optional subheading text |
| `cta` | `string` | `"Get Started"` | Call-to-action button text |
| `onCtaClick` | `() => void` | `() => {}` | Callback function when CTA is clicked |

## Customization

### Colors

The component uses Kalimtu's color palette:
- **Primary**: `#C1FF00` (lime accent)
- **Background**: `#0A0A0F` (dark)
- **Text**: `#FFFFFF` (white)
- **Muted**: `#A0A0B8` (gray-blue)

To customize, edit the color values in `background-paths.tsx`:
- Line 12: `stroke="#C1FF00"` — Change SVG path color
- Line 57: `bg-[#0A0A0F]` — Change background
- Line 73: `text-[#C1FF00]` — Change button text color

### Animation Timing

Adjust animation speeds in `FloatingPaths()`:
- Line 24: `duration: 20 + Math.random() * 10` — SVG path animation duration
- Line 48: `transition={{ delay: 0.6, duration: 0.8 }}` — Text entrance timing

## Placement in App

Good places to use this component:
- Hero/banner section at top of landing page
- Full-page CTA section
- Product launch announcement page
- Demo/showcase section

## Demo

See `src/components/sections/background-demo.tsx` for a complete example implementation.

## Notes

- Component requires `framer-motion` (already installed)
- Uses Next.js 16+ with TypeScript
- Responsive on mobile, tablet, and desktop
- Dark mode optimized (light mode not supported)
