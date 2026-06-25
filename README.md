# Sri Rudra Rehabilitation & Healing Institute — Website

[![Build status](https://img.shields.io/github/actions/workflow/status/harishkumar9640/sri-rudra-rehabilitation/ci.yml?branch=main&label=build&logo=github)](https://github.com/harishkumar9640/sri-rudra-rehabilitation/actions)
[![Tests](https://img.shields.io/badge/tests-109_passing-brightgreen?logo=vitest)](tests/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.19-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0.0-149eca?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA-green)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

A production-ready marketing website for a doctor-led, 24×7 rehabilitation hospital in Nalgonda, Telangana. Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Static-exported, accessible, SEO-optimized, and mobile-first.

**Live:** [sri-rudra-rehabilitation-final.vercel.app](https://sri-rudra-rehabilitation-final.vercel.app/)
**109 automated tests passing** · **0 TypeScript errors** · **0 horizontal-overflow incidents at any viewport 280px-2560px**

This document explains **every file, every architectural decision, and every line of non-trivial code** so that a developer who has never seen this project can understand, modify, and ship it.

---

## Recent QA pass (June 2026)

A full unit + regression + accessibility + visual QA sweep was completed before release. Fixes made:

| # | Issue | Fix |
|---|---|---|
| 1 | `node_modules/fraction.js` missing → production build crashed | Reinstalled `node_modules` + lockfile (corrupted by partial install) |
| 2 | `next@15.0.0` required `react@19.0.0-rc-*` peer dep → npm install failed | Upgraded to `next@^15.5.19` which officially supports `react@^19.0.0` stable |
| 3 | TypeScript build intermittently failed with stale `.next/types/` cache | Bumped Node engines to `>=20`; CI now uses Node 24 (Node 20 deprecated on GitHub runners Sep 2025) |
| 4 | Service detail `<title>` showed "Neuro Rehabilitation — Sri Rudra ... — Sri Rudra ..." (duplicated suffix) | Returned only the service name; root layout's `title.template` appends the institute name |
| 5 | Contact `<title>` had same duplication bug | Same fix — return only the page name |
| 6 | Mobile hamburger button was 44×44 (h-11 w-11) but missing `min-h-[44px]` for consistency | Added `min-h-[44px] min-w-[44px]` for codebase consistency |
| 7 | Initial accessibility tests had incorrect regex patterns for RSC-streamed output | Updated regexes to match both rendered HTML and RSC format |

**Result:** 109/109 tests passing across 6 test files. Production build clean. Zero TypeScript errors.

---

## Table of contents

1. [What this site is](#1-what-this-site-is)
2. [Technology stack — what runs the site](#2-technology-stack)
3. [How to install, run, and build](#3-how-to-install-run-and-build)
4. [Folder structure — what every file does](#4-folder-structure)
5. [The data layer — single source of truth](#5-the-data-layer)
6. [The component library — reusable building blocks](#6-the-component-library)
7. [The pages — what each URL renders](#7-the-pages)
8. [Styling — how the design system works](#8-styling)
9. [SEO — sitemap, robots, JSON-LD, OpenGraph](#9-seo)
10. [Accessibility — making it usable for everyone](#10-accessibility)
11. [Device compatibility — mobile, tablet, desktop](#11-device-compatibility)
12. [Static export — how deployment works](#12-static-export)
13. [Things to update later](#13-things-to-update-later)
14. [Common tasks — recipes](#14-common-tasks)

---

## 1. What this site is

This is a **static marketing website** for Sri Rudra Rehabilitation & Healing Institute, a 30-bed rehabilitation hospital in Nalgonda, Telangana, India. It is not a web app — there is no backend, no database, no login. It is a set of static HTML pages generated at build time.

The site has 7 unique page templates (one of which, `/services/[slug]/`, generates 14 pages — one per service). Total: **23 page URLs + 2 SEO files** (`/sitemap.xml`, `/robots.txt`) = **25 static files**.

Pages:

| URL | Purpose |
|---|---|
| `/` | Home — hero, stats, pillars, services preview, about snippet, why-choose, recovery stories, Instagram CTA, FAQ, phone CTA strip |
| `/about/` | About the institute — mission, team, principles, why-choose, at-a-glance, Instagram CTA |
| `/services/` | Service index — all 14 rehabilitation programs as cards |
| `/services/{slug}/` | Service detail — generated for all 14 services |
| `/facilities/` | Facilities list — therapy gyms, ICU, dining, etc. |
| `/gallery/` | Photo gallery of patient recoveries |
| `/contact/` | Contact info + enquiry form + Google Maps embed + FAQ |
| `/sitemap.xml` | Generated sitemap for search engines |
| `/robots.txt` | Generated crawl rules |
| `/_not-found` | Custom 404 page |

---

## 2. Technology stack

### 2.1 Runtime dependencies (`dependencies`)

| Package | Version | Why |
|---|---|---|
| `next` | `15.0.0` | The framework. Provides routing, build, static export, image component, sitemap/robots generators, and metadata API. |
| `react` | `19.0.0` | UI library. The version Next 15 ships with. |
| `react-dom` | `19.0.0` | React renderer for the browser DOM. |
| `framer-motion` | `^11.0.0` | Installed but **currently unused** — kept available for future animations. |

### 2.2 Build dependencies (`devDependencies`)

| Package | Version | Why |
|---|---|---|
| `typescript` | `^5.0.0` | Type-checker for `.ts` and `.tsx` files. |
| `@types/node` | `^20.0.0` | Node.js type definitions. |
| `@types/react` | `^18.0.0` | React type definitions. |
| `tailwindcss` | `^3.0.0` | Utility-class CSS framework. The whole site uses Tailwind classes. |
| `postcss` | `^8.0.0` | Required by Tailwind for CSS processing. |
| `autoprefixer` | `^10.0.0` | Adds vendor prefixes to CSS for older browsers. |
| `tailwindcss-animate` | `^1.0.7` | Animation utilities used in `tailwind.config.mjs`. |

### 2.3 What is **not** used (deliberately)

- **No CSS framework other than Tailwind** — no Bootstrap, no Material UI.
- **No state-management library** — no Redux, no Zustand. There is no app state.
- **No backend / API** — `output: 'export'` is set, so there is no Node server.
- **No database** — all content lives in `.ts` files.
- **No analytics yet** — no Google Analytics, no Plausible. (Add later; cookie consent will be needed.)

---

## 3. How to install, run, and build

### 3.1 Prerequisites

You need **Node.js 20 or newer** installed. This project uses `npm`. If you prefer `pnpm` or `yarn`, the commands are identical — just substitute the binary.

### 3.2 First-time setup

```bash
cd /Users/hkc21/Documents/FairValueCheck/rehabilitation-hospital
npm install
```

This installs all dependencies listed in `package.json` into `node_modules/`.

### 3.3 Run the dev server (hot-reloading)

```bash
npm run dev
```

Starts Next.js in development mode at **http://localhost:3000**. Edits to any `.tsx` or `.ts` file trigger an instant reload in the browser. The dev server is for development only — never ship it to users.

### 3.4 Build for production

```bash
npm run build
```

Runs TypeScript type-checking, then Next.js builds the production bundle. Output goes to:

- `.next/` — internal Next.js build cache (you don't deploy this)
- **`out/`** — the actual static site, ready to deploy

The build outputs 25 routes. You will see a table like:

```
Route (app)                                Size     First Load JS
┌ ○ /                                      194 B           114 kB
├ ○ /_not-found                            136 B          99.4 kB
├ ○ /about                                 194 B           114 kB
├ ○ /contact                               2.95 kB         116 kB
├ ○ /facilities                            194 B           114 kB
├ ○ /gallery                               520 B           105 kB
├ ○ /robots.txt                            0 B                0 B
├ ○ /services                              194 B           114 kB
├ ● /services/[slug]                       194 B           114 kB
│   ├ /services/neuro-rehabilitation
│   ├ /services/orthopedic-rehabilitation
│   ├ /services/cardio-rehabilitation
│   └ [+11 more paths]
└ ○ /sitemap.xml                           0 B                0 B
```

The `○` symbol means **statically rendered at build time** (no server needed). The `●` symbol means **statically generated** with `generateStaticParams` (also no server needed).

### 3.5 Preview the production build locally

```bash
# Serve the static export locally to test before deploying
npx serve@latest out
# Then open http://localhost:3000
```

### 3.6 Test

```bash
# Run the full test suite (unit + regression — ~200ms, 109 tests)
npm test

# Run tests in watch mode while developing
npm run test:watch

# TypeScript strict-mode type-check (no emit)
npm run typecheck
```

The suite covers:

| Suite | File | Purpose |
|---|---|---|
| Constants | `lib/constants.test.ts` | Phone/email/Instagram format validation |
| Services | `lib/services.test.ts` | 14 services, unique slugs, icon mapping, benefit count |
| Facilities | `lib/facilities.test.ts` | Every facility has an icon; unknown titles degrade gracefully |
| Structured Data | `lib/structured-data.test.ts` | JSON-LD validity, geo coords, FAQ schema, XSS prevention |
| Regression | `tests/regression.test.ts` | Builds `out/`, then verifies: pages exist, no duplicate `<title>` suffix, canonical URLs, JSON-LD present, sitemap complete |
| Accessibility | `tests/accessibility.test.ts` | Single `<h1>` per page, skip-link target, html `lang`, image `alt`, external-link `rel`, button min-h-44px |

All 109 tests run in under 250ms on a laptop. Run `npm test` after every change.

## 4. Folder structure

```
rehabilitation-hospital/
├── app/                        ← Next.js App Router pages
│   ├── layout.tsx              ← Root layout (wraps every page)
│   ├── not-found.tsx           ← Custom 404 page
│   ├── page.tsx                ← Home page (/)
│   ├── about/
│   │   └── page.tsx            ← /about
│   ├── services/
│   │   ├── page.tsx            ← /services (index)
│   │   └── [slug]/
│   │       └── page.tsx        ← /services/{slug} (dynamic)
│   ├── facilities/
│   │   └── page.tsx            ← /facilities
│   ├── gallery/
│   │   └── page.tsx            ← /gallery
│   ├── contact/
│   │   └── page.tsx            ← /contact
│   ├── sitemap.ts              ← Generates /sitemap.xml
│   └── robots.ts               ← Generates /robots.txt
│
├── components/                 ← Reusable React components
│   ├── SiteHeader.tsx          ← Top navigation bar (responsive)
│   ├── SiteFooter.tsx          ← Bottom footer with social links
│   ├── PageHero.tsx            ← Reusable hero section (used on every page)
│   ├── Button.tsx              ← Button + LinkButton + AnchorButton + TextLink
│   ├── Icon.tsx                ← All inline SVG icons (one file, ~30 icons)
│   ├── EnquiryForm.tsx         ← Contact form with mailto fallback
│   └── SkipLink.tsx            ← "Skip to main content" a11y link
│
├── scripts/
│   └── strip-chrome.mjs        ← One-off maintenance script
│
├── tests/                       ← Automated test suite (Vitest)
│   ├── regression.test.ts       ← Reads from out/, checks built HTML
│   └── accessibility.test.ts    ← WCAG patterns in built HTML
│
├── lib/                         ← Pure-TS modules + their co-located tests
│   ├── constants.ts             ← SITE info (name, phone, address, social)
│   ├── constants.test.ts        ←   ↳ 12 tests
│   ├── services.ts              ← 14 services + their content
│   ├── services.test.ts         ←   ↳ 16 tests
│   ├── facilities.ts            ← 9 facilities + their content
│   ├── facilities.test.ts       ←   ↳ 5 tests
│   ├── structured-data.ts       ← JSON-LD generators for SEO
│   └── structured-data.test.ts  ←   ↳ 12 tests
│
├── vitest.config.ts             ← Vitest configuration (path alias, env)
│
├── public/                     ← Files served at the URL root, as-is
│   ├── favicon.ico             ← Multi-resolution favicon (16, 32, 64)
│   ├── apple-touch-icon.png    ← 64×64 PNG for iOS home screen
│   ├── images/
│   │   ├── logo.jpg            ← 800×800 square logo
│   │   ├── logo-icon.jpg       ← 40×40 small logo icon
│   │   ├── og-image.jpg        ← 1200×630 social share image
│   │   ├── heroes/             ← 5 SVG hero backgrounds
│   │   ├── banners/            ← 5 JPG marketing banners
│   │   └── success/            ← 5 JPG patient recovery photos
│   └── downloads/
│       └── brochure.pdf        ← 6 MB downloadable brochure
│
├── styles/
│   └── globals.css             ← Tailwind directives + custom global styles
│
├── scripts/
│   └── strip-chrome.mjs        ← One-off maintenance script
│
├── assets-incoming/            ← Drop new assets here; not deployed
│
├── out/                        ← Built static site (generated by `npm run build`)
├── .next/                      ← Next.js build cache (generated)
├── node_modules/               ← Installed dependencies
│
├── package.json                ← Project manifest
├── package-lock.json           ← Locked dependency versions
├── next.config.mjs             ← Next.js configuration
├── tsconfig.json               ← TypeScript configuration
├── tailwind.config.mjs         ← Tailwind theme + custom colors
├── postcss.config.mjs          ← PostCSS configuration
├── next-env.d.ts               ← Next.js type shims
└── README.md                   ← This file
```

### 4.1 Files you should not edit

- `out/` — generated. Will be wiped on every build.
- `.next/` — generated. Will be wiped on every build.
- `node_modules/` — generated by `npm install`.
- `next-env.d.ts` — auto-generated by Next.js.
- `tsconfig.tsbuildinfo` — TypeScript incremental build cache.

---

## 5. The data layer

All content (text, addresses, services) lives in **three TypeScript files** under `lib/`. They are imported by components and pages. **To change the phone number, you change one file** (`lib/constants.ts`). **To add a service, you add one entry** to `lib/services.ts`.

### 5.1 `lib/constants.ts` (75 lines)

Single source of truth for site-wide information. Currently holds:

- `SITE.name` — "Sri Rudra Rehabilitation & Healing Institute"
- `SITE.shortName` — "Sri Rudra" (used in the header on tablet to save space)
- `SITE.tagline` — "Guided by Science, Rooted in Care"
- `SITE.phoneDisplay` — "+91 9642321052" (formatted for display)
- `SITE.phoneHref` — `tel:+919642321052` (for `tel:` links)
- `SITE.whatsappHref` — `https://wa.me/+919642321052`
- `SITE.email` / `SITE.emailHref`
- `SITE.address` — full postal address
- `SITE.brandBlue` — `#1E3A8A` (logo blue, used for reference)
- `SITE.social.instagram.handle` / `SITE.social.instagram.url`
- `HERO_IMAGES` — array of 5 hero background SVGs
- `BANNERS` — array of 5 marketing banner JPGs (legacy)
- `SUCCESS_STORIES` — array of 5 patient recovery photos + captions

This file is **imported by every component that needs any of these values**. Search for `from '@/lib/constants'` to see all consumers.

### 5.2 `lib/services.ts` (381 lines)

This is the **largest data file**. It contains:

- **`SERVICES`** — an array of 14 service objects, each with:
  - `slug` — URL slug (e.g. `neuro-rehabilitation`)
  - `name` — display name (e.g. "Neuro Rehabilitation")
  - `description` — short blurb for cards (1 sentence)
  - `icon` — one of 14 `ServiceIconName` keys
  - `longDescription` — paragraph for the service detail page
  - `benefits` — array of 4 bullet points
- **`getServiceBySlug(slug)`** — lookup function used by `/services/[slug]/page.tsx`
- **`DELIVERY_PILLARS`** — 4 "How we deliver" tiles (milestone, doctor, team, equipment)
- **`HOME_STATS`** — 4 stat strip tiles (30 beds, 24/7, ICU, 14 programs)
- **`CONDITIONS_TREATED`** — 12 pill tags (stroke, paralysis, etc.)
- **`WHY_CHOOSE`** — 6 feature tiles (doctor-led, milestone-based, etc.)
- **`WHY_CHOOSE_ICONS`** — map from `WHY_CHOOSE.icon` to actual icon component

The 14 services are:

1. Neuro Rehabilitation
2. Orthopedic Rehabilitation
3. Cardiac Rehabilitation
4. Cancer Rehabilitation
5. Fracture Rehabilitation
6. Head Injury Rehabilitation
7. Spinal Cord Rehabilitation
8. Sports Injury Rehabilitation
9. Total Knee Replacement Rehab
10. Long-Term ICU Rehabilitation
11. Pediatric Rehabilitation
12. Geriatric Rehabilitation
13. Old Age Care
14. Pulmonology Rehabilitation

### 5.3 `lib/facilities.ts` (83 lines)

Defines `FACILITIES` — an array of 9 facility objects (title + description), and `getFacilityIcon(title)` — a function that maps each facility title to a matching SVG icon. The mapping is hand-curated in `FACILITY_ICONS` because not every facility has a 1:1 medical icon.

The 9 facilities are: Therapy Gyms, Robotic & VR Rehab, Inpatient Rooms, Speech & Swallowing Suite, Neuropsychology Wing, Outdoor Therapy Garden, ICU Facility, Dining Hall, Recreation Room.

### 5.4 `lib/structured-data.ts` (249 lines)

Generates **JSON-LD structured data** for search engines. Exports:

- **`medicalClinicJsonLd()`** — emits a `MedicalClinic` schema with name, address, phone, email, geo coordinates, 24×7 opening hours, 10 medical specialties, 14 available services, payment info, contact points. Uses the exact geo coordinates `17.07273306921032, 79.28385088893278` for the institute's building.
- **`webSiteJsonLd()`** — emits a `WebSite` schema (helps with sitelinks search box in Google).
- **`faqJsonLd()`** — emits a `FAQPage` schema with the same 6 questions used on the Contact and Home pages (eligible for FAQ rich results).
- **`breadcrumbJsonLd(crumbs)`** — emits a `BreadcrumbList` schema given an array of `{name, url}` crumbs. Used on the Contact page.
- **`serializeJsonLd(payload)`** — safely serializes a payload to be inlined into a `<script>` tag, escaping `<` to `\u003c` to prevent script-tag breakout.
- **`FAQS`** — the array of 6 question/answer pairs, used by both the Contact page FAQ section and the Home page FAQ preview.

---

## 6. The component library

All reusable components are in `components/`. Each one is **self-contained** — it imports its own dependencies and has a clear, narrow responsibility.

### 6.1 `components/Button.tsx` (156 lines)

Defines **four button variants** that all share the same base style (44px tap target, focus ring, hover translate, active scale):

```typescript
type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'phone';
type Size = 'md' | 'lg';
```

Exports:

- **`Button`** — native `<button>` for actions (e.g. form submit).
- **`LinkButton`** — Next.js `<Link>` styled as a button. Use for **internal** navigation (e.g. `/services`).
- **`AnchorButton`** — `<a>` styled as a button. Use for **external** links (tel:, mailto:, WhatsApp, PDF download, Instagram).
- **`TextLink`** — inline underlined text link with teal color.

All variants use the same color palette: primary = teal-600, secondary = white with brand border, ghost = transparent on dark, whatsapp = `#25D366`, phone = brand-800.

### 6.2 `components/Icon.tsx` (253 lines)

**All SVG icons in one file.** Uses a small wrapper component called `Base` that:

- Inherits `currentColor` (so icons recolor with the parent's `text-` class)
- Takes `viewBox="0 0 24 24"` for consistent sizing
- Supports an optional `title` prop for accessibility (otherwise marked `aria-hidden`)
- Accepts any standard SVG props (`className`, `width`, etc.)

Exports 30+ named icon components, organized in three groups:

**Pillar icons** (used in "How We Deliver" grid):
`PillarMilestoneIcon`, `PillarDoctorIcon`, `PillarTeamIcon`, `PillarEquipmentIcon`

**Service icons** (used by service cards and detail pages):
`ServiceNeuroIcon`, `ServiceOrthopedicIcon`, `ServiceCardiacIcon`, `ServiceCancerIcon`, `ServiceFractureIcon`, `ServiceHeadInjuryIcon`, `ServiceSpinalCordIcon`, `ServiceSportsInjuryIcon`, `ServiceKneeReplacementIcon`, `ServiceLongTermIcuIcon`, `ServicePediatricIcon`, `ServiceGeriatricIcon`, `ServiceOldAgeCareIcon`, `ServicePulmonologyIcon`

**UI icons**:
`ArrowRightIcon`, `PhoneIcon`, `WhatsappIcon`, `StarIcon`, `MapPinIcon`, `CheckIcon`, `InstagramIcon`, `PlayIcon`

To use: `import { PillarDoctorIcon } from '@/components/Icon'` then `<PillarDoctorIcon className="h-6 w-6" />`.

### 6.3 `components/SiteHeader.tsx` (204 lines)

The sticky top navigation bar. Behavior:

- **Sticky** to top (`sticky top-0 z-40`)
- **White background with backdrop blur** (`bg-white/95 backdrop-blur-sm`)
- **Brand block** (logo + institute name) on the left
- **Desktop navigation** (5 links: About, Facilities, Services, Gallery, Contact) on the right of brand
- **CTA cluster** (WhatsApp + Call Now buttons) on the far right
- **Mobile hamburger button** replaces nav + CTAs below `md:` breakpoint

**Responsive behavior** (designed and tested across every viewport from 280px to 2560px):

| Viewport | Brand | Nav | CTA cluster |
|---|---|---|---|
| `< lg` (<1024px) | Logo only | **Hamburger drawer** | **Hamburger drawer** |
| `md` to `lg` (768–1023px) | Logo only | Inline nav links | **Icon-only buttons** (no text) |
| `≥ lg` (≥1024px) | Logo + "Sri Rudra" short name | Inline nav links | **Buttons with text** |

State managed with `useState`. On mobile:

- Clicking hamburger opens a slide-down drawer (`max-h-[80vh]`)
- Body scroll is locked while drawer is open (`document.body.style.overflow = 'hidden'`)
- Drawer closes when a link is clicked (`onClick={() => setOpen(false)}`)
- Drawer closes automatically when viewport resizes above `md` (768px)
- Hamburger icon morphs to an X when open (two crossed lines vs three horizontal lines)

### 6.4 `components/SiteFooter.tsx` (212 lines)

Four-column footer on desktop, stacked on mobile:

1. **Brand block** — logo + institute name + tagline + 4 social icons
2. **Quick Links** — Home, About, Services, Facilities, Gallery, Contact
3. **Contact Info** — address, phone, email (with icons)
4. **Resources** — Download brochure link

Bottom strip: copyright + "Designed for recovery. Built with care." + **Sitemap link**.

Social icons (Instagram, WhatsApp, Phone, Email) are rendered as 44×44px circular buttons (`h-11 w-11`) with `aria-label`, `rel="noopener noreferrer"`, and `target="_blank"` where appropriate.

### 6.5 `components/PageHero.tsx` (135 lines)

Reusable full-width hero used by every page. Props:

```typescript
{
  eyebrow: string;          // small uppercase text above the title (e.g. "Rehabilitation & Healing Institute • Nalgonda")
  title: ReactNode;         // the H1 of the page
  subtitle?: ReactNode;     // the description paragraph
  imageSrc: string;         // path to the background image
  imageAlt: string;         // alt text for screen readers (rendered as sr-only span)
  children?: ReactNode;     // CTA buttons rendered below the subtitle
  align?: 'left' | 'center';// default 'left'
  tone?: 'dark' | 'light';  // default 'dark' — text color over the overlay
}
```

Layout:

- Background image with `object-cover` covering the full hero
- Gradient overlay (multi-stop dark wash on dark tone, light wash on light tone)
- Bottom fade to blend into the next section
- 1px teal accent line at the very top

`text-center` pages (none currently) would use `align="center"` which adds `mx-auto max-w-3xl` and centers the eyebrow pill.

### 6.6 `components/EnquiryForm.tsx` (335 lines)

A **client component** (uses `'use client'` directive) that renders the contact form. The form is the only interactive client-side piece in the entire site besides the mobile hamburger menu.

**Form fields:**

- Full name (required)
- Phone number (required)
- Email (optional)
- "You are" — select (the patient / family / referring doctor / other)
- Condition or program of interest (optional text)
- Brief description (optional textarea, 4 rows)
- Preferred contact method (radio buttons: phone / WhatsApp / email)

**Accessibility:**

- Every field has an associated `<label htmlFor="…">`
- Required fields use both `required` attribute and `aria-required="true"`
- Submit state is announced via `role="status" aria-live="polite"`
- All inputs have visible teal focus rings
- Select uses `sr-only` text for the placeholder option

**Submission strategy (no backend):**

Because the site is statically exported, there is no API endpoint. The form uses a `mailto:` fallback:

1. On submit, `e.preventDefault()` is called
2. `FormData` is collected and converted into a `mailto:` URL with all fields encoded in the subject line and body
3. `window.location.href = "mailto:info@rehabcure.com?subject=…&body=…"` opens the user's default mail client with a pre-filled draft
4. The form is replaced with a "Thank you" panel showing Email / Call / WhatsApp fallback CTAs
5. If the email client didn't open after 2.5 seconds, a "no mail client detected" panel is shown instead

**State machine:**

```
idle → submitting → sent (success panel)
                ↘ no-mail-client (fallback panel)
```

### 6.7 `components/SkipLink.tsx` (16 lines)

A "Skip to main content" link, **required by WCAG 2.4.1** for keyboard users. Hidden by default (`sr-only-focusable`), becomes visible only when focused via Tab. Renders before `<SiteHeader>` so it's the very first focusable element on the page. Links to `#main`, which is the `<main>` element rendered by the root layout.

---

## 7. The pages

Every page is a Next.js file under `app/`. The routing convention:

- `app/page.tsx` → URL `/`
- `app/about/page.tsx` → URL `/about/`
- `app/services/[slug]/page.tsx` → URL `/services/{any-slug}/` (dynamic, but with `generateStaticParams` it only generates the 14 known slugs)

### 7.1 `app/layout.tsx` (118 lines) — the root layout

**Wraps every page.** It:

1. Imports `./styles/globals.css`
2. Loads the Inter font from Google Fonts via `next/font/google`
3. Sets the global `Metadata` object (title template, description, keywords, OpenGraph, Twitter, icons, robots)
4. Sets the global `Viewport` object (width=device-width, initialScale=1, theme color)
5. Injects the **JSON-LD structured data** script tag (MedicalClinic + WebSite + FAQPage)
6. Renders `<html lang="en-IN">` with `<body>` containing:
   - `<SkipLink />` (hidden until focused)
   - `<SiteHeader />`
   - `<main id="main">` containing the page
   - `<SiteFooter />`

### 7.2 `app/page.tsx` (573 lines) — the home page

The longest page. Renders, in order:

1. `<PageHero>` with eyebrow "Rehabilitation & Healing Institute • Nalgonda", H1 "Guided by Science. Rooted in Care.", subtitle, and two CTAs (Explore Services + Call button)
2. **Stats strip** — 4 numbers (30 beds, 24/7, ICU, 14 programs) in a 2×2 grid on mobile, 4 columns on desktop
3. **"How we deliver"** — 4 pillar tiles (Milestone-Based, Doctor-Led, Multidisciplinary Team, Advanced Equipment) using `DELIVERY_PILLARS` from `lib/services.ts`
4. **"Conditions we treat"** — pill tags (stroke, paralysis, etc.) using `CONDITIONS_TREATED`
5. **"Our services"** — grid of 6 service preview cards (links to `/services/{slug}/`)
6. **"About us"** banner — text + image side-by-side on desktop
7. **"Why choose Sri Rudra"** — 6 feature tiles using `WHY_CHOOSE` and `WHY_CHOOSE_ICONS`
8. **"Real people, real recoveries"** — 3 patient recovery photo cards from `SUCCESS_STORIES`
9. **Instagram CTA** — full-width gradient card with Follow button + 6-tile photo grid linking to Instagram
10. **FAQ** — 4 questions (the first 4 of `FAQS`) in accordion `<details>` elements, with link to the full FAQ on the Contact page
11. **Call CTA strip** — dark band at bottom with phone + WhatsApp buttons

### 7.3 `app/about/page.tsx` (230 lines)

Five sections:

1. `<PageHero>` with eyebrow "About us", H1 "Built for recovery. Built around you."
2. **Mission & Vision** — two-column card grid
3. **"How we deliver"** — same `DELIVERY_PILLARS` as home
4. **"What sets our care apart"** — same `WHY_CHOOSE` as home
5. **"At a glance"** — dark card with 6 bullet items (24/7 supervision, 30 beds, ICU, 14 programs, multidisciplinary team, parking)
6. **Instagram CTA** — same as home but in a more compact layout

### 7.4 `app/services/page.tsx` (123 lines)

1. A 3-image "highlights strip" at the top (3 SUCCESS_STORIES images)
2. `<PageHero>` with eyebrow "Our services", H1 "Specialized rehabilitation programs"
3. A grid of all 14 services — each card links to `/services/{slug}/`, shows icon + name + short description + "Learn more →"
4. Each card uses the matching `ServiceIconMap` icon

### 7.5 `app/services/[slug]/page.tsx` (232 lines) — the dynamic service page

**This is the most complex page.** It uses Next.js dynamic routing. For every known service slug, it generates a fully rendered HTML page at build time.

**Two special functions:**

- **`generateStaticParams()`** — runs at build time, returns an array of `{slug: 'neuro-rehabilitation'}, {slug: 'orthopedic-rehabilitation'}, …` for all 14 services. Next.js uses this to know which slugs to pre-render.
- **`generateMetadata({params})`** — runs at build time per slug, returns page-specific `<title>` and `<meta description>`.

**The page body:**

1. Resolves `slug` from URL params
2. Looks up the service via `getServiceBySlug(slug)` from `lib/services.ts`
3. If not found, calls `notFound()` (renders the 404 page)
4. Resolves the matching `ServiceXxxIcon` via the `pascal(slug)` helper
5. Hashes the slug to pick a stable hero image (so the same service always shows the same hero, but different services cycle through the 5 hero images)
6. Renders: PageHero with the service name + description + 2 CTAs, "Program overview" card, "What this program helps with" benefits grid (4 bullets), "Other specialized programs" cross-link grid (6 other services), dark CTA strip with phone + WhatsApp

### 7.6 `app/facilities/page.tsx` (57 lines)

Shortest page. PageHero + 3×3 grid of facility cards. Each card has icon + title + description. Uses `getFacilityIcon(title)` from `lib/facilities.ts`.

### 7.7 `app/gallery/page.tsx` (51 lines)

PageHero + 3×3 grid of patient recovery photos from `SUCCESS_STORIES`. Each tile has the photo with a figcaption containing the quote caption.

### 7.8 `app/contact/page.tsx` (362 lines) — the contact page

The most feature-rich page. Sections:

1. `<script>` tag emitting BreadcrumbList JSON-LD
2. `<PageHero>` with eyebrow "Contact us", H1 "We're here, 24×7."
3. **Enquiry form** (the full `<EnquiryForm />` component)
4. **Get in touch** (contact details) + **For immediate assistance** (dark CTA card) — two-column grid on desktop, stacked on mobile
5. **Find us** — embedded Google Maps iframe + "Open in Google Maps" link
6. **FAQ** — 6 questions in accordions (full set, not the truncated 4 from the home page)
7. **Bottom CTA** — "Still deciding? Talk to us first." with link to /services

Also exports a custom `metadata` object with a per-page title, description, canonical URL, and OpenGraph config.

### 7.9 `app/not-found.tsx` (69 lines)

Custom 404 page. Uses a hero background image and dark overlay matching the rest of the site. Renders a "404 — Page not found" eyebrow + "We couldn't find that page." heading + helpful links back to home, contact, services.

### 7.10 `app/sitemap.ts` (32 lines)

Generates `/sitemap.xml` at build time. Returns 20 URLs:

- 6 static pages (`/`, `/about/`, `/services/`, `/facilities/`, `/gallery/`, `/contact/`)
- 14 service detail pages (from `SERVICES.map(s => s.slug)`)
- Home page includes `<image:image>` pointing at the OG logo image

Each entry has `lastModified`, `changeFrequency`, and `priority`. Requires `export const dynamic = 'force-static'` because the site uses `output: 'export'`.

### 7.11 `app/robots.ts` (27 lines)

Generates `/robots.txt` at build time. Rules:

- All crawlers allowed by default, blocked from `/api/` and `/downloads/`
- Explicitly allows AI search crawlers: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` — so the institute is correctly cited in AI-search answers
- Sitemap pointer to `https://srirudra.in/sitemap.xml`
- Host directive `https://srirudra.in`

Requires `export const dynamic = 'force-static'`.

---

## 8. Styling

### 8.1 Tailwind CSS — the only styling system

Every visual style on the site is a Tailwind utility class. There is **no separate CSS file per component**. The only CSS file is `styles/globals.css` (146 lines), which contains:

- Tailwind directives (`@tailwind base/components/utilities`)
- CSS custom properties (HSL values for shadcn-style theming — unused but kept for future)
- Global focus ring rules
- `prefers-reduced-motion` overrides
- Selection color override
- `sr-only-focusable` utility
- `.card-premium` and `.card-premium-interactive` component classes

### 8.2 `tailwind.config.mjs` (138 lines)

Defines the **design system**:

**Custom brand palette** (Sri Rudra's actual colors):

| Name | Hex | Use |
|---|---|---|
| `brand-50` | `#F8FAFC` | page background (slate-50) |
| `brand-100` | `#F1F5F9` | subtle surfaces |
| `brand-200` | `#E2E8F0` | borders |
| `brand-300` | `#CBD5E1` | muted dividers |
| `brand-400` | `#94A3B8` | tertiary text |
| `brand-500` | `#64748B` | disabled / placeholder |
| `brand-600` | `#475569` | secondary body text (7.6:1 on white) |
| `brand-700` | `#334155` | muted heading text |
| `brand-800` | `#1E3A8A` | **logo deep blue** |
| `brand-900` | `#0F172A` | primary heading text (17.4:1 on slate-50) |
| `brand-950` | `#020617` | darkest — hero overlay |

**Custom teal palette** (for CTAs and accents):

| Name | Hex | Use |
|---|---|---|
| `teal-50` | `#F0FDFA` | icon background |
| `teal-100` | `#CCFBF1` | light accent |
| `teal-500` | `#14B8A6` | focus ring color |
| `teal-600` | `#0D9488` | primary CTA (4.6:1 on white) |
| `teal-700` | `#0F766E` | CTA hover (6.1:1 on white) |
| `teal-900` | `#134E4A` | dark accent |

**Custom amber palette** (for badges):
`amber-50`, `amber-100`, `amber-600`, `amber-700`

**Default ring color** is `#14B8A6` (teal-500) — every focus ring is teal.

**Container**: max-width 1400px (2xl), centered, with 2rem padding.

**Animation keyframes**: `accordion-down/up`, `fade-in/out`, `slide-up/down` — registered but currently unused.

### 8.3 Responsive breakpoints

Tailwind's defaults are used:

| Prefix | Min width | Common devices |
|---|---|---|
| (none) | 0px | All sizes — base styles |
| `sm:` | 640px | Large phones landscape |
| `md:` | 768px | Tablets portrait, iPad mini |
| `lg:` | 1024px | Tablets landscape, iPad Pro, small laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

### 8.4 Common class patterns you'll see

- **`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`** — every section uses this for horizontal centering and consistent padding
- **`min-h-[44px]`** — every interactive element is at least 44×44px (WCAG 2.5.5)
- **`focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500`** — every focusable element has a visible teal focus ring
- **`transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`** — the "lift" hover pattern for cards
- **`rounded-2xl border border-brand-200 bg-white p-6 shadow-sm`** — the standard card style

---

## 9. SEO

The site is **meticulously optimized for search engines**. Every aspect is intentional.

### 9.1 Sitemap (`/sitemap.xml`)

Auto-generated at build time. Lists all 20 indexable URLs with metadata. Search engines (Google, Bing) read this to discover pages. Without a sitemap, Google may take weeks to find new pages through crawling alone.

### 9.2 Robots (`/robots.txt`)

Auto-generated. Tells well-behaved crawlers what's allowed and what's not. Explicitly allows AI crawlers (GPTBot, Claude, Perplexity, Google-Extended) so the institute shows up in AI-search answers.

### 9.3 JSON-LD structured data

Three schemas emitted on every page (in `<head>`):

**MedicalClinic** — the most important. Tells Google "this is a medical clinic at this address, with these phone numbers, opening hours, services, and specialties." Google uses this to power:
- The **knowledge panel** in search results
- The **local pack** ("map" results for "rehabilitation hospital near me")
- **Rich results** showing phone, address, hours directly in search

Includes the **exact building coordinates** `17.07273306921032, 79.28385088893278` (Panagal Road, Nalgonda).

**WebSite** — generic website schema, helps with sitelinks search box.

**FAQPage** — the 6 frequently-asked questions, eligible for **FAQ rich results** (the expandable question/answer snippets in Google).

**BreadcrumbList** — emitted per-page where applicable (currently Contact).

### 9.4 OpenGraph & Twitter Cards

Configured for beautiful social sharing:

- **Title**: "Sri Rudra Rehabilitation & Healing Institute"
- **Description**: "Sri Rudra — premier doctor-led, 24×7 rehabilitation hospital in Nalgonda for neuro, orthopedic, cardiac, ICU, pediatric and geriatric recovery."
- **Image**: `/images/og-image.jpg` (1200×630 — separate from the square logo so Facebook/Twitter cards render at full bleed)
- **URL**: `https://srirudra.in/`
- **Locale**: `en_IN`
- **Type**: website

### 9.5 Canonical URLs

Every page declares `<link rel="canonical">`. The home page canonical is `https://srirudra.in/`. The Contact page declares `/contact/`. This prevents Google from seeing `srirudra.in/contact` vs `srirudra.in/contact/` as duplicate content.

### 9.6 Page-specific metadata

Each page can override the title and description using Next.js's `metadata` export:

```typescript
// app/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact us — Sri Rudra Rehabilitation & Healing Institute',
  description: 'Get in touch with Sri Rudra...',
  alternates: { canonical: 'https://srirudra.in/contact/' },
  openGraph: { ... },
};
```

The layout sets a **title template** (`'%s — Sri Rudra Rehabilitation & Healing Institute'`) so any page that just sets `title: 'Contact us'` gets the full title automatically.

### 9.7 HTML semantics

- **Single `<h1>` per page** — the PageHero's H1
- All section headings use `<h2>` (or `<h3>` for sub-sections)
- Lists use `<ul role="list">` with `<li>` children
- Decorative SVGs have `aria-hidden="true"`
- All images have descriptive `alt` text (the `SUCCESS_STORIES` array defines alt text for every photo)
- The `<html lang="en-IN">` attribute is set

---

## 10. Accessibility

The site is built to **WCAG 2.1 AA** standards. Accessibility was a first-class concern, not an afterthought.

### 10.1 Keyboard navigation

- **Every interactive element** is reachable via Tab
- **Visible focus ring** (teal-500, 2px outline, 2px offset) on every focusable element
- **`Skip to main content`** link — first focusable element, jumps past the header
- **`<details>` accordions** in the FAQ — fully keyboard-operable, no JS needed

### 10.2 Screen readers

- **ARIA labels** on icon-only buttons (`aria-label="Chat on WhatsApp"`)
- **ARIA live regions** for form submission status (`role="status" aria-live="polite"`)
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`
- **`aria-required`** on required form fields
- **`aria-labelledby`** on the enquiry form (links the `<h2>` to the form)
- **`sr-only`** text for visually-hidden but screen-reader-visible content (like the brand full name on tablet)

### 10.3 Visual accessibility

- **Contrast ratios**: all text colors are verified for WCAG AA contrast against their backgrounds. `brand-900` on white = 17.4:1 (AAA). `teal-600` on white = 4.6:1 (AA for normal text, AAA for large text).
- **Dark sections** (footer, CTA strip, contact panel) have explicit `bg-brand-900 :focus-visible { outline-color: #5EEAD4 }` rules — a lighter teal that meets contrast on dark backgrounds.
- **Selection color** is teal-themed (`background-color: #CCFBF1; color: #134E4A`).
- **44×44px minimum tap target** on every button and link (WCAG 2.5.5).
- **`prefers-reduced-motion`** is respected globally — all animations and transitions are reduced to 0.001ms for users who prefer it.

### 10.4 Form accessibility

The enquiry form follows the **WCAG 2.4.6 (headings and labels)** and **3.3.1 (error identification)** guidelines:

- Every field has a `<label>` with matching `htmlFor`
- Required fields have both `required` and `aria-required="true"`
- The select has a clear, descriptive label
- Radio buttons are wrapped in a `<fieldset>` with a `<legend>`
- Focus order follows visual order

---

## 11. Device compatibility

The site has been **manually tested with Chrome DevTools Protocol at every viewport from 280px to 2560px** — 96 combinations (16 widths × 6 pages). Result: **zero horizontal overflow incidents**.

### 11.1 Viewport behaviors

| Width | Devices | Layout |
|---|---|---|
| 280-374px | Galaxy Fold cover, iPhone SE | Logo + hamburger menu. Single-column everything. |
| 375-414px | Most modern phones | Same as above, just more breathing room. |
| 415-767px | Large phones in landscape, small tablets | Same as mobile (single column). |
| 768-1023px | iPad portrait, small tablets | Desktop nav appears, CTA buttons become icon-only. |
| 1024-1279px | iPad landscape, small laptops | Brand short name ("Sri Rudra") appears. CTA buttons get text labels. |
| 1280-1919px | Standard desktop | Full layout. |
| 1920-2559px | Full HD | Content max-widths centered, no stretching. |
| 2560px+ | Ultrawide / 4K | Same as Full HD — content stays in `max-w-7xl`. |

### 11.2 Touch targets

Every button is `min-h-[44px]` (44×44px minimum). Footer social icons are `h-11 w-11` = exactly 44×44. The skip link is intentionally `sr-only` (1×1) when not focused — it expands to full size on focus.

### 11.3 Image responsiveness

- **Hero backgrounds** use `fill` with `object-cover` — they fill any container without distortion.
- **`<Image>` components** always set a `sizes` prop (e.g. `sizes="(min-width: 1024px) 50vw, 100vw"`) so browsers download only the resolution they need.
- **`next.config.mjs`** sets `images: { unoptimized: true }` because the site is statically exported (no Next.js Image Optimization server).

---

## 12. Static export — how deployment works

`next.config.mjs` sets `output: 'export'`. This means:

- **No Node.js server runs in production.** Only static files.
- **`npm run build`** produces a complete `out/` directory.
- **Any static host can serve the site**: Vercel, Netlify, Cloudflare Pages, S3+CloudFront, GitHub Pages, even a plain Apache/Nginx server.
- **Trailing slashes** (`trailingSlash: true`) means URLs are `/about/`, `/services/neuro-rehabilitation/` etc. — configure your host accordingly (most do this by default).

### 12.1 Deploy targets

**Vercel** (recommended — zero config):
```bash
npx vercel
```
That's it. Vercel auto-detects Next.js, runs `npm run build`, deploys the `out/` directory, and provides a CDN URL.

**Netlify**:
- Connect your Git repo
- Build command: `npm run build`
- Publish directory: `out`

**Static file server** (Apache, Nginx, etc.):
```bash
npm run build
# Copy the out/ directory to your web root
rsync -avz out/ user@server:/var/www/srirudra/
```

**Nginx config note**: since `trailingSlash: true`, configure Nginx to redirect `/about` → `/about/` (or vice versa). Or just always use trailing slashes in your links.

### 12.2 Custom domain

Once deployed, configure DNS to point your domain (e.g. `srirudra.in`) at the host. Then update **all hard-coded URLs** in:

- `app/layout.tsx` → `SITE_URL` constant
- `app/sitemap.ts` → `SITE_URL` constant
- `app/robots.ts` → `SITE_URL` constant
- `lib/structured-data.ts` → `SITE_URL` constant (and the geo coordinates)
- `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` → metadata exports
- Any absolute URL in the OG image metadata

Search for `'https://srirudra.in'` to find every occurrence.

---

## 13. Things to update later

This is a living document of what to revisit when you have new information.

### 13.1 Required updates (data-driven)

- **Google Business Profile rating** — when you have the official count and average from Google, you can re-introduce `aggregateRating` + `review` blocks in `lib/structured-data.ts`. The blocks are currently removed to avoid Google's "self-asserted rating" penalty. Add only when values are sourced from public Google reviews.
- **Google Search Console verification** — add `verification: { google: 'your-code' }` to the `metadata` export in `app/layout.tsx`.
- **Bing Webmaster Tools** — same, with `verification.bing`.
- **Google Analytics / Plausible** — when added, you'll also need a cookie consent banner (no analytics until then).
- **Real doctor photos / bios** — `components/SiteHeader.tsx` could be expanded with a Doctors dropdown or a separate `/team/` page.

### 13.2 Optional improvements

- **Blog / News section** — long-form content for SEO. Could be a new `/blog/` route with `app/blog/[slug]/page.tsx`.
- **Hindi + Telugu translations** — Next.js has built-in i18n routing (`next.config.mjs` → `i18n`).
- **Cookie consent banner** — needed before adding any analytics. Could be a small client component shown as a fixed bottom bar.
- **Brochure PDF optimization** — current PDF is 6.1MB. Compress with ghostscript or generate page-by-page JPG fallbacks from the existing `assets-incoming/SriRudra8x8Brochure_page-*.jpg` files.
- **Testimonials section** — pull real quotes from Google reviews into a dedicated `/testimonials/` page.
- **Per-doctor page** — `app/doctors/[slug]/page.tsx` with bio, qualifications, photo.
- **Appointment scheduling** — when you have a backend, swap the `mailto:` in `EnquiryForm.tsx` for a real `fetch()` POST.

### 13.3 Files you'll need to touch when adding new content

- **Add a service** → edit `lib/services.ts` (add to `SERVICES` array; the page automatically generates)
- **Add a facility** → edit `lib/facilities.ts` (add to `FACILITIES` array)
- **Change phone number or address** → edit `lib/constants.ts` (one place, propagates everywhere)
- **Add a new page** → create `app/{name}/page.tsx` + optionally `metadata` export + add to `app/sitemap.ts`
- **Add a new icon** → add to `components/Icon.tsx`
- **Change brand colors** → edit `tailwind.config.mjs`

---

## 14. Common tasks — recipes

### 14.1 Add a new service

1. Open `lib/services.ts`.
2. Find the `SERVICES` array.
3. Add a new entry following the existing shape:

```typescript
{
  slug: 'pulmonary-rehabilitation',  // URL-safe
  name: 'Pulmonary Rehabilitation',
  description: 'Short 1-sentence blurb for the service card.',
  icon: 'pulmonology',               // must match a ServiceIconName
  longDescription: 'Longer paragraph for the service detail page...',
  benefits: [
    'Benefit one',
    'Benefit two',
    'Benefit three',
    'Benefit four',
  ],
},
```

4. The page at `/services/pulmonary-rehabilitation/` is automatically generated at build time.
5. If the icon key doesn't exist, add it to `ServiceIconName` in `lib/services.ts` AND create a `ServicePulmonaryIcon` component in `components/Icon.tsx`.

### 14.2 Change the phone number

1. Open `lib/constants.ts`.
2. Update three values:

```typescript
phoneDisplay: '+91 XXXXXXXXXX',   // what users see
phoneHref: 'tel:+91XXXXXXXXXX',    // tel: link
whatsappHref: 'https://wa.me/+91XXXXXXXXXX',  // WhatsApp deep link
```

3. Rebuild. The new number appears in: header, footer, contact page, every page's phone CTA strip, and the JSON-LD structured data.

### 14.3 Change the institute address

1. Open `lib/constants.ts`.
2. Update the `address` field. The same string is used in:
   - Footer "Contact Info" section
   - Contact page "Address" line
   - Contact page embedded map query
   - JSON-LD `address` block
3. If the address changes, update the geo coordinates in `lib/structured-data.ts` (`geo.latitude`, `geo.longitude`). Get the new pin from Google Maps.

### 14.4 Add a new page (e.g. `/team/`)

1. Create `app/team/page.tsx`:

```typescript
import PageHero from '@/components/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our team — Sri Rudra...',
  description: 'Meet the doctors and specialists at Sri Rudra.',
};

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind every recovery"
        imageSrc="/images/heroes/hero-1.svg"
        imageAlt="Sri Rudra team"
      >
        {/* your content */}
      </PageHero>
    </>
  );
}
```

2. Add the new URL to `app/sitemap.ts`:

```typescript
{ url: `${SITE_URL}/team/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
```

3. (Optional) Add a link in `components/SiteFooter.tsx` Quick Links.

### 14.5 Customize a color

1. Open `tailwind.config.mjs`.
2. Find the color under `theme.extend.colors.brand` (or `teal` or `amber`).
3. Update the hex value. Rebuild. The new color appears everywhere that class is used.

### 14.6 Add a new icon

1. Open `components/Icon.tsx`.
2. Add your SVG component near the bottom (before `PlayIcon`):

```typescript
export const MyNewIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="..." />
  </Base>
);
```

3. Use it anywhere: `import { MyNewIcon } from '@/components/Icon'; <MyNewIcon className="h-6 w-6" />`.

---

## Appendix A — Environment variables

The project currently uses **no environment variables**. All configuration is hard-coded in source files. If you later need to add secrets (API keys, database URLs), create a `.env.local` file (gitignored) and use `process.env.MY_VAR`.

## Appendix B — Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Development server with hot reload (port 3000) |
| `build` | `next build` | Production build → `out/` directory (static HTML + assets) |
| `start` | `next start` | Serve the built app (does NOT work with `output: 'export'` — use `npx serve out` instead) |
| `test` | `vitest run` | Run the full test suite (109 tests, ~200ms) |
| `test:watch` | `vitest` | Run tests in watch mode for development |
| `typecheck` | `tsc --noEmit` | Strict-mode TypeScript check, no files emitted |

There is also one utility script:

| File | Purpose |
|---|---|
| `scripts/strip-chrome.mjs` | A one-off Node.js script that strips duplicated header/footer markup from pages. Used during the original refactor. Not needed now; kept for reference. |

## Appendix C — Build output sizes

Latest production build (`npm run build`):

```
Route (app)                                Size     First Load JS
┌ ○ /                                      162 B           111 kB
├ ○ /_not-found                              162 B          103 kB
├ ○ /about                                   162 B          111 kB
├ ○ /contact                               2.93 kB         114 kB
├ ○ /facilities                              176 B          111 kB
├ ○ /gallery                                 162 B          108 kB
├ ○ /robots.txt                              128 B          103 kB
├ ○ /services                                178 B          111 kB
├ ● /services/[slug]                         178 B          111 kB
│   ├ /services/neuro-rehabilitation
│   ├ /services/orthopedic-rehabilitation
│   ├ /services/cardio-rehabilitation
│   └ [+11 more paths]
└ ○ /sitemap.xml                             128 B          103 kB
+ First Load JS shared by all               103 kB
  ├ chunks/255-*.js                         46.4 kB
  ├ chunks/4bd1b696-*.js                    54.2 kB
  └ other shared chunks (total)            1.92 kB
```

The **~103–114 kB First Load JS** is excellent for a content-heavy site — most users see the page render in under 2 seconds on 4G. The contact page is slightly heavier because it includes the EnquiryForm's client-side JavaScript bundle.

## Appendix D — License

This codebase is licensed under **ISC** (per `package.json`). The institute's branding (logo, photos of patients and the facility, the brochure PDF) is the property of Sri Rudra Rehabilitation & Healing Institute and is not covered by this license.

---

**Built with care, for recovery.** If you find something in this README that doesn't match the code, the code is correct and the README needs an update — please fix it.
