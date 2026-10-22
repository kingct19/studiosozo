"use client";

import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";
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
 * A line types itself into an editor, the editor is pushed at you, and the
 * string literal walks out of the code as the word it was.
 *
 * Two shots, one hard cut at 2.44s, and the cut is the whole idea: the last
 * thing on screen before it is `"motion"` in green monospace inside a code
 * window, and the first thing after it is `motion` in green monospace on black
 * at four times the size. Same word, same colour, same face — so the eye reads
 * one object moving, not two shots. Then, letter by letter, it turns white and
 * becomes the display face, and by the time it has finished it is a headline.
 *
 * | beat | seconds | what happens |
 * | --- | --- | --- |
 * | type | 0 – 2.44 | 38 characters at 17.5 a second, two lines, syntax coloured |
 * | push | 0.55 – 1.15 | the window goes from 1.03× to 3.48× — most of it in 0.2s |
 * | cut | 2.44 | hard. Mean frame luminance 82 → 16 in one frame |
 * | swap | 2.53 – 2.94 | eight letters cross from green mono to white sans, left to right |
 *
 * ## The push is a table because it is not a curve
 *
 * Measured off the dots in the window's chrome, sub-pixel, frame by frame: the
 * scale holds near 1.0 for half a second, then covers 60% of its whole travel
 * in **four frames** (1.64 → 2.34 → 2.70 → 3.05), then spends the next 1.3s
 * creeping from 3.5 to 4.3. Normalised, the middle of that ramp moves 0.46 of
 * its range in one step out of nine. No cubic-bezier does that; it is a punch
 * with a long tail, and the tail is what keeps the type readable while the
 * second line is still being written.
 *
 * `LEFT` and `TOP` are tabled beside it rather than derived from a fixed zoom
 * origin, because there is no fixed origin: solving for one across three frames
 * puts it at x=109, then 97, then 435. The camera pans while it pushes.
 *
 * ## The swap is a font swap, not a colour swap
 *
 * The green word is 397px wide across eight letters — a flat 49.6 advance
 * each — and the white one is 444px across the same eight, with per-letter
 * advances of 54, 58, 55, 51, 54, 54, 57. Monospace going proportional. Doing
 * this as a colour change alone loses the one detail that makes it land: the
 * word does not just light up, it stops being code.
 */

const { fontFamily: MONO } = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});
const { fontFamily: SANS } = loadSans("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   The stage, in the reference's own 712 × 390 pixels
   ───────────────────────────────────────────────────────────────────────── */

export const REF_W = 712;
export const REF_H = 390;
export const CENTRE = { x: REF_W / 2, y: REF_H / 2 };

/** Inter's own metrics; `top = baseline - ASC · size` at `lineHeight: LINE`. */
const ASC = 0.9688;
const LINE = 1.2103;

/** The frame the code window cuts to the word. */
export const CUT = 2.4417;
/** The recording runs out here, and so does this. */
export const END = 2.975;

/* ─────────────────────────────────────────────────────────────────────────
   Shot one — the editor
   ───────────────────────────────────────────────────────────────────────── */

/**
 * The window at 1×, which is where it sits 0.33s into the reference.
 *
 * Everything here is in the window's own pixels: `LEFT`/`TOP` place its top
 * left corner on the stage and `S` scales it from that corner, so the three
 * tables together are the camera and nothing in this block ever changes.
 */
export const WINDOW = {
  w: 488,
  h: 331,
  /** Height of the title bar. The body is black from here down. */
  chrome: 24,
  radius: 4,
  dot: { d: 8, x: 10.5, y: 11.5, gap: 12.75 },
} as const;

/** Code layout, measured from the window's top-left corner. */
export const CODE = {
  left: 15.4,
  size: 9.1,
  leading: 14.7,
  /** First baseline, below the *body's* top rather than the window's. */
  baseline: 24.1,
} as const;

/**
 * The push, one knot per 30fps frame from t=0 to the cut.
 *
 * `S` is the window's scale about its own top-left corner; `LEFT` and `TOP`
 * are where that corner sits. All three are read off the same frames — `S`
 * from the sub-pixel centroids of the red and green chrome dots, `LEFT` and
 * `TOP` from the black body's own edges — so they cannot drift apart.
 */
export const S = [
  0.9124, 0.9189, 0.9124, 0.9309, 0.9626, 0.9659, 0.9651, 0.9801, 0.9882,
  0.9974, 1.0036, 1.002, 1.0048, 1.01, 1.0016, 1.0088, 1.0185, 1.0349, 1.0502,
  1.0799, 1.0915, 1.152, 1.1813, 1.2512, 1.3173, 1.4361, 1.5441, 1.7787, 2.3373,
  2.906, 3.1386, 3.2784, 3.3982, 3.4639, 3.5094, 3.5502, 3.5841, 3.5972, 3.6247,
  3.6365, 3.6512, 3.6584, 3.6606, 3.6614, 3.6647, 3.6667, 3.6689, 3.6765,
  3.6825, 3.6871, 3.6902, 3.696, 3.7029, 3.7125, 3.7267, 3.7295, 3.7407, 3.7534,
  3.7642, 3.7791, 3.7936, 3.8068, 3.8267, 3.8478, 3.8689, 3.8911, 3.9229, 3.95,
  3.9936, 4.038, 4.0881, 4.1497, 4.2402,
];

export const LEFT = [
  127, 127, 127, 125, 121, 118, 115.5, 113.5, 112.5, 111, 109.5, 109, 108, 107,
  107, 106, 106, 106, 106, 106, 106, 107, 107.5, 109.5, 111.5, 112.5, 114, 117,
  124, 131, 134, 136, 137, 138, 139, 139.5, 140, 140, 140, 140, 140, 140.5, 140,
  140, 140, 140, 139.5, 139, 139, 138, 138, 137, 136.7, 136, 135, 134, 133.3,
  132, 131, 130, 128.5, 126.5, 125.5, 123.5, 121.5, 120, 116.7, 113.5, 110, 106,
  102, 96.5, 89,
];

export const TOP = [
  51.1, 50.9, 51.1, 49.7, 46.4, 44.8, 43.8, 42.5, 41.3, 40.1, 39.4, 39, 38.9,
  37.8, 38, 37.8, 37.6, 37.2, 36.8, 37.1, 36.8, 36.9, 37.6, 38.5, 40.4, 40.5,
  40.9, 42.3, 43.9, 45.2, 45.7, 46.3, 46.9, 47.4, 47.3, 47.8, 48, 47.7, 48,
  47.7, 47.9, 48.2, 47.6, 47.1, 47, 47, 46.4, 45.8, 45.6, 44.5, 44.4, 43.3,
  43.1, 41.9, 40.6, 40, 38.5, 37.4, 36.2, 34.3, 32.5, 31.1, 28.7, 26.2, 23.6,
  21.6, 18.2, 14.2, 9.7, 5.1, -0.1, -7.1, -16.3,
];

const KNOT = 1 / 30;

function table(v: readonly number[], t: number, from = 0): number {
  return interpolate(
    t,
    v.map((_, i) => from + i * KNOT),
    v as number[],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

/** Where the window's top-left corner is, and how big it is, at time `t`. */
export function camera(t: number): { x: number; y: number; s: number } {
  return { x: table(LEFT, t), y: table(TOP, t), s: table(S, t) };
}

/* ─────────────────────────────────────────────────────────────────────────
   The typing
   ───────────────────────────────────────────────────────────────────────── */

/**
 * 17.5 characters a second — one every 3.4 frames of the 60fps reference, and
 * dead linear across both lines.
 *
 * Counted off the recording at ten frames a second: one character at 0.1s,
 * twenty at 1.2s, thirty-eight at 2.2s. The newline between the lines takes a
 * character's time like everything else, which is why the second line starts a
 * beat later than the first one ends.
 */
export const CHARS_PER_SECOND = 17.5;

/**
 * The first keystroke lands 0.07s in, not on frame zero.
 *
 * Solved rather than eyeballed: the reference shows 19 characters at 1.167s and
 * 30 at 1.833s, and only a delay between 0.062 and 0.081 satisfies both at
 * 17.5 a second. Without it the whole line runs one character ahead for its
 * entire length, which is invisible in a still and obvious in a diff.
 */
export const TYPE_FROM = 0.07;

/** A run of code with one colour. `hero` marks the one that survives the cut. */
export interface Token {
  text: string;
  colour: "comment" | "fn" | "punct" | "string";
  /** The string literal that becomes the headline. Exactly one token has it. */
  hero?: boolean;
}

/**
 * Two lines, seven tokens.
 *
 * The copy is ours — the reference is writing `build("software")` and this
 * registry is something you install — but the shape is what was measured: a
 * comment of about twenty characters, then a call whose quoted argument is one
 * word. That word has to be one word: it is the headline four seconds later,
 * and a headline with a space in it cannot be swapped a letter at a time from a
 * monospace grid.
 */
export const LINES: readonly (readonly Token[])[] = [
  [{ text: "// what if you could", colour: "comment" }],
  [
    { text: "install", colour: "fn" },
    { text: '("', colour: "punct" },
    { text: "motion", colour: "string", hero: true },
    { text: '")', colour: "punct" },
  ],
];

/** Every character of the program, in order, with the newline counted. */
export function programLength(lines: readonly (readonly Token[])[]): number {
  return lines.reduce(
    (n, line, i) =>
      n + line.reduce((m, t) => m + t.text.length, 0) + (i > 0 ? 1 : 0),
    0,
  );
}

/** How many characters have been typed by `t`. */
export function typed(t: number, cps = CHARS_PER_SECOND): number {
  return Math.max(0, Math.floor((t - TYPE_FROM) * cps));
}

/**
 * The visible part of `token`, given how many characters of the whole program
 * have been typed and how many came before it.
 */
export function visible(token: Token, before: number, count: number): string {
  return token.text.slice(
    0,
    Math.max(0, Math.min(token.text.length, count - before)),
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Shot two — the word
   ───────────────────────────────────────────────────────────────────────── */

/**
 * The word's height never changes across the swap — 82px of ink at the first
 * frame after the cut and 82 at the last. Only its width does, 397 → 444,
 * because monospace is becoming proportional. So there is no scale here at all,
 * which is the reason the swap reads as a substitution rather than a zoom.
 */
export const HERO = {
  mono: 86,
  sans: 108,
  /** Where the word sits once it has settled: centre-x, and its baseline. */
  x: 364,
  baseline: 234.5,
};

/**
 * How far right and below the middle of the frame the word starts, one knot per
 * 30fps frame from the cut.
 *
 * An exponential settle, and the first knot is smoothed: the reference's very
 * first frame after the cut measures (58.5, 43.5) against (40.5, 33) on the
 * next, which is a bigger step than any that follow and is the cut frame's own
 * blur rather than the animation.
 */
export const DRIFT_X = [
  46, 35.5, 27.5, 22.5, 18, 14, 11, 9, 7, 5, 3, 2, 1, 0.5, 0.5, 0,
];
export const DRIFT_Y = [
  37, 29.5, 24, 19.5, 15, 12, 9.5, 7.5, 5.5, 4.5, 2.5, 1.5, 1.5, 0.5, 0.5, 0,
];

/** `t` is seconds AFTER the cut, like everything else in the second shot. */
export const drift = (t: number) => ({
  x: table(DRIFT_X, t),
  y: table(DRIFT_Y, t),
});

/**
 * How much of the word has crossed, `t` seconds after the cut.
 *
 * Not a constant rate. Reading the boundary against the *proportional* letter
 * advances — 142, 196, 254, 309, 360, 414, 468, 537, 585 — one letter is done
 * at 0.058s, four at 0.142, six and a half at 0.225 and just under eight at
 * 0.308: 36 letters a second at the start and 16 at the end. It slows into the
 * last letter the way a hand does, and a linear sweep lands the final letter a
 * sixth of a second early.
 */
export const SWEEP_T = [0, 0.058, 0.142, 0.225, 0.308, 0.4];
export const SWEEP_P = [0, 0.125, 0.5, 0.81, 0.975, 1];

export function sweep(t: number): number {
  return interpolate(t, SWEEP_T, SWEEP_P, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Whether letter `i` of `n` has crossed. A step, not a fade — measured, the
 * boundary between white and green is one letter wide on every frame and no
 * letter is ever caught half way. The short ramp only stops the edge from
 * flickering on a frame boundary.
 */
export function swapped(t: number, i: number, n: number): number {
  return interpolate(sweep(t) * n, [i, i + 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   Pieces
   ───────────────────────────────────────────────────────────────────────── */

function lift(): { willChange: "transform" } | null {
  return getRemotionEnvironment().isRendering
    ? null
    : { willChange: "transform" };
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface StringHeroProps {
  /** Two lines of code. The token marked `hero` becomes the headline. */
  lines?: readonly (readonly Token[])[];
  /**
   * The string literal's colour, and therefore the headline's before it turns.
   *
   * Defaults to `theme.primary`: syntax colour is an encoding rather than
   * chrome — like a chart's categories — but the *string* is the one run that
   * leaves the code and becomes the scene, so it is the accent and not a
   * literal.
   */
  accent?: string;
  /** The call's colour. Defaults to the accent walked toward `destructive`. */
  fnColour?: string;
  /** Characters a second. 17.5 is the measured rate. */
  charsPerSecond?: number;
  /** Design-system token overrides. */
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";
  /** The display face for the headline. The code is always monospace. */
  fontFamily?: string;
  /** 1 is the measured speed. */
  speed?: number;
}

export function StringHero({
  lines = LINES,
  accent,
  fnColour,
  charsPerSecond = CHARS_PER_SECOND,
  theme,
  mode,
  fontFamily,
  speed = 1,
}: StringHeroProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = (frame * speed) / fps;

  const th = useSnapCnTheme(theme, mode);
  const display = resolveFont(fontFamily ?? th.fontFamily) ?? SANS;
  const hot = accent ?? th.primary;
  const fn = fnColour ?? mixOklch(hot, th.destructive, 0.5);

  // `cover`: the window runs past every edge for most of the shot, and a
  // letterbox band would be page colour where the reference has more window.
  const k = Math.max(width / REF_W, height / REF_H);
  const ox = (width - REF_W * k) / 2;
  const oy = (height - REF_H * k) / 2;

  const count = typed(t, charsPerSecond);
  const heroToken = lines.flat().find((token) => token.hero);
  const heroWord = heroToken?.text ?? "";

  const ink: Record<Token["colour"], string> = {
    // White, like the punctuation. Measured off the reference at full size the
    // comment peaks at #fefefe — it reads grey in a thumbnail because it is
    // antialiased at 1/4 scale, and dimming it here to match that impression
    // makes the line vanish the moment the window is pushed at you.
    comment: th.card,
    fn,
    punct: th.card,
    string: hot,
  };

  const shot = t < CUT ? "type" : "word";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: shot === "type" ? th.background : th.foreground,
        overflow: "hidden",
        // The window carries its type through a four-times range in half a
        // second, and hinting re-snaps every stem on every frame of that.
        textRendering: "geometricPrecision",
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
        {shot === "type" ? (
          <Editor t={t} lines={lines} count={count} ink={ink} th={th} />
        ) : (
          <Word
            t={t - CUT}
            word={heroWord}
            hot={hot}
            paper={th.card}
            void_={th.foreground}
            display={display}
          />
        )}
      </div>
    </AbsoluteFill>
  );
}

/* ── shot one ─────────────────────────────────────────────────────────── */

function Editor({
  t,
  lines,
  count,
  ink,
  th,
}: {
  t: number;
  lines: readonly (readonly Token[])[];
  count: number;
  ink: Record<Token["colour"], string>;
  th: SnapCnTheme;
}) {
  const { x, y, s } = camera(t);
  const dot = WINDOW.dot;
  // Three literal hues, and the one place in this file that ignores the theme.
  // They are the macOS window's own, they are what makes a rectangle read as a
  // window at a glance, and re-skinning them to a palette makes it read as a
  // card with three coloured circles on it.
  const lights = ["#fe5f57", "#febc2e", "#28c840"];

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: WINDOW.w,
        height: WINDOW.h,
        transform: `scale(${s})`,
        transformOrigin: "0 0",
        borderRadius: WINDOW.radius,
        background: th.card,
        // A shadow that is right at 1× is invisible at 4×, so it is expressed
        // in the window's own units and scaled with it.
        boxShadow: `0 6px 18px ${withAlpha(th.foreground, 0.18)}, 0 1px 3px ${withAlpha(th.foreground, 0.1)}`,
        overflow: "hidden",
        ...lift(),
      }}
    >
      {lights.map((c, i) => (
        <div
          key={c}
          style={{
            position: "absolute",
            left: dot.x + i * dot.gap - dot.d / 2,
            top: dot.y - dot.d / 2,
            width: dot.d,
            height: dot.d,
            borderRadius: dot.d / 2,
            background: c,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: WINDOW.chrome,
          bottom: 0,
          background: th.foreground,
        }}
      />

      {lines.map((line, li) => {
        // Characters consumed by everything above this line, newlines included.
        let before = 0;
        for (let i = 0; i < li; i++) {
          before +=
            (lines[i] ?? []).reduce((m, tk) => m + tk.text.length, 0) + 1;
        }
        return (
          <div
            key={`${li}-${line.map((tk) => tk.text).join("")}`}
            style={{
              position: "absolute",
              left: CODE.left,
              top:
                WINDOW.chrome +
                CODE.baseline +
                li * CODE.leading -
                ASC * CODE.size,
              fontFamily: MONO,
              fontSize: CODE.size,
              lineHeight: LINE,
              fontWeight: 400,
              whiteSpace: "pre",
            }}
          >
            {line.map((tk, ti) => {
              const text = visible(tk, before, count);
              before += tk.text.length;
              return text ? (
                <span key={`${ti}-${tk.text}`} style={{ color: ink[tk.colour] }}>
                  {text}
                </span>
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
}

/* ── shot two ─────────────────────────────────────────────────────────── */

function Word({
  t,
  word,
  hot,
  paper,
  void_,
  display,
}: {
  t: number;
  word: string;
  hot: string;
  paper: string;
  void_: string;
  display: string;
}) {
  const d = drift(t);
  const letters = [...word];
  const fit = letters.length > 10 ? Math.max(0.46, 10 / letters.length) : 1;
  const sansSize = HERO.sans * fit;
  const monoSize = HERO.mono * fit;
  return (
    <>
      {/*
        The backdrop is not flat black. Measured, the reference's left edge sits
        at #4c5257 at the top and #1e2326 at the bottom while its middle is
        #000000 — a single soft light off to the left, and without it the word
        floats on nothing.
      */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: [
            `radial-gradient(46% 62% at 0% 0%, ${withAlpha(paper, 0.16)} 0%, ${withAlpha(paper, 0)} 72%)`,
            `linear-gradient(90deg, ${withAlpha(paper, 0.13)} 0%, ${withAlpha(paper, 0)} 26%)`,
            `radial-gradient(110% 95% at 22% -8%, ${withAlpha(paper, 0.075)} 0%, ${withAlpha(paper, 0)} 82%)`,
            void_,
          ].join(","),
        }}
      />
      {/*
        Inline spans, not a flex row.

        Mixed font sizes on one line is exactly what inline layout is for: every
        span lands on the block's own baseline whatever size it is, so the word
        can change face letter by letter without a single letter hopping. A flex
        row with `alignItems: baseline` looks like it does the same thing and
        then centres its *box*, whose height is the tallest line box rather than
        the ink — which put the whole word 34px low and 37px right.
      */}
      <div
        style={{
          position: "absolute",
          left: HERO.x + d.x,
          top: HERO.baseline + d.y - ASC * sansSize,
          transform: "translateX(-50%)",
          width: "max-content",
          fontSize: sansSize,
          lineHeight: LINE,
          whiteSpace: "pre",
          ...lift(),
        }}
      >
        {letters.map((ch, i) => {
          const done = swapped(t, i, letters.length) > 0.5;
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: a letter's index IS its identity here
              key={`${ch}-${i}`}
              style={
                {
                  fontFamily: done ? display : MONO,
                  fontSize: done ? sansSize : monoSize,
                  fontWeight: done ? 500 : 400,
                  color: done ? paper : hot,
                  // The reference's letters carry a soft bloom — measured, the
                  // green ink reads 84px tall against a 64px glyph. It is what
                  // stops a word on black looking cut out of paper.
                  textShadow: done
                    ? `0 0 9px ${withAlpha(paper, 0.5)}, 0 0 30px ${withAlpha(paper, 0.28)}`
                    : `0 0 9px ${withAlpha(hot, 0.9)}, 0 0 30px ${withAlpha(hot, 0.5)}`,
                } as CSSProperties
              }
            >
              {ch}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default StringHero;
