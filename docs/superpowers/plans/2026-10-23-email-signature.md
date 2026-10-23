# Studio Sozo Email Signature & Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Studio Sozo personal email signature generator with three architectural variants (`architectural`, `blueprint`, `minimal`), an interactive `/email-signature` workbench page with one-click rich-text copy for Gmail/Apple Mail/Superhuman, and a standalone `public/email-signature.html` file.

**Architecture:** A pure TypeScript module (`lib/email-signature.ts`) constructs email-client-safe `<table>` HTML and plain-text signatures from `siteConfig`. A client workbench component (`components/email-signature-workbench.tsx`) mounted on an unlisted Next.js route (`app/email-signature/page.tsx`) lets the founder preview variants in light/dark email frames, customize fields, and copy rich HTML (`ClipboardItem` with `text/html` and `text/plain`) or raw HTML. A standalone static HTML file (`public/email-signature.html`) provides direct file-based access.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `hugeicons-react`.

## Global Constraints

- Use top-level imports only (no inline imports).
- Use exhaustive `switch` statements with a `never` check in the `default` branch when switching on `SignatureVariant`.
- Email signature HTML must use `role="presentation"` tables, inline styles, system/monospace font stacks, and explicit `width` and `height` HTML attributes on all `<img>` elements.
- Do not index `/email-signature` in search engines (`robots: { index: false, follow: false }`).

---

### Task 1: Email Signature HTML & Plain-Text Generator (`lib/email-signature.ts`)

**Files:**
- Create: `lib/email-signature.ts`

**Interfaces:**
- Consumes: `siteConfig` from `@/lib/site`
- Produces:
  - `export type SignatureVariant = "architectural" | "blueprint" | "minimal"`
  - `export interface EmailSignatureOptions`
  - `export const DEFAULT_SIGNATURE_OPTIONS: EmailSignatureOptions`
  - `export function buildEmailSignature(overrides?: Partial<EmailSignatureOptions>): { html: string; text: string }`

- [ ] **Step 1: Create `lib/email-signature.ts` with exhaustive variant switch and inline-styled table templates**

```ts
import { siteConfig } from "@/lib/site";

export type SignatureVariant = "architectural" | "blueprint" | "minimal";

export interface EmailSignatureOptions {
  variant: SignatureVariant;
  name: string;
  role: string;
  email: string;
  websiteUrl: string;
  websiteLabel: string;
  phone: string;
  tagline: string;
  ctaText: string;
  ctaUrl: string;
  showHeadshot: boolean;
  assetBaseUrl: string;
}

export const DEFAULT_SIGNATURE_OPTIONS: EmailSignatureOptions = {
  variant: "architectural",
  name: siteConfig.founder.name,
  role: siteConfig.founder.role,
  email: siteConfig.founder.email,
  websiteUrl: siteConfig.url,
  websiteLabel: "studiosozo.dev",
  phone: "",
  tagline: "Custom Software • CRM Systems • AI Automation",
  ctaText: "Discuss Your Project",
  ctaUrl: `${siteConfig.url}/contact`,
  showHeadshot: true,
  assetBaseUrl: siteConfig.url,
};
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: PASS with zero errors.

---

### Task 2: Interactive Email Signature Workbench & Route (`components/email-signature-workbench.tsx` & `app/email-signature/page.tsx`)

**Files:**
- Create: `components/email-signature-workbench.tsx`
- Create: `app/email-signature/page.tsx`

**Interfaces:**
- Consumes: `buildEmailSignature`, `DEFAULT_SIGNATURE_OPTIONS`, `SignatureVariant`, `EmailSignatureOptions` from `@/lib/email-signature`
- Produces:
  - `export function EmailSignatureWorkbench()`
  - `export default function EmailSignaturePage()`

- [ ] **Step 1: Create `components/email-signature-workbench.tsx` with variant switcher, customization controls, mock email client frame, and rich-clipboard copy**
- [ ] **Step 2: Create `app/email-signature/page.tsx` with `noindex` metadata and Studio Sozo page chrome**
- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: PASS with zero errors.

---

### Task 3: Standalone HTML Signature File (`public/email-signature.html`)

**Files:**
- Create: `public/email-signature.html`

- [ ] **Step 1: Create `public/email-signature.html` containing all three rendered Studio Sozo signature variants and an embedded one-click copy toolbar**
- [ ] **Step 2: Run full project typecheck and lint verification**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS with zero errors on new files.
