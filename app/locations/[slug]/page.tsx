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
  buildLocationSchema,
} from "@/components/seo/json-ld";
import BgFrame from "@/components/watermelon/templates/landing-01/landing/bg-frame";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { caseStudiesData } from "@/lib/case-studies";
import {
  flatServiceLocations,
  getLocationBySlug,
  serviceLocations,
} from "@/lib/locations";
import { servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return flatServiceLocations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return {
    title: location.seoTitle,
    description: location.seoDescription,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
    openGraph: {
      title: `${location.seoTitle} | ${siteConfig.name}`,
      description: location.seoDescription,
      url: `${siteConfig.url}/locations/${location.slug}`,
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.fullLabel, path: `/locations/${location.slug}` },
  ];

  const featuredStudies = caseStudiesData.filter((study) =>
    location.featuredCaseStudies.includes(study.slug),
  );

  const otherLocations = flatServiceLocations.filter(
    (loc) => loc.slug !== location.slug,
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildLocationSchema({
            city: location.city,
            state: location.state,
            slug: location.slug,
            description: location.seoDescription,
          }),
          buildFaqSchema(location.faqs),
        ]}
      />
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={location.regionTag}
        headline={`Custom Software, CRM & AI Automation in ${location.city},`}
        highlightWord={location.abbreviation}
        leadBold={location.summary}
        leadBody={location.localContext}
        primaryCta={{
          text: `Start a ${location.city} Project`,
          href: "/contact",
        }}
        secondaryCta={{ text: "Explore All Services", href: "/services" }}
      />

      {/* Regional Pain Points We Solve */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>
                  {"//"} PAIN POINTS WE SOLVE IN {location.label}
                </MeshInk>
              </div>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Operational bottlenecks holding{" "}
                <span className="text-brand">
                  <MeshInk>{location.city}</MeshInk>
                </span>{" "}
                teams back
              </Heading>
            </div>

            <div className="border border-[#e3e8ee] bg-white p-6 lg:col-span-5">
              <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} INDUSTRIES SERVED IN {location.label}</MeshInk>
              </div>
              <ul className="space-y-2.5">
                {location.industriesServed.map((industry) => (
                  <li
                    key={industry}
                    className="flex items-start gap-2.5 font-sans text-sm font-semibold text-[#0a2540]"
                  >
                    <span className="text-primary font-mono text-xs font-bold">
                      +
                    </span>
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FadeInSection className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {location.painPoints.map((pain, idx) => (
              <FadeInItem
                key={pain.title}
                className="relative border border-[#e3e8ee] bg-white p-8 shadow-[0_2px_8px_rgba(10,37,64,0.04)]"
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

                <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>BOTTLENECK // 0{idx + 1}</MeshInk>
                </div>
                <h3 className="mb-3 font-sans text-xl font-bold text-[#0a2540]">
                  {pain.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#425466]">
                  {pain.description}
                </p>
              </FadeInItem>
            ))}
          </FadeInSection>
        </Container>
      </section>

      {/* Capabilities Available in this City */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 max-w-3xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} WHAT WE BUILD FOR {location.label} COMPANIES</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Capabilities available in{" "}
              <span className="text-brand">
                <MeshInk>{location.city}</MeshInk>
              </span>
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col justify-between border border-[#e3e8ee] bg-[#f6f9fc] p-8 transition-all hover:border-[#635bff] hover:bg-white"
              >
                <div>
                  <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                    <MeshInk>CAPABILITY // {service.number}</MeshInk>
                  </div>
                  <h3 className="mb-3 font-sans text-xl font-bold text-[#0a2540] group-hover:text-[#635bff]">
                    {service.title}
                  </h3>
                  <p className="mb-6 font-sans text-sm leading-relaxed text-[#425466]">
                    {service.summary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 border-t border-[#e3e8ee] pt-4 text-xs font-bold tracking-widest text-[#0a2540] uppercase group-hover:text-[#635bff]">
                  Explore {service.shortTitle}{" "}
                  <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Case Studies */}
      <section className="relative border-b border-[#e3e8ee] bg-[#f6f9fc] py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                <MeshInk>{"//"} SHIPPED PLATFORMS</MeshInk>
              </div>
              <Heading
                as="h2"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Examples of systems we{" "}
                <span className="text-brand">
                  <MeshInk>engineer</MeshInk>
                </span>
              </Heading>
            </div>
            <Link
              href="/work"
              className="inline-flex w-fit items-center gap-2 border border-[#e3e8ee] bg-white px-5 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
            >
              View All Work <ArrowUpRight01Icon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col justify-between border border-[#e3e8ee] bg-white p-6 transition-all hover:border-[#635bff]/50"
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
                  Read Case Study <ArrowUpRight01Icon className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* City FAQs */}
      <section className="relative border-b border-[#e3e8ee] bg-white py-20 md:py-28">
        <Container className="relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} {location.label} FAQ</MeshInk>
            </div>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground mb-12 font-sans text-balance"
            >
              Working with Studio Sozo in{" "}
              <span className="text-brand">
                <MeshInk>{location.city}</MeshInk>
              </span>
            </Heading>

            <div className="space-y-4">
              {location.faqs.map((faq, idx) => (
                <div
                  key={faq.question}
                  className="border border-[#e3e8ee] bg-[#f6f9fc] p-6 md:p-8"
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

            <p className="mt-8 border border-[#e3e8ee] bg-[#f6f9fc] p-4 text-xs tracking-wider text-[#6b7c93] uppercase">
              {serviceLocations.disclaimer}
            </p>
          </div>
        </Container>
      </section>

      {/* Other Service Locations + CTA */}
      <section className="bg-[#f6f9fc] py-20">
        <Container className="mx-auto">
          <div className="mb-12">
            <div className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} OTHER SERVICE LOCATIONS</MeshInk>
            </div>
            <div className="flex flex-wrap gap-2">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="border border-[#e3e8ee] bg-white px-4 py-2 text-xs font-bold tracking-wider text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                >
                  {loc.fullLabel}
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#e3e8ee] bg-white p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} DISCUSS YOUR {location.city} PROJECT</MeshInk>
                </div>
                <h2 className="font-sans text-2xl font-bold text-[#0a2540] md:text-4xl">
                  Ready to replace disconnected software in {location.fullLabel}?
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-[#425466] md:text-base">
                  Tell us what operational bottleneck you want to solve and we will map a clear custom architecture for your team.
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
