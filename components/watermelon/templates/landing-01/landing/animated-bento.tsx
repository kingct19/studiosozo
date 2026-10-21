"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import Heading from "./heading";
import Container from "./container";
import { SelectAIAgent } from "@/components/watermelon-ui/select-ai-agent";
import { MorphingButton } from "@/components/watermelon-ui/morphing-button";
import { KnobSlider } from "@/components/watermelon-ui/knob-slider";
import { CarouselSlider } from "@/components/watermelon-ui/carousel-slider";
import { cn } from "@/lib/utils";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChatGptIcon,
  ClaudeIcon,
  GoogleGeminiIcon,
} from "@hugeicons/core-free-icons";

const slides = [
  { id: 1, img: "/projects/sozo-crm.jpg" },
  { id: 2, img: "/projects/angler-iq.jpg" },
  { id: 3, img: "/projects/elevate-solar.jpg" },
  { id: 4, img: "/projects/hr-hvac.jpg" },
  { id: 5, img: "/projects/dash-lake-rentals.jpg" },
  { id: 6, img: "/projects/serene-commerce.jpg" },
];

const AGENTS = [
  {
    id: "chatgpt",
    name: "Chatgpt",
    icon: (
      <HugeiconsIcon
        icon={ChatGptIcon}
        size={24}
        color="#2b2b2b"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: (
      <HugeiconsIcon
        icon={GoogleGeminiIcon}
        size={24}
        color="#003355"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "claude",
    name: "Claude",
    icon: (
      <HugeiconsIcon
        icon={ClaudeIcon}
        size={24}
        color="#D97757"
        strokeWidth={1.5}
      />
    ),
  },
];

function FeatureCard({
  title,
  variants,
  className,
  innerClassName,
  children,
}: {
  title: string;
  variants: Variants;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "h-full w-full relative border border-[#e3e8ee] bg-white backdrop-blur-md group hover:bg-[#0a2540]/4 transition-colors duration-300",
        className,
      )}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#635bff]/35"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#635bff]/35"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#635bff]/35"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#635bff]/35"></div>

      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
          <span className="text-[#6b7c93] text-[10px] font-mono uppercase tracking-widest group-hover:text-[#635bff]/80 transition-colors">
            {title}
          </span>
        </div>
        <div
          className={cn(
            "origin-center flex justify-center w-full",
            innerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function AnimatedBento() {
  const [knobValue, setKnobValue] = useState(24);
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
    },
  };

  return (
    <section
      id="automation"
      className="py-24 md:py-32 relative overflow-hidden bg-[#f6f9fc] font-mono"
    >
      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-[#e3e8ee]" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center text-xs font-bold text-brand mb-8 tracking-widest uppercase"
          >
            <MeshInk>
              <span className="mr-3 opacity-70">{"//"}</span>
              AI &amp; WORKFLOW AUTOMATION
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-balance text-foreground font-sans"
            >
              Intelligent <span className="text-brand"><MeshInk>workflows</MeshInk></span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Automate repetitive back-office tasks and connect AI agents to
              your business data.
            </span>{" "}
            Give your team responsive interfaces built for daily execution.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {/* Top Left */}
          <FeatureCard
            title="[ AI WORKFLOW ROUTING ]"
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-2"
            innerClassName="scale-[0.8] md:scale-[0.9] mt-6"
          >
            <SelectAIAgent agents={AGENTS} />
          </FeatureCard>

          {/* Top Right - Square-ish */}
          <FeatureCard
            title="[ INSTANT TRIGGERS & ALERTS ]"
            variants={itemVariants}
            className="md:col-span-1"
            innerClassName="scale-[0.8] mt-6"
          >
            <MorphingButton
              buttonText="Discuss Project"
              placeholder="Work Email"
              onSubmit={() => {
                router.push("/contact");
              }}
            />
          </FeatureCard>

          {/* Bottom Left - Carousel */}
          <FeatureCard
            title="[ OPERATIONAL CONTROLS ]"
            variants={itemVariants}
            className="md:col-span-1"
            innerClassName="scale-[0.8] md:scale-[0.9] mt-6"
          >
            <KnobSlider
              value={knobValue}
              onChange={setKnobValue}
              min={0}
              max={99}
              size={220}
            />
          </FeatureCard>

          {/* Bottom Middle - The label text card (hidden below lg) */}
          <motion.div
            key="card-100"
            variants={itemVariants}
            className="hidden lg:block lg:col-span-1 h-full w-full relative border border-primary/20 bg-primary/5 backdrop-blur-sm group"
          >
            {/* Corner Accents - Primary Colored */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>

            <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
              {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(119,69,233,0.18)_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-5xl lg:text-6xl font-bold text-foreground tracking-tighter tabular-nums mb-3 font-mono">
                  100%
                </div>
                <div className="text-brand font-bold tracking-widest uppercase text-xs">
                  <MeshInk>BESPOKE LOGIC</MeshInk>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right - Carousel Slider */}
          <FeatureCard
            title="[ MOBILE & FIELD VIEWS ]"
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1"
            innerClassName="scale-[0.8] mt-6"
          >
            <CarouselSlider slides={slides} />
          </FeatureCard>
        </motion.div>
      </Container>
    </section>
  );
}
