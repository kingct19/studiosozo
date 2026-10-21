import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { PageHeader } from "@/components/page-header";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import { JsonLd, buildBreadcrumbSchema } from "@/components/seo/json-ld";
import BgFrame from "@/components/watermelon/templates/landing-01/landing/bg-frame";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { caseStudiesData } from "@/lib/case-studies";
import { servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Case Studies & Shipped Systems | Custom CRM, AI & Web Platforms",
  description:
    "Explore real custom software platforms, solar & field-service CRMs, AI mobile apps, and booking engines engineered by Studio Sozo.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Case Studies & Shipped Systems | ${siteConfig.name}`,
    description:
      "See how Studio Sozo solves real operational bottlenecks with custom CRMs, AI mobile platforms, and booking applications.",
    url: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Work & Case Studies", path: "/work" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="PROVEN IN PRODUCTION // CASE STUDIES"
        headline="Real Operational Systems We Have"
        highlightWord="Shipped"
        leadBold="Every platform below started with a concrete business pain point—"
        leadBody="from fragmented solar sales pipelines and manual phone reservations to scattered field data. Explore how we engineered each custom solution."
        primaryCta={{ text: "Discuss Your Project", href: "/contact" }}
        secondaryCta={{ text: "Explore Capabilities", href: "/services" }}
      />

      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <FadeInSection className="space-y-12">
            {caseStudiesData.map((study, index) => {
              const matchedServices = servicesData.filter((s) =>
                study.serviceSlugs.includes(s.slug),
              );

              return (
                <FadeInItem
                  key={study.slug}
                  className="relative grid grid-cols-1 gap-8 border border-[#e3e8ee] bg-white p-6 shadow-[0_2px_8px_rgba(10,37,64,0.04)] md:p-10 lg:grid-cols-12 lg:items-center"
                >
                  <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                  <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                  <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                  <div className="lg:col-span-6">
                    <Link href={`/work/${study.slug}`} className="block">
                      <BgFrame imageUrl={study.image} alt={study.title} />
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between lg:col-span-6">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-brand text-xs font-bold tracking-widest uppercase">
                          <MeshInk>
                            CASE STUDY // 0{index + 1} — {study.industry}
                          </MeshInk>
                        </span>
                      </div>

                      <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-4xl">
                        <Link
                          href={`/work/${study.slug}`}
                          className="transition-colors hover:text-[#635bff]"
                        >
                          {study.title}
                        </Link>
                      </h2>

                      <p className="mb-6 font-sans text-base leading-relaxed text-[#425466]">
                        {study.summary}
                      </p>

                      <div className="mb-6 border-l-2 border-[#635bff] bg-[#f6f9fc] p-4">
                        <span className="block text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                          PAIN POINT SOLVED:
                        </span>
                        <p className="mt-1 font-sans text-sm font-bold text-[#0a2540]">
                          {study.painPointTitle}
                        </p>
                      </div>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {matchedServices.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="border border-[#e3e8ee] bg-[#0a2540]/3 px-3 py-1 text-[10px] font-bold tracking-wider text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                          >
                            {s.shortTitle}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e3e8ee] pt-5">
                      <div className="flex gap-6">
                        {study.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-mono text-lg font-bold text-[#0a2540]">
                              {m.value}
                            </div>
                            <div className="text-[10px] tracking-wider text-[#6b7c93] uppercase">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/work/${study.slug}`}
                        className="inline-flex items-center gap-2 border border-[#0a2540] bg-[#0a2540] px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#635bff] hover:border-[#635bff]"
                      >
                        Read Case Study{" "}
                        <ArrowUpRight01Icon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInSection>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="mx-auto text-center">
          <div className="mx-auto max-w-3xl border border-[#e3e8ee] bg-[#f6f9fc] p-10 md:p-14">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} YOUR SYSTEM NEXT</MeshInk>
            </div>
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-[#0a2540] md:text-5xl">
              Have a similar operational bottleneck?
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-sans text-base font-medium text-[#425466] md:text-lg">
              Tell us what tools your team is fighting today and we will show you how a custom platform can replace them.
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
