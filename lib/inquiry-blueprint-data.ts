import type { softwareTypeOptions } from "@/lib/inquiry-schema";

export type SoftwareCapabilityOption = (typeof softwareTypeOptions)[number];

export interface BlueprintArchitectureNode {
  id: string;
  tier: "INTAKE" | "LOGIC" | "DATA";
  label: string;
  sublabel: string;
  status: string;
}

export interface CapabilityBlueprintProfile {
  capability: SoftwareCapabilityOption;
  code: string;
  shortTitle: string;
  tagline: string;
  deliverableSummary: string;
  architectureNodes: readonly [
    BlueprintArchitectureNode,
    BlueprintArchitectureNode,
    BlueprintArchitectureNode,
    BlueprintArchitectureNode,
  ];
  apiBridges: readonly {
    name: string;
    protocol: string;
    latency: string;
  }[];
  promptChips: readonly string[];
  roles: readonly string[];
}

export const CAPABILITY_BLUEPRINTS: Record<
  SoftwareCapabilityOption,
  CapabilityBlueprintProfile
> = {
  "Custom Websites & Redesigns": {
    capability: "Custom Websites & Redesigns",
    code: "WEB-SITE // 01",
    shortTitle: "Custom Business Website",
    tagline:
      "1–5 page custom website or Wix/WordPress redesign ($800–$1,000 in 1–2 weeks) with $0 monthly platform fees.",
    deliverableSummary:
      "1–5 page mobile-first custom website + direct inbox lead form + local Google SEO + 100% code ownership",
    architectureNodes: [
      {
        id: "site-pages",
        tier: "INTAKE",
        label: "Custom 1–5 Page Mobile-First Site",
        sublabel: "Tailored design for services, work & local trust",
        status: "1–2 WEEKS",
      },
      {
        id: "lead-form",
        tier: "LOGIC",
        label: "Direct Inbox Lead & Quote Form",
        sublabel: "Instant email alerts & client confirmation",
        status: "WIRED",
      },
      {
        id: "local-seo",
        tier: "LOGIC",
        label: "Google Search & Speed Setup",
        sublabel: "Metadata, sitemap, OpenGraph & fast mobile load",
        status: "SEO READY",
      },
      {
        id: "owned-code",
        tier: "DATA",
        label: "Domain Launch & 100% Code Ownership",
        sublabel: "SSL configured with $0 monthly platform rent",
        status: "100% OWNED",
      },
    ],
    apiBridges: [
      { name: "DIRECT LEAD EMAIL", protocol: "RESEND", latency: "19ms" },
      { name: "GOOGLE SEO SCHEMA", protocol: "JSON-LD", latency: "8ms" },
      { name: "CUSTOM DOMAIN + SSL", protocol: "EDGE CDN", latency: "11ms" },
    ],
    promptChips: [
      "Build a brand-new 1–5 page business website",
      "Redesign / replace our outdated Wix, WordPress, or Squarespace site",
      "Add a clean quote / contact form & local Google SEO",
      "Make our site load fast and look sharp on phones",
    ],
    roles: ["VISITORS", "LOCAL SEARCH", "BUSINESS OWNER"],
  },
  "Web Apps & Customer Portals": {
    capability: "Web Apps & Customer Portals",
    code: "SYS-WEB // 02",
    shortTitle: "Web App & Client Portal",
    tagline:
      "Online booking, custom quoting, checkout flows, and client login portals tailored to how your business runs.",
    deliverableSummary:
      "Custom Next.js web application + Stripe payments/booking + secure customer & staff portals",
    architectureNodes: [
      {
        id: "client-gateway",
        tier: "INTAKE",
        label: "Branded Client & Booking Portal",
        sublabel: "Secure logins, live status & self-serve actions",
        status: "LIVE WEB",
      },
      {
        id: "checkout-flow",
        tier: "LOGIC",
        label: "Booking, Quoting & Payment Flow",
        sublabel: "Custom pricing rules, deposits & instant receipts",
        status: "REAL-TIME",
      },
      {
        id: "tenant-rbac",
        tier: "LOGIC",
        label: "Staff & Customer Permissions",
        sublabel: "Simple admin dashboard for managing orders & content",
        status: "ROLE-SAFE",
      },
      {
        id: "cloud-db",
        tier: "DATA",
        label: "Owned Cloud Database",
        sublabel: "Automated backups & $0 third-party commissions",
        status: "100% OWNED",
      },
    ],
    apiBridges: [
      { name: "STRIPE PAYMENTS", protocol: "WEBHOOK", latency: "12ms" },
      { name: "USER AUTH / LOGIN", protocol: "SECURE", latency: "8ms" },
      { name: "EMAIL / SMS ALERTS", protocol: "INSTANT", latency: "19ms" },
    ],
    promptChips: [
      "Online booking, scheduling, or rental checkout flow",
      "Customer login portal to check status, sign, or pay invoices",
      "Launching a custom SaaS product or marketplace",
      "Interactive price estimator or custom quote builder",
    ],
    roles: ["CUSTOMERS", "PARTNERS", "STAFF ADMIN"],
  },
  "Mobile Apps (iOS & Android)": {
    capability: "Mobile Apps (iOS & Android)",
    code: "SYS-MOB // 03",
    shortTitle: "iOS & Android App",
    tagline:
      "Custom iPhone and Android apps for your customers or field crews—complete with photos, push alerts, and live sync.",
    deliverableSummary:
      "iPhone & Android native app + offline photo/checklist sync + App Store & Google Play launch",
    architectureNodes: [
      {
        id: "field-app",
        tier: "INTAKE",
        label: "iPhone & Android Mobile App",
        sublabel: "Photos, GPS check-in, signatures & clean navigation",
        status: "IOS + ANDROID",
      },
      {
        id: "sync-engine",
        tier: "LOGIC",
        label: "Offline-Ready Sync",
        sublabel: "Saves work in weak cell zones & syncs automatically",
        status: "RESILIENT",
      },
      {
        id: "push-dispatch",
        tier: "LOGIC",
        label: "Push Notifications & Alerts",
        sublabel: "Instant customer updates & crew schedule changes",
        status: "LIVE PUSH",
      },
      {
        id: "hq-cloud",
        tier: "DATA",
        label: "Synced Web Admin Dashboard",
        sublabel: "Shared live database for mobile users & office staff",
        status: "UNIFIED",
      },
    ],
    apiBridges: [
      { name: "APPLE + GOOGLE PUSH", protocol: "NATIVE", latency: "21ms" },
      { name: "CAMERA & GPS", protocol: "MOBILE", latency: "16ms" },
      { name: "CLOUD MEDIA SYNC", protocol: "DIRECT", latency: "28ms" },
    ],
    promptChips: [
      "Customer-facing iPhone & Android mobile app",
      "Field crew app for job checklists, photos & signatures",
      "Offline-capable mobile app synced with an office dashboard",
      "Publishing a new app to the App Store & Google Play",
    ],
    roles: ["MOBILE USERS", "FIELD CREW", "OFFICE HQ"],
  },
  "Custom CRMs & AI Automation": {
    capability: "Custom CRMs & AI Automation",
    code: "SYS-CRM // 04",
    shortTitle: "Custom CRM & Automation",
    tagline:
      "Internal dashboards, lead-to-invoice tracking, Stripe/QuickBooks sync, and AI tools with $0 per-user fees.",
    deliverableSummary:
      "Custom CRM dashboard + QuickBooks/Stripe two-way sync + AI busywork automation ($0/seat)",
    architectureNodes: [
      {
        id: "lead-router",
        tier: "INTAKE",
        label: "Unified Lead & Job Dashboard",
        sublabel: "Every lead, quote, schedule & note in one clean view",
        status: "$0 / SEAT",
      },
      {
        id: "quote-desk",
        tier: "LOGIC",
        label: "Fast Quoting & Follow-Up Automation",
        sublabel: "Instant SMS/email follow-up & e-sign estimates",
        status: "AUTOMATED",
      },
      {
        id: "ai-sync",
        tier: "LOGIC",
        label: "AI Document Reading & Tool Sync",
        sublabel: "Reads PDFs/emails & syncs QuickBooks/Stripe",
        status: "2-WAY SYNC",
      },
      {
        id: "crm-warehouse",
        tier: "DATA",
        label: "Owned Company Database",
        sublabel: "Unlimited team logins with zero monthly seat fees",
        status: "100% OWNED",
      },
    ],
    apiBridges: [
      { name: "QUICKBOOKS SYNC", protocol: "2-WAY API", latency: "24ms" },
      { name: "STRIPE BILLING", protocol: "WEBHOOK", latency: "14ms" },
      { name: "AI + SMS FOLLOW-UP", protocol: "AUTOMATED", latency: "18ms" },
    ],
    promptChips: [
      "Replacing messy spreadsheets or expensive HubSpot/Jobber seats",
      "Connecting website leads, quoting, scheduling & QuickBooks",
      "Automating repetitive copy-pasting from emails or PDFs",
      "Building an internal dashboard with unlimited team logins",
    ],
    roles: ["OWNER", "SALES / OFFICE", "FIELD TEAM"],
  },
  "Not Sure / Multiple Things": {
    capability: "Not Sure / Multiple Things",
    code: "SYS-MULTI // 05",
    shortTitle: "Website + Custom App Plan",
    tagline:
      "Need a website plus custom features, or not sure which tier fits? Tell us your goal and we'll map the simplest path.",
    deliverableSummary:
      "Tailored website & application plan with clear fixed milestones and 100% ownership",
    architectureNodes: [
      {
        id: "omni-surface",
        tier: "INTAKE",
        label: "Website, Web App or Mobile App",
        sublabel: "Right-sized interface for customers & your team",
        status: "TAILORED",
      },
      {
        id: "core-orchestrator",
        tier: "LOGIC",
        label: "Custom Business Workflows",
        sublabel: "Booking, quoting, logins, or AI automation",
        status: "CLEAR SCOPE",
      },
      {
        id: "integration-mesh",
        tier: "LOGIC",
        label: "Connected Payments & Tools",
        sublabel: "Syncs cleanly with Stripe, QuickBooks, SMS & email",
        status: "CONNECTED",
      },
      {
        id: "sozo-foundation",
        tier: "DATA",
        label: "100% Owned Code & Hosting",
        sublabel: "Full repository handover & $0 monthly platform rent",
        status: "100% OWNED",
      },
    ],
    apiBridges: [
      { name: "WEBSITE + PORTAL", protocol: "NEXT.JS", latency: "11ms" },
      { name: "STRIPE + QUICKBOOKS", protocol: "SYNC", latency: "16ms" },
      { name: "EMAIL + SMS", protocol: "AUTOMATED", latency: "19ms" },
    ],
    promptChips: [
      "Need both a new website and online booking / portal features",
      "Not sure which package fits — want a straightforward recommendation",
      "Start with an $800–$1,000 website now and add custom features later",
      "Replacing multiple monthly software subscriptions at once",
    ],
    roles: ["OWNER", "CUSTOMERS", "TEAM"],
  },
};

export function getCapabilityBlueprint(
  softwareType: string,
): CapabilityBlueprintProfile {
  const key = softwareType as SoftwareCapabilityOption;
  if (key in CAPABILITY_BLUEPRINTS) {
    return CAPABILITY_BLUEPRINTS[key];
  }
  return CAPABILITY_BLUEPRINTS["Custom Websites & Redesigns"];
}

export type WizardStepId = "system" | "workflow" | "parameters" | "dispatch";

export interface WizardStepMeta {
  id: WizardStepId;
  index: number;
  code: string;
  label: string;
  headline: string;
  subtitle: string;
}

export const WIZARD_STEPS: readonly WizardStepMeta[] = [
  {
    id: "system",
    index: 0,
    code: "01 // PROJECT TYPE",
    label: "What You Need",
    headline: "What can we build or update for you?",
    subtitle:
      "From $800–$1,000 business websites to full custom web & mobile apps.",
  },
  {
    id: "workflow",
    index: 1,
    code: "02 // DETAILS",
    label: "Project Details",
    headline: "Tell us a little about your project",
    subtitle:
      "Tap any quick-add goals below or write a couple sentences in your own words.",
  },
  {
    id: "parameters",
    index: 2,
    code: "03 // BUDGET & TIMELINE",
    label: "Budget & Timeline",
    headline: "What budget and timeline are you aiming for?",
    subtitle:
      "Clear flat/milestone pricing, fast turnaround, and 100% ownership on every build.",
  },
  {
    id: "dispatch",
    index: 3,
    code: "04 // CONTACT INFO",
    label: "Your Info",
    headline: "Where should Chandler send your quote & plan?",
    subtitle:
      "You work directly with the founder—no sales reps or account manager layers.",
  },
] as const;

export function getStepFocusSummary(stepId: WizardStepId): string {
  switch (stepId) {
    case "system":
      return "STEP 01 // SELECTING WEBSITE OR APP PACKAGE";
    case "workflow":
      return "STEP 02 // MAPPING GOALS & FEATURES";
    case "parameters":
      return "STEP 03 // SETTING BUDGET & LAUNCH TIMELINE";
    case "dispatch":
      return "STEP 04 // SENDING DIRECTLY TO CHANDLER";
    default: {
      const _exhaustive: never = stepId;
      return _exhaustive;
    }
  }
}
