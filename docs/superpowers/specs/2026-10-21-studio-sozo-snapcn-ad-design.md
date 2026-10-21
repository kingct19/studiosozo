# Studio Sozo Flagship Manifesto Ad (`@snapcn`) — Design Spec

**Date:** 2026-10-21  
**Project:** Studio Sozo (`studiosozo.dev`)  
**Canvas:** `1280×720 @ 30fps` · Dark Mode (`#09090B`) · Brand Accent `#635bff`

---

## 1. Goal & Scope

Build a flagship promotional and brand manifesto video ad for **Studio Sozo** using `@snapcn` Remotion components (anchoring on `@snapcn/manifesto`) that serves two deliverables from a single source of truth:

1. **Remotion Video Composition (`remotion/StudioSozoAd.tsx`):** A `1280×720 @ 30fps` Remotion `<Composition id="StudioSozoAd">` ready for CLI frame inspection (`snapcn_preview`) and MP4 rendering (`npx remotion render StudioSozoAd out/studio-sozo-ad.mp4`).
2. **Homepage Interactive Ad Showcase (`components/studio-sozo-ad-showcase.tsx`):** An embedded, auto-playing, loopable Remotion `<Player>` section integrated into the homepage (`components/watermelon/templates/landing-01/demo.tsx`) with Studio Sozo technical frame chrome and interactive beat-scrubbing controls.

---

## 2. Beat-by-Beat Composition (`<TransitionSeries>`)

All beats run on a `1280×720 @ 30fps` canvas over a `#09090B` dark background (`mode="dark"` passed to every component). Scene-to-scene transitions use `@remotion/transitions` with `slide()` and `springTiming({ durationInFrames: 18, config: { damping: 200 } })` so transparent scenes never cross-fade over each other.

| Beat | Component | Frame Budget | Narrative & Props |
|---|---|---|---|
| **1. Manifesto Opener** | `@snapcn/manifesto` | Natural length + 18f transition overlap | Three kinetic statements with hard cuts: (1) `"Off-the-shelf software bends your business."` (2) `"Your workflows deserve better."` (3) `"Own your software."` (`mode="dark"`) |
| **2. Capabilities & Verbs** | `@snapcn/status-cycle` | `216f` (`198f` settle + `18f` overlap) | `prefix="Sozo is"`, `statuses="architecting, automating, integrating, deploying"`, `chips="Custom CRMs, AI Workflows, Client Portals, Mobile Apps, API Sync"`, `fieldColor="#635bff"`, `mode="dark"` |
| **3. Product Surface Reveal** | `@snapcn/laptop-frame` | `240f` (`222f` + `18f` overlap) | `screenSrc="/projects/sozo-crm.jpg"`, `entrance="open"`, `finale="zoom-to-screen"`, `notchLabel="100% Client-Owned Code"`, `showNotch={true}`, `mode="dark"` |
| **4. Shipped Work Proof** | `@snapcn/proof-line` | Natural length + 18f transition overlap | Five shipped Studio Sozo project cards (`/projects/sozo-crm.jpg`, `/projects/elevate-solar.jpg`, `/projects/angler-iq.jpg`, `/projects/hr-hvac.jpg`, `/projects/dash-lake-rentals.jpg`) collapsing into the proof headline (`mode="dark"`) |
| **5. Brand Lockup & CTA** | `@snapcn/wordmark-cut` + `@snapcn/text-highlight` | `84f` (`66f` + `18f` overlap) + `74f` final hold | Beat 5a: `<WordmarkCut word="studio sozo." dotFrom="#635bff" dotTo="#38bdf8" mode="dark" theme="dark" />` → Beat 5b: `<TextHighlight before="Build custom at " highlight="studiosozo.dev" accentColor="#635bff" mode="dark" />` |

> **Note on Exact Frame Budgets:** After installing `@snapcn/manifesto` and `@snapcn/proof-line`, we inspect their exact exported natural lengths in `components/snap-cn/manifesto.tsx` and `components/snap-cn/proof-line.tsx` and budget each `<TransitionSeries.Sequence>` to `naturalLength + 18` frames so no beat clips before the 18-frame slide transition.

---

## 3. Component & File Structure

```text
studiosozo/
├── components/
│   ├── snap-cn/
│   │   ├── manifesto.tsx          # Installed via @snapcn/manifesto
│   │   ├── status-cycle.tsx       # Installed via @snapcn/status-cycle
│   │   ├── laptop-frame.tsx       # Installed via @snapcn/laptop-frame
│   │   ├── proof-line.tsx         # Installed via @snapcn/proof-line
│   │   ├── wordmark-cut.tsx       # Installed via @snapcn/wordmark-cut
│   │   ├── text-highlight.tsx     # Installed via @snapcn/text-highlight
│   │   └── task-stream.tsx        # Existing component on /process
│   └── studio-sozo-ad-showcase.tsx # Client wrapper around @remotion/player + chapter scrubber
├── remotion/
│   ├── index.ts                   # registerRoot(RemotionRoot)
│   ├── Root.tsx                   # <Composition id="StudioSozoAd" width={1280} height={720} fps={30} ... />
│   └── StudioSozoAd.tsx           # Master TransitionSeries orchestrator + exported beat metadata
└── components/watermelon/templates/landing-01/
    └── demo.tsx                   # Mounts <StudioSozoAdShowcase /> on homepage
```

---

## 4. Homepage Showcase UX (`components/studio-sozo-ad-showcase.tsx`)

- **Technical Window Header:** Matches Studio Sozo's `[ STUDIO SOZO // BRAND MANIFESTO AD ]` blueprint style with a live beat badge (`01 // MANIFESTO`, `02 // CAPABILITIES`, `03 // PLATFORM`, `04 // PROOF`, `05 // LOCKUP`).
- **Remotion Player:** Lazy-mounted client `<Player>` (`1280×720` aspect ratio `16:9`, `fps={30}`, `loop`, `autoPlay`, `acknowledgeRemotionLicense`) so SSR/hydration stays clean and performant.
- **Interactive Chapter Bar:** Clicking any of the 5 beat pills seeks the player directly to that beat's start frame (`playerRef.current?.seekTo(beatStartFrame)`).
- **Direct CTA Integration:** Includes a `"Discuss Your Project"` link alongside the replay control.

---

## 5. Error Handling, Determinism & Verification

- **No Custom Improvised Motion:** All scene motion is driven strictly by the installed `@snapcn` components and their props.
- **Fonts Loaded Before Render:** `@remotion/google-fonts` loaded at module scope so no fallback font flashes occur during still or video export.
- **Visual Verification via `snapcn_preview`:** Render still frames from the landed pose of each beat (`Manifesto`, `StatusCycle`, `LaptopFrame`, `ProofLine`, `WordmarkCut`, `TextHighlight`) to verify dark mode contrast, zero text clipping, and asset loading.
- **Build & Type Safety:** Verify `npm run build` succeeds with zero TypeScript or Next.js errors.
