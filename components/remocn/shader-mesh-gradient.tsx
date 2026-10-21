"use client";

import {
  MeshGradient,
  type MeshGradientProps,
} from "@paper-design/shaders-react";

const NEUTRAL_COLORS = ["#12121a", "#232338", "#3a3a5c", "#52527a"];

export interface ShaderMeshGradientProps
  extends Omit<MeshGradientProps, "frame" | "ref"> {}

export function ShaderMeshGradient({
  speed = 1,
  colors = NEUTRAL_COLORS,
  distortion = 0.6,
  swirl = 0.1,
  className,
  ...rest
}: ShaderMeshGradientProps) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <MeshGradient
        speed={speed}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        fit="cover"
        width="100%"
        height="100%"
        style={{ width: "100%", height: "100%" }}
        {...rest}
      />
    </div>
  );
}
