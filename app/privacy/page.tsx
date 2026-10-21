import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} (${siteConfig.legalName}), covering how project inquiry data, analytics, and client communications are handled.`,
  alternates: {
    canonical: "/privacy",
  },
};

const SECTIONS = [
  {
    code: "01 // INFORMATION WE COLLECT",
    title: "Project Inquiry & Contact Data",
    body: "When you submit a project inquiry on studiosozo.dev, we collect the business contact details and project context you voluntarily provide—including your name, company name, work email, phone number, service location, capabilities of interest, budget range, timeline, and workflow description.",
  },
  {
    code: "02 // HOW WE USE YOUR INFORMATION",
    title: "Responding to Inquiries & Delivering Services",
    body: "We use the information you submit solely to evaluate your project requirements, respond to your inquiry, prepare architectural proposals, and deliver contracted software engineering services. We never sell, rent, or trade your personal or business information to third-party data brokers or advertisers.",
  },
  {
    code: "03 // CONFIDENTIALITY & CLIENT DATA",
    title: "Strict Protection of Operational & Proprietary Information",
    body: "Any operational workflows, internal metrics, customer lists, or proprietary business logic shared with Studio Sozo during discovery or software engineering engagements are treated as strictly confidential and used exclusively to build and support your system.",
  },
  {
    code: "04 // INFRASTRUCTURE & SECURITY",
    title: "Modern Encryption & Access Controls",
    body: "All data transmitted through studiosozo.dev is encrypted in transit via TLS. Access to project inquiry records is restricted to authorized personnel of Sozo Tech Enterprise LLC.",
  },
  {
    code: "05 // YOUR RIGHTS & CONTACT",
    title: "Requesting Data Access or Deletion",
    body: `You may request a copy, correction, or deletion of any inquiry data associated with your email address at any time by contacting ${siteConfig.legalName} through our project inquiry page at ${siteConfig.url}/contact.`,
  },
] as const;

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={`LEGAL // ${siteConfig.legalName.toUpperCase()}`}
        headline="Privacy"
        highlightWord="Policy"
        leadBold="We respect your business confidentiality and privacy."
        leadBody="Here is exactly how Studio Sozo collects, protects, and uses information shared through our website and project inquiries."
      />

      <section className="bg-[#f6f9fc] py-20 md:py-28">
        <Container className="mx-auto">
          <FadeInSection className="mx-auto max-w-4xl space-y-6">
            {SECTIONS.map((sec) => (
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
