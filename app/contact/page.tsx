import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, Mail01Icon } from "hugeicons-react";

import { MeshInk } from "@/components/brand-mesh";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { LitUpButton } from "@/components/lit-up-button";
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

          <FadeInSection className="mx-auto max-w-6xl">
            <FadeInItem>
              <ContactInquiryForm />
            </FadeInItem>
          </FadeInSection>

          <FadeInSection className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-2">
            <FadeInItem>
              <div className="relative h-full border border-[#e3e8ee] bg-white p-6 backdrop-blur-md">
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
            </FadeInItem>

            <FadeInItem>
              <div className="relative h-full border border-[#e3e8ee] bg-white p-6 backdrop-blur-md">
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

          {/* Direct Founder Contact Section */}
          <FadeInSection className="mx-auto mt-16 max-w-6xl">
            <FadeInItem>
              <div className="relative border border-[#e3e8ee] bg-[#f8fafc] p-8 shadow-[0_2px_12px_rgba(10,37,64,0.04)] md:p-12">
                <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-[#635bff]/50" />
                <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-[#635bff]/50" />
                <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[#635bff]/50" />
                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b border-[#635bff]/50" />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="text-brand mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      <span className="h-2 w-2 rounded-full bg-[#635bff]" />
                      <MeshInk>{"//"} DIRECT FOUNDER ACCESS</MeshInk>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[#e3e8ee] bg-white shadow-[0_2px_8px_rgba(10,37,64,0.08)] sm:h-24 sm:w-24">
                        <Image
                          src={siteConfig.founder.avatar}
                          alt={siteConfig.founder.name}
                          fill
                          sizes="96px"
                          className="object-cover object-[50%_38%] grayscale contrast-105"
                        />
                      </div>
                      <div>
                        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#0a2540] md:text-3xl">
                          {siteConfig.founder.name}
                        </h2>
                        <p className="mt-1 text-xs font-bold tracking-widest text-[#635bff] uppercase">
                          {siteConfig.founder.role} &bull; {siteConfig.name}
                        </p>
                      </div>
                    </div>

                    <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#425466]">
                      When you work with Studio Sozo, there are no layers of
                      non-technical account managers or handoffs. You work
                      directly with me from initial architecture and workflow
                      discovery through weekly staging releases and 100%
                      repository handover.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-bold tracking-wider text-[#425466] uppercase">
                      <span className="border border-[#e3e8ee] bg-white px-3 py-1.5">
                        Direct Architecture Review
                      </span>
                      <span className="border border-[#e3e8ee] bg-white px-3 py-1.5">
                        No Account Manager Layers
                      </span>
                      <span className="border border-[#e3e8ee] bg-white px-3 py-1.5">
                        100% Owned Software
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6 border-t border-[#e3e8ee] pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    <div>
                      <div className="text-brand mb-2 text-xs font-bold tracking-widest uppercase">
                        <MeshInk>{"//"} PREFER DIRECT EMAIL?</MeshInk>
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-[#425466]">
                        Skip the form and email me directly with your project
                        goals, current tool stack, or questions.
                      </p>

                      <a
                        href={`mailto:${siteConfig.founder.email}?subject=Project%20Inquiry%20%E2%80%94%20Studio%20Sozo`}
                        className="mt-4 flex items-center justify-between gap-3 border border-[#e3e8ee] bg-white px-4 py-3.5 font-mono text-xs font-bold tracking-wider text-[#0a2540] transition-colors hover:border-[#635bff] hover:text-[#635bff] sm:text-sm"
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          <Mail01Icon className="h-4 w-4 shrink-0 text-[#635bff]" />
                          <span className="truncate">
                            {siteConfig.founder.email}
                          </span>
                        </span>
                        <ArrowUpRight01Icon className="h-4 w-4 shrink-0" />
                      </a>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <LitUpButton
                        href={`mailto:${siteConfig.founder.email}?subject=Project%20Inquiry%20%E2%80%94%20Studio%20Sozo`}
                        className="w-full justify-center font-mono text-xs font-bold tracking-widest uppercase sm:w-auto"
                      >
                        Email Chandler Directly
                        <ArrowUpRight01Icon className="h-4 w-4" />
                      </LitUpButton>
                    </div>
                  </div>
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
