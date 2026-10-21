"use client";

import {
  AbsoluteFill,
  Easing,
  getRemotionEnvironment,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  type SnapCnTheme,
  mixOklch,
  useSnapCnTheme,
  withAlpha,
} from "@/lib/snap-cn-ui";

/**
 * The wall's own screenshots, absolute on purpose.
 *
 * A root-relative default becomes `staticFile()` in a render and 404s the first
 * time anyone renders the component they just installed — they do not have our
 * `public/` — so the defaults point at the origin and `resolveSrc` handles a
 * user's own root-relative paths. Same rule, and the same list, as
 * `moodboard-reveal`.
 *
 * Tall crops, because that is what the wall is made of: a website screenshot is
 * a column, not a card, and cropping one to 16:9 throws away the thing that
 * makes a wall of them read as *work* rather than as a mood board.
 */
export const SHOTS = [
  "https://snapcn.dev/showcase-assets/438b9e6b50654a44d404fbf358c26e9f.webp",
  "https://snapcn.dev/showcase-assets/821d815affa6496c39cbdeeec7a84603.jpg",
  "https://snapcn.dev/showcase-assets/5e5305b05bd405a0d89570725434099e.webp",
  "https://snapcn.dev/showcase-assets/98f89cb9994f5c382ab964062c4039db.jpg",
  "https://snapcn.dev/showcase-assets/767d99bb371a54d0d36751e8cecae43c.jpg",
  "https://snapcn.dev/showcase-assets/b25b82db2892efff9be3204e860d30ee.jpg",
  "https://snapcn.dev/showcase-assets/937438c560ada1c83317f2c11b3454b0.jpg",
  "https://snapcn.dev/showcase-assets/c9ebc6337aa2268ac4b357f9cb1ac547.jpg",
];

/* ─────────────────────────────────────────────────────────────────────────
   Pure motion math — frame-deterministic and side-effect free, so the whole
   sequence is checkable without a browser (see `__tests__`).
   ───────────────────────────────────────────────────────────────────────── */

/**
 * A moderate decelerate, for both the rise and every step.
 *
 * Not the quint/expo-out this shape asks for. Measured on the reference a step
 * moves the strip about 480px in fourteen frames and never spends a frame on
 * travel too small to see; an ease-out quint over the same move puts five of
 * those frames under half a pixel of column-edge movement, and five
 * identically-rasterised frames in the middle of a step reads as a stall.
 */
export const STEP_EASE = Easing.bezier(0.2, 0.6, 0.35, 1);

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * The wall's rhythm: a small fixed drop per column, tiling.
 *
 * Measured off the reference's settled frame, where the three visible column
 * tops sit at 200, 272 and 315 composition px. Most of that spread is the focus
 * lift below; what is left is a few px of per-column offset that stops the
 * unfocused columns from lining up like a bar chart. Authored as a pattern
 * rather than drawn from a seed — a seeded wall gives a different arrangement
 * for every `count`, most of them worse, and the rhythm *is* the design.
 */
export const DROPS: readonly number[] = [0.05, 0, 0.09, 0.03, 0.12, 0.06];

/**
 * How much of the focused width each column is showing at `focus`.
 *
 * `focus` is fractional on purpose. At 1.5 the two columns either side are both
 * half-open, so a step is a *handoff* — one column giving up its width to the
 * next — rather than one closing and another opening after it. That is the
 * whole move: the reference never has a frame where nothing is focused.
 */
export function focusWeight(index: number, focus: number): number {
  return Math.max(0, 1 - Math.abs(index - focus));
}

/**
 * Which column is open at `frame`, as a fractional index.
 *
 * Holds on the first column while the wall is still arriving, then advances one
 * column every `dwell` frames, each handoff taking `stepFrames`. Measured off
 * the reference: it holds for 41 frames, hands off over about 14, holds again,
 * and hands off a second time 33 frames after the first.
 */
export function focusAt(
  frame: number,
  firstStep: number,
  dwell: number,
  stepFrames: number,
  steps: number,
  from = 0,
): number {
  if (frame <= firstStep || dwell <= 0) return from;
  const since = frame - firstStep;
  const done = Math.min(steps, Math.floor(since / dwell));
  const t = STEP_EASE(clamp01((since - done * dwell) / Math.max(1e-6, stepFrames)));
  return from + Math.min(steps, done + (done < steps ? t : 0));
}

export interface Column {
  /** World x of the column's left edge. */
  x: number;
  /** World width at this frame. */
  w: number;
  /** World y of its top edge. */
  y: number;
  /** 1 when fully open, 0 when at rest. */
  weight: number;
}

export interface WallOptions {
  count: number;
  focus: number;
  /** Width of the open column. */
  openWidth: number;
  /** Width of a column at rest. */
  restWidth: number;
  gap: number;
  /** Where the open column's top sits. */
  top: number;
  /** How much further down a column at rest sits. */
  lift: number;
  drops?: readonly number[];
}

/**
 * Lay the wall out at one frame, in world coordinates.
 *
 * Recomputed every frame because the widths *are* the animation — a column's
 * place in the row depends on how open its neighbours are. World coordinates,
 * not screen: the slide that centres the open column is applied once, to the
 * strip, and no column ever needs to know where it ended up.
 */
export function wallAt(o: WallOptions): Column[] {
  const drops = o.drops ?? DROPS;
  const out: Column[] = [];
  let x = 0;
  for (let i = 0; i < o.count; i++) {
    const weight = focusWeight(i, o.focus);
    const w = o.restWidth + (o.openWidth - o.restWidth) * weight;
    const drop = (drops[i % drops.length] ?? 0) * o.openWidth;
    out.push({ x, w, y: o.top + drop + (1 - weight) * o.lift, weight });
    x += w + o.gap;
  }
  return out;
}

/**
 * World x that has to sit at the centre of the frame.
 *
 * The weighted centre of the open columns, not the centre of column
 * `round(focus)`. Rounding was the first version and snaps the whole strip
 * sideways on the frame the focus index crosses .5 — a one-frame jump of half a
 * column, in the middle of an otherwise eased handoff.
 */
export function wallCentre(columns: readonly Column[]): number {
  let num = 0;
  let den = 0;
  for (const c of columns) {
    num += c.weight * (c.x + c.w / 2);
    den += c.weight;
  }
  if (den > 0) return num / den;
  const last = columns[columns.length - 1];
  return last ? (last.x + last.w) / 2 : 0;
}

/**
 * Which column lands first, second, third…
 *
 * Outward from the one the wall opens on. The reference brings up the column
 * you are being shown, then its left neighbour, then its right — the wall
 * builds around the subject. A left-to-right sweep was the first version and
 * reads as a list loading, because that is what it is.
 */
export function riseOrder(count: number, focus: number): number[] {
  return Array.from({ length: count }, (_, i) => i)
    .sort((a, b) => Math.abs(a - focus) - Math.abs(b - focus))
    .reduce<number[]>((rank, idx, place) => {
      rank[idx] = place;
      return rank;
    }, []);
}

/** 0…1 of the way through one column's rise, at `frame`. */
export function riseAt(frame: number, delay: number, frames: number): number {
  return STEP_EASE(clamp01((frame - delay) / Math.max(1e-6, frames)));
}

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);

/**
 * A root-relative asset is served at the origin root by Next in the Player, but
 * a server render serves `public/` through `staticFile()` — so rewrite local
 * paths only while rendering, and pass http(s)/data/blob URLs straight through.
 */
export function resolveSrc(src: string): string {
  const isLocal = src.startsWith("/") && !src.startsWith("//");
  if (isLocal && getRemotionEnvironment().isRendering) {
    return staticFile(src.replace(/^\/+/, ""));
  }
  return src;
}

/** Splits the delimited `images` prop, matching the house list convention. */
export function parseImages(images: string): string[] {
  return images
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface GalleryPushProps {
  /** Screenshot URLs, `;` separated — the house list convention. */
  images?: string;
  /** How many columns the wall holds. Cycles `images` when it runs out. */
  count?: number;
  /** Width of the open column, px. */
  openWidth?: number;
  /** Width of a column at rest, px. */
  restWidth?: number;
  /** Space between columns, px. */
  gap?: number;
  /** How tall a column is, as a multiple of the frame height. */
  columnHeight?: number;
  /** Where the open column's top sits, as a fraction of the frame height. */
  top?: number;
  /** How much further down a column at rest sits, px. */
  lift?: number;
  /** Corner radius on a column, px. */
  cardRadius?: number;
  /** Corner radius on the frame itself, px. 0 fills the composition. */
  radius?: number;

  /** How far below its place a column starts, as a multiple of the open width. */
  rise?: number;
  /** Frames one column takes to arrive. */
  riseFrames?: number;
  /** Frames between one column starting to rise and the next. */
  stagger?: number;

  /**
   * Which column is open on frame 0.
   *
   * 1, not 0. The reference opens with a column either side of the open one and
   * that framing is the whole reason the wall reads as a wall: open on the
   * first column and the left half of the frame is empty page, which reads as a
   * layout bug rather than as the start of a row.
   */
  focusFrom?: number;
  /** Frame the focus first moves off the opening column. */
  firstStep?: number;
  /** Frames from one handoff starting to the next. */
  dwell?: number;
  /** Frames a handoff takes. */
  stepFrames?: number;
  /** How many columns the focus walks. */
  steps?: number;
  /** Scale the whole wall reaches by the last frame. */
  zoom?: number;

  /** The page behind the wall. */
  background?: string;
  /** The wash in the corners. Defaults to `primary`, barely there. */
  glow?: string;

  speed?: number;
  theme?: Partial<SnapCnTheme>;
  mode?: "light" | "dark";
  className?: string;
}

/**
 * A wall of screenshots that opens one column at a time.
 *
 * The columns rise into place from below, the one you are being shown first and
 * the wall building outward from it, on a page that is white with a wash of
 * `primary` in the corners. Then the focus walks: the open column gives up its
 * width to its neighbour, the strip slides to keep whichever is open in the
 * middle, and the whole wall creeps forward.
 *
 * The width is the whole trick. A column is a fixed-height box with the
 * screenshot `object-fit: cover` inside it, so narrowing the box does not
 * shrink the picture — it *crops* it, and a site at rest reads as a tall slice
 * of itself while the open one reads as a page. That is why a step feels like a
 * camera move without a camera: nothing zooms, the window changes shape.
 */
export function GalleryPush({
  images = SHOTS.join(";"),
  count = 6,
  openWidth = 517,
  restWidth = 180,
  gap = 14,
  columnHeight = 2.4,
  top = 0.28,
  lift = 95,
  cardRadius = 6,
  radius = 26,
  rise = 0.65,
  riseFrames = 26,
  stagger = 3,
  focusFrom = 1,
  firstStep = 41,
  dwell = 33,
  stepFrames = 14,
  steps = 2,
  zoom = 1.09,
  background,
  glow,
  speed = 1,
  theme,
  mode,
  className,
}: GalleryPushProps) {
  const frame = useCurrentFrame() * speed;
  const { width, height, durationInFrames } = useVideoConfig();
  const t = useSnapCnTheme(theme, mode);

  /**
   * Falling back to the shipped screenshots when the list comes back empty is
   * not belt-and-braces, it is the fix for a real bug: the customizer hands
   * every control's default down as an explicit prop, so a `""` default on the
   * text control *overrides* the component's own default and the wall renders
   * as six grey rectangles with nothing to say what went wrong. Clearing the
   * field in the editor does the same thing, and should not empty the wall
   * either.
   */
  const parsed = parseImages(images);
  const urls = parsed.length > 0 ? parsed : SHOTS;

  const page = background ?? mixOklch(t.card, t.foreground, 0.01);
  const wash = glow ?? t.primary;

  const focus = focusAt(frame, firstStep, dwell, stepFrames, steps, focusFrom);
  const columns = wallAt({
    count,
    focus,
    openWidth,
    restWidth,
    gap,
    top: height * top,
    lift,
  });
  const centre = wallCentre(columns);
  const rank = riseOrder(count, focusFrom);

  /**
   * The wall creeps forward across the whole scene: 9% over 116 frames, which
   * is under a tenth of a percent a frame and is meant to be felt rather than
   * seen. Linear, not eased — an eased creep has a beginning and an end, and
   * this one is supposed to have neither.
   */
  const scale = 1 + (zoom - 1) * clamp01(frame / Math.max(1, durationInFrames - 1));

  return (
    <AbsoluteFill
      className={className}
      style={{ background: page, borderRadius: radius, overflow: "hidden" }}
    >
      {/**
       * Two washes and no more. The reference's page is #FDFDFD with a lavender
       * that never gets past #F3EFFC — ten points of chroma across the whole
       * frame — and the only thing that ruins it is making it visible. Fades go
       * to `withAlpha(colour, 0)`, never to `transparent`: CSS interpolates
       * gradients in premultiplied sRGB and `transparent` is `rgba(0,0,0,0)`,
       * so a wash fading to it drags its own edge through grey.
       */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            `radial-gradient(58% 62% at 14% 96%, ${withAlpha(wash, 0.13)} 0%, ${withAlpha(wash, 0)} 100%)`,
            `radial-gradient(52% 58% at 92% 8%, ${withAlpha(wash, 0.1)} 0%, ${withAlpha(wash, 0)} 100%)`,
          ].join(", "),
        }}
      />

      {/**
       * One transform for the whole strip, with `transform-origin: 0 0` so the
       * scale does not fight the translate — with a centred origin the slide
       * would have to be corrected by the scale on every frame and would stop
       * being a readable number.
       */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          transformOrigin: "0 0",
          transform: `translate(${width / 2}px, 0px) scale(${scale}) translate(${-centre}px, 0px)`,
          ...(getRemotionEnvironment().isRendering
            ? null
            : { willChange: "transform" as const }),
        }}
      >
        {columns.map((c, i) => {
          const p = riseAt(frame, (rank[i] ?? 0) * stagger, riseFrames);
          const src = urls[i % urls.length] ?? "";
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: positional, never reordered
              key={i}
              style={{
                position: "absolute",
                left: c.x,
                top: c.y,
                width: c.w,
                height: height * columnHeight,
                borderRadius: cardRadius,
                overflow: "hidden",
                opacity: p,
                translate: `0px ${(1 - p) * rise * openWidth}px`,
                background: mixOklch(t.card, t.foreground, 0.04),
              }}
            >
              {src && !isVideo(src) ? (
                <Img
                  src={resolveSrc(src)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    // Tailwind's preflight sets `img { max-width: 100% }` in the
                    // app and nothing at all in a render. Say it here so the
                    // column is the same width in both.
                    maxWidth: "none",
                    display: "block",
                    objectFit: "cover",
                    // Top-aligned, not centred: a screenshot is read from its
                    // header down, and centring the crop on a column this tall
                    // cuts away the one part of a site anybody recognises.
                    objectPosition: "50% 0%",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default GalleryPush;
