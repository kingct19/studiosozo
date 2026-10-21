"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export const heroStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export const sectionStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
  },
};

export function FadeInSection({
  children,
  className,
  margin = "-80px",
}: {
  children: React.ReactNode;
  className?: string;
  margin?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={sectionStaggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={sectionItemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
