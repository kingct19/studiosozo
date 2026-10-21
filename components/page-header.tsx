"use client";

import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { motion } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import {
  heroItemVariants,
  heroStaggerVariants,
} from "@/components/page-motion";
import type { BreadcrumbItem } from "@/components/seo/json-ld";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  headline: string;
  highlightWord: string;
  leadBold: string;
  leadBody: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: React.ReactNode;
}

export function PageHeader({
  breadcrumbs,
  eyebrow,
  headline,
  highlightWord,
  leadBold,
  leadBody,
  primaryCta = { text: "Discuss Your Project", href: "/contact" },
  secondaryCta,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#e3e8ee] bg-white pt-32 pb-20 font-mono md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Technical vertical guides */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-8 hidden w-px bg-[#0a2540]/6 md:left-16 lg:block" />
      <div className="pointer-events-none absolute top-0 right-8 bottom-0 hidden w-px bg-[#0a2540]/6 md:right-16 lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          variants={heroStaggerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb trail */}
          <motion.nav
            variants={heroItemVariants}
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs tracking-widest text-[#6b7c93] uppercase"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span
                  key={crumb.path}
                  className="inline-flex items-center gap-2"
                >
                  {isLast ? (
                    <span className="font-bold text-[#0a2540]">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="transition-colors hover:text-[#635bff]"
                    >
                      {crumb.name}
                    </Link>
                  )}
                  {!isLast && <span className="text-[#0a2540]/25">/</span>}
                </span>
              );
            })}
          </motion.nav>

          <div className="max-w-4xl">
            <motion.div
              variants={heroItemVariants}
              className="text-brand mb-6 inline-flex items-center text-xs font-bold tracking-widest uppercase"
            >
              <MeshInk>
                <span className="mr-3 opacity-70">{"//"}</span>
                {eyebrow}
              </MeshInk>
            </motion.div>

            <motion.div variants={heroItemVariants}>
              <Heading
                as="h1"
                variant="big"
                className="text-foreground font-sans leading-[1.04] text-balance"
              >
                {headline}{" "}
                <span className="text-brand">
                  <MeshInk>{highlightWord}</MeshInk>
                </span>
              </Heading>
            </motion.div>

            <motion.p
              variants={heroItemVariants}
              className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
            >
              <span className="text-[#0a2540]">{leadBold}</span> {leadBody}
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <LitUpButton
                href={primaryCta.href}
                className="w-fit text-xs font-bold tracking-widest uppercase active:scale-[0.97]"
              >
                {primaryCta.text}
                <ArrowUpRight01Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </LitUpButton>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="text-foreground inline-flex w-fit items-center justify-center border border-[#e3e8ee] bg-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#0a2540]/5 active:scale-[0.97]"
                >
                  {secondaryCta.text}
                </Link>
              )}
            </motion.div>
          </div>

          {children ? (
            <motion.div variants={heroItemVariants} className="mt-14">
              {children}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
