"use client";

import { loadFont as loadSans } from "@remotion/google-fonts/Geist";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  getRemotionEnvironment,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  mixOklch,
  resolveFont,
  type SnapCnTheme,
  useSnapCnTheme,
} from "@/lib/snap-cn-ui";

/**
 * Cross out the advice, then name the thing it was standing in for.
 *
 * A headline sits on a card. Two marker strokes cross it out, hold, and are
 * wiped back off the way they came — and as they go, the two words drift apart
 * and the card grows to hold them. Hard cut to black, and the real sentence
 * builds a word at a time over a dashed diagram.
 *
 * Two beats, one cut, at frame 30.
 *
 * ## The reference is 24fps and this is 30
 *
 * The recording it was measured from is a 24fps piece captured by a 120Hz
 * screen grabber, so its packets land irregularly *and* repeat: eight of the
 * 38 recorded frames are the frame before it, held. Reading it as "frame n of
 * a 24fps clip" would be wrong twice over. Every table here is therefore keyed
 * by **this** composition's frame — the recorded frame's own timestamp times
 * 30 — which is the only clock both clips share.
 *
 * ## The marker is geometry, not a picture
 *
 * A brush stroke is a centreline, a width that swells and tapers along it, and
 * an edge that is never quite straight. All three are measured off the
 * reference (`STROKE_A`, `STROKE_B`) and `brush()` turns them back into a
 * polygon; the ragged edge is value noise with a fixed seed, so it is the same
 * on every render and on every machine. Drawing on and wiping off are then the
 * same operation — ask for the polygon of the arclength range `[tail, head]`
 * — rather than a dash offset, which cannot taper and cannot chop an end.
 *
 * ## The card is the text plus a margin
 *
 * Solved back out of the recording, the card's left edge sits 52.7px left of
 * the headline's first glyph on all 25 frames of the first beat (±0.2) while
 * its top never moves at all. So the card is not animated: it is
 * `width: max-content` around a line whose word gap grows from 19px to 76, and
 * everything you see it do is the text doing it.
 */

const { fontFamily: SANS } = loadSans("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   The stage, in the reference's own 710 × 400 pixels
   ───────────────────────────────────────────────────────────────────────── */

export const REF_W = 710;
export const REF_H = 400;

/** The hard cut from the card to the diagram. */
export const CUT = 30;
/** The recording runs out here, and so does this. */
export const END = 46;

export type Pt = readonly [number, number];

/** Linear read of a `[key, value]` table, clamped at both ends. */
export function track(table: readonly Pt[], at: number): number {
  const first = table[0];
  const last = table[table.length - 1];
  if (!first || !last) return 0;
  if (at <= first[0]) return first[1];
  if (at >= last[0]) return last[1];
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (!a || !b) break;
    if (at <= b[0]) {
      const t = (at - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * t;
    }
  }
  return last[1];
}

/* ─────────────────────────────────────────────────────────────────────────
   Beat one — the card
   ───────────────────────────────────────────────────────────────────────── */

/** The card's top edge. Measured on all 25 frames of the beat: it never moves. */
export const CARD_TOP = 113.7;
/** Its top-left corner, solved off the arc between y = 130 and y = 190. */
export const CARD_RADIUS = 87.4;
/**
 * The gap between the card's left edge and the headline's first glyph.
 *
 * This is the number that says the card is not animated. Measured frame by
 * frame it is 52.73 ± 0.15 across the whole beat while the card's left edge
 * travels 32px, so the card is the text's own box plus a margin and nothing
 * else — which is also why it is right for copy that is not the reference's.
 */
export const CARD_PAD = 52.73;

/** Headline cap height at scale 1, in stage px. Measured on the "F". */
export const HEAD_CAP = 45.6;

/**
 * The second word sits 1.86px lower than the first.
 *
 * Not a rounding error and not a slope: measured on the `i` stem of each word,
 * which is the same glyph in both, the two baselines are 219.30 and 221.16 at
 * the first frame and stay that far apart for the whole beat. The words are two
 * separately placed blocks, and setting them on one baseline is the single most
 * visible thing you can get wrong about this headline.
 */
export const WORD2_DY = 1.86;

/**
 * The beat scales about a point off the bottom-left of the frame.
 *
 * The headline's baseline climbs 4.5px while it grows 1.7%, and the two are the
 * same event: solving `base(s) = P − (P − base₁)·s` over the whole beat puts P
 * at y = 490 to a third of a pixel on every frame. So the baseline is not a
 * table, it is the scale — which also means it cannot drift away from the type
 * it is carrying.
 */
export const PIVOT_Y = 490;
export const BASE_1 = 214.75;

/**
 * Where the line's centre sits, per frame.
 *
 * It creeps 6px right over the first ten frames and then drops back 4 in the
 * last two — the reference's own framing, not a drift worth smoothing out.
 */
export const CENTRE: readonly Pt[] = [
  [0, 414.25],
  [1, 415.83],
  [2, 417.1],
  [3, 418.08],
  [5, 418.65],
  [6, 419.27],
  [7, 419.63],
  [9, 419.98],
  [11, 420.13],
  [13, 420.33],
  [15, 420.16],
  [18, 420.13],
  [21, 420.27],
  [23, 420.52],
  [26, 420.23],
  [27, 415.82],
  [29, 415.83],
];

/**
 * The headline's scale.
 *
 * A settle, not a zoom: 1.7% over the first nine frames and then nothing. It
 * is pivoted on the **baseline**, which is the only pivot that does not make
 * the type climb the pixel grid in whole-pixel jumps as it grows.
 */
export const HEAD_SCALE: readonly Pt[] = [
  [0, 0.9835],
  [1, 0.9884],
  [2, 0.9911],
  [3, 0.9944],
  [5, 0.9964],
  [6, 0.9972],
  [7, 0.9988],
  [9, 0.9996],
  [11, 1],
];

/** The word gap. Flat for half the beat, then it opens, and then it flies. */
export const GAP: readonly Pt[] = [
  // Flat, not 18.95 → 19.14 → 19.06: the reference's own edge is a pixel and
  // a half of antialiasing and reading it frame by frame gives ±0.15 of
  // nothing. Held here, because a gap that jitters before it opens reads as
  // the words breathing.
  [0, 19.05],
  [13, 19.05],
  [14, 19.4],
  [15, 20.2],
  [17, 20.2],
  [18, 21.5],
  [19, 23.45],
  [20, 25.75],
  [21, 29.22],
  [23, 33.92],
  [24, 39.34],
  [26, 47.29],
  [27, 76.23],
  [29, 76.23],
];

/** The baseline, at a scale. */
export function baselineAt(scale: number): number {
  return PIVOT_Y - (PIVOT_Y - BASE_1) * scale;
}

/* ─────────────────────────────────────────────────────────────────────────
   The marker
   ───────────────────────────────────────────────────────────────────────── */

/**
 * A stroke: a measured centreline, a half-width along it, and a seed.
 *
 * The half-width is **perpendicular** to the spine. It is not what a column
 * scan of the recording reports — that is the vertical chord, which for a
 * stroke leaning 37° off the horizontal is 26% too wide — so each reading is
 * taken back through `cos(atan(slope))` before it lands here.
 */
export type Stroke = {
  readonly spine: readonly Pt[];
  readonly width: readonly Pt[];
  readonly seed: number;
};

/** The shallow stroke, upper-left to lower-right. */
export const STROKE_A: Stroke = {
  spine: [
    [164, 93.3],
    [168, 96.3],
    [176, 100.9],
    [184, 107.5],
    [192, 115.7],
    [200, 121.6],
    [208, 127.0],
    [216, 134.3],
    [224, 139.6],
    [232, 146.4],
    [240, 151.7],
    [248, 157.0],
    [256, 163.0],
    [264, 168.7],
    [272, 174.7],
    [288, 187.0],
    [304, 199.3],
    [312, 204.6],
    [320, 210.1],
    [328, 217.1],
    [336, 221.7],
    [344, 226.9],
    [352, 233.7],
    [360, 237.8],
    [368, 243.7],
    [376, 251.0],
    [384, 258.2],
    [392, 264.6],
    [400, 271.1],
    [408, 277.7],
    [416, 286.3],
    [417.5, 287.5],
  ],
  width: [
    [0, 0.6],
    [0.02, 2.6],
    [0.06, 6.1],
    [0.1, 6.6],
    [0.2, 7.4],
    [0.35, 7.9],
    [0.5, 8.2],
    [0.62, 8.4],
    [0.78, 9.4],
    [0.88, 9.6],
    [0.95, 7.0],
    [1, 1.8],
  ],
  seed: 3,
};

/** The steep stroke, top-right to bottom-left. */
export const STROKE_B: Stroke = {
  spine: [
    [345.6, 45.5],
    [344.4, 48],
    [343.7, 56],
    [340.3, 64],
    [336.6, 72],
    [332.9, 80],
    [329.8, 88],
    [327.5, 96],
    [325.1, 104],
    [321.4, 112],
    [317.8, 120],
    [315.1, 128],
    [311.9, 136],
    [307.9, 144],
    [304.7, 152],
    [301.6, 160],
    [293.5, 184],
    [285.0, 208],
    [278.5, 216],
    [275.5, 224],
    [273.3, 232],
    [268.6, 240],
    [266.1, 248],
    [264.8, 256],
    [261.3, 264],
    [257.5, 272],
    [255.7, 280],
    [253.4, 288],
    [251.2, 296],
    [245.2, 304],
    [242.2, 312],
    [240.5, 320],
    [237.6, 328],
    [231.9, 336],
    [231.4, 344],
    [226.8, 352],
    [223.7, 360],
    [222.2, 365.5],
  ],
  width: [
    [0, 0.8],
    [0.02, 3.0],
    [0.06, 4.7],
    [0.09, 5.6],
    [0.13, 8.4],
    [0.22, 9.3],
    [0.3, 11.4],
    [0.4, 11.8],
    [0.5, 13.4],
    [0.6, 13.6],
    [0.7, 11.6],
    [0.8, 12.8],
    [0.88, 11.4],
    [0.93, 8.0],
    [0.97, 4.0],
    [1, 1.6],
  ],
  seed: 11,
};

/**
 * How far along each stroke the marker has reached, and how far the wipe has
 * eaten in behind it. Both are fractions of the stroke's own arclength, so a
 * stroke that is re-pathed keeps its timing.
 */
export const A_HEAD: readonly Pt[] = [
  [2, 0],
  [3, 0.114],
  [5, 0.553],
  [6, 0.851],
  [7, 0.945],
  [9, 0.992],
  [11, 1],
];
export const A_TAIL: readonly Pt[] = [
  [13, 0],
  [15, 0.016],
  [17, 0.016],
  [18, 0.141],
  [19, 0.498],
  [20, 0.722],
  [21, 0.847],
  [23, 0.902],
  [24, 1],
];
export const B_HEAD: readonly Pt[] = [
  [0, 0],
  [1, 0.015],
  [2, 0.046],
  [3, 0.152],
  [5, 0.511],
  [6, 0.827],
  [7, 0.938],
  [9, 0.975],
  [11, 1],
];
export const B_TAIL: readonly Pt[] = [
  [13, 0],
  [15, 0.068],
  [17, 0.068],
  [18, 0.192],
  [19, 0.44],
  [20, 0.737],
  [21, 0.842],
  [23, 0.916],
  [25, 0.954],
  [26, 1],
];

/** Cumulative arclength of a spine. */
export function arclength(spine: readonly Pt[]): number[] {
  const out = [0];
  for (let i = 1; i < spine.length; i++) {
    const a = spine[i - 1];
    const b = spine[i];
    if (!a || !b) break;
    out.push((out[i - 1] ?? 0) + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  return out;
}

/** Point and unit normal at fraction `u` of a spine's arclength. */
export function along(spine: readonly Pt[], cum: number[], u: number) {
  const total = cum[cum.length - 1] ?? 1;
  const s = Math.max(0, Math.min(total, u * total));
  let i = 1;
  while (i < cum.length - 1 && (cum[i] ?? 0) < s) i++;
  const a = spine[i - 1] ?? [0, 0];
  const b = spine[i] ?? a;
  const seg = (cum[i] ?? 0) - (cum[i - 1] ?? 0) || 1;
  const t = (s - (cum[i - 1] ?? 0)) / seg;
  const dx = (b[0] - a[0]) / seg;
  const dy = (b[1] - a[1]) / seg;
  return {
    x: a[0] + (b[0] - a[0]) * t,
    y: a[1] + (b[1] - a[1]) * t,
    nx: -dy,
    ny: dx,
  };
}

/**
 * The brush's ragged edge: three octaves of value noise, hashed off `seed`.
 *
 * Deterministic on purpose. A stroke that re-rolls its own edge every frame
 * does not read as ink drying, it reads as static.
 */
export function wobble(u: number, seed: number): number {
  const hash = (i: number, s: number) => {
    const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  let v = 0;
  let amp = 1;
  let freq = 90;
  for (let o = 0; o < 3; o++) {
    const t = u * freq;
    const i = Math.floor(t);
    const f = t - i;
    const s = f * f * (3 - 2 * f);
    v += amp * (hash(i, seed + o) * (1 - s) + hash(i + 1, seed + o) * s - 0.5);
    amp *= 0.5;
    freq *= 2.4;
  }
  return v;
}

/** How much of the half-width the ragged edge is worth. */
export const ROUGH = 0.28;

/** The outline of the arclength range `[a, b]` of a stroke, as SVG path data. */
export function brush(
  stroke: Stroke,
  a: number,
  b: number,
  steps = 110,
): string {
  if (!(b - a > 1e-4)) return "";
  const cum = arclength(stroke.spine);
  const left: string[] = [];
  const right: string[] = [];
  for (let k = 0; k <= steps; k++) {
    const u = a + ((b - a) * k) / steps;
    const p = along(stroke.spine, cum, u);
    const w = track(stroke.width, u);
    const wl = Math.max(0.2, w * (1 + ROUGH * wobble(u, stroke.seed)));
    const wr = Math.max(0.2, w * (1 + ROUGH * wobble(u, stroke.seed + 17)));
    left.push(
      `${(p.x + p.nx * wl).toFixed(2)} ${(p.y + p.ny * wl).toFixed(2)}`,
    );
    right.push(
      `${(p.x - p.nx * wr).toFixed(2)} ${(p.y - p.ny * wr).toFixed(2)}`,
    );
  }
  right.reverse();
  return `M ${left.join(" L ")} L ${right.join(" L ")} Z`;
}

/* ─────────────────────────────────────────────────────────────────────────
   Beat two — the diagram
   ───────────────────────────────────────────────────────────────────────── */

/** Both circles, measured: same radius, same row, 327 apart at the cut. */
export const CIRCLE = { cy: 199.5, r: 113.9 } as const;
/** The second circle and its full-height axis arrive a beat after the first. */
export const RIGHT_AT = 33;
/** The two labels arrive with the last word. */
export const LABEL_AT = 41;

/** The left group's axis, per frame. */
export const GUIDE_L: readonly Pt[] = [
  [30, 173.07],
  [31, 176.16],
  [33, 177.92],
  [35, 179.93],
  [37, 180.64],
  [39, 180.94],
  [41, 181.92],
  [43, 181.98],
  [44, 182.9],
  [46, 184.2],
];
/** The right group's, which opens away from it by six pixels as it goes. */
export const GUIDE_R: readonly Pt[] = [
  [33, 504.75],
  [35, 509.78],
  [37, 511.92],
  [39, 513.24],
  [41, 514.67],
  [43, 514.94],
  [44, 515.96],
  [46, 517.5],
];

/** The right edge of the phrase — it is built right to left, so this anchors it. */
export const PHRASE_R: readonly Pt[] = [
  [30, 624],
  [31, 636],
  [33, 643],
  [35, 647],
  [37, 651],
  [39, 653],
  [41, 655],
  [42, 656],
  [44, 657],
  [46, 658.5],
];

/** The phrase's baseline, its x-height, and the ink between its words. */
export const PHRASE_BASE = 221.86;
export const PHRASE_X = 42.13;
export const PHRASE_GAP = 30.5;
/**
 * The second beat is set a shade looser than the first — measured, −0.028em
 * against −0.038 — which at this size is a pixel and a half a letter and is
 * the difference between a line that reads as a sentence and one that reads as
 * a logo.
 */
export const PHRASE_TRACKING = -0.028;
/** Ink-to-ink again: the side bearings at each join, and the trailing space. */
export const PHRASE_GAP_BIAS = 2.5;
export const PHRASE_R_BIAS = 0;

/**
 * When each word lands, counting from the **last** one — which is already
 * there when the cut happens, because it is the word the first beat crossed
 * out and the whole point is that it survived.
 */
export const WORD_AT: readonly number[] = [CUT, CUT + 6.6, CUT + 11];

/**
 * A word arrives a few pixels left of where it belongs and slides in — all of
 * them except the last, which is not arriving at all. It is the word the first
 * beat crossed out; it is already on screen when the cut happens, and what it
 * does after that is `PHRASE_R`.
 */
export const WORD_IN: readonly Pt[] = [
  [0, -8],
  [0.4, -3],
  [2, -2],
  [3, -1],
  [5, 0],
];

/** The labels separate as they arrive, and are still separating at the end. */
export const LABEL_UP: readonly Pt[] = [
  [41, 0],
  [42, -3],
  [44, -5],
  [46, -7],
];
export const LABEL_DOWN: readonly Pt[] = [
  [41, 0],
  [42, 6],
  [44, 8],
  [46, 10],
];
export const LABEL_TOP = 70;
export const LABEL_BOTTOM = 302;
export const LABEL_SIZE = 15;
/** They hang off the second circle's axis, right-aligned, three pixels clear. */
export const LABEL_RIGHT = -3.2;

/* ─────────────────────────────────────────────────────────────────────────
   The component
   ───────────────────────────────────────────────────────────────────────── */

export type CrossOutProps = {
  /** The two words on the card. Only the second one survives the cut. */
  headline?: readonly [string, string];
  /** The sentence the cut lands on, built right to left. */
  phrase?: readonly string[];
  /** What the two circles are. */
  labels?: readonly [string, string];
  /** The marker. This one *is* the design, so it is a prop and not a token. */
  marker?: string;
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";
  fontFamily?: string;
  speed?: number;
};

export function CrossOut({
  headline = ["Hand-code", "Demos"],
  phrase = ["but", "your", "demos"],
  labels = ["Remotion", "shadcn"],
  marker = "#25c26a",
  theme,
  mode = "light",
  fontFamily,
  speed = 1,
}: CrossOutProps) {
  const rawFrame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = useSnapCnTheme(theme, mode);
  const f = rawFrame * speed;
  const face = resolveFont(fontFamily ?? t.fontFamily) ?? SANS;

  /**
   * The paper is a shade warmer and a shade deeper than `background`, and the
   * card is the same walk again — measured #f0eeeb and #e6e1e0, both landed
   * exactly by `mixOklch` so a user's own palette still moves them.
   */
  const paper = mixOklch(t.background, "#cfc9c4", 0.218);
  const card = mixOklch(paper, "#cfc9c4", 0.31);
  const ink = mixOklch(t.foreground, "#000000", 0.722);
  const night = ink;

  // `cover`, so a 16:9 composition crops the reference's 710×400 rather than
  // letterboxing it.
  const k = Math.max(width / REF_W, height / REF_H);
  const dark = f >= CUT;

  return (
    <AbsoluteFill style={{ background: dark ? night : paper }}>
      <AbsoluteFill
        style={{
          width: REF_W,
          height: REF_H,
          left: (width - REF_W * k) / 2,
          top: (height - REF_H * k) / 2,
          transform: `scale(${k})`,
          transformOrigin: "top left",
          overflow: "hidden",
          fontFamily: face,
          // Hinting re-snaps every stem as the headline scales, and the
          // letterforms visibly boil. Off, for the whole scene.
          textRendering: "geometricPrecision",
        }}
      >
        {dark ? (
          <Diagram
            frame={f}
            phrase={phrase}
            labels={labels}
            night={night}
            paper={paper}
          />
        ) : (
          <Slate
            frame={f}
            headline={headline}
            card={card}
            paper={paper}
            ink={ink}
            marker={marker}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Type metrics
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Cap height and baseline position of the face, as fractions of the font size.
 *
 * Both are needed because everything in this scene is positioned off the
 * *baseline* — which is what the type actually sits on and the only thing that
 * stays put while the size settles. `line-height: 1` puts the baseline at
 * `BASELINE × size` below the block's top, and the reference gives cap heights,
 * so `CAP` is what turns one into the other.
 */
export const CAP = 0.7048;
export const XHEIGHT = 0.546;
export const BASELINE = 0.8534;

/**
 * Tracking.
 *
 * The reference's face is not one Google serves — its advances fit Helvetica's
 * to half a pixel across twelve letters — so the width is matched rather than
 * the face: at the measured cap height the stand-in runs 2% wide, and this
 * takes it back. Matching the *width* is the right thing to match, because it
 * is what decides where every other thing in the shot sits.
 */
export const TRACKING = -0.0383;

/**
 * Everything measured off a recording is ink to ink. CSS lays out box to box,
 * and the two differ by the side bearings of whichever glyphs happen to be at
 * the join — plus the letter-space CSS puts after the *last* character of a
 * run, which no typesetter ever asked for. These two take the measurements
 * back into layout space, and they are the reason the headline lands on the
 * reference's own pixels rather than five of them to the right.
 */
export const GAP_BIAS = 5.9;
export const CENTRE_BIAS = -2.15;
export const PAD_BIAS = 2.9;
/** The card's own edge, which the text is laid out inside of. */
export const CARD_BORDER = 2;

/* ─────────────────────────────────────────────────────────────────────────
   Beat one
   ───────────────────────────────────────────────────────────────────────── */

function Slate({
  frame,
  headline,
  card,
  paper,
  ink,
  marker,
}: {
  frame: number;
  headline: readonly [string, string];
  card: string;
  paper: string;
  ink: string;
  marker: string;
}) {
  const rendering = getRemotionEnvironment().isRendering;
  const scale = track(HEAD_SCALE, frame);
  const size = (HEAD_CAP / CAP) * scale;
  const centre = track(CENTRE, frame);
  const base = baselineAt(scale);
  const gap = track(GAP, frame) - GAP_BIAS;

  const a = brush(STROKE_A, track(A_TAIL, frame), track(A_HEAD, frame));
  const b = brush(STROKE_B, track(B_TAIL, frame), track(B_HEAD, frame));

  const cardStyle: CSSProperties = {
    position: "absolute",
    left: centre + CENTRE_BIAS,
    top: CARD_TOP,
    transform: "translateX(-50%)",
    // Off the bottom of the frame, the way the reference's is: the card is a
    // panel the shot is cropped into, not a chip sitting on a page.
    height: REF_H - CARD_TOP + 140,
    padding: `0 ${CARD_PAD - PAD_BIAS}px`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "flex-start",
    borderRadius: CARD_RADIUS,
    background: card,
    /**
     * Read across the edge, the reference goes
     *   238 → 230 230 → 239 → 244 → 242 → 235 → 231 231 231 → 230 → 228
     * — the page, a two-pixel band a shade darker, and then a bright ring that
     * peaks *above* the page before falling back to the surface over seven
     * pixels. That is the whole of the card's relief: there is no drop shadow
     * anywhere in this shot, and adding one on a warm off-white page is how a
     * card like this turns into a grey smear.
     *
     * Inset rings rather than a gradient because a gradient has a direction
     * and an edge does not — these follow the corner round.
     */
    border: `${CARD_BORDER}px solid ${mixOklch(paper, "#000000", 0.031)}`,
    boxShadow: [
      `inset 0 0 0 1px ${mixOklch(paper, "#cfc9c4", 0.038)}`,
      `inset 0 0 0 2px ${mixOklch(paper, "#fffdf8", 0.236)}`,
      `inset 0 0 0 3px ${mixOklch(paper, "#fffdf8", 0.099)}`,
      `inset 0 0 0 4px ${mixOklch(card, "#ffffff", 0.219)}`,
      `inset 0 0 0 7px ${mixOklch(card, "#ffffff", 0.085)}`,
    ].join(", "),
    ...(rendering ? null : { willChange: "transform" as const }),
  };

  return (
    <>
      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            gap,
            marginTop: base - CARD_TOP - size * BASELINE,
            fontSize: size,
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: `${TRACKING}em`,
            color: ink,
            whiteSpace: "pre",
          }}
        >
          <span>{headline[0]}</span>
          <span style={{ position: "relative", top: WORD2_DY * scale }}>
            {headline[1]}
          </span>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${REF_W} ${REF_H}`}
        width={REF_W}
        height={REF_H}
        style={{ position: "absolute", left: 0, top: 0 }}
        aria-hidden
      >
        <title>crossed out</title>
        {a ? <path d={a} fill={marker} /> : null}
        {b ? <path d={b} fill={marker} /> : null}
      </svg>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Beat two
   ───────────────────────────────────────────────────────────────────────── */

/** When the nth word from the end of the phrase lands. */
export function wordAt(fromRight: number): number {
  const known = WORD_AT[fromRight];
  if (known !== undefined) return known;
  const last = WORD_AT[WORD_AT.length - 1] ?? CUT;
  return last + 5 * (fromRight - WORD_AT.length + 1);
}

function Diagram({
  frame,
  phrase,
  labels,
  night,
  paper,
}: {
  frame: number;
  phrase: readonly string[];
  labels: readonly [string, string];
  night: string;
  paper: string;
}) {
  const gl = track(GUIDE_L, frame);
  const gr = track(GUIDE_R, frame);
  const right = track(PHRASE_R, frame);
  const size = PHRASE_X / XHEIGHT;
  // Six per cent of the page colour on black. It is meant to be at the edge of
  // visible — construction the shot was built on, left showing.
  const guide = mixOklch(night, paper, 0.23);
  const label = mixOklch(night, paper, 0.92);

  const dash = "5 5";
  const arc = (cx: number) => (
    <>
      <circle
        cx={cx}
        cy={CIRCLE.cy}
        r={CIRCLE.r}
        fill="none"
        stroke={guide}
        strokeWidth={1}
        strokeDasharray={dash}
      />
    </>
  );

  return (
    <>
      <svg
        viewBox={`0 0 ${REF_W} ${REF_H}`}
        width={REF_W}
        height={REF_H}
        style={{ position: "absolute", left: 0, top: 0 }}
        aria-hidden
      >
        <title>the diagram it was drawn on</title>
        <g>
          {arc(gl)}
          {/* the first circle's own axis, and the pair of guides that run off
              the left edge to meet it at its poles */}
          <line
            x1={gl}
            y1={CIRCLE.cy - CIRCLE.r}
            x2={gl}
            y2={CIRCLE.cy + CIRCLE.r}
            stroke={guide}
            strokeWidth={1}
            strokeDasharray={dash}
          />
          <line
            x1={gl - 240}
            y1={CIRCLE.cy - CIRCLE.r - 47.3}
            x2={gl}
            y2={CIRCLE.cy - CIRCLE.r}
            stroke={guide}
            strokeWidth={1}
            strokeDasharray={dash}
          />
          <line
            x1={gl - 240}
            y1={CIRCLE.cy + CIRCLE.r + 47.3}
            x2={gl}
            y2={CIRCLE.cy + CIRCLE.r}
            stroke={guide}
            strokeWidth={1}
            strokeDasharray={dash}
          />
        </g>
        {frame >= RIGHT_AT ? (
          <g>
            {arc(gr)}
            {/* this one's axis is the whole frame tall, not the circle's */}
            <line
              x1={gr}
              y1={-20}
              x2={gr}
              y2={REF_H + 20}
              stroke={guide}
              strokeWidth={1}
              strokeDasharray={dash}
            />
          </g>
        ) : null}
      </svg>

      {frame >= LABEL_AT ? (
        <>
          <Label
            text={labels[0]}
            right={gr + LABEL_RIGHT}
            top={LABEL_TOP + track(LABEL_UP, frame)}
            color={label}
          />
          <Label
            text={labels[1]}
            right={gr + LABEL_RIGHT}
            top={LABEL_BOTTOM + track(LABEL_DOWN, frame)}
            color={label}
          />
        </>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: PHRASE_BASE - size * BASELINE,
          width: right + PHRASE_R_BIAS,
          display: "flex",
          justifyContent: "flex-end",
          gap: PHRASE_GAP - PHRASE_GAP_BIAS,
          fontSize: size,
          lineHeight: 1,
          fontWeight: 500,
          letterSpacing: `${PHRASE_TRACKING}em`,
          color: paper,
          whiteSpace: "pre",
        }}
      >
        {phrase.map((w, i) => {
          const fromRight = phrase.length - 1 - i;
          const at = wordAt(fromRight);
          const shown = frame >= at;
          const slide = fromRight === 0 ? 0 : track(WORD_IN, frame - at);
          return (
            <span
              key={`${w}-${i + 1}`}
              style={{
                display: shown ? "block" : "none",
                transform: `translateX(${slide}px)`,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </>
  );
}

function Label({
  text,
  right,
  top,
  color,
}: {
  text: string;
  right: number;
  top: number;
  color: string;
}): ReactNode {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: right,
        textAlign: "right",
        fontSize: LABEL_SIZE,
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: "-0.018em",
        color,
        whiteSpace: "pre",
      }}
    >
      {text}
    </div>
  );
}
