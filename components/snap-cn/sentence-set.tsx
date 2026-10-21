"use client";

import { loadFont as loadGrotesque } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";

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

/** Splits the delimited `lines` prop into lines of words. */
export function parseLines(lines: string): string[][] {
  return lines
    .split(";")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.split(" ").filter(Boolean));
}

/**
 * The frame each word lands on.
 *
 * The cadence *decelerates*, and that is the whole rhythm of the thing. Measured
 * off the reference the gaps inside a line run 4, 8, 16 frames — each one twice
 * the last — so the sentence starts as a rush and ends as a considered pause on
 * the final word. A constant interval was the obvious first guess and reads as a
 * teleprompter: correct, even, and completely inert.
 *
 * The doubling restarts on each new line, because a line break is its own beat.
 */
export function wordTimes(
  counts: number[],
  base: number,
  growth: number,
  lineGap: number,
): number[][] {
  const out: number[][] = [];
  let t = 0;
  for (const n of counts) {
    const line: number[] = [];
    for (let w = 0; w < n; w++) {
      line.push(t);
      // No intra-line gap after the last word — the line break's own gap
      // replaces it. Charging both was the first version and pushed the second
      // line most of a second late, because by then the doubling had made that
      // last gap the largest one in the line.
      if (w < n - 1) t += base * growth ** w;
    }
    out.push(line);
    t += lineGap;
  }
  return out;
}

/**
 * A word's settle, 0 (just arrived) to 1 (set).
 *
 * One number drives both halves of the arrival — the colour lifting from grey to
 * black and the word sliding the last few pixels left into place. They are the
 * same gesture and splitting them into two curves only invites them to drift
 * apart.
 */
export function settleAt(
  frame: number,
  at: number,
  duration: number,
): number {
  return interpolate(frame, [at, at + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

/**
 * How far right of its place a word still sits, in px.
 *
 * A `translate`, never a margin. The reference's line keeps its left edge to the
 * pixel while the arriving word closes up, which only happens if the gap costs
 * no layout: give the word a real margin instead and the line gets wider, and a
 * centred line that gets wider moves — so every word already set slides half a
 * gap sideways under the reader on every single arrival.
 */
export function wordOffset(settle: number, gap: number): number {
  return (1 - settle) * gap;
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface SentenceSetProps {
  /**
   * The sentence, one line per `;` — the house list convention.
   *
   * Lines are explicit rather than wrapped, because where a sentence breaks is a
   * typographic decision and letting the box width make it means the break moves
   * whenever anyone touches the font size.
   */
  lines?: string;

  fontSize?: number;
  fontWeight?: number | string;
  lineHeight?: number;
  /** The colour a word arrives in. */
  from?: string;
  /** …and the colour it sets to. */
  to?: string;
  background?: string;

  /** Frame the first word lands. */
  startAt?: number;
  /** The first gap between words, in frames. */
  base?: number;
  /** What each gap is multiplied by. 1 gives an even, teleprompter cadence. */
  growth?: number;
  /** Frames between the last word of one line and the first of the next. */
  lineGap?: number;
  /** Frames a word takes to darken and close up. */
  settle?: number;
  /** How far right of its place a word arrives, in px. */
  gap?: number;

  speed?: number;
  className?: string;
}

/**
 * A sentence setting itself, a word at a time.
 *
 * Each word arrives grey and a few pixels right of where it belongs, then
 * darkens to black as it closes the gap — one settle driving both. The cadence
 * decelerates: gaps double as the line goes on, so the sentence opens in a rush
 * and lands hard on its last word, then the next line starts the rhythm again.
 *
 * The whole sentence is laid out and centred once, and unarrived words are
 * transparent rather than absent — so the lines never reflow and nothing already
 * set moves under the reader. The closing gap is a `translate` for the same
 * reason: it costs no layout, so a centred line does not shift every time a word
 * lands.
 */
export function SentenceSet({
  lines = "Make a demo;that ships same day",
  fontSize = 57,
  fontWeight = 500,
  lineHeight = 1.27,
  from = "#939393",
  to = "#000000",
  background = "#F0F0F0",
  startAt = 0,
  base = 2,
  growth = 1.8,
  lineGap = 7,
  settle = 4,
  gap = 22,
  speed = 1,
  className,
}: SentenceSetProps) {
  const frame = useCurrentFrame() * speed;
  const rows = parseLines(lines);
  const times = wordTimes(
    rows.map((r) => r.length),
    base,
    growth,
    lineGap,
  );

  return (
    <AbsoluteFill
      className={className}
      style={{
        background,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: GROTESQUE,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing: "-0.01em",
          textRendering: "geometricPrecision",
        }}
      >
        {rows.map((words, li) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
          <div key={li} style={{ whiteSpace: "nowrap" }}>
            {words.map((word, wi) => {
              const at = startAt + (times[li]?.[wi] ?? 0);
              const s = settleAt(frame, at, settle);
              return (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
                  key={wi}
                  style={{
                    display: "inline-block",
                    // Transparent, not absent: a word removed from the layout
                    // re-centres the line on every arrival.
                    opacity: frame >= at ? 1 : 0,
                    color: interpolateColors(s, [0, 1], [from, to]),
                    translate: `${wordOffset(s, gap)}px`,
                  }}
                >
                  {word}
                  {wi < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
