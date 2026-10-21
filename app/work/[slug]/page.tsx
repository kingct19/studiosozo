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
  buildCaseStudySchema,
} from "@/components/seo/json-ld";
import BgFrame from "@/components/watermelon/templates/landing-01/landing/bg-frame";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { caseStudiesData, getCaseStudyBySlug } from "@/lib/case-studies";
import { servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: {
      canonical: `/work/${study.slug}`,
    },
    openGraph: {
      title: `${study.seoTitle} | ${siteConfig.name}`,
      description: study.seoDescription,
      url: `${siteConfig.url}/work/${study.slug}`,
      images: [{ url: study.image, alt: study.title }],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Work & Case Studies", path: "/work" },
    { name: study.title, path: `/work/${study.slug}` },
  ];

  const matchedServices = servicesData.filter((s) =>
    study.serviceSlugs.includes(s.slug),
  );
  const otherStudies = caseStudiesData.filter((s) => s.slug !== study.slug);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildCaseStudySchema({
            title: study.title,
            description: study.seoDescription,
            slug: study.slug,
            image: study.image,
            industry: study.industry,
          }),
        ]}
      />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={`CASE STUDY // ${study.industry}`}
        headline={study.headline}
        highlightWord={study.highlightWord}
        leadBold={`${study.title} (${study.clientType}) —`}
        leadBody={study.summary}
        primaryCta={{ text: "Build a Similar System", href: "/contact" }}
        secondaryCta={{ text: "All Case Studies", href: "/work" }}
      />

      {/* Visual Showcase + Metrics */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-16 md:py-24">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mx-auto max-w-5xl">
            <FadeInItem className="mb-4 flex items-center justify-between border border-[#e3e8ee] bg-white px-4 py-2.5 text-xs font-bold tracking-widest text-[#425466] uppercase">
              <span>{study.badgeUrl}</span>
              <span className="text-brand">
                <MeshInk>SHIPPED BY STUDIO SOZO</MeshInk>
              </span>
            </FadeInItem>

            <FadeInItem>
              <BgFrame imageUrl={study.image} alt={study.title} />
            </FadeInItem>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {study.metrics.map((metric) => (
                <FadeInItem
                  key={metric.label}
                  className="relative border border-[#e3e8ee] bg-white p-6 text-center"
                >
                  <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                  <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                  <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                  <div className="text-brand font-mono text-3xl font-bold">
                    <MeshInk>{metric.value}</MeshInk>
                  </div>
                  <div className="mt-1 text-xs font-bold tracking-widest text-[#6b7c93] uppercase">
                    {metric.label}
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* The Operational Pain Point vs Solution */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Pain Point */}
            <FadeInItem className="border border-[#e3e8ee] bg-[#f6f9fc] p-8 md:p-10">
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} 01 — THE OPERATIONAL PAIN POINT</MeshInk>
              </div>
              <h2 className="mb-4 font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
                {study.painPointTitle}
              </h2>
              <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                {study.painPointSummary}
              </p>
              <ul className="space-y-3 border-t border-[#e3e8ee] pt-6">
                {study.painPoints.map((point, i) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-sans text-sm font-medium text-[#0a2540]"
                  >
                    <span className="border border-[#e3e8ee] bg-white px-2 py-0.5 font-mono text-xs font-bold text-[#6b7c93]">
                      0{i + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </FadeInItem>

            {/* Engineered Solution */}
            <FadeInItem className="relative border border-[#635bff]/40 bg-white p-8 shadow-[0_12px_32px_rgba(10,37,64,0.06)] md:p-10">
              <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[#635bff]" />
              <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-[#635bff]" />
              <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[#635bff]" />
              <div className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-[#635bff]" />

              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} 02 — THE STUDIO SOZO SOLUTION</MeshInk>
              </div>
              <h2 className="mb-4 font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
                {study.solutionTitle}
              </h2>
              <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                {study.solutionSummary}
              </p>

              <div className="border-t border-[#e3e8ee] pt-6">
                <div className="mb-3 text-xs font-bold tracking-widest text-[#6b7c93] uppercase">
                  Capabilities Used in This Build:
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchedServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 border border-[#e3e8ee] bg-[#f6f9fc] px-3.5 py-2 text-xs font-bold tracking-wider text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                    >
                      {service.title}
                      <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInItem>
          </FadeInSection>
        </Container>
      </section>

      {/* Capabilities Delivered */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 max-w-3xl">
            <FadeInItem className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} SYSTEM ARCHITECTURE &amp; MODULES</MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                What we engineered inside{" "}
                <span className="text-brand">
                  <MeshInk>{study.title}</MeshInk>
                </span>
              </Heading>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {study.capabilitiesDelivered.map((feature) => (
              <FadeInItem
                key={feature.title}
                className="relative border border-[#e3e8ee] bg-white p-8"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>[ {feature.tag} ]</MeshInk>
                </div>
                <h3 className="mb-3 font-sans text-xl font-bold text-[#0a2540]">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#425466]">
                  {feature.description}
                </p>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Other Case Studies + CTA */}
      <section className="bg-white py-20">
        <Container className="mx-auto">
          <div className="mb-12">
            <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} MORE SHIPPED SYSTEMS</MeshInk>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {otherStudies.map((s) => (
                <Link
                  key={s.slug}
                  href={`/work/${s.slug}`}
                  className="border border-[#e3e8ee] bg-[#f6f9fc] p-4 transition-colors hover:border-[#635bff] hover:bg-white"
                >
                  <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                    {s.industry}
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
                  <MeshInk>{"//"} BUILD YOUR OWN PLATFORM</MeshInk>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0a2540] md:text-4xl">
                  Want a system like {study.title} tailored to your business?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  Let&apos;s map your workflow and design a custom platform you own 100%.
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
