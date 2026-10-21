"use client";

import {
  ShaderMeshGradient,
  type ShaderMeshGradientProps,
} from "@/components/remocn/shader-mesh-gradient";

// Studio Sozo: cream into pink, finishing in indigo.
// Props you pass override the preset, except `speed`, which scales the preset's own pace.

export const shaderMeshGradientLavenderPreset = {
  speed: 0.35,
  colors: [
    "hsla(47, 100%, 87%, 1)",
    "hsla(334, 81%, 60%, 1)",
    "hsla(237, 64%, 56%, 1)",
  ],
  distortion: 0.85,
  swirl: 0.08,
  grainMixer: 0.28,
  scale: 0.9,
  rotation: 0,
} satisfies ShaderMeshGradientProps;

export function ShaderMeshGradientLavender({
  speed = 1,
  ...props
}: ShaderMeshGradientProps) {
  return (
    <ShaderMeshGradient
      {...shaderMeshGradientLavenderPreset}
      {...props}
      speed={shaderMeshGradientLavenderPreset.speed * speed}
    />
  );
}
