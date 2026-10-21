"use client";

import { useEffect, useRef, useState } from "react";

import { ShaderMeshGradientLavender } from "@/components/remocn/shader-mesh-gradient-lavender";

let latestMeshUrl = "";
let meshGeneration = 0;
const mountedMeshInks = new Set<HTMLElement>();

function markMeshScale(el: HTMLElement) {
  const size = Number.parseFloat(getComputedStyle(el).fontSize);
  el.dataset.meshScale = size > 0 && size < 36 ? "small" : "large";
}

function paintMeshInk(el: HTMLElement, url: string) {
  if (el.dataset.meshScale === "small") {
    el.style.backgroundImage = "";
    delete el.dataset.meshReady;
    return;
  }
  if (!url) return;
  el.style.backgroundImage = `url("${url}")`;
  el.dataset.meshReady = "";
}

function applyMesh(url: string) {
  latestMeshUrl = url;
  meshGeneration += 1;
  const measure = meshGeneration % 12 === 1;
  mountedMeshInks.forEach((el) => {
    if (!el.isConnected) {
      mountedMeshInks.delete(el);
      return;
    }
    if (measure || !el.dataset.meshScale) markMeshScale(el);
    paintMeshInk(el, url);
  });
}

export function BrandMeshHost() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSpeed(media.matches ? 0 : 1);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const scratch = document.createElement("canvas");
    scratch.width = 480;
    scratch.height = 320;
    const context = scratch.getContext("2d");
    let pending = false;
    let stopped = false;
    let previousUrl = "";
    let animation = 0;
    let lastCapture = 0;
    let scrollingUntil = 0;

    const onScroll = () => {
      scrollingUntil = performance.now() + 140;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const paint = (now: number) => {
      if (stopped) return;
      const source = hostRef.current?.querySelector("canvas");
      const due = now - lastCapture >= 90;
      const idle = now >= scrollingUntil || !previousUrl;
      if (context && source && source.width > 0 && !pending && due && idle) {
        lastCapture = now;
        context.drawImage(source, 0, 0, scratch.width, scratch.height);
        pending = true;
        scratch.toBlob(
          (blob) => {
            if (stopped || !blob) {
              pending = false;
              return;
            }
            const next = URL.createObjectURL(blob);
            const preloader = new Image();
            preloader.src = next;
            const commit = () => {
              pending = false;
              if (stopped) {
                URL.revokeObjectURL(next);
                return;
              }
              const retire = previousUrl;
              previousUrl = next;
              applyMesh(next);
              if (retire) {
                setTimeout(() => URL.revokeObjectURL(retire), 250);
              }
            };
            if (typeof preloader.decode === "function") {
              preloader.decode().then(commit, commit);
            } else {
              preloader.onload = preloader.onerror = commit;
            }
          },
          "image/webp",
          0.85,
        );
      }
      animation = requestAnimationFrame(paint);
    };

    animation = requestAnimationFrame(paint);
    return () => {
      stopped = true;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animation);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed top-0 -left-[9999px] -z-50 h-[640px] w-[960px] overflow-hidden opacity-0"
    >
      <div className="relative h-full w-full">
        <ShaderMeshGradientLavender
          speed={speed}
          webGlContextAttributes={{
            preserveDrawingBuffer: true,
            alpha: true,
          }}
        />
      </div>
    </div>
  );
}

export function MeshInk({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    mountedMeshInks.add(el);
    markMeshScale(el);
    paintMeshInk(el, latestMeshUrl);
    return () => {
      mountedMeshInks.delete(el);
    };
  }, []);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className="brand-mesh-ink"
      data-brand-mesh-ink=""
    >
      {children}
    </span>
  );
}
