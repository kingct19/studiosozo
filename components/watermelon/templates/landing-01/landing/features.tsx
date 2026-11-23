"use client";

import Link from "next/link";
import {
  CodeIcon,
  PaintBoardIcon,
  Layout01Icon,
  MagicWand01Icon,
  ArrowUpRight01Icon,
} from "hugeicons-react";
import { motion, type Variants } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import LiniqoHelpDeskTicketQueue from "@/components/illustrations/help-desk-ticket-queue";
import LiniqoLandingPageHero from "@/components/illustrations/landing-page-hero";
import LiniqoLaptopDashboard from "@/components/illustrations/laptop-dashboard";
import LiniqoSmartphone from "@/components/illustrations/smartphone";
import Container from "./container";
import Heading from "./heading";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const FEATURE_ILLUSTRATIONS = [
  {
    Component: LiniqoLandingPageHero,
    label: "Custom business website and redesign",
  },
  {
    Component: LiniqoLaptopDashboard,
    label: "Web app and customer portal dashboard",
  },
  {
    Component: LiniqoSmartphone,
    label: "iPhone and Android mobile app",
  },
  {
    Component: LiniqoHelpDeskTicketQueue,
    label: "Custom CRM and business automation",
  },
] as const;

function FeatureCard({
  href,
  badge,
  title,
  description,
  icon: Icon,
  illustration,
  variants,
  className,
}: {
  href: string;
  badge: string;
  title: string;
  description: React.ReactNode;
  icon: React.ElementType;
  illustration: (typeof FEATURE_ILLUSTRATIONS)[number];
  variants: Variants;
  className?: string;
}) {
  const Illustration = illustration.Component;

  return (
    <motion.div variants={variants} className={cn("h-full w-full", className)}>
      <Link
        href={href}
        className="group relative block h-full w-full border border-[#e3e8ee] bg-white backdrop-blur-md transition-colors duration-300 hover:border-[#635bff]/50 hover:bg-[#0a2540]/3"
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
        <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
        <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

        <div className="relative z-10 flex h-full w-full flex-col items-start overflow-hidden p-6 md:p-8">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="opacity-85 transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-primary h-7 w-7" />
              </div>
              <span className="border border-[#635bff]/25 bg-[#635bff]/8 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                {badge}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 border border-[#e3e8ee] bg-white px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#425466] uppercase transition-colors group-hover:border-[#635bff] group-hover:text-[#635bff]">
              Explore <ArrowUpRight01Icon className="h-3 w-3" />
            </span>
          </div>

          <div className="mx-auto my-5 flex h-48 w-48 shrink-0 items-center justify-center sm:my-6 sm:h-56 sm:w-56">
            <Illustration
              accent="#3b5bff"
              label={illustration.label}
              className="h-full w-full select-none"
            />
          </div>

          <div className="mt-auto max-w-md">
            <h3 className="text-foreground mb-2.5 font-sans text-2xl font-bold tracking-tight group-hover:text-[#635bff]">
              {title}
            </h3>
            <p className="font-sans text-base leading-relaxed font-medium text-[#425466]">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Features() {
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

  const featureIcons = [
    Layout01Icon,
    CodeIcon,
    PaintBoardIcon,
    MagicWand01Icon,
  ] as const;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 font-mono md:py-32"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start text-left md:items-center md:text-center"
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
              <span className="mr-3 opacity-70">{"//"}</span>
              04 CORE SERVICES
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              What{" "}
              <span className="text-brand">
                <MeshInk>Studio Sozo</MeshInk>
              </span>{" "}
              Builds
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Need a modern website refresh or a custom app built around your
              team?
            </span>{" "}
            Here are the four ways we help businesses grow.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {siteConfig.services.map((service, index) => (
            <FeatureCard
              key={service.slug}
              href={`/services/${service.slug}`}
              variants={itemVariants}
              icon={featureIcons[index]}
              badge={service.badge}
              title={service.title}
              description={service.description}
              illustration={FEATURE_ILLUSTRATIONS[index]}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
