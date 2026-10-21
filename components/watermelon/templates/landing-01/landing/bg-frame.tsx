"use client";

import type { CSSProperties } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  className?: string;
  alt?: string;
  style?: CSSProperties;
}

const FRAME_RADIUS = 24;
const OUTLINE = 10;

export default function BgFrame({
  imageUrl,
  className,
  alt = "Image frame",
  style,
}: Props) {
  return (
    <LiquidGlass
      radius={FRAME_RADIUS}
      ringInset={OUTLINE}
      bevelDepth={OUTLINE}
      scale={24}
      aberration={0}
      frost={0}
      tint={0.5}
      style={{ padding: OUTLINE, ...style }}
      surfaceStyle={{
        boxShadow:
          "inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 0 0 1px rgb(255 255 255 / 0.55)",
      }}
      className={cn(
        "w-full shadow-[0_18px_50px_rgb(10_37_64/0.16)] transition-transform duration-300 hover:scale-[1.04]",
        className,
      )}
    >
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="relative z-10 block h-auto w-full bg-white object-cover"
        style={{ borderRadius: FRAME_RADIUS - OUTLINE }}
      />
    </LiquidGlass>
  );
}
