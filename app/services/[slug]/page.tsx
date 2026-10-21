import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/components/seo/json-ld";
import BgFrame from "@/components/watermelon/templates/landing-01/landing/bg-frame";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { caseStudiesData } from "@/lib/case-studies";
import { flatServiceLocations } from "@/lib/locations";
import { getServiceBySlug, servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.seoTitle} | ${siteConfig.name}`,
      description: service.seoDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  const relatedStudies = caseStudiesData.filter((study) =>
    service.relatedCaseStudies.includes(study.slug),
  );

  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildServiceSchema({
            name: service.title,
            description: service.seoDescription,
            slug: service.slug,
          }),
          buildFaqSchema(service.faqs),
        ]}
      />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={service.eyebrow}
        headline={service.headline}
        highlightWord={service.highlightWord}
        leadBold={service.leadBold}
        leadBody={service.leadBody}
        primaryCta={{ text: "Discuss Your Project", href: "/contact" }}
        secondaryCta={{ text: "See All Services", href: "/services" }}
      />

      {/* Pain Points We Eliminate */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <FadeInItem className="lg:col-span-7">
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} PAIN POINTS WE ELIMINATE</MeshInk>
              </div>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Why off-the-shelf tools fail at{" "}
                <span className="text-brand">
                  <MeshInk>{service.shortTitle}</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
            <FadeInItem className="border border-[#e3e8ee] bg-white p-6 lg:col-span-5">
              <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} BUILT FOR TEAMS THAT:</MeshInk>
              </div>
              <ul className="space-y-2.5">
                {service.idealFor.map((item) => (
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
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {service.painPoints.map((pain) => (
              <FadeInItem
                key={pain.code}
                className="relative flex flex-col justify-between border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)]"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div>
                  <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                    <MeshInk>{pain.code}</MeshInk>
                  </div>
                  <h3 className="mb-4 font-sans text-xl font-bold text-[#0a2540]">
                    {pain.title}
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-[#425466]">
                    {pain.symptom}
                  </p>
                </div>

                <div className="border-t border-[#e3e8ee] pt-4">
                  <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                    ROOT CAUSE:
                  </span>
                  <p className="mt-1 font-sans text-xs font-semibold text-[#0a2540]">
                    {pain.rootCause}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Before vs After Workflow Comparison */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} WORKFLOW TRANSFORMATION</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                From fragmented busywork to one{" "}
                <span className="text-brand">
                  <MeshInk>unified flow</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Before */}
            <FadeInItem className="border border-[#e3e8ee] bg-[#f6f9fc] p-8 md:p-10">
              <div className="mb-6 inline-block border border-[#e3e8ee] bg-white px-3 py-1 text-xs font-bold tracking-widest text-[#6b7c93] uppercase">
                {service.comparison.beforeTitle}
              </div>
              <ol className="space-y-4">
                {service.comparison.beforeSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 border-b border-[#e3e8ee] pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="border border-[#e3e8ee] bg-white px-2 py-0.5 text-xs font-bold text-[#6b7c93]">
                      0{i + 1}
                    </span>
                    <span className="font-sans text-sm font-medium text-[#425466] md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </FadeInItem>

            {/* After */}
            <FadeInItem className="relative border border-[#635bff]/40 bg-white p-8 shadow-[0_12px_32px_rgba(10,37,64,0.06)] md:p-10">
              <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[#635bff]" />
              <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-[#635bff]" />
              <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[#635bff]" />
              <div className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-[#635bff]" />

              <div className="text-brand mb-6 inline-block border border-[#635bff]/30 bg-[#635bff]/8 px-3 py-1 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{service.comparison.afterTitle}</MeshInk>
              </div>
              <ol className="space-y-4">
                {service.comparison.afterSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 border-b border-[#e3e8ee] pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="border border-[#635bff]/30 bg-[#635bff]/10 px-2 py-0.5 text-xs font-bold text-[#635bff]">
                      0{i + 1}
                    </span>
                    <span className="font-sans text-sm font-bold text-[#0a2540] md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </FadeInItem>
          </FadeInSection>
        </Container>
      </section>

      {/* Deliverables & Architecture */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} WHAT WE ENGINEER &amp; DELIVER</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Production deliverables you{" "}
                <span className="text-brand">
                  <MeshInk>own 100%</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.deliverables.map((del) => (
              <FadeInItem
                key={del.title}
                className="relative border border-[#e3e8ee] bg-white p-8"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>[ {del.tag} ]</MeshInk>
                </div>
                <h3 className="mb-3 font-sans text-xl font-bold text-[#0a2540]">
                  {del.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#425466]">
                  {del.description}
                </p>
              </FadeInItem>
            ))}
          </FadeInSection>

          <div className="mt-8 border border-[#e3e8ee] bg-white p-8">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} TECHNICAL STANDARDS &amp; OWNERSHIP GUARANTEES</MeshInk>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.architectureHighlights.map((item) => (
                <div
                  key={item}
                  className="border border-[#e3e8ee] bg-[#f6f9fc] p-4 font-sans text-xs font-bold leading-relaxed text-[#0a2540]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related Case Studies */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} PROOF OF EXECUTION</MeshInk>
              </div>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Systems shipped with this{" "}
                <span className="text-brand">
                  <MeshInk>capability</MeshInk>
                </span>
              </Heading>
            </div>
            <Link
              href="/work"
              className="inline-flex w-fit items-center gap-2 border border-[#e3e8ee] px-5 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
            >
              All Case Studies <ArrowUpRight01Icon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {relatedStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col justify-between border border-[#e3e8ee] bg-[#f6f9fc] p-6 transition-all hover:border-[#635bff]/50 hover:bg-white"
              >
                <div>
                  <div className="mb-5">
                    <BgFrame imageUrl={study.image} alt={study.title} />
                  </div>
                  <div className="text-brand mb-2 text-[11px] font-bold tracking-widest uppercase">
                    <MeshInk>{study.industry}</MeshInk>
                  </div>
                  <h3 className="mb-2 font-sans text-2xl font-bold text-[#0a2540] group-hover:text-[#635bff]">
                    {study.title}
                  </h3>
                  <p className="mb-4 font-sans text-sm leading-relaxed text-[#425466]">
                    {study.summary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 border-t border-[#e3e8ee] pt-4 text-xs font-bold tracking-widest text-[#0a2540] uppercase group-hover:text-[#635bff]">
                  View Case Study <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} FREQUENTLY ASKED QUESTIONS</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground mb-12 font-sans text-balance"
            >
              Questions about{" "}
              <span className="text-brand">
                <MeshInk>{service.shortTitle}</MeshInk>
              </span>
            </Heading>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
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

      {/* Cross-links to other capabilities & regional locations */}
      <section className="bg-white py-20">
        <Container className="mx-auto">
          <div className="mb-12">
            <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} EXPLORE OTHER CAPABILITIES</MeshInk>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="border border-[#e3e8ee] bg-[#f6f9fc] p-4 transition-colors hover:border-[#635bff] hover:bg-white"
                >
                  <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                    CAPABILITY // {s.number}
                  </span>
                  <span className="mt-1 block font-sans text-sm font-bold text-[#0a2540]">
                    {s.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#e3e8ee] bg-[#f6f9fc] p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} START YOUR PROJECT</MeshInk>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0a2540] md:text-4xl">
                  Ready to build your {service.shortTitle.toLowerCase()} platform?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  Available for businesses across{" "}
                  {flatServiceLocations.map((l) => l.label).join(", ")}, and
                  remote nationwide.
                </p>
              </div>
              <LitUpButton
                href="/contact"
                className="w-fit shrink-0 text-xs font-bold tracking-widest uppercase"
              >
                Discuss Your Project <ArrowUpRight01Icon className="h-4 w-4" />
              </LitUpButton>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
