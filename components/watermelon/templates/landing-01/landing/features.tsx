"use client";

import Link from "next/link";
import {
  CodeIcon,
  PuzzleIcon,
  PaintBoardIcon,
  Layout01Icon,
  MagicWand01Icon,
  CubeIcon,
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
  title,
  description,
  descriptionClassName,
  icon: Icon,
  variants,
  className,
  children,
}: {
  href: string;
  title: string;
  description: React.ReactNode;
  descriptionClassName?: string;
  icon: React.ElementType;
  variants: Variants;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div variants={variants} className={cn("h-full w-full", className)}>
      <Link
        href={href}
        className="group relative block h-full w-full border border-[#e3e8ee] bg-white backdrop-blur-md transition-colors duration-300 hover:border-[#635bff]/50 hover:bg-[#0a2540]/4"
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35"></div>
        <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35"></div>
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35"></div>
        <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35"></div>

        <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
          <div className="mb-6 flex w-full items-center justify-between">
            <div className="opacity-80 transition-transform duration-300 group-hover:scale-110">
              <Icon className="text-primary h-8 w-8" />
            </div>
            <span className="inline-flex items-center gap-1 border border-[#e3e8ee] bg-white px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#425466] uppercase transition-colors group-hover:border-[#635bff] group-hover:text-[#635bff]">
              Details <ArrowUpRight01Icon className="h-3 w-3" />
            </span>
          </div>
          <h3 className="text-foreground mb-3 text-xl font-bold tracking-widest uppercase group-hover:text-[#635bff]">
            {title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed tracking-widest text-[#425466] uppercase",
              descriptionClassName,
            )}
          >
            {description}
          </p>
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
      className="bg-white relative overflow-hidden py-24 font-mono md:py-32"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

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
              SERVICES &amp; CAPABILITIES
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
              Custom software, internal tools, and intelligent automation.
            </span>{" "}
            Tailored to how your business actually operates.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid auto-rows-[320px] grid-cols-1 gap-6 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 1. Custom Software Development */}
          <FeatureCard
            href={`/services/${siteConfig.services[0].slug}`}
            variants={itemVariants}
            className="lg:col-span-2"
            icon={CodeIcon}
            title={siteConfig.services[0].title}
            description={siteConfig.services[0].description}
            descriptionClassName="max-w-sm text-pretty"
          >
            <OpenSourceComponent />
          </FeatureCard>

          {/* 2. CRM & Business Systems */}
          <FeatureCard
            href={`/services/${siteConfig.services[1].slug}`}
            variants={itemVariants}
            className="lg:col-span-3"
            icon={PuzzleIcon}
            title={siteConfig.services[1].title}
            description={siteConfig.services[1].description}
            descriptionClassName="max-w-md text-pretty"
          >
            <PremiumComponent />
          </FeatureCard>

          {/* 3. AI & Automation */}
          <FeatureCard
            href={`/services/${siteConfig.services[2].slug}`}
            variants={itemVariants}
            className="lg:col-span-3"
            icon={MagicWand01Icon}
            title={siteConfig.services[2].title}
            description={siteConfig.services[2].description}
            descriptionClassName="max-w-lg text-balance"
          >
            <ThemingComponent />
          </FeatureCard>

          {/* 4. Web Applications */}
          <FeatureCard
            href={`/services/${siteConfig.services[3].slug}`}
            variants={itemVariants}
            className="lg:col-span-2"
            icon={Layout01Icon}
            title={siteConfig.services[3].title}
            description={siteConfig.services[3].description}
            descriptionClassName="max-w-xs text-pretty"
          >
            <ProductionReadyComponent />
          </FeatureCard>

          {/* 5. Mobile App Development */}
          <FeatureCard
            href={`/services/${siteConfig.services[4].slug}`}
            variants={itemVariants}
            className="lg:col-span-2"
            icon={PaintBoardIcon}
            title={siteConfig.services[4].title}
            description={siteConfig.services[4].description}
            descriptionClassName="max-w-sm text-pretty"
          >
            <OpenSourceComponent />
          </FeatureCard>

          {/* 6. Systems Integration */}
          <FeatureCard
            href={`/services/${siteConfig.services[5].slug}`}
            variants={itemVariants}
            className="lg:col-span-3"
            icon={CubeIcon}
            title={siteConfig.services[5].title}
            description={siteConfig.services[5].description}
            descriptionClassName="max-w-lg text-balance"
          >
            <PremiumComponent />
          </FeatureCard>
        </motion.div>
      </Container>
    </section>
  );
}
