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
  priceBadge: string;
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
    code: "PROBLEM // 01",
    bottleneck: "Outdated or Rented Websites",
    symptom:
      "Your current Wix, WordPress, or DIY site looks dated on phones, loads slowly, and charges monthly fees without bringing in steady leads.",
    solution:
      "A fast, custom-designed 1–5 page website ($800–$1,000) built to rank locally, capture leads, and belong 100% to your business.",
  },
  {
    code: "PROBLEM // 02",
    bottleneck: "Clunky Booking, Quoting & Customer Follow-Up",
    symptom:
      "Customers have to call or wait a day for a quote because your website cannot take bookings, deposits, or status checks online.",
    solution:
      "Custom web apps and client portals where customers book, sign, pay, and check status in seconds from any device.",
  },
  {
    code: "PROBLEM // 03",
    bottleneck: "Spreadsheet Chaos & Double Data Entry",
    symptom:
      "Your team re-types the same customer and job details across emails, Google Sheets, scheduling apps, and QuickBooks.",
    solution:
      "One clean internal dashboard and automated tool sync that connects sales, field crews, and invoicing automatically.",
  },
  {
    code: "PROBLEM // 04",
    bottleneck: "Rising Per-User Software Bills",
    symptom:
      "Off-the-shelf CRMs and SaaS tools charge hundreds or thousands every month—and raise the bill every time you hire.",
    solution:
      "Custom software built once around your exact workflow, with $0 per-seat fees forever and 100% ownership.",
  },
] as const;

export const servicesData: ServiceDetail[] = [
  {
    slug: "custom-websites",
    number: "01",
    title: "Custom Websites & Redesigns",
    shortTitle: "Custom Websites",
    priceBadge: "$800 – $1,000 • 1–2 Weeks",
    eyebrow: "SERVICE // 01 — CUSTOM WEBSITES & UPDATES ($800–$1,000)",
    headline: "Fast, Modern Business Websites You",
    highlightWord: "Own",
    seoTitle:
      "Custom Business Websites & Redesigns ($800–$1,000) | Ditch Wix & WordPress",
    seoDescription:
      "Get a custom 1–5 page business website or Wix/WordPress redesign built in 1–2 weeks for $800–$1,000. Mobile-first, local Google SEO, direct lead forms, and $0 monthly platform fees.",
    summary:
      "Fast, modern 1–5 page business websites or Wix/WordPress redesigns built to bring in leads—with $0 monthly platform fees.",
    leadBold:
      "You shouldn't have to pay monthly website rent forever or settle for a slow, cookie-cutter template.",
    leadBody:
      "Whether you need a brand-new 1–5 page website or want to replace an outdated Wix, WordPress, or Squarespace site, we design and build a sharp, mobile-first website in 1–2 weeks for $800–$1,000—and you own 100% of it.",
    idealFor: [
      "Local service businesses, contractors, clinics, and professional firms",
      "Companies replacing an outdated, slow Wix, WordPress, or Squarespace site",
      "New businesses needing a credible, lead-generating website fast (1–2 weeks)",
      "Owners tired of paying $35–$150/month forever just to keep a basic site online",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Paying Monthly Rent for a Site You Don't Own",
        symptom:
          "Website builders and agency retainers charge you every single month—and if you ever cancel, your entire website disappears.",
        rootCause:
          "Hosted page builders lock your design and content inside their proprietary subscription.",
      },
      {
        code: "PROBLEM // 02",
        title: "Slow Mobile Pages That Lose Local Customers",
        symptom:
          "Visitors click your link on their phone, wait several seconds for bloated plugins to load, and bounce to a competitor.",
        rootCause:
          "Heavy WordPress themes and drag-and-drop builders ship megabytes of unnecessary scripts.",
      },
      {
        code: "PROBLEM // 03",
        title: "Outdated Design That Undersells Your Work",
        symptom:
          "Your real-world work is top-tier, but an old DIY website makes your company look smaller or less trustworthy than it is.",
        rootCause:
          "Generic templates aren't structured around clear trust signals, service clarity, and fast quote requests.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // RENTED WIX OR WORDPRESS SITE",
      beforeSteps: [
        "Paying $35–$100+/month forever for builder subscriptions and plugin add-ons",
        "Sluggish mobile load times and broken layouts when themes update",
        "Generic template copy that doesn't clearly explain what you offer",
        "Contact forms that land in spam or never notify your phone",
      ],
      afterTitle: "AFTER // $800–$1,000 STUDIO SOZO WEBSITE",
      afterSteps: [
        "One-time $800–$1,000 build—you own 100% of your code and website forever",
        "Instant-loading mobile-first pages engineered for strong Google rankings",
        "Custom design tailored to your brand, services, photos, and service areas",
        "Direct lead & quote form wired straight to your inbox with instant confirmation",
      ],
    },
    deliverables: [
      {
        tag: "DESIGN & BUILD",
        title: "Custom 1–5 Page Mobile-First Website",
        description:
          "Home, Services, About, Work/Gallery, and Contact pages (or a high-converting single-page layout) custom-built around your business.",
      },
      {
        tag: "LEAD CAPTURE",
        title: "Direct Inbox Contact & Quote Form",
        description:
          "Clean, spam-protected inquiry form that sends customer details straight to your email so you can reply with one tap.",
      },
      {
        tag: "LOCAL SEO",
        title: "Google Search & Speed Foundations",
        description:
          "Proper page titles, meta descriptions, OpenGraph share cards, XML sitemap, and top mobile Core Web Vitals.",
      },
      {
        tag: "LAUNCH & HANDOVER",
        title: "Domain Setup & 100% Code Ownership",
        description:
          "Connected to your custom domain with SSL security, zero monthly platform rent, and full ownership of your codebase.",
      },
    ],
    architectureHighlights: [
      "$800 – $1,000 flat one-time package (50% kickoff / 50% at launch)",
      "Fast 1 – 2 week turnaround from kickoff to live domain",
      "Built on clean Next.js & TypeScript—easy to expand into a web app later",
      "100% client ownership with $0 monthly Studio Sozo platform fees",
    ],
    relatedCaseStudies: ["hr-hvac", "serene-commerce", "elevate-solar"],
    faqs: [
      {
        question: "What determines whether my website is $800 or $1,000?",
        answer:
          "A focused 1–2 page launch or straightforward refresh is $800, while a full 4–5 page custom website with dedicated service/gallery pages and full copy polish is $1,000. You get an exact flat number before we start—never surprise hourly bills.",
      },
      {
        question: "Can you redesign my existing website and keep my current domain name?",
        answer:
          "Yes. We build your new site on a private preview link first so your current website stays live while we work. Once you love it, we point your existing domain (.com, .dev, etc.) to the new site with zero downtime.",
      },
      {
        question: "What if I want to add online booking, logins, or a customer portal later?",
        answer:
          "Because we build your website on the exact same modern Next.js foundation we use for full web applications, we never have to throw your site away—we can bolt on booking, payments, or a client portal anytime your business is ready.",
      },
    ],
  },
  {
    slug: "web-applications",
    number: "02",
    title: "Web Apps & Customer Portals",
    shortTitle: "Web Apps & Portals",
    priceBadge: "Custom Portals • Booking • SaaS",
    eyebrow: "SERVICE // 02 — WEB APPLICATIONS & PORTALS",
    headline: "Custom Web Apps & Portals That Run Your",
    highlightWord: "Business",
    seoTitle:
      "Custom Web Application Development | Booking Engines, Client Portals & SaaS",
    seoDescription:
      "Modern, fast web applications built by Studio Sozo—from online booking and checkout flows to customer login portals and SaaS products.",
    summary:
      "Online booking, custom quoting, checkout flows, and client login portals tailored to how your business runs.",
    leadBold:
      "When your business needs more than a brochure site—like live booking, payments, or customer logins—templates fall apart.",
    leadBody:
      "We design and build fast, mobile-friendly web applications where customers can book, get instant quotes, sign waivers, pay invoices, or log into their own portal—all connected directly to your team.",
    idealFor: [
      "Businesses needing custom online booking, scheduling, or rental checkout",
      "Companies launching a client or partner login portal for orders & invoices",
      "Founders building a subscription SaaS product or online marketplace",
      "Brands outgrowing clunky third-party booking widgets and WordPress plugins",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Customers Drop Off in Clunky Booking or Quote Forms",
        symptom:
          "Prospects abandon your form or call the office because your site can't show real availability, clear pricing, or smooth mobile checkout.",
        rootCause:
          "Bolted-on third-party widgets feel slow, disconnected, and frustrating on phones.",
      },
      {
        code: "PROBLEM // 02",
        title: "Endless 'What's My Status?' Calls & Emails",
        symptom:
          "Your team spends hours every day answering status calls, resending PDFs, and chasing down signatures or payments.",
        rootCause:
          "Customers have no simple login portal to check progress, upload files, or pay balances themselves.",
      },
      {
        code: "PROBLEM // 03",
        title: "Third-Party Booking Commissions Eating Your Margin",
        symptom:
          "Rental and scheduling platforms take a percentage of every booking while still limiting how you price add-ons or deposits.",
        rootCause:
          "Marketplace widgets charge ongoing transaction fees instead of letting you process directly via Stripe.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // PATCHWORK WIDGETS & MANUAL EMAILS",
      beforeSteps: [
        "Slow third-party booking embed that doesn't match your brand or pricing rules",
        "Customers submit a 'Request a Quote' form and wait 24 hours for a manual reply",
        "Staff manually email PDF waivers, invoices, and payment links back and forth",
        "Marketplace platforms take a cut of every reservation you worked to earn",
      ],
      afterTitle: "AFTER // CUSTOM STUDIO SOZO WEB APP",
      afterSteps: [
        "Fast, custom-branded booking, quoting, or checkout flow built for phones",
        "Live availability, custom add-ons, digital waivers, and Stripe payments in one step",
        "Client login portal with live job status, documents, and one-click invoice pay",
        "100% owned platform—you keep all your revenue with $0 platform commissions",
      ],
    },
    deliverables: [
      {
        tag: "CUSTOMER FLOWS",
        title: "Interactive Booking, Quoting & Checkout",
        description:
          "Mobile-first web interfaces with live pricing, calendar availability, deposits, and instant confirmation emails.",
      },
      {
        tag: "CLIENT PORTALS",
        title: "Secure Customer & Partner Login Portals",
        description:
          "Dedicated accounts where clients view project progress, download files, sign agreements, and pay balances.",
      },
      {
        tag: "ADMIN CONTROL",
        title: "Simple Staff Management Dashboard",
        description:
          "Update pricing, availability, photos, orders, and customer records from a clean dashboard anyone on your team can use.",
      },
      {
        tag: "SEO & SPEED",
        title: "Fast Cloud Hosting & Google SEO",
        description:
          "Server-rendered Next.js pages, structured Google schema, and sub-second page loads.",
      },
    ],
    architectureHighlights: [
      "Next.js & TypeScript full-stack web application",
      "Direct Stripe payments, deposits, subscriptions, and invoicing",
      "Secure magic-link or password login with role permissions",
      "100% code and database ownership—zero monthly platform commissions",
    ],
    relatedCaseStudies: ["dash-lake-rentals", "hr-hvac", "serene-commerce"],
    faqs: [
      {
        question: "Do I need the $800–$1,000 Website package or a Custom Web App?",
        answer:
          "If you need 1–5 pages to showcase your business, rank on Google, and capture leads via a contact form, the $800–$1,000 Website package is the right fit. If you need user logins, live calendar/fleet availability, Stripe checkout, or an admin database, that's a Custom Web App.",
      },
      {
        question: "Can my team update prices, photos, and availability ourselves?",
        answer:
          "Yes. We build straightforward admin controls right into your app so you never need to call a developer just to update pricing, schedules, or content.",
      },
      {
        question: "Will our public pages still rank well on Google?",
        answer:
          "Yes. Every public page is server-rendered with clean URLs, fast mobile speed, and Google schema markup so customers find you organically.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    number: "03",
    title: "Mobile Apps (iOS & Android)",
    shortTitle: "Mobile Apps",
    priceBadge: "iPhone & Android Apps",
    eyebrow: "SERVICE // 03 — IPHONE & ANDROID APPS",
    headline: "iPhone & Android Apps for Customers &",
    highlightWord: "Crews",
    seoTitle:
      "Mobile App Development (iOS & Android) | Customer & Field Apps You Own",
    seoDescription:
      "Studio Sozo designs and builds custom iPhone (iOS) and Android mobile apps for businesses, field crews, and startup founders—with 100% ownership.",
    summary:
      "Custom iPhone and Android apps for your customers or field crews—complete with photos, push alerts, and live sync.",
    leadBold:
      "Whether your app is for paying customers or technicians in the field, it has to feel fast, simple, and reliable on a phone.",
    leadBody:
      "We design and build custom iOS and Android apps from one unified codebase—complete with camera uploads, GPS, push notifications, offline support, and App Store + Google Play launch.",
    idealFor: [
      "Founders and businesses launching a customer-facing iPhone & Android app",
      "Field service, inspection, and installation crews working on job sites",
      "Rental, delivery, and fleet businesses needing mobile check-in & photos",
      "Companies wanting push notifications, GPS, or offline mobile checklists",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Field Crews Texting Job Photos & Paper Notes",
        symptom:
          "Technicians text site photos into group chats and fill out paper clipboards at night, losing important customer details.",
        rootCause:
          "Desktop software is too clumsy to use one-handed on a job site.",
      },
      {
        code: "PROBLEM // 02",
        title: "Web Pages That Fail When Cell Signal Drops",
        symptom:
          "When crews work in rural areas, basements, or out on the water, browser forms time out and lose their work.",
        rootCause:
          "Mobile web pages don't save work locally on the phone when signal is weak.",
      },
      {
        code: "PROBLEM // 03",
        title: "Paying Twice to Build Separate iOS & Android Apps",
        symptom:
          "Traditional agencies quote huge budgets because they maintain two completely separate teams for iPhone and Android.",
        rootCause:
          "Outdated development workflows instead of a modern shared native codebase.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // GROUP TEXTS & CLUNKY MOBILE BROWSERS",
      beforeSteps: [
        "Crews screenshot daily schedules or call the office for job addresses",
        "Job photos stay trapped on personal camera rolls instead of the customer file",
        "Weak cell service causes mobile web forms to spin and lose data",
        "Customers have no app on their home screen for bookings, alerts, or repeat orders",
      ],
      afterTitle: "AFTER // CUSTOM IPHONE & ANDROID APP",
      afterSteps: [
        "One-tap daily schedule, customer notes, checklists, and turn-by-turn directions",
        "Guided photo capture, voice notes, and finger signatures saved straight to HQ",
        "Offline-ready storage that syncs automatically as soon as signal returns",
        "Published under your brand on both the Apple App Store and Google Play Store",
      ],
    },
    deliverables: [
      {
        tag: "IOS & ANDROID",
        title: "Native iPhone & Android Apps",
        description:
          "Smooth, fast mobile apps built for both Apple and Android devices from one clean, maintainable codebase.",
      },
      {
        tag: "MOBILE FEATURES",
        title: "Camera, GPS, Signatures & Offline Sync",
        description:
          "Snap job photos, scan codes, capture on-screen signatures, and keep working even in dead zones.",
      },
      {
        tag: "NOTIFICATIONS",
        title: "Push Alerts & In-App Purchases",
        description:
          "Instant push notifications for customers or crews, plus Stripe or App Store subscription billing when needed.",
      },
      {
        tag: "APP STORES",
        title: "App Store & Google Play Launch",
        description:
          "We handle developer account setup, screenshots, review guidelines, and publishing under your company's name.",
      },
    ],
    architectureHighlights: [
      "Ships to both Apple App Store & Google Play from one shared codebase",
      "Connects live to your web dashboard so office and mobile stay in sync",
      "Offline-capable data saving with automatic background photo upload",
      "100% owned under your own Apple & Google developer accounts",
    ],
    relatedCaseStudies: ["angler-iq", "dash-lake-rentals", "sozo-crm"],
    faqs: [
      {
        question: "Do we get both an iPhone app and an Android app?",
        answer:
          "Yes. We build cross-platform native apps that run smoothly on both iOS and Android from one shared codebase—saving you roughly half the time and cost of building two separate apps.",
      },
      {
        question: "Does the mobile app sync with a web dashboard for our office?",
        answer:
          "Yes. Your mobile app and web admin dashboard share the same live database, so a photo, order, or job update logged on a phone shows up at the office immediately.",
      },
      {
        question: "Do you handle getting the app approved by Apple and Google?",
        answer:
          "Yes. We walk you through setting up your Apple and Google developer accounts (so you own the listings directly) and manage the entire submission and approval process.",
      },
    ],
  },
  {
    slug: "crm-and-business-systems",
    number: "04",
    title: "Custom CRMs & AI Automation",
    shortTitle: "CRMs & AI Automation",
    priceBadge: "$0 Per-User Fees Forever",
    eyebrow: "SERVICE // 04 — INTERNAL CRMS, DASHBOARDS & AI",
    headline: "Custom CRMs & Automations With $0 Per-Seat",
    highlightWord: "Fees",
    seoTitle:
      "Custom CRM Development & AI Workflow Automation | Replace Spreadsheets & SaaS",
    seoDescription:
      "Custom CRMs, quoting dashboards, QuickBooks/Stripe integrations, and practical AI automations built around how your team actually works—with $0 per-user fees.",
    summary:
      "Internal dashboards, lead-to-invoice tracking, Stripe/QuickBooks sync, and AI tools that cut manual busywork.",
    leadBold:
      "Your team shouldn't be fighting 10 spreadsheets or paying $150/seat every month for bloated software nobody likes using.",
    leadBody:
      "We build clean, custom CRMs, quoting tools, and AI automations designed around your exact steps—connecting leads, estimates, scheduling, field jobs, and QuickBooks/Stripe in one place.",
    idealFor: [
      "Solar, HVAC, construction, and home-service teams outgrowing spreadsheets",
      "Companies frustrated by HubSpot, Salesforce, Jobber, or ServiceTitan bills",
      "Offices wasting hours copying info between emails, PDFs, and QuickBooks",
      "Growing teams that want unlimited employee logins with $0 per-seat fees",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Details Dropped Between Sales and the Field",
        symptom:
          "Sales closes a job, and operations has to chase down photos, measurements, and notes across texts and emails to deliver it.",
        rootCause:
          "Generic CRMs stop at the sale and don't track your real fulfillment or install checklist.",
      },
      {
        code: "PROBLEM // 02",
        title: "Hours Wasted on Manual Copy-Pasting & Slow Quotes",
        symptom:
          "Staff build estimates in Excel and re-type customer info into scheduling and QuickBooks one row at a time.",
        rootCause:
          "Your pricing formulas, forms, and accounting tools aren't connected.",
      },
      {
        code: "PROBLEM // 03",
        title: "Expensive Per-User Subscriptions Every Month",
        symptom:
          "Adding new reps, techs, or office staff hikes your monthly software bill, so people share logins or avoid the tool.",
        rootCause:
          "Off-the-shelf SaaS charges you forever based on headcount.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // SPREADSHEETS, ZAPIER & BLOATED SAAS",
      beforeSteps: [
        "Leads sit in email inboxes with no automatic follow-up or assignment",
        "Estimators calculate quotes in spreadsheets and email static PDFs",
        "Office staff re-type closed jobs into scheduling and QuickBooks by hand",
        "Paying thousands per year for cluttered software where you use 15% of the tabs",
      ],
      afterTitle: "AFTER // CUSTOM STUDIO SOZO CRM & AUTOMATION",
      afterSteps: [
        "Instant lead capture, automatic text/email follow-up, and clear pipeline stages",
        "Built-in quote builder with digital acceptance and automatic deposit collection",
        "Two-way sync with QuickBooks, Stripe, calendars, and AI document reading",
        "Unlimited users across office and field with $0 per-seat fees forever",
      ],
    },
    deliverables: [
      {
        tag: "PIPELINE & OPS",
        title: "Custom Lead-to-Invoice CRM",
        description:
          "Every lead, quote, scheduled job, photo, and commission tracked in one fast, clutter-free dashboard.",
      },
      {
        tag: "QUOTING",
        title: "Fast Estimate & Proposal Builder",
        description:
          "Build accurate quotes in minutes with your real pricing rules, e-signatures, and payment links.",
      },
      {
        tag: "AI & SYNC",
        title: "AI Busywork Removal & QuickBooks/Stripe Sync",
        description:
          "Automatically extract info from PDFs/emails and keep payments, invoices, and calendars synced without double entry.",
      },
      {
        tag: "REPORTING",
        title: "Live Owner & Revenue Dashboards",
        description:
          "See close rates, job margins, rep commissions, and open bottlenecks at a glance from your laptop or phone.",
      },
    ],
    architectureHighlights: [
      "Unlimited team logins—$0 per-seat CRM fees as you grow",
      "Direct integrations with QuickBooks, Stripe, Twilio SMS, and email",
      "Clean migration of your existing contacts, spreadsheets, and history",
      "100% owned code and customer database under your company's control",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "hr-hvac"],
    faqs: [
      {
        question: "Why build a custom CRM instead of paying for HubSpot or Salesforce?",
        answer:
          "Enterprise CRMs charge steep monthly per-user fees forever and still force your team through dozens of confusing tabs that don't match how you quote or fulfill work. A custom CRM gives your team only the exact screens they need, pays for itself in saved license fees, and belongs 100% to you.",
      },
      {
        question: "Can you move our existing spreadsheets and customer list over?",
        answer:
          "Yes. We clean, deduplicate, and import your existing contacts, past jobs, notes, and files so your team starts on day one with all of their history intact.",
      },
      {
        question: "Can we start with a smaller $2,000 automation before building a full CRM?",
        answer:
          "Absolutely. Many clients start with a 2–4 week Automation Sprint (connecting their website, forms, and QuickBooks/SMS) to save hours immediately, then expand into a full custom dashboard later.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    number: "05",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    priceBadge: "100% Owned Software",
    eyebrow: "CAPABILITY // BESPOKE BUSINESS SOFTWARE",
    headline: "Custom Business Software Built Around How You",
    highlightWord: "Work",
    seoTitle:
      "Custom Software Development | Business Applications & Platforms You Own 100%",
    seoDescription:
      "Studio Sozo designs and builds custom websites, web applications, and business software tailored to your workflow—with 100% ownership across Louisiana, Texas, Missouri, and nationwide.",
    summary:
      "Tailored websites, portals, and operational applications built around your business instead of rigid templates.",
    leadBold:
      "Off-the-shelf software forces your business to bend around someone else's template.",
    leadBody:
      "We design and build custom software tailored to your exact workflows, pricing rules, and team roles—giving you fast, straightforward tools your company owns 100%.",
    idealFor: [
      "Companies outgrowing spreadsheets and disconnected monthly subscriptions",
      "Service businesses with custom quoting, scheduling, or dispatch steps",
      "Owners tired of paying rising per-user SaaS bills every year",
      "Founders launching a commercial software product or client portal",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Forcing Your Team Into Rigid Templates",
        symptom:
          "Your staff still keeps side-spreadsheets because your current software can't handle your real pricing, stages, or approvals.",
        rootCause:
          "Generic SaaS tools are built for thousands of unrelated industries rather than yours.",
      },
      {
        code: "PROBLEM // 02",
        title: "Rising Monthly Per-Seat Costs",
        symptom:
          "Adding field techs, contractors, or office staff triggers expensive tier upgrades every time your team grows.",
        rootCause:
          "Rented software charges you more forever as your headcount grows.",
      },
      {
        code: "PROBLEM // 03",
        title: "Zero Ownership Over Your Platform",
        symptom:
          "When a vendor raises prices, changes screens, or locks exports behind an enterprise tier, you have no leverage.",
        rootCause:
          "You are renting access instead of owning your core business software.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // RENTED PATCHWORK OF TOOLS",
      beforeSteps: [
        "Customer inquiries arrive in emails or basic forms with missing info",
        "Staff copy-paste details between spreadsheets and separate logins",
        "Handoffs happen over text threads where things slip through the cracks",
        "Pulling a weekly revenue or job report takes hours of manual cleanup",
      ],
      afterTitle: "AFTER // CUSTOM STUDIO SOZO SOFTWARE",
      afterSteps: [
        "Guided online forms validate details, pricing, and availability up front",
        "One shared system powers sales, scheduling, field work, and billing",
        "Clear role-based screens show every team member what to do next",
        "Live dashboards show revenue, job status, and margins in real time",
      ],
    },
    deliverables: [
      {
        tag: "CORE SYSTEM",
        title: "Custom Database & Application Logic",
        description:
          "Clean PostgreSQL database and TypeScript business logic modeled around how your company actually operates.",
      },
      {
        tag: "TEAM SCREENS",
        title: "Fast, Easy-to-Use Workspaces",
        description:
          "Focused interfaces for admins, sales reps, field crews, and customers with zero confusing clutter.",
      },
      {
        tag: "INTEGRATIONS",
        title: "Connected Payments, Accounting & Messaging",
        description:
          "Built-in connections to Stripe, QuickBooks, SMS, and email so your data stays synced automatically.",
      },
      {
        tag: "OWNERSHIP",
        title: "Full Code & Cloud Handover",
        description:
          "Deployed to your own cloud accounts with 100% source code ownership and $0 per-seat fees.",
      },
    ],
    architectureHighlights: [
      "Modern Next.js, React, TypeScript & PostgreSQL stack",
      "Secure logins and role-based permissions for staff & clients",
      "Weekly live preview builds so you see progress every step of the way",
      "100% IP and GitHub repository ownership transferred to you",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "angler-iq"],
    faqs: [
      {
        question: "Do we really own 100% of the code?",
        answer:
          "Yes—100%. We build on clean, industry-standard technologies and hand over the complete GitHub repository, database, and cloud setup to your business.",
      },
      {
        question: "How long does a custom software build take?",
        answer:
          "Standalone websites take 1–2 weeks ($800–$1,000), focused automations take 2–4 weeks ($2,000+), and full custom web/mobile apps or CRMs typically launch in 6–10 weeks.",
      },
      {
        question: "Can it connect to QuickBooks or Stripe?",
        answer:
          "Yes. We keep the tools you already love—like Stripe for payments or QuickBooks for accounting—and connect them directly so nobody has to enter data twice.",
      },
    ],
  },
  {
    slug: "ai-and-automation",
    number: "06",
    title: "AI & Workflow Automation",
    shortTitle: "AI & Automation",
    priceBadge: "Starting at $2,000",
    eyebrow: "CAPABILITY // PRACTICAL AI & WORKFLOW AUTOMATION",
    headline: "Cut Manual Busywork With Practical",
    highlightWord: "Automation",
    seoTitle:
      "AI & Workflow Automation Development | Eliminate Manual Data Entry & Busywork",
    seoDescription:
      "Practical AI tools, document extraction, and automated workflows built by Studio Sozo to save your team hours every week.",
    summary:
      "Automate repetitive admin tasks, read documents automatically, and trigger instant lead follow-ups.",
    leadBold:
      "Your team shouldn't spend hours copying numbers out of PDFs, chasing status updates, or babysitting broken Zapier chains.",
    leadBody:
      "We build reliable automations and practical AI tools that read incoming documents, qualify leads 24/7, sync your software, and keep humans in control of final approvals.",
    idealFor: [
      "Teams spending hours typing info from PDFs, utility bills, or invoices",
      "Service businesses wanting instant 24/7 lead response and scheduling",
      "Companies whose fragile Zapier / Make workflows keep breaking",
      "Teams wanting a private AI search assistant trained on company docs",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Hours Lost Typing Info From Emails & PDFs",
        symptom:
          "Staff open attachments and manually key customer details or line items into your system one by one.",
        rootCause:
          "Incoming emails, forms, and PDFs aren't connected to your database.",
      },
      {
        code: "PROBLEM // 02",
        title: "Fragile Zapier Chains That Break Quietly",
        symptom:
          "Multi-step Zaps fail on edge cases or rack up monthly task bills without anyone noticing dropped leads.",
        rootCause:
          "Core business workflows outgrew basic no-code glue tools.",
      },
      {
        code: "PROBLEM // 03",
        title: "Slow After-Hours Lead Follow-Up",
        symptom:
          "Weekend and evening inquiries sit until Monday morning while faster competitors win the job.",
        rootCause:
          "Initial lead qualification and scheduling rely 100% on manual callbacks.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // MANUAL DATA ENTRY & BROKEN ZAPS",
      beforeSteps: [
        "Coordinator downloads PDFs and types fields into spreadsheets by hand",
        "After-hours website leads wait until the next day for a response",
        "Broken Zapier steps silently drop customer records without warning",
        "Staff dig through folders and old emails to find routine answers",
      ],
      afterTitle: "AFTER // ENGINEERED AUTOMATION & AI",
      afterSteps: [
        "AI extracts info from PDFs, photos, and emails into your system in seconds",
        "Instant text/email follow-up qualifies leads and books appointments 24/7",
        "Reliable code-based sync with automatic retries and error alerts",
        "Private AI assistant answers team questions from your own company docs",
      ],
    },
    deliverables: [
      {
        tag: "DOCUMENT AI",
        title: "Automatic PDF, Invoice & Email Reading",
        description:
          "Pull structured customer and line-item data straight out of utility bills, work orders, and inbox attachments.",
      },
      {
        tag: "SPEED TO LEAD",
        title: "24/7 Lead Qualification & Follow-Up",
        description:
          "Instant SMS and email responses that answer common questions, gather job details, and book your calendar.",
      },
      {
        tag: "RELIABLE SYNC",
        title: "Code-Grade Workflow Automation",
        description:
          "Replace brittle Zapier chains with rock-solid automations that validate data, retry automatically, and alert on issues.",
      },
      {
        tag: "COPILOTS",
        title: "Private Company Knowledge Assistants",
        description:
          "Internal AI search grounded strictly in your SOPs, pricing sheets, and database—never training public models.",
      },
    ],
    architectureHighlights: [
      "Human-in-the-loop review queues for important approvals",
      "Private API connections—your company data never trains public AI",
      "Automatic retries and alerts so leads or invoices never drop",
      "100% owned code with zero monthly per-Zap markup",
    ],
    relatedCaseStudies: ["angler-iq", "sozo-crm", "elevate-solar"],
    faqs: [
      {
        question: "How do you keep AI accurate on important business numbers?",
        answer:
          "We never let AI guess blindly. Every output is checked against strict validation rules, and anything uncertain is flagged in a quick one-click review queue for your team.",
      },
      {
        question: "Is our private business data shared with public AI models?",
        answer:
          "No. We use zero-retention business APIs so your customer records, pricing, and documents remain completely private.",
      },
      {
        question: "How much does a typical automation sprint cost?",
        answer:
          "Focused workflow and AI automation builds start at $2,000 and typically ship in 2–4 weeks.",
      },
    ],
  },
  {
    slug: "systems-integration",
    number: "07",
    title: "Systems Integration & Tool Sync",
    shortTitle: "Tool Integrations",
    priceBadge: "Starting at $2,000",
    eyebrow: "CAPABILITY // API & SOFTWARE INTEGRATIONS",
    headline: "Make Your Existing Software Tools Talk to Each",
    highlightWord: "Other",
    seoTitle:
      "Systems Integration & API Sync | Connect QuickBooks, Stripe, CRM & Scheduling",
    seoDescription:
      "Studio Sozo connects QuickBooks, Stripe, CRMs, calendars, and field software so your team stops entering the same data twice.",
    summary:
      "Connect QuickBooks, Stripe, CRMs, scheduling apps, and databases so everything stays in sync automatically.",
    leadBold:
      "You don't always need to replace every tool you use—sometimes you just need them to stop acting like islands.",
    leadBody:
      "We build clean, reliable connections between your website, CRM, scheduling software, Stripe, and QuickBooks so customer records, jobs, and invoices sync automatically without CSV exports.",
    idealFor: [
      "Businesses re-typing completed jobs into QuickBooks or Xero every week",
      "Teams with mismatched customer lists across 3+ different tools",
      "Owners wanting one live dashboard pulling numbers from all their systems",
      "Companies connecting an existing CRM or database to a new website or portal",
    ],
    painPoints: [
      {
        code: "PROBLEM // 01",
        title: "Entering the Same Customer Three Times",
        symptom:
          "Sales types the customer into one app, dispatch types the job into another, and bookkeeping types the invoice into QuickBooks.",
        rootCause:
          "Your tools have no automatic two-way connection.",
      },
      {
        code: "PROBLEM // 02",
        title: "Conflicting Revenue & Job Numbers",
        symptom:
          "Stripe says one number, the CRM says another, and reconciling spreadsheets takes days at the end of every month.",
        rootCause:
          "Manual exports get out of sync whenever refunds, changes, or add-ons happen.",
      },
      {
        code: "PROBLEM // 03",
        title: "Off-the-Shelf Connectors Missing Key Fields",
        symptom:
          "Basic built-in plugins sync names and emails, but drop custom line items, tax rates, or job notes.",
        rootCause:
          "Generic connectors aren't built around your specific fields and rules.",
      },
    ],
    comparison: {
      beforeTitle: "BEFORE // DISCONNECTED TOOLS & CSV EXPORTS",
      beforeSteps: [
        "Bookkeeper manually copies finished jobs into QuickBooks every Friday",
        "Stripe payments or refunds aren't reflected inside your job tracker",
        "Calendar availability drifts out of sync across booking channels",
        "Errors only get noticed weeks later when an invoice is wrong",
      ],
      afterTitle: "AFTER // AUTOMATIC TWO-WAY SYNC",
      afterSteps: [
        "Customers, jobs, invoices, and payments sync automatically in real time",
        "Every transaction is checked so records are never duplicated or lost",
        "One live dashboard shows clean numbers across all your connected tools",
        "Instant email/SMS alert if an external provider ever needs attention",
      ],
    },
    deliverables: [
      {
        tag: "TWO-WAY SYNC",
        title: "QuickBooks, Stripe, CRM & Calendar Bridges",
        description:
          "Direct API connections tailored to your exact custom fields, line items, and workflows.",
      },
      {
        tag: "ZERO DROPS",
        title: "Automatic Retries & Duplicate Prevention",
        description:
          "If QuickBooks or another vendor hiccups temporarily, your sync waits and retries cleanly without creating duplicates.",
      },
      {
        tag: "REPORTING",
        title: "Unified Cross-Tool Dashboard",
        description:
          "Pull sales, payments, and job status from multiple tools into one clear owner view.",
      },
      {
        tag: "MONITORING",
        title: "Sync Status & Instant Alerts",
        description:
          "Clear visibility confirming your integrations are healthy and running smoothly 24/7.",
      },
    ],
    architectureHighlights: [
      "Direct API & webhook integrations starting at $2,000 (2–4 weeks)",
      "Built-in duplicate protection and automatic outage recovery",
      "Works with modern cloud APIs, webhooks, databases, and CSV/SFTP feeds",
      "100% owned integration code with zero per-task Zapier fees",
    ],
    relatedCaseStudies: ["sozo-crm", "elevate-solar", "hr-hvac"],
    faqs: [
      {
        question: "What happens if QuickBooks or another outside service goes down briefly?",
        answer:
          "Our sync holds the update safely in a queue and retries automatically once the service is back online—so nothing is ever lost or double-charged.",
      },
      {
        question: "Can we connect our current tools first and build a custom app later?",
        answer:
          "Yes—that's often the fastest win. Connecting your current tools stops manual double-entry in 2–4 weeks, and gives you a clean foundation if you ever decide to replace a tool later.",
      },
      {
        question: "Can you connect an older or industry-specific software tool?",
        answer:
          "In almost all cases, yes. Whether your software has a modern API, webhooks, database access, or scheduled CSV exports, we can automate the bridge.",
      },
    ],
  },
];

export const PRIMARY_SERVICE_SLUGS = [
  "custom-websites",
  "web-applications",
  "mobile-app-development",
  "crm-and-business-systems",
] as const;

export const primaryServicesData: ServiceDetail[] = PRIMARY_SERVICE_SLUGS.map(
  (slug) => {
    const found = servicesData.find((service) => service.slug === slug);
    if (!found) {
      throw new Error(`Missing primary service slug: ${slug}`);
    }
    return found;
  },
);

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((service) => service.slug === slug);
}
