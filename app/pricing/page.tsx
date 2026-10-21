import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import { RoiCalculator } from "@/components/roi-calculator";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/components/seo/json-ld";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Custom Software Pricing & Investment | Own Your Platform vs. Renting SaaS",
  description:
    "Transparent engagement models and investment tiers for custom software development, CRM systems, and AI workflow automation at Studio Sozo. 100% code ownership, $0 per-seat fees.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Pricing & Engagement Models | ${siteConfig.name}`,
    description:
      "Fixed-scope milestone builds and dedicated engineering partnerships with 100% code ownership and zero per-seat SaaS licensing fees.",
    url: `${siteConfig.url}/pricing`,
  },
};

const PRICING_TIERS = [
  {
    code: "TIER // 01 — WORKFLOW & INTEGRATION SPRINT",
    name: "Automation & Integration Build",
    timeline: "2 – 4 Weeks",
    priceLabel: "Starting at $2,000",
    priceSubtext: "Fixed-scope milestone investment",
    featured: false,
    idealFor:
      "Businesses losing hours to manual data entry, disconnected tools, or fragile Zapier chains that need a reliable bridge fast.",
    painPointSolved:
      "Eliminates double data entry between your website/intake, CRM, scheduling, and QuickBooks/Stripe.",
    includes: [
      "Workflow audit & systems integration blueprint",
      "Custom two-way API & webhook sync (QuickBooks, Stripe, CRM, SMS)",
      "AI document extraction or automated lead intake & routing pipeline",
      "Idempotent retry queues, error alerting & sync health dashboard",
      "100% source code ownership & production deployment",
    ],
    ctaText: "Scope an Automation Sprint",
  },
  {
    code: "TIER // 02 — CORE CUSTOM PLATFORM",
    name: "Custom CRM, Portal or Web/Mobile App",
    timeline: "6 – 10 Weeks",
    priceLabel: "$5,000 – $10,000",
    priceSubtext: "Milestone-based fixed-scope build",
    featured: true,
    idealFor:
      "Growing companies ready to replace spreadsheets and bloated off-the-shelf CRMs with a unified system built around their exact operations.",
    painPointSolved:
      "Replaces 4–6 disconnected subscriptions with one fast, role-specific platform your business owns 100%.",
    includes: [
      "Complete Phase 01 discovery, data modeling & clickable UI prototype",
      "Custom CRM, quoting/booking engine, dispatch board, or customer portal",
      "Role-based workspaces for admins, sales reps, field crews, and clients",
      "Built-in Stripe payments, Twilio SMS/email notifications & reporting",
      "Historical data migration from spreadsheets or legacy software",
      "100% IP, GitHub repository & cloud infrastructure ownership ($0/seat)",
    ],
    ctaText: "Scope Your Custom Platform",
  },
  {
    code: "TIER // 03 — ENTERPRISE & MULTI-PLATFORM",
    name: "Full Ecosystem / Dedicated Engineering",
    timeline: "10+ Weeks or Ongoing Retainer",
    priceLabel: "Custom Scope",
    priceSubtext: "Phased roadmap or monthly velocity partner",
    featured: false,
    idealFor:
      "Multi-location operators or product founders shipping a flagship web + iOS/Android platform, AI copilot suite, or multi-department ERP.",
    painPointSolved:
      "Gives you a senior full-stack product & AI engineering team without the $400k+/yr overhead of hiring in-house.",
    includes: [
      "Unified Web Application + Native iOS & Android Mobile Apps",
      "Custom AI agents, RAG knowledge bases, and vision/voice workflows",
      "Multi-branch / multi-tenant permissions, audit logs & analytics warehouse",
      "App Store & Google Play submission and release management",
      "Dedicated weekly sprint velocity and priority SLAs",
    ],
    ctaText: "Discuss Enterprise Scope",
  },
] as const;

const OWNERSHIP_VS_SAAS = [
  {
    dimension: "Per-User / Per-Seat Fees",
    rentedSaas: "$75–$250/user/mo forever—penalizes you every time you hire",
    studioSozo: "$0 per seat forever—add unlimited reps, techs, and contractors",
  },
  {
    dimension: "Workflow Fit",
    rentedSaas: "Rigid generic templates that force side-spreadsheets and workarounds",
    studioSozo: "Engineered around your exact quoting, stages, approvals, and field ops",
  },
  {
    dimension: "Intellectual Property & Data",
    rentedSaas: "Vendor owns the platform; your data is locked inside their schema",
    studioSozo: "You own 100% of the code, database, and cloud infrastructure",
  },
  {
    dimension: "3-Year Total Cost (25-Person Team)",
    rentedSaas: "$90,000 – $180,000+ in recurring licenses & add-on tiers",
    studioSozo: "One-time build investment + ~$50–$150/mo direct cloud hosting",
  },
] as const;

const PRICING_FAQS = [
  {
    question: "How are payments structured during a build?",
    answer:
      "We never ask for 100% upfront. Projects are structured around clear, verifiable milestones—typically 30% at kickoff, 40% at interactive staging approval, and 30% upon production launch and handover.",
  },
  {
    question: "What are our ongoing costs after the software launches?",
    answer:
      "Because you own the software, there are zero licensing or per-user fees paid to Studio Sozo. Your only required ongoing cost is your direct cloud hosting and third-party usage (e.g., Vercel, Supabase/Postgres, Twilio, or OpenAI APIs), which typically runs $40–$150/month for most businesses.",
  },
  {
    question: "Do you offer ongoing support and feature development after launch?",
    answer:
      "Yes. Every build includes a post-launch stabilization window at no extra charge. After that, you can either run the system independently, request on-demand enhancements, or partner with us on a monthly engineering retainer to continuously ship phase-2 capabilities.",
  },
  {
    question: "What if we aren't sure which tier our project falls into?",
    answer:
      "Send us a short note on our contact page describing what tools you want to replace or automate. On our first call, we will give you a straightforward ballpark range and recommend the fastest path to ROI.",
  },
];

export default function PricingPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(PRICING_FAQS),
        ]}
      />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="TRANSPARENT INVESTMENT // ZERO PER-SEAT TAX"
        headline="Stop Renting Software. Invest in a System You"
        highlightWord="Own"
        leadBold="SaaS companies charge you every month forever—and charge you more every time your team grows."
        leadBody="Studio Sozo builds custom software on fixed, milestone-backed scopes where you own 100% of the code and pay $0 in per-seat licensing fees."
        primaryCta={{ text: "Get a Custom Project Quote", href: "/contact" }}
        secondaryCta={{ text: "See Our 4-Phase Process", href: "/process" }}
      />

      {/* Pricing Tiers */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} ENGAGEMENT MODELS &amp; INVESTMENT TIERS</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Clear scope. Fixed milestones.{" "}
                <span className="text-brand">
                  <MeshInk>100% ownership.</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <FadeInItem
                key={tier.name}
                className={
                  tier.featured
                    ? "relative flex flex-col justify-between border-2 border-[#635bff] bg-white p-8 shadow-[0_18px_50px_rgba(10,37,64,0.1)] md:p-10"
                    : "relative flex flex-col justify-between border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)] md:p-10"
                }
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="text-brand text-[11px] font-bold tracking-widest uppercase">
                      <MeshInk>{tier.code}</MeshInk>
                    </span>
                    {tier.featured && (
                      <span className="border border-[#635bff]/30 bg-[#635bff]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 font-sans text-2xl font-bold text-[#0a2540]">
                    {tier.name}
                  </h3>

                  <div className="my-6 border-y border-[#e3e8ee] py-5">
                    <div className="font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-4xl">
                      {tier.priceLabel}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#6b7c93] uppercase">
                      <span>{tier.priceSubtext}</span>
                      <span className="font-bold text-[#0a2540]">
                        {tier.timeline}
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 font-sans text-sm leading-relaxed text-[#425466]">
                    {tier.idealFor}
                  </p>

                  <div className="mb-6 border-l-2 border-[#635bff] bg-[#f6f9fc] p-3.5">
                    <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                      PAIN POINT ELIMINATED:
                    </span>
                    <p className="mt-1 font-sans text-xs font-bold text-[#0a2540]">
                      {tier.painPointSolved}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="mb-3 text-[11px] font-bold tracking-widest text-[#6b7c93] uppercase">
                      What&apos;s Included:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 font-sans text-sm font-medium text-[#0a2540]"
                        >
                          <span className="text-primary font-mono text-xs font-bold">
                            [✓]
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {tier.featured ? (
                  <LitUpButton
                    href="/contact"
                    className="w-full justify-center text-xs font-bold tracking-widest uppercase"
                  >
                    {tier.ctaText} <ArrowUpRight01Icon className="h-4 w-4" />
                  </LitUpButton>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 border border-[#0a2540] bg-[#0a2540] px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-[#635bff] hover:bg-[#635bff]"
                  >
                    {tier.ctaText} <ArrowUpRight01Icon className="h-4 w-4" />
                  </Link>
                )}
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* ROI Comparison: Rented SaaS vs Studio Sozo Ownership */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 max-w-3xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} THE ECONOMICS OF SOFTWARE OWNERSHIP</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Why owning beats{" "}
              <span className="text-brand">
                <MeshInk>renting SaaS</MeshInk>
              </span>
            </Heading>
          </div>

          <div className="overflow-hidden border border-[#e3e8ee]">
            <div className="grid grid-cols-1 border-b border-[#e3e8ee] bg-[#f6f9fc] text-xs font-bold tracking-widest uppercase md:grid-cols-12">
              <div className="p-5 text-[#6b7c93] md:col-span-3">Dimension</div>
              <div className="border-t border-[#e3e8ee] p-5 text-[#6b7c93] md:col-span-4 md:border-t-0 md:border-l">
                Rented Off-the-Shelf SaaS Stack
              </div>
              <div className="text-brand border-t border-[#e3e8ee] bg-white p-5 md:col-span-5 md:border-t-0 md:border-l">
                <MeshInk>Studio Sozo Custom Platform (100% Owned)</MeshInk>
              </div>
            </div>

            {OWNERSHIP_VS_SAAS.map((row) => (
              <div
                key={row.dimension}
                className="grid grid-cols-1 border-b border-[#e3e8ee] last:border-b-0 md:grid-cols-12"
              >
                <div className="bg-[#f6f9fc]/60 p-5 font-sans text-sm font-bold text-[#0a2540] md:col-span-3">
                  {row.dimension}
                </div>
                <div className="border-t border-[#e3e8ee] p-5 font-sans text-sm text-[#425466] md:col-span-4 md:border-t-0 md:border-l">
                  {row.rentedSaas}
                </div>
                <div className="border-t border-[#e3e8ee] bg-white p-5 font-sans text-sm font-bold text-[#0a2540] md:col-span-5 md:border-t-0 md:border-l">
                  {row.studioSozo}
                </div>
              </div>
            ))}
          </div>

          <FadeInSection className="mt-14">
            <FadeInItem>
              <RoiCalculator />
            </FadeInItem>
          </FadeInSection>
        </Container>
      </section>

      {/* Pricing FAQs */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} PRICING &amp; BILLING FAQ</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground mb-12 font-sans text-balance"
            >
              Common questions on{" "}
              <span className="text-brand">
                <MeshInk>investment</MeshInk>
              </span>
            </Heading>

            <div className="space-y-4">
              {PRICING_FAQS.map((faq, idx) => (
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
        <Container className="mx-auto text-center">
          <div className="mx-auto max-w-3xl border border-[#e3e8ee] bg-[#f6f9fc] p-10 md:p-14">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} GET A CLEAR SCOPE &amp; ESTIMATE</MeshInk>
            </div>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-5xl">
              Tell us what you want to build or replace.
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-sans text-base font-medium text-[#425466] md:text-lg">
              We will review your workflow, recommend the right tier, and give you a transparent milestone breakdown.
            </p>
            <LitUpButton
              href="/contact"
              className="mx-auto w-fit text-xs font-bold tracking-widest uppercase"
            >
              Discuss Your Project <ArrowUpRight01Icon className="h-4 w-4" />
            </LitUpButton>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
