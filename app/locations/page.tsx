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
import { flatServiceLocations, serviceLocations } from "@/lib/locations";
import { servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Service Locations | Custom Software Development in Louisiana, Texas & Missouri",
  description:
    "Studio Sozo serves businesses across Shreveport & Benton (LA), Austin, Marble Falls, Longview, Hughes Springs & Commerce (TX), Kansas City (MO), and remote nationwide.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: `Service Areas & Regional Coverage | ${siteConfig.name}`,
    description:
      "Custom software development, CRM platforms, and AI workflow automation across Louisiana, Texas, Missouri, and remote nationwide.",
    url: `${siteConfig.url}/locations`,
  },
};

export default function LocationsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Service Locations", path: "/locations" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="REGIONAL COVERAGE // LA • TX • MO • REMOTE US"
        headline="Custom Software Engineering Where You"
        highlightWord="Operate"
        leadBold="We partner with businesses across Louisiana, Texas, and Missouri—plus remote teams nationwide—"
        leadBody="to replace manual spreadsheets and disconnected SaaS tools with custom CRMs, AI automations, and web/mobile platforms you own outright."
        primaryCta={{ text: "Discuss Your Project", href: "/contact" }}
        secondaryCta={{ text: "Explore Services", href: "/services" }}
      />

      {/* State & City Directory */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 max-w-3xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} 08 REGIONAL SERVICE MARKETS + NATIONWIDE REMOTE</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Select your <span className="text-brand"><MeshInk>service area</MeshInk></span>
            </Heading>
            <p className="mt-4 font-sans text-base font-medium text-[#425466]">
              {serviceLocations.disclaimer}
            </p>
          </div>

          <div className="space-y-12">
            {serviceLocations.states.map((stateGroup) => {
              const citiesInState = flatServiceLocations.filter(
                (loc) => loc.state === stateGroup.state,
              );

              return (
                <div key={stateGroup.state}>
                  <div className="mb-6 flex items-center justify-between border-b border-[#e3e8ee] pb-3">
                    <h3 className="font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
                      {stateGroup.state} ({stateGroup.abbreviation})
                    </h3>
                    <span className="text-xs font-bold tracking-widest text-[#6b7c93] uppercase">
                      {citiesInState.length}{" "}
                      {citiesInState.length === 1
                        ? "Service Market"
                        : "Service Markets"}
                    </span>
                  </div>

                  <FadeInSection className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {citiesInState.map((loc) => (
                      <FadeInItem key={loc.slug} className="h-full">
                        <Link
                          href={`/locations/${loc.slug}`}
                          className="group relative flex h-full flex-col justify-between border border-[#e3e8ee] bg-white p-8 transition-all hover:border-[#635bff]/50"
                        >
                        <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                        <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                        <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                        <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                        <div>
                          <div className="text-brand mb-2 text-[11px] font-bold tracking-widest uppercase">
                            <MeshInk>{loc.regionTag}</MeshInk>
                          </div>
                          <h4 className="mb-3 font-sans text-2xl font-bold text-[#0a2540] group-hover:text-[#635bff]">
                            {loc.fullLabel}
                          </h4>
                          <p className="mb-6 font-sans text-sm leading-relaxed text-[#425466]">
                            {loc.summary}
                          </p>
                        </div>

                        <div>
                          <div className="mb-4 flex flex-wrap gap-1.5 border-t border-[#e3e8ee] pt-4">
                            {loc.industriesServed.slice(0, 2).map((ind) => (
                              <span
                                key={ind}
                                className="border border-[#e3e8ee] bg-[#f6f9fc] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#425466] uppercase"
                              >
                                {ind}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-[#0a2540] uppercase group-hover:text-[#635bff]">
                            Explore {loc.city} Services{" "}
                            <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        </Link>
                      </FadeInItem>
                    ))}
                  </FadeInSection>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Capabilities Available in Every Market */}
      <section className="bg-white py-20 md:py-28">
        <Container className="mx-auto">
          <div className="mb-12 max-w-3xl">
            <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} FULL CAPABILITIES IN EVERY REGION</MeshInk>
            </div>
            <h2 className="font-sans text-3xl font-bold text-[#0a2540] md:text-4xl">
              What we build for regional &amp; nationwide clients
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border border-[#e3e8ee] bg-[#f6f9fc] p-6 transition-all hover:border-[#635bff] hover:bg-white"
              >
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>CAPABILITY // {service.number}</MeshInk>
                </div>
                <h3 className="mb-2 font-sans text-xl font-bold text-[#0a2540] group-hover:text-[#635bff]">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-[#425466]">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14 border border-[#e3e8ee] bg-[#f6f9fc] p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} NATIONWIDE REMOTE COLLABORATION</MeshInk>
                </div>
                <h3 className="font-sans text-2xl font-bold text-[#0a2540] md:text-3xl">
                  Outside Louisiana, Texas, or Missouri?
                </h3>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  We partner with businesses across the United States through structured weekly build sprints, live staging environments, and direct engineer communication.
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
