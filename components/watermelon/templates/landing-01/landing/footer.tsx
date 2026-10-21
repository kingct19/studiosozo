import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { serviceLocations } from "@/lib/locations";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import { siteConfig } from "@/lib/site";

function Crosshair({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <div
      className={cn(
        "pointer-events-none absolute h-8 w-8",
        isTop ? "top-0" : "bottom-0",
        isLeft ? "left-0" : "right-0",
      )}
    >
      <div
        className={cn(
          "absolute h-full w-px bg-[#0a2540]/8",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-4" : "right-4",
        )}
      />
      <div
        className={cn(
          "absolute h-px w-full bg-[#0a2540]/8",
          isTop ? "top-4" : "bottom-4",
          isLeft ? "left-0" : "right-0",
        )}
      />
    </div>
  );
}

function FooterLinkColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-brand mb-2 font-mono text-xs tracking-widest">
        <MeshInk>
          <span className="opacity-70">{"//"}</span> {title}
        </MeshInk>
      </div>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-[#425466] transition-colors hover:text-[#0a2540]"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative mt-24 overflow-hidden border-t border-[#e3e8ee] font-mono">
      {/* Decorative Technical Crosshairs at the very edges */}
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:px-8 lg:px-12 xl:px-16">
        {/* Top Grid */}
        <div className="relative grid grid-cols-1 gap-12 border-b border-[#e3e8ee] pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Left Side: Brand & CTA (span 5) */}
          <div className="flex flex-col items-start pr-0 lg:col-span-5 lg:pr-8">
            <div className="text-brand mb-6 font-mono text-xs tracking-widest">
              <MeshInk>
                <span className="opacity-70">{"//"}</span> {siteConfig.wordmark}
              </MeshInk>
            </div>
            <h3 className="mb-6 max-w-xl font-sans text-3xl font-bold tracking-tight text-balance text-[#8898aa] md:text-5xl">
              <span className="text-[#0a2540]">Your business is unique.</span>{" "}
              Your software should be too.
            </h3>
            <p className="mb-8 max-w-xl text-pretty font-sans text-xl font-bold leading-snug tracking-tight text-[#8898aa]">
              <span className="text-[#0a2540]">
                We design and build custom software that replaces disconnected
                tools.
              </span>{" "}
              It automates workflows and gives your business greater control
              over its technology.
            </p>

            <LitUpButton
              href={siteConfig.ctas.primary.url}
              className="w-fit text-xs font-bold tracking-widest uppercase active:scale-[0.96]"
            >
              {siteConfig.ctas.primary.text}{" "}
              <ArrowUpRight01Icon className="h-4 w-4" />
            </LitUpButton>
          </div>

          {/* Right Side: Links (span 7) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7 lg:pl-8">
            <FooterLinkColumn title="SERVICES">
              {siteConfig.services.map((service) => (
                <FooterLink
                  key={service.slug}
                  href={`/services/${service.slug}`}
                >
                  {service.title}
                </FooterLink>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="LOUISIANA & MO">
              <FooterLink href="/locations/shreveport-la">
                Shreveport, LA
              </FooterLink>
              <FooterLink href="/locations/benton-la">Benton, LA</FooterLink>
              <FooterLink href="/locations/kansas-city-mo">
                Kansas City, MO
              </FooterLink>
              <FooterLink href="/locations">Remote (US)</FooterLink>
            </FooterLinkColumn>

            <FooterLinkColumn title="TEXAS">
              <FooterLink href="/locations/marble-falls-tx">
                Marble Falls, TX
              </FooterLink>
              <FooterLink href="/locations/austin-tx">Austin, TX</FooterLink>
              <FooterLink href="/locations/hughes-springs-tx">
                Hughes Springs, TX
              </FooterLink>
              <FooterLink href="/locations/longview-tx">
                Longview, TX
              </FooterLink>
              <FooterLink href="/locations/commerce-tx">
                Commerce, TX
              </FooterLink>
            </FooterLinkColumn>

            <FooterLinkColumn title="NAVIGATION">
              <FooterLink href="/services">All Services</FooterLink>
              <FooterLink href="/work">Case Studies</FooterLink>
              <FooterLink href="/process">Process</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/locations">Service Areas</FooterLink>
              <FooterLink href="/contact">Project Inquiry</FooterLink>
            </FooterLinkColumn>
          </div>

          {/* Vertical divider line for desktop */}
          <div className="absolute top-0 bottom-0 left-[41.666%] hidden w-px bg-[#0a2540]/6 lg:block" />
        </div>

        {/* Middle Section (Strip) */}
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-b border-[#e3e8ee] py-6 md:flex-row">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(10,37,64,0.08)_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 px-2 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_rgba(119,69,233,0.65)]" />
              <span className="text-brand font-mono text-xs tracking-widest uppercase">
                <MeshInk>
                  Custom Software &bull; CRM Systems &bull; AI Automation
                </MeshInk>
              </span>
            </div>

            {/* Cool loading bar graphic */}
            <div className="hidden items-center gap-[2px] opacity-80 lg:flex">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 w-1.5 transition-colors",
                    i < 12 ? "bg-primary" : "bg-[#0a2540]/8",
                  )}
                />
              ))}
            </div>

            <div className="text-brand font-mono text-xs tracking-widest">
              <MeshInk>{"[ STUDIO SOZO ]"}</MeshInk>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between gap-8 pt-12 xl:flex-row xl:items-center">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:gap-12 xl:w-auto">
            {/* Logo / Left */}
            <div className="flex shrink-0 items-center gap-3">
              <img
                src="/brand/SVG/studio-sozo_primary-horizontal_black.svg"
                alt="Studio Sozo"
                width={451}
                height={165}
                className="h-14 w-auto max-w-none shrink-0"
              />
            </div>

            <div className="hidden flex-col border-l border-[#e3e8ee] pl-8 md:flex">
              <span className="text-xs tracking-widest text-[#6b7c93]">
                Operated by {siteConfig.legalName}.
              </span>
              <span className="text-xs tracking-widest text-[#6b7c93]">
                {serviceLocations.disclaimer}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-4 text-xs tracking-widest text-[#6b7c93] uppercase md:flex-row md:items-center md:gap-16 xl:w-auto xl:justify-end">
            <div className="flex flex-col gap-1">
              <span>
                &copy; 2026 {siteConfig.legalName}.
              </span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="transition-colors hover:text-[#0a2540]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-[#0a2540]"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#0a2540]"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Crosshairs */}
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />
    </footer>
  );
}
