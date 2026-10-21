import type { MetadataRoute } from "next";
import { caseStudiesData } from "@/lib/case-studies";
import { flatServiceLocations } from "@/lib/locations";
import { servicesData } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/process`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/locations`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudiesData.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = flatServiceLocations.map(
    (loc) => ({
      url: `${siteConfig.url}/locations/${loc.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...locationRoutes,
  ];
}
