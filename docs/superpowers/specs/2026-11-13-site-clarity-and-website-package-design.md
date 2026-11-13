# Studio Sozo Messaging Clarity Overhaul & Standalone Website Package Design

**Date:** 2026-11-13
**Status:** Approved

## 1. Goal & Context

Studio Sozo's website (`studiosozo.dev`) currently obscures what the studio actually builds behind dense enterprise engineering jargon (*"operational bottlenecks," "idempotent retry queues," "RBAC OK," "per-seat SaaS tax,"* and UI-kit demo widgets on the homepage). At the same time, the site lacks any entry-level offering for business owners who simply need a fast, modern website built or updated.

This update accomplishes two goals across the entire site while keeping Studio Sozo's signature architectural aesthetic (`#0a2540` navy ink, `#635bff` electric indigo, `#e3e8ee` structural hairlines, `#f6f9fc` slate strips, and `//` monospace labels):

1. **Plain-English Mission & 4 Service Pillars:** Make it unmistakably clear within five seconds that **Studio Sozo designs and builds custom websites, web apps, and mobile apps for businesses—and clients own 100% of what we build with $0 monthly platform fees.**
2. **Standalone Website Build / Redesign Package (`$800 – $1,000`):** Introduce a prominent, clearly scoped 1–5 page custom website build or Wix/WordPress redesign tier (`$800 – $1,000`, `1 – 2 Weeks` turnaround) across the homepage, `/services`, `/pricing`, and `/contact` inquiry wizard (with one-click URL prefill).

---

## 2. Core Positioning & 4 Service Pillars

### 2.1 Sitewide Brand Copy (`lib/site.ts`)
- **`headline`:** `"Custom Websites & Apps Built for Your Business — Owned 100% by You."`
- **`description`:** `"Studio Sozo designs and builds custom business websites ($800–$1,000), web applications, mobile apps, and internal CRMs & automations—with 100% code ownership and $0 monthly platform fees."`
- **`shortDescription`:** `"Custom business websites, web applications & portals, iOS & Android mobile apps, and custom CRMs & AI automation."`
- **`ctas.primary`:** `{ text: "Start Your Project", url: "/contact" }`
- **`ctas.secondary`:** `{ text: "See Pricing ($800+)", url: "/pricing" }`

### 2.2 Streamlined 4-Pillar Services Architecture (`lib/site.ts` & `lib/services.ts`)
All primary navigation menus (`Navbar`, `Footer`), the Homepage `Features` grid, `/services`, `/locations`, and `/contact` Step 1 present **4 plain-English pillars** via `siteConfig.services` and `primaryServicesData`:

1. **`custom-websites` — Custom Websites & Redesigns**
   - **Summary:** `"Fast, modern 1–5 page business websites or Wix/WordPress redesigns built to bring in leads ($800–$1,000 in 1–2 weeks)."`
   - **Scope:** Mobile-first design, direct inbox lead/quote form, local Google SEO setup, fast edge hosting setup, and 100% code ownership (`$0/mo` platform fees).
2. **`web-applications` — Web Apps & Customer Portals**
   - **Summary:** `"Online booking, custom quoting, checkout flows, and client login portals tailored to how your business runs."`
3. **`mobile-app-development` — Mobile Apps (iOS & Android)**
   - **Summary:** `"iPhone and Android apps for your customers or field crews—complete with photos, push alerts, and live sync."`
4. **`crm-and-business-systems` — Custom CRMs & AI Automation**
   - **Summary:** `"Internal dashboards, lead-to-invoice tracking, Stripe/QuickBooks sync, and AI tools that cut manual busywork."`

### 2.3 SEO Route Preservation (`lib/services.ts` & `app/sitemap.ts`)
- `servicesData` retains all 7 `ServiceDetail` entries: the 4 primary pillars above (`custom-websites` added as `01`, plus plain-English updates to `web-applications`, `mobile-app-development`, and `crm-and-business-systems`) **plus** the 3 legacy SEO slugs (`custom-software-development`, `ai-and-automation`, `systems-integration`) rewritten in clearer language.
- `primaryServicesData` exports only the 4 core pillars for UI grids (`/services`, `/locations`, `/locations/[slug]`, and `ServiceDetailPage` cross-links) so visitors are never overwhelmed by 7 overlapping cards, while `generateStaticParams()`, `getServiceBySlug()`, `app/sitemap.ts`, and `/work` case-study tag lookups continue resolving every slug without 404s. Relevant web/brand case studies (`serene-commerce`, `hr-hvac`, `dash-lake-rentals`) also include `"custom-websites"` in their `serviceSlugs` for bidirectional cross-linking.

---

## 3. Shared Pricing Model (`lib/pricing.ts`)

Create a single source-of-truth module `lib/pricing.ts` consumed by both the new Homepage Pricing Spotlight and `/pricing`:

| Tier | Code | Name | Price | Timeline | CTA & Link |
| --- | --- | --- | --- | --- | --- |
| **01** | `TIER // 01 — STANDALONE WEBSITE` | **Website Build or Redesign** | **`$800 – $1,000`** (`One-time flat investment`) | `1 – 2 Weeks` | `"Start My Website ($800–$1k)"` → `/contact?package=website` |
| **02** | `TIER // 02 — AUTOMATION & SYNC` | **Workflow & Tool Automation** | **`Starting at $2,000`** (`Fixed-scope milestone build`) | `2 – 4 Weeks` | `"Automate a Workflow"` → `/contact?package=automation` |
| **03** *(Featured)* | `TIER // 03 — CUSTOM APP OR CRM` | **Web App, Mobile App or CRM** | **`$5,000 – $10,000`** (`Milestone-based build`) | `6 – 10 Weeks` | `"Scope Your Custom App"` → `/contact?package=app` |
| **04** | `TIER // 04 — FULL ECOSYSTEM` | **Multi-App Platform / Retainer** | **`Custom Scope`** (`Phased build or monthly partner`) | `10+ Weeks` | `"Discuss Custom Scope"` → `/contact?package=custom` |

**Tier 01 (`$800 – $1,000`) Deliverables Checklist:**
- Custom 1–5 page mobile-first website (new build or full Wix/WordPress/Squarespace refresh)
- Direct contact / quote request form wired straight to your email inbox
- Local Google SEO foundations (titles, metadata, sitemap, fast mobile speed)
- Custom domain & SSL launch setup with $0 monthly platform rent
- 100% code and design ownership from day one

---

## 4. Homepage Flow & Component Updates

Update `components/watermelon/templates/landing-01/demo.tsx` and its child sections:

1. **`Hero` (`landing/hero.tsx`)**
   - Eyebrow pill above H1: `// WEBSITES • WEB APPS • MOBILE APPS`
   - H1: `We Build Websites &` + rotating line (`Custom Apps.`, `Web Portals.`, `Mobile Apps.`, `Tools You Own.`)
   - Subheading: *"From $800–$1,000 business websites to full custom web apps, mobile apps, and CRMs. Built around your business—and owned 100% by you with $0 monthly platform fees."*
   - Proof pills under service-area strip: `Websites ($800–$1,000)`, `Custom Web & Mobile Apps`, `100% Owned • $0 Monthly Fees`
2. **`Stats` (`landing/stats.tsx`)**
   - Eyebrow: `// STRAIGHTFORWARD MISSION`
   - Heading: `Websites and software built to own — not rent`
   - Subheading: Plain-English explanation that whether you need a clean 5-page business website or a custom app to run daily operations, you pay once to build it and own it outright.
   - 4 Stat Cards (compatible with `CountingNumber` prefix/number/suffix parsing—update `CountingNumber` to render leading prefixes like `$` cleanly):
     - `$800` — `Website Builds Start At`
     - `100%` — `Client Code Ownership`
     - `$0` — `Monthly Platform Rent`
     - `4` — `Clear Service Pillars`
3. **`StudioSozoAdShowcase` (`components/studio-sozo-ad-showcase.tsx`)**
   - Retained as-is (already directly reinforces *"Ditch Wix, WordPress & Monthly Rent. Own It Outright."*).
4. **`Features` (`landing/features.tsx`)**
   - Eyebrow: `// WHAT WE BUILD` | Heading: `Four Clear Ways We Help Your Business`
   - Subheading: *"Need a sharp website in two weeks or a custom app built around your team? Pick what fits right now."*
   - Replace the 6-card asymmetric bento and all-caps jargon descriptions with a clean **2×2 grid** of the 4 core pillars (`siteConfig.services[0..3]`), using normal-case `font-sans` body copy, clear starting price/scope badges (e.g., `$800 – $1,000 • 1–2 WEEKS` on Custom Websites), and direct links to each service page.
5. **`HomepagePricingSpotlight` (`components/homepage-pricing-spotlight.tsx`) — Replaces `AnimatedBento`**
   - Removes `AnimatedBento` (which displayed abstract `KnobSlider` and `SelectAIAgent` UI-kit widgets) from `demo.tsx`.
   - Renders a high-clarity section with:
     - Featured left/top banner card for the **`$800 – $1,000` Standalone Website Build or Update** (who it's for, the 5 included items, `1–2 Weeks` badge, and primary `"Start My Website ($800–$1k)"` button linking to `/contact?package=website`).
     - Compact summary cards for **Workflow Automation (`$2k+`)**, **Custom Web/Mobile Apps & CRMs (`$5k–$10k`)**, and **Full Ecosystems (`Custom`)**, plus a `"Compare Full Pricing & ROI Calculator →"` link to `/pricing`.
6. **`TemplateBento` (`landing/template-bento.tsx`)**
   - Heading updated from `"Systems we've shipped"` to `"Websites & apps we've built"`, with plain-English subheading highlighting real business websites, booking platforms, mobile apps, and CRMs.
7. **`ComponentsBento` (`landing/component-bento.tsx`)**
   - Eyebrow: `// HOW IT WORKS` | Heading: `Simple process from idea to launch`
   - Rewrites the 4 step cards and visual micro-diagrams into plain, non-intimidating steps (`01 // Quick Call & Clear Quote`, `02 // Design & Clickable Preview`, `03 // Fast Build & Weekly Updates`, `04 // Launch & 100% Handover`), replacing `RBAC OK` and `14ms WEBHOOK` labels with plain-English status tags (`FIXED PRICE`, `LIVE PREVIEW`, `MOBILE + SEO`, `100% YOURS`).
8. **`Testimonial` (`landing/testimonial.tsx`) & `Navbar` / `Footer`**
   - Updates `Testimonial` marquee cards to cover straightforward website + app questions (including the `$800–$1,000` website turnaround, Wix/WordPress migration, and zero monthly fees).
   - Updates `Navbar` dropdown label from `// 06 CORE CAPABILITIES` to `// 04 CORE SERVICES` and adds a quick pricing callout link in the dropdown footer.
   - Updates `Footer` copy to plain English ("We design and build custom websites, web apps, and mobile apps...").

---

## 5. Inner Pages & Contact Inquiry Flow

### 5.1 `/pricing` (`app/pricing/page.tsx`)
- Updates `PageHeader` to welcome both local business website buyers (`$800–$1,000`) and custom app/CRM buyers (`$2,000+`).
- Renders all 4 tiers from `lib/pricing.ts` in a responsive 2×2 (`lg:grid-cols-2` or `xl:grid-cols-4`) layout, giving both **Tier 01 (`$800–$1,000` Website Build/Redesign)** and **Tier 03 (`$5,000–$10,000` Custom App/CRM)** clear visual prominence and deep-linked CTAs (`/contact?package=...`).
- Adds a dedicated FAQ item explaining what `$800–$1,000` covers vs. when a project becomes a `$2,000+` or `$5,000+` web application.

### 5.2 `/contact` Wizard, Schema & URL Prefill (`lib/inquiry-schema.ts`, `lib/inquiry-blueprint-data.ts`, `components/contact-inquiry-form.tsx`, `components/contact-string-hero-preview.tsx`, `app/contact/page.tsx`)
- **`softwareTypeOptions` (`lib/inquiry-schema.ts`):** Derived from the 4 `siteConfig.services` titles (`Custom Websites & Redesigns`, `Web Apps & Customer Portals`, `Mobile Apps (iOS & Android)`, `Custom CRMs & AI Automation`) plus `"Not Sure / Multiple Things"`.
- **`budgetRangeOptions` (`lib/inquiry-schema.ts`):**
  1. `"$800 – $1,000 (Website Build / Update)"`
  2. `"$2,000 – $5,000"`
  3. `"$5,000 – $10,000"`
  4. `"$10,000 – $25,000"`
  5. `"$25,000+ / Custom Scope"`
  6. `"Not sure yet — help me scope it"`
- **`CAPABILITY_BLUEPRINTS` & `WIZARD_STEPS` (`lib/inquiry-blueprint-data.ts`):**
  - Adds a dedicated `"Custom Websites & Redesigns"` blueprint (`WEB-SITE // 01`) with relatable prompt chips:
    - `"Build a brand-new 1–5 page business website"`
    - `"Redesign / replace our outdated Wix, WordPress, or Squarespace site"`
    - `"Add a clean quote / contact form & local Google SEO"`
    - `"Make our site load fast and look sharp on phones"`
  - Rewrites `WIZARD_STEPS` headlines/subtitles into plain English (*"What can we build for you?"*, *"Tell us a bit about your project"*, *"Budget, timeline & location"*, *"Where should Chandler send your quote & plan?"*).
- **URL Query Prefill (`ContactInquiryForm`):**
  - On client mount (`useEffect` reading `window.location.search` so Next.js 16 `cacheComponents` static shell prerendering remains unaffected), supports `?package=website|automation|app|custom` and `?service=<slug>`:
    - `package=website` (or `service=custom-websites`) sets `softwareType = "Custom Websites & Redesigns"`, `estimatedBudget = "$800 – $1,000 (Website Build / Update)"`, and advances `activeStep` to `"workflow"` (Step 2) so the user can immediately describe their website.
    - `package=automation` sets `softwareType = "Custom CRMs & AI Automation"` and `estimatedBudget = "$2,000 – $5,000"`.
    - `package=app` sets `softwareType = "Web Apps & Customer Portals"` and `estimatedBudget = "$5,000 – $10,000"`.
    - `package=custom` sets `softwareType = "Not Sure / Multiple Things"` and `estimatedBudget = "$25,000+ / Custom Scope"`.
    - Invalid or missing query params are safely ignored with zero errors.
- **Email & Terminal Preview Compatibility:**
  - `lib/inquiry-emails.ts` and `components/contact-string-hero-preview.tsx` resolve blueprints via `getCapabilityBlueprint(inquiry.softwareType)`; updating `getCapabilityBlueprint` fallback key to `"Custom Websites & Redesigns"` ensures all emails and live terminal previews work seamlessly for every new option.

### 5.3 `/services`, `/process`, and `/locations` Plain-English Alignment
- **`/services` (`app/services/page.tsx`):** Uses `primaryServicesData` (4 pillars in a 2×2 grid), plain-English header (*"Websites, Web Apps & Custom Software Built Around Your Business"*), and updated pain-point cards that include outdated/rented websites alongside spreadsheet/tool chaos.
- **`/process` (`app/process/page.tsx`):** Clarifies timelines for both **1–2 week Website Builds** and **4–10 week Custom App Builds** so `$800–$1,000` website buyers don't think a 5-page site takes 8 weeks of database modeling.
- **`/locations` & `/locations/[slug]` (`app/locations/page.tsx`, `app/locations/[slug]/page.tsx`, `lib/locations.ts`):** Renders `primaryServicesData` (4 cards in a 2×2 grid) and updates city page headlines from `"Custom Software, CRM & AI Automation in {City}"` to `"Custom Websites, Apps & Business Software in {City},"` so local business owners searching in Shreveport, Austin, Kansas City, etc. immediately see websites included.

---

## 6. Error Handling & Verification Criteria

1. **Zero Broken Routes or Links:** All 4 primary service slugs (`/services/custom-websites`, `/services/web-applications`, `/services/mobile-app-development`, `/services/crm-and-business-systems`) and all 3 preserved SEO slugs (`/services/custom-software-development`, `/services/ai-and-automation`, `/services/systems-integration`) statically generate and resolve cleanly.
2. **Type Safety & Exhaustive Switches:** All TypeScript unions (`WizardStepId`, `SoftwareCapabilityOption`) compile cleanly with `npx tsc --noEmit` and obey workspace rules (top-of-file imports only, exhaustive `never` checks in switches).
3. **Counting Stat Prefix Support:** `CountingNumber` in `stats.tsx` extracts optional leading prefixes (such as `$`) separately from trailing suffixes (`%`) so `$800` and `$0` animate cleanly as `$0` → `$800` rather than `800$`.
4. **Next.js 16 `cacheComponents` Build Verification:** `npm run lint` and `npm run build` succeed with zero errors or uncached-data warnings across every static and dynamic route.
