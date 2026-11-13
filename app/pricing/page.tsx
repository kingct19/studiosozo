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
import { OWNERSHIP_VS_SAAS, PRICING_FAQS, PRICING_TIERS } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Website & Custom App Pricing ($800+) | Transparent Flat & Milestone Builds",
  description:
    "Straightforward pricing at Studio Sozo: $800–$1,000 standalone business websites & redesigns, $2,000+ workflow automations, and $5,000–$10,000 custom web/mobile apps & CRMs. 100% owned.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Website & Custom App Pricing | ${siteConfig.name}`,
    description:
      "Start with an $800–$1,000 custom website or build a full web/mobile application you own 100% with $0 monthly platform fees.",
    url: `${siteConfig.url}/pricing`,
  },
};

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
        eyebrow="TRANSPARENT PRICING // $800 WEBSITES TO FULL CUSTOM APPS"
        headline="Straightforward Pricing for Websites & Apps You"
        highlightWord="Own"
        leadBold="Stop paying monthly website builder rent or climbing per-user software bills."
        leadBody="Whether you need an $800–$1,000 custom business website in two weeks or a full web/mobile application for your team, you get clear upfront pricing and 100% ownership."
        primaryCta={{
          text: "Start My Website ($800–$1k)",
          href: "/contact?package=website",
        }}
        secondaryCta={{ text: "Get a Custom App Quote", href: "/contact" }}
      />

      {/* Pricing Tiers */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} 04 CLEAR INVESTMENT TIERS</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Pick what fits right now.{" "}
                <span className="text-brand">
                  <MeshInk>Own it 100%.</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PRICING_TIERS.map((tier) => (
              <FadeInItem
                key={tier.id}
                className={
                  tier.highlightAccent
                    ? "relative flex flex-col justify-between border-2 border-[#635bff] bg-white p-8 shadow-[0_18px_50px_rgba(10,37,64,0.08)] md:p-10"
                    : "relative flex flex-col justify-between border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)] md:p-10"
                }
              >
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-brand text-[11px] font-bold tracking-widest uppercase">
                      <MeshInk>{tier.code}</MeshInk>
                    </span>
                    {tier.badge && (
                      <span className="border border-[#635bff]/30 bg-[#635bff]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                        {tier.badge}
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
                      WHY CLIENTS CHOOSE THIS:
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

                {tier.highlightAccent ? (
                  <LitUpButton
                    href={tier.ctaHref}
                    className="w-full justify-center text-xs font-bold tracking-widest uppercase"
                  >
                    {tier.ctaText} <ArrowUpRight01Icon className="h-4 w-4" />
                  </LitUpButton>
                ) : (
                  <Link
                    href={tier.ctaHref}
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
              <MeshInk>{"//"} OWNERSHIP VS. MONTHLY SUBSCRIPTIONS</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Why owning beats{" "}
              <span className="text-brand">
                <MeshInk>monthly rent</MeshInk>
              </span>
            </Heading>
          </div>

          <div className="overflow-hidden border border-[#e3e8ee]">
            <div className="grid grid-cols-1 border-b border-[#e3e8ee] bg-[#f6f9fc] text-xs font-bold tracking-widest uppercase md:grid-cols-12">
              <div className="p-5 text-[#6b7c93] md:col-span-3">Comparison</div>
              <div className="border-t border-[#e3e8ee] p-5 text-[#6b7c93] md:col-span-4 md:border-t-0 md:border-l">
                Rented Builders &amp; Per-Seat SaaS
              </div>
              <div className="text-brand border-t border-[#e3e8ee] bg-white p-5 md:col-span-5 md:border-t-0 md:border-l">
                <MeshInk>Studio Sozo (100% Owned)</MeshInk>
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
                <MeshInk>pricing</MeshInk>
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
              <MeshInk>{"//"} GET A CLEAR QUOTE</MeshInk>
            </div>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-5xl">
              Tell us what you want to build or update.
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-sans text-base font-medium text-[#425466] md:text-lg">
              Whether it&apos;s an $800–$1,000 website refresh or a custom app
              for your team, Chandler will reply personally with a clear plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LitUpButton
                href="/contact?package=website"
                className="w-fit text-xs font-bold tracking-widest uppercase"
              >
                Start an $800–$1k Website{" "}
                <ArrowUpRight01Icon className="h-4 w-4" />
              </LitUpButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#0a2540] bg-white px-6 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
              >
                Scope a Custom App <ArrowUpRight01Icon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
