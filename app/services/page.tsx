import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { caseStudiesData } from "@/lib/case-studies";
import { flatServiceLocations } from "@/lib/locations";
import { SERVICE_PAIN_DIAGNOSTICS, servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Custom Software Development, CRM & AI Automation Services",
  description:
    "Explore Studio Sozo's 6 core capabilities: custom software development, custom CRM & business systems, AI workflow automation, web applications, mobile apps, and systems integration.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services & Capabilities | ${siteConfig.name}`,
    description:
      "We design and build custom software that replaces disconnected tools, eliminates manual data entry, and gives your business 100% ownership.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="CAPABILITIES & PAIN-POINT ENGINEERING"
        headline="Custom Software Engineered to Eliminate Operational"
        highlightWord="Bottlenecks"
        leadBold="Most growing businesses aren't held back by effort—they are held back by disconnected tools."
        leadBody="We design and build unified software systems, custom CRMs, and AI automations tailored to how your team actually operates—with 100% code ownership and zero per-seat SaaS tax."
        primaryCta={{ text: "Discuss Your Project", href: "/contact" }}
        secondaryCta={{ text: "See Shipped Systems", href: "/work" }}
      />

      {/* Pain-Point Diagnostic Matrix */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} THE COST OF DISCONNECTED SOFTWARE</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Pain points we <span className="text-brand"><MeshInk>eliminate</MeshInk></span>
              </Heading>
            </FadeInItem>
            <FadeInItem>
              <p className="mt-4 font-sans text-lg font-bold text-[#425466] md:text-xl">
                If your team is fighting any of these four bottlenecks, adding another off-the-shelf subscription will only make it worse.
              </p>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICE_PAIN_DIAGNOSTICS.map((item) => (
              <FadeInItem
                key={item.code}
                className="relative border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)]"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{item.code}</MeshInk>
                </div>
                <h3 className="mb-4 font-sans text-2xl font-bold tracking-tight text-[#0a2540]">
                  {item.bottleneck}
                </h3>

                <div className="space-y-4 border-t border-[#e3e8ee] pt-4 text-xs leading-relaxed">
                  <div>
                    <span className="block font-bold tracking-widest text-[#6b7c93] uppercase">
                      [ SYMPTOM IN YOUR BUSINESS ]
                    </span>
                    <p className="mt-1 font-sans text-sm text-[#425466]">
                      {item.symptom}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#635bff] pl-3">
                    <span className="text-brand block font-bold tracking-widest uppercase">
                      [ STUDIO SOZO ENGINEERED FIX ]
                    </span>
                    <p className="mt-1 font-sans text-sm font-semibold text-[#0a2540]">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* 6 Core Services Breakdown */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <FadeInItem>
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} 06 CORE CAPABILITIES</MeshInk>
              </div>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Choose the capability your <span className="text-brand"><MeshInk>operations</MeshInk></span> need
              </Heading>
            </FadeInItem>
            <FadeInItem>
              <p className="max-w-md font-sans text-base font-semibold text-[#425466]">
                Every capability can be delivered as a focused standalone solution or combined into a unified company-wide platform.
              </p>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {servicesData.map((service) => (
              <FadeInItem key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col justify-between border border-[#e3e8ee] bg-white p-8 transition-all duration-300 hover:border-[#635bff]/50 hover:bg-[#f6f9fc]/60 md:p-10"
                >
                  <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                  <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                  <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-brand text-xs font-bold tracking-widest uppercase">
                        <MeshInk>{service.eyebrow}</MeshInk>
                      </span>
                      <span className="inline-flex items-center gap-1 border border-[#e3e8ee] px-2.5 py-1 text-[11px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors group-hover:border-[#635bff] group-hover:text-[#635bff]">
                        Explore <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <h3 className="mb-3 font-sans text-2xl font-bold tracking-tight text-[#0a2540] md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                      {service.leadBold} {service.leadBody}
                    </p>

                    <div className="mb-6 border-t border-[#e3e8ee] pt-5">
                      <div className="mb-3 text-[11px] font-bold tracking-widest text-[#6b7c93] uppercase">
                        Pain Points Solved:
                      </div>
                      <ul className="space-y-2">
                        {service.painPoints.map((pp) => (
                          <li
                            key={pp.code}
                            className="flex items-start gap-2.5 font-sans text-sm font-medium text-[#0a2540]"
                          >
                            <span className="text-primary mt-1 font-mono text-xs font-bold">
                              +
                            </span>
                            <span>{pp.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-[#e3e8ee] pt-5">
                    {service.deliverables.map((del) => (
                      <span
                        key={del.title}
                        className="border border-[#e3e8ee] bg-[#0a2540]/3 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#425466] uppercase"
                      >
                        {del.tag}: {del.title}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Proof / Case Studies Strip */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20">
        <Container className="relative z-10 mx-auto">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} PROVEN IN PRODUCTION</MeshInk>
              </div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-4xl">
                See the systems we have shipped
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-[#e3e8ee] bg-white px-5 py-2.5 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
            >
              View All Case Studies <ArrowUpRight01Icon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {caseStudiesData.slice(0, 3).map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group border border-[#e3e8ee] bg-white p-6 transition-all hover:border-[#635bff]/50"
              >
                <div className="text-brand mb-2 text-[11px] font-bold tracking-widest uppercase">
                  <MeshInk>{study.industry}</MeshInk>
                </div>
                <h3 className="mb-2 font-sans text-xl font-bold text-[#0a2540] group-hover:text-[#635bff]">
                  {study.title}
                </h3>
                <p className="mb-4 font-sans text-sm text-[#425466]">
                  {study.painPointTitle}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-[#0a2540] uppercase group-hover:text-[#635bff]">
                  Read Case Study <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Regional Internal Links */}
          <div className="mt-12 border border-[#e3e8ee] bg-white p-6 md:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} REGIONAL &amp; NATIONWIDE DELIVERY</MeshInk>
                </div>
                <p className="font-sans text-sm font-semibold text-[#425466]">
                  Serving businesses across Louisiana, Texas, and Missouri, plus remote collaboration nationwide.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {flatServiceLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="border border-[#e3e8ee] bg-[#0a2540]/4 px-3 py-1.5 text-xs font-bold tracking-wider text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                  >
                    {loc.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <Container className="mx-auto text-center">
          <div className="mx-auto max-w-3xl border border-[#e3e8ee] bg-[#f6f9fc] p-10 md:p-14">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} READY TO REPLACE DISCONNECTED TOOLS?</MeshInk>
            </div>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-5xl">
              Tell us what is slowing your team down.
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-sans text-base font-medium text-[#425466] md:text-lg">
              We will map your current bottleneck, show you what a unified system looks like, and give you a clear roadmap and timeline.
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
