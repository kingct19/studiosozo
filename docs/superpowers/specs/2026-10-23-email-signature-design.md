# Studio Sozo Email Signature & Workbench Design

**Date:** 2026-10-23
**Status:** Approved

## 1. Goal & Context

Create a professional, email-client-safe personal email signature for Chandler King (`Founder & Principal Engineer` at Studio Sozo) modeled directly after the Studio Sozo website's architectural design language (`#0a2540` deep navy ink, `#635bff` electric indigo, `#e3e8ee` structural hairline borders, `#f8fafc` technical slate strips, and `//` monospace labels).

Deliver the signature in two formats:
1. An unlisted interactive workbench page at `/email-signature` with one-click rich copy (`text/html` + `text/plain` clipboard support for Gmail, Apple Mail, Superhuman, and Outlook), raw HTML copy, live customization toggles, and a variant switcher.
2. A standalone, self-contained HTML file at `public/email-signature.html` that can be opened directly in any browser for quick viewing or copying.

## 2. Visual Variants

All variants pull default metadata from `siteConfig` (`lib/site.ts`) and use absolute production asset URLs (`https://studiosozo.dev/chandler-king.jpg` and PNG logos under `https://studiosozo.dev/brand/PNG/...`) so images render reliably in external email clients.

### Variant 1: Architectural Split Card (`architectural` — Default)
- **Structure:** Outer `<table>` with `max-width: 540px`, `border: 1px solid #e3e8ee`, and `#ffffff` background.
- **Top Section:** Two-column layout:
  - **Left Column:** `64×64` rounded headshot (`https://studiosozo.dev/chandler-king.jpg`, `border: 1px solid #e3e8ee`, `border-radius: 8px`) and compact Studio Sozo horizontal black PNG logo (`studio-sozo_primary-horizontal_black_transparent.png`, `height: 28px`).
  - **Right Column:**
    - Technical eyebrow: `// STUDIO SOZO` in `#635bff` monospace (`10px`, uppercase, `0.14em` tracking).
    - Name & Role: **Chandler King** (`16px` bold `#0a2540`) and `Founder & Principal Engineer` (`13px` `#425466`).
    - Contact Links: `chandler@studiosozo.com` and `studiosozo.dev` separated by a muted dot divider.
    - Optional phone number link if populated in workbench controls.
- **Bottom Technical Strip:** `#f8fafc` background with `border-top: 1px solid #e3e8ee`, containing:
  - Left: Green/Indigo status dot + `CUSTOM SOFTWARE • CRM SYSTEMS • AI AUTOMATION` in `10px` uppercase monospace (`#425466`).
  - Right: Compact `#635bff` action button (`Discuss Your Project →`) linking to `https://studiosozo.dev/contact`.

### Variant 2: Dark Blueprint Card (`blueprint`)
- **Structure:** Matches the dark architectural header aesthetic from `lib/inquiry-emails.ts`.
- **Top Section:** `#0a2540` dark navy table block featuring the `64×64` headshot, white horizontal logo (`studio-sozo_primary-horizontal_white_transparent.png`), `#a5b4fc` `// STUDIO SOZO` monospace badge, white name (`#ffffff`), slate role (`#cbd5e1`), and direct contact links.
- **Bottom Technical Strip:** Light `#f8fafc` strip with `1px solid #e3e8ee` border, monospace capability tagline (`CUSTOM SOFTWARE • CRM SYSTEMS • AI AUTOMATION`), and `#635bff` `Discuss Your Project →` CTA button.

### Variant 3: Minimalist Monospace Ledger (`minimal`)
- **Structure:** Compact, borderless layout accented by a `2px solid #635bff` left border rule (`max-width: 480px`), tailored for fast back-and-forth reply threads.
- **Content:** `48×48` avatar (optional), **Chandler King** • `Founder & Principal Engineer`, inline `chandler@studiosozo.com` • `studiosozo.dev` • `Discuss Your Project →`, and a subtle `// Custom Software • CRM Systems • AI Automation` monospace footer line.

## 3. Architecture & File Breakdown

- **`lib/email-signature.ts`**
  - Exports types: `SignatureVariant = "architectural" | "blueprint" | "minimal"`, `EmailSignatureOptions` (`variant`, `showHeadshot`, `phone`, `ctaText`, `ctaUrl`, `tagline`).
  - Exports `buildEmailSignature(options?: Partial<EmailSignatureOptions>): { html: string; text: string }`.
  - Uses strict HTML escaping and inline CSS with explicit `width`/`height` HTML attributes on all `<img>` tags so Outlook and Apple Mail never render oversized images.
- **`components/email-signature-workbench.tsx`**
  - Client component providing:
    - Variant selector tabs (`Architectural Card`, `Dark Blueprint`, `Minimal Ledger`).
    - Quick customization controls (toggle headshot on/off, optional phone number input, editable CTA label).
    - Mock email client preview frame with realistic email header and body text, plus a light/dark email body toggle to inspect contrast.
    - **Copy Signature (Rich Text)** button using `navigator.clipboard.write([new ClipboardItem({ "text/html": ..., "text/plain": ... })])` with a DOM Range `execCommand("copy")` fallback.
    - **Copy Raw HTML** and **Copy Plain Text** secondary actions.
    - Step-by-step installation instructions for Gmail, Apple Mail, and Superhuman.
- **`app/email-signature/page.tsx`**
  - Next.js App Router server page with `robots: { index: false, follow: false }` metadata, rendering the `PageHeader` and `EmailSignatureWorkbench`.
- **`public/email-signature.html`**
  - Standalone static HTML document containing the rendered default `architectural` signature table and a one-click copy toolbar so it works even when opened directly from the filesystem.

## 4. Verification Criteria

- All three variants produce valid, self-contained HTML `<table>` markup with zero external CSS dependencies.
- All `<img>` tags use absolute `https://studiosozo.dev/...` URLs and explicit `width` and `height` attributes.
- Rich-text copy places both `text/html` and `text/plain` onto the clipboard.
- TypeScript compilation (`npx tsc --noEmit`) and linting pass with zero errors.
