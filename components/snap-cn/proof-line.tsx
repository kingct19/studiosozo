"use client";

import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import type { CSSProperties } from "react";
import {
  AbsoluteFill,
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
 * Five pieces of shipped work collapse, one at a time, into the sentence that
 * describes them.
 *
 * Every card on the stage is a demo you already made. One by one each slides
 * away, and on the *very next frame* a small coloured square is standing where
 * it was. The square travels to its place in a headline and becomes a word.
 * When the last one lands the sentence is finished and the stage is empty.
 *
 * ## The whole scene is one scale about one point
 *
 * Fitting scale + centre to the four tracked cards, frame by frame, put the
 * pivot at **(355, 202.3)** on a 712×390 stage and the residual under 0.4px —
 * and the *headline* obeys the same number. The line's left edge, its baseline
 * and every card centre are all reproduced by `place()` to within half a pixel
 * across the whole clip. So there is no per-element drift here at all: there is
 * a camera, and everything is nailed to it.
 *
 * The scale is not a push. It **dips** first — 1.000 → 0.978 over the first
 * two thirds of a second, a barely-visible pull-back — and only then runs to
 * 1.372. That dip is the reason the push reads as a push: the eye is given a
 * still, slightly-receding frame to settle on before anything moves.
 *
 * ## Nothing cross-fades
 *
 * Measured: the card is at **full opacity on the last frame it exists** — the
 * interior mean moves 17.9 → 18.8 over the whole slide — and gone on the next.
 * Same for square → word. Every handover in this scene is a hard cut on one
 * frame, and softening any of them turns a substitution into a dissolve, which
 * is a different (and much weaker) idea.
 *
 * ## The square waits where the card was
 *
 * The spawn point is not the word's slot and it is not the middle of the frame:
 * it is **the card's own centre at the moment it vanished**, translation
 * included. The black card's slide ends 75.1px right of where it started, and
 * its square appears 75.7px right of the card's origin. That is what ties the
 * two halves of this scene together, and it is why the exit offsets and the
 * approach offsets are one table per element rather than a shared easing:
 * measured, they are not the same curve twice.
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

/**
 * The one point everything scales about.
 *
 * Not the middle of the stage — 9px below it. Solved from the cards and then
 * confirmed, independently, by the headline's own baseline: `b = Py + s(B−Py)`
 * fits eleven frames to 0.2px at Py = 202.3, and no other value does.
 */
export const PIVOT = { x: 355, y: 202.3 } as const;

/** Inter's own metrics; `top = baseline - ASC · size` at `lineHeight: LINE`. */
const ASC = 0.9688;
const LINE = 1.2103;

/** The recording runs out here, and so does this. */
export const END = 46 / 30;

/**
 * The reference's own clock.
 *
 * The recording is 30fps; the page inside it was rendering at **18**, and not
 * approximately — content sample `k` first appears on recorded frame
 * `floor(5k/3)` for all 29 of them, exactly. So the frames these tables were
 * read from are evenly spaced 1/18s apart, and dating them by the recorded
 * frame they happen to land on (1, 2, 2, 1, 2, 2 …) is what put a false
 * velocity spike in the middle of the push: 12px on one frame and 3px on the
 * next, from a camera that is actually smooth.
 */
const KNOT = 1 / 18;

/**
 * A monotone cubic through measured knots — Fritsch–Carlson.
 *
 * The recording is 30fps of a page that was rendering at 18: every third frame
 * is a duplicate of the one before it, so the *content* frames these tables are
 * read from are unevenly spaced, one or two frames apart. Interpolated
 * linearly, that unevenness becomes the animation — the velocity steps at every
 * knot, and a push that is smooth in the reference stutters here.
 *
 * This gives C¹ continuity with no overshoot, so the curve is exactly the
 * measurement at every knot and has no corner between them. Not a fitted
 * easing: an easing would replace the measurement, and this only joins it up.
 */
export function smooth(
  ts: readonly number[],
  vs: readonly number[],
  t: number,
): number {
  const n = ts.length;
  const t0 = ts[0] ?? 0;
  const tn = ts[n - 1] ?? 0;
  if (n === 0) return 0;
  if (t <= t0) return vs[0] ?? 0;
  if (t >= tn) return vs[n - 1] ?? 0;

  const h: number[] = [];
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const step = (ts[i + 1] ?? 0) - (ts[i] ?? 0);
    h.push(step);
    d.push(((vs[i + 1] ?? 0) - (vs[i] ?? 0)) / step);
  }
  const m: number[] = new Array(n).fill(0);
  m[0] = d[0] ?? 0;
  m[n - 1] = d[n - 2] ?? 0;
  for (let i = 1; i < n - 1; i++) {
    const a = d[i - 1] ?? 0;
    const b = d[i] ?? 0;
    // A flat spot at a local extremum is what keeps this from overshooting —
    // and overshoot in a scale table is a camera that visibly bounces.
    if (a * b <= 0) {
      m[i] = 0;
      continue;
    }
    const w1 = 2 * (h[i] ?? 0) + (h[i - 1] ?? 0);
    const w2 = (h[i] ?? 0) + 2 * (h[i - 1] ?? 0);
    m[i] = (w1 + w2) / (w1 / a + w2 / b);
  }

  let i = 0;
  while (i < n - 2 && t > (ts[i + 1] ?? 0)) i++;
  const H = h[i] ?? 1;
  const u = (t - (ts[i] ?? 0)) / H;
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    (vs[i] ?? 0) * (2 * u3 - 3 * u2 + 1) +
    (m[i] ?? 0) * H * (u3 - 2 * u2 + u) +
    (vs[i + 1] ?? 0) * (-2 * u3 + 3 * u2) +
    (m[i + 1] ?? 0) * H * (u3 - u2)
  );
}

function table(v: readonly number[], t: number, from = 0): number {
  return smooth(
    v.map((_, i) => from + i * KNOT),
    v,
    t,
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   The camera
   ───────────────────────────────────────────────────────────────────────── */

/**
 * The scale, one knot per content frame.
 *
 * Read two ways that had to agree and did: from the sub-pixel edges of the four
 * dark cards while they are on screen, and from the headline's own left edge
 * afterwards. Over the four samples where both are legible the two differ by
 * 0.3%.
 *
 * One knot per *content* frame — 1/18s — which is what makes the velocity read
 * as an ease: 0.027, 0.049, 0.085, 0.068, 0.037, 0.024, 0.018, 0.013 per knot
 * through the push, up and then down, with no step in it.
 */
export const S = [
  1.0, 0.9975, 0.9943, 0.9933, 0.9905, 0.9879, 0.9854, 0.984, 0.9812, 0.9788,
  0.9777, 0.9781, 0.9804, 0.982, 0.9874, 0.9937, 1.0033, 1.0123, 1.0338, 1.0611,
  1.1097, 1.1948, 1.2628, 1.2993, 1.3236, 1.3418, 1.3543, 1.3663, 1.3723,
];

/** The scale at time `t`. */
export const scale = (t: number) => table(S, t);

/** A point on the plane, in stage pixels. */
export function place(x: number, y: number, t: number) {
  const s = scale(t);
  return { x: PIVOT.x + s * (x - PIVOT.x), y: PIVOT.y + s * (y - PIVOT.y), s };
}

/* ─────────────────────────────────────────────────────────────────────────
   The work
   ───────────────────────────────────────────────────────────────────────── */

export interface Card {
  /** Top-left on the plane, and the size there. Every card is 16:9. */
  x: number;
  y: number;
  w: number;
  /** Caption drawn on the plate. Replaced entirely when `src` is given. */
  label: string;
  /** A real still. Without one the card is drawn — see `Plate`. */
  src?: string;
  /** The pale card. Exactly one, and it is the one in the middle. */
  paper?: boolean;
  /**
   * How much accent burns through the plate, 0 – 1.
   *
   * Not decoration: the reference's five stills have wildly different energies
   * — interior means of 16, 22, 31 and 50 against a 231 page — and a wall of
   * five identically-lit plates reads as a template. This is that spread, kept.
   */
  heat?: number;
  /** Where the glow sits, in per cent of the card. */
  glow?: readonly [number, number];
  /**
   * Where the card has got to, `t` seconds absolute, one entry per measured
   * frame. The last entry is the last frame it is drawn on; it is gone — hard
   * cut, no fade — one frame later.
   */
  out: readonly { t: number; dx: number; dy: number }[];
  /** The only card that shrinks instead of sliding: it collapses in place. */
  shrink?: number;
}

/** Every card is 16:9, and the aspect is what the heights were checked against. */
const ASPECT = 16 / 9;

/**
 * Five cards, at their measured plane rectangles.
 *
 * The order is the order they leave in, and it is not the reading order: the
 * middle one goes first, then the top-left, then the two along the bottom
 * together, and the loud one on the right last. So the frame empties from its
 * centre outward and the busiest corner is the last thing you lose.
 */
export const CARDS: readonly Card[] = [
  {
    x: 233.7,
    y: 144.23,
    w: 241.59,
    label: "app-reveal",
    paper: true,
    shrink: 0.845,
    out: [
      { t: 11 / 18, dx: 0, dy: 0 },
      { t: 12 / 18, dx: 0, dy: 0 },
    ],
  },
  {
    x: 117.23,
    y: 39.41,
    w: 187.56,
    label: "hex-tally",
    heat: 0.16,
    glow: [58, 96],
    out: [
      { t: 13 / 18, dx: 0, dy: 0 },
      { t: 14 / 18, dx: 49.6, dy: 0 },
      { t: 15 / 18, dx: 75.1, dy: 0 },
    ],
  },
  {
    x: 84.76,
    y: 279.72,
    w: 171.6,
    label: "version-drop",
    heat: 0.74,
    glow: [50, 50],
    out: [
      { t: 15 / 18, dx: 0, dy: 0 },
      { t: 16 / 18, dx: 58.8, dy: 0 },
      { t: 17 / 18, dx: 157.1, dy: 0 },
      { t: 18 / 18, dx: 176.1, dy: 0 },
    ],
  },
  {
    x: 392.37,
    y: 285.67,
    w: 149.21,
    label: "word-rush",
    heat: 0.52,
    glow: [50, 104],
    // The shortest exit of the five: one measured step and then the cut.
    out: [
      { t: 15 / 18, dx: 0, dy: 0 },
      { t: 16 / 18, dx: 0, dy: -15.4 },
    ],
  },
  {
    x: 475.48,
    y: 84.17,
    w: 181.0,
    label: "phone-pitch",
    heat: 0.42,
    glow: [16, 44],
    out: [
      { t: 18 / 18, dx: 0, dy: 0 },
      { t: 19 / 18, dx: 0, dy: 15.2 },
      { t: 20 / 18, dx: 0, dy: 40.6 },
      { t: 21 / 18, dx: 0, dy: 61.1 },
    ],
  },
];

/** Where card `i` has slid to at `t`, and whether it is still drawn at all. */
export function slid(card: Card, t: number) {
  const first = card.out[0];
  const last = card.out[card.out.length - 1];
  if (!first || !last) return { dx: 0, dy: 0, gone: false };
  const ts = card.out.map((k) => k.t);
  return {
    dx: smooth(
      ts,
      card.out.map((k) => k.dx),
      t,
    ),
    dy: smooth(
      ts,
      card.out.map((k) => k.dy),
      t,
    ),
    // Hard cut. The card is at full opacity on the frame before this one —
    // measured, its interior mean moves less than one level across the slide.
    gone: t > last.t + KNOT / 2,
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   The sentence
   ───────────────────────────────────────────────────────────────────────── */

/** The headline, in the plane's own pixels. */
/**
 * The headline, in the plane's own pixels.
 *
 * 26.96, not 37: the *screen* size at the end of the clip is 37 (cap height
 * 27.2 over Inter's 0.7275), and the plane is that divided by the scale the
 * camera has reached there.
 *
 * Weight 400 because the stems say so: the reference's `M` measures 3.65px of
 * coverage across its stem at cap height 27, and Inter at 500 measures 4.25 —
 * 16% heavier, which at this size is the difference between a headline and a
 * *bold* headline.
 */
export const HEAD = {
  size: 26.96,
  weight: 400,
  baseline: 210.1,
  /**
   * Word spacing, in em, on top of the face's own.
   *
   * Measured: the reference sets this line with 7–8px of ink between words at
   * cap height 27, and Inter's own space leaves 13–14. That is not a rounding —
   * it is a headline set tight, and at this size it is the difference between a
   * sentence and five words on a row.
   */
  wordGap: -0.16,
} as const;

export interface Word {
  text: string;
  /** Side of the square the card left behind, on the plane. */
  size: number;
  /** …and how much bigger it is on the frame it appears. */
  pop: number;
  /** The frame the square appears on — one after its card's last. */
  spawn: number;
  /** The frame the square is replaced by the glyphs. Hard cut, like the card. */
  swap: number;
  /** The frame the word is home, at full size, in ink rather than accent. */
  land: number;
  /** How far the accent is lifted toward the paper for this one square. */
  tint: number;
  /**
   * Offset from the word's own slot, on the plane, one entry per measured
   * frame. Not a shared easing: measured, the five approaches are five
   * different curves — two of them travel in x only, two in y only, and one
   * sits still for four frames before it moves at all.
   */
  path: readonly { t: number; dx: number; dy: number }[];
}

/**
 * Five words, five cards, in that order.
 *
 * The copy is ours — the reference is selling somebody else's product — but the
 * shape is what was measured: five words, none of them one letter, and the
 * longest in the middle where the biggest card was.
 */
export const WORDS: readonly Word[] = [
  {
    text: "Turn",
    size: 35,
    pop: 1.36,
    spawn: 13 / 18,
    swap: 17 / 18,
    land: 18 / 18,
    tint: 0.3,
    path: [
      { t: 13 / 18, dx: 133.2, dy: -1 },
      { t: 15 / 18, dx: 133.2, dy: -1 },
      { t: 16 / 18, dx: 47.5, dy: -1 },
      { t: 17 / 18, dx: 23.1, dy: -0.2 },
      { t: 18 / 18, dx: 0, dy: 0 },
    ],
  },
  {
    text: "your",
    size: 33,
    pop: 1,
    spawn: 16 / 18,
    swap: 19 / 18,
    land: 21 / 18,
    tint: 0.3,
    path: [
      { t: 16 / 18, dx: 3.1, dy: -73.6 },
      { t: 17 / 18, dx: 2.6, dy: -40.9 },
      { t: 18 / 18, dx: 3.2, dy: -34.8 },
      { t: 19 / 18, dx: 0.7, dy: -19.1 },
      { t: 20 / 18, dx: 0.7, dy: -20.6 },
      { t: 21 / 18, dx: 0, dy: 0 },
    ],
  },
  {
    text: "product",
    size: 39,
    pop: 1,
    spawn: 19 / 18,
    swap: 22 / 18,
    land: 23 / 18,
    tint: 0.16,
    path: [
      { t: 19 / 18, dx: -4.1, dy: 85.3 },
      { t: 20 / 18, dx: -4.5, dy: 42.7 },
      { t: 21 / 18, dx: -4.2, dy: 33.9 },
      { t: 22 / 18, dx: 0.3, dy: 2.6 },
      { t: 23 / 18, dx: 0, dy: 0 },
    ],
  },
  {
    text: "into",
    size: 29,
    pop: 1,
    spawn: 17 / 18,
    swap: 22 / 18,
    land: 23 / 18,
    tint: 0.31,
    path: [
      { t: 17 / 18, dx: 20.8, dy: 42.5 },
      { t: 18 / 18, dx: 19.7, dy: 20.4 },
      { t: 19 / 18, dx: 20.1, dy: 4 },
      { t: 20 / 18, dx: 20.8, dy: 4.8 },
      { t: 21 / 18, dx: 20.7, dy: 3.9 },
      { t: 22 / 18, dx: 13.9, dy: 0.2 },
      { t: 23 / 18, dx: 0, dy: 0 },
    ],
  },
  {
    text: "video",
    size: 34,
    pop: 1,
    spawn: 22 / 18,
    swap: 25 / 18,
    land: 26 / 18,
    tint: 0.43,
    path: [
      { t: 22 / 18, dx: 35.4, dy: -1 },
      { t: 23 / 18, dx: 6.7, dy: -0.9 },
      { t: 24 / 18, dx: 1.2, dy: -1.2 },
      { t: 25 / 18, dx: 0.4, dy: 0.7 },
      { t: 26 / 18, dx: 0, dy: 0 },
    ],
  },
];

/** How far word `i` still is from its slot, on the plane. */
export function approach(word: Word, t: number) {
  const ts = word.path.map((k) => k.t);
  return {
    dx: smooth(
      ts,
      word.path.map((k) => k.dx),
      t,
    ),
    dy: smooth(
      ts,
      word.path.map((k) => k.dy),
      t,
    ),
  };
}

/**
 * The glyphs arrive at 96% and finish at 100%.
 *
 * Measured on all five: 0.959, 0.961, 0.991, 0.986, 0.943 of the slot's width
 * on the frame they first appear. Four percent is not a pop — it is the last
 * of the approach, and taking it out makes the word look pasted on.
 */
export const ENTER_SCALE = 0.96;

export function wordState(word: Word, t: number) {
  if (t < word.spawn - KNOT / 2) return "hidden" as const;
  if (t < word.swap - KNOT / 2) return "square" as const;
  return "glyphs" as const;
}

/* ─────────────────────────────────────────────────────────────────────────
   Pieces
   ───────────────────────────────────────────────────────────────────────── */

function lift(): { willChange: "transform" } | null {
  return getRemotionEnvironment().isRendering
    ? null
    : { willChange: "transform" };
}

/**
 * A card with no image.
 *
 * Drawn rather than shipped, for the same reason every other card in this
 * registry is: a component cannot carry somebody else's screenshots. Pass `src`
 * on a card and this is replaced wholesale.
 */
function Plate({
  card,
  ink,
  paper,
  accent,
}: {
  card: Card;
  ink: string;
  paper: string;
  accent: string;
}) {
  const h = card.w / ASPECT;
  if (card.paper) {
    // A catalogue: seven columns, three rows, a label under every tile, a bar
    // across the top and one control at the bottom right. Measured off the
    // reference at 0.144w column pitch and 0.263h row pitch — the *density* is
    // the point. Five big blocks read as a chart; twenty-one small ones read as
    // a screen, which is the only thing this card has to say.
    const cols = 7;
    const cell = (i: number) => {
      const cx = card.w * (0.025 + 0.144 * (i % cols));
      const cy = h * (0.13 + 0.263 * Math.floor(i / cols));
      const cw = card.w * 0.128;
      const tint = [
        mixOklch(paper, accent, 0.7),
        mixOklch(paper, ink, 0.55),
        mixOklch(paper, accent, 0.35),
        mixOklch(paper, ink, 0.85),
        mixOklch(paper, accent, 0.55),
      ][(i * 3) % 5] as string;
      const bar = (top: number, w: number, weight: number): CSSProperties => ({
        position: "absolute",
        left: cx,
        top: cy + h * top,
        width: cw * w,
        height: h * 0.022,
        borderRadius: 1,
        background: mixOklch(paper, ink, weight),
      });
      return (
        <div key={`cell-${card.label}-${i}`}>
          <div
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              width: cw,
              height: h * 0.219,
              borderRadius: 2,
              background: tint,
            }}
          />
          <div style={bar(0.232, 0.78, 0.62)} />
          <div style={bar(0.264, 0.42, 0.3)} />
        </div>
      );
    };
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: paper,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: card.w * 0.025,
            top: h * 0.05,
            width: card.w * 0.14,
            height: h * 0.04,
            borderRadius: 1,
            background: mixOklch(paper, ink, 0.68),
          }}
        />
        <div
          style={{
            position: "absolute",
            right: card.w * 0.03,
            top: h * 0.045,
            width: card.w * 0.29,
            height: h * 0.05,
            borderRadius: 2,
            background: mixOklch(paper, ink, 0.09),
          }}
        />
        {Array.from({ length: cols * 3 }, (_, i) => cell(i))}
        <div
          style={{
            position: "absolute",
            right: card.w * 0.075,
            bottom: h * 0.055,
            width: card.w * 0.145,
            height: h * 0.07,
            borderRadius: 999,
            background: ink,
          }}
        />
      </div>
    );
  }
  const heat = card.heat ?? 0.4;
  const [gx, gy] = card.glow ?? [50, 50];
  // A dark plate with one hot spot, not a blue wash.
  //
  // Measured: 61–88% of every still in the reference is under luma 32, and each
  // one carries a *tail* of 4–17% above 96 — a glow, a stadium light, a burst.
  // A plate mixed evenly toward the accent has neither end: it is 100% mid-blue
  // and reads as a placeholder. So the base stays ink, and the light is put in
  // one place.
  const core = mixOklch(accent, paper, 0.26);
  const halo = mixOklch(ink, accent, 0.62);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: [
          `radial-gradient(21% 32% at ${gx}% ${gy}%, ${withAlpha(core, 0.18 + 0.8 * heat)} 0%, ${withAlpha(core, 0)} 62%)`,
          `radial-gradient(78% 108% at ${gx}% ${gy}%, ${withAlpha(halo, 0.46 * heat)} 0%, ${withAlpha(halo, 0)} 72%)`,
          `radial-gradient(120% 130% at ${100 - gx}% ${100 - gy}%, ${withAlpha(halo, 0.16 * heat)} 0%, ${withAlpha(halo, 0)} 66%)`,
          ink,
        ].join(", "),
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: h * 0.44,
          textAlign: "center",
          color: withAlpha(paper, 0.82),
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: Math.round(card.w * 0.078),
          letterSpacing: card.w * 0.004,
          textRendering: "geometricPrecision",
        }}
      >
        {card.label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface ProofLineProps {
  /** The sentence. One entry per card, in the order the cards leave. */
  words?: readonly Word[];
  /** The work on the stage. */
  cards?: readonly Card[];
  /** The colour the squares are painted in, lifted per word by `tint`. */
  accent?: string;
  /** The stage. Defaults to a shade under the page, which is what was measured. */
  surface?: string;
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";
  fontFamily?: string;
  /** 1 = the reference's clock. */
  speed?: number;
}

export function ProofLine({
  words = WORDS,
  cards = CARDS,
  accent,
  surface,
  theme,
  mode,
  fontFamily,
  speed = 1,
}: ProofLineProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const th = useSnapCnTheme(theme, mode);
  const t = (frame / fps) * speed;

  const face = resolveFont(fontFamily ?? th.fontFamily) ?? SANS;
  const hot = accent ?? th.primary;
  const ink = th.foreground;
  const paper = th.card;
  // The stage is a shade *under* the page, not the page: measured #e7e7e7
  // against a white card, which is the same step `muted` already is.
  const stage = surface ?? mixOklch(th.background, th.foreground, 0.09);

  const s = scale(t);
  // `cover`, so a 16:9 composition crops the reference's 712×390 rather than
  // letterboxing it.
  const k = Math.max(width / REF_W, height / REF_H);

  const headSize = HEAD.size * s;

  return (
    <AbsoluteFill style={{ background: stage }}>
      <AbsoluteFill
        style={{
          width: REF_W,
          height: REF_H,
          left: (width - REF_W * k) / 2,
          top: (height - REF_H * k) / 2,
          transform: `scale(${k})`,
          transformOrigin: "top left",
          overflow: "hidden",
        }}
      >
        {cards.map((card) => {
          const { dx, dy, gone } = slid(card, t);
          if (gone) return null;
          const own = card.shrink
            ? interpolate(
                t,
                [card.out[0]?.t ?? 0, card.out[card.out.length - 1]?.t ?? 1],
                [1, card.shrink],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            : 1;
          const h = card.w / ASPECT;
          const cx = card.x + card.w / 2 + dx;
          const cy = card.y + h / 2 + dy;
          const p = place(cx, cy, t);
          return (
            <div
              key={card.label}
              style={{
                position: "absolute",
                left: p.x - (card.w * s * own) / 2,
                top: p.y - (h * s * own) / 2,
                width: card.w * s * own,
                height: h * s * own,
                overflow: "hidden",
                ...lift(),
              }}
            >
              {card.src ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${card.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <Plate
                  card={card}
                  ink={th.foreground}
                  paper={paper}
                  accent={hot}
                />
              )}
            </div>
          );
        })}

        {/* The sentence. Laid out in full from the first frame — measured, the
            words that have arrived already sit where the *finished* line puts
            them, so the line never reflows and nothing slides sideways when a
            word lands. */}
        <div
          style={{
            position: "absolute",
            // The line is centred on the pivot itself, so the camera never
            // moves it sideways — only its size changes.
            left: PIVOT.x,
            top: place(0, HEAD.baseline - ASC * HEAD.size, t).y,
            transform: "translateX(-50%)",
            width: "max-content",
            whiteSpace: "nowrap",
            fontFamily: face,
            fontWeight: HEAD.weight,
            fontSize: headSize,
            lineHeight: LINE,
            wordSpacing: HEAD.wordGap * headSize,
            color: ink,
            textRendering: "geometricPrecision",
            ...lift(),
          }}
        >
          {words.map((word, i) => {
            const state = wordState(word, t);
            const { dx, dy } = approach(word, t);
            const enter = interpolate(
              t,
              [word.swap, word.land],
              [ENTER_SCALE, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            const tint = mixOklch(hot, paper, word.tint);
            const side = word.size * s;
            const pop = interpolate(
              t,
              [word.spawn, word.spawn + KNOT],
              [word.pop, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return (
              <span
                key={`${word.text}-${i}`}
                // `inline-block`, so the square's `top: 0` is the line box's own
                // top and not whatever the inline content area happens to be.
                // Its baseline is still the last line box's, so the sentence sits
                // on one baseline (an `inline-flex` here would not — it takes its
                // baseline from a flex item, which is a 3px drop nobody sees
                // until they diff it).
                style={{ position: "relative", display: "inline-block" }}
              >
                <span
                  style={{
                    visibility: state === "glyphs" ? "visible" : "hidden",
                    display: "inline-block",
                    color: t < word.land - KNOT / 2 ? tint : ink,
                    transform: `translate(${dx * s}px, ${dy * s}px) scale(${enter})`,
                    // On the baseline. A centre-pivoted scale on type climbs the
                    // pixel grid in whole-pixel jumps and reads as judder.
                    transformOrigin: `50% ${(100 * ASC) / LINE}%`,
                  }}
                >
                  {word.text}
                </span>
                {/* A bare " " here is dropped: it is the last thing inside an
                    inline-block, and white-space processing strips a trailing
                    space from a line box. `pre` on its own span is what keeps
                    the sentence from running together. */}
                {i < words.length - 1 ? (
                  <span style={{ whiteSpace: "pre" }}> </span>
                ) : null}
                {state === "square" ? (
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      // Measured: the square's centre sits 10.87 plane-px above
                      // the baseline on all five — 0.294em — and the span's top
                      // is ASC above the baseline.
                      top: (ASC - 0.2938) * headSize,
                      width: side * pop,
                      height: side * pop,
                      marginLeft: (-side * pop) / 2,
                      marginTop: (-side * pop) / 2,
                      background: tint,
                      transform: `translate(${dx * s}px, ${dy * s}px)`,
                      ...lift(),
                    }}
                  />
                ) : null}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export default ProofLine;
