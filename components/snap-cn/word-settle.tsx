"use client";

import { loadFont as loadGrotesque } from "@remotion/google-fonts/Inter";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Loaded through @remotion/google-fonts, never a CSS variable — a Remotion
// bundle has none of the app's CSS, so `var(--font-…)` gets you the right face
// in the Player and a fallback in the mp4 (design-system rule 4).
const { fontFamily: GROTESQUE } = loadGrotesque("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   Pure motion math — frame-deterministic and side-effect free, so the whole
   sequence is checkable without a browser (see `__tests__`).
   ───────────────────────────────────────────────────────────────────────── */

/** How many words are on screen at `frame`. */
export function wordsShown(
  frame: number,
  total: number,
  wordEvery: number,
): number {
  if (wordEvery <= 0) return total;
  return Math.max(0, Math.min(total, Math.floor(frame / wordEvery) + 1));
}

/**
 * Where the colour has resolved to at `frame`, in px from the line's left edge.
 *
 * Deliberately *not* per word. Measuring the reference, "And" and "actually"
 * each take about nine frames to cool while "handle" takes fifteen — a per-word
 * timer cannot produce that, and a single head crossing the line at a steady
 * pace produces it exactly: a wider word simply spends longer inside the ramp.
 *
 * It also starts to the *left* of the line, so the first word has already begun
 * cooling on the frame it appears — which is what the recording shows, and what
 * stops the opening word from sitting at full accent long enough to read as a
 * different colour rather than as the same colour arriving.
 */
export function settleHead(
  frame: number,
  fontSize: number,
  lead: number,
  speed: number,
): number {
  return (frame * speed - lead) * fontSize;
}

/**
 * The colour ramp, as one gradient with all four stops safely in range.
 *
 * Drawn on a deliberately oversized image so the flat runs either side of the
 * ramp belong to the *same* image. Letting `background-color` supply one side
 * cannot work — it can only supply one colour, and this needs two.
 *
 * Stops are percentages of that oversized image, which is the other reason for
 * it. Sizing the image to the line instead pushes the outer stops to positions
 * like `-150%` and `190%`, and CSS requires stops to be non-decreasing: it
 * silently clamps the ones that are not, producing a completely different ramp
 * with no error raised anywhere.
 *
 * Both ends are opaque colours rather than `transparent`. CSS interpolates
 * gradients in premultiplied sRGB and `transparent` is `rgba(0,0,0,0)`, so
 * blending toward it drags the midpoint through black and bruises the middle of
 * the word grey.
 */
export function settleGradient(
  color: string,
  accent: string,
  rampPx: number,
  spanPx: number,
): string {
  const half = (50 * rampPx) / spanPx;
  const pct = (v: number) => `${v.toFixed(3)}%`;
  return [
    "linear-gradient(90deg",
    `${color} 0%`,
    `${color} ${pct(50 - half)}`,
    `${accent} ${pct(50 + half)}`,
    `${accent} 100%)`,
  ].join(", ");
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface WordSettleProps {
  /** The sentence. Words arrive left to right, one every `wordEvery` frames. */
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
  /** The colour a word settles at. */
  color?: string;
  /** The colour a word arrives in. */
  accent?: string;
  background?: string;

  /** Frames between one word appearing and the next. */
  wordEvery?: number;
  /**
   * How far left of the line the colour head starts, in `fontSize` units.
   *
   * Non-zero so the first word is already cooling on the frame it appears.
   */
  settleLead?: number;
  /** How fast the colour head crosses the line, in `fontSize` units per frame. */
  settleSpeed?: number;
  /** Width of the accent→colour ramp, in `fontSize` units. */
  ramp?: number;

  speed?: number;
  className?: string;
}

/**
 * A sentence that arrives a word at a time, hot, and cools as it lands.
 *
 * Two clocks, running at different speeds, and the gap between them is the whole
 * effect. Words appear left to right every couple of frames; a colour head
 * crosses the line more slowly, behind them, turning `accent` into `color` as it
 * passes. So the newest words are always warm, the oldest always settled, and
 * the sentence reads as *cooling* rather than as typing.
 *
 * The whole sentence is laid out and centred once, and unrevealed words are
 * hidden rather than removed — so the line never reflows and the words that are
 * already up never shift under the reader. That is why the recording's left edge
 * is pinned to the pixel from the first frame to the last while the line grows.
 *
 * Nothing is measured and nothing animates but `opacity` and a background
 * offset, so the first frame of a render is already correct.
 */
export function WordSettle({
  text = "And actually ship the film.",
  fontSize = 71,
  fontWeight = 400,
  color = "#2F2C27",
  accent = "#DB7F3C",
  background = "#FDFDFD",
  wordEvery = 2,
  settleLead = 5.7,
  settleSpeed = 1.03,
  ramp = 13.5,
  speed = 1,
  className,
}: WordSettleProps) {
  const frame = useCurrentFrame() * speed;
  const words = text.split(" ").filter(Boolean);
  const shown = wordsShown(frame, words.length, wordEvery);
  const head = settleHead(frame, fontSize, settleLead, settleSpeed);
  // Wide enough that the flat runs either side of the ramp always cover the
  // whole line, whatever the head is doing.
  const span = fontSize * 120;

  return (
    <AbsoluteFill
      className={className}
      style={{
        background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: GROTESQUE,
          fontSize,
          fontWeight,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          backgroundImage: settleGradient(
            color,
            accent,
            ramp * fontSize,
            span,
          ),
          backgroundSize: `${span}px 100%`,
          // Centred on the head, in the line's own coordinates.
          backgroundPosition: `${head - span / 2}px 0`,
          backgroundRepeat: "no-repeat",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          // Hinting off, so the letterforms do not re-snap to the pixel grid as
          // the gradient slides under them.
          textRendering: "geometricPrecision",
        }}
      >
        {words.map((word, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
            key={i}
            style={{
              // Hidden, not removed. Dropping a word from the layout would
              // re-centre the line on every arrival and shove the words already
              // up sideways under the reader — the recording's left edge does
              // not move by a pixel from the first frame to the last.
              opacity: i < shown ? 1 : 0,
            }}
          >
            {i > 0 ? " " : ""}
            {word}
          </span>
        ))}
      </span>
    </AbsoluteFill>
  );
}
