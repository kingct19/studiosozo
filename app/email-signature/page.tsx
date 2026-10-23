import type { Metadata } from "next";
import { EmailSignatureWorkbench } from "@/components/email-signature-workbench";
import { PageHeader } from "@/components/page-header";
import Container from "@/components/watermelon/templates/landing-01/landing/container";
import Footer from "@/components/watermelon/templates/landing-01/landing/footer";
import Navbar from "@/components/watermelon/templates/landing-01/landing/navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Email Signature Workbench — ${siteConfig.name}`,
  description: `Internal email signature generator and clipboard utility for ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmailSignaturePage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Email Signature Workbench", path: "/email-signature" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-mono text-[#0a2540]">
      <Navbar />

      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="BRAND SYSTEM // INTERNAL UTILITY"
        headline="Founder Email"
        highlightWord="Signature."
        leadBold="Engineered for Gmail, Apple Mail, Superhuman, and Outlook."
        leadBody="Select a signature architecture below, customize optional fields, and copy the rendered table directly into your email client with one click."
        secondaryCta={{
          text: "Open Standalone HTML",
          href: "/email-signature.html",
        }}
      />

      <section className="bg-[#f6f9fc] py-16 md:py-24">
        <Container className="mx-auto">
          <EmailSignatureWorkbench />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
