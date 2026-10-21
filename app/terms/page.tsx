import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} (${siteConfig.legalName}), governing website usage, project engagements, and software ownership principles.`,
  alternates: {
    canonical: "/terms",
  },
};

const TERMS_SECTIONS = [
  {
    code: "01 // OPERATOR & SCOPE",
    title: "Agreement to Terms",
    body: `This website (${siteConfig.url}) is operated by ${siteConfig.legalName} doing business as ${siteConfig.name}. By accessing this website or submitting a project inquiry, you agree to these Terms of Service.`,
  },
  {
    code: "02 // ENGAGEMENTS & STATEMENTS OF WORK",
    title: "Project Scope & Milestones",
    body: "All custom software development, CRM engineering, AI automation, and systems integration engagements are governed by a written Master Services Agreement (MSA) and Statement of Work (SOW) specifying deliverables, milestone schedules, and acceptance criteria.",
  },
  {
    code: "03 // INTELLECTUAL PROPERTY & CLIENT OWNERSHIP",
    title: "100% Client Ownership Upon Final Milestone Payment",
    body: "Upon completion of milestone payments as defined in the applicable Statement of Work, full ownership of custom application source code, database schemas, and project-specific deliverables transfers to the client, with zero recurring per-seat licensing fees owed to Studio Sozo.",
  },
  {
    code: "04 // THIRD-PARTY SERVICES",
    title: "External APIs & Cloud Infrastructure",
    body: "Custom systems may integrate with third-party platforms (such as AWS, Vercel, Supabase, Stripe, QuickBooks, Twilio, or AI model providers). Direct usage fees and terms of those third-party providers remain governed by your respective account agreements with those providers.",
  },
  {
    code: "05 // LIMITATION OF LIABILITY",
    title: "Website Content & Estimates",
    body: "Pricing tiers, ROI calculator figures, and timeline ranges presented on this website are provided for planning and informational purposes. Binding project commitments are established solely through a mutually executed Statement of Work.",
  },
] as const;

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={`LEGAL // ${siteConfig.legalName.toUpperCase()}`}
        headline="Terms of"
        highlightWord="Service"
        leadBold="Clear engineering terms built around client ownership."
        leadBody="Review the terms governing the use of studiosozo.dev and our custom software engineering engagements."
      />

      <section className="bg-[#f6f9fc] py-20 md:py-28">
        <Container className="mx-auto">
          <FadeInSection className="mx-auto max-w-4xl space-y-6">
            {TERMS_SECTIONS.map((sec) => (
              <FadeInItem
                key={sec.code}
                className="border border-[#e3e8ee] bg-white p-8"
              >
                <div className="mb-2 text-xs font-bold tracking-widest text-[#635bff] uppercase">
                  {sec.code}
                </div>
                <h2 className="mb-3 font-sans text-xl font-bold text-[#0a2540]">
                  {sec.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[#425466] md:text-base">
                  {sec.body}
                </p>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
