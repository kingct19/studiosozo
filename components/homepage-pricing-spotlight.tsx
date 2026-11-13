"use client";

import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { motion, type Variants } from "motion/react";

import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import { PRICING_TIERS } from "@/lib/pricing";

export function HomepagePricingSpotlight() {
  const websiteTier = PRICING_TIERS[0];
  const appTiers = PRICING_TIERS.slice(1);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-b border-[#e3e8ee] bg-[#f6f9fc] py-24 font-mono md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.06)_1px,transparent_1px)] bg-size-[24px_24px]" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-14 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-brand mb-6 inline-flex items-center text-xs font-bold tracking-widest uppercase"
          >
            <MeshInk>
              <span className="mr-3 opacity-70">{"//"}</span>
              TRANSPARENT PRICING • $0 MONTHLY PLATFORM FEES
            </MeshInk>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Start with an{" "}
              <span className="text-brand">
                <MeshInk>$800 website</MeshInk>
              </span>{" "}
              — or build a custom app
            </Heading>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Straightforward, upfront pricing with zero guesswork.
            </span>{" "}
            Whether you need a sharp 1–5 page website refresh or a full web &amp;
            mobile platform, you own 100% of what we build.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Featured Left Card: $800 - $1,000 Website Build or Redesign */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col justify-between border-2 border-[#635bff] bg-white p-8 shadow-[0_20px_50px_rgba(10,37,64,0.08)] md:p-10 lg:col-span-7"
          >
            <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[#635bff]" />
            <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-[#635bff]" />
            <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[#635bff]" />
            <div className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-[#635bff]" />

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-brand text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{websiteTier.code}</MeshInk>
                </span>
                <span className="border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                  {websiteTier.timeline} Turnaround
                </span>
              </div>

              <h3 className="font-sans text-2xl font-bold tracking-tight text-[#0a2540] md:text-3xl">
                Standalone Website Build or Update
              </h3>

              <div className="my-6 flex flex-wrap items-baseline justify-between gap-4 border-y border-[#e3e8ee] py-5">
                <div>
                  <span className="font-sans text-4xl font-bold tracking-tight text-[#0a2540] md:text-5xl">
                    {websiteTier.priceLabel}
                  </span>
                  <span className="ml-3 text-xs font-bold tracking-wider text-[#6b7c93] uppercase">
                    Flat One-Time Build
                  </span>
                </div>
                <span className="border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-700 uppercase">
                  $0 / Month Platform Rent
                </span>
              </div>

              <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                {websiteTier.idealFor}
              </p>

              <div className="mb-8">
                <div className="mb-3 text-[11px] font-bold tracking-widest text-[#6b7c93] uppercase">
                  Everything Included:
                </div>
                <ul className="space-y-3">
                  {websiteTier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-sans text-sm font-semibold text-[#0a2540] md:text-base"
                    >
                      <span className="text-primary mt-0.5 font-mono text-xs font-bold">
                        [✓]
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <LitUpButton
                href={websiteTier.ctaHref}
                className="justify-center text-xs font-bold tracking-widest uppercase"
              >
                {websiteTier.ctaText} <ArrowUpRight01Icon className="h-4 w-4" />
              </LitUpButton>
              <Link
                href="/services/custom-websites"
                className="inline-flex items-center justify-center gap-1.5 border border-[#e3e8ee] bg-[#f8fafc] px-5 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
              >
                See Website Details <ArrowUpRight01Icon className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Stack: Custom Apps, Automations & Full Platforms */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between gap-4 lg:col-span-5"
          >
            <div className="space-y-4">
              {appTiers.map((tier) => (
                <Link
                  key={tier.id}
                  href={tier.ctaHref}
                  className="group relative block border border-[#e3e8ee] bg-white p-6 transition-all hover:border-[#635bff]/50 hover:shadow-[0_8px_24px_rgba(10,37,64,0.06)]"
                >
                  <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                  <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                  <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-brand text-[10px] font-bold tracking-widest uppercase">
                      <MeshInk>{tier.code}</MeshInk>
                    </span>
                    <span className="text-[11px] font-bold tracking-wider text-[#6b7c93] uppercase">
                      {tier.timeline}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-sans text-lg font-bold text-[#0a2540] group-hover:text-[#635bff]">
                      {tier.name}
                    </h4>
                    <span className="font-sans text-lg font-bold text-[#635bff]">
                      {tier.priceLabel}
                    </span>
                  </div>

                  <p className="mt-2 font-sans text-xs leading-relaxed text-[#425466] sm:text-sm">
                    {tier.idealFor}
                  </p>
                </Link>
              ))}
            </div>

            <div className="border border-[#e3e8ee] bg-white p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="font-sans text-xs font-semibold text-[#425466] sm:text-sm">
                  Want to compare all 4 tiers &amp; run the SaaS savings
                  calculator?
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold tracking-widest text-[#635bff] uppercase transition-colors hover:text-[#0a2540]"
                >
                  Full Pricing <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
