"use client";

import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { SnapCnUIProvider, type SnapCnTheme } from "@/lib/snap-cn-ui";
import { Manifesto } from "@/components/snap-cn/manifesto";
import { SentenceSet } from "@/components/snap-cn/sentence-set";
import { StatusCycle } from "@/components/snap-cn/status-cycle";
import { CardRail, type RailCard } from "@/components/snap-cn/card-rail";
import { CheckCycle } from "@/components/snap-cn/check-cycle";
import { LogoAssemble } from "@/components/snap-cn/logo-assemble";

export const STUDIO_SOZO_AD_FPS = 30;
export const STUDIO_SOZO_AD_WIDTH = 1280;
export const STUDIO_SOZO_AD_HEIGHT = 720;
export const TRANSITION_FRAMES = 18;

export const STUDIO_SOZO_BG = "#ffffff";
export const STUDIO_SOZO_SURFACE = "#f8fafc";
export const STUDIO_SOZO_SURFACE_ALT = "#eef2f6";
export const STUDIO_SOZO_FG = "#0a2540";
export const STUDIO_SOZO_MUTED = "#425466";
export const STUDIO_SOZO_SUBTLE = "#8898aa";
export const STUDIO_SOZO_BORDER = "#e3e8ee";
export const STUDIO_SOZO_ACCENT = "#635bff";
export const STUDIO_SOZO_CYAN = "#38bdf8";

const BEAT_DURATIONS = {
  manifesto: 135,
  thesis: 90,
  capabilities: 216,
  cardRail: 126,
  checkCycle: 154,
  logoAssemble: 108,
} as const;

export const STUDIO_SOZO_AD_DURATION_IN_FRAMES =
  BEAT_DURATIONS.manifesto +
  BEAT_DURATIONS.thesis +
  BEAT_DURATIONS.capabilities +
  BEAT_DURATIONS.cardRail +
  BEAT_DURATIONS.checkCycle +
  BEAT_DURATIONS.logoAssemble -
  5 * TRANSITION_FRAMES; // 739 frames (24.63s @ 30fps)

export interface StudioSozoAdBeat {
  id: string;
  code: string;
  label: string;
  detail: string;
  startFrame: number;
  endFrame: number;
}

export const STUDIO_SOZO_AD_BEATS: readonly StudioSozoAdBeat[] = [
  {
    id: "manifesto",
    code: "01 // MANIFESTO",
    label: "Own It Outright",
    detail: "Stop renting Wix & WordPress. Stop paying monthly fees. Own it.",
    startFrame: 0,
    endFrame: 117,
  },
  {
    id: "thesis",
    code: "02 // THE THESIS",
    label: "Custom Built",
    detail: "Custom websites and software built for you to own and sell.",
    startFrame: 117,
    endFrame: 189,
  },
  {
    id: "capabilities",
    code: "03 // CAPABILITIES",
    label: "Full Control",
    detail: "Custom CRMs, Client Portals, AI Agents, and Quoting Engines.",
    startFrame: 189,
    endFrame: 387,
  },
  {
    id: "card-rail",
    code: "04 // SHIPPED PLATFORMS",
    label: "Card Rail",
    detail: "Shipped client platforms flicked across a tilted 3D plane.",
    startFrame: 387,
    endFrame: 495,
  },
  {
    id: "check-cycle",
    code: "05 // SOZO WILL CREATE",
    label: "Sozo Will Create",
    detail: "Sozo will create custom CRMs, Portals, AI Agents, and more.",
    startFrame: 495,
    endFrame: 631,
  },
  {
    id: "lockup",
    code: "06 // STUDIO SOZO",
    label: "studio sozo.",
    detail: "Own your software outright at studiosozo.dev",
    startFrame: 631,
    endFrame: STUDIO_SOZO_AD_DURATION_IN_FRAMES,
  },
] as const;

const slideTransition = {
  presentation: slide(),
  timing: springTiming({
    durationInFrames: TRANSITION_FRAMES,
    config: { damping: 200 },
  }),
};

const sozoLightTheme: Partial<SnapCnTheme> = {
  background: STUDIO_SOZO_BG,
  foreground: STUDIO_SOZO_FG,
  card: STUDIO_SOZO_BG,
  cardForeground: STUDIO_SOZO_FG,
  popover: STUDIO_SOZO_BG,
  popoverForeground: STUDIO_SOZO_FG,
  primary: STUDIO_SOZO_ACCENT,
  primaryForeground: "#ffffff",
  secondary: "#f6f9fc",
  secondaryForeground: STUDIO_SOZO_FG,
  muted: "#f6f9fc",
  mutedForeground: STUDIO_SOZO_MUTED,
  accent: "#f6f9fc",
  accentForeground: STUDIO_SOZO_FG,
  border: STUDIO_SOZO_BORDER,
  input: STUDIO_SOZO_BORDER,
  ring: STUDIO_SOZO_ACCENT,
  radius: 10,
};

const SOZO_RAIL_CARDS: readonly RailCard[] = [
  {
    image: "/projects/sozo-crm.jpg",
    title: "Sozo CRM",
    subtitle: "Solar CRM",
    note: "Stage-gated solar sales pipeline, mobile rep workspace, utility verification & automated commission payouts.",
    tag: "100% Owned",
    metrics: ["$0 Per-Seat Tax", "Live Analytics"],
  },
  {
    image: "/projects/elevate-solar.jpg",
    title: "Elevate Solar",
    subtitle: "Quoting Funnel",
    note: "Interactive utility & roof intake funnel with instant lead scoring, rep dispatch & real-time CRM sync.",
    tag: "Custom Platform",
    metrics: ["24/7 Intake", "<1s Load"],
  },
  {
    image: "/projects/angler-iq.jpg",
    title: "Angler IQ",
    subtitle: "iOS + Web AI",
    note: "AI Co-Angler synthesizing live barometric telemetry, water conditions & GPS catch logs into lure game plans.",
    tag: "Mobile + AI",
    metrics: ["Live Telemetry", "AI Engine"],
  },
  {
    image: "/projects/hr-hvac.jpg",
    title: "H&R HVAC",
    subtitle: "Field Dispatch",
    note: "60-second emergency symptom triage, priority dispatch scheduling & instant on-call technician job briefs.",
    tag: "Web App",
    metrics: ["<60s Booking", "24/7 Triage"],
  },
  {
    image: "/projects/dash-lake-rentals.jpg",
    title: "Dash Lake Rentals",
    subtitle: "Fleet Booking",
    note: "Real-time watercraft inventory, slot locking, pre-arrival digital waivers & zero-commission Stripe checkout.",
    tag: "Booking Engine",
    metrics: ["0% Fees", "Digital Waivers"],
  },
  {
    image: "/projects/serene-commerce.jpg",
    title: "Serene Commerce",
    subtitle: "DTC Storefront",
    note: "Bespoke headless storefront with sub-second route transitions, native bundle builder & automated fulfillment sync.",
    tag: "Zero SaaS Fees",
    metrics: ["Sub-1s Routes", "Native Cart"],
  },
];

export const StudioSozoAd: React.FC = () => {
  const projectImagesList = [
    "/projects/sozo-crm.jpg",
    "/projects/elevate-solar.jpg",
    "/projects/angler-iq.jpg",
    "/projects/hr-hvac.jpg",
    "/projects/dash-lake-rentals.jpg",
    "/projects/serene-commerce.jpg",
  ];

  return (
    <SnapCnUIProvider theme={sozoLightTheme} mode="light">
      <AbsoluteFill style={{ background: STUDIO_SOZO_BG }}>
        <TransitionSeries>
          {/* Beat 1: Brand Manifesto Opener (@snapcn/manifesto, 135f) */}
          <TransitionSeries.Sequence
            durationInFrames={BEAT_DURATIONS.manifesto}
          >
            <AbsoluteFill style={{ background: STUDIO_SOZO_BG }}>
              <Manifesto
                lineOne="Stop renting Wix & WordPress."
                lineTwo="Stop paying monthly fees."
                lineThree="Own it."
                fontSize={72}
                payoffSize={184}
                color={STUDIO_SOZO_FG}
                edgeColor={STUDIO_SOZO_ACCENT}
                edgeMidColor={STUDIO_SOZO_CYAN}
                theme={sozoLightTheme}
                mode="light"
              />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition {...slideTransition} />

          {/* Beat 2: Architectural Thesis — SentenceSet (@snapcn/sentence-set, 90f) */}
          <TransitionSeries.Sequence durationInFrames={BEAT_DURATIONS.thesis}>
            <SentenceSet
              lines="Custom websites and software;built for you to own and sell."
              fontSize={54}
              fontWeight={500}
              from={STUDIO_SOZO_SUBTLE}
              to={STUDIO_SOZO_FG}
              background={STUDIO_SOZO_SURFACE}
              startAt={3}
              base={1.8}
              growth={1.2}
              lineGap={8}
              settle={6}
              gap={18}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition {...slideTransition} />

          {/* Beat 3: Capabilities & Platform Chips — StatusCycle (@snapcn/status-cycle, 216f) */}
          <TransitionSeries.Sequence
            durationInFrames={BEAT_DURATIONS.capabilities}
          >
            <StatusCycle
              prefix="Your software is"
              statuses={[
                "custom built",
                "automating workflows",
                "zero monthly rent",
                "100% yours",
              ]}
              chips={[
                "Custom CRMs",
                "Client Portals",
                "AI Agents",
                "Quoting Engines",
                "Full Ownership",
              ]}
              fieldColor={STUDIO_SOZO_ACCENT}
              pageColor={STUDIO_SOZO_BG}
              pillColor={STUDIO_SOZO_FG}
              pillLabelColor="#e0e7ff"
              prefixColor="#ffffff"
              chipFills={["#ffffff", "#eef2ff", STUDIO_SOZO_ACCENT]}
              chipTextColor={STUDIO_SOZO_FG}
              chipBorderColor={STUDIO_SOZO_BORDER}
              theme={sozoLightTheme}
              mode="light"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition {...slideTransition} />

          {/* Beat 4: Shipped Work Carousel — CardRail (@snapcn/card-rail, 126f) */}
          <TransitionSeries.Sequence durationInFrames={BEAT_DURATIONS.cardRail}>
            <CardRail
              heading="Shipped platforms you own outright"
              cards={SOZO_RAIL_CARDS}
              flicks={3}
              every={30}
              from={0}
              offset={0}
              theme={sozoLightTheme}
              mode="light"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition {...slideTransition} />

          {/* Beat 5: "Sozo will create ☑ ..." — CheckCycle (@snapcn/check-cycle, 154f) */}
          <TransitionSeries.Sequence
            durationInFrames={BEAT_DURATIONS.checkCycle}
          >
            <CheckCycle
              headline="Sozo will create"
              words="Custom CRMs, Client Portals, AI Agents, Web Apps, Mobile Apps, And more"
              theme={sozoLightTheme}
              mode="light"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition {...slideTransition} />

          {/* Beat 6: Logo Assemble Finale — LogoAssemble (@snapcn/logo-assemble, 108f) */}
          <TransitionSeries.Sequence
            durationInFrames={BEAT_DURATIONS.logoAssemble}
          >
            <LogoAssemble
              logoSrc="/brand/SVG/studio-sozo_icon_black.svg"
              brandName="studio sozo."
              middleText={"Websites and software\nyou own 100%"}
              images={projectImagesList}
              count={10}
              background={STUDIO_SOZO_BG}
              theme={sozoLightTheme}
              mode="light"
            />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </SnapCnUIProvider>
  );
};

export default StudioSozoAd;
