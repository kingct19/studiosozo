"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { motion, type Variants } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import Heading from "./heading";
import Container from "./container";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    title: "[ 01 // QUICK CALL & FIXED QUOTE ]",
    subtitle: "DAY 1-2",
    description:
      "Tell us what you need, whether it is an $800-$1,000 business website refresh or a custom app, and get a clear flat or milestone price upfront.",
    illustration: {
      src: "/illustrations/conference-table.svg",
      alt: "Kickoff call and fixed project quote",
    },
  },
  {
    title: "[ 02 // DESIGN & LIVE PREVIEW ]",
    subtitle: "WEEK 1",
    description:
      "We put a real, clickable preview link in your hands early so you can test the look and flow on your phone and laptop before launch.",
    illustration: {
      src: "/illustrations/landing-page-wireframe.svg",
      alt: "Design preview and wireframe walkthrough",
    },
  },
  {
    title: "[ 03 // FAST BUILD & WEEKLY UPDATES ]",
    subtitle: "1–2 WKS (WEB) • 4–10 WKS (APPS)",
    description:
      "We wire up your lead forms, Google SEO, mobile responsiveness, and any booking, Stripe, or QuickBooks connections with zero guesswork.",
    illustration: {
      src: "/illustrations/ci-pipeline-stages.svg",
      alt: "Build pipeline with weekly progress updates",
    },
  },
  {
    title: "[ 04 // LAUNCH & 100% HANDOVER ]",
    subtitle: "LAUNCH DAY",
    description:
      "We connect your custom domain, take you live, and hand over 100% ownership of your code and accounts with $0 monthly platform rent.",
    illustration: {
      src: "/illustrations/website-going-live.svg",
      alt: "Website launch and full ownership handover",
    },
  },
] as const;

function ComponentCard({
  title,
  subtitle,
  description,
  illustration,
  variants,
  className,
}: {
  title: string;
  subtitle: string;
  description: string;
  illustration: { src: string; alt: string };
  variants: Variants;
  className?: string;
}) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "group relative h-full w-full border border-[#e3e8ee] bg-white backdrop-blur-md transition-colors duration-300 hover:border-[#635bff]/45 hover:bg-[#f6f9fc]/60",
        className,
      )}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

      <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between gap-2 border-b border-[#e3e8ee] pb-4">
          <span className="text-primary font-mono text-[11px] font-bold tracking-widest uppercase transition-colors group-hover:text-[#635bff]">
            {title}
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
            {subtitle}
          </span>
        </div>

        <div className="mx-auto my-5 flex h-40 w-40 shrink-0 items-center justify-center sm:h-48 sm:w-48">
          <Image
            src={illustration.src}
            alt={illustration.alt}
            width={192}
            height={192}
            className="h-full w-full object-contain select-none"
            unoptimized
          />
        </div>

        <p className="border-t border-[#e3e8ee] pt-4 font-sans text-xs font-medium leading-relaxed text-[#425466] md:text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ComponentsBento() {
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
      id="process"
      className="relative overflow-hidden bg-white py-24 font-mono md:py-32"
    >
      {/* Decorative Technical Borders */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-[#e3e8ee] lg:block" />
      <div className="absolute bottom-0 left-0 hidden w-full border-b border-[#e3e8ee] lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start text-left md:items-end md:text-right"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-brand mb-8 inline-flex items-center text-xs font-bold tracking-widest uppercase"
          >
            <MeshInk>
              <span className="mr-3 block opacity-70 md:hidden">{"//"}</span>
              SIMPLE 4-STEP PROCESS
              <span className="ml-3 hidden opacity-70 md:block">{"//"}</span>
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-left text-balance md:text-right"
            >
              How we take your project{" "}
              <span className="text-brand">
                <MeshInk>live</MeshInk>
              </span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Work directly with the engineer building your website or app.
            </span>{" "}
            Websites launch in 1–2 weeks; custom apps ship in clear weekly
            milestones.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PROCESS_STEPS.map((step) => (
            <ComponentCard
              key={step.title}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              illustration={step.illustration}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 border border-[#e3e8ee] bg-white px-5 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
          >
            See Full Process <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-[#0a2540] bg-[#0a2540] px-5 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#635bff] hover:bg-[#635bff]"
          >
            See Pricing ($800+) <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
