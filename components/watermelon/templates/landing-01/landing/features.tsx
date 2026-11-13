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
import Container from "./container";
import Heading from "./heading";
import {
  PremiumComponent,
  ThemingComponent,
  OpenSourceComponent,
  ProductionReadyComponent,
} from "./feature-visuals";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

function FeatureCard({
  href,
  badge,
  title,
  description,
  icon: Icon,
  variants,
  className,
  children,
}: {
  href: string;
  badge: string;
  title: string;
  description: React.ReactNode;
  icon: React.ElementType;
  variants: Variants;
  className?: string;
  children?: React.ReactNode;
}) {
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

        <div className="relative z-10 flex h-full w-full flex-col items-start justify-between overflow-hidden p-8 md:p-9">
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

          <div className="mt-8 max-w-md">
            <h3 className="text-foreground mb-2.5 font-sans text-2xl font-bold tracking-tight group-hover:text-[#635bff]">
              {title}
            </h3>
            <p className="font-sans text-base leading-relaxed font-medium text-[#425466]">
              {description}
            </p>
          </div>
          {children}
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
              What <span className="text-brand"><MeshInk>Studio Sozo</MeshInk></span> Builds
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
          className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 1. Custom Websites & Redesigns */}
          <FeatureCard
            href={`/services/${siteConfig.services[0].slug}`}
            variants={itemVariants}
            icon={Layout01Icon}
            badge={siteConfig.services[0].badge}
            title={siteConfig.services[0].title}
            description={siteConfig.services[0].description}
          >
            <ProductionReadyComponent />
          </FeatureCard>

          {/* 2. Web Apps & Customer Portals */}
          <FeatureCard
            href={`/services/${siteConfig.services[1].slug}`}
            variants={itemVariants}
            icon={CodeIcon}
            badge={siteConfig.services[1].badge}
            title={siteConfig.services[1].title}
            description={siteConfig.services[1].description}
          >
            <OpenSourceComponent />
          </FeatureCard>

          {/* 3. Mobile Apps (iOS & Android) */}
          <FeatureCard
            href={`/services/${siteConfig.services[2].slug}`}
            variants={itemVariants}
            icon={PaintBoardIcon}
            badge={siteConfig.services[2].badge}
            title={siteConfig.services[2].title}
            description={siteConfig.services[2].description}
          >
            <ThemingComponent />
          </FeatureCard>

          {/* 4. Custom CRMs & AI Automation */}
          <FeatureCard
            href={`/services/${siteConfig.services[3].slug}`}
            variants={itemVariants}
            icon={MagicWand01Icon}
            badge={siteConfig.services[3].badge}
            title={siteConfig.services[3].title}
            description={siteConfig.services[3].description}
          >
            <PremiumComponent />
          </FeatureCard>
        </motion.div>
      </Container>
    </section>
  );
}
