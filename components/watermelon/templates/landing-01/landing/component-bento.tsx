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

function WorkflowBlueprintVisual() {
  const nodes = [
    { step: "INTAKE", label: "Lead / Work Order", status: "VALIDATED" },
    { step: "LOGIC", label: "Custom Pricing & Routing", status: "AUTOMATED" },
    { step: "DISPATCH", label: "Crew & Portal Sync", status: "LIVE" },
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

function ApprovalMatrixVisual() {
  const rules = [
    { role: "FIELD TECH", scope: "Job Checklist + Photo Upload", active: true },
    {
      role: "SALES / ESTIMATOR",
      scope: "Live Quote Builder + Margin Guardrail",
      active: true,
    },
    {
      role: "EXECUTIVE ADMIN",
      scope: "P&L Margin, Commissions & Audit Log",
      active: true,
    },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {rules.map((r) => (
        <div
          key={r.role}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2"
        >
          <div>
            <span className="block font-mono text-[9px] font-bold tracking-widest text-[#6b7c93] uppercase">
              ROLE // {r.role}
            </span>
            <span className="font-sans text-xs font-bold text-[#0a2540]">
              {r.scope}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
            RBAC OK
          </span>
        </div>
      ))}
    </div>
  );
}

function ApiIntegrationVisual() {
  const bridges = [
    { left: "SOZO CORE DB", right: "STRIPE PAYMENTS", latency: "14ms" },
    { left: "SOZO CORE DB", right: "QUICKBOOKS LEDGER", latency: "22ms" },
    { left: "SOZO CORE DB", right: "TWILIO SMS / AI", latency: "19ms" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] p-3.5">
      {bridges.map((b) => (
        <div
          key={b.right}
          className="flex items-center justify-between border border-[#e3e8ee] bg-white px-3 py-2 font-mono text-[10px]"
        >
          <span className="font-bold text-[#0a2540]">{b.left}</span>
          <span className="text-[#635bff]">&lt;=== WEBHOOK ===&gt;</span>
          <span className="font-bold text-[#0a2540]">{b.right}</span>
          <span className="hidden border border-[#e3e8ee] bg-[#f8fafc] px-1.5 py-0.5 text-[9px] text-[#6b7c93] sm:inline">
            {b.latency}
          </span>
        </div>
      ))}
    </div>
  );
}

function OwnershipHandoverVisual() {
  const assets = [
    { label: "GitHub Repository & Full Source Code", value: "100% CLIENT OWNED" },
    { label: "PostgreSQL Database & Customer Data", value: "YOUR CLOUD ACCOUNT" },
    { label: "Recurring Per-Seat Licensing Tax", value: "$0 / USER FOREVER" },
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
              DEVELOPMENT PROCESS &amp; OWNERSHIP
              <span className="ml-3 hidden opacity-70 md:block">{"//"}</span>
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-left text-balance md:text-right"
            >
              How we{" "}
              <span className="text-brand">
                <MeshInk>engineer</MeshInk>
              </span>{" "}
              your system
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              From mapping your real operational workflows to launching a
              cohesive platform.
            </span>{" "}
            Built for internal teams, field operations, and customer
            management.
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
            title="[ 01 // DISCOVERY & WORKFLOW MAPPING ]"
            subtitle="WEEK 1–2"
            description="We shadow how your sales, dispatch, and field teams work today and replace spreadsheet bottlenecks with a clean system blueprint."
            variants={itemVariants}
          >
            <WorkflowBlueprintVisual />
          </ComponentCard>

          {/* Step 2 */}
          <ComponentCard
            title="[ 02 // ARCHITECTURE & APPROVAL RULES ]"
            subtitle="WEEK 2–4"
            description="Role-specific workspaces, database schemas, and margin guardrails so every operator sees only what they need to execute."
            variants={itemVariants}
          >
            <ApprovalMatrixVisual />
          </ComponentCard>

          {/* Step 3 */}
          <ComponentCard
            title="[ 03 // CUSTOM BUILD & API INTEGRATION ]"
            subtitle="WEEK 4–8"
            description="Two-way webhooks and durable queues connect Stripe, QuickBooks, Twilio, and AI pipelines into one real-time source of truth."
            variants={itemVariants}
          >
            <ApiIntegrationVisual />
          </ComponentCard>

          {/* Step 4 */}
          <ComponentCard
            title="[ 04 // DEPLOYMENT & FULL OWNERSHIP ]"
            subtitle="LAUNCH"
            description="Deployed to your cloud with 100% source code ownership, zero per-seat SaaS fees, and full team onboarding."
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
            Explore Full 4-Phase Process{" "}
            <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-[#0a2540] bg-[#0a2540] px-5 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#635bff] hover:bg-[#635bff]"
          >
            View Pricing &amp; Investment{" "}
            <ArrowUpRight01Icon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
