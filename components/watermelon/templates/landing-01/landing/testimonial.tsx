"use client";

import { motion, type Variants } from "motion/react";
import { MeshInk } from "@/components/brand-mesh";
import Heading from "./heading";
import Container from "./container";

type CategoryTag = "ownership" | "painpoint" | "faq";

interface OutcomeCardItem {
  id: number;
  content: string;
  title: string;
  subtitle: string;
  badgeCode: string;
  category: CategoryTag;
}

const TagIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const categoryConfig: Record<
  CategoryTag,
  { label: string; icon: typeof TagIcon; color: string; bgColor: string }
> = {
  ownership: {
    label: "OWNERSHIP BENEFIT",
    icon: TagIcon,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
  },
  painpoint: {
    label: "REPLACES SAAS SPRAWL",
    icon: TagIcon,
    color: "text-[#F1AEA0]",
    bgColor: "bg-[#E57AF3]/10 border-[#E57AF3]/25",
  },
  faq: {
    label: "COMMON QUESTION",
    icon: TagIcon,
    color: "text-[#0a2540]",
    bgColor: "bg-[#0a2540]/8 border-[#e3e8ee]",
  },
};

const outcomeItems: OutcomeCardItem[] = [
  {
    id: 1,
    content:
      "Replace overlapping third-party subscriptions and spreadsheets with one cohesive platform designed around your business, without recurring per-seat fees climbing as you hire.",
    title: "One System Instead of Many Subscriptions",
    subtitle: "SYS.01 // CONSOLIDATION",
    badgeCode: "01",
    category: "ownership",
  },
  {
    id: 2,
    content:
      "Off-the-shelf software forces your team into generic templates and manual workarounds. Custom software mirrors your exact intake, approval, dispatch, and reporting rules.",
    title: "Software That Follows Your Real Workflow",
    subtitle: "SYS.02 // OPERATIONAL FIT",
    badgeCode: "02",
    category: "ownership",
  },
  {
    id: 3,
    content:
      "When your business adds a service line, changes pricing logic, or expands to a new market, you evolve the software on your schedule without waiting on a vendor roadmap.",
    title: "Changes Are Not Gated by a Vendor",
    subtitle: "SYS.03 // AGILITY & CONTROL",
    badgeCode: "03",
    category: "ownership",
  },
  {
    id: 4,
    content:
      "Your business owns the application architecture, custom logic, and operational data outright — eliminating vendor lock-in across your most critical workflows.",
    title: "Your Business Owns What It Runs",
    subtitle: "SYS.04 // DIRECT OWNERSHIP",
    badgeCode: "04",
    category: "ownership",
  },
  {
    id: 5,
    content:
      "Customer records, quotes, schedules, and invoices no longer sit trapped in separate logins. Systems integration connects your existing APIs and accounting into one source of truth.",
    title: "Eliminate Disconnected Data Silos",
    subtitle: "PAIN.01 // UNIFIED DATA",
    badgeCode: "05",
    category: "painpoint",
  },
  {
    id: 6,
    content:
      "We serve businesses across Louisiana (Shreveport, Benton), Texas (Marble Falls, Austin, Hughes Springs, Longview, Commerce), and Missouri (Kansas City), plus remote clients nationwide.",
    title: "Regional Service Areas & Remote Delivery",
    subtitle: "FAQ.01 // WHERE WE WORK",
    badgeCode: "06",
    category: "faq",
  },
  {
    id: 7,
    content:
      "You do not need a formal technical specification to start. Bring a clear picture of how your team works today and which tools or spreadsheets are slowing you down.",
    title: "How to Start a Project Inquiry",
    subtitle: "FAQ.02 // GETTING STARTED",
    badgeCode: "07",
    category: "faq",
  },
  {
    id: 8,
    content:
      "Every engagement begins with workflow mapping and system definition before production engineering, ensuring clear scope and milestone delivery.",
    title: "Structured Milestones From Day One",
    subtitle: "FAQ.03 // DELIVERY PROCESS",
    badgeCode: "08",
    category: "faq",
  },
];

function OutcomeCard({ item: t }: { item: OutcomeCardItem }) {
  const config = categoryConfig[t.category];
  const BadgeIcon = config.icon;

  return (
    <div className="group relative w-[350px] shrink-0 cursor-crosshair border border-[#e3e8ee] bg-white backdrop-blur-md transition-colors duration-300 md:w-[450px]">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

      <div className="flex h-full w-full flex-col p-8 whitespace-normal">
        {/* Category Badge */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${config.bgColor}`}
          >
            <BadgeIcon className={`h-3 w-3 ${config.color}`} />
            <span
              className={`text-[10px] font-bold tracking-widest ${config.color}`}
            >
              {config.label}
            </span>
          </div>
          <span className="font-mono text-xs text-[#0a2540]/30">
            [{t.badgeCode}]
          </span>
        </div>

        {/* Outcome Content */}
        <p className="group-hover:text-primary mb-8 grow font-mono text-sm leading-relaxed tracking-wide text-[#425466] transition-colors duration-300">
          {t.content}
        </p>

        {/* Bottom Info */}
        <div className="mt-auto flex items-center gap-3 border-t border-[#e3e8ee] pt-6">
          <div className="group-hover:border-primary relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e3e8ee] bg-[#0a2540]/6 transition-colors duration-300">
            <span className="text-brand text-xs font-bold">
              <MeshInk>{t.badgeCode}</MeshInk>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-[#0a2540] uppercase">
              {t.title}
            </span>
            <span className="mt-0.5 text-[10px] tracking-widest text-[#6b7c93]">
              {t.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
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

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...outcomeItems, ...outcomeItems];

  return (
    <section
      id="faq"
      className="bg-[#f6f9fc] relative overflow-hidden py-24 md:py-32 font-mono"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-[#e3e8ee] lg:block" />

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
              OWNERSHIP BENEFITS &amp; FAQS
            </MeshInk>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Built for <span className="text-brand"><MeshInk>long-term</MeshInk></span> control
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl"
          >
            <span className="text-[#0a2540]">
              Why growing businesses choose custom software they own.
            </span>{" "}
            Instead of disconnected third-party tools.
          </motion.p>
        </motion.div>
      </Container>

      {/* Marquee Scroller */}
      <div className="relative mt-8 flex w-full max-w-full overflow-hidden">
        {/* Left/Right Fade Gradients for smooth entering/exiting */}
        <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-32 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-32 bg-linear-to-l to-transparent" />

        <motion.div
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45,
          }}
        >
          {marqueeItems.map((t, index) => (
            <OutcomeCard key={`${t.id}-${index}`} item={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
