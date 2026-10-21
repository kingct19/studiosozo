import { siteConfig } from "@/lib/site";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildFaqSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: `${siteConfig.url}/services/${slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Louisiana" },
      { "@type": "AdministrativeArea", name: "Texas" },
      { "@type": "AdministrativeArea", name: "Missouri" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function buildCaseStudySchema({
  title,
  description,
  slug,
  image,
  industry,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  industry: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${title} — ${industry}`,
    headline: title,
    description,
    url: `${siteConfig.url}/work/${slug}`,
    image: `${siteConfig.url}${image}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function buildLocationSchema({
  city,
  state,
  slug,
  description,
}: {
  city: string;
  state: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — ${city}, ${state}`,
    legalName: siteConfig.legalName,
    url: `${siteConfig.url}/locations/${slug}`,
    description,
    areaServed: [
      {
        "@type": "City",
        name: `${city}, ${state}`,
      },
      {
        "@type": "AdministrativeArea",
        name: state,
      },
    ],
    knowsAbout: siteConfig.services.map((s) => s.title),
  };
}
