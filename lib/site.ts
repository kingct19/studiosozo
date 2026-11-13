export const siteConfig = {
  name: "Studio Sozo",
  wordmark: "studio sozo.",
  legalName: "Sozo Tech Enterprise LLC",
  url: "https://studiosozo.dev",
  founder: {
    name: "Chandler King",
    role: "Founder & Principal Engineer",
    email: "chandler@studiosozo.dev",
    avatar: "/chandler-king.jpg",
  },
  headline: "Custom Websites & Apps Built for Your Business. Owned 100% by You.",
  description:
    "Studio Sozo designs and builds custom business websites ($800-$1,000), web applications, mobile apps, and internal CRMs with 100% code ownership and $0 monthly platform fees.",
  shortDescription:
    "Custom business websites, web applications & portals, iOS & Android mobile apps, and custom CRMs & AI automation.",
  ctas: {
    primary: {
      text: "Start Your Project",
      url: "/contact",
    },
    secondary: {
      text: "See Pricing ($800+)",
      url: "/pricing",
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
      slug: "custom-websites",
      title: "Custom Websites & Redesigns",
      badge: "$800-$1,000 • 1-2 Weeks",
      description:
        "Fast, modern 1-5 page business websites or Wix/WordPress redesigns built to bring in leads with $0 monthly platform fees.",
    },
    {
      slug: "web-applications",
      title: "Web Apps & Customer Portals",
      badge: "Booking • Portals • Checkout",
      description:
        "Online booking, custom quoting, checkout flows, and client login portals tailored to how your business runs.",
    },
    {
      slug: "mobile-app-development",
      title: "Mobile Apps (iOS & Android)",
      badge: "iPhone & Android",
      description:
        "Custom iPhone and Android apps for your customers or field crews, complete with photos, push alerts, and live sync.",
    },
    {
      slug: "crm-and-business-systems",
      title: "Custom CRMs & AI Automation",
      badge: "Internal Tools & Sync",
      description:
        "Internal dashboards, lead-to-invoice tracking, Stripe/QuickBooks sync, and AI tools that cut manual busywork.",
    },
  ],
} as const;
