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
    "How It Works | Website & Custom App Build Process at Studio Sozo",
  description:
    "See how Studio Sozo takes your website ($800-$1,000 in 1-2 weeks) or custom application (4-10 weeks) from a quick discovery call to launch with 100% ownership.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: `Our 4-Step Build Process | ${siteConfig.name}`,
    description:
      "A clear, straightforward 4-step process for custom websites and business applications.",
    url: `${siteConfig.url}/process`,
  },
};

const PROCESS_PHASES = [
  {
    number: "01",
    code: "STEP // 01 : DAY 1-2",
    title: "Quick Call & Upfront Quote",
    subtitle: "Clear Scope and Flat Pricing Before Work Starts",
    problemSolved:
      "Most agencies hide behind vague hourly estimates or jargon-filled proposals that drag on for weeks.",
    summary:
      "Tell us what you need built or updated. Whether it is an $800-$1,000 business website refresh or a custom app for your team, we map the pages or features and give you an exact upfront quote.",
    deliverables: [
      "Clear breakdown of pages, features, and project scope",
      "Exact flat price ($800-$1,000 for websites) or milestone schedule",
      "Target launch timeline (1-2 weeks for websites, 4-10 weeks for apps)",
      "Direct communication setup with Chandler from day one",
    ],
  },
  {
    number: "02",
    code: "STEP // 02 : WEEK 1",
    title: "Design & Live Clickable Preview",
    subtitle: "See It Working on Your Phone and Laptop Early",
    problemSolved:
      "Waiting weeks to see static mockups leads to surprises and wasted time.",
    summary:
      "We put a live preview link in your hands early so you can test the layout, wording, mobile responsiveness, and user flow on real devices and request tweaks right away.",
    deliverables: [
      "Mobile-first visual layout tailored to your brand and customers",
      "Live private staging link you can open on your phone anytime",
      "Clear customer calls-to-action, quote forms, or app screens",
      "Fast feedback loop directly with the engineer building it",
    ],
  },
  {
    number: "03",
    code: "STEP // 03 : BUILD & WIRE UP",
    title: "Fast Engineering, SEO & Tool Connections",
    subtitle: "1-2 Weeks for Websites • Weekly Releases for Custom Apps",
    problemSolved:
      "Traditional shops disappear into a black box and hand back something slow or disconnected from your real business.",
    summary:
      "For standalone websites, we wire up your direct inbox lead forms, local Google SEO, and fast page speed. For custom apps and CRMs, we build your database, logins, Stripe payments, and QuickBooks/SMS connections in clear weekly sprints.",
    deliverables: [
      "Production-ready website or full-stack web & mobile application",
      "Direct email/SMS notifications, booking flows, or payment checkout",
      "Local Google SEO titles, sitemap, and fast mobile speed optimization",
      "Clean import of your existing photos, copy, or spreadsheet data",
    ],
  },
  {
    number: "04",
    code: "STEP // 04 : LAUNCH & HANDOVER",
    title: "Go Live With 100% Ownership",
    subtitle: "Your Domain, Your Code, $0 Monthly Platform Rent",
    problemSolved:
      "Website builders and SaaS vendors lock your business inside monthly subscriptions forever.",
    summary:
      "We connect your custom domain, verify SSL security and email delivery, walk you through everything, and hand over full ownership of your code and accounts.",
    deliverables: [
      "Zero-downtime launch on your custom domain (.com, .dev, etc.)",
      "100% source code, GitHub repository, and cloud account ownership",
      "Post-launch support window included at no extra charge",
      "Optional flat-rate updates or phase-2 features whenever you grow",
    ],
  },
] as const;

const COLLABORATION_STANDARDS = [
  {
    tag: "LIVE PREVIEWS",
    title: "See Real Progress Every Step",
    description:
      "You never have to guess how your project is going. You get a live preview link to click through real pages and screens as they come together.",
  },
  {
    tag: "DIRECT ACCESS",
    title: "Work Directly With Chandler",
    description:
      "No game of telephone through salespeople or non-technical account managers. You talk straight to the founder building your site or app.",
  },
  {
    tag: "FAST TURNAROUND",
    title: "1-2 Weeks for Websites, Clear Sprints for Apps",
    description:
      "Standalone 1-5 page business websites launch in 1-2 weeks. Custom web and mobile applications ship in structured weekly milestones.",
  },
  {
    tag: "FULL OWNERSHIP",
    title: "Built on Clean, Modern Tech",
    description:
      "Everything is built on Next.js, React, and TypeScript so your site loads fast today and can easily add booking or portal features later.",
  },
] as const;

const PROCESS_FAQS = [
  {
    question: "Do I need a technical spec or wireframes before reaching out?",
    answer:
      "Not at all. Just share your current website link (if you have one) or describe what your business does and what you want built. Step 01 turns your goals into a clear, plain-English plan.",
  },
  {
    question: "How much of my time will this take during the build?",
    answer:
      "Very little. After a short 20-30 minute kickoff call to gather your goals, photos, and service details, you just review the live preview link on your schedule and tell us any tweaks you want.",
  },
  {
    question: "Can I start with an $800-$1,000 website now and add custom app features later?",
    answer:
      "Yes, and many clients do exactly that. Because we build standalone websites on the same modern Next.js foundation as our custom web apps, we can add online booking, payments, or a customer portal later without rebuilding your site.",
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
        eyebrow="HOW IT WORKS // 04 SIMPLE STEPS"
        headline="From First Call to Live Launch Without the"
        highlightWord="Headache"
        leadBold="No confusing tech jargon, no mystery timelines, and no six-month black boxes."
        leadBody="Whether we are launching your $800-$1,000 website in two weeks or building a custom application for your team, here is how we take your project live."
        primaryCta={{ text: "Start Your Project", href: "/contact" }}
        secondaryCta={{ text: "See Pricing ($800+)", href: "/pricing" }}
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
              <MeshInk>{"//"} STEP-BY-STEP PROCESS</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Four clear steps from idea to{" "}
                <span className="text-brand">
                  <MeshInk>launch</MeshInk>
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
                    <MeshInk>{"//"} STEP {phase.number} DELIVERABLES</MeshInk>
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
                Simple, direct{" "}
                <span className="text-brand">
                  <MeshInk>communication</MeshInk>
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
                <MeshInk>work together</MeshInk>
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
                  <MeshInk>{"//"} READY TO KICK OFF?</MeshInk>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0a2540] md:text-4xl">
                  Ready to get a clear plan and upfront quote?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  Check out our transparent pricing tiers or send us a quick
                  note about your website or app project.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/pricing"
                  className="border border-[#e3e8ee] bg-white px-6 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
                >
                  See Pricing ($800+)
                </Link>
                <LitUpButton
                  href="/contact"
                  className="w-fit text-xs font-bold tracking-widest uppercase"
                >
                  Start Your Project <ArrowUpRight01Icon className="h-4 w-4" />
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
