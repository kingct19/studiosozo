"use client";

import { ArrowUpRight01Icon } from "hugeicons-react";
import Container from "./container";
import Heading from "./heading";
import { motion, type Variants, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BgFrame from "./bg-frame";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { siteConfig } from "@/lib/site";

const ROTATING_WORDS = [
  "Should Be Too.",
  "You Control.",
  "Built to Own.",
  "Tailored to You.",
] as const;

const HERO_IMAGES = [
  "/projects/serene-commerce.jpg",
  "/projects/dash-lake-rentals.jpg",
  "/projects/hr-hvac.jpg",
  "/projects/elevate-solar.jpg",
  "/projects/angler-iq.jpg",
  "/projects/dash-lake-rentals.jpg",
  "/projects/elevate-solar.jpg",
  "/projects/angler-iq.jpg",
  "/projects/sozo-crm.jpg",
  "/projects/hr-hvac.jpg",
];

const IMAGE_POSITIONS = [
  // L4 (Highest, furthest left)
  { top: "-30%", left: "-15%", width: "24%", rotate: "-15deg", zIndex: 1 },
  // R4 (Highest, furthest right)
  { top: "-30%", right: "-15%", width: "24%", rotate: "15deg", zIndex: 1 },

  // L3
  { top: "-10%", left: "-5%", width: "28%", rotate: "-10deg", zIndex: 2 },
  // R3
  { top: "-10%", right: "-5%", width: "28%", rotate: "10deg", zIndex: 2 },

  // L2
  { top: "10%", left: "5%", width: "34%", rotate: "-5deg", zIndex: 3 },
  // R2
  { top: "10%", right: "5%", width: "34%", rotate: "5deg", zIndex: 3 },

  // L1
  { top: "25%", left: "15%", width: "42%", rotate: "-2deg", zIndex: 4 },
  // R1
  { top: "25%", right: "15%", width: "42%", rotate: "2deg", zIndex: 4 },

  // Center (Front, lowest)
  { top: "40%", left: "24%", width: "52%", rotate: "0deg", zIndex: 10 },

  // Top Center (Background Floater)
  { top: "15%", left: "38%", width: "24%", rotate: "0deg", zIndex: 0 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden pt-32 pb-24 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Decorative Technical Borders */}
      <div className="absolute top-24 right-0 left-0 hidden h-px bg-[#0a2540]/6 lg:block" />
      <div className="absolute right-0 bottom-24 left-0 hidden h-px bg-[#0a2540]/6 lg:block" />
      <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-[#0a2540]/6 md:left-16 lg:block" />
      <div className="absolute top-0 right-8 bottom-0 hidden w-px bg-[#0a2540]/6 md:right-16 lg:block" />

      {/* Crosshairs at intersections */}
      <div className="absolute top-24 left-8 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:left-16 lg:block">
        <div className="bg-primary/50 absolute top-1/2 right-0 left-0 h-px" />
        <div className="bg-primary/50 absolute top-0 bottom-0 left-1/2 w-px" />
      </div>
      <div className="absolute top-24 right-8 hidden h-4 w-4 translate-x-1/2 -translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-[#0a2540]/12" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#0a2540]/12" />
      </div>
      <div className="absolute bottom-24 left-8 hidden h-4 w-4 -translate-x-1/2 translate-y-1/2 md:left-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-[#0a2540]/12" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#0a2540]/12" />
      </div>
      <div className="absolute right-8 bottom-24 hidden h-4 w-4 translate-x-1/2 translate-y-1/2 md:right-16 lg:block">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-[#0a2540]/12" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#0a2540]/12" />
      </div>

      {/* Abstract Background Concentric Circles (Left Edge) */}
      <div className="pointer-events-none absolute top-1/2 left-0 flex h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e3e8ee] opacity-30">
        <div className="flex h-[600px] w-[600px] items-center justify-center rounded-full border border-dashed border-[#e3e8ee]">
          <div className="flex h-[400px] w-[400px] items-center justify-center rounded-full border border-[#e3e8ee]">
            <div className="h-[200px] w-[200px] rounded-full border border-dashed border-[#e3e8ee]" />
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center">
        {/* Center-aligned Hero Content */}
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              variant="big"
              className="mb-8 flex flex-col items-center font-sans leading-[1.02]"
            >
              <span className="text-foreground block">Your Software</span>
              <span className="relative mt-1 flex h-[1.08em] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="text-brand whitespace-nowrap"
                    initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{
                      y: -12,
                      opacity: 0,
                      filter: "blur(4px)",
                      transition: { duration: 0.15, ease: "easeIn" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <MeshInk>{ROTATING_WORDS[wordIndex]}</MeshInk>
                  </motion.span>
                </AnimatePresence>
              </span>
            </Heading>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={itemVariants}>
            <p className="mb-12 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl">
              <span className="text-[#0a2540]">
                We design and build custom software that replaces disconnected
                tools.
              </span>{" "}
              It automates workflows and gives your business greater control
              over its technology.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <LitUpButton
              href={siteConfig.ctas.primary.url}
              className="text-sm font-bold active:scale-[0.97]"
            >
              {siteConfig.ctas.primary.text}
              <ArrowUpRight01Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </LitUpButton>
            <Link
              href={siteConfig.ctas.secondary.url}
              className="text-foreground inline-flex items-center justify-center border border-[#e3e8ee] px-8 py-3 text-sm font-bold transition-all hover:bg-[#0a2540]/5 active:scale-[0.97]"
            >
              {siteConfig.ctas.secondary.text}
            </Link>
          </motion.div>

          {/* Service area strip */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#6b7c93] uppercase">
              <span className="h-px w-8 bg-[#0a2540]/8" />
              Louisiana &bull; Texas &bull; Missouri &bull; Remote Nationwide
              <span className="h-px w-8 bg-[#0a2540]/8" />
            </div>
            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {[
                "Custom CRMs & Portals",
                "AI & Workflow Automation",
                "100% Owned Software",
              ].map((stat) => (
                <motion.div
                  key={stat}
                  variants={{
                    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="border border-[#e3e8ee] bg-[#0a2540]/3 px-4 py-2 text-xs font-bold tracking-wider text-[#425466] uppercase"
                >
                  {stat}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Images Collage */}
        <motion.div
          className="pointer-events-none relative mx-auto mt-32 flex h-[400px] w-full max-w-6xl items-center justify-center sm:h-[600px] md:h-[800px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8,
              },
            },
          }}
        >
          {HERO_IMAGES.map((url, i) => {
            const { rotate, ...position } = IMAGE_POSITIONS[i];

            return (
              <motion.div
                key={`${url}-${i}`}
                className="pointer-events-auto absolute"
                style={position}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{
                  zIndex: 50,
                  transition: { duration: 0.2 },
                }}
              >
                <BgFrame
                  imageUrl={url}
                  className="w-full"
                  style={{ rotate, transformOrigin: "center center" }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
