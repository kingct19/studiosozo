"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import {
  StudioSozoAd,
  STUDIO_SOZO_AD_BEATS,
  STUDIO_SOZO_AD_DURATION_IN_FRAMES,
  STUDIO_SOZO_AD_FPS,
  STUDIO_SOZO_AD_HEIGHT,
  STUDIO_SOZO_AD_WIDTH,
} from "@/remotion/StudioSozoAd";

export function StudioSozoAdShowcase() {
  const playerRef = useRef<PlayerRef>(null);
  const [mounted, setMounted] = useState(false);
  const [activeBeatId, setActiveBeatId] = useState<string>(
    STUDIO_SOZO_AD_BEATS[0].id,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const player = playerRef.current;
    if (!player) return;

    const handleFrameUpdate = (e: { detail: { frame: number } }) => {
      const frame = e.detail.frame;
      const matchingBeat =
        STUDIO_SOZO_AD_BEATS.find(
          (beat) => frame >= beat.startFrame && frame < beat.endFrame,
        ) ?? STUDIO_SOZO_AD_BEATS[STUDIO_SOZO_AD_BEATS.length - 1];

      if (matchingBeat) {
        setActiveBeatId((prev) =>
          prev === matchingBeat.id ? prev : matchingBeat.id,
        );
      }
    };

    player.addEventListener("frameupdate", handleFrameUpdate);
    return () => {
      player.removeEventListener("frameupdate", handleFrameUpdate);
    };
  }, [mounted]);

  const handleSeekToBeat = useCallback((startFrame: number, beatId: string) => {
    setActiveBeatId(beatId);
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(startFrame);
    player.play();
  }, []);

  return (
    <section
      aria-label="Studio Sozo Brand Manifesto Film"
      className="relative w-full border-t border-b border-[#e3e8ee] bg-[#f8fafc] py-20 md:py-28"
    >
      {/* Subtle technical dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.06)_1px,transparent_1px)] bg-size-[24px_24px]"
      />

      <Container className="relative z-10">
        {/* Section Eyebrow & Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#635bff] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#635bff]" />
              [ STUDIO SOZO // THE OWNERSHIP MANIFESTO ]
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl md:text-5xl">
              Ditch Wix, WordPress &amp; Monthly Rent.{" "}
              <span className="text-[#635bff]">Own It Outright.</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed font-medium text-[#425466] sm:text-base">
            We build custom websites and software platforms that you own 100%
            and can sell as a real business asset—with zero third-party monthly
            subscriptions and full control.
          </p>
        </div>

        {/* Light Architectural Video Frame aligned with site design system */}
        <div className="overflow-hidden rounded-[24px] border border-[#e3e8ee] bg-white shadow-[0_24px_64px_rgba(10,37,64,0.08)]">
          <div className="relative aspect-video w-full bg-white">
            {mounted ? (
              <Player
                ref={playerRef}
                component={StudioSozoAd}
                durationInFrames={STUDIO_SOZO_AD_DURATION_IN_FRAMES}
                compositionWidth={STUDIO_SOZO_AD_WIDTH}
                compositionHeight={STUDIO_SOZO_AD_HEIGHT}
                fps={STUDIO_SOZO_AD_FPS}
                autoPlay
                loop
                controls={false}
                clickToPlay
                acknowledgeRemotionLicense
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white">
                <span className="font-sans text-2xl font-semibold tracking-tight text-[#0a2540] sm:text-4xl">
                  Stop renting Wix &amp; WordPress.
                </span>
              </div>
            )}
          </div>

          {/* Interactive Chapter Bar */}
          <div className="grid grid-cols-2 border-t border-[#e3e8ee] bg-[#f8fafc] sm:grid-cols-3 lg:grid-cols-6">
            {STUDIO_SOZO_AD_BEATS.map((beat) => {
              const isActive = activeBeatId === beat.id;
              return (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => handleSeekToBeat(beat.startFrame, beat.id)}
                  className={`group relative flex flex-col items-start gap-1 border-r border-b border-[#e3e8ee] px-4 py-3.5 text-left transition-colors last:border-r-0 lg:border-b-0 ${
                    isActive
                      ? "bg-white text-[#0a2540]"
                      : "bg-[#f8fafc] text-[#425466] hover:bg-white/70 hover:text-[#0a2540]"
                  }`}
                >
                  <span
                    className={`absolute top-0 right-0 left-0 h-0.5 transition-opacity ${
                      isActive
                        ? "bg-[#635bff] opacity-100"
                        : "bg-[#635bff]/40 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] font-bold tracking-widest uppercase ${
                      isActive ? "text-[#635bff]" : "text-[#8898aa]"
                    }`}
                  >
                    {beat.code}
                  </span>
                  <span className="font-sans text-xs font-bold tracking-tight text-[#0a2540]">
                    {beat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudioSozoAdShowcase;
