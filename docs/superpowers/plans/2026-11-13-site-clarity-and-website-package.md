# Studio Sozo Clarity Overhaul & $800–$1,000 Website Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Studio Sozo (`studiosozo.dev`) in straightforward, plain-English messaging around 4 clear pillars (`Custom Websites & Redesigns`, `Web Apps & Customer Portals`, `Mobile Apps (iOS & Android)`, `Custom CRMs & AI Automation`) and introduce a prominent **$800 – $1,000 Standalone Website Build / Update** tier across the homepage, `/pricing`, `/services`, and `/contact` wizard while keeping all existing SEO routes live.

**Architecture:** Centralize the 4 core service pillars in `lib/site.ts` and `lib/services.ts` (`primaryServicesData` for 4-card UI grids, `servicesData` retaining all 7 slugs for static route/sitemap continuity) and centralize the 4 investment tiers in `lib/pricing.ts`. Replace the homepage's abstract `AnimatedBento` UI-kit demo with a dedicated `HomepagePricingSpotlight` featuring the `$800–$1,000` website package, and enhance `ContactInquiryForm` with client-mount query-string prefill (`?package=website|automation|app|custom` and `?service=<slug>`) compatible with Next.js 16 `cacheComponents: true`.

**Tech Stack:** Next.js `16.4.2` (App Router, `cacheComponents: true`), React `19.3.0`, TypeScript `5`, Tailwind CSS v4, `motion/react`, `react-hook-form` + `zod`.

## Global Constraints

- **Next.js 16 `cacheComponents: true`:** Never call uncached dynamic APIs (like bare `useSearchParams()` outside `<Suspense>`) in prerendered shells. Read URL query parameters inside a client `useEffect` via `window.location.search`.
- **Workspace Rules:** Keep all `import` statements at the top of every module (no inline imports). Use exhaustive `never` checks in `default` branches of `switch` statements over discriminated unions or string literal unions.
- **Founder Identity:** Keep `siteConfig.founder.email` as `"chandler@studiosozo.dev"` and `siteConfig.url` as `"https://studiosozo.dev"`.
- **SEO Route Continuity:** Every existing slug in `/services/[slug]` (`custom-software-development`, `crm-and-business-systems`, `ai-and-automation`, `web-applications`, `mobile-app-development`, `systems-integration`) plus the new `custom-websites` slug must continue generating static pages in `app/services/[slug]/page.tsx` and `app/sitemap.ts`.
- **Visual System:** Preserve the Studio Sozo architectural aesthetic (`#0a2540` ink, `#635bff` electric indigo, `#e3e8ee` hairline borders, `#f6f9fc` slate backgrounds, corner crosshairs, and `MeshInk` accents) while switching service descriptions and body copy from all-caps developer jargon to readable plain English.

---

## File Structure

- **Create:** `lib/pricing.ts` — Single source of truth for the 4 pricing tiers (Tier 01 `$800 – $1,000` Website Build or Redesign through Tier 04 Custom Ecosystem), ownership comparison rows, and pricing FAQs.
- **Create:** `components/homepage-pricing-spotlight.tsx` — High-clarity homepage section spotlighting the `$800 – $1,000` Standalone Website Build/Update alongside Custom App & Automation tiers.
- **Modify:** `lib/site.ts` — Plain-English `headline`, `description`, `shortDescription`, `ctas`, and 4-pillar `services` array.
- **Modify:** `lib/services.ts` — Add `custom-websites` (`01`), refine the 3 other primary pillars in plain English, export `primaryServicesData` (4 items) alongside `servicesData` (all 7 items), and update `SERVICE_PAIN_DIAGNOSTICS`.
- **Modify:** `lib/case-studies.ts` — Add `"custom-websites"` to `serviceSlugs` on `hr-hvac`, `dash-lake-rentals`, and `serene-commerce`.
- **Modify:** `lib/inquiry-schema.ts` — Update `softwareTypeOptions` (4 pillars + `"Not Sure / Multiple Things"`) and prepend `"$800 – $1,000 (Website Build / Update)"` to `budgetRangeOptions`.
- **Modify:** `lib/inquiry-blueprint-data.ts` — Replace `CAPABILITY_BLUEPRINTS` keys to match the new `softwareTypeOptions` (with plain-English website & app prompt chips), update `getCapabilityBlueprint` fallback, and rewrite `WIZARD_STEPS` in plain English.
- **Modify:** `components/contact-inquiry-form.tsx` — Add `useEffect` URL prefill (`?package=website|automation|app|custom` and `?service=<slug>`), update `"Not Sure / Multiple Things"` full-width span check, and simplify field labels/placeholders.
- **Modify:** `components/contact-string-hero-preview.tsx` — Update default capability fallback and subhead text to plain English (`"Custom websites & apps built for 100% ownership..."`).
- **Modify:** `app/contact/page.tsx` — Update page H1/subheading and metadata to welcome both `$800–$1,000` website builds and custom app inquiries.
- **Modify:** `components/watermelon/templates/landing-01/demo.tsx` — Swap `AnimatedBento` for `HomepagePricingSpotlight`.
- **Modify:** `components/watermelon/templates/landing-01/landing/hero.tsx` — Plain-English headline (`We Build Websites &` + rotating words), subheading, and proof pills (`Websites ($800–$1,000)`, `Custom Web & Mobile Apps`, `100% Owned • $0 Monthly Fees`).
- **Modify:** `components/watermelon/templates/landing-01/landing/stats.tsx` — Prefix-aware `CountingNumber` (`$800`, `100%`, `$0`, `4`) and plain-English mission copy.
- **Modify:** `components/watermelon/templates/landing-01/landing/features.tsx` — Clean 2×2 grid of the 4 core pillars with readable normal-case descriptions and scope/price badges.
- **Modify:** `components/watermelon/templates/landing-01/landing/template-bento.tsx` — Update heading/subheading to `"Websites & apps we've built"`.
- **Modify:** `components/watermelon/templates/landing-01/landing/component-bento.tsx` — Plain-English 4-step process cards and clean status badges (`FIXED PRICE`, `LIVE PREVIEW`, `MOBILE + SEO`, `100% YOURS`).
- **Modify:** `components/watermelon/templates/landing-01/landing/testimonial.tsx` — Plain-English FAQ & ownership marquee cards including the `$800–$1,000` website package.
- **Modify:** `components/watermelon/templates/landing-01/landing/navbar.tsx` — Update dropdown eyebrow to `// 04 CORE SERVICES` and add `$800–$1,000` website pricing callout bar.
- **Modify:** `components/watermelon/templates/landing-01/landing/footer.tsx` — Plain-English brand summary in footer.
- **Modify:** `app/pricing/page.tsx` — Consume `lib/pricing.ts` and render all 4 tiers in a 2×2 grid with deep-linked CTAs (`/contact?package=...`).
- **Modify:** `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/process/page.tsx`, `app/locations/page.tsx`, `app/locations/[slug]/page.tsx`, `app/layout.tsx` — Use `primaryServicesData` for UI grids, clarify 1–2 week website timelines alongside 4–10 week app builds, and update headlines/metadata to highlight websites + apps.

---

### Task 1: Core Brand Config, Shared Pricing Model & 4-Pillar Services Data

**Files:**
- Modify: `lib/site.ts`
- Create: `lib/pricing.ts`
- Modify: `lib/services.ts`
- Modify: `lib/case-studies.ts`

**Interfaces:**
- Produces:
  - `siteConfig` (`lib/site.ts`) with 4-element `services` tuple (`custom-websites`, `web-applications`, `mobile-app-development`, `crm-and-business-systems`), each having `{ slug, title, badge, description }`.
  - `PRICING_TIERS`, `OWNERSHIP_VS_SAAS`, `PRICING_FAQS`, `PricingTier` (`lib/pricing.ts`).
  - `primaryServicesData: ServiceDetail[]` (4 primary pillars) and `servicesData: ServiceDetail[]` (all 7 routes) in `lib/services.ts`.

- [ ] **Step 1: Update `lib/site.ts` with plain-English mission, CTAs, and 4 core services**

Replace `lib/site.ts` with:

```ts
export const siteConfig = {
  name: "Studio Sozo",
  wordmark: "studio sozo.",
  legalName: "Sozo Tech Enterprise LLC",
  url: "https://studiosozo.dev",
  founder: {
    name: "Chandler King",
    role: "Founder & Principal Engineer",
    email: "chandler@studiosozo.dev",
    avatar: "/chandler-king.jpg",
  },
  headline: "Custom Websites & Apps Built for Your Business — Owned 100% by You.",
  description:
    "Studio Sozo designs and builds custom business websites ($800–$1,000), web applications, mobile apps, and internal CRMs & automations—with 100% code ownership and $0 monthly platform fees.",
  shortDescription:
    "Custom business websites, web applications & portals, iOS & Android mobile apps, and custom CRMs & AI automation.",
  ctas: {
    primary: {
      text: "Start Your Project",
      url: "/contact",
    },
    secondary: {
      text: "See Pricing ($800+)",
      url: "/pricing",
    },
  },
  navLinks: [
    { title: "Services", url: "/services" },
    { title: "Work", url: "/work" },
    { title: "Process", url: "/process" },
    { title: "Pricing", url: "/pricing" },
    { title: "Locations", url: "/locations" },
    { title: "Contact", url: "/contact" },
  ],
  services: [
    {
      slug: "custom-websites",
      title: "Custom Websites & Redesigns",
      badge: "$800 – $1,000 • 1–2 Weeks",
      description:
        "Fast, modern 1–5 page business websites or Wix/WordPress redesigns built to bring in leads—with $0 monthly platform fees.",
    },
    {
      slug: "web-applications",
      title: "Web Apps & Customer Portals",
      badge: "Booking • Portals • Checkout",
      description:
        "Online booking, custom quoting, checkout flows, and client login portals tailored to how your business runs.",
    },
    {
      slug: "mobile-app-development",
      title: "Mobile Apps (iOS & Android)",
      badge: "iPhone & Android",
      description:
        "Custom iPhone and Android apps for your customers or field crews—complete with photos, push alerts, and live sync.",
    },
    {
      slug: "crm-and-business-systems",
      title: "Custom CRMs & AI Automation",
      badge: "Internal Tools & Sync",
      description:
        "Internal dashboards, lead-to-invoice tracking, Stripe/QuickBooks sync, and AI tools that cut manual busywork.",
    },
  ],
} as const;
```

- [ ] **Step 2: Create `lib/pricing.ts` with the 4 transparent investment tiers**

Create `lib/pricing.ts`:

```ts
export interface PricingTier {
  id: "website" | "automation" | "app" | "custom";
  code: string;
  name: string;
  badge?: string;
  timeline: string;
  priceLabel: string;
  priceSubtext: string;
  featured: boolean;
  highlightAccent: boolean;
  idealFor: string;
  painPointSolved: string;
  includes: readonly string[];
  ctaText: string;
  ctaHref: string;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "website",
    code: "TIER // 01 — STANDALONE WEBSITE",
    name: "Website Build or Redesign",
    badge: "New • Fast Turnaround",
    timeline: "1 – 2 Weeks",
    priceLabel: "$800 – $1,000",
    priceSubtext: "One-time flat investment",
    featured: false,
    highlightAccent: true,
    idealFor:
      "Local businesses, service pros, and founders launching a brand-new website or replacing an outdated, slow Wix, WordPress, or Squarespace site.",
    painPointSolved:
      "Ditches clunky website builders and $30–$80/mo platform fees for a fast, modern site you actually own.",
    includes: [
      "Custom 1–5 page mobile-first website (new build or full redesign)",
      "Direct contact / quote request form wired straight to your inbox",
      "Local Google SEO setup (page titles, metadata, sitemap & fast load speed)",
      "Custom domain, SSL security & fast cloud hosting setup",
      "100% code and design ownership ($0 monthly platform rent)",
    ],
    ctaText: "Start My Website ($800–$1k)",
    ctaHref: "/contact?package=website",
  },
  {
    id: "automation",
    code: "TIER // 02 — AUTOMATION & SYNC",
    name: "Workflow & Tool Automation",
    timeline: "2 – 4 Weeks",
    priceLabel: "Starting at $2,000",
    priceSubtext: "Fixed-scope milestone build",
    featured: false,
    highlightAccent: false,
    idealFor:
      "Businesses losing hours every week copying data between forms, spreadsheets, calendars, QuickBooks, or Stripe.",
    painPointSolved:
      "Connects your existing tools so leads, invoices, and status updates happen automatically without double entry.",
    includes: [
      "Audit of your current tools & step-by-step automation plan",
      "Custom two-way sync across Stripe, QuickBooks, calendars & SMS/email",
      "AI document reading or instant 24/7 lead follow-up & routing",
      "Automatic error alerts so nothing ever falls through the cracks",
      "100% source code ownership & production launch",
    ],
    ctaText: "Automate a Workflow",
    ctaHref: "/contact?package=automation",
  },
  {
    id: "app",
    code: "TIER // 03 — CUSTOM APP OR CRM",
    name: "Web App, Mobile App or CRM",
    badge: "Most Popular for Growing Teams",
    timeline: "6 – 10 Weeks",
    priceLabel: "$5,000 – $10,000",
    priceSubtext: "Milestone-based fixed-scope build",
    featured: true,
    highlightAccent: true,
    idealFor:
      "Growing companies ready for a custom booking/checkout app, customer portal, iPhone/Android app, or internal CRM built around their exact workflow.",
    painPointSolved:
      "Replaces spreadsheets and expensive per-seat software with one fast app your business owns 100%.",
    includes: [
      "Interactive screen prototypes before full engineering begins",
      "Custom web app, client login portal, mobile app, or internal CRM",
      "Tailored views for admins, sales reps, field crews, and customers",
      "Built-in Stripe payments, SMS/email notifications & live reporting",
      "100% code, database & GitHub ownership ($0 per-user fees forever)",
    ],
    ctaText: "Scope Your Custom App",
    ctaHref: "/contact?package=app",
  },
  {
    id: "custom",
    code: "TIER // 04 — FULL ECOSYSTEM",
    name: "Multi-App Platform / Retainer",
    timeline: "10+ Weeks or Ongoing",
    priceLabel: "Custom Scope",
    priceSubtext: "Phased roadmap or monthly partner",
    featured: false,
    highlightAccent: false,
    idealFor:
      "Multi-location companies or founders launching a complete Web + iOS/Android product suite, multi-branch platform, or ongoing feature roadmap.",
    painPointSolved:
      "Gives you direct principal-engineer execution without the $300k+/yr overhead of hiring an in-house dev team.",
    includes: [
      "Unified Web Application + Native iOS & Android Mobile Apps",
      "Custom AI copilots, search, and multi-department workflows",
      "Multi-location permissions, audit history & executive reporting",
      "Apple App Store & Google Play Store submission and release setup",
      "Dedicated weekly build sprints and priority support",
    ],
    ctaText: "Discuss Custom Scope",
    ctaHref: "/contact?package=custom",
  },
] as const;

export const OWNERSHIP_VS_SAAS = [
  {
    dimension: "Website Builders (Wix / Squarespace / Agency Retainers)",
    rentedSaas: "$35–$150+/mo forever—stop paying and your website disappears",
    studioSozo: "$800–$1,000 one-time build—you own the code and asset outright",
  },
  {
    dimension: "Per-User / Per-Seat App Fees",
    rentedSaas: "$75–$250/user/mo forever—penalizes you every time you hire",
    studioSozo: "$0 per seat forever—add unlimited reps, techs, and customers",
  },
  {
    dimension: "How It Fits Your Business",
    rentedSaas: "Cookie-cutter templates that force workarounds and extra plugins",
    studioSozo: "Designed around your exact services, quoting, booking, and team",
  },
  {
    dimension: "Code & Data Ownership",
    rentedSaas: "Locked inside the vendor's platform—you can't take it with you",
    studioSozo: "100% yours in your own GitHub & cloud account from day one",
  },
] as const;

export const PRICING_FAQS = [
  {
    question: "What is included in the $800 – $1,000 standalone website package?",
    answer:
      "It covers a complete 1–5 page custom business website—either built from scratch or redesigned from an old Wix, WordPress, or Squarespace site. You get mobile-first design, a contact/quote form wired directly to your email, local Google SEO setup, domain/SSL launch setup, and 100% ownership in 1–2 weeks. When a project needs user logins, live database booking, or custom payment flows, it moves into our Web App tiers ($2,000+).",
  },
  {
    question: "How do payments work during a project?",
    answer:
      "We never ask for 100% upfront. Standalone websites ($800–$1,000) are split 50% to kick off and 50% at launch. Larger custom apps and automations are split across clear milestones—typically 30% at kickoff, 40% after you approve the live staging preview, and 30% at launch.",
  },
  {
    question: "Are there any monthly fees after launch?",
    answer:
      "Studio Sozo charges $0 in monthly licensing, platform, or per-user fees. Standard 1–5 page business websites can often run on free-tier modern cloud hosting (only paying ~$12–$20/year for your domain name). Larger web/mobile apps with databases typically run $25–$100/month paid directly to your own cloud providers (like Vercel or Supabase).",
  },
  {
    question: "Can you still make updates or add features for us later?",
    answer:
      "Yes. Every launch includes a post-launch support window at no extra charge to make sure everything runs smoothly. Anytime you want page updates, new features, or to expand your website into a full customer portal later, you can reach out for a flat quote or an optional monthly partnership.",
  },
];
```

- [ ] **Step 3: Add `custom-websites` and `primaryServicesData` in `lib/services.ts` and link case studies in `lib/case-studies.ts`**

In `lib/services.ts`:
1. Update `SERVICE_PAIN_DIAGNOSTICS` to plain English covering outdated websites + tool sprawl:
```ts
export const SERVICE_PAIN_DIAGNOSTICS = [
  {
    code: "PROBLEM // 01",
    bottleneck: "Outdated or Rented Websites",
    symptom:
      "Your current Wix, WordPress, or DIY site looks dated on phones, loads slowly, and charges monthly fees without bringing in steady leads.",
    solution:
      "A fast, custom-designed 1–5 page website ($800–$1,000) built to rank locally, capture leads, and belong 100% to your business.",
  },
  {
    code: "PROBLEM // 02",
    bottleneck: "Clunky Booking, Quoting & Customer Follow-Up",
    symptom:
      "Customers have to call or wait a day for a quote because your website can't take bookings, deposits, or status checks online.",
    solution:
      "Custom web apps and client portals where customers book, sign, pay, and check status in seconds from any device.",
  },
  {
    code: "PROBLEM // 03",
    bottleneck: "Spreadsheet Chaos & Double Data Entry",
    symptom:
      "Your team re-types the same customer and job details across emails, Google Sheets, scheduling apps, and QuickBooks.",
    solution:
      "One clean internal dashboard and automated tool sync that connects sales, field crews, and invoicing automatically.",
  },
  {
    code: "PROBLEM // 04",
    bottleneck: "Rising Per-User Software Bills",
    symptom:
      "Off-the-shelf CRMs and SaaS tools charge hundreds or thousands every month—and raise the bill every time you hire.",
    solution:
      "Custom software built once around your exact workflow, with $0 per-seat fees forever and 100% ownership.",
  },
] as const;
```
2. Prepend the new `"custom-websites"` `ServiceDetail` entry (`number: "01"`) to `servicesData`, update `"web-applications"` (`number: "02"`, `title: "Web Apps & Customer Portals"`), `"mobile-app-development"` (`number: "03"`, `title: "Mobile Apps (iOS & Android)"`), and `"crm-and-business-systems"` (`number: "04"`, `title: "Custom CRMs & AI Automation"`), keep `"custom-software-development"` (`number: "05"`), `"ai-and-automation"` (`number: "06"`), and `"systems-integration"` (`number: "07"`) in `servicesData` for SEO route continuity, and export:
```ts
export const PRIMARY_SERVICE_SLUGS = [
  "custom-websites",
  "web-applications",
  "mobile-app-development",
  "crm-and-business-systems",
] as const;

export const primaryServicesData: ServiceDetail[] = PRIMARY_SERVICE_SLUGS.map(
  (slug) => {
    const found = servicesData.find((s) => s.slug === slug);
    if (!found) {
      throw new Error(`Missing primary service slug: ${slug}`);
    }
    return found;
  },
);
```
3. In `lib/case-studies.ts`, include `"custom-websites"` in `serviceSlugs` for `hr-hvac`, `dash-lake-rentals`, and `serene-commerce`.

- [ ] **Step 4: Verify Task 1 types**

Run: `npx tsc --noEmit`
Expected: `lib/site.ts`, `lib/pricing.ts`, `lib/services.ts`, and `lib/case-studies.ts` compile cleanly (only downstream `lib/inquiry-blueprint-data.ts` will flag `SoftwareCapabilityOption` keys until Task 2 updates `CAPABILITY_BLUEPRINTS`).

---

### Task 2: Contact Inquiry Schema, Blueprints, Live Preview & URL Prefill

**Files:**
- Modify: `lib/inquiry-schema.ts`
- Modify: `lib/inquiry-blueprint-data.ts`
- Modify: `components/contact-inquiry-form.tsx`
- Modify: `components/contact-string-hero-preview.tsx`
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `siteConfig.services` from `lib/site.ts`.
- Produces: Updated `softwareTypeOptions`, `budgetRangeOptions`, `CAPABILITY_BLUEPRINTS`, `WIZARD_STEPS`, and query-prefilled `ContactInquiryForm`.

- [ ] **Step 1: Update `lib/inquiry-schema.ts` with `$800–$1,000` budget option and plain-English labels**

Update `softwareTypeOptions` and `budgetRangeOptions` in `lib/inquiry-schema.ts`:

```ts
export const softwareTypeOptions = [
  ...siteConfig.services.map((service) => service.title),
  "Not Sure / Multiple Things",
] as const;

export const budgetRangeOptions = [
  "$800 – $1,000 (Website Build / Update)",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+ / Custom Scope",
  "Not sure yet — help me scope it",
] as const;
```

- [ ] **Step 2: Update `lib/inquiry-blueprint-data.ts` to match the 5 `SoftwareCapabilityOption` variants and plain-English wizard copy**

Replace `CAPABILITY_BLUEPRINTS`, `getCapabilityBlueprint`, and `WIZARD_STEPS` in `lib/inquiry-blueprint-data.ts` so every `SoftwareCapabilityOption` (`"Custom Websites & Redesigns"`, `"Web Apps & Customer Portals"`, `"Mobile Apps (iOS & Android)"`, `"Custom CRMs & AI Automation"`, `"Not Sure / Multiple Things"`) has plain-English taglines, deliverable summaries, and prompt chips:
- `"Custom Websites & Redesigns"` (`WEB-SITE // 01`):
  - `shortTitle`: `"Custom Business Website"`
  - `tagline`: `"1–5 page custom website or Wix/WordPress redesign ($800–$1,000 in 1–2 weeks) with $0 monthly platform fees."`
  - `deliverableSummary`: `"1–5 page mobile-first custom website + direct lead form + local Google SEO + 100% code ownership"`
  - `promptChips`:
    - `"Build a brand-new 1–5 page business website"`
    - `"Redesign / replace our outdated Wix, WordPress, or Squarespace site"`
    - `"Add a clean quote / contact form & local Google SEO"`
    - `"Make our site load fast and look sharp on phones"`
- Update `getCapabilityBlueprint` default fallback to `CAPABILITY_BLUEPRINTS["Custom Websites & Redesigns"]`.
- Update `WIZARD_STEPS` headlines/subtitles:
  - `system`: `label: "What You Need"`, `headline: "What can we build or update for you?"`, `subtitle: "From $800–$1,000 business websites to full custom web & mobile apps."`
  - `workflow`: `label: "Project Details"`, `headline: "Tell us a little about your project"`, `subtitle: "Tap any quick-add goals below or write a couple sentences in your own words."`
  - `parameters`: `label: "Budget & Timeline"`, `headline: "What budget and timeline are you aiming for?"`, `subtitle: "Clear milestones, fast turnaround, and 100% ownership on every project."`
  - `dispatch`: `label: "Your Info"`, `headline: "Where should Chandler send your quote & plan?"`, `subtitle: "You work directly with the founder—no sales reps or middlemen."`

- [ ] **Step 3: Add `?package=` and `?service=` URL prefill and plain-English copy to `components/contact-inquiry-form.tsx`, `components/contact-string-hero-preview.tsx`, and `app/contact/page.tsx`**

In `components/contact-inquiry-form.tsx`:
- Add `useEffect` at top import (`import { useEffect, useState } from "react";`) and inside `ContactInquiryForm`, read `window.location.search` once on mount:
```ts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package")?.toLowerCase();
    const svc = params.get("service")?.toLowerCase();

    if (pkg === "website" || svc === "custom-websites") {
      setValue("softwareType", "Custom Websites & Redesigns", { shouldDirty: true });
      setValue("estimatedBudget", "$800 – $1,000 (Website Build / Update)", { shouldDirty: true });
      setActiveStep("workflow");
      return;
    }
    if (pkg === "automation" || svc === "ai-and-automation" || svc === "systems-integration") {
      setValue("softwareType", "Custom CRMs & AI Automation", { shouldDirty: true });
      setValue("estimatedBudget", "$2,000 – $5,000", { shouldDirty: true });
      setActiveStep("workflow");
      return;
    }
    if (pkg === "app" || svc === "web-applications") {
      setValue("softwareType", "Web Apps & Customer Portals", { shouldDirty: true });
      setValue("estimatedBudget", "$5,000 – $10,000", { shouldDirty: true });
      setActiveStep("workflow");
      return;
    }
    if (svc === "mobile-app-development") {
      setValue("softwareType", "Mobile Apps (iOS & Android)", { shouldDirty: true });
      setValue("estimatedBudget", "$5,000 – $10,000", { shouldDirty: true });
      setActiveStep("workflow");
      return;
    }
    if (svc === "crm-and-business-systems" || svc === "custom-software-development") {
      setValue("softwareType", "Custom CRMs & AI Automation", { shouldDirty: true });
      setValue("estimatedBudget", "$5,000 – $10,000", { shouldDirty: true });
      setActiveStep("workflow");
      return;
    }
    if (pkg === "custom") {
      setValue("softwareType", "Not Sure / Multiple Things", { shouldDirty: true });
      setValue("estimatedBudget", "$25,000+ / Custom Scope", { shouldDirty: true });
      setActiveStep("workflow");
    }
  }, [setValue]);
```
- Update full-width card condition in Step 1 (`option === "Not Sure / Multiple Things" && "sm:col-span-2"`) and Step 3 (`(option === "$800 – $1,000 (Website Build / Update)" || option === "Not sure yet — help me scope it") && "sm:col-span-2"`).
- Update `components/contact-string-hero-preview.tsx` fallback capability to `"Custom Websites & Redesigns"` and subhead to `"Custom websites & apps built for 100% ownership. Fill out the steps on the left."`.
- Update `app/contact/page.tsx` subheading to: *"Need an $800–$1,000 business website, a redesign of an outdated site, or a custom web/mobile app? Tell us what you want to build and get a clear quote directly from Chandler."*

- [ ] **Step 4: Run TypeScript check and commit Tasks 1 & 2**

Run: `npx tsc --noEmit`
Expected: `0` TypeScript errors across the entire repository.

```bash
git add lib/site.ts lib/pricing.ts lib/services.ts lib/case-studies.ts lib/inquiry-schema.ts lib/inquiry-blueprint-data.ts components/contact-inquiry-form.tsx components/contact-string-hero-preview.tsx app/contact/page.tsx
git commit -m 'feat(core): add 4 plain-English service pillars, $800-$1k website tier, and contact prefill'
```

---

### Task 3: Homepage Clarity Overhaul & `$800–$1,000` Pricing Spotlight

**Files:**
- Create: `components/homepage-pricing-spotlight.tsx`
- Modify: `components/watermelon/templates/landing-01/demo.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/hero.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/stats.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/features.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/template-bento.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/component-bento.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/testimonial.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/navbar.tsx`
- Modify: `components/watermelon/templates/landing-01/landing/footer.tsx`

**Interfaces:**
- Consumes: `siteConfig` (`lib/site.ts`), `PRICING_TIERS` (`lib/pricing.ts`).
- Produces: `HomepagePricingSpotlight` (`components/homepage-pricing-spotlight.tsx`) rendered on `/` in `demo.tsx`.

- [ ] **Step 1: Create `components/homepage-pricing-spotlight.tsx` and wire into `demo.tsx`**

Create `components/homepage-pricing-spotlight.tsx`:
- Renders a clean architectural section (`id="pricing"`, `#f6f9fc` background, hairline borders, corner crosshairs) with:
  - Eyebrow `// TRANSPARENT PRICING • NO MONTHLY PLATFORM FEES` and Heading `Start with an $800 website — or build a full custom app`.
  - Featured prominent card for **Tier 01 (`$800 – $1,000` Standalone Website Build or Redesign • `1 – 2 Weeks`)** displaying all 5 checklist items and primary `LitUpButton` `"Start My Website ($800–$1k)"` → `/contact?package=website`.
  - Clean 3-row right-hand stack summarizing **Tier 02 (`Starting at $2,000` Workflow & Tool Automation)**, **Tier 03 (`$5,000 – $10,000` Web App, Mobile App or CRM)**, and **Tier 04 (`Custom Scope` Multi-App Platform)**, each linking to its `/contact?package=...` route, plus a `"Compare Full Tiers & ROI Calculator →"` link to `/pricing`.
- In `components/watermelon/templates/landing-01/demo.tsx`, replace `AnimatedBento` with `HomepagePricingSpotlight`.

- [ ] **Step 2: Rewrite `hero.tsx`, `stats.tsx`, and `features.tsx` in plain English**

- **`hero.tsx`:**
  - Add top eyebrow `// WEBSITES • WEB APPS • MOBILE APPS`.
  - Update `ROTATING_WORDS` to `["Custom Apps.", "Web Portals.", "Mobile Apps.", "Tools You Own."]`.
  - Update H1 static line from `"Your Software"` to `"We Build Websites &"`.
  - Update subheading to: *"From $800–$1,000 business websites and redesigns to custom web apps, mobile apps, and CRMs. Built around your business—and owned 100% by you with $0 monthly platform fees."*
  - Update proof pills to `["Websites ($800–$1,000)", "Custom Web & Mobile Apps", "100% Owned • $0 Monthly Fees"]`.
- **`stats.tsx`:**
  - Update `CountingNumber` to parse optional prefix before digits (`const match = value.match(/^([^\d]*)(\d+)(.*)$/);`) so `$800` and `$0` render `$` in front of the animated digits.
  - Update `statsData` to `$800` (`Website Builds Start At`), `100%` (`Client Code Ownership`), `$0` (`Monthly Platform Fees`), and `4` (`Clear Service Pillars`).
  - Update section eyebrow/heading/subheading to plain English: `// OUR MISSION`, `Websites and apps built to own — not rent`, and *"Whether you need a clean 5-page website in two weeks or a custom application to run daily operations, you pay once to build it and own it outright."*
- **`features.tsx`:**
  - Update heading to `What Studio Sozo Builds` and subheading to *"Need a modern website refresh or a custom app built around your team? Here are the four things we build."*
  - Render `siteConfig.services` in a clean 2×2 grid (`grid-cols-1 md:grid-cols-2 gap-6`), showing each pillar's `badge` (`$800 – $1,000 • 1–2 Weeks`, etc.), normal-case `font-sans` description (remove `uppercase tracking-widest` on paragraph text), and visual preview component.

- [ ] **Step 3: Simplify `template-bento.tsx`, `component-bento.tsx`, `testimonial.tsx`, `navbar.tsx`, and `footer.tsx`**

- **`template-bento.tsx`:** Heading → `Websites & apps we've built`; subheading → *"Real business websites, online booking platforms, iOS & Android apps, and custom CRMs built by Studio Sozo."*
- **`component-bento.tsx`:** Eyebrow → `// SIMPLE 4-STEP PROCESS`; Heading → `How we take your project live`; rewrite the 4 cards and visual badges in plain English (`01 // Quick Call & Fixed Quote` → `FIXED PRICE`, `02 // Design & Live Preview` → `LIVE PREVIEW`, `03 // Fast Build & Weekly Check-Ins` → `MOBILE + SEO`, `04 // Launch & 100% Handover` → `100% YOURS`).
- **`testimonial.tsx`:** Update marquee cards to answer plain-English buyer questions (including `$800–$1,000` website turnaround, replacing Wix/WordPress, custom web/mobile apps, zero monthly fees, and regional service areas).
- **`navbar.tsx`:** Change `// 06 CORE CAPABILITIES` to `// 04 CORE SERVICES` and add a bottom callout strip inside the Services dropdown linking to `/contact?package=website` (`Need a website build or update? $800–$1,000 →`).
- **`footer.tsx`:** Update footer summary paragraph to *"We design and build custom websites, web apps, and mobile apps for growing businesses—with 100% ownership and $0 monthly platform fees."*

- [ ] **Step 4: Verify TypeScript and commit Task 3**

Run: `npx tsc --noEmit`
Expected: `0` errors.

```bash
git add components/homepage-pricing-spotlight.tsx components/watermelon/templates/landing-01/
git commit -m 'feat(home): clarify mission, streamline to 4 services, and spotlight $800-$1k website tier'
```

---

### Task 4: Inner Pages Alignment (`/pricing`, `/services`, `/process`, `/locations`) & Build Verification

**Files:**
- Modify: `app/pricing/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/process/page.tsx`
- Modify: `app/locations/page.tsx`
- Modify: `app/locations/[slug]/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `PRICING_TIERS`, `OWNERSHIP_VS_SAAS`, `PRICING_FAQS` (`lib/pricing.ts`), `primaryServicesData`, `servicesData` (`lib/services.ts`), `siteConfig` (`lib/site.ts`).
- Produces: Fully aligned inner routes passing `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

- [ ] **Step 1: Update `app/pricing/page.tsx` to render all 4 tiers from `lib/pricing.ts`**

- Import `PRICING_TIERS`, `OWNERSHIP_VS_SAAS`, and `PRICING_FAQS` from `@/lib/pricing`.
- Update `metadata` and `PageHeader` to highlight both **$800–$1,000 Website Builds & Redesigns** and **$2,000+ Custom Web/Mobile Apps & Automations**.
- Render `PRICING_TIERS` in a 2×2 grid (`grid-cols-1 gap-8 lg:grid-cols-2`), styling `tier.highlightAccent` / `tier.featured` badges cleanly and wiring each card's CTA button directly to `tier.ctaHref` (`/contact?package=...`).

- [ ] **Step 2: Update `/services`, `/services/[slug]`, `/process`, `/locations`, `/locations/[slug]`, and `app/layout.tsx`**

- **`app/services/page.tsx`:** Switch from `servicesData` to `primaryServicesData` for the 2×2 core services grid (`// 04 CORE SERVICES`), and rewrite `PageHeader` in plain English (*"Custom Websites, Web Apps & Software You Own Outright"*). Add a clear callout banner below the 4 pillars noting that standalone 1–5 page websites & redesigns start at **$800 – $1,000**.
- **`app/services/[slug]/page.tsx`:** Keep `generateStaticParams()` using `servicesData` (all 7 routes), and use `primaryServicesData.filter((s) => s.slug !== service.slug)` for the bottom `"Explore Other Services"` cards. For `"custom-websites"`, link the primary `PageHeader` CTA directly to `/contact?package=website` (`"Start My Website ($800–$1k)"`).
- **`app/process/page.tsx`:** Update `PageHeader` and the 4 phases so visitors immediately see both tracks: **1–2 weeks for $800–$1,000 Website Builds** and **4–10 weeks for Custom Web/Mobile Apps & CRMs**, removing dense Postgres/row-level-security jargon from top-level summaries.
- **`app/locations/page.tsx` & `app/locations/[slug]/page.tsx`:** Switch UI capability grids to `primaryServicesData` (`lg:grid-cols-2`) and update city `PageHeader` headlines from `"Custom Software, CRM & AI Automation in {city},"` to `"Custom Websites, Apps & Business Software in {city},"`.
- **`app/layout.tsx`:** Add `"custom website design"`, `"website redesign"`, and `"small business website development"` to root metadata `keywords`.

- [ ] **Step 3: Run full typecheck, lint, and production Next.js 16 build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected:
- `npx tsc --noEmit` exits `0`
- `npm run lint` exits `0`
- `npm run build` exits `0` and statically generates `/`, `/pricing`, `/services`, `/services/custom-websites` plus all 6 existing `/services/[slug]` pages, `/process`, `/locations`, `/locations/[slug]`, `/work`, `/work/[slug]`, and `/contact`.

- [ ] **Step 4: Commit Task 4**

```bash
git add app/pricing/page.tsx app/services/page.tsx app/services/\[slug\]/page.tsx app/process/page.tsx app/locations/page.tsx app/locations/\[slug\]/page.tsx app/layout.tsx
git commit -m 'feat(pages): align pricing, services, process, and location pages with 4-pillar messaging'
```
