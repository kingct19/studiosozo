import type { Metadata } from "next";
import Link from "next/link";

import { MeshInk } from "@/components/brand-mesh";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { FadeInItem, FadeInSection } from "@/components/page-motion";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { flatServiceLocations, serviceLocations } from "@/lib/locations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Discuss Your Project",
  description:
    "Start a conversation with Studio Sozo about custom software development, custom CRM systems, AI automation, web applications, mobile apps, or systems integration.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Discuss Your Project | ${siteConfig.name}`,
    description:
      "Tell Studio Sozo about the software, CRM, or workflow automation your business needs.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0a2540] font-mono">
      <Navbar />
      <section className="relative bg-white pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />

        <Container className="relative z-10 mx-auto">
          <FadeInSection className="mb-14 flex flex-col items-start text-left md:items-center md:text-center">
            <FadeInItem className="text-brand mb-6 text-xs font-bold tracking-widest uppercase">
              <MeshInk>
                <span className="mr-3 opacity-70">{"//"}</span>
                PROJECT INQUIRY
              </MeshInk>
            </FadeInItem>
            <FadeInItem>
              <Heading
                as="h1"
                variant="big"
                className="text-foreground font-sans text-balance"
              >
                Discuss Your <span className="text-brand"><MeshInk>Project</MeshInk></span>
              </Heading>
            </FadeInItem>
            <FadeInItem>
              <p className="mt-6 max-w-3xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa] md:text-2xl">
                <span className="text-[#0a2540]">
                  Tell us about the disconnected tools you want to replace.
                </span>{" "}
                The workflows you want to automate, or the custom platform your
                business needs to build.
              </p>
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            <FadeInItem className="lg:col-span-2">
              <ContactInquiryForm />
            </FadeInItem>

            <FadeInItem className="flex flex-col gap-6">
              <div className="relative border border-[#e3e8ee] bg-white p-6 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />
                <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} CAPABILITIES</MeshInk>
                </div>
                <ul className="space-y-3 text-xs tracking-wider text-[#0a2540]/80 uppercase">
                  {siteConfig.services.map((service) => (
                    <li key={service.slug} className="border-b border-[#e3e8ee] pb-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="transition-colors hover:text-[#635bff]"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative border border-[#e3e8ee] bg-white p-6 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
                <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
                <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />
                <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
                  <MeshInk>{"//"} SERVICE AREAS</MeshInk>
                </div>
                <div className="space-y-4 text-xs tracking-wider uppercase">
                  {serviceLocations.states.map((group) => {
                    const stateCities = flatServiceLocations.filter(
                      (l) => l.state === group.state,
                    );
                    return (
                      <div key={group.state}>
                        <p className="font-bold text-[#0a2540]">{group.state}</p>
                        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[#425466]">
                          {stateCities.map((loc, idx) => (
                            <span key={loc.slug}>
                              <Link
                                href={`/locations/${loc.slug}`}
                                className="transition-colors hover:text-[#635bff]"
                              >
                                {loc.city}
                              </Link>
                              {idx < stateCities.length - 1 ? "," : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <p className="font-bold text-[#0a2540]">Remote</p>
                    <p className="mt-1 text-[#425466]">
                      Remote collaboration with businesses nationwide
                    </p>
                  </div>
                  <p className="border-t border-[#e3e8ee] pt-4 text-[11px] leading-relaxed text-[#6b7c93]">
                    {serviceLocations.disclaimer}
                  </p>
                </div>
              </div>
            </FadeInItem>
          </FadeInSection>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
