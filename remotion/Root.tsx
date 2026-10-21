import React from "react";
import { Composition } from "remotion";
import {
  StudioSozoAd,
  STUDIO_SOZO_AD_DURATION_IN_FRAMES,
  STUDIO_SOZO_AD_FPS,
  STUDIO_SOZO_AD_HEIGHT,
  STUDIO_SOZO_AD_WIDTH,
} from "./StudioSozoAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StudioSozoAd"
      component={StudioSozoAd}
      durationInFrames={STUDIO_SOZO_AD_DURATION_IN_FRAMES}
      fps={STUDIO_SOZO_AD_FPS}
      width={STUDIO_SOZO_AD_WIDTH}
      height={STUDIO_SOZO_AD_HEIGHT}
    />
  );
};
