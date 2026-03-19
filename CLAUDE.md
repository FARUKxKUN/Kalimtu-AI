# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kalimtu** is a Next.js landing page for an AI transcription service targeting Tunisian professionals. It features a real-time waitlist system with email confirmations via Resend, Supabase PostgreSQL backend, and rate limiting on API endpoints.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

### High-Level Structure

```
src/
├── app/
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout with fonts, global styles
│   ├── globals.css        # Tailwind + custom CSS
│   └── api/
│       └── waitlist/      # POST: submit email | GET: fetch count
│           ├── route.ts   # API handler with validation, rate limit, email
│           └── error-handler.ts  # Centralized error responses
│
├── lib/
│   ├── repositories/      # Data access layer
│   │   └── waitlist.ts    # Encapsulates Supabase CRUD + count
│   │
│   ├── services/
│   │   └── email.ts       # Resend email sending (Waitlist confirmation)
│   │
│   ├── supabase.ts        # Supabase admin client init
│   ├── errors.ts          # ApiError class with typed codes
│   ├── logger.ts          # Structured logging (JSON in prod)
│   ├── rate-limit.ts      # IP-based rate limiting (5 req/min)
│   ├── types.ts           # Public TypeScript interfaces (API, UI)
│   ├── types/database.ts  # Database-specific types
│   ├── constants.ts       # Design tokens, email config, waitlist settings
│   └── utils.ts           # Shared utilities
│
└── components/
    ├── ui/                # Headless base components (Input, Button, Badge, Card)
    ├── shared/            # Page-layout components
    │   ├── header.tsx
    │   ├── footer.tsx
    │   └── waitlist-form.tsx  # Form with success state, live counter
    │
    └── sections/          # Feature sections (Hero, Pricing, HowItWorks, etc.)
```

### Data Flow: Waitlist Signup

1. **Frontend:** User submits email in `WaitlistForm`
2. **API Route** (`/api/waitlist` POST):
   - Validate email with Zod
   - Rate-limit by IP
   - Check if email already exists (repo.findByEmail)
   - Create new entry (repo.create → calculates position from count)
   - Send confirmation email (non-blocking, failure doesn't break signup)
   - Return `{ success: true, data: { email, position }, meta: { total: count } }`
3. **Frontend:** Show success state + live count (fetched from GET `/api/waitlist`)

### Repository Pattern

All data access is encapsulated in `src/lib/repositories/waitlist.ts`:

- **findByEmail(email)** → Returns entry or null
- **create(input)** → Inserts, calculates position from count, returns full entry
- **getCount()** → Returns total entries (used by GET endpoint and position calculation)
- **findAll()** → Returns all entries ordered by position

Result type: `{ success: true; data: T } | { success: false; error: ApiError }`

### Error Handling

Custom `ApiError` class in `src/lib/errors.ts`:
- Typed error codes (e.g., `VALIDATION_ERROR`, `DATABASE_ERROR`, `RATE_LIMIT_EXCEEDED`)
- Status code mapping (400, 409, 429, 500)
- Context logging for debugging
- Client-safe messages (no internal details leaked)

API routes use `handleError()` utility to transform errors into consistent JSON responses.

## Key Configuration

### Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

SUPABASE_SERVICE_ROLE_KEY=eyJ...        # For admin operations (waitlist CRUD)
RESEND_API_KEY=re_...                   # Resend transactional email service

EMAIL_FROM=onboarding@resend.dev        # From address (Resend test sender)
```

### Design Tokens

Colors and theme defined in `src/lib/constants.ts`:
- `COLORS`: Background, primary (`#C1FF00`), text shades
- `WAITLIST`: Rate limit (5 req/min), sources (hero, pricing, etc.)
- `EMAIL`: FROM address, subject line

These are also mirrored in Tailwind config and CSS variables for consistency.

### Rate Limiting

IP-based rate limiting in `/api/waitlist`:
- **Limit:** 5 requests per minute per IP
- **Implementation:** In-memory store (resets on server restart)
- **Production note:** Replace with Redis or Upstash for distributed deployments

## Testing & Quality

- **Linting:** ESLint (Next.js config)
- **Type checking:** TypeScript strict mode
- **Build validation:** `npm run build` ensures no type errors or build warnings

Current coverage: No test suite yet. When adding tests, follow the global `.claude/rules/testing.md` (80% minimum coverage, TDD workflow).

## Deployment

**Vercel** (configured):
- Auto-deploys from `main` branch
- Environment variables loaded from Vercel dashboard
- Function logs visible at `vercel.com/[project]/logs`
- Cold start optimized with edge functions for rate limiting (future improvement)

**Database migrations:**
- All Supabase migrations in `supabase/` directory
- RLS policies enforce service_role-only access to waitlist table
- Indexes on `email`, `position`, `created_at` for performance

## Important Notes

1. **Immutability**: All data transformations return new objects (e.g., `repo.create()` calculates position server-side, never mutates)
2. **Email is non-blocking**: If Resend fails, waitlist signup still succeeds (email is a nice-to-have)
3. **Position calculation**: Determined by count at signup time; not a database column (keeps table simple)
4. **Resend test sender**: `onboarding@resend.dev` is Resend's sandbox sender (no domain verification needed for testing)

## Common Development Tasks

### Adding a New Landing Page Section

1. Create component in `src/components/sections/[name].tsx`
2. Add to `src/app/page.tsx` in correct order
3. Use shared `Container`, `Badge`, and motion components
4. Follow existing Tailwind utility patterns

### Modifying Waitlist Behavior

1. **Email template:** Edit `buildWaitlistEmailHtml()` in `src/lib/email.ts`
2. **Rate limit:** Update `WAITLIST.MAX_REQUESTS_PER_MINUTE` in `src/lib/constants.ts`
3. **Validation:** Add Zod schema in `src/app/api/waitlist/route.ts`
4. **Database fields:** Add migration to `supabase/`, then update `WaitlistEntryDB` interface and repository methods

### Debugging API Issues

1. Check Vercel function logs: `vercel.com/[project]/logs`
2. Look for console.log output (email.ts, route.ts) and structured logs (logger.ts)
3. Test locally: `npm run dev` then `curl -X POST http://localhost:3000/api/waitlist -H "Content-Type: application/json" -d '{"email":"test@example.com","source":"test"}'`
4. Check rate limit store: In-memory, resets on server restart

## Next Steps for Enhancement

- Add test suite (Jest + React Testing Library) with 80%+ coverage
- Implement Redis rate limiting for production scaling
- Add email list management (unsubscribe links, list view)
- Set up CI/CD pipeline with GitHub Actions
