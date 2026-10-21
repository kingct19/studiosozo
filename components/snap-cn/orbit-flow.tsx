"use client";

import { getInfo } from "@remotion/google-fonts/Archivo";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Three dashed orbits round a line of type: the scene settles in, the line
 * rises word by word, and the inner orbit — carrying three labelled stops —
 * coasts down and then winds up until it is a blur.
 *
 * Measured off a 718 × 396 screen recording of a 24fps video, so every table
 * below is indexed in that video's frames and the recording's pixels.
 *
 * ## One canvas, drawn at every pixel
 *
 * Everything in the recording is soft — a one-pixel dash, 6px capitals — and
 * all of it moves by fractions of a pixel. A browser puts every text baseline
 * on a whole pixel and strokes every dash as a hard box, so none of it is left
 * to the browser:
 *
 * - the rings are the fitted model itself, evaluated at each pixel centre: a
 *   Gaussian across the ring, and along it a square wave blurred by the same
 *   Gaussian and by a box as long as the dash travels while the shutter is open;
 * - labels and the line are drawn four times over size on a scratch canvas,
 *   positioned to a quarter pixel, and averaged down; the labels' motion blur
 *   is then a box along the orbit, sampled in quarter pixels.
 *
 * ## Verified against the recording
 *
 * Rendered at 718 × 396 on the recording's own clock with its own copy and
 * compared on all 77 frames: 0.37 of 255 mean per pixel. The rings are within
 * the capture's own noise; most of what is left is the line, whose typeface in
 * the recording is not a Google font — Archivo is the closest of 1,804 — and
 * the labels' capitals.
 */

/**
 * Archivo is a variable font and the line sits between two of its named
 * weights, so it is registered once over its whole weight range — Google serves
 * the same file for every weight — rather than as the fixed faces `loadFont`
 * declares, which a canvas would snap to.
 */
const ARCHIVO = "OrbitFlowArchivo";
let archivo: Promise<void> | null = null;
function loadArchivo(): Promise<void> {
  if (!archivo) {
    const src = getInfo().fonts.normal["400"].latin;
    archivo = new FontFace(ARCHIVO, `url(${src}) format("woff2")`, { weight: "100 900" })
      .load()
      .then((face) => {
        document.fonts.add(face);
      });
  }
  return archivo;
}

/* ─────────────────────────────────────────────────────────────────────────
   The stage
   ───────────────────────────────────────────────────────────────────────── */

export const REF_W = 718;
export const REF_H = 396;
export const REF_FPS = 24;
/** Component frame 0 is source frame −8: the zoom and the line start there. */
export const LEAD_IN = 8;
/** The recording is 0.25% shorter than it is wide: 397 rows captured into 396. */
export const AY = 396 / 397;
/** The inner orbit's centre; the labels and markers ride it. */
export const CX = 359;
export const CY = 200.495;

/** Nothing is on the page at frame 0: everything fades up over the lead-in's first four frames. */
export function enterAt(s: number): number {
  return Math.min(1, Math.max(0, (s + LEAD_IN) / 4));
}

/* ─────────────────────────────────────────────────────────────────────────
   Curves
   ───────────────────────────────────────────────────────────────────────── */

export function bezier(x1: number, y1: number, x2: number, y2: number, x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  let lo = 0;
  let hi = 1;
  let u = x;
  for (let i = 0; i < 40; i++) {
    const cx = 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u * u * x2 + u ** 3;
    if (Math.abs(cx - x) < 1e-7) break;
    if (cx < x) lo = u;
    else hi = u;
    u = (lo + hi) / 2;
  }
  return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3;
}

/** Linear read of a per-frame table at a fractional index, clamped. */
export function tableAt(t: readonly number[], i: number): number {
  if (i <= 0) return t[0] ?? 0;
  if (i >= t.length - 1) return t[t.length - 1] ?? 0;
  const a = Math.floor(i);
  const lo = t[a] ?? 0;
  const hi = t[a + 1] ?? 0;
  return lo + (hi - lo) * (i - a);
}

/**
 * The orbits and labels settle from 0.86 to 1 about the rings' centre. Fitted to
 * the three radii over all 77 frames at 0.004px. The line does not zoom.
 */
export const ZOOM = { at: -8.1222, dur: 54.3275, from: 0.8602 } as const;

export function zoomAt(s: number): number {
  const p = bezier(0.1518, 0.2116, 0.0458, 1.0042, (s - ZOOM.at) / ZOOM.dur);
  return ZOOM.from + (1 - ZOOM.from) * p;
}

/**
 * The inner orbit's turn in degrees, per source frame from 0 (negative is
 * anticlockwise): still coasting down from the entrance, slowest near frame 35,
 * then winding up until it is a blur. Read off the dashes' phase to 0.005°;
 * before frame 0 it carries back on its measured speed and slowing.
 */
export const SPIN = [
  0, -1.018, -1.981, -2.871, -3.738, -4.548, -5.34, -6.11, -6.851, -7.561, -8.246, -8.918, -9.571,
  -10.193, -10.816, -11.401, -11.991, -12.572, -13.134, -13.685, -14.216, -14.728, -15.267, -15.769,
  -16.267, -16.759, -17.241, -17.717, -18.2, -18.647, -19.104, -19.545, -19.999, -20.427, -20.848,
  -21.286, -21.7, -22.13, -22.57, -23.028, -23.511, -24.005, -24.532, -25.065, -25.636, -26.225,
  -26.837, -27.471, -28.151, -28.847, -29.58, -30.345, -31.161, -32.001, -32.883, -33.821, -34.808,
  -35.847, -36.947, -38.115, -39.352, -40.682, -42.086, -43.61, -45.242, -47.019, -48.961, -51.08,
  -53.446, -56.052, -59.086, -62.545, -66.653, -70.633,
];
const SPIN_V0 = -1.0258;
const SPIN_A0 = 0.0463;

export function spinAt(s: number): number {
  if (s < 0) return SPIN_V0 * s + 0.5 * SPIN_A0 * s * s;
  const n = SPIN.length - 1;
  if (s > n) return (SPIN[n] ?? 0) + ((SPIN[n] ?? 0) - (SPIN[n - 1] ?? 0)) * (s - n);
  return tableAt(SPIN, s);
}

/** Degrees a frame at `s`: the travel the shutter smears. */
const spinSpeed = (s: number) => Math.abs(spinAt(s + 0.5) - spinAt(s - 0.5));

/* ─────────────────────────────────────────────────────────────────────────
   The rings
   ───────────────────────────────────────────────────────────────────────── */

export type Ring = {
  /** Dashes round the ring: whole numbers, so there is no seam. */
  n: number;
  /** Centre and settled radius, recording px. */
  cx: number;
  cy: number;
  r: number;
  /** Peak darkness (of 247) settled, and how much it changes per unit of zoom still to go. */
  dark: number;
  darkZoom: number;
  /** Gaussian across the ring, px, and the dash's share of its period. */
  sigma: number;
  duty: number;
  /** Phase at frame 0 (degrees) and turn per frame, or null to follow `spinAt`. */
  phase: number;
  turn: number | null;
};

/**
 * Inner, middle, outer. The middle and outer rings turn at a constant
 * ±0.187° a frame — straight lines through 77 frames at 0.03px — and fade as
 * the zoom settles; the inner ring darkens a little instead. The inner ring's
 * centre is half a pixel below the others', as in the recording.
 */
export const RINGS: readonly Ring[] = [
  { n: 140, cx: CX, cy: CY, r: 170.11, dark: 51.936, darkZoom: -29.3, sigma: 0.659, duty: 0.497, phase: 0.3137, turn: null },
  { n: 233, cx: CX, cy: 199.965, r: 279.79, dark: 23.516, darkZoom: 94.33, sigma: 0.656, duty: 0.468, phase: 0.2518, turn: 0.18714 },
  { n: 321, cx: CX, cy: 199.965, r: 385.62, dark: 12.512, darkZoom: 161.52, sigma: 0.62, duty: 0.45, phase: 0.0316, turn: -0.18712 },
];

/** The capture's blur along a ring, px, and the share of a frame's travel the shutter smears. */
export const TANGENT_SIGMA = 0.569;
export const SHUTTER = 0.428;

/** Abramowitz & Stegun 7.1.26: 1.5e-7, well inside a 1/255 step. */
export function erf(x: number): number {
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-a * a);
  return x < 0 ? -y : y;
}

const ierf = (x: number) => x * erf(x) + Math.exp(-x * x) / Math.sqrt(Math.PI);

/** A box on [0, on) blurred by a Gaussian and by a box of `blur` px, at `x`. Closed form. */
export function boxAt(x: number, on: number, sigma: number, blur: number): number {
  const c = Math.SQRT2 * sigma;
  if (blur < 1e-3) return 0.5 * (erf(x / c) - erf((x - on) / c));
  const F = (z: number) => 0.5 * c * ierf(z / c);
  return (F(x + blur / 2) - F(x - blur / 2) - (F(x - on + blur / 2) - F(x - on - blur / 2))) / blur;
}

/** One dash period of `boxAt`, summed over neighbouring periods so a long blur wraps round. */
export function dashAt(u: number, period: number, duty: number, sigma: number, blur: number): number {
  const reach = Math.ceil((3 * sigma + blur / 2) / period) + 1;
  let v = 0;
  for (let m = -reach; m <= reach; m++) v += boxAt(u - m * period, duty * period, sigma, blur);
  return v;
}

const LUT = 256;

/** Everything a frame needs to draw one ring, in recording px. */
export function ringState(ring: Ring, s: number) {
  const z = zoomAt(s);
  const deg = ring.turn === null ? ring.phase + spinAt(s) : ring.phase + ring.turn * s;
  const speed = ring.turn === null ? spinSpeed(s) : Math.abs(ring.turn);
  const r = ring.r * z;
  return {
    r,
    dark: ring.dark + ring.darkZoom * (1 - z),
    phase: (deg * Math.PI) / 180,
    blur: SHUTTER * ((speed * Math.PI) / 180) * r,
    period: (2 * Math.PI * r) / ring.n,
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   The stops: a label on the orbit and a marker on the inner ring
   ───────────────────────────────────────────────────────────────────────── */

export type Stop = {
  /** Angle at spin 0, degrees clockwise from 3 o'clock, and radius at zoom 1. */
  at: number;
  r: number;
  /** The marker's angle on the inner ring. */
  marker: number;
  /** The icon: transparent to `t0`, `c1` by `t1`, `c2` at the bottom. */
  t0: number;
  t1: number;
  c1: string;
  c2: string;
};

/** The three stops of the recording. Labels stay upright. */
export const STOPS: readonly Stop[] = [
  { at: -166.852, r: 226.15, marker: -170.047, t0: 0.34, t1: 0.59, c1: "#d2cefc", c2: "#ab8ef7" },
  { at: -17.847, r: 226.07, marker: -26.057, t0: 0.33, t1: 0.64, c1: "#ffb06e", c2: "#e57534" },
  { at: -294.648, r: 225.44, marker: -283.309, t0: 0.36, t1: 0.64, c1: "#ccc7ff", c2: "#f8ae6a" },
];

/**
 * How far the labels and markers fall behind the ring as it winds up, degrees
 * clockwise, from source frame 44 (before that they ride it to 0.02°). Averaged
 * over all three stops on every frame they were measured on; the last two are
 * carried on, since by then every label is a smear.
 */
export const DRIFT_FROM = 44;
export const LABEL_DRIFT = [
  0, 0.016, 0.02, 0.027, 0.041, 0.055, 0.061, 0.068, 0.082, 0.095, 0.113, 0.133, 0.149, 0.169, 0.192,
  0.214, 0.236, 0.262, 0.285, 0.315, 0.356, 0.4, 0.447, 0.496, 0.545, 0.598, 0.673, 0.771, 0.86, 0.95,
];
export const MARKER_DRIFT = [
  0, 0.018, 0.02, 0.02, 0.023, 0.025, 0.025, 0.031, 0.04, 0.044, 0.046, 0.055, 0.069, 0.082, 0.094,
  0.106, 0.118, 0.128, 0.14, 0.155, 0.164, 0.181, 0.204, 0.224, 0.24, 0.26, 0.313, 0.388, 0.44, 0.5,
];

export const driftAt = (table: readonly number[], s: number) => (s <= DRIFT_FROM ? 0 : tableAt(table, s - DRIFT_FROM));

/** Pill at zoom 1: a stadium, its icon concentric with the left cap; Archivo 500 capitals, pen and trailing pad. */
export const PILL = { h: 20.15, icon: 15.8, penX: 24.33, padR: 7.54, weight: 500, size: 8.547, tracking: 0.424, capHalf: 2.98 } as const;
/** Marker: a dot on a lengthened dash, px along the ring (clockwise positive). */
export const MARKER = { r: 2.3, from: -5.45, to: 5.7 } as const;

/** Where a stop's label (or marker) is at `s`, in recording px, with its blur. */
export function stopState(angle: number, drift: readonly number[], radius: number, shutter: number, s: number) {
  const z = zoomAt(s);
  const th = ((angle + spinAt(s) + driftAt(drift, s)) * Math.PI) / 180;
  const r = radius * z;
  const cos = Math.cos(th);
  const sin = Math.sin(th);
  return {
    z,
    x: CX + r * cos,
    y: CY + r * sin * AY,
    theta: th,
    // The tangent, and the length of the smear along it.
    ux: -sin,
    uy: cos,
    blur: shutter * ((spinSpeed(s) * Math.PI) / 180) * r,
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   The line
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Archivo at weight 350 and 18.16px, centred on x = 358.24 with its baseline at
 * 205.23. Picked from all 1,804 Google families by fitting each to the settled
 * line: it is the only one whose comma, y and word spacing all land.
 */
export const LINE = { weight: 350, size: 18.156, tracking: 0.162, baseline: 205.284, centre: 358.131, sigma: 0.595 } as const;

/**
 * Each word rises, clears and sharpens on its own curve, a word at a time from
 * the left. Fitted to all five words over the 43 frames they move in (ty at
 * 0.035px); the curves start before the recording does, so their first frames
 * are carried back on the fit.
 */
export const RISE = {
  ty: { at: -8.2, stagger: 1.399, dur: 37.33, from: 18.311, curve: [0.1554, 0.3742, 0.1197, 1] },
  opacity: { at: -6.28, stagger: 1.536, dur: 49.21, from: 0.495, curve: [0.1508, 1.0366, 0.3986, 0.9863] },
  blur: { at: -8.55, stagger: 1.702, dur: 47.23, from: 1.231, curve: [0.2489, 1.2798, 0.66, 0.678] },
} as const;

type Track = (typeof RISE)[keyof typeof RISE];
const trackAt = (t: Track, word: number, s: number) => {
  const [x1, y1, x2, y2] = t.curve;
  return bezier(x1, y1, x2, y2, (s - t.at - word * t.stagger) / t.dur);
};

export function wordAt(word: number, s: number) {
  return {
    ty: RISE.ty.from * (1 - trackAt(RISE.ty, word, s)),
    opacity: Math.min(1, RISE.opacity.from + (1 - RISE.opacity.from) * trackAt(RISE.opacity, word, s)),
    blur: Math.max(0, RISE.blur.from * (1 - trackAt(RISE.blur, word, s))),
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   Painting
   ───────────────────────────────────────────────────────────────────────── */

export function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Stage = { k: number; offX: number; offY: number };

/** Pull pixel `p` toward `rgb` by `a`. */
function blend(data: Uint8ClampedArray, p: number, rgb: readonly number[], a: number) {
  data[p] = (data[p] ?? 0) + ((rgb[0] ?? 0) - (data[p] ?? 0)) * a;
  data[p + 1] = (data[p + 1] ?? 0) + ((rgb[1] ?? 0) - (data[p + 1] ?? 0)) * a;
  data[p + 2] = (data[p + 2] ?? 0) + ((rgb[2] ?? 0) - (data[p + 2] ?? 0)) * a;
}

/**
 * The rings into `img`, over paper. Each pixel is pulled toward `ink` by its
 * darkness (of 247, the recording's paper), so the defaults give back the
 * recording's grey levels. `markers` lengthen the inner ring's dash under each
 * marker (angles in radians).
 */
export function paintRings(img: ImageData, s: number, st: Stage, paper: string, ink: string, markers: readonly number[], fade: number) {
  const { width: w, height: h, data } = img;
  const [pr, pg, pb] = parseHex(paper);
  const rgb = parseHex(ink);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = pr;
    data[i + 1] = pg;
    data[i + 2] = pb;
    data[i + 3] = 255;
  }
  const { k, offX, offY } = st;
  const lut = new Float32Array(LUT + 1);
  RINGS.forEach((ring, ri) => {
    const rs = ringState(ring, s);
    const z = rs.r / ring.r;
    for (let j = 0; j <= LUT; j++) lut[j] = dashAt((j / LUT) * rs.period, rs.period, ring.duty, TANGENT_SIGMA, rs.blur);
    const windows = ri === 0 ? markers : [];
    const reach = 4.5 * ring.sigma;
    const outer = rs.r + reach;
    const inner = Math.max(0, rs.r - reach);
    const y0 = Math.max(0, Math.floor((ring.cy - outer * AY) * k + offY));
    const y1 = Math.min(h - 1, Math.ceil((ring.cy + outer * AY) * k + offY));
    for (let Y = y0; Y <= y1; Y++) {
      const dy = ((Y + 0.5 - offY) / k - ring.cy) / AY;
      if (Math.abs(dy) > outer) continue;
      const xo = Math.sqrt(outer * outer - dy * dy);
      const xi2 = inner * inner - dy * dy;
      const xi = xi2 > 0 ? Math.sqrt(xi2) : 0;
      const spans: [number, number][] = xi > 0 ? [[-xo, -xi], [xi, xo]] : [[-xo, xo]];
      for (const [a, b] of spans) {
        const X0 = Math.max(0, Math.floor((ring.cx + a) * k + offX - 0.5));
        const X1 = Math.min(w - 1, Math.ceil((ring.cx + b) * k + offX - 0.5));
        for (let X = X0; X <= X1; X++) {
          const dx = (X + 0.5 - offX) / k - ring.cx;
          const g = (Math.sqrt(dx * dx + dy * dy) - rs.r) / ring.sigma;
          if (g * g > 20) continue;
          const th = Math.atan2(dy, dx);
          let u = ((th - rs.phase) * rs.r) % rs.period;
          if (u < 0) u += rs.period;
          const f = (u / rs.period) * LUT;
          const fi = Math.floor(f);
          let d = (lut[fi] ?? 0) + ((lut[fi + 1] ?? 0) - (lut[fi] ?? 0)) * (f - fi);
          for (const m of windows) {
            let v = (th - m) % (2 * Math.PI);
            if (v > Math.PI) v -= 2 * Math.PI;
            if (v < -Math.PI) v += 2 * Math.PI;
            d = Math.max(d, boxAt(v * rs.r - MARKER.from * z, (MARKER.to - MARKER.from) * z, TANGENT_SIGMA, rs.blur));
          }
          const alpha = Math.min(1, (fade * rs.dark * Math.exp(-0.5 * g * g) * d) / 247);
          if (alpha > 0) blend(data, (Y * w + X) * 4, rgb, alpha);
        }
      }
    }
  });
}

/** A marker's dot: a disc blurred by the capture and smeared along the orbit. */
export function paintDot(
  img: ImageData,
  st: Stage,
  dot: { x: number; y: number; r: number; ux: number; uy: number; blur: number },
  rgb: readonly number[],
  fade: number,
) {
  const { k, offX, offY } = st;
  const sigma = 0.6;
  const reach = dot.r + 3 * sigma + dot.blur / 2 + 1;
  const n = Math.max(1, Math.ceil(dot.blur / 0.25) + 1);
  const X0 = Math.max(0, Math.floor((dot.x - reach) * k + offX));
  const X1 = Math.min(img.width - 1, Math.ceil((dot.x + reach) * k + offX));
  const Y0 = Math.max(0, Math.floor((dot.y - reach) * k + offY));
  const Y1 = Math.min(img.height - 1, Math.ceil((dot.y + reach) * k + offY));
  for (let Y = Y0; Y <= Y1; Y++) {
    const y = (Y + 0.5 - offY) / k;
    for (let X = X0; X <= X1; X++) {
      const x = (X + 0.5 - offX) / k;
      let cov = 0;
      for (let j = 0; j < n; j++) {
        const t = n === 1 ? 0 : (j / (n - 1) - 0.5) * dot.blur;
        const d = Math.hypot(x - dot.x - t * dot.ux, y - dot.y - t * dot.uy);
        cov += 0.5 * (1 - erf((d - dot.r) / (Math.SQRT2 * sigma)));
      }
      const a = (fade * cov) / n;
      if (a > 1 / 512) blend(img.data, (Y * img.width + X) * 4, rgb, a);
    }
  }
}

/** A premultiplied RGBA patch of the frame, at device pixels. */
export type Patch = { x: number; y: number; w: number; h: number; px: Float32Array };

/**
 * Paint something at `SS` times over size and average it down. `paint` draws in
 * device pixels; `blur` (device px) is applied to the whole of it at once. A
 * canvas still puts each baseline on a whole pixel of the big canvas, so the
 * line — which rises slowly — is drawn at 8x and the labels, which never do, at 4x.
 */
function rasterise(
  work: HTMLCanvasElement,
  soft: HTMLCanvasElement,
  box: { x0: number; y0: number; x1: number; y1: number },
  blur: number,
  SS: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
): Patch | null {
  const x = Math.floor(box.x0);
  const y = Math.floor(box.y0);
  const w = Math.ceil(box.x1) - x;
  const h = Math.ceil(box.y1) - y;
  if (w <= 0 || h <= 0) return null;
  work.width = w * SS;
  work.height = h * SS;
  soft.width = w * SS;
  soft.height = h * SS;
  const wc = work.getContext("2d");
  const sc = soft.getContext("2d", { willReadFrequently: true });
  if (!wc || !sc) return null;
  wc.setTransform(SS, 0, 0, SS, -x * SS, -y * SS);
  paint(wc);
  sc.filter = blur > 0.01 ? `blur(${(blur * SS).toFixed(3)}px)` : "none";
  sc.drawImage(work, 0, 0);
  const src = sc.getImageData(0, 0, w * SS, h * SS).data;
  const px = new Float32Array(w * h * 4);
  const norm = 1 / (SS * SS * 255);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let dj = 0; dj < SS; dj++) {
        let p = ((j * SS + dj) * w * SS + i * SS) * 4;
        for (let di = 0; di < SS; di++, p += 4) {
          const al = src[p + 3] ?? 0;
          r += (src[p] ?? 0) * al;
          g += (src[p + 1] ?? 0) * al;
          b += (src[p + 2] ?? 0) * al;
          a += al;
        }
      }
      const q = (j * w + i) * 4;
      px[q] = r * norm;
      px[q + 1] = g * norm;
      px[q + 2] = b * norm;
      px[q + 3] = a / (SS * SS);
    }
  }
  return { x, y, w, h, px };
}

/** Smear a patch `len` device px along (ux, uy): a box, sampled every quarter pixel. */
export function smear(p: Patch, ux: number, uy: number, len: number): Patch {
  if (len < 0.05) return p;
  const pad = Math.ceil(len / 2) + 1;
  const w = p.w + 2 * pad;
  const h = p.h + 2 * pad;
  const px = new Float32Array(w * h * 4);
  const n = Math.max(2, Math.ceil(len / 0.25) + 1);
  const at = (i: number, j: number, c: number) => (i < 0 || j < 0 || i >= p.w || j >= p.h ? 0 : (p.px[(j * p.w + i) * 4 + c] ?? 0));
  for (let t = 0; t < n; t++) {
    const off = (t / (n - 1) - 0.5) * len;
    const sx = off * ux;
    const sy = off * uy;
    for (let j = 0; j < h; j++) {
      const fy = j - pad - sy;
      const j0 = Math.floor(fy);
      const ay = fy - j0;
      for (let i = 0; i < w; i++) {
        const fx = i - pad - sx;
        const i0 = Math.floor(fx);
        const ax = fx - i0;
        const q = (j * w + i) * 4;
        for (let c = 0; c < 4; c++) {
          px[q + c] =
            (px[q + c] ?? 0) +
            ((1 - ay) * ((1 - ax) * at(i0, j0, c) + ax * at(i0 + 1, j0, c)) + ay * ((1 - ax) * at(i0, j0 + 1, c) + ax * at(i0 + 1, j0 + 1, c))) / n;
        }
      }
    }
  }
  return { x: p.x - pad, y: p.y - pad, w, h, px };
}

function composite(img: ImageData, p: Patch) {
  for (let j = 0; j < p.h; j++) {
    const Y = p.y + j;
    if (Y < 0 || Y >= img.height) continue;
    for (let i = 0; i < p.w; i++) {
      const X = p.x + i;
      if (X < 0 || X >= img.width) continue;
      const q = (j * p.w + i) * 4;
      const a = (p.px[q + 3] ?? 0) / 255;
      if (a <= 0) continue;
      const d = (Y * img.width + X) * 4;
      img.data[d] = (img.data[d] ?? 0) * (1 - a) + (p.px[q] ?? 0);
      img.data[d + 1] = (img.data[d + 1] ?? 0) * (1 - a) + (p.px[q + 1] ?? 0);
      img.data[d + 2] = (img.data[d + 2] ?? 0) * (1 - a) + (p.px[q + 2] ?? 0);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   The component
   ───────────────────────────────────────────────────────────────────────── */

export const parseList = (v: string) =>
  v
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean);

type Measured = { key: string; words: { text: string; x: number }[]; labels: number[] };

export type OrbitFlowProps = {
  /** The line in the middle; it rises a word at a time. */
  line?: string;
  /** Three ;-separated labels, from the one on the left clockwise. */
  labels?: string;
  paper?: string;
  /** The rings. */
  ink?: string;
  text?: string;
  pill?: string;
  labelText?: string;
  marker?: string;
  speed?: number;
};

export function OrbitFlow({
  line = "Your demo, in continuous motion",
  labels = "INSTALL;COMPOSE;RENDER",
  paper = "#f7f7f7",
  ink = "#000000",
  text = "#3b3b3b",
  pill = "#edebe7",
  labelText = "#403e3c",
  marker = "#898687",
  speed = 1,
}: OrbitFlowProps) {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const canvas = useRef<HTMLCanvasElement>(null);
  const scratch = useRef<[HTMLCanvasElement, HTMLCanvasElement] | null>(null);

  const names = parseList(labels);
  const key = `${line}|${names.join(";")}`;
  const [measured, setMeasured] = useState<Measured | null>(null);
  const [handle] = useState(() => delayRender("orbit-flow: loading Archivo"));

  useEffect(() => {
    let cancelled = false;
    loadArchivo()
      .then(() => {
        if (cancelled) return;
        const ctx = document.createElement("canvas").getContext("2d");
        if (!ctx) return;
        // Layout in recording px: the line is centred with its trailing tracking,
        // as CSS centres it; each word starts where the text before it ends.
        ctx.font = `${LINE.weight} ${LINE.size}px ${ARCHIVO}`;
        ctx.letterSpacing = `${LINE.tracking}px`;
        const x0 = LINE.centre - ctx.measureText(line).width / 2;
        const words: { text: string; x: number }[] = [];
        let at = 0;
        for (const part of line.split(/(\s+)/)) {
          if (part.trim()) words.push({ text: part, x: x0 + ctx.measureText(line.slice(0, at)).width });
          at += part.length;
        }
        ctx.font = `${PILL.weight} ${PILL.size}px ${ARCHIVO}`;
        ctx.letterSpacing = `${PILL.tracking}px`;
        const widths = names.map((n) => PILL.penX + ctx.measureText(n).width + PILL.padR);
        setMeasured({ key, words, labels: widths });
      });
    return () => {
      cancelled = true;
    };
    // `key` is every input the layout reads.
  }, [key]);

  useEffect(() => {
    if (measured) continueRender(handle);
  }, [measured, handle]);

  // The recording's clock.
  const s = (frame / fps) * REF_FPS * speed - LEAD_IN;
  const k = Math.max(width / REF_W, height / REF_H);
  const offX = (width - REF_W * k) / 2;
  const offY = (height - REF_H * k) / 2;

  useLayoutEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !measured || measured.key !== key) return;
    if (!scratch.current) scratch.current = [document.createElement("canvas"), document.createElement("canvas")];
    const [work, soft] = scratch.current;
    const st = { k, offX, offY };
    const fade = enterAt(s);
    const img = ctx.createImageData(width, height);

    const stops = STOPS.slice(0, Math.max(1, names.length)).map((stop, i) => ({
      stop,
      name: names[i] ?? "",
      width: measured.labels[i] ?? 0,
      label: stopState(stop.at, LABEL_DRIFT, stop.r, 0.47, s),
      dot: stopState(stop.marker, MARKER_DRIFT, RINGS[0]?.r ?? 170.11, 0.5, s),
    }));

    paintRings(img, s, st, paper, ink, stops.map((o) => o.dot.theta), fade);
    const markRgb = parseHex(marker);
    for (const { dot } of stops) paintDot(img, st, { ...dot, r: MARKER.r * dot.z }, markRgb, fade);

    for (const { stop, name, width: pw, label } of stops) {
      const S = label.z * k;
      const cx = offX + label.x * k;
      const cy = offY + label.y * k;
      const w = pw * S;
      const h = PILL.h * S;
      const margin = 3 * 0.6 * k + 1;
      const patch = rasterise(
        work,
        soft,
        { x0: cx - w / 2 - margin, y0: cy - h / 2 - margin, x1: cx + w / 2 + margin, y1: cy + h / 2 + margin },
        0.606 * k,
        4,
        (c) => {
          c.globalAlpha = fade;
          const left = cx - w / 2;
          c.fillStyle = pill;
          c.beginPath();
          c.roundRect(left, cy - h / 2, w, h, h / 2);
          c.fill();
          const ir = (PILL.icon / 2) * S;
          const icx = left + h / 2;
          const grad = c.createLinearGradient(0, cy - ir, 0, cy + ir);
          const [r1, g1, b1] = parseHex(stop.c1);
          grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0)`);
          grad.addColorStop(stop.t0, `rgba(${r1}, ${g1}, ${b1}, 0)`);
          grad.addColorStop(stop.t1, stop.c1);
          grad.addColorStop(1, stop.c2);
          c.fillStyle = grad;
          c.beginPath();
          c.arc(icx, cy, ir, 0, 2 * Math.PI);
          c.fill();
          c.fillStyle = labelText;
          c.font = `${PILL.weight} ${PILL.size * S}px ${ARCHIVO}`;
          c.letterSpacing = `${PILL.tracking * S}px`;
          c.fillText(name, left + PILL.penX * S, cy + PILL.capHalf * S);
        },
      );
      if (patch) composite(img, smear(patch, label.ux, label.uy * AY, label.blur * k));
    }

    measured.words.forEach((word, i) => {
      const m = wordAt(i, s);
      const size = LINE.size * k;
      const x = offX + word.x * k;
      const y = offY + (LINE.baseline + m.ty) * k;
      const blur = Math.hypot(LINE.sigma, m.blur) * k;
      const margin = 3 * blur + 1;
      const patch = rasterise(
        work,
        soft,
        { x0: x - margin - size, y0: y - size * 1.1 - margin, x1: x + size * 0.62 * word.text.length + size + margin, y1: y + size * 0.4 + margin },
        blur,
        8,
        (c) => {
          c.globalAlpha = fade * m.opacity;
          c.fillStyle = text;
          c.font = `${LINE.weight} ${size}px ${ARCHIVO}`;
          c.letterSpacing = `${LINE.tracking * k}px`;
          c.fillText(word.text, x, y);
        },
      );
      if (patch) composite(img, patch);
    });

    ctx.putImageData(img, 0, 0);
  }, [s, k, offX, offY, width, height, paper, ink, text, pill, labelText, marker, measured, key]);

  return (
    <AbsoluteFill style={{ background: paper, overflow: "hidden" }}>
      <canvas ref={canvas} width={width} height={height} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </AbsoluteFill>
  );
}
