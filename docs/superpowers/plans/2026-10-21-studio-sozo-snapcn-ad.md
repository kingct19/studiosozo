# Studio Sozo Flagship Manifesto Ad Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 5-Beat Studio Sozo Flagship Manifesto Ad using `@snapcn` Remotion components (`@snapcn/manifesto`, `@snapcn/status-cycle`, `@snapcn/laptop-frame`, `@snapcn/proof-line`, `@snapcn/wordmark-cut`, `@snapcn/text-highlight`), registered as a `1280×720 @ 30fps` Remotion composition (`StudioSozoAd`) and embedded as an interactive showcase on the Studio Sozo homepage.

**Architecture:** We install the six `@snapcn` components into `components/snap-cn/` along with `@remotion/transitions`, `@remotion/player`, `@remotion/cli`, and `@remotion/google-fonts`. We author `remotion/StudioSozoAd.tsx` to stitch the 5 beats with `TransitionSeries` (`slide()` + `springTiming({ durationInFrames: 18, config: { damping: 200 } })`), register the composition in `remotion/Root.tsx` and `remotion/index.ts`, verify frames with `snapcn_preview`, and embed `<StudioSozoAdShowcase />` into `components/watermelon/templates/landing-01/demo.tsx`.

**Tech Stack:** Next.js 16.4, React 19, Remotion 4 (`remotion`, `@remotion/transitions`, `@remotion/player`, `@remotion/cli`, `@remotion/google-fonts`), `@snapcn` Registry Components, Tailwind CSS 4.

## Global Constraints

- Canvas size is strictly `1280×720 @ 30fps`.
- Frame background is `#09090B` with `mode="dark"` passed to every `@snapcn` component.
- Single brand accent `#635bff` across the entire composition.
- Scene transitions use `@remotion/transitions` `slide()` with `springTiming({ durationInFrames: 18, config: { damping: 200 } })` — never `fade()`.
- No inline imports; all imports placed at top of module.

---

### Task 1: Install `@snapcn` Components and Remotion Packages

**Files:**
- Modify: `package.json`
- Create: `components/snap-cn/manifesto.tsx`
- Create: `components/snap-cn/status-cycle.tsx`
- Create: `components/snap-cn/laptop-frame.tsx`
- Create: `components/snap-cn/proof-line.tsx`
- Create: `components/snap-cn/wordmark-cut.tsx`
- Create: `components/snap-cn/text-highlight.tsx`

**Interfaces:**
- Consumes: `@snapcn` registry (`https://snapcn.dev/r/{name}.json` in `components.json`) with `SNAPCN_API_KEY`.
- Produces: Installed `@snapcn` components in `components/snap-cn/` and Remotion runtime/CLI packages (`@remotion/transitions`, `@remotion/player`, `@remotion/cli`, `@remotion/google-fonts`).

- [ ] **Step 1: Install Remotion companion packages matched to the installed `remotion` version**

Run:
```bash
npm install @remotion/transitions @remotion/player @remotion/cli @remotion/google-fonts
```
Expected: Packages install cleanly in `package.json`.

- [ ] **Step 2: Install the 6 `@snapcn` components using `shadcn`**

Run:
```bash
SNAPCN_API_KEY=sk_NAyRk_qygAvFGYyoROHmszQSKMd88PNXtgE6gWCSXB0 npx shadcn@latest add @snapcn/manifesto @snapcn/status-cycle @snapcn/laptop-frame @snapcn/proof-line @snapcn/wordmark-cut @snapcn/text-highlight --yes --overwrite
```
Expected: Creates `manifesto.tsx`, `status-cycle.tsx`, `laptop-frame.tsx`, `proof-line.tsx`, `wordmark-cut.tsx`, and `text-highlight.tsx` under `components/snap-cn/`.

- [ ] **Step 3: Inspect the installed `manifesto.tsx` and `proof-line.tsx` props and natural frame counts**

Read `components/snap-cn/manifesto.tsx` and `components/snap-cn/proof-line.tsx` to verify exact exported component names, prop interfaces, and natural frame lengths.

---

### Task 2: Create the Remotion Composition (`remotion/StudioSozoAd.tsx`, `remotion/Root.tsx`, `remotion/index.ts`)

**Files:**
- Create: `remotion/StudioSozoAd.tsx`
- Create: `remotion/Root.tsx`
- Create: `remotion/index.ts`
- Modify: `package.json` (add `remotion:still` and `remotion:render` scripts)

**Interfaces:**
- Consumes: `Manifesto`, `StatusCycle`, `LaptopFrame`, `ProofLine`, `WordmarkCut`, `TextHighlight` from `@/components/snap-cn/*`
- Produces:
  - `STUDIO_SOZO_AD_FPS = 30`
  - `STUDIO_SOZO_AD_WIDTH = 1280`
  - `STUDIO_SOZO_AD_HEIGHT = 720`
  - `STUDIO_SOZO_AD_DURATION_IN_FRAMES: number`
  - `STUDIO_SOZO_AD_BEATS: readonly { id: string; code: string; label: string; startFrame: number; durationInFrames: number }[]`
  - `StudioSozoAd: React.FC`
  - Registered Remotion `<Composition id="StudioSozoAd" />`

- [ ] **Step 1: Author `remotion/StudioSozoAd.tsx`**

```tsx
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Manifesto } from "@/components/snap-cn/manifesto";
import { StatusCycle } from "@/components/snap-cn/status-cycle";
import { LaptopFrame } from "@/components/snap-cn/laptop-frame";
import { ProofLine } from "@/components/snap-cn/proof-line";
import { WordmarkCut } from "@/components/snap-cn/wordmark-cut";
import { TextHighlight } from "@/components/snap-cn/text-highlight";

export const STUDIO_SOZO_AD_FPS = 30;
export const STUDIO_SOZO_AD_WIDTH = 1280;
export const STUDIO_SOZO_AD_HEIGHT = 720;
export const TRANSITION_FRAMES = 18;
export const ACCENT_COLOR = "#635bff";
```
Configure each beat's sequence duration (`naturalLength + TRANSITION_FRAMES` for beats followed by a transition) and pass Studio Sozo copy and `/projects/*.jpg` assets via `staticFile(...)`.

- [ ] **Step 2: Author `remotion/Root.tsx` and `remotion/index.ts`**

```tsx
import React from "react";
import { Composition } from "remotion";
import {
  StudioSozoAd,
  STUDIO_SOZO_AD_DURATION_IN_FRAMES,
  STUDIO_SOZO_AD_FPS,
  STUDIO_SOZO_AD_HEIGHT,
  STUDIO_SOZO_AD_WIDTH,
} from "./StudioSozoAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StudioSozoAd"
      component={StudioSozoAd}
      durationInFrames={STUDIO_SOZO_AD_DURATION_IN_FRAMES}
      fps={STUDIO_SOZO_AD_FPS}
      width={STUDIO_SOZO_AD_WIDTH}
      height={STUDIO_SOZO_AD_HEIGHT}
    />
  );
};
```

```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```

- [ ] **Step 3: Preview every beat with `snapcn_preview`**

Call `snapcn_preview` with `composition: "StudioSozoAd"`, `entry: "remotion/index.ts"`, and the landed frames of Beats 1–5 to visually inspect the rendered output and adjust any prop or frame budget if needed.

---

### Task 3: Build Homepage Ad Showcase (`components/studio-sozo-ad-showcase.tsx`) & Integrate into Homepage

**Files:**
- Create: `components/studio-sozo-ad-showcase.tsx`
- Modify: `components/watermelon/templates/landing-01/demo.tsx`

**Interfaces:**
- Consumes: `StudioSozoAd`, `STUDIO_SOZO_AD_BEATS`, `STUDIO_SOZO_AD_DURATION_IN_FRAMES`, `STUDIO_SOZO_AD_FPS`, `STUDIO_SOZO_AD_WIDTH`, `STUDIO_SOZO_AD_HEIGHT` from `@/remotion/StudioSozoAd`
- Produces: `StudioSozoAdShowcase` component mounted on the homepage right below `<Stats />`.

- [ ] **Step 1: Create `components/studio-sozo-ad-showcase.tsx`**

Build a client component wrapping `@remotion/player` (`<Player>`) with:
- Studio Sozo technical header bar (`[ STUDIO SOZO // BRAND MANIFESTO AD ]`) and live active-beat status indicator
- `16:9` responsive container (`1280×720`) with `autoPlay`, `loop`, and `controls={false}` plus custom interactive chapter pills (`01 Manifesto`, `02 Capabilities`, `03 Platform`, `04 Shipped Proof`, `05 Lockup`) that seek the `<Player>` to each beat's `startFrame`
- Play/Pause + Replay controls and direct `"Discuss Your Project"` CTA link

- [ ] **Step 2: Mount `<StudioSozoAdShowcase />` in `components/watermelon/templates/landing-01/demo.tsx`**

Import `StudioSozoAdShowcase` at the top of `components/watermelon/templates/landing-01/demo.tsx` and render it between `<Stats />` and `<Features />`.

- [ ] **Step 3: Run typecheck and production build verification**

Run:
```bash
npm run build
```
Expected: Next.js 16 production build succeeds with zero TypeScript or bundler errors.
