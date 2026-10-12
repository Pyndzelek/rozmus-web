# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Filip Rozmus, a personal trainer in Nowy Targ (https://filiprozmus.pl). All user-facing content, form validation messages, and many code comments are in **Polish** — keep new copy in Polish.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build; `postbuild` runs `next-sitemap`, which regenerates `public/sitemap*.xml` and `public/robots.txt` (these generated files are committed)
- `npm run lint` — ESLint via `next lint`

There is no test suite.

## Stack

Next.js 14 App Router (React 18), TypeScript, Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config`), shadcn/ui (new-york style, components in `src/components/ui`), framer-motion, react-hook-form + zod, Resend + react-email. Deployed on Vercel (`@vercel/analytics`). Path alias `@/*` → `src/*`.

## Architecture

- **Routes** (`src/app/`): `/` (home), `/oferta`, `/o-mnie`, `/opinie`, `/kontakt`, `/formularz`. Page-specific sections live in `src/components/<route>/` with a `-<route>` filename suffix (e.g. `oferta/Pricing-oferta.tsx`); home-page sections sit directly in `src/components/`.
- **Root layout** (`src/app/layout.tsx`) holds site-wide SEO: `metadata` (OpenGraph/Twitter) and the `LocalBusiness` JSON-LD script. Update business details (address, phone, hours) there.
- **Server actions** (`src/lib/*-actions.ts`, `"use server"`) handle all form submissions and send email via Resend using templates in `src/components/emails/`:
  - `contact-actions.ts` — contact form; sanitizes input, zod-validates, keyword spam filter, in-memory rate limit (`src/lib/ratelimit.ts` — per-instance only, not shared across serverless invocations).
  - `formularz-actions.ts` — client survey; sends admin notification + user confirmation. reCAPTCHA verification is intentionally commented out.
  - `calculator-actions.ts` — calorie calculator; defines its own zod schema inline and emails both user and admin.
  - Shared zod schemas/types for contact and survey forms are in `src/lib/schemas.ts`.
- **Price list** (`src/lib/plans.ts`): single source for `/oferta` cards and its Service JSON-LD, the `priceRange` in the root layout, and prices quoted in `faq-section.tsx` (looked up by plan `id`, so keep ids stable).
- **Offer → survey flow**: plans with a `surveyDescription` link to `/formularz?plan=<id>`, and `survey-form.tsx` shows that plan's name and description via `getPlan`. The other plans link to `/kontakt?plan=<name>`, which prefills the contact form subject.

## Environment

`.env.local` needs `RESEND_API_KEY`, `ADMIN_EMAIL` (recipient of notifications), `NEXT_PUBLIC_GA_TRACKING_ID` (Google Analytics, see `src/components/GoogleAnaltics.tsx`), and optionally `GOOGLE_PLACES_API_KEY` (Places API (New); without it the Google reviews section on `/opinie` is not rendered — see `src/lib/google-reviews.ts`). Google Business Profile IDs/links live in `src/lib/google-business.ts`.
