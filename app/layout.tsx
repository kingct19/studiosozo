import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { BrandMeshHost } from "@/components/brand-mesh";
import { flatServiceLocations, serviceLocations } from "@/lib/locations";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./brand.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Custom Software Development, CRM & AI Automation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "custom software development",
    "custom CRM development",
    "business software solutions",
    "AI automation",
    "web application development",
    "mobile application development",
    "systems integration",
    "Louisiana custom software development",
    "Texas custom software development",
    "Missouri custom software development",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/Web-Icons/favicon.ico", sizes: "any" },
      {
        url: "/brand/Web-Icons/studio-sozo_favicon_32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/brand/Web-Icons/studio-sozo_favicon_64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
    shortcut: "/brand/Web-Icons/favicon.ico",
    apple: [
      {
        url: "/brand/Web-Icons/studio-sozo_apple-touch-icon_180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.headline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.headline}`,
    description: siteConfig.description,
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  areaServed: [
    ...serviceLocations.states.map((s) => ({
      "@type": "AdministrativeArea",
      name: s.state,
    })),
    ...flatServiceLocations.map((loc) => ({
      "@type": "City",
      name: loc.fullLabel,
    })),
    {
      "@type": "Country",
      name: "United States",
    },
  ],
  serviceType: siteConfig.services.map((service) => service.title),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#0a2540] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <BrandMeshHost />
        {children}
      </body>
    </html>
  );
}
