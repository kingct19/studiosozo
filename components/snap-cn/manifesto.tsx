"use client";

import { loadFont as loadGeometric } from "@remotion/google-fonts/Poppins";
import {
  AbsoluteFill,
  Easing,
  getRemotionEnvironment,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  defaultLightTheme,
  type SnapCnTheme,
  useSnapCnTheme,
} from "@/lib/snap-cn-ui";

// Loaded through @remotion/google-fonts, never a CSS variable — a Remotion
// bundle has none of the app's CSS, so `var(--font-…)` gets you the right face
// in the Player and a fallback in the mp4 (design-system rule 4).
//
// Poppins rather than the library's usual Inter: the whole look rests on a
// *geometric* sans — a single-storey `a`, circular bowls, a straight-diagonal
// `y`. Inter and Manrope both have a double-storey `a`, and swapping it changes
// which typeface this reads as, not just how it is set.
const { fontFamily: GEOMETRIC } = loadGeometric("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   Pure motion math. Everything below is frame-deterministic and side-effect
   free, so the whole sequence can be checked in a unit test without a browser
   or a render — see `__tests__/manifesto.test.ts`.
   ───────────────────────────────────────────────────────────────────────── */

/** The three beats, as frame windows on the composition clock. */
export interface ManifestoTiming {
  /** Frame the second line cuts in and the first cuts out. */
  secondBeat: number;
  /** Frame the third line cuts in and the second cuts out. */
  thirdBeat: number;
}

export const MANIFESTO_TIMING: ManifestoTiming = {
  secondBeat: 48,
  thirdBeat: 87,
};

/**
 * Beat one's wipe.
 *
 * A hard left-to-right mask, not a per-character type-on: the reference cuts
 * glyphs in half mid-stroke, which a character reveal cannot do and which is
 * the only reason the leading edge can carry a colour at all.
 *
 * Very fast off the mark and a long slow tail — roughly half the line is
 * uncovered in the first two frames. `Easing.out(Easing.exp)` is that shape;
 * a cubic is visibly too gentle at the start and arrives late.
 */
export const WIPE_EASE = Easing.out(Easing.exp);

/**
 * `Easing.exp` is `2^(10(t-1))`, which is `2^-10` at t=0 rather than 0. Mirrored
 * into an ease-out that becomes an endpoint of 0.99902 instead of 1 — and a
 * wipe that stops a thousandth short never finishes: the `inset()` keeps a
 * hairline of the last glyph clipped for the rest of the beat. Rescaling by the
 * shortfall is what makes the curve actually reach its end.
 */
const WIPE_SHORTFALL = 2 ** -10;

/** Fraction of the line uncovered at `frame`, clamped to 0…1. */
export function wipeProgress(frame: number, duration: number): number {
  const raw = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: WIPE_EASE,
  });
  return Math.min(1, raw / (1 - WIPE_SHORTFALL));
}

/**
 * Where the colour ramp's hot end sits, given how far the wipe has travelled.
 *
 * Not simply "at the wipe edge" — that was the first thing tried and it leaves
 * the last two thirds of the line permanently pink, because once the wipe
 * clamps at 1 the gradient clamps with it and never leaves. In the reference
 * the colour is gone by the time the wipe lands.
 *
 * So the head runs *ahead* of the wipe, by an amount that is nothing at the
 * start and a full ramp-length by the end. Early on the two move together and
 * the edge is hot; as the wipe nears the last glyph the head shoots off the end
 * of the line and drags the ramp out after it, so the coloured band narrows and
 * drains rather than fading in place. That is what the recording shows between
 * its frames 6 and 11 — five characters of magenta becoming one, then none.
 */
export function edgeHead(wipe: number, spread: number, drain: number): number {
  return wipe + spread * wipe ** drain;
}

/**
 * The colour ramp behind the wipe edge, as CSS gradient stops.
 *
 * Because the stops are fractions *of the line* rather than pixels, nothing has
 * to be measured: the same string works at any font size and any line length,
 * and there is no `delayRender` round-trip before the first frame can be drawn.
 *
 * The tail stop is the fill colour at full alpha rather than `transparent`.
 * CSS interpolates gradients in premultiplied sRGB, and `transparent` is
 * `rgba(0,0,0,0)` — blending toward it drags the midpoint through black and
 * leaves a grey bruise across the middle of the word.
 */
export function edgeGradient(
  head: number,
  fill: string,
  mid: string,
  hot: string,
  spread: number,
): string {
  const pct = (v: number) => `${(v * 100).toFixed(2)}%`;
  return [
    "linear-gradient(90deg",
    `${fill} 0%`,
    `${fill} ${pct(head - spread)}`,
    `${mid} ${pct(head - spread * 0.45)}`,
    `${hot} ${pct(head)}`,
    `${hot} 100%)`,
  ].join(", ");
}

/**
 * How much of a move is still *left* to travel, `framesIn` frames after it
 * started, when the thing keeps a fixed share of the remaining distance each
 * frame.
 *
 * This one function drives every settle in the sequence, because measuring the
 * reference frame by frame turned up the same signature in all three: the
 * distance still to go shrinks by a near-constant ratio every frame — 0.70 per
 * frame for line two's arrival and its closing word gaps, 0.67 for the payoff's
 * fall back — with no overshoot anywhere in the recording.
 *
 * That is a critically damped spring, and writing it as the decay it is rather
 * than fitting a bezier to it matters for more than tidiness. A bezier is
 * defined over a fixed duration, so it only lands correctly at the distance it
 * was tuned for; this has no duration at all. Double `enterDistance` or triple
 * `zoomFrom` and the motion keeps exactly the same character, which is what
 * makes the numbers below safe to expose as props.
 */
export function remaining(framesIn: number, decay: number): number {
  return decay ** Math.max(0, framesIn);
}

/** The payoff's scale, `framesIn` frames into its fall back from `from`. */
export function zoomScale(
  framesIn: number,
  from: number,
  decay: number,
): number {
  return 1 + (from - 1) * remaining(framesIn, decay);
}

/**
 * Both exits accelerate away and are *cut off mid-flight* by the next beat.
 * That cut is the effect: a line that eases out politely before the next one
 * starts reads as a slideshow, and this reads as a sentence being interrupted.
 * Neither exit ever plays to completion at the shipped timings — the distances
 * below are deliberately past the frame edge so the last visible frame is still
 * speeding up.
 */
export const EXIT_EASE = Easing.in(Easing.cubic);

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface ManifestoProps {
  /**
   * The three statements, in order. Written as three separate props rather than
   * an array because this is a fixed three-beat structure with three different
   * animations — an array would suggest a fourth line does something, and it
   * does not.
   */
  lineOne?: string;
  lineTwo?: string;
  /** The payoff. Kept short: it is rendered at `payoffSize` and fills the frame. */
  lineThree?: string;

  /** Resting size of the first two lines, px. */
  fontSize?: number;
  /** Resting size of the payoff line, px. Larger, because it lands alone. */
  payoffSize?: number;
  fontWeight?: number | string;
  /** Overrides the design system's `foreground` — the colour the type settles at. */
  color?: string;
  /** Design-system token overrides. */
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";

  /** The hot colour riding the wipe edge on line one. */
  edgeColor?: string;
  /** The halfway colour between `edgeColor` and the resting fill. */
  edgeMidColor?: string;
  /** How far the colour ramp trails its hot end, as a fraction of the line. */
  edgeSpread?: number;
  /**
   * How abruptly the colour clears once the wipe nears the last glyph. Higher
   * keeps the edge hot for longer and then drains it faster — see `edgeHead`.
   */
  edgeDrain?: number;
  /** Frames the wipe takes to cross line one. */
  wipeDuration?: number;
  /**
   * Frames line one takes to come up to full strength.
   *
   * Shorter than the wipe, and that overlap is the whole reason it reads as
   * light being *thrown* across the line rather than a caption fading up: the
   * first glyphs are already at full magenta while the last ones are still
   * arriving, so the brightness ramp is spent before the wipe finishes and
   * never draws attention to itself.
   */
  introDuration?: number;

  /** How much line one grows across its beat (1.1 = 10% push-in). */
  pushScale?: number;
  /** Frame line two cuts in, and line one starts leaving. */
  secondBeat?: number;
  /** Frame line three cuts in, and line two starts leaving. */
  thirdBeat?: number;

  /** How far right of its resting place line two starts, px. */
  enterDistance?: number;
  /** Extra gap between line two's words when it arrives, px. It closes as it lands. */
  enterWordGap?: number;
  /**
   * Fraction of the distance line two keeps each frame as it lands. Lower
   * arrives faster. See `remaining` — it has no duration, only a rate.
   */
  enterDecay?: number;
  /**
   * Line two's resting offset from centre, px. Negative is left.
   *
   * Not zero, and not a rounding error: in the reference the middle line rests
   * a little left of the other two, which is what stops three centred lines
   * from reading as a stack of captions.
   */
  restOffset?: number;
  /** How far line two shrinks as it leaves (0.8 = down to 80%). */
  exitScale?: number;

  /** How much larger than its resting size the payoff starts. */
  zoomFrom?: number;
  /** Fraction of the remaining distance the payoff keeps each frame. Lower settles faster. */
  zoomDecay?: number;
  /**
   * Vertical pivot for the payoff's fall back, as a fraction of its line box.
   *
   * 0.42 rather than the obvious 0.5: measured against the reference, the type
   * scales about a point just above the middle of its own box — near the
   * x-height line, which is where the eye reads the centre of a word to be
   * rather than where the geometry puts it.
   */
  zoomOrigin?: number;

  speed?: number;
  className?: string;
}

/**
 * Three statements, three different arrivals, hard cuts between them.
 *
 * 1. The first is **wiped on** left to right with a magenta edge that cools to
 *    white behind it, then pushes very slowly toward the viewer for the rest of
 *    its beat, then slides away left — accelerating, and cut off mid-slide.
 * 2. The second **arrives from the right with its words held apart**, and the
 *    gaps close as it lands. Nothing scales; only the spacing moves, which is
 *    what makes the words read as settling into a sentence rather than sliding
 *    in as a block. It leaves by shrinking away.
 * 3. The third **starts larger than the frame** and falls back to a single line,
 *    losing a fixed fraction of the remaining distance every frame.
 *
 * Only `clip-path`, `background-position`, `word-spacing`, `translate` and
 * `scale` animate. Nothing reflows, nothing is measured, and no frame waits on
 * a `delayRender` — so the first frame of a render is already correct.
 */
export function Manifesto({
  lineOne = "You shipped it.",
  lineTwo = "The demo takes",
  lineThree = "minutes.",
  fontSize = 85,
  payoffSize = 208,
  fontWeight = 600,
  color,
  theme,
  mode,
  edgeColor = "#F0007A",
  edgeMidColor = "#FF6EC3",
  edgeSpread = 0.6,
  edgeDrain = 10,
  wipeDuration = 14,
  introDuration = 9,
  pushScale = 1.16,
  secondBeat = MANIFESTO_TIMING.secondBeat,
  thirdBeat = MANIFESTO_TIMING.thirdBeat,
  enterDistance = 225,
  enterWordGap = 37,
  enterDecay = 0.755,
  restOffset = -48,
  exitScale = 0.52,
  zoomFrom = 2.5,
  zoomDecay = 0.68,
  zoomOrigin = 0.39,
  speed = 1,
  className,
}: ManifestoProps) {
  const frame = useCurrentFrame() * speed;
  const t = useSnapCnTheme(theme, mode);
  const fill = color ?? t.foreground;

  const beat = frame < secondBeat ? 1 : frame < thirdBeat ? 2 : 3;

  /* ── Beat 1 ─────────────────────────────────────────────────────────── */
  const wipe = wipeProgress(frame, wipeDuration);
  const oneOpacity = interpolate(frame, [0, introDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  // The push-in runs the length of the beat and then stops; the slide takes
  // over. Near-linear on purpose — an eased zoom over three quarters of a
  // second is visible as a zoom, and this one is only supposed to be felt.
  const oneScale = interpolate(frame, [0, secondBeat - 8], [1, pushScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Travels far enough to clear any frame, but is cut off after a fraction of
  // the trip. What the viewer sees is only the accelerating first third.
  const oneX = interpolate(frame, [secondBeat - 7, secondBeat + 7], [0, -980], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EXIT_EASE,
  });

  /* ── Beat 2 ─────────────────────────────────────────────────────────── */
  // Line two's arrival: the same decay the payoff uses, so the two beats
  // settle with one character rather than two.
  const twoEnter = remaining(frame - secondBeat, enterDecay);
  const twoOut = interpolate(
    frame,
    [thirdBeat - 14, thirdBeat + 6],
    [1, exitScale],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EXIT_EASE },
  );

  /* ── Beat 3 ─────────────────────────────────────────────────────────── */
  const threeScale = zoomScale(frame - thirdBeat, zoomFrom, zoomDecay);

  const shared = {
    position: "absolute" as const,
    whiteSpace: "nowrap" as const,
    fontFamily: GEOMETRIC,
    fontWeight,
    color: fill,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    // Hinting off. As a line's size slides, hinting re-snaps every stem to a
    // new pixel grid and the letterforms visibly boil; geometricPrecision
    // renders the outline as it actually is, and also forces sub-pixel glyph
    // positioning, which Blink otherwise only enables above a device scale
    // factor of 1 — and a render is exactly 1.
    textRendering: "geometricPrecision" as const,
    // A render has no time budget and wants real re-rasterised type every
    // frame; the Player has about eight milliseconds and wants the compositor.
    // Giving each what it needs is the difference between crisp stills and
    // smooth playback.
    ...(getRemotionEnvironment().isRendering
      ? null
      : { willChange: "transform" as const }),
  };

  return (
    <AbsoluteFill
      className={className}
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      {beat === 1 && (
        <span
          style={{
            ...shared,
            fontSize,
            // The wipe. `inset()` from the right uncovers left-to-right, and it
            // cuts glyphs mid-stroke — which is the point: a per-character
            // reveal can only ever land on glyph boundaries, and the reference
            // plainly does not.
            clipPath: `inset(0 ${((1 - wipe) * 100).toFixed(2)}% 0 0)`,
            // The resting fill is the *background colour*; the gradient is the
            // hot edge painted over it. Both are clipped to the glyphs, so the
            // colour ramp is the type rather than a box behind it.
            backgroundColor: fill,
            backgroundImage: edgeGradient(
              edgeHead(wipe, edgeSpread, edgeDrain),
              fill,
              edgeMidColor,
              edgeColor,
              edgeSpread,
            ),
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            opacity: oneOpacity,
            scale: String(oneScale),
            translate: `${oneX}px`,
          }}
        >
          {lineOne}
        </span>
      )}

      {beat === 2 && (
        <span
          style={{
            ...shared,
            fontSize,
            // The only thing that moves inside the line. Scaling it instead
            // would change the letterforms' size as well, and the reference
            // holds its cap height dead still while the gaps close.
            wordSpacing: `${(twoEnter * enterWordGap).toFixed(2)}px`,
            translate: `${restOffset + twoEnter * enterDistance}px`,
            scale: String(twoOut),
          }}
        >
          {lineTwo}
        </span>
      )}

      {beat === 3 && (
        <span
          style={{
            ...shared,
            fontSize: payoffSize,
            scale: String(threeScale),
            transformOrigin: `50% ${(zoomOrigin * 100).toFixed(1)}%`,
          }}
        >
          {lineThree}
        </span>
      )}
    </AbsoluteFill>
  );
}

/** Exported for the customizer's default swatch, which has no hook to read. */
export const MANIFESTO_DEFAULT_COLOR = defaultLightTheme.foreground;
