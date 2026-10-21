"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
} from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LitUpButton } from "@/components/lit-up-button";
import { flatServiceLocations, serviceLocations } from "@/lib/locations";
import { siteConfig } from "@/lib/site";

type DropdownKey = "services" | "locations" | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 140);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-[#e3e8ee] bg-white/90 py-3 shadow-sm backdrop-blur-md"
          : "border-[#e3e8ee]/80 bg-white/80 py-5 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Studio Sozo"
        >
          <img
            src="/brand/SVG/studio-sozo_primary-horizontal_black.svg"
            alt="Studio Sozo"
            width={451}
            height={165}
            className="h-10 w-auto max-w-none shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.navLinks.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(`${item.url}/`);

            if (item.url === "/services") {
              const isOpen = openDropdown === "services";
              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("services")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.url}
                      className={cn(
                        "font-mono text-xs tracking-widest uppercase transition-colors",
                        isActive || isOpen
                          ? "font-bold text-[#635bff]"
                          : "text-[#425466] hover:text-[#635bff]",
                      )}
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle Services dropdown"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : "services")
                      }
                      className={cn(
                        "p-0.5 transition-colors",
                        isActive || isOpen
                          ? "text-[#635bff]"
                          : "text-[#425466] hover:text-[#635bff]",
                      )}
                    >
                      <ArrowDown01Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 pt-4"
                      >
                        <div className="relative w-[540px] border border-[#e3e8ee] bg-white p-5 font-mono shadow-[0_20px_50px_rgba(10,37,64,0.12)]">
                          <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/45" />
                          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/45" />
                          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/45" />
                          <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/45" />

                          <div className="mb-3 flex items-center justify-between border-b border-[#e3e8ee] pb-2.5">
                            <span className="text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                              {"//"} 06 CORE CAPABILITIES
                            </span>
                            <Link
                              href="/services"
                              onClick={() => setOpenDropdown(null)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:text-[#635bff]"
                            >
                              All Services{" "}
                              <ArrowUpRight01Icon className="h-3 w-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {siteConfig.services.map((service, idx) => {
                              const serviceHref = `/services/${service.slug}`;
                              const serviceActive = pathname === serviceHref;
                              return (
                                <Link
                                  key={service.slug}
                                  href={serviceHref}
                                  onClick={() => setOpenDropdown(null)}
                                  className={cn(
                                    "group/item border p-3 transition-colors",
                                    serviceActive
                                      ? "border-[#635bff]/50 bg-[#f6f9fc]"
                                      : "border-transparent hover:border-[#e3e8ee] hover:bg-[#f6f9fc]",
                                  )}
                                >
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-widest text-[#6b7c93]">
                                      0{idx + 1}
                                    </span>
                                    <ArrowUpRight01Icon className="h-3 w-3 text-[#6b7c93] opacity-0 transition-opacity group-hover/item:opacity-100 group-hover/item:text-[#635bff]" />
                                  </div>
                                  <div className="font-sans text-xs font-bold text-[#0a2540] group-hover/item:text-[#635bff]">
                                    {service.title}
                                  </div>
                                  <p className="mt-1 line-clamp-2 font-sans text-[11px] leading-snug text-[#425466]">
                                    {service.description}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.url === "/locations") {
              const isOpen = openDropdown === "locations";
              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("locations")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.url}
                      className={cn(
                        "font-mono text-xs tracking-widest uppercase transition-colors",
                        isActive || isOpen
                          ? "font-bold text-[#635bff]"
                          : "text-[#425466] hover:text-[#635bff]",
                      )}
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle Locations dropdown"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : "locations")
                      }
                      className={cn(
                        "p-0.5 transition-colors",
                        isActive || isOpen
                          ? "text-[#635bff]"
                          : "text-[#425466] hover:text-[#635bff]",
                      )}
                    >
                      <ArrowDown01Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="relative w-[500px] border border-[#e3e8ee] bg-white p-5 font-mono shadow-[0_20px_50px_rgba(10,37,64,0.12)]">
                          <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/45" />
                          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/45" />
                          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/45" />
                          <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/45" />

                          <div className="mb-3 flex items-center justify-between border-b border-[#e3e8ee] pb-2.5">
                            <span className="text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                              {"//"} SERVICE AREAS (LA • TX • MO)
                            </span>
                            <Link
                              href="/locations"
                              onClick={() => setOpenDropdown(null)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:text-[#635bff]"
                            >
                              All Locations{" "}
                              <ArrowUpRight01Icon className="h-3 w-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            {serviceLocations.states.map((stateGroup) => {
                              const cities = flatServiceLocations.filter(
                                (loc) => loc.state === stateGroup.state,
                              );
                              return (
                                <div key={stateGroup.state}>
                                  <div className="mb-2 text-[10px] font-bold tracking-widest text-[#6b7c93] uppercase">
                                    {stateGroup.state}
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    {cities.map((loc) => {
                                      const locHref = `/locations/${loc.slug}`;
                                      const locActive = pathname === locHref;
                                      return (
                                        <Link
                                          key={loc.slug}
                                          href={locHref}
                                          onClick={() => setOpenDropdown(null)}
                                          className={cn(
                                            "px-2 py-1.5 font-sans text-xs font-semibold transition-colors",
                                            locActive
                                              ? "bg-[#f6f9fc] text-[#635bff]"
                                              : "text-[#0a2540] hover:bg-[#f6f9fc] hover:text-[#635bff]",
                                          )}
                                        >
                                          {loc.label}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-[#e3e8ee] bg-[#f6f9fc] px-3 py-2">
                            <span className="text-[10px] font-bold tracking-widest text-[#425466] uppercase">
                              Remote Collaboration (United States)
                            </span>
                            <Link
                              href="/contact"
                              onClick={() => setOpenDropdown(null)}
                              className="text-[10px] font-bold tracking-widest text-[#635bff] uppercase hover:underline"
                            >
                              Start Inquiry &rarr;
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "font-mono text-xs tracking-widest uppercase transition-colors",
                  isActive
                    ? "font-bold text-[#635bff]"
                    : "text-[#425466] hover:text-[#635bff]",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={siteConfig.ctas.secondary.url}
            className="flex h-10 items-center border border-[#e3e8ee] bg-transparent px-5 font-mono text-xs font-bold tracking-widest text-[#0a2540]/75 uppercase transition-colors hover:bg-[#0a2540]/5 hover:text-[#0a2540]"
          >
            {siteConfig.ctas.secondary.text}
          </Link>
          <LitUpButton
            href={siteConfig.ctas.primary.url}
            className="h-10 font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.96]"
          >
            {siteConfig.ctas.primary.text}
          </LitUpButton>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="text-foreground p-1"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <Cancel01Icon className="h-6 w-6" />
            ) : (
              <Menu01Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 flex max-h-[82vh] flex-col gap-2 overflow-y-auto border-b border-[#e3e8ee] bg-white p-4 shadow-lg lg:hidden">
          {siteConfig.navLinks.map((item) => {
            if (item.url === "/services") {
              const expanded = mobileExpanded === "services";
              return (
                <div key={item.title} className="border-b border-[#e3e8ee] pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-mono text-xs font-bold tracking-widest text-[#0a2540] uppercase hover:text-[#635bff]"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle mobile services list"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : "services")
                      }
                      className="p-1 text-[#0a2540]"
                    >
                      <ArrowDown01Icon
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  {expanded && (
                    <div className="mt-1 flex flex-col gap-1 border-l-2 border-[#635bff]/40 pl-3">
                      {siteConfig.services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-1.5 font-sans text-xs font-semibold text-[#425466] hover:text-[#635bff]"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (item.url === "/locations") {
              const expanded = mobileExpanded === "locations";
              return (
                <div key={item.title} className="border-b border-[#e3e8ee] pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href="/locations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-mono text-xs font-bold tracking-widest text-[#0a2540] uppercase hover:text-[#635bff]"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle mobile locations list"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : "locations")
                      }
                      className="p-1 text-[#0a2540]"
                    >
                      <ArrowDown01Icon
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  {expanded && (
                    <div className="mt-1 grid grid-cols-2 gap-1 border-l-2 border-[#635bff]/40 pl-3">
                      {flatServiceLocations.map((loc) => (
                        <Link
                          key={loc.slug}
                          href={`/locations/${loc.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-1.5 font-sans text-xs font-semibold text-[#425466] hover:text-[#635bff]"
                        >
                          {loc.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[#e3e8ee] py-2 font-mono text-xs font-bold tracking-widest text-[#0a2540] uppercase hover:text-[#635bff]"
              >
                {item.title}
              </Link>
            );
          })}

          <Link
            href={siteConfig.ctas.secondary.url}
            onClick={() => setMobileMenuOpen(false)}
            className="text-foreground mt-2 w-full border border-[#e3e8ee] px-4 py-3 text-center font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a2540]/5"
          >
            {siteConfig.ctas.secondary.text}
          </Link>
          <LitUpButton
            href={siteConfig.ctas.primary.url}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.96]"
          >
            {siteConfig.ctas.primary.text}
          </LitUpButton>
        </div>
      )}
    </header>
  );
}
