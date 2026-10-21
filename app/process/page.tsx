import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/components/seo/json-ld";
import { TaskStream } from "@/components/snap-cn/task-stream";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Our Software Engineering Process | From Workflow Discovery to Full Ownership",
  description:
    "See how Studio Sozo takes you from disconnected spreadsheets and SaaS bottlenecks to a custom, production-ready platform you own 100% in 4 structured phases.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: `Development Process & Methodology | ${siteConfig.name}`,
    description:
      "A transparent, milestone-driven engineering process built around your real operational workflows.",
    url: `${siteConfig.url}/process`,
  },
};

const PROCESS_PHASES = [
  {
    number: "01",
    code: "PHASE // 01 — WEEK 1–2",
    title: "Operational Discovery & Workflow Mapping",
    subtitle: "Diagnose the Bottleneck Before Writing Code",
    problemSolved:
      "Most software projects fail because developers build from a vague feature wish-list instead of shadowing how work actually moves through your business.",
    summary:
      "We sit down with your operators, sales reps, dispatchers, and leadership to map every intake source, spreadsheet, approval gate, and handoff that currently slows you down.",
    deliverables: [
      "End-to-end current-state vs. target-state workflow blueprint",
      "PostgreSQL domain data model (entities, statuses, permissions)",
      "Interactive clickable wireframe prototype of core operator screens",
      "Fixed milestone roadmap and priority release schedule",
    ],
  },
  {
    number: "02",
    code: "PHASE // 02 — WEEK 2–4",
    title: "System Architecture & Interactive Prototyping",
    subtitle: "Lock In Rules, Roles, and Data Integrity",
    problemSolved:
      "Discovering missing fields or permission edge cases after launch causes expensive rework and frustrates your team.",
    summary:
      "We engineer the foundational database schema, authentication/role boundaries, and API contracts while putting live staging screens in your hands early for real-world feedback.",
    deliverables: [
      "Production database schema with audit trails and row-level security",
      "Role-based workspaces for admins, reps, field crews, and customers",
      "Validated business rules for pricing, quoting, and stage transitions",
      "Live staging URL updated continuously for stakeholder review",
    ],
  },
  {
    number: "03",
    code: "PHASE // 03 — WEEK 4–8+",
    title: "Custom Engineering, AI & Systems Integration",
    subtitle: "Weekly Shipped Milestones with Zero Black Boxes",
    problemSolved:
      "Traditional agencies disappear for months and return with something that doesn't connect to your real tools.",
    summary:
      "We build your application in focused weekly sprints—connecting Stripe, QuickBooks, Twilio, AI extraction pipelines, and mobile views so your data flows automatically from end to end.",
    deliverables: [
      "Full-stack web and/or iOS & Android mobile application",
      "Two-way API & webhook integrations (QuickBooks, Stripe, SMS, calendars)",
      "Deterministic & AI-powered document/workflow automation pipelines",
      "Historical data migration scripts from legacy CRMs or spreadsheets",
    ],
  },
  {
    number: "04",
    code: "PHASE // 04 — LAUNCH & HANDOVER",
    title: "Deployment, Team Onboarding & 100% Ownership",
    subtitle: "Your Cloud, Your Code, Zero Per-Seat Ransoms",
    problemSolved:
      "SaaS vendors and proprietary agencies trap your data and charge you more every time you hire.",
    summary:
      "We deploy to your own production cloud environment, train your team with role-specific walkthroughs, monitor live cutover, and hand over full repository and infrastructure ownership.",
    deliverables: [
      "Zero-downtime production launch & historical data cutover",
      "100% GitHub repository, database, and cloud account ownership",
      "Automated backups, error monitoring, and CI/CD deployment pipeline",
      "Optional ongoing engineering retainer for phase-2 expansion",
    ],
  },
] as const;

const COLLABORATION_STANDARDS = [
  {
    tag: "CADENCE",
    title: "Weekly Live Staging Demos",
    description:
      "You never wonder where your project stands. Every week you click through real, working software in a live staging environment.",
  },
  {
    tag: "DIRECT ACCESS",
    title: "Direct Engineer Communication",
    description:
      "No game of telephone through layers of non-technical account managers. You work directly with the engineers building your system.",
  },
  {
    tag: "DATA SAFETY",
    title: "Safe Parallel Cutover",
    description:
      "We run migrations and side-by-side verification before switching your team over, so daily operations never miss a beat.",
  },
  {
    tag: "OWNERSHIP",
    title: "Clean, Standard TypeScript Stack",
    description:
      "Built on Next.js, React, TypeScript, and PostgreSQL—industry-standard technologies any senior engineer can maintain.",
  },
] as const;

const PROCESS_FAQS = [
  {
    question: "Do we need a technical specification before reaching out?",
    answer:
      "No. You only need to know what operational bottlenecks, spreadsheets, or disconnected tools are slowing your business down. Phase 01 of our process turns your business goals into a complete technical blueprint.",
  },
  {
    question: "How involved does our team need to be during the build?",
    answer:
      "We respect your time. After 1–2 focused workflow mapping sessions in Week 1, we only need 30 minutes a week to review live staging progress and validate edge cases.",
  },
  {
    question: "Can we launch a core v1 first and add modules over time?",
    answer:
      "Yes—and we strongly recommend it. Launching the highest-impact core workflow first gets your team out of spreadsheet chaos in weeks, and the modular architecture makes adding phase-2 features straightforward.",
  },
];

export default function ProcessPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Process", path: "/process" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(PROCESS_FAQS),
        ]}
      />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="ENGINEERING METHODOLOGY // 04 PHASES"
        headline="How We Engineer Software You"
        highlightWord="Own"
        leadBold="No mystery timelines, no six-month black boxes, and no generic templates."
        leadBody="We follow a disciplined 4-phase engineering process that maps your real operational bottlenecks, ships working software every week, and transfers 100% ownership to your business."
        primaryCta={{ text: "Discuss Your Project", href: "/contact" }}
        secondaryCta={{ text: "View Pricing & Investment", href: "/pricing" }}
      >
        <div className="mx-auto max-w-4xl">
          <TaskStream />
        </div>
      </PageHeader>

      {/* 4 Phases Breakdown */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} STEP-BY-STEP EXECUTION</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Four phases from bottleneck to{" "}
                <span className="text-brand">
                  <MeshInk>production</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="space-y-8">
            {PROCESS_PHASES.map((phase) => (
              <FadeInItem
                key={phase.number}
                className="relative grid grid-cols-1 gap-8 border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)] md:p-10 lg:grid-cols-12"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="lg:col-span-7">
                  <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                    <MeshInk>{phase.code}</MeshInk>
                  </div>
                  <h3 className="mb-2 font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mb-4 text-xs font-bold tracking-widest text-[#6b7c93] uppercase">
                    {phase.subtitle}
                  </p>
                  <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                    {phase.summary}
                  </p>

                  <div className="border-l-2 border-[#635bff] bg-[#f6f9fc] p-4">
                    <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                      WHY THIS MATTERS:
                    </span>
                    <p className="mt-1 font-sans text-sm font-semibold text-[#0a2540]">
                      {phase.problemSolved}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t border-[#e3e8ee] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                    <MeshInk>{"//"} PHASE {phase.number} DELIVERABLES</MeshInk>
                  </div>
                  <ul className="space-y-3">
                    {phase.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-sans text-sm font-semibold text-[#0a2540]"
                      >
                        <span className="text-primary font-mono text-xs font-bold">
                          [✓]
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Collaboration Standards */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} HOW WE WORK TOGETHER</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Built for high-trust{" "}
                <span className="text-brand">
                  <MeshInk>execution</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {COLLABORATION_STANDARDS.map((item) => (
              <FadeInItem
                key={item.title}
                className="relative border border-[#e3e8ee] bg-[#f6f9fc] p-8"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>[ {item.tag} ]</MeshInk>
                </div>
                <h3 className="mb-3 font-sans text-xl font-bold text-[#0a2540]">
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#425466]">
                  {item.description}
                </p>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Process FAQs */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} COMMON PROCESS QUESTIONS</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground mb-12 font-sans text-balance"
            >
              What to expect when we{" "}
              <span className="text-brand">
                <MeshInk>partner</MeshInk>
              </span>
            </Heading>

            <div className="space-y-4">
              {PROCESS_FAQS.map((faq, idx) => (
                <div
                  key={faq.question}
                  className="border border-[#e3e8ee] bg-white p-6 md:p-8"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-brand text-xs font-bold">
                      <MeshInk>0{idx + 1}</MeshInk>
                    </span>
                    <h3 className="font-sans text-lg font-bold text-[#0a2540] md:text-xl">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="pl-7 font-sans text-sm leading-relaxed text-[#425466] md:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <Container className="mx-auto">
          <div className="border border-[#e3e8ee] bg-[#f6f9fc] p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} START WITH PHASE 01 DISCOVERY</MeshInk>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0a2540] md:text-4xl">
                  Ready to map your workflow and see a clear plan?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  Review our transparent pricing tiers or book a discovery call to walk through your current bottlenecks.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/pricing"
                  className="border border-[#e3e8ee] bg-white px-6 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
                >
                  View Pricing
                </Link>
                <LitUpButton
                  href="/contact"
                  className="w-fit text-xs font-bold tracking-widest uppercase"
                >
                  Discuss Your Project <ArrowUpRight01Icon className="h-4 w-4" />
                </LitUpButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
