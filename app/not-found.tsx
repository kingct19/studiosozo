import Link from "next/link";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { MeshInk } from "@/components/brand-mesh";
import { LitUpButton } from "@/components/lit-up-button";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Heading from "@/components/watermelon/templates/landing-01/landing/heading";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <Navbar />

      <section className="relative flex min-h-[75vh] items-center overflow-hidden pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />

        <Container className="relative z-10 mx-auto text-center">
          <div className="mx-auto max-w-2xl border border-[#e3e8ee] bg-white p-10 shadow-[0_12px_40px_rgba(10,37,64,0.06)] md:p-16">
            <div className="text-brand mb-4 text-xs font-bold tracking-widest uppercase">
              <MeshInk>{"//"} ERROR 404 — ROUTE NOT FOUND</MeshInk>
            </div>

            <Heading
              as="h1"
              variant="big"
              className="text-foreground mb-4 font-sans text-balance"
            >
              This route does not{" "}
              <span className="text-brand">
                <MeshInk>exist</MeshInk>
              </span>
            </Heading>

            <p className="mx-auto mb-8 max-w-lg font-sans text-base leading-relaxed text-[#425466] md:text-lg">
              The page you requested may have moved, or you followed an outdated link. Explore our core capabilities or start a project inquiry below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <LitUpButton
                href="/"
                className="w-fit text-xs font-bold tracking-widest uppercase"
              >
                Return Home <ArrowUpRight01Icon className="h-4 w-4" />
              </LitUpButton>
              <Link
                href="/services"
                className="border border-[#e3e8ee] bg-[#f6f9fc] px-6 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="border border-[#e3e8ee] bg-white px-6 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
