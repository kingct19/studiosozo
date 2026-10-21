"use client";

import { loadFont as loadGrotesque } from "@remotion/google-fonts/Inter";
import { Children, type ReactNode } from "react";
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";

// Loaded through @remotion/google-fonts, never a CSS variable — a Remotion
// bundle has none of the app's CSS, so `var(--font-…)` gets you the right face
// in the Player and a fallback in the mp4 (design-system rule 4).
const { fontFamily: GROTESQUE } = loadGrotesque("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

/* ─────────────────────────────────────────────────────────────────────────
   Pure layout + motion math — frame-deterministic and side-effect free, so
   the whole scene is checkable without a browser (see `__tests__`).
   ───────────────────────────────────────────────────────────────────────── */

/**
 * A small deterministic PRNG.
 *
 * `Math.random()` would be a bug, not a shortcut: a render is multi-pass and
 * spread across parallel browser tabs, so an unseeded scatter lays the wall out
 * differently in different frames of the same video. Seeded, the layout is a
 * pure function of `seed` — the same every frame, every tab, every re-render,
 * and a number the designer can flip through until they like one.
 */
export function rng(seed: number): () => number {
  let s = (seed * 2654435761) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Splits the delimited `images` prop, matching the house list convention. */
export function parseImages(images: string): string[] {
  return images
    .split(";")
    .map((i) => i.trim())
    .filter(Boolean);
}

/**
 * How many slots the wall has.
 *
 * Whatever you gave it, or `count` if you gave it nothing. Taking the largest
 * rather than the first non-empty is what lets the three sources mix: four
 * screenshots and a `count` of seventeen fills the rest of the wall with
 * abstract tiles, which is almost always what you want while you are still
 * collecting screenshots.
 */
export function slotCount(
  count: number,
  images: number,
  children: number,
  cards: number,
): number {
  return Math.max(count, images, children, cards);
}

export type CardKind = "photo" | "stat" | "accent" | "panel" | "chip";

export interface Card {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: CardKind;
}

const KINDS: CardKind[] = ["photo", "stat", "accent", "panel", "chip"];

/**
 * Scatters the wall, in fractions of the frame.
 *
 * Cards are kept out of a horizontal band through the middle — `clear` — because
 * the headline sits there and a card sliding under a line of type is the one
 * thing that would make the whole shot unreadable. Everything else about the
 * arrangement is deliberately loose: a wall on a grid reads as a table, and this
 * is supposed to read as work piled up.
 */
export function scatter(
  count: number,
  seed: number,
  clear: number,
): Card[] {
  const r = rng(seed);
  const out: Card[] = [];
  for (let i = 0; i < count; i++) {
    const kind = KINDS[Math.floor(r() * KINDS.length)] ?? "panel";
    const w = kind === "chip" ? 0.07 + r() * 0.05 : 0.19 + r() * 0.24;
    const h = kind === "chip" ? 0.05 + r() * 0.03 : 0.17 + r() * 0.26;
    /**
     * Above or below the clear band, never across it.
     *
     * Placed by the edge that faces the headline — an upper card by its bottom,
     * a lower card by its top — so the constraint holds whatever the card's
     * height. Placing by the top and nudging by a fraction of `h` was the first
     * version and quietly fails for exactly the cards it matters most for: a
     * tall one is taller than the band it was meant to stay inside, so it hangs
     * down across the type.
     *
     * The other edge is free to run off the frame, which is what the reference
     * does — a wall that fits neatly inside the frame reads as a diagram.
     */
    const above = r() < 0.5;
    const band = (1 - clear) / 2;
    const edge = 0.02 + r() * (band - 0.02);
    const y = above ? edge - h : 1 - band + edge - 0.02;
    out.push({ x: -0.12 + r() * 1.26, y, w, h, kind });
  }
  return out;
}

/**
 * How far right of its resting place the wall still is, in px.
 *
 * Measured off the reference the wall's speed falls by about 13% a frame — 12.3
 * px, then 10.7, 9.2, 8 — all the way to a stop, with no overshoot anywhere. So
 * it is written as the decay it is rather than fitted with a bezier: a bezier
 * only lands correctly over the duration it was tuned for, and this has no
 * duration at all. Double `travel` and the motion keeps exactly its character.
 */
export function driftX(frame: number, travel: number, decay: number): number {
  return travel * decay ** Math.max(0, frame);
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

export interface ShowcaseDriftProps {
  /** The headline, one line per `;` — the house list convention. */
  headline?: string;

  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number | string;
  color?: string;
  background?: string;
  /** The one saturated colour in the wall. */
  accent?: string;
  /** Card surfaces — the warm off-whites everything else is made of. */
  surface?: string;
  surfaceAlt?: string;

  /**
   * What goes in the slots — anything React, one node per card.
   *
   * The most useful of the three, and the reason this is not an image-only
   * component: the cards in a showcase are usually *your own components*, and a
   * wall that can only hold screenshots of them is a wall that goes stale every
   * time you ship. Takes precedence over `images`.
   */
  children?: ReactNode;
  /** Image URLs, `;`-separated — the customizer-editable way to fill slots. */
  images?: string;
  /**
   * Explicit slots, in fractions of the frame, replacing the scatter entirely.
   *
   * For when the arrangement is the design rather than a texture. Pass `kind`
   * to pick which abstract tile a slot falls back to when it has no content.
   */
  cards?: Card[];

  /** How many slots to scatter when you have not said otherwise. */
  count?: number;
  /** Flip until you like the arrangement. Same seed, same wall, always. */
  seed?: number;
  /** Fraction of the height kept clear through the middle for the headline. */
  clear?: number;
  /** Corner radius on the cards, px. */
  radius?: number;

  /** How far right the wall starts, in px. */
  travel?: number;
  /** Fraction of the remaining distance it keeps each frame. */
  decay?: number;

  speed?: number;
  className?: string;
}

/**
 * How a slot's own content is sized.
 *
 * `cover`, so a screenshot of any aspect fills its card instead of letterboxing
 * — the wall is a texture of work, and a grey bar down the side of one card is
 * the only thing in the frame that will read as a mistake.
 */
const FILL = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block" as const,
};

/** One slot: your content if you gave it any, an abstract tile if you did not. */
function Tile({
  card,
  content,
  accent,
  surface,
  surfaceAlt,
  radius,
  width,
  height,
}: {
  card: Card;
  content?: ReactNode;
  accent: string;
  surface: string;
  surfaceAlt: string;
  radius: number;
  width: number;
  height: number;
}) {
  const w = card.w * width;
  const h = card.h * height;
  const base = {
    position: "absolute" as const,
    left: card.x * width,
    top: card.y * height,
    width: w,
    height: h,
    borderRadius: radius,
    overflow: "hidden" as const,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  };

  // Anything you passed wins over every abstract tile below.
  if (content) return <div style={{ ...base, background: surface }}>{content}</div>;

  if (card.kind === "accent") {
    return (
      <div style={{ ...base, background: accent }}>
        <div
          style={{
            position: "absolute",
            left: h * 0.16,
            top: h * 0.14,
            color: "#FFFFFF",
            fontSize: h * 0.26,
            fontWeight: 500,
          }}
        >
          182
        </div>
        <Bars x={h * 0.16} y={h * 0.62} unit={h * 0.1} color="#FFFFFF" />
      </div>
    );
  }
  if (card.kind === "photo") {
    return (
      <div
        style={{
          ...base,
          // Darker than the other surfaces on purpose. A wall of near-whites on
        // near-white has no depth at all, and the reference's photography is
        // what gives the arrangement its weight.
        background: `linear-gradient(150deg, #6F6659, ${surfaceAlt})`,
        }}
      />
    );
  }
  if (card.kind === "chip") {
    return (
      <div
        style={{
          ...base,
          background: surface,
          borderRadius: h * 0.5,
        }}
      />
    );
  }
  if (card.kind === "stat") {
    return (
      <div style={{ ...base, background: "#FFFFFF" }}>
        <Bars x={h * 0.18} y={h * 0.3} unit={h * 0.1} color={accent} />
        <Line x={h * 0.18} y={h * 0.6} w={w * 0.42} h={h * 0.1} c={surfaceAlt} />
      </div>
    );
  }
  return (
    <div style={{ ...base, background: "#FFFFFF" }}>
      <Line x={h * 0.14} y={h * 0.16} w={w * 0.44} h={h * 0.09} c="#111111" />
      {[0.38, 0.54, 0.7].map((t) => (
        <Line
          key={t}
          x={h * 0.14}
          y={h * t}
          w={w * (t === 0.7 ? 0.52 : 0.76)}
          h={h * 0.06}
          c={surfaceAlt}
        />
      ))}
    </div>
  );
}

/** A run of little bars — the universal shorthand for "there is data here". */
function Bars({
  x,
  y,
  unit,
  color,
}: { x: number; y: number; unit: number; color: string }) {
  const heights = [0.6, 1, 0.45, 0.85, 0.3, 0.7];
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "flex-end",
        gap: unit * 0.4,
        height: unit * 1.6,
      }}
    >
      {heights.map((t, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative run
          key={i}
          style={{
            width: unit * 0.5,
            height: unit * 1.6 * t,
            background: color,
            borderRadius: unit * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function Line({
  x,
  y,
  w,
  h,
  c,
}: { x: number; y: number; w: number; h: number; c: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: c,
        borderRadius: h * 0.5,
      }}
    />
  );
}

/**
 * A wall of work sliding to a stop behind a headline.
 *
 * The whole scatter arrives from the right and settles, losing a fixed share of
 * the remaining distance every frame — no overshoot, no bounce, just something
 * heavy coming to rest. The headline never moves: it sits in a band the cards
 * are laid out to avoid, so the type stays readable at every frame instead of
 * only the ones where nothing happens to be behind it.
 *
 * The cards are **drawn, not photographed**. A collage component whose default
 * is eight hosted screenshots is a component that breaks when the host does,
 * and shipping someone's product UI inside a paid registry item is not a thing
 * to do by accident. These are abstract, they cost nothing, and they say what
 * the shot needs to say — that there is a lot of finished work here.
 */
export function ShowcaseDrift({
  headline = "Install, customise and;render, all from React",
  fontSize = 44,
  lineHeight = 1.29,
  fontWeight = 400,
  color = "#000000",
  background = "#FDFDFD",
  accent = "#9A7F00",
  surface = "#F4F4F4",
  surfaceAlt = "#EEECE8",
  children,
  images = "",
  cards,
  count = 17,
  seed = 7,
  clear = 0.26,
  radius = 10,
  travel = 191,
  decay = 0.867,
  speed = 1,
  className,
}: ShowcaseDriftProps) {
  const frame = useCurrentFrame() * speed;
  const { width, height } = useVideoConfig();
  const nodes = Children.toArray(children);
  const urls = parseImages(images);
  const n = slotCount(count, urls.length, nodes.length, cards?.length ?? 0);
  const slots = cards ?? scatter(n, seed, clear);
  const x = driftX(frame, travel, decay);

  return (
    <AbsoluteFill
      className={className}
      style={{ background, overflow: "hidden", fontFamily: GROTESQUE }}
    >
      <AbsoluteFill style={{ translate: `${x}px` }}>
        {slots.map((card, i) => (
          <Tile
            // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
            key={i}
            card={card}
            content={nodes[i] ?? (urls[i] ? <Img src={urls[i]} style={FILL} /> : null)}
            accent={accent}
            surface={surface}
            surfaceAlt={surfaceAlt}
            radius={radius}
            width={width}
            height={height}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize,
            fontWeight,
            lineHeight,
            color,
            letterSpacing: "-0.01em",
            textRendering: "geometricPrecision",
          }}
        >
          {headline
            .split(";")
            .map((l) => l.trim())
            .filter(Boolean)
            .map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
              <div key={i} style={{ whiteSpace: "nowrap" }}>
                {line}
              </div>
            ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
