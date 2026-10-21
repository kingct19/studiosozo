"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import Heading from "./heading";
import Container from "./container";

function TemplateCard({
  variants,
  children,
}: {
  variants: Variants;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={variants}
      className="w-full h-[700px] md:h-[1000px] border border-[#e3e8ee] bg-white backdrop-blur-md relative group cursor-crosshair hover:bg-[#0a2540]/4 transition-colors duration-300"
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#635bff]/35"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#635bff]/35"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#635bff]/35"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#635bff]/35"></div>

      {children}
    </motion.div>
  );
}

function BrowserMockup({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Tech Header */}
      <div className="h-12 border-b border-[#e3e8ee] bg-[#0a2540]/6 flex items-center px-4 md:px-6 gap-2 md:gap-4 w-full">
        {/* Techy "traffic lights" */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-[#0a2540]/12 group-hover:bg-destructive/80 transition-colors" />
          <div className="w-2 h-2 bg-[#0a2540]/12 group-hover:bg-yellow-500/80 transition-colors" />
          <div className="w-2 h-2 bg-[#0a2540]/12 group-hover:bg-primary/80 transition-colors" />
        </div>
        <div className="ml-2 md:ml-4 flex-1 flex justify-center min-w-0">
          <div className="px-2 md:px-4 py-1 text-[10px] md:text-xs border border-[#e3e8ee] text-[#425466] font-mono w-full max-w-[280px] md:w-76 text-center tracking-widest uppercase truncate">
            {url}
          </div>
        </div>
        {/* Right side spacer to keep center aligned */}
        <div className="w-6 md:w-10"></div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
        {/* Technical background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,37,64,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        {children}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    slug: "sozo-crm",
    title: "SOZO CRM",
    url: "[ SOZO CRM // SOLAR SALES & PIPELINE PLATFORM ]",
    image: "/projects/sozo-crm.jpg",
  },
  {
    slug: "angler-iq",
    title: "ANGLER IQ",
    url: "[ ANGLERIQ // AI CO-ANGLER MOBILE & WEB PLATFORM ]",
    image: "/projects/angler-iq.jpg",
  },
  {
    slug: "elevate-solar",
    title: "ELEVATE SOLAR",
    url: "[ ELEVATE-SOLAR.COM // SOLAR OPERATIONS & QUOTING ]",
    image: "/projects/elevate-solar.jpg",
  },
  {
    slug: "hr-hvac",
    title: "HR HEATING & COOLING",
    url: "[ HR HVAC // SERVICE BOOKING & DISPATCH WEB APP ]",
    image: "/projects/hr-hvac.jpg",
  },
  {
    slug: "dash-lake-rentals",
    title: "DASH LAKE RENTALS",
    url: "[ DASH // ON-DEMAND WATERCRAFT RENTAL & BOOKING ]",
    image: "/projects/dash-lake-rentals.jpg",
  },
  {
    slug: "serene-commerce",
    title: "SERENE",
    url: "[ SERENE // CUSTOM DIGITAL COMMERCE EXPERIENCE ]",
    image: "/projects/serene-commerce.jpg",
  },
];

export default function TemplateBento() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
      id="portfolio"
      className="py-24 md:py-32 relative overflow-hidden bg-[#f6f9fc] font-mono"
    >
      {/* Decorative Technical Borders */}
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-[#e3e8ee]" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start md:items-center text-left md:text-center"
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
              FEATURED PROJECTS &amp; PLATFORMS
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-balance text-foreground font-sans"
            >
              Systems we&apos;ve <span className="text-brand"><MeshInk>shipped</MeshInk></span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Real custom CRMs, AI-powered mobile products, and booking
              platforms.
            </span>{" "}
            Digital experiences engineered by Studio Sozo.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <TemplateCard variants={itemVariants}>
            <BrowserMockup url={PROJECTS[currentIndex].url}>
              <div className="flex-1 w-full border border-[#e3e8ee] flex flex-col items-center justify-center bg-black relative z-10 overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={PROJECTS[currentIndex].image}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-top"
                    alt={PROJECTS[currentIndex].title}
                  />
                </AnimatePresence>
              </div>

              <div className="mt-2 md:mt-4 relative z-10 flex w-full flex-col items-center gap-3 overflow-hidden">
                <p className="text-xs md:text-sm font-bold text-[#6b7c93] tracking-[0.2em] uppercase flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2">
                  {PROJECTS.map((project, idx) => (
                    <span key={project.title} className="inline-flex items-center gap-x-3 md:gap-x-6">
                      <button
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={
                          idx === currentIndex
                            ? "text-brand cursor-pointer uppercase font-bold"
                            : "cursor-pointer uppercase font-bold text-[#6b7c93] transition-colors hover:text-[#2c6cbc]"
                        }
                      >
                        {idx === currentIndex ? (
                          <MeshInk>{project.title}</MeshInk>
                        ) : (
                          project.title
                        )}
                      </button>
                      {idx < PROJECTS.length - 1 && (
                        <span className="text-[#0a2540]/25">{"//"}</span>
                      )}
                    </span>
                  ))}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/work/${PROJECTS[currentIndex].slug}`}
                    className="inline-flex items-center gap-1.5 border border-[#e3e8ee] bg-white px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                  >
                    Read {PROJECTS[currentIndex].title} Case Study{" "}
                    <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/work"
                    className="text-[11px] font-bold tracking-widest text-[#6b7c93] uppercase transition-colors hover:text-[#0a2540]"
                  >
                    View All Case Studies
                  </Link>
                </div>
              </div>
            </BrowserMockup>
          </TemplateCard>
        </motion.div>
      </Container>
    </section>
  );
}
