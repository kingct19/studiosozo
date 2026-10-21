"use client";

import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  getRemotionEnvironment,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  mixOklch,
  resolveFont,
  type SnapCnTheme,
  useSnapCnTheme,
  withAlpha,
} from "@/lib/snap-cn-ui";

/**
 * A field of loose code that resolves into a wall of finished work, and then
 * the wall backs away.
 *
 * One phrase holds the middle of the frame and never moves. Everything else is
 * three layers on one clock:
 *
 * | layer | seconds | what happens |
 * | --- | --- | --- |
 * | glyphs | 0 – 0.62 | seventeen punctuation marks, scrambling for 0.13s, then out |
 * | fragments | 0.40 – 0.93 | nine snippets fade up where the glyphs were |
 * | posters | 0.53 – 1.40 | five plates arrive, resolve into work, then recede |
 *
 * ## Nothing moves until the end, and then everything does
 *
 * Measured: the glyph in the top left occupies the *same nineteen pixels* on
 * every frame from 0.10s to 0.58s. The fragments do too. So the first two
 * thirds of this scene are pure opacity — no drift, no float, no parallax — and
 * that stillness is what makes the last third read as a camera move rather than
 * as more animation.
 *
 * ## The recede is a similarity, and its centre is the frame's
 *
 * Fitting scale + rotation + centre to the five tracked posters, frame by
 * frame, put the centre at **(356.5, 198)** with a residual under 3.6px — the
 * middle of a 712×390 stage, to within the measurement. So the wall shrinks
 * 1 → 0.52 and turns 0 → −31° about the exact centre of the frame, which is
 * also the one point the headline sits on.
 *
 * The posters do **not** turn with it. Their bounding boxes stay axis-aligned
 * at every scale — a 150×93 card rotated 24° would measure 175×146, and it
 * measures 150×93. So the *arrangement* rotates and each card counter-rotates
 * to stay upright, which is the whole trick and is one `rotate(-θ)` on the
 * child.
 *
 * ## A plate, then the work
 *
 * Every poster arrives at **full size** — measured, not grown — as a saturated
 * gradient plate, and the artwork cross-fades over it about 0.13s later. That
 * is a loading state, deliberately kept: it is the two seconds of a render you
 * would otherwise cut, and it is the only thing on screen that says the picture
 * was *made* rather than placed.
 */

const { fontFamily: SANS } = loadSans("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   The stage, in the reference's own 712 × 390 pixels
   ───────────────────────────────────────────────────────────────────────── */

export const REF_W = 712;
export const REF_H = 390;

/** The one point the recede turns about — the middle of the stage. */
export const PIVOT = { x: REF_W / 2, y: REF_H / 2 };

/** Inter's own metrics; `top = baseline - ASC · size` at `lineHeight: LINE`. */
const ASC = 0.9688;
const LINE = 1.2103;

/** The clip runs out mid-recede, and so does this. */
export const END = 1.4;

/**
 * The one thing on screen that never moves, measured to the pixel: ink from
 * x 302 to 412 and y 186 to 207 on every frame of the clip.
 *
 * Its centre is 2px right of the stage's, which is not a mistake to correct —
 * the recede's pivot is the stage centre and the headline is beside it, and
 * moving either one to agree with the other would break a measurement.
 */
export const HEADLINE = { x: 358, baseline: 208.5, size: 29.5 };

/* ─────────────────────────────────────────────────────────────────────────
   Beats
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Every time in this file is in seconds, because the reference is 60fps, the
 * compositions are 30, and a frame number would be wrong in one of them.
 */
export const BEAT = {
  /** Glyphs stop cycling and hold their final character. */
  settle: 0.05,
  /** First fragment up; the rest follow at `stagger`. */
  fragmentsFrom: 0.4,
  /** First glyph out. They leave in the order they were read. */
  glyphsFrom: 0.37,
  /** Between one item and the next, in either wave. */
  stagger: 0.033,
  /** How long a glyph, a fragment or a plate takes to cross. */
  fade: 0.12,
  /** First plate down. */
  postersFrom: 0.533,
  /** Plate → artwork, and how long that cross-fade takes. */
  resolveAfter: 0.13,
  resolveFade: 0.18,
  /** The wall starts backing away. */
  recedeFrom: 1.067,
} as const;

/* ─────────────────────────────────────────────────────────────────────────
   The recede
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Scale and rotation of the wall, one knot per 60fps reference frame from
 * `BEAT.recedeFrom`.
 *
 * Tables rather than a curve because both accelerate the whole way and neither
 * arrives: the clip ends while the wall is still turning 4° and losing 5% a
 * frame. There is no settle to fit an ease to.
 *
 * One knot is smoothed — the reference drops a frame at 1.32s, and the raw fit
 * put a 3.2° step between two 1.4° neighbours. The gap is in the recording, not
 * in the animation.
 */
export const RECEDE_S = [
  1.0, 0.996, 0.987, 0.983, 0.983, 0.975, 0.966, 0.957, 0.945, 0.931, 0.915,
  0.898, 0.869, 0.83, 0.787, 0.755, 0.718, 0.675, 0.625, 0.564, 0.518,
];
export const RECEDE_DEG = [
  0, 0, -0.1, -0.2, -0.3, -0.55, -1.18, -1.94, -2.74, -3.66, -4.82, -5.93,
  -7.31, -9.6, -12.51, -14.67, -17.24, -20.1, -23.55, -27.64, -31.5,
];

/** Where the knots sit: the reference's own 60fps grid. */
const KNOT = 1 / 60;

function table(v: readonly number[], t: number): number {
  return interpolate(
    t,
    v.map((_, i) => BEAT.recedeFrom + i * KNOT),
    v as number[],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

export const recedeScale = (t: number) => table(RECEDE_S, t);
export const recedeDeg = (t: number) => table(RECEDE_DEG, t);

/** Where a point of the wall lands on screen at time `t`. */
export function walled(
  x: number,
  y: number,
  t: number,
): { x: number; y: number; s: number } {
  const s = recedeScale(t);
  const a = (recedeDeg(t) * Math.PI) / 180;
  const dx = x - PIVOT.x;
  const dy = y - PIVOT.y;
  return {
    x: PIVOT.x + s * (dx * Math.cos(a) - dy * Math.sin(a)),
    y: PIVOT.y + s * (dx * Math.sin(a) + dy * Math.cos(a)),
    s,
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   The glyph field
   ───────────────────────────────────────────────────────────────────────── */

export interface Glyph {
  /**
   * Centre-x and BASELINE, not a centre.
   *
   * Punctuation sits at wildly different heights: a `^` is a hat near the cap
   * line, a `*` is higher still, a `)` hangs below the baseline. Placing all
   * seventeen by an ink centre needs a per-character fudge that is really the
   * font's business, so they are placed the way type is placed and the
   * baselines carry the measurement.
   */
  x: number;
  baseline: number;
  ch: string;
  size: number;
  /** Painted in the accent rather than the ink. */
  hot?: boolean;
}

/**
 * Seventeen marks in five rows, measured off the reference frame by frame.
 *
 * They are a scatter and not a grid, but only just: the rows sit at 90, 134,
 * 197, 256 and 303, and the middle one is the headline's. Six of the
 * seventeen are in the accent, spread so no two of them touch — which is what
 * keeps the colour reading as punctuation rather than as a highlight.
 */
export const GLYPHS: readonly Glyph[] = [
  { x: 205, baseline: 100.5, ch: "/", size: 30, hot: true },
  { x: 269.5, baseline: 109, ch: "^", size: 33 },
  { x: 363, baseline: 100, ch: "@", size: 33, hot: true },
  { x: 471.5, baseline: 105, ch: "<", size: 30 },
  { x: 229, baseline: 149, ch: "/", size: 32 },
  { x: 344, baseline: 147, ch: "#", size: 32 },
  { x: 453.5, baseline: 149.5, ch: "^", size: 33, hot: true },
  { x: 166, baseline: 211, ch: "*", size: 29, hot: true },
  { x: 259, baseline: 206.5, ch: "<", size: 30 },
  { x: 458.5, baseline: 206.5, ch: ">", size: 30 },
  { x: 511, baseline: 206.5, ch: ")", size: 31 },
  { x: 284.5, baseline: 269, ch: "?", size: 33 },
  { x: 406.5, baseline: 277.5, ch: "\\", size: 32, hot: true },
  { x: 234.5, baseline: 311, ch: "*", size: 29, hot: true },
  { x: 300, baseline: 318.5, ch: ")", size: 31 },
  { x: 392.5, baseline: 311, ch: "/", size: 32 },
  { x: 500, baseline: 317, ch: "}", size: 31 },
];

/** What a glyph cycles through before it settles. */
export const SCRAMBLE = "/\\<>^*#@?%){};=+";

/**
 * The character a slot is showing at time `t`.
 *
 * Measured: the top-left slot reads `%`, `/`, `/`, `%`, `/` on consecutive
 * reference frames and holds from 0.05s on. So it is a cycle, not a fade — the
 * mark is fully drawn on every frame, it is simply a different mark — and it is
 * over in two frames at 30fps. Longer reads as a broken font, not as a machine
 * making up its mind.
 *
 * Deterministic in `(i, step)` so a re-render, a Player scrub and a still all
 * agree. A `Math.random()` here would make the component non-reproducible,
 * which for a video renderer is a bug and not a style.
 */
export function glyphAt(g: Glyph, i: number, t: number, settle = BEAT.settle) {
  if (t >= settle) return g.ch;
  const step = Math.floor(t / 0.033);
  const n = (i * 73 + step * 149 + 17) % SCRAMBLE.length;
  return SCRAMBLE[n] ?? g.ch;
}

/* ─────────────────────────────────────────────────────────────────────────
   The fragments
   ───────────────────────────────────────────────────────────────────────── */

export interface Fragment {
  /** Left edge and baseline, in stage pixels. */
  x: number;
  baseline: number;
  /** Leading dots, painted accent-then-ink. A fragment may have none. */
  dots?: number;
  /** Rendered in the accent rather than the ink. */
  text: string;
  hot?: string;
}

/**
 * Nine snippets, at the measured positions of the reference's own.
 *
 * The copy is ours: the reference is writing an HTTP client and this registry
 * renders video, so the words are `useCurrentFrame` and `interpolate` and the
 * install line. The *shape* is what was measured — where they sit, how long
 * they are, and that two of them repeat lower down the frame, which is what
 * stops a scatter of nine reading as a list.
 */
export const FRAGMENTS: readonly Fragment[] = [
  { x: 215, baseline: 111, text: "<TextReveal" },
  { x: 512, baseline: 127, dots: 2, text: "durationInFrames" },
  { x: 76, baseline: 138, text: "frame={f}" },
  { x: 95, baseline: 206, dots: 1, text: "useFrame()" },
  { x: 507, baseline: 203, text: "interpolate(", hot: "[0,1]" },
  { x: 133, baseline: 273, text: "@snapcn/" },
  { x: 145, baseline: 295, text: "wall-", hot: "cut" },
  { x: 299, baseline: 322, text: "@snapcn/" },
  { x: 312, baseline: 341, text: "hex-", hot: "tally" },
];

export const FRAGMENT_SIZE = 12;

/* ─────────────────────────────────────────────────────────────────────────
   The posters
   ───────────────────────────────────────────────────────────────────────── */

export interface Poster {
  /** Centre on the wall, before the recede moves it. */
  x: number;
  y: number;
  /** Caption drawn on the plate. Replaced entirely when `src` is given. */
  label: string;
  /** A real image. Without one the card is drawn — see `Artwork`. */
  src?: string;
}

/** Every poster is the same size; the wall's scale is the only thing that varies. */
export const POSTER = { w: 235, h: 156, radius: 3 };

/**
 * Five posters, at their measured centres.
 *
 * Three of them hang off the edge of the stage — that is the point. A wall you
 * can see all of is a grid; a wall that runs past the frame is a wall, and it
 * is what makes the recede at the end feel like it is revealing something
 * rather than shrinking something.
 *
 * The order is the order they land in, 0.033s apart, and it is not the reading
 * order: the reference starts bottom-right and works anticlockwise, so the
 * frame fills from its corners inward.
 */
export const POSTERS: readonly Poster[] = [
  { x: 581, y: 310, label: "checkout-push" },
  { x: 326, y: 40, label: "gallery-push" },
  { x: 282, y: 344, label: "phone-pitch" },
  { x: 65, y: 156, label: "hex-tally" },
  { x: 684, y: 48, label: "wall-cut" },
];

/** When poster `i` puts its plate down. */
export const plateAt = (i: number) => BEAT.postersFrom + i * BEAT.stagger;

/** 0 → 1 as a plate arrives. */
export function plateIn(t: number, i: number): number {
  return interpolate(t, [plateAt(i), plateAt(i) + BEAT.fade], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** 0 → 1 as the artwork resolves over the plate. */
export function resolveIn(t: number, i: number): number {
  const from = plateAt(i) + BEAT.resolveAfter;
  return interpolate(t, [from, from + BEAT.resolveFade], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** 0 → 1 as glyph `i` leaves; the fragments arrive on the same ladder. */
export function glyphOut(t: number, i: number): number {
  const from = BEAT.glyphsFrom + (i % 9) * BEAT.stagger * 0.6;
  return interpolate(t, [from, from + BEAT.fade], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function fragmentIn(t: number, i: number): number {
  const from = BEAT.fragmentsFrom + i * BEAT.stagger * 0.6;
  return interpolate(t, [from, from + BEAT.fade], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   Pieces
   ───────────────────────────────────────────────────────────────────────── */

function lift(): { willChange: "transform" } | null {
  // Right for the Player's one continuous tab, wrong for a render spread over
  // parallel tabs that each inherit a stale raster.
  return getRemotionEnvironment().isRendering
    ? null
    : { willChange: "transform" };
}

/** A word placed by its baseline, the way every measurement was taken. */
function Line({
  children,
  left,
  baseline,
  size,
  weight,
  color,
  opacity,
  center,
}: {
  children: ReactNode;
  left: number;
  baseline: number;
  size: number;
  weight: number;
  color: string;
  opacity?: number;
  center?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: baseline - ASC * size,
        fontSize: size,
        lineHeight: LINE,
        fontWeight: weight,
        color,
        whiteSpace: "nowrap",
        width: "max-content",
        opacity,
        ...(center ? { transform: "translateX(-50%)" } : null),
      }}
    >
      {children}
    </div>
  );
}

/** The two dots some fragments lead with — accent first, then ink. */
function Dots({ n, hot, ink }: { n: number; hot: string; ink: string }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: two dots, fixed order
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 3,
            marginRight: 4,
            verticalAlign: "middle",
            background: i === 0 ? hot : ink,
          }}
        />
      ))}
    </>
  );
}

/**
 * What a poster looks like before its artwork exists.
 *
 * A diagonal two-stop, the backdrop's cool end into its warm one — the same two
 * hues the scene already has, at full strength. Measured off the reference the
 * plate runs deep blue to orange, and the *two hues* are what make it read as a
 * loading state rather than as a coloured card: nothing else in the frame is
 * saturated at both ends.
 */
function Plate({ cool, accent }: { cool: string; accent: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: POSTER.radius,
        background: `linear-gradient(128deg, ${cool} 0%, ${cool} 22%, ${accent} 100%)`,
      }}
    />
  );
}

/**
 * A poster with no image: a browser bar, a stage and two caption lines.
 *
 * Drawn rather than shipped, for the same reason every other card in this
 * registry is: a component cannot carry somebody else's screenshots. Pass
 * `src` on a poster and this is replaced wholesale.
 */
function Artwork({
  label,
  paper,
  ink,
  accent,
  line,
}: {
  label: string;
  paper: string;
  ink: string;
  accent: string;
  line: string;
}) {
  const rule = (
    left: number,
    top: number,
    w: number,
    h = 4,
    weight = 0.22,
  ): CSSProperties => ({
    position: "absolute",
    left,
    top,
    width: w,
    height: h,
    borderRadius: 1,
    background: mixOklch(paper, ink, weight),
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: POSTER.radius,
        background: paper,
        overflow: "hidden",
      }}
    >
      {/* chrome */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 15,
          background: mixOklch(paper, ink, 0.07),
          borderBottom: `1px solid ${line}`,
        }}
      />
      {[9, 18, 27].map((cx) => (
        <div
          key={cx}
          style={{
            position: "absolute",
            left: cx - 2,
            top: 5.5,
            width: 4,
            height: 4,
            borderRadius: 2,
            background: mixOklch(paper, ink, 0.3),
          }}
        />
      ))}
      {/*
        A page, not a poster: a dark panel on the left and a column of type on
        the right.

        The reference's cards are product pages — a photographed object on
        white, with a title, a price and a button beside it — and a row through
        one of them runs #f6eee6, #5e5641, #2e2a1b, #f2ece8. Two thirds white,
        one third nearly black. A drawn card whose darkest pixel is a tint of
        the paper has none of that and turns the wall into five cream
        rectangles; a card that is *all* dark has the opposite problem. The
        split is what reads at a fifth of full size, which is where this card
        spends most of the shot.
      */}
      <div
        style={{
          position: "absolute",
          left: 11,
          top: 25,
          width: 104,
          height: 92,
          borderRadius: 2,
          background: mixOklch(paper, ink, 0.88),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 62,
          width: 38,
          height: 18,
          borderRadius: 3,
          background: accent,
        }}
      />
      {/* the column beside it */}
      <div
        style={{
          position: "absolute",
          left: 126,
          top: 30,
          fontSize: 9,
          fontWeight: 600,
          color: ink,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div style={rule(126, 45, 88)} />
      <div style={rule(126, 54, 72)} />
      <div style={rule(126, 68, 34, 6, 0.5)} />
      <div
        style={{
          position: "absolute",
          left: 126,
          top: 84,
          width: 78,
          height: 14,
          borderRadius: 2,
          background: mixOklch(paper, ink, 0.82),
        }}
      />
      <div style={rule(126, 106, 60)} />
      {/* the strip under both */}
      <div style={rule(11, 128, 62, 12, 0.12)} />
      <div style={rule(80, 128, 62, 12, 0.12)} />
      <div style={rule(149, 128, 62, 12, 0.12)} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface RenderWallProps {
  /** The phrase that holds the middle and never moves. */
  headline?: string;
  /** Seventeen marks. Positions are stage pixels; see `GLYPHS`. */
  glyphs?: readonly Glyph[];
  /** Nine snippets. */
  fragments?: readonly Fragment[];
  /** Five cards. Give a `src` to put your own render on one. */
  posters?: readonly Poster[];
  /**
   * The loud colour: the hot glyphs, the fragment highlights, the loading
   * plate. Defaults to `theme.primary` — the reference's orange is the
   * reference's brand.
   */
  accent?: string;
  /**
   * The two ends of the backdrop.
   *
   * Their own props rather than derivations of `accent`, because they cannot be
   * one: the reference's warm end is a dusty mid-tone and `mixOklch(page,
   * accent, x)` never leaves the page's lightness, so no mix of the two
   * reaches it. A field that covers every pixel of the frame is worth two
   * colours.
   */
  warm?: string;
  cool?: string;
  /** Design-system token overrides. */
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";
  fontFamily?: string;
  /** 1 is the measured speed. */
  speed?: number;
}

export function RenderWall({
  headline = "and ship",
  glyphs = GLYPHS,
  fragments = FRAGMENTS,
  posters = POSTERS,
  accent,
  warm,
  cool,
  theme,
  mode,
  fontFamily,
  speed = 1,
}: RenderWallProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame * speed) / fps;

  const th = useSnapCnTheme(theme, mode);
  const face = resolveFont(fontFamily ?? th.fontFamily) ?? SANS;
  const hot = accent ?? th.primary;
  // Alpha over the page, not an oklch mix, and the difference is visible:
  // interpolating a warm off-white toward a blue in oklch takes the shortest
  // path through the hue circle, which for those two endpoints runs through
  // green. Compositing keeps the bloom on the straight line between the page
  // and the accent, which is the colour anybody expects when they set one.
  const hi = warm ?? withAlpha(hot, 0.3);
  const lo = cool ?? withAlpha(th.foreground, 0.16);

  // `cover`, not `contain`: the wall runs past every edge of the stage on
  // purpose, so a letterbox band would be a strip of page colour where the
  // reference has more wall.
  const k = Math.max(width / REF_W, height / REF_H);
  const ox = (width - REF_W * k) / 2;
  const oy = (height - REF_H * k) / 2;

  const paint = {
    ink: th.foreground,
    muted: th.mutedForeground,
    paper: th.card,
    line: th.border,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: th.background,
        fontFamily: face,
        // Nothing here scales *type*, but the wall carries its captions through
        // a 2× range in half a second, and hinting re-snaps a stem on every
        // frame of that.
        textRendering: "geometricPrecision",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: ox,
          top: oy,
          width: REF_W,
          height: REF_H,
          transform: `scale(${k})`,
          transformOrigin: "0 0",
        }}
      >
        {/*
          The backdrop, as three stops rather than a mesh image.

          Measured across a 7×6 grid of the reference: warm and most saturated
          at the top centre (#cf9f8c), cool and most saturated at the bottom
          centre-left (#83999e), and lighter toward every corner. Two radial
          blooms over a vertical spine reproduce that to within a few levels,
          and unlike a mesh PNG it is a file nobody has to ship and a colour
          anybody can re-theme.

          The blooms are drawn one stage-height oversize on every side so their
          soft edges never land inside the frame — a radial gradient whose stop
          ends at the viewport edge shows a visible ring there.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: [
              `radial-gradient(560px 270px at 356px 0px, ${hi} 0%, ${withAlpha(hi, 0)} 100%)`,
              `radial-gradient(640px 400px at 210px 405px, ${lo} 0%, ${lo} 16%, ${withAlpha(lo, 0)} 100%)`,
              th.background,
            ].join(","),
          }}
        />

        {/* Glyphs and fragments share the middle plane; the headline sits on it
            and the posters sit above all three. */}
        {glyphs.map((g, i) => (
          <Line
            key={`${g.x}-${g.baseline}`}
            left={g.x}
            baseline={g.baseline}
            size={g.size}
            weight={400}
            color={g.hot ? hot : paint.ink}
            opacity={glyphOut(t, i)}
            center
          >
            {glyphAt(g, i, t)}
          </Line>
        ))}

        {fragments.map((f, i) => (
          <Line
            key={`${f.x}-${f.baseline}`}
            left={f.x}
            baseline={f.baseline}
            size={FRAGMENT_SIZE}
            weight={500}
            color={paint.ink}
            opacity={fragmentIn(t, i)}
          >
            {f.dots ? <Dots n={f.dots} hot={hot} ink={paint.ink} /> : null}
            {f.text}
            {f.hot ? <span style={{ color: hot }}>{f.hot}</span> : null}
          </Line>
        ))}

        <Line
          left={HEADLINE.x}
          baseline={HEADLINE.baseline}
          size={HEADLINE.size}
          weight={400}
          color={paint.ink}
          center
        >
          {headline}
        </Line>

        {posters.map((p, i) => {
          const { x, y, s } = walled(p.x, p.y, t);
          const plate = plateIn(t, i);
          const art = resolveIn(t, i);
          return (
            <div
              key={p.label}
              style={{
                position: "absolute",
                left: x - POSTER.w / 2,
                top: y - POSTER.h / 2,
                width: POSTER.w,
                height: POSTER.h,
                opacity: plate,
                // Scale only. The rotation is already spent placing the card —
                // `walled` turns the *position* — and adding it here as well is
                // what tilts a wall that the reference keeps upright.
                transform: `scale(${s})`,
                ...lift(),
              }}
            >
              <Plate cool={mixOklch(lo, paint.ink, 0.82)} accent={hot} />
              <div style={{ position: "absolute", inset: 0, opacity: art }}>
                {p.src ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: POSTER.radius,
                      backgroundImage: `url(${p.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <Artwork
                    label={p.label}
                    paper={paint.paper}
                    ink={paint.ink}
                    accent={hot}
                    line={paint.line}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default RenderWall;
