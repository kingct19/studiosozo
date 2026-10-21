export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyFeature {
  tag: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  badgeUrl: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  highlightWord: string;
  summary: string;
  painPointTitle: string;
  painPointSummary: string;
  painPoints: string[];
  solutionTitle: string;
  solutionSummary: string;
  capabilitiesDelivered: CaseStudyFeature[];
  metrics: CaseStudyMetric[];
  serviceSlugs: string[];
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "sozo-crm",
    title: "Sozo CRM",
    clientType: "Solar & Field Sales Operations",
    industry: "Solar & Home Services CRM",
    badgeUrl: "[ SOZO CRM // SOLAR SALES & PIPELINE PLATFORM ]",
    image: "/projects/sozo-crm.jpg",
    seoTitle:
      "Sozo CRM Case Study | Custom Solar Sales, Pipeline & Commission Platform",
    seoDescription:
      "How Studio Sozo engineered Sozo CRM—a unified sales pipeline, territory management, quoting, and installation handoff platform built for high-velocity solar and field teams.",
    headline: "Unified Solar Sales, Territory & Pipeline",
    highlightWord: "CRM",
    summary:
      "A bespoke CRM and operational command center built for solar and field sales organizations—replacing disconnected lead sheets, rep trackers, and install handoff spreadsheets.",
    painPointTitle: "Leads, Reps, and Install Handoffs Were Split Across 5 Tools",
    painPointSummary:
      "High-volume solar and home-service teams were losing deals in the gap between door-to-door/inbound lead capture, proposal building, utility verification, and installation handoff.",
    painPoints: [
      "Sales reps worked out of fragmented apps while managers tracked deal stages and commissions in manual spreadsheets.",
      "When a homeowner signed, operations had to chase reps for utility bills, roof photos, and contract addendums.",
      "Leadership had no live visibility into rep conversion rates, territory saturation, or project bottlenecks between sale and install.",
      "Off-the-shelf CRMs charged steep per-rep licensing fees while still requiring messy workarounds for solar-specific stages.",
    ],
    solutionTitle: "One Purpose-Built Pipeline From First Knock to Installed System",
    solutionSummary:
      "Studio Sozo engineered Sozo CRM from the ground up around the real solar sales-to-install lifecycle—combining fast mobile-ready lead capture, required stage gates, document checklists, and live commission & pipeline analytics.",
    capabilitiesDelivered: [
      {
        tag: "PIPELINE ENGINE",
        title: "Stage-Gated Solar Deal Workflow",
        description:
          "Enforces required utility bills, site photos, and contract fields before a deal can advance to permitting and installation.",
      },
      {
        tag: "REP WORKSPACE",
        title: "High-Speed Lead & Follow-Up Queue",
        description:
          "Zero-clutter interface for reps to log dispositions, schedule appointments, and trigger automated SMS/email follow-ups.",
      },
      {
        tag: "FINANCIALS",
        title: "Automated Commission & Adder Tracking",
        description:
          "Calculates rep splits, redlines, equipment adders, and milestone payouts automatically from verified deal data.",
      },
      {
        tag: "COMMAND CENTER",
        title: "Live Executive & Territory Analytics",
        description:
          "Real-time leaderboards, close-rate funnels, and project aging alerts so leadership spots stalled jobs immediately.",
      },
    ],
    metrics: [
      { value: "1", label: "Unified Sales-to-Install System" },
      { value: "$0", label: "Per-Seat SaaS Licensing Tax" },
      { value: "100%", label: "Required Handoff Docs Verified" },
    ],
    serviceSlugs: [
      "crm-and-business-systems",
      "custom-software-development",
      "ai-and-automation",
    ],
  },
  {
    slug: "angler-iq",
    title: "Angler IQ",
    clientType: "AI Consumer & Prosumer Product",
    industry: "AI Mobile & Web Platform",
    badgeUrl: "[ ANGLERIQ // AI CO-ANGLER MOBILE & WEB PLATFORM ]",
    image: "/projects/angler-iq.jpg",
    seoTitle:
      "Angler IQ Case Study | AI Co-Angler Mobile & Web Platform Engineered by Studio Sozo",
    seoDescription:
      "See how Studio Sozo built Angler IQ—an AI-powered mobile and web platform combining live weather/water telemetry, catch logging, and intelligent fishing recommendations.",
    headline: "Your AI Co-Angler on the",
    highlightWord: "Water",
    summary:
      "An AI-powered mobile and web platform that synthesizes live weather, barometric pressure, water conditions, and historical catch data into actionable real-time patterns for anglers.",
    painPointTitle: "Anglers Had to Stitch Together Weather Apps, Maps, andScattered Notes",
    painPointSummary:
      "Before hitting the water, anglers were bouncing between wind forecasts, solunar tables, lake level gauges, and old photo rolls—with no intelligent way to connect conditions to what actually worked.",
    painPoints: [
      "Environmental telemetry (wind, pressure trends, water temperature, clarity, moon phase) lived in 6 separate apps.",
      "Catch logs in standard apps were tedious to fill out on the boat, so anglers rarely recorded full condition context.",
      "Generic AI chat tools gave vague textbook fishing advice ungrounded in real-time local conditions or seasonal lake patterns.",
    ],
    solutionTitle: "Real-Time Telemetry + Fast Catch Logging + Domain-Tuned AI",
    solutionSummary:
      "Studio Sozo designed and engineered Angler IQ across mobile and web—automatically snapping environmental telemetry on every log and powering an AI Co-Angler that recommends lures, depths, and structures based on live conditions.",
    capabilitiesDelivered: [
      {
        tag: "AI CO-ANGLER",
        title: "Condition-Aware Pattern & Lure Intelligence",
        description:
          "Synthesizes live weather, seasonal transitions, and historical catch logs into specific retrieve, depth, and bait game plans.",
      },
      {
        tag: "TELEMETRY SYNC",
        title: "One-Tap Catch Logging with Auto-Weather Capture",
        description:
          "Captures GPS, barometric trend, wind speed, air/water temp, and sky conditions automatically the moment a fish is logged.",
      },
      {
        tag: "CROSS-PLATFORM",
        title: "Field-Ready Mobile App & Trip Planning Web Suite",
        description:
          "Built for bright-sun boat use on iOS and Android, paired with deep map and pattern analysis on desktop.",
      },
      {
        tag: "ANALYTICS",
        title: "Personal Pattern & Lake Vault",
        description:
          "searchable history that reveals which baits and structures produce under matching pressure and wind windows.",
      },
    ],
    metrics: [
      { value: "iOS + Web", label: "Unified Cross-Platform Stack" },
      { value: "Real-Time", label: "Weather & Barometric Telemetry" },
      { value: "AI-Driven", label: "Tactical Pattern Engine" },
    ],
    serviceSlugs: [
      "ai-and-automation",
      "mobile-app-development",
      "web-applications",
    ],
  },
  {
    slug: "elevate-solar",
    title: "Elevate Solar",
    clientType: "Residential & Commercial Solar Provider",
    industry: "Renewable Energy & Quoting",
    badgeUrl: "[ ELEVATE-SOLAR.COM // SOLAR OPERATIONS & QUOTING ]",
    image: "/projects/elevate-solar.jpg",
    seoTitle:
      "Elevate Solar Case Study | Solar Quoting, Lead Capture & Operations Web Platform",
    seoDescription:
      "How Studio Sozo built Elevate Solar's digital quoting, lead qualification, and operational workflow platform to convert homeowners faster.",
    headline: "High-Trust Solar Quoting & Lead",
    highlightWord: "Conversion",
    summary:
      "A conversion-engineered web platform and lead qualification pipeline that educates homeowners, captures utility usage profiles, and routes qualified solar consultations directly into operations.",
    painPointTitle: "Generic Contact Forms Produced Unqualified Leads and Slow Follow-Up",
    painPointSummary:
      "Homeowners researching solar had high skepticism towards generic lead-gen forms, while sales reps wasted hours calling inquiries with shaded roofs, low utility bills, or out-of-territory addresses.",
    painPoints: [
      "Static brochure pages failed to explain system ownership, incentives, and realistic payback clearly.",
      "Basic 'Name & Phone' forms gave reps zero context on utility provider, average monthly bill, or roof suitability before the first call.",
      "Manual lead routing delayed initial contact, letting high-intent homeowners cool off.",
    ],
    solutionTitle: "Interactive Qualification Flow Connected Directly to the Sales Pipeline",
    solutionSummary:
      "Studio Sozo built Elevate Solar's web platform with structured multi-step qualification, transparent savings breakdowns, and instant CRM ingestion so reps enter every consultation prepared.",
    capabilitiesDelivered: [
      {
        tag: "QUALIFICATION",
        title: "Guided Utility & Property Intake Funnel",
        description:
          "Captures utility provider, monthly usage tier, roof profile, and timeline in a fast, mobile-friendly interactive flow.",
      },
      {
        tag: "AUTOMATION",
        title: "Instant Lead Scoring & Rep Dispatch",
        description:
          "Routes qualified homeowners to the right territory specialist with immediate SMS/email confirmation.",
      },
      {
        tag: "TRUST ARCHITECTURE",
        title: "Transparent Process & Incentive Breakdowns",
        description:
          "Clear visual walkthroughs of engineering, permitting, installation, and federal/regional tax incentives.",
      },
      {
        tag: "SEO & SPEED",
        title: "Regional Search Visibility & Sub-Second Load",
        description:
          "Server-rendered architecture optimized for local solar search intent and top Core Web Vitals.",
      },
    ],
    metrics: [
      { value: "24/7", label: "Automated Lead Qualification" },
      { value: "<1s", label: "Interactive Page Response" },
      { value: "Direct", label: "CRM Pipeline Sync" },
    ],
    serviceSlugs: [
      "web-applications",
      "crm-and-business-systems",
      "systems-integration",
    ],
  },
  {
    slug: "hr-hvac",
    title: "HR Heating & Cooling",
    clientType: "Regional HVAC Service & Installation",
    industry: "HVAC & Field Service",
    badgeUrl: "[ HR HVAC // SERVICE BOOKING & DISPATCH WEB APP ]",
    image: "/projects/hr-hvac.jpg",
    seoTitle:
      "HR Heating & Cooling Case Study | HVAC Service Booking & Dispatch Web Application",
    seoDescription:
      "How Studio Sozo built HR Heating & Cooling's online service booking, emergency triage, and dispatch web platform.",
    headline: "Frictionless HVAC Service Booking &",
    highlightWord: "Dispatch",
    summary:
      "A modern service booking and dispatch web application for HR Heating & Cooling that turns emergency AC/heating searches into triaged, scheduled service calls without phone tag.",
    painPointTitle: "Peak-Season Phone Bottlenecks Cost Emergency Service Jobs",
    painPointSummary:
      "During summer heatwaves and winter freezes, homeowners with broken HVAC systems want immediate confirmation—if a phone line is busy or a form goes unanswered, they call the next contractor on Google.",
    painPoints: [
      "Office staff were overwhelmed fielding repetitive phone questions during peak weather spikes.",
      "Standard contact forms didn't distinguish between an urgent no-cool emergency, a routine tune-up, or a full system replacement quote.",
      "Technicians arrived on site without unit symptoms, equipment age, or access notes.",
    ],
    solutionTitle: "Self-Serve Symptom Triage & Priority Dispatch Scheduling",
    solutionSummary:
      "Studio Sozo engineered a fast, mobile-first HVAC web platform with structured symptom intake, emergency vs. maintenance routing, transparent service coverage, and instant dispatch notifications.",
    capabilitiesDelivered: [
      {
        tag: "BOOKING ENGINE",
        title: "Symptom-Based Service & Emergency Triage",
        description:
          "Captures system type, issue severity, preferred arrival windows, and property details in under 60 seconds.",
      },
      {
        tag: "DISPATCH SYNC",
        title: "Instant Office & On-Call Tech Alerts",
        description:
          "Prioritizes urgent no-heat/no-cool calls and delivers complete job briefs straight to dispatch.",
      },
      {
        tag: "LOCAL SEO",
        title: "Service-Area & Seasonal System Pages",
        description:
          "Structured service and city coverage engineered to capture high-intent local HVAC searches.",
      },
      {
        tag: "CONVERSION",
        title: "Financing, Maintenance Plans & Replacement Flows",
        description:
          "Dedicated pathways for preventative maintenance memberships and new unit install estimates.",
      },
    ],
    metrics: [
      { value: "<60s", label: "Mobile Emergency Booking Flow" },
      { value: "24/7", label: "Automated Call Triage" },
      { value: "100%", label: "Pre-Arrival Symptom Context" },
    ],
    serviceSlugs: [
      "web-applications",
      "ai-and-automation",
      "systems-integration",
    ],
  },
  {
    slug: "dash-lake-rentals",
    title: "Dash Lake Rentals",
    clientType: "Watercraft & Fleet Rental Operator",
    industry: "On-Demand Rentals & Booking",
    badgeUrl: "[ DASH // ON-DEMAND WATERCRAFT RENTAL & BOOKING ]",
    image: "/projects/dash-lake-rentals.jpg",
    seoTitle:
      "Dash Lake Rentals Case Study | On-Demand Watercraft Booking & Fleet Management",
    seoDescription:
      "How Studio Sozo engineered Dash Lake Rentals—an on-demand watercraft reservation, fleet availability, digital waiver, and checkout platform.",
    headline: "On-Demand Watercraft Fleet Booking &",
    highlightWord: "Checkout",
    summary:
      "A real-time reservation, fleet availability, digital waiver, and payment platform that lets lake visitors book watercraft on their phone while giving operators total control over fleet turnarounds.",
    painPointTitle: "Manual Phone Reservations & Double-Booked Fleet Inventory",
    painPointSummary:
      "Managing multi-hour and multi-day watercraft rentals by phone, text, and paper waivers created dockside bottlenecks, double-bookings, and lost weekend revenue.",
    painPoints: [
      "Customers wanted to see live boat/jet-ski availability and book instantly on mobile without waiting for a callback.",
      "Third-party rental widgets charged steep per-booking commissions and couldn't handle custom time slots, fuel policies, or add-on gear.",
      "Dock staff wasted peak launch hours collecting paper waivers, IDs, and security deposits.",
    ],
    solutionTitle: "Live Fleet Inventory, Digital Waivers, and Zero-Commission Checkout",
    solutionSummary:
      "Studio Sozo built a custom reservation and fleet management web application where guests select dates, watercraft, and add-ons with instant checkout—while staff manage launches and returns from a live dock dashboard.",
    capabilitiesDelivered: [
      {
        tag: "RESERVATIONS",
        title: "Real-Time Fleet Availability & Slot Locking",
        description:
          "Prevents double-bookings across half-day, full-day, and multi-day slots with automatic turnaround buffers.",
      },
      {
        tag: "CHECKOUT",
        title: "Zero-Commission Stripe Deposits & Add-Ons",
        description:
          "Handles rental fees, damage deposits, tube/gear add-ons, and automated receipts with zero marketplace cut.",
      },
      {
        tag: "COMPLIANCE",
        title: "Pre-Arrival Digital Waivers & Boater Checklists",
        description:
          "Guests sign waivers and upload driver documentation on their phone before arriving at the dock.",
      },
      {
        tag: "OPS DASHBOARD",
        title: "Dockside Launch, Return & Maintenance Tracker",
        description:
          "Gives crew a live view of departing reservations, return inspections, and units out for maintenance.",
      },
    ],
    metrics: [
      { value: "0%", label: "Third-Party Booking Commissions" },
      { value: "Live", label: "Real-Time Fleet Inventory" },
      { value: "100%", label: "Digital Pre-Arrival Check-In" },
    ],
    serviceSlugs: [
      "web-applications",
      "custom-software-development",
      "mobile-app-development",
    ],
  },
  {
    slug: "serene-commerce",
    title: "Serene",
    clientType: "Direct-to-Consumer Brand",
    industry: "Custom Digital Commerce",
    badgeUrl: "[ SERENE // CUSTOM DIGITAL COMMERCE EXPERIENCE ]",
    image: "/projects/serene-commerce.jpg",
    seoTitle:
      "Serene Case Study | Custom Headless Digital Commerce & Brand Experience",
    seoDescription:
      "How Studio Sozo designed and engineered Serene—a fast, editorial digital commerce platform built for storytelling and conversion.",
    headline: "Editorial Digital Commerce Built to",
    highlightWord: "Convert",
    summary:
      "A bespoke digital commerce platform that pairs high-craft visual storytelling with sub-second product discovery, curated bundling, and a frictionless checkout flow.",
    painPointTitle: "Cookie-Cutter Storefront Templates Diluted Brand Trust and Speed",
    painPointSummary:
      "Standard e-commerce themes forced the brand into a generic grid layout while third-party upsell and review apps slowed mobile page loads to a crawl.",
    painPoints: [
      "Heavy off-the-shelf themes and 15+ injected script tags hurt mobile conversion rates and Core Web Vitals.",
      "Rigid product templates couldn't support guided product pairing, routine builders, or editorial storytelling.",
      "Checkout friction and slow cart drawers caused avoidable mobile abandonment.",
    ],
    solutionTitle: "Bespoke Storefront Architecture with Instant Cart & Guided Discovery",
    solutionSummary:
      "Studio Sozo engineered a custom, lightweight commerce experience with instant page transitions, native bundle logic, and clean inventory/order synchronization.",
    capabilitiesDelivered: [
      {
        tag: "STOREFRONT",
        title: "Sub-Second Product Discovery & Editorial Layouts",
        description:
          "Custom component architecture that blends rich brand storytelling with immediate add-to-cart actions.",
      },
      {
        tag: "CONVERSION",
        title: "Native Bundle Builder & Instant Cart Drawer",
        description:
          "Zero-lag cart state, tier thresholds, and curated product pairings built natively without bloated plugins.",
      },
      {
        tag: "INTEGRATION",
        title: "Automated Order, Inventory & Fulfillment Sync",
        description:
          "Real-time webhook synchronization between storefront orders, payment processing, and warehouse fulfillment.",
      },
      {
        tag: "SEO",
        title: "Product Schema & High Core Web Vitals",
        description:
          "Structured Product JSON-LD, optimized media delivery, and clean semantic markup for organic acquisition.",
      },
    ],
    metrics: [
      { value: "Sub-1s", label: "Storefront Route Transitions" },
      { value: "0", label: "Bloated Third-Party Theme Scripts" },
      { value: "Native", label: "Bundle & Cart Engine" },
    ],
    serviceSlugs: [
      "web-applications",
      "systems-integration",
      "custom-software-development",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((study) => study.slug === slug);
}
