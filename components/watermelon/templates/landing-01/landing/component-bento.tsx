"use client";

import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { motion, type Variants } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import Heading from "./heading";
import Container from "./container";
import { cn } from "@/lib/utils";

function ComponentCard({
  title,
  subtitle,
  description,
  variants,
  className,
  children,
}: {
  title: string;
  subtitle: string;
  description: string;
  variants: Variants;
  className?: string;
  children: React.ReactNode;
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

        <div className="my-5 flex-1">{children}</div>

        <p className="border-t border-[#e3e8ee] pt-4 font-sans text-xs font-medium leading-relaxed text-[#425466] md:text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function ScopeAndQuoteVisual() {
  const nodes = [
    { step: "GOAL", label: "Website Refresh or Custom App", status: "CLEAR FIT" },
    { step: "SCOPE", label: "Pages, Features & Timeline", status: "UPFRONT" },
    { step: "QUOTE", label: "Flat / Milestone Price ($800+)", status: "FIXED PRICE" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {nodes.map((n, idx) => (
        <div
          key={n.step}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0a2540] font-mono text-[10px] font-bold text-white">
              0{idx + 1}
            </span>
            <div>
              <span className="block font-mono text-[9px] font-bold tracking-widest text-[#635bff] uppercase">
                {n.step}
              </span>
              <span className="font-sans text-xs font-bold text-[#0a2540]">
                {n.label}
              </span>
            </div>
          </div>
          <span className="border border-[#635bff]/30 bg-[#635bff]/8 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-[#635bff] uppercase">
            {n.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function DesignPreviewVisual() {
  const previews = [
    { surface: "MOBILE + DESKTOP", scope: "Clean, modern brand layout" },
    { surface: "CUSTOMER JOURNEY", scope: "Clear calls-to-action & forms" },
    { surface: "STAGING LINK", scope: "Click through live on your phone" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {previews.map((r) => (
        <div
          key={r.surface}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2"
        >
          <div>
            <span className="block font-mono text-[9px] font-bold tracking-widest text-[#6b7c93] uppercase">
              PREVIEW // {r.surface}
            </span>
            <span className="font-sans text-xs font-bold text-[#0a2540]">
              {r.scope}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
            LIVE PREVIEW
          </span>
        </div>
      ))}
    </div>
  );
}

function BuildAndConnectVisual() {
  const bridges = [
    { left: "YOUR WEBSITE / APP", right: "DIRECT INBOX LEADS", tag: "WIRED" },
    { left: "YOUR WEBSITE / APP", right: "GOOGLE LOCAL SEO", tag: "MOBILE + SEO" },
    { left: "YOUR WEBSITE / APP", right: "STRIPE / QUICKBOOKS", tag: "OPTIONAL" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {bridges.map((b) => (
        <div
          key={b.right}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2 font-mono text-[10px]"
        >
          <span className="font-bold text-[#0a2540]">{b.left}</span>
          <span className="text-[#635bff]">&rarr;</span>
          <span className="font-bold text-[#0a2540]">{b.right}</span>
          <span className="hidden border border-[#e3e8ee] bg-[#f8fafc] px-1.5 py-0.5 text-[9px] text-[#6b7c93] sm:inline">
            {b.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function OwnershipHandoverVisual() {
  const assets = [
    { label: "Full Website / App Source Code", value: "100% YOURS" },
    { label: "Custom Domain & Cloud Hosting", value: "YOUR ACCOUNT" },
    { label: "Monthly Platform or Per-Seat Rent", value: "$0 FOREVER" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {assets.map((a) => (
        <div
          key={a.label}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2"
        >
          <span className="font-sans text-xs font-bold text-[#0a2540]">
            {a.label}
          </span>
          <span className="border border-[#0a2540] bg-[#0a2540] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-white uppercase">
            {a.value}
          </span>
        </div>
      ))}
    </div>
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
          {/* Step 1 */}
          <ComponentCard
            title="[ 01 // QUICK CALL & FIXED QUOTE ]"
            subtitle="DAY 1-2"
            description="Tell us what you need, whether it is an $800-$1,000 business website refresh or a custom app, and get a clear flat or milestone price upfront."
            variants={itemVariants}
          >
            <ScopeAndQuoteVisual />
          </ComponentCard>

          {/* Step 2 */}
          <ComponentCard
            title="[ 02 // DESIGN & LIVE PREVIEW ]"
            subtitle="WEEK 1"
            description="We put a real, clickable preview link in your hands early so you can test the look and flow on your phone and laptop before launch."
            variants={itemVariants}
          >
            <DesignPreviewVisual />
          </ComponentCard>

          {/* Step 3 */}
          <ComponentCard
            title="[ 03 // FAST BUILD & WEEKLY UPDATES ]"
            subtitle="1–2 WKS (WEB) • 4–10 WKS (APPS)"
            description="We wire up your lead forms, Google SEO, mobile responsiveness, and any booking, Stripe, or QuickBooks connections with zero guesswork."
            variants={itemVariants}
          >
            <BuildAndConnectVisual />
          </ComponentCard>

          {/* Step 4 */}
          <ComponentCard
            title="[ 04 // LAUNCH & 100% HANDOVER ]"
            subtitle="LAUNCH DAY"
            description="We connect your custom domain, take you live, and hand over 100% ownership of your code and accounts with $0 monthly platform rent."
            variants={itemVariants}
          >
            <OwnershipHandoverVisual />
          </ComponentCard>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 border border-[#e3e8ee] bg-white px-5 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
          >
            See Full Process{" "}
            <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-[#0a2540] bg-[#0a2540] px-5 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#635bff] hover:bg-[#635bff]"
          >
            See Pricing ($800+){" "}
            <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
