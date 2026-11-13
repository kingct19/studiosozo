export interface PricingTier {
  id: "website" | "automation" | "app" | "custom";
  code: string;
  name: string;
  badge?: string;
  timeline: string;
  priceLabel: string;
  priceSubtext: string;
  featured: boolean;
  highlightAccent: boolean;
  idealFor: string;
  painPointSolved: string;
  includes: readonly string[];
  ctaText: string;
  ctaHref: string;
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "website",
    code: "TIER // 01 — STANDALONE WEBSITE",
    name: "Website Build or Redesign",
    badge: "New • Fast Turnaround",
    timeline: "1 – 2 Weeks",
    priceLabel: "$800 – $1,000",
    priceSubtext: "One-time flat investment",
    featured: false,
    highlightAccent: true,
    idealFor:
      "Local businesses, service pros, and founders launching a brand-new website or replacing an outdated, slow Wix, WordPress, or Squarespace site.",
    painPointSolved:
      "Ditches clunky website builders and $30–$80/mo platform fees for a fast, modern site you actually own.",
    includes: [
      "Custom 1–5 page mobile-first website (new build or full redesign)",
      "Direct contact / quote request form wired straight to your inbox",
      "Local Google SEO setup (page titles, metadata, sitemap & fast load speed)",
      "Custom domain, SSL security & fast cloud hosting setup",
      "100% code and design ownership ($0 monthly platform rent)",
    ],
    ctaText: "Start My Website ($800–$1k)",
    ctaHref: "/contact?package=website",
  },
  {
    id: "automation",
    code: "TIER // 02 — AUTOMATION & SYNC",
    name: "Workflow & Tool Automation",
    timeline: "2 – 4 Weeks",
    priceLabel: "Starting at $2,000",
    priceSubtext: "Fixed-scope milestone build",
    featured: false,
    highlightAccent: false,
    idealFor:
      "Businesses losing hours every week copying data between forms, spreadsheets, calendars, QuickBooks, or Stripe.",
    painPointSolved:
      "Connects your existing tools so leads, invoices, and status updates happen automatically without double entry.",
    includes: [
      "Audit of your current tools & step-by-step automation plan",
      "Custom two-way sync across Stripe, QuickBooks, calendars & SMS/email",
      "AI document reading or instant 24/7 lead follow-up & routing",
      "Automatic error alerts so nothing ever falls through the cracks",
      "100% source code ownership & production launch",
    ],
    ctaText: "Automate a Workflow",
    ctaHref: "/contact?package=automation",
  },
  {
    id: "app",
    code: "TIER // 03 — CUSTOM APP OR CRM",
    name: "Web App, Mobile App or CRM",
    badge: "Most Popular for Growing Teams",
    timeline: "6 – 10 Weeks",
    priceLabel: "$5,000 – $10,000",
    priceSubtext: "Milestone-based fixed-scope build",
    featured: true,
    highlightAccent: true,
    idealFor:
      "Growing companies ready for a custom booking/checkout app, customer portal, iPhone/Android app, or internal CRM built around their exact workflow.",
    painPointSolved:
      "Replaces spreadsheets and expensive per-seat software with one fast app your business owns 100%.",
    includes: [
      "Interactive screen prototypes before full engineering begins",
      "Custom web app, client login portal, mobile app, or internal CRM",
      "Tailored views for admins, sales reps, field crews, and customers",
      "Built-in Stripe payments, SMS/email notifications & live reporting",
      "100% code, database & GitHub ownership ($0 per-user fees forever)",
    ],
    ctaText: "Scope Your Custom App",
    ctaHref: "/contact?package=app",
  },
  {
    id: "custom",
    code: "TIER // 04 — FULL ECOSYSTEM",
    name: "Multi-App Platform / Retainer",
    timeline: "10+ Weeks or Ongoing",
    priceLabel: "Custom Scope",
    priceSubtext: "Phased roadmap or monthly partner",
    featured: false,
    highlightAccent: false,
    idealFor:
      "Multi-location companies or founders launching a complete Web + iOS/Android product suite, multi-branch platform, or ongoing feature roadmap.",
    painPointSolved:
      "Gives you direct principal-engineer execution without the $300k+/yr overhead of hiring an in-house dev team.",
    includes: [
      "Unified Web Application + Native iOS & Android Mobile Apps",
      "Custom AI copilots, search, and multi-department workflows",
      "Multi-location permissions, audit history & executive reporting",
      "Apple App Store & Google Play Store submission and release setup",
      "Dedicated weekly build sprints and priority support",
    ],
    ctaText: "Discuss Custom Scope",
    ctaHref: "/contact?package=custom",
  },
] as const;

export const OWNERSHIP_VS_SAAS = [
  {
    dimension: "Website Builders (Wix / Squarespace / Agency Retainers)",
    rentedSaas: "$35–$150+/mo forever—stop paying and your website disappears",
    studioSozo: "$800–$1,000 one-time build—you own the code and asset outright",
  },
  {
    dimension: "Per-User / Per-Seat App Fees",
    rentedSaas: "$75–$250/user/mo forever—penalizes you every time you hire",
    studioSozo: "$0 per seat forever—add unlimited reps, techs, and customers",
  },
  {
    dimension: "How It Fits Your Business",
    rentedSaas: "Cookie-cutter templates that force workarounds and extra plugins",
    studioSozo: "Designed around your exact services, quoting, booking, and team",
  },
  {
    dimension: "Code & Data Ownership",
    rentedSaas: "Locked inside the vendor's platform—you can't take it with you",
    studioSozo: "100% yours in your own GitHub & cloud account from day one",
  },
] as const;

export const PRICING_FAQS = [
  {
    question: "What is included in the $800 – $1,000 standalone website package?",
    answer:
      "It covers a complete 1–5 page custom business website—either built from scratch or redesigned from an old Wix, WordPress, or Squarespace site. You get mobile-first design, a contact/quote form wired directly to your email, local Google SEO setup, domain/SSL launch setup, and 100% ownership in 1–2 weeks. When a project needs user logins, live database booking, or custom payment flows, it moves into our Web App tiers ($2,000+).",
  },
  {
    question: "How do payments work during a project?",
    answer:
      "We never ask for 100% upfront. Standalone websites ($800–$1,000) are split 50% to kick off and 50% at launch. Larger custom apps and automations are split across clear milestones—typically 30% at kickoff, 40% after you approve the live staging preview, and 30% at launch.",
  },
  {
    question: "Are there any monthly fees after launch?",
    answer:
      "Studio Sozo charges $0 in monthly licensing, platform, or per-user fees. Standard 1–5 page business websites can often run on free-tier modern cloud hosting (only paying ~$12–$20/year for your domain name). Larger web/mobile apps with databases typically run $25–$100/month paid directly to your own cloud providers (like Vercel or Supabase).",
  },
  {
    question: "Can you still make updates or add features for us later?",
    answer:
      "Yes. Every launch includes a post-launch support window at no extra charge to make sure everything runs smoothly. Anytime you want page updates, new features, or to expand your website into a full customer portal later, you can reach out for a flat quote or an optional monthly partnership.",
  },
];
