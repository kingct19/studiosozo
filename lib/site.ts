export const siteConfig = {
  name: "Studio Sozo",
  wordmark: "studio sozo.",
  legalName: "Sozo Tech Enterprise LLC",
  url: "https://studiosozo.dev",
  founder: {
    name: "Chandler King",
    role: "Founder & Principal Engineer",
    email: "chandler@studiosozo.com",
    avatar: "/chandler-king.jpg",
  },
  headline: "Your Business Is Unique. Your Software Should Be Too.",
  description:
    "We design and build custom software that replaces disconnected tools, automates workflows, and gives your business greater control over its technology.",
  shortDescription:
    "Custom software development, CRM and business systems, AI automation, web applications, mobile apps, and systems integration.",
  ctas: {
    primary: {
      text: "Discuss Your Project",
      url: "/contact",
    },
    secondary: {
      text: "Explore Our Services",
      url: "/services",
    },
  },
  navLinks: [
    { title: "Services", url: "/services" },
    { title: "Work", url: "/work" },
    { title: "Process", url: "/process" },
    { title: "Pricing", url: "/pricing" },
    { title: "Locations", url: "/locations" },
    { title: "Contact", url: "/contact" },
  ],
  services: [
    {
      slug: "custom-software-development",
      title: "Custom Software Development",
      description:
        "Bespoke platforms built around business processes rather than rigid off-the-shelf templates.",
    },
    {
      slug: "crm-and-business-systems",
      title: "CRM & Business Systems",
      description:
        "Custom CRMs, dashboards, and operational management platforms tailored to how your team works.",
    },
    {
      slug: "ai-and-automation",
      title: "AI & Automation",
      description:
        "Automate repetitive processes, eliminate manual data entry, and connect intelligent workflows.",
    },
    {
      slug: "web-applications",
      title: "Web Applications",
      description:
        "Modern, scalable web-based platforms for internal teams, partners, and customers.",
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      description:
        "iOS and Android applications that extend your operations into the field and to your customers.",
    },
    {
      slug: "systems-integration",
      title: "Systems Integration",
      description:
        "Connect existing software, APIs, accounting platforms, and business tools into one reliable flow.",
    },
  ],
} as const;
