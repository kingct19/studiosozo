export interface ServicePainPoint {
  code: string;
  title: string;
  symptom: string;
  rootCause: string;
}

export interface WorkflowComparison {
  beforeTitle: string;
  beforeSteps: string[];
  afterTitle: string;
  afterSteps: string[];
}

export interface ServiceDeliverable {
  tag: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  highlightWord: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  leadBold: string;
  leadBody: string;
  idealFor: string[];
  painPoints: ServicePainPoint[];
  comparison: WorkflowComparison;
  deliverables: ServiceDeliverable[];
  architectureHighlights: string[];
  relatedCaseStudies: string[];
  faqs: ServiceFaq[];
}

export const SERVICE_PAIN_DIAGNOSTICS = [
  {
    code: "PAIN // 01",
    bottleneck: "Spreadsheet & Tab Chaos",
    symptom:
      "Critical quotes, job statuses, and customer history live across 14 Google Sheets, text threads, and disconnected SaaS tabs.",
    solution:
      "One unified system of record engineered around your exact team roles, approval gates, and daily operations.",
  },
  {
    code: "PAIN // 02",
    bottleneck: "Per-Seat SaaS Tax & Feature Bloat",
    symptom:
      "You pay thousands every month for enterprise software where your team only uses 15% of the features—and still needs workarounds.",
    solution:
      "100% owned custom software with zero per-seat licensing penalties and every screen built for how your people actually work.",
  },
  {
    code: "PAIN // 03",
    bottleneck: "Manual Double-Entry & Human Error",
    symptom:
      "Office staff copy-paste data from intake forms into the CRM, then into scheduling, then into invoicing—dropping details at every handoff.",
    solution:
      "Automated event-driven pipelines and direct API integrations that sync data across sales, field ops, and accounting in real time.",
  },
  {
    code: "PAIN // 04",
    bottleneck: "Blind Spots Between Field & Office",
    symptom:
      "Leadership cannot see real-time margin, technician capacity, or pipeline velocity without asking someone to pull a manual report.",
    solution:
      "Live operational dashboards, mobile field apps, and automated alerts that surface exceptions before they cost money.",
  },
] as const;

export const servicesData: ServiceDetail[] = [
  {
    slug: "custom-software-development",
    number: "01",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    eyebrow: "CAPABILITY // 01 — BESPOKE PLATFORMS",
    headline: "Custom Software Built Around How You",
    highlightWord: "Operate",
    seoTitle:
      "Custom Software Development | Replace Disconnected Tools with Software You Own",
    seoDescription:
      "Studio Sozo designs and builds custom business software that replaces spreadsheets and rigid SaaS tools. 100% client ownership across Louisiana, Texas, Missouri, and nationwide.",
    summary:
      "Bespoke platforms built around business processes rather than rigid off-the-shelf templates.",
    leadBold:
      "Off-the-shelf software forces your business to bend to someone else's template.",
    leadBody:
      "We architect and engineer proprietary software systems tailored to your exact workflows, pricing rules, and team permissions—giving you a durable operational advantage you own outright.",
    idealFor: [
      "Companies outgrowing spreadsheets and cobbled-together SaaS tools",
      "Operations with proprietary quoting, dispatch, or fulfillment logic",
      "Leadership teams tired of paying rising per-seat licensing fees",
      "Businesses building a flagship software product or customer portal",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "Forcing Unique Workflows into Rigid Templates",
        symptom:
          "Your team maintains side-spreadsheets and sticky notes because your current software cannot represent your actual pricing, stages, or approvals.",
        rootCause:
          "Generic SaaS platforms are built for the lowest common denominator across thousands of unrelated businesses.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Runaway Per-User Licensing Costs",
        symptom:
          "Adding field techs, contractors, or support staff triggers expensive tier upgrades, so people share logins or work outside the system.",
        rootCause:
          "Rented software monetizes headcount growth rather than operational value.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "No Control Over Roadmap or Data",
        symptom:
          "When a vendor changes their UI, deprecates a feature, or locks exports behind an enterprise plan, your operations stall.",
        rootCause:
          "You are renting access to a black box instead of owning your core operational infrastructure.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // FRAGMENTED RENTED STACK",
      beforeSteps: [
        "Intake happens in forms or email threads with no validation",
        "Staff re-type customer data into a rigid SaaS tool and a separate spreadsheet",
        "Approvals and handoffs happen over Slack, SMS, or hallway conversations",
        "Reporting requires exporting CSVs and cleaning rows manually every Friday",
      ],
      afterTitle: "AFTER // UNIFIED STUDIO SOZO PLATFORM",
      afterSteps: [
        "Structured intake validates rules, pricing, and availability automatically",
        "One shared database powers sales, operations, fulfillment, and billing",
        "Role-based queues and automated state transitions keep every job moving",
        "Live executive dashboards show real-time margin, velocity, and bottlenecks",
      ],
    },
    deliverables: [
      {
        tag: "ARCHITECTURE",
        title: "Domain-Modeled Database & API Core",
        description:
          "PostgreSQL schema, strict TypeScript domain logic, and audit-logged state machines modeled around your real business entities.",
      },
      {
        tag: "INTERFACE",
        title: "Role-Specific Operator Workspaces",
        description:
          "Fast, keyboard-friendly interfaces tailored to sales reps, dispatchers, technicians, and executives—with zero clutter.",
      },
      {
        tag: "SECURITY",
        title: "Granular Permissions & Audit Trails",
        description:
          "Role-based access control, secure authentication, and complete change history so you always know who approved what and when.",
      },
      {
        tag: "OWNERSHIP",
        title: "Full Source Code & Cloud Infrastructure Handover",
        description:
          "Deployed to your own cloud accounts with automated CI/CD, backups, and zero vendor lock-in or per-seat fees.",
      },
    ],
    architectureHighlights: [
      "Next.js & TypeScript full-stack application architecture",
      "Relational Postgres data modeling with row-level security",
      "Automated background jobs, webhooks, and PDF/document generation",
      "100% IP and repository ownership transferred to your company",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "angler-iq"],
    faqs: [
      {
        question: "Do we actually own the source code and IP?",
        answer:
          "Yes—100%. Unlike SaaS vendors or agencies that hold your platform hostage on proprietary frameworks, Studio Sozo builds on clean, industry-standard stacks and transfers full repository, database, and cloud ownership to your business.",
      },
      {
        question: "How long does a custom software build take?",
        answer:
          "Most production v1 systems launch in 6 to 12 weeks. We start by shipping the highest-leverage core workflow first so your team sees immediate relief, then iterate in structured milestones.",
      },
      {
        question: "Can our custom platform connect to QuickBooks, Stripe, or existing tools?",
        answer:
          "Absolutely. We keep the third-party systems that work well—like Stripe for payments or QuickBooks for accounting—and integrate them directly via webhooks and APIs so your team works inside one unified interface.",
      },
    ],
  },
  {
    slug: "crm-and-business-systems",
    number: "02",
    title: "CRM & Business Systems",
    shortTitle: "CRM & Operations",
    eyebrow: "CAPABILITY // 02 — OPERATIONAL CRMS & ERPS",
    headline: "Custom CRMs & Operational Systems Built for",
    highlightWord: "Velocity",
    seoTitle:
      "Custom CRM Development & Business Systems | Replace Bloated Off-the-Shelf CRMs",
    seoDescription:
      "Custom CRM, quoting, dispatch, and operational management platforms engineered around how your sales and delivery teams actually work.",
    summary:
      "Custom CRMs, dashboards, and operational management platforms tailored to how your team works.",
    leadBold:
      "Most CRMs are built for generic software sales—not businesses that quote, schedule, dispatch, and fulfill real work.",
    leadBody:
      "We build custom CRMs and operational back-offices that connect lead capture, complex quoting, project handoff, field execution, and customer communication in a single seamless pipeline.",
    idealFor: [
      "Solar, HVAC, construction, and home-service operations",
      "B2B and service companies with multi-step quoting or underwriting",
      "Teams frustrated by HubSpot, Salesforce, or ServiceTitan complexity and cost",
      "Multi-location businesses needing unified pipeline and job visibility",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "The Sales-to-Operations Handoff Gap",
        symptom:
          "Sales closes a deal in the CRM, and operations has to re-collect site photos, specs, and contract terms to actually deliver the job.",
        rootCause:
          "Standard CRMs stop at 'Closed Won' and have no concept of your fulfillment, permitting, or installation workflow.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Low Rep Adoption Due to Cluttered Screens",
        symptom:
          "Sales reps hate logging activity because every update requires clicking through 40 irrelevant fields and slow modal popups.",
        rootCause:
          "Bloated enterprise CRMs are overloaded with generic tabs instead of a focused pipeline tailored to your sales motion.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "Slow, Inaccurate Quoting & Proposals",
        symptom:
          "Estimators spend hours building quotes in spreadsheets, risking margin errors and losing deals to faster competitors.",
        rootCause:
          "Pricing formulas, equipment catalogs, and financing options are not built into the CRM.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // BLOATED GENERIC CRM",
      beforeSteps: [
        "Leads sit untouched because routing and follow-up reminders are manual",
        "Reps calculate quotes in an external Excel sheet and attach a static PDF",
        "Closed deals are emailed to ops, who create a duplicate record in a project tool",
        "Leadership has no accurate view of true job profitability vs. original estimate",
      ],
      afterTitle: "AFTER // CUSTOM STUDIO SOZO CRM",
      afterSteps: [
        "Instant lead ingestion, automated SMS/email speed-to-lead, and smart territory routing",
        "Interactive quoting engine with live margin guardrails and one-click e-signature",
        "Closing a deal automatically provisions the job board, crew tasks, and customer portal",
        "Real-time pipeline, commission tracking, and job-costing analytics in one view",
      ],
    },
    deliverables: [
      {
        tag: "PIPELINE",
        title: "Custom Lead-to-Cash Pipeline Engine",
        description:
          "Stages, required checklists, and automated triggers that match your exact sales and delivery lifecycle.",
      },
      {
        tag: "QUOTING",
        title: "Built-In Estimator & Proposal Generator",
        description:
          "Configure products, labor, financing, and add-ons with instant PDF/web proposals and embedded acceptance.",
      },
      {
        tag: "OPERATIONS",
        title: "Dispatch, Scheduling & Crew Portals",
        description:
          "Assign technicians, track site checklists, upload field photos, and trigger automated customer status updates.",
      },
      {
        tag: "REPORTING",
        title: "Executive Revenue & Rep Performance Dashboards",
        description:
          "Track close rates, lead source ROI, cycle times, commissions, and gross margin per job in real time.",
      },
    ],
    architectureHighlights: [
      "Unified data model spanning leads, quotes, jobs, invoices, and equipment",
      "Twilio SMS/voice, email, and calendar sync built directly into contact timelines",
      "Automated commission calculation and role-scoped rep views",
      "Zero per-seat CRM licensing fees as your sales and field teams scale",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "hr-hvac"],
    faqs: [
      {
        question: "Why build a custom CRM instead of customizing Salesforce or HubSpot?",
        answer:
          "Customizing enterprise CRMs often costs as much in consultants and add-on subscriptions as building a custom platform—yet you still pay steep monthly per-seat fees forever and fight their rigid data model. With a custom CRM, every screen is fast, purpose-built, and owned by you.",
      },
      {
        question: "Can you migrate our existing contacts, deals, and historical notes?",
        answer:
          "Yes. We build deterministic migration scripts that clean, deduplicate, and import your historical accounts, contacts, pipeline history, and attachments with zero downtime.",
      },
      {
        question: "Can customers log in to see their project or order status?",
        answer:
          "Yes. Because the CRM and customer portal share the same underlying database, you can expose real-time project milestones, documents, and payment links to customers automatically.",
      },
    ],
  },
  {
    slug: "ai-and-automation",
    number: "03",
    title: "AI & Automation",
    shortTitle: "AI & Automation",
    eyebrow: "CAPABILITY // 03 — INTELLIGENT WORKFLOWS",
    headline: "Eliminate Manual Busywork with Practical",
    highlightWord: "AI Automation",
    seoTitle:
      "AI & Workflow Automation Development | Eliminate Manual Data Entry & Busywork",
    seoDescription:
      "Practical AI agents, document extraction, and workflow automation engineered to eliminate repetitive admin work and speed up operations.",
    summary:
      "Automate repetitive processes, eliminate manual data entry, and connect intelligent workflows.",
    leadBold:
      "Your highest-paid people shouldn't spend hours copying data, triaging inbox requests, or chasing status updates.",
    leadBody:
      "We engineer production-grade AI workflows and deterministic automations that read documents, qualify inbound requests, draft responses, and trigger actions across your software stack—with human-in-the-loop guardrails where they matter.",
    idealFor: [
      "Teams buried in PDFs, invoices, utility bills, or intake documents",
      "Service businesses needing instant 24/7 lead qualification and booking",
      "Operations relying on fragile Zapier chains that break silently",
      "Companies wanting domain-specific AI assistants grounded in their own data",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "Hours Lost to Manual Document & Email Triage",
        symptom:
          "Staff open attachments, read utility bills or work orders, and manually key fields into your database one record at a time.",
        rootCause:
          "Unstructured inputs (emails, PDFs, photos, voice notes) aren't connected to structured operational pipelines.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Fragile No-Code Zapier Spaghetti",
        symptom:
          "You have dozens of multi-step Zaps that fail silently on edge cases, hit rate limits, and nobody knows how to debug.",
        rootCause:
          "Critical business logic outgrew glue-tools and needs code-level retries, validation, and observability.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "Slow Response Times to Inbound Leads & Customers",
        symptom:
          "After-hours inquiries wait until the next morning, costing you high-intent bookings to competitors who respond first.",
        rootCause:
          "Lead qualification, FAQ handling, and appointment slot lookup depend entirely on manual human availability.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // MANUAL ADMIN & FRAGILE ZAPS",
      beforeSteps: [
        "Coordinator downloads PDFs and types line items into the system by hand",
        "Inbound leads wait hours for a call back to confirm basic service eligibility",
        "Broken webhook or Zapier task drops records with no alert or retry queue",
        "Team searches across folders and chats to answer routine policy questions",
      ],
      afterTitle: "AFTER // ENGINEERED AI & WORKFLOW PIPELINE",
      afterSteps: [
        "AI vision & document pipelines extract, validate, and populate records in seconds",
        "Instant AI intake qualifies scope, checks territory, and books the calendar 24/7",
        "Durable background workflows with dead-letter queues, audit logs, and retries",
        "Domain-grounded AI copilot surfaces exact answers from your SOPs and live database",
      ],
    },
    deliverables: [
      {
        tag: "EXTRACTION",
        title: "Automated Document, PDF & Image Ingestion",
        description:
          "Structured extraction from invoices, contracts, utility bills, and field photos directly into validated database records.",
      },
      {
        tag: "AGENTS",
        title: "Customer-Facing & Internal AI Copilots",
        description:
          "RAG-powered assistants and tool-calling agents grounded in your real inventory, pricing, and company knowledge base.",
      },
      {
        tag: "ORCHESTRATION",
        title: "Durable Event-Driven Workflow Engine",
        description:
          "Code-level automations with schema validation, automatic retries, human approval gates, and error alerting.",
      },
      {
        tag: "COMMUNICATION",
        title: "Automated SMS, Email & Voice Follow-Up",
        description:
          "Intelligent speed-to-lead, appointment reminders, and status notifications triggered by real operational events.",
      },
    ],
    architectureHighlights: [
      "Structured LLM outputs with strict Zod schema validation",
      "Retrieval-Augmented Generation (RAG) over your private operational data",
      "Human-in-the-loop confidence thresholds for high-stakes approvals",
      "Full token-cost monitoring, evaluation guardrails, and audit logging",
    ],
    relatedCaseStudies: ["angler-iq", "sozo-crm", "elevate-solar"],
    faqs: [
      {
        question: "How do you prevent AI hallucinations in business-critical workflows?",
        answer:
          "We never let an LLM free-wheel on critical data. We combine deterministic code rules, strict JSON schema validation, citations against your database, and confidence thresholds that route uncertain items to a fast human approval queue.",
      },
      {
        question: "Is our company data used to train public AI models?",
        answer:
          "No. We use enterprise API endpoints with zero data retention policies so your proprietary business data, customer records, and documents are never used to train third-party models.",
      },
      {
        question: "Can you replace our expensive Zapier or Make workflows?",
        answer:
          "Yes. We regularly consolidate dozens of brittle no-code Zaps into a single version-controlled, observable workflow service with proper error handling and zero per-task surcharges.",
      },
    ],
  },
  {
    slug: "web-applications",
    number: "04",
    title: "Web Applications",
    shortTitle: "Web Applications",
    eyebrow: "CAPABILITY // 04 — SCALABLE WEB PLATFORMS",
    headline: "High-Performance Web Applications That Convert &",
    highlightWord: "Scale",
    seoTitle:
      "Custom Web Application Development | Customer Portals, Booking & SaaS Platforms",
    seoDescription:
      "Modern, fast web applications engineered by Studio Sozo—from self-serve booking and commerce platforms to customer portals and B2B SaaS products.",
    summary:
      "Modern, scalable web-based platforms for internal teams, partners, and customers.",
    leadBold:
      "When customers or partners interact with your business online, slow templates and clunky portals erode trust.",
    leadBody:
      "We build blazing-fast, responsive web applications—from interactive booking and rental engines to customer self-service portals and full SaaS products—engineered for conversion, SEO, and operational reliability.",
    idealFor: [
      "Businesses needing custom booking, scheduling, or rental checkout flows",
      "Companies launching a customer or partner self-service portal",
      "Founders and operators building a commercial SaaS or marketplace platform",
      "Brands outgrowing Shopify/WordPress plugins with custom pricing or logic",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "High Drop-Off in Clunky Booking or Checkout Flows",
        symptom:
          "Customers abandon forms or call your office because your current website cannot show real-time availability, instant pricing, or smooth checkout.",
        rootCause:
          "Bolted-on third-party widgets and iframe embeds feel slow, disconnected, and frustrating on mobile.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Support Inbox Flooded with 'Where Is My Order/Job?'",
        symptom:
          "Your team spends hours every day answering status calls, resending invoices, and collecting updated documents.",
        rootCause:
          "Customers have no self-service portal to view status, sign agreements, upload files, or pay balances.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "Plugin Bloat & Poor Core Web Vitals",
        symptom:
          "Your site loads slowly, ranks poorly in search, and breaks whenever a theme or plugin updates.",
        rootCause:
          "Template builders and plugin stacks add megabytes of blocking scripts instead of clean, server-rendered code.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // TEMPLATE + WIDGET PATCHWORK",
      beforeSteps: [
        "Slow third-party booking iframe that doesn't match your brand or pricing rules",
        "Customers submit a 'Request a Quote' form and wait 24 hours for a manual reply",
        "Staff manually email PDF waivers, invoices, and payment links back and forth",
        "Poor technical SEO structure and sluggish mobile performance hurt organic growth",
      ],
      afterTitle: "AFTER // CUSTOM STUDIO SOZO WEB APPLICATION",
      afterSteps: [
        "Native, sub-second interactive booking, configuration, or checkout experience",
        "Real-time inventory, dynamic pricing, waivers, and Stripe payments in one flow",
        "Authenticated customer portal with live status tracking, documents, and messaging",
        "Server-rendered Next.js architecture with structured schema and top Core Web Vitals",
      ],
    },
    deliverables: [
      {
        tag: "EXPERIENCE",
        title: "Conversion-Engineered Customer Interfaces",
        description:
          "Mobile-first, accessible web apps with instant feedback, clear pricing breakdowns, and frictionless checkout.",
      },
      {
        tag: "PORTALS",
        title: "Authenticated Client & Partner Portals",
        description:
          "Secure logins where customers view live project stages, download deliverables, sign agreements, and pay invoices.",
      },
      {
        tag: "COMMERCE",
        title: "Booking, Rental & Custom Checkout Engines",
        description:
          "Date/time slot inventory, fleet or resource scheduling, deposits, damage waivers, and automated confirmations.",
      },
      {
        tag: "SEO & SPEED",
        title: "Technical SEO & Sub-Second Edge Delivery",
        description:
          "Semantic HTML, dynamic sitemaps, JSON-LD structured data, OpenGraph assets, and optimized Core Web Vitals.",
      },
    ],
    architectureHighlights: [
      "Next.js App Router with Server Components and streaming rendering",
      "Stripe payments, subscriptions, deposits, and automated invoicing",
      "Real-time availability, booking locks, and calendar synchronization",
      "Built-in analytics, conversion tracking, and SEO metadata architecture",
    ],
    relatedCaseStudies: ["dash-lake-rentals", "hr-hvac", "serene-commerce"],
    faqs: [
      {
        question: "How is a custom web application different from a standard marketing website?",
        answer:
          "A marketing website is primarily static pages. A web application has live business logic, databases, user authentication, interactive quoting or booking, payment processing, and direct integration with your internal operations.",
      },
      {
        question: "Will our web application rank well on Google?",
        answer:
          "Yes. We engineer every public-facing route with server-side rendering, clean URL hierarchies, canonical tags, JSON-LD schema markup, and fast Core Web Vitals so search engines can crawl and rank your pages effectively.",
      },
      {
        question: "Can our team update content without needing a developer?",
        answer:
          "Yes. We build clean admin dashboards and structured content controls so your team can update pricing, availability, photos, FAQs, and promotions in seconds.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    number: "05",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    eyebrow: "CAPABILITY // 05 — IOS & ANDROID PLATFORMS",
    headline: "Native-Grade Mobile Apps for Field Teams &",
    highlightWord: "Customers",
    seoTitle:
      "Mobile App Development (iOS & Android) | Field Operations & Consumer Mobile Products",
    seoDescription:
      "Studio Sozo designs and builds iOS and Android mobile applications for field service crews, inspections, and consumer products.",
    summary:
      "iOS and Android applications that extend your operations into the field and to your customers.",
    leadBold:
      "Real work happens on job sites, on the water, and in the field—not sitting behind a desktop monitor.",
    leadBody:
      "We engineer iOS and Android applications that put your core system in the pocket of every technician, inspector, or customer—with offline resilience, GPS/camera workflows, push notifications, and instant sync back to headquarters.",
    idealFor: [
      "Field service, installation, and inspection teams working on-site",
      "Founders launching an AI-enabled consumer or prosumer mobile product",
      "Logistics, fleet, and equipment rental operations",
      "Businesses needing push notifications, camera capture, or GPS workflows",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "Field Crews Texting Photos & Paper Notes to the Office",
        symptom:
          "Technicians text job-site photos into group chats and fill out paper checklists at the end of the day, losing critical documentation.",
        rootCause:
          "Desktop web tools are too clumsy to use on a phone in the sun with one hand.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Apps That Break in Low-Signal Areas",
        symptom:
          "When crews work in basements, rural sites, or on the water, web forms time out and lose 20 minutes of inspection data.",
        rootCause:
          "Lack of local-first storage and background sync queues when connectivity drops.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "Maintaining Separate iOS, Android, and Web Codebases",
        symptom:
          "Features take twice as long to ship and behave differently on iPhone, Android, and desktop.",
        rootCause:
          "Fragmented engineering stacks without shared API contracts and unified design systems.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // GROUP TEXTS & CLIPBOARDS",
      beforeSteps: [
        "Crews screenshot daily schedules or call dispatch for job addresses",
        "Site photos sit on personal camera rolls and never make it into the customer file",
        "Offline or rural job sites cause form submissions to fail and disappear",
        "Office staff spend evenings chasing techs for time logs and completion notes",
      ],
      afterTitle: "AFTER // STUDIO SOZO MOBILE APPLICATION",
      afterSteps: [
        "One-tap daily route, job brief, equipment checklist, and turn-by-turn navigation",
        "Guided photo capture, voice-to-note logging, and on-glass customer signatures",
        "Offline-capable local queue that syncs automatically the moment signal returns",
        "Instant push notifications and live job status synced directly to your central CRM",
      ],
    },
    deliverables: [
      {
        tag: "IOS & ANDROID",
        title: "Cross-Platform Native Mobile Apps",
        description:
          "Single-codebase iOS and Android apps with smooth 60fps navigation, native gestures, and biometric sign-in.",
      },
      {
        tag: "FIELD OPS",
        title: "Offline-First Checklists, Camera & GPS Workflows",
        description:
          "Capture geotagged photos, barcode scans, audio notes, and structured inspections even with spotty reception.",
      },
      {
        tag: "ENGAGEMENT",
        title: "Push Notifications & In-App Subscriptions",
        description:
          "Real-time dispatch alerts, status updates, and App Store / Google Play billing for commercial apps.",
      },
      {
        tag: "RELEASE",
        title: "App Store & Google Play Submission Pipeline",
        description:
          "End-to-end provisioning, review compliance, over-the-air updates, and crash telemetry.",
      },
    ],
    architectureHighlights: [
      "Shared TypeScript domain models across mobile app, web dashboard, and API",
      "Offline-resilient state persistence and automatic background media upload",
      "Camera, GPS location, push notification, and AI vision/voice integrations",
      "Full App Store Connect and Google Play Console ownership under your account",
    ],
    relatedCaseStudies: ["angler-iq", "dash-lake-rentals", "sozo-crm"],
    faqs: [
      {
        question: "Do you build for both iPhone (iOS) and Android?",
        answer:
          "Yes. We engineer unified cross-platform mobile applications that ship natively to both the Apple App Store and Google Play Store from a single shared codebase, cutting development and maintenance costs in half.",
      },
      {
        question: "Does the mobile app connect to our web dashboard in real time?",
        answer:
          "Yes. Your mobile app and web management portal talk to the exact same backend database and API, so a photo or status update logged in the field appears on the office dashboard immediately.",
      },
      {
        question: "Do you handle App Store and Google Play approval?",
        answer:
          "Yes. We configure your Apple Developer and Google Play accounts, prepare store assets and privacy disclosures, and manage the submission and review process through launch.",
      },
    ],
  },
  {
    slug: "systems-integration",
    number: "06",
    title: "Systems Integration",
    shortTitle: "Systems Integration",
    eyebrow: "CAPABILITY // 06 — UNIFIED DATA & APIS",
    headline: "Connect Every Tool into One Reliable",
    highlightWord: "Data Flow",
    seoTitle:
      "Systems Integration & API Development | Connect CRM, ERP, Accounting & Field Tools",
    seoDescription:
      "Studio Sozo connects disconnected software, accounting platforms, payment processors, and legacy databases into one reliable real-time flow.",
    summary:
      "Connect existing software, APIs, accounting platforms, and business tools into one reliable flow.",
    leadBold:
      "You don't always need to rip and replace every tool—sometimes your biggest bottleneck is that your systems refuse to talk to each other.",
    leadBody:
      "We build rock-solid API bridges, webhook pipelines, and unified data layers that keep your CRM, accounting software, payment processor, inventory, and field tools continuously synchronized without manual CSV exports.",
    idealFor: [
      "Companies re-keying invoices between operations software and QuickBooks/Xero",
      "Businesses with mismatched customer or inventory counts across platforms",
      "Teams needing a unified executive dashboard across multiple data sources",
      "Organizations modernizing legacy databases without disrupting daily work",
    ],
    painPoints: [
      {
        code: "BOTTLENECK // 01",
        title: "Double & Triple Data Entry Across Departments",
        symptom:
          "Sales enters the customer in one tool, ops creates the job in another, and accounting re-types the invoice in QuickBooks.",
        rootCause:
          "No shared customer/job identifier or automated two-way sync between departmental tools.",
      },
      {
        code: "BOTTLENECK // 02",
        title: "Conflicting Numbers & 'Which Report Is Right?'",
        symptom:
          "The CRM says one revenue number, Stripe says another, and accounting reconciliations take days at month-end.",
        rootCause:
          "Point-to-point scripts lack idempotency, reconciliation logs, and a single source of truth.",
      },
      {
        code: "BOTTLENECK // 03",
        title: "Vendor APIs With Rate Limits & Missing Features",
        symptom:
          "Off-the-shelf connectors sync only 3 basic fields and fail whenever custom fields, line items, or refunds are involved.",
        rootCause:
          "Generic connectors aren't built for your custom fields, tax rules, or multi-entity accounting structure.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // SILOED SOFTWARE & CSV EXPORTS",
      beforeSteps: [
        "Bookkeeper manually copies completed jobs into QuickBooks every week",
        "Failed payments or refunds in Stripe aren't reflected in the operational portal",
        "Inventory or calendar availability drifts out of sync across channels",
        "No audit log when a sync fails—issues are only discovered when a customer complains",
      ],
      afterTitle: "AFTER // ENGINEERED INTEGRATION LAYER",
      afterSteps: [
        "Two-way webhook and API sync creates customers, invoices, and payments automatically",
        "Idempotent event queues guarantee every transaction is processed exactly once",
        "Central data warehouse and sync health monitor with instant Slack/email alerts",
        "Every tool in your business reflects the exact same customer and job state in real time",
      ],
    },
    deliverables: [
      {
        tag: "CONNECTORS",
        title: "Custom Two-Way API & Webhook Bridges",
        description:
          "Direct integrations with QuickBooks, Stripe, Twilio, HubSpot, Google Workspace, ERP systems, and industry APIs.",
      },
      {
        tag: "RELIABILITY",
        title: "Idempotent Sync Queues & Dead-Letter Recovery",
        description:
          "Guaranteed delivery with automatic backoff retries, deduplication keys, and one-click replay if a third-party API goes down.",
      },
      {
        tag: "WAREHOUSE",
        title: "Unified Cross-System Reporting Database",
        description:
          "Mirror data from all your tools into a clean relational schema for instant cross-company KPIs and margin reporting.",
      },
      {
        tag: "OBSERVABILITY",
        title: "Sync Health Dashboard & Exception Alerts",
        description:
          "Complete visibility into every synced payload, latency metric, and validation warning so nothing ever drops silently.",
      },
    ],
    architectureHighlights: [
      "Webhook signature verification, idempotency keys, and rate-limit queuing",
      "Real-time bidirectional sync with conflict resolution rules",
      "Legacy database adapters, CSV/SFTP ingestion, and modern REST/GraphQL APIs",
      "Automated reconciliation checks between operational records and accounting ledgers",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "hr-hvac"],
    faqs: [
      {
        question: "What happens if an external API like QuickBooks or Stripe goes down temporarily?",
        answer:
          "Our integration pipelines queue every event durably with idempotency keys. If an external provider experiences an outage or rate limit, the queue automatically retries with exponential backoff and processes the backlog without losing or duplicating a single record.",
      },
      {
        question: "Can you integrate with older or industry-specific software?",
        answer:
          "Yes. Whether your existing tool has a modern REST/GraphQL API, SOAP endpoints, webhook support, direct database access, or scheduled SFTP/CSV exports, we can build a clean bridge around it.",
      },
      {
        question: "Can we start by integrating our current tools and replace them gradually later?",
        answer:
          "That is one of the smartest paths. By putting a unified database and integration layer in the middle first, you stop the manual double-entry immediately and can phase out expensive legacy tools one module at a time without disrupting operations.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((service) => service.slug === slug);
}
