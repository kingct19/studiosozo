export interface ServiceState {
  state: string;
  abbreviation: string;
  cities: string[];
}

export interface CityPainPoint {
  title: string;
  description: string;
}

export interface CityFaq {
  question: string;
  answer: string;
}

export interface ServiceLocationDetail {
  city: string;
  state: string;
  abbreviation: string;
  label: string;
  fullLabel: string;
  slug: string;
  regionTag: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  summary: string;
  localContext: string;
  industriesServed: string[];
  painPoints: CityPainPoint[];
  featuredCaseStudies: string[];
  faqs: CityFaq[];
}

export const serviceLocations: {
  states: ServiceState[];
  remote: boolean;
  remoteLabel: string;
  disclaimer: string;
} = {
  states: [
    {
      state: "Louisiana",
      abbreviation: "LA",
      cities: ["Shreveport", "Benton"],
    },
    {
      state: "Texas",
      abbreviation: "TX",
      cities: [
        "Marble Falls",
        "Austin",
        "Hughes Springs",
        "Longview",
        "Commerce",
      ],
    },
    {
      state: "Missouri",
      abbreviation: "MO",
      cities: ["Kansas City"],
    },
  ],
  remote: true,
  remoteLabel: "Remote Collaboration (US)",
  disclaimer:
    "Service areas across Louisiana, Texas, and Missouri, plus remote engagements. These represent regional service areas rather than physical branch offices.",
};

const CITY_DETAILS: Record<
  string,
  Omit<
    ServiceLocationDetail,
    "city" | "state" | "abbreviation" | "label" | "fullLabel" | "slug"
  >
> = {
  "shreveport-la": {
    regionTag: "NORTHWEST LOUISIANA // ARKLATEX",
    seoTitle:
      "Custom Software Development, CRM & AI Automation in Shreveport, LA",
    seoDescription:
      "Studio Sozo builds custom software, CRM platforms, AI workflow automation, and web/mobile apps for businesses in Shreveport, Louisiana and the Ark-La-Tex region.",
    headline: "Custom Software, CRM & AI Systems for Shreveport Businesses",
    summary:
      "We help Shreveport and Ark-La-Tex companies replace manual spreadsheets and disconnected software with custom CRMs, field operations platforms, and AI automation they own 100%.",
    localContext:
      "From commercial contractors, HVAC and energy operators, and logistics fleets across Caddo and Bossier Parish to growing healthcare and professional service firms, Shreveport businesses often run complex operations on disconnected software that wasn't built for how they work.",
    industriesServed: [
      "HVAC, Electrical & Field Service Contractors",
      "Energy, Industrial & Equipment Operations",
      "Regional Logistics, Distribution & Fleet Management",
      "Multi-Location Service & Healthcare Organizations",
    ],
    painPoints: [
      {
        title: "Dispatch, Quoting & Billing Split Across Separate Tools",
        description:
          "Field crews, estimators, and office administrators waste hours re-entering job data between paper tickets, spreadsheets, and QuickBooks.",
      },
      {
        title: "Paying High Monthly Per-User Fees for Rigid SaaS",
        description:
          "Off-the-shelf CRMs penalize you every time you add technicians, sales reps, or office staff—without fitting your actual workflow.",
      },
      {
        title: "No Real-Time Visibility Into Job Margin or Pipeline",
        description:
          "Leadership has to wait for end-of-month reconciliations to know which service lines, crews, or territories are profitable.",
      },
    ],
    featuredCaseStudies: ["hr-hvac", "sozo-crm", "elevate-solar"],
    faqs: [
      {
        question:
          "How does Studio Sozo work with businesses in Shreveport, LA?",
        answer:
          "We partner directly with Shreveport and Ark-La-Tex business owners and operations leaders—mapping your real workflow, designing a clear system architecture, and shipping production software in structured milestones.",
      },
      {
        question:
          "Can you integrate with our existing accounting and payment software?",
        answer:
          "Yes. We routinely integrate custom Shreveport business systems with QuickBooks, Stripe, Twilio SMS, and industry suppliers so your office stops double-entering invoices and customer records.",
      },
    ],
  },
  "benton-la": {
    regionTag: "BOSSIER PARISH // NORTHWEST LOUISIANA",
    seoTitle:
      "Custom Software Development, CRM & Workflow Automation in Benton, LA",
    seoDescription:
      "Custom software development, bespoke CRMs, booking apps, and AI automation for businesses serving Benton, Bossier Parish, and Northwest Louisiana.",
    headline: "Custom Software & Operational Systems for Benton, LA",
    summary:
      "Custom CRMs, booking platforms, and workflow automation engineered for growing businesses in Benton and Bossier Parish that want full control over their technology.",
    localContext:
      "As Benton and north Bossier Parish grow rapidly across construction, home services, recreation, and local commerce, businesses need modern booking, quoting, and operational systems that scale without adding administrative overhead.",
    industriesServed: [
      "Residential & Commercial Construction & Trades",
      "Outdoor Recreation, Marine & Equipment Rentals",
      "Home Services, Solar & Property Operations",
      "Local Commerce & Professional Services",
    ],
    painPoints: [
      {
        title: "Outgrowing Spreadsheets & Manual Phone Scheduling",
        description:
          "High call volume and manual calendar coordination lead to missed bookings, double-scheduled crews, and evening admin work.",
      },
      {
        title: "Disconnected Customer Intake & Follow-Up",
        description:
          "Website inquiries sit in email inboxes instead of triggering instant qualification, SMS confirmation, and pipeline tracking.",
      },
      {
        title: "Zero Self-Service for Customers",
        description:
          "Customers have to call or text to check job status, sign waivers, or pay deposits because there is no unified customer portal.",
      },
    ],
    featuredCaseStudies: ["dash-lake-rentals", "hr-hvac", "sozo-crm"],
    faqs: [
      {
        question:
          "Can you build both our customer-facing booking site and our internal dashboard?",
        answer:
          "Yes. We engineer your public booking or quoting flow and your internal dispatch/CRM dashboard on the same database so customer actions update your team's schedule immediately.",
      },
      {
        question: "Do we pay monthly per-user fees after launch?",
        answer:
          "No. You own 100% of the custom software we build for your business—there are no per-seat licensing fees as your team grows.",
      },
    ],
  },
  "marble-falls-tx": {
    regionTag: "TEXAS HILL COUNTRY // HIGHLAND LAKES",
    seoTitle:
      "Custom Software Development, Booking Systems & CRM in Marble Falls, TX",
    seoDescription:
      "Studio Sozo builds custom software, watercraft & equipment rental systems, CRMs, and AI automation for businesses in Marble Falls and the Texas Hill Country.",
    headline: "Custom Software & Booking Platforms for Marble Falls, TX",
    summary:
      "Engineered web applications, fleet/rental booking engines, and custom CRMs for Marble Falls and Highland Lakes businesses ready to eliminate commission fees and manual coordination.",
    localContext:
      "Across Marble Falls and the Highland Lakes corridor, marine and watercraft operators, custom builders, hospitality brands, and regional trades depend on smooth seasonal peaks and high-trust customer experiences.",
    industriesServed: [
      "Lake & Watercraft Rentals, Marinas & Hospitality",
      "Custom Home Builders, Solar & Specialty Trades",
      "Field Service, HVAC & Property Management",
      "Regional Commerce & Multi-Crew Operations",
    ],
    painPoints: [
      {
        title: "Losing Margin to Third-Party Booking Commissions",
        description:
          "Off-the-shelf rental and booking widgets take a percentage of every reservation while limiting how you configure time slots, deposits, and add-ons.",
      },
      {
        title: "Fragmented Project & Subcontractor Coordination",
        description:
          "Builders and field operators juggle change orders, site photos, and customer updates across text threads and spreadsheets.",
      },
      {
        title: "Slow Lead Response During Peak Season",
        description:
          "When inquiries spike on weekends and summer months, manual phone follow-up leaves revenue on the table.",
      },
    ],
    featuredCaseStudies: ["dash-lake-rentals", "elevate-solar", "angler-iq"],
    faqs: [
      {
        question:
          "Can you build a custom reservation or rental system with zero per-booking fees?",
        answer:
          "Yes. Like our Dash Lake Rentals platform, we build direct Stripe-integrated reservation, waiver, and fleet management systems where 100% of the booking revenue stays with your business.",
      },
      {
        question:
          "Will the platform work reliably on mobile at the dock or job site?",
        answer:
          "Every system we build is engineered mobile-first so crews and customers can check in, sign waivers, upload photos, and manage schedules from any phone or tablet.",
      },
    ],
  },
  "austin-tx": {
    regionTag: "CENTRAL TEXAS // AUSTIN METRO",
    seoTitle:
      "Custom Software Development, AI Automation & Web Apps in Austin, TX",
    seoDescription:
      "Studio Sozo partners with Austin, TX companies and founders to engineer custom software, AI workflow automation, bespoke CRMs, and scalable web/mobile applications.",
    headline: "Custom Software, AI Automation & Product Engineering for Austin, TX",
    summary:
      "Senior full-stack product engineering, AI workflow automation, and custom operational platforms for Austin businesses and founders who value speed, clean architecture, and 100% code ownership.",
    localContext:
      "Austin operators and founders move fast—whether scaling a high-velocity service organization across Central Texas or shipping an AI-native SaaS or mobile product without the overhead of a bloated slow-moving agency.",
    industriesServed: [
      "AI-Enabled SaaS & Consumer/Prosumer Mobile Products",
      "Solar, Clean Energy & Home-Service Operations",
      "High-Growth B2B Services & Multi-Market Operators",
      "Digital Commerce & Specialty Brands",
    ],
    painPoints: [
      {
        title: "Internal Ops Bottlenecked by Duct-Taped No-Code Stacks",
        description:
          "What started as a quick Airtable + Zapier + HubSpot setup now breaks under scale, costs thousands per month, and slows down every department.",
      },
      {
        title: "Need Senior Engineering Velocity Without Agency Bloat",
        description:
          "You need production-grade Next.js, TypeScript, mobile, and AI architecture shipped in weeks—not months of slide decks.",
      },
      {
        title: "Generic AI Wrappers That Don't Connect to Real Operations",
        description:
          "Off-the-shelf AI tools sit in a separate chat window instead of reading your live database, validating schemas, and executing real workflow steps.",
      },
    ],
    featuredCaseStudies: ["angler-iq", "sozo-crm", "serene-commerce"],
    faqs: [
      {
        question:
          "Can Studio Sozo build both internal operational software and commercial SaaS/mobile products?",
        answer:
          "Yes. We build internal CRMs and automation engines for operating companies as well as commercial web and iOS/Android products like Angler IQ—using the same rigorous production architecture.",
      },
      {
        question:
          "How do you collaborate with Austin teams?",
        answer:
          "We work directly with founders and ops leaders via tight weekly build cycles, shared staging environments, and async technical communication so you see working software every week.",
      },
    ],
  },
  "hughes-springs-tx": {
    regionTag: "NORTHEAST TEXAS // PINEY WOODS",
    seoTitle:
      "Custom Software Development, CRM & Business Automation in Hughes Springs, TX",
    seoDescription:
      "Custom business software, CRM systems, and workflow automation engineered for companies in Hughes Springs and Northeast Texas.",
    headline: "Custom Software & Operational Systems for Hughes Springs, TX",
    summary:
      "Practical, durable custom software and workflow automation built for Northeast Texas businesses that want their operations running in one reliable system.",
    localContext:
      "Businesses in Hughes Springs and across Cass and Morris County—spanning regional contractors, timber/industrial services, outdoor recreation, and equipment operations—need straightforward, dependable software that eliminates paperwork without enterprise complexity.",
    industriesServed: [
      "Regional Trade Contractors & Field Services",
      "Industrial, Equipment & Fleet Operations",
      "Lake & Outdoor Recreation Businesses",
      "Multi-Crew Service & Distribution Companies",
    ],
    painPoints: [
      {
        title: "Paper Work Orders & Delayed Invoicing",
        description:
          "Waiting days for paper tickets or text messages from the field slows down billing and creates avoidable errors.",
      },
      {
        title: "Software That Is Too Complicated for Field Crews",
        description:
          "Bloated software with 50 menu tabs gets ignored by crews who just need a clean mobile screen to see the job, log photos, and mark complete.",
      },
      {
        title: "Disconnected Scheduling & Customer Updates",
        description:
          "Office staff spend hours calling customers with arrival updates and manually tracking job progress.",
      },
    ],
    featuredCaseStudies: ["hr-hvac", "dash-lake-rentals", "angler-iq"],
    faqs: [
      {
        question:
          "Can you build simple, fast interfaces for field crews who aren't tech-savvy?",
        answer:
          "That is our specialty. We strip away every unnecessary button and build role-specific mobile views where field techs can view their jobs, upload photos, and log completion in three taps.",
      },
      {
        question: "What happens if our crews work in rural areas with weak cell signal?",
        answer:
          "We design field workflows with offline-resilient state caching so notes and checklists aren't lost when signal drops, syncing automatically once connectivity returns.",
      },
    ],
  },
  "longview-tx": {
    regionTag: "EAST TEXAS // I-20 INDUSTRIAL & SERVICE CORRIDOR",
    seoTitle:
      "Custom Software Development, CRM & AI Automation in Longview, TX",
    seoDescription:
      "Studio Sozo builds custom software, CRM & dispatch systems, AI automation, and web/mobile apps for businesses in Longview and East Texas.",
    headline: "Custom Software, CRM & Automation for Longview, TX Businesses",
    summary:
      "Replace disconnected spreadsheets, legacy databases, and expensive per-seat SaaS with custom operational software engineered around your Longview business.",
    localContext:
      "As an industrial, manufacturing, energy, and commercial service hub for East Texas, Longview companies manage complex quoting, multi-crew dispatch, equipment tracking, and B2B client relationships that generic software rarely fits.",
    industriesServed: [
      "Industrial Services, Manufacturing & Fabrication",
      "Commercial & Residential HVAC, Solar & Electrical",
      "B2B Distribution, Fleet & Equipment Operations",
      "Regional Healthcare & Professional Services",
    ],
    painPoints: [
      {
        title: "Complex Quoting & Job Costing Trapped in Excel",
        description:
          "Critical estimating formulas live in spreadsheets that only one or two people understand, creating bottlenecks and version conflicts.",
      },
      {
        title: "Zero Integration Between Field Execution & Accounting",
        description:
          "Completed work orders, change orders, and material usage have to be re-keyed manually into QuickBooks or ERP systems.",
      },
      {
        title: "Outdated Legacy Systems Holding Back Growth",
        description:
          "Aging desktop databases or clunky portals make it hard for reps and customers to work from mobile devices.",
      },
    ],
    featuredCaseStudies: ["sozo-crm", "hr-hvac", "elevate-solar"],
    faqs: [
      {
        question:
          "Can you turn our custom Excel quoting sheets into a secure web application?",
        answer:
          "Yes. We regularly translate complex spreadsheet pricing models, margin rules, and approval thresholds into multi-user web applications with role permissions, instant PDF proposals, and live CRM tracking.",
      },
      {
        question:
          "Can we modernize our operations in phases without stopping daily work?",
        answer:
          "Yes. We can integrate with your current database or accounting setup first, launch the highest-priority workflow module in weeks, and expand cleanly from there.",
      },
    ],
  },
  "commerce-tx": {
    regionTag: "NORTHEAST TEXAS // HUNT COUNTY",
    seoTitle:
      "Custom Software Development, Web Applications & CRM in Commerce, TX",
    seoDescription:
      "Custom software development, web applications, CRM platforms, and workflow automation for businesses in Commerce, Hunt County, and Northeast Texas.",
    headline: "Custom Software & Web Applications for Commerce, TX",
    summary:
      "Modern custom web applications, CRMs, and automated workflows engineered for Commerce and Northeast Texas businesses ready to streamline operations.",
    localContext:
      "Serving Commerce, Hunt County, and the broader Northeast Texas corridor, we help regional service companies, contractors, and growing brands replace manual paperwork with fast, unified digital platforms.",
    industriesServed: [
      "Regional Service Contractors & Trades",
      "Agricultural, Property & Equipment Services",
      "Local Commerce, Rental & Booking Operations",
      "Growing Multi-Site Businesses",
    ],
    painPoints: [
      {
        title: "Manual Intake, Scheduling & Follow-Up",
        description:
          "Staff spend hours every week chasing customer details, confirming appointments by phone, and updating separate lists.",
      },
      {
        title: "Websites That Look Fine But Don't Automate Anything",
        description:
          "A static website that just sends an email notification still leaves 100% of the qualification, quoting, and scheduling work on your desk.",
      },
      {
        title: "Rising Subscription Costs for Disconnected Apps",
        description:
          "Paying separately for forms, CRM, scheduling, texting, and portals adds up fast while data stays fragmented.",
      },
    ],
    featuredCaseStudies: ["hr-hvac", "serene-commerce", "dash-lake-rentals"],
    faqs: [
      {
        question:
          "What makes Studio Sozo different from a standard web design agency?",
        answer:
          "Standard agencies build static brochure sites. Studio Sozo is a software engineering partner—we build the actual operational engine behind your business: custom CRMs, automated booking/quoting, AI workflows, and integrated databases.",
      },
      {
        question:
          "How do we get started if we only know the problem we want to solve?",
        answer:
          "You don't need a technical spec. Tell us what is slowing your team down or costing you deals, and we will map the workflow and propose a clear, practical system architecture.",
      },
    ],
  },
  "kansas-city-mo": {
    regionTag: "MIDWEST // KANSAS CITY METRO",
    seoTitle:
      "Custom Software Development, CRM & AI Automation in Kansas City, MO",
    seoDescription:
      "Studio Sozo engineers custom software, operational CRMs, AI workflow automation, and web/mobile platforms for businesses in Kansas City, Missouri.",
    headline: "Custom Software, CRM & AI Engineering for Kansas City, MO",
    summary:
      "Bespoke operational software, custom CRMs, AI automation, and systems integration for Kansas City companies replacing fragmented SaaS stacks with software they own.",
    localContext:
      "Across the Kansas City metro—from logistics, construction, solar, and home-service leaders to B2B enterprises—operations teams are consolidating sprawling software subscriptions into unified, proprietary platforms built around their exact competitive process.",
    industriesServed: [
      "Solar, HVAC, Roofing & Specialty Construction",
      "Logistics, Distribution & Field Operations",
      "B2B Service Organizations & Internal Portals",
      "AI-Forward SaaS & Digital Commerce Platforms",
    ],
    painPoints: [
      {
        code: "KC // 01",
        title: "Enterprise SaaS Sprawl & Six-Figure Licensing Renewals",
        description:
          "Growing Kansas City teams hit steep per-seat renewal walls on Salesforce, HubSpot, or industry ERPs while still relying on spreadsheets for actual execution.",
      } as CityPainPoint,
      {
        title: "Disconnected Sales, Field & Accounting Data",
        description:
          "When sales pipelines, field dispatch, and accounting live in separate silos, handoffs drop and leadership lacks real-time job profitability.",
      },
      {
        title: "Manual Document Processing & Repetitive Admin Work",
        description:
          "Coordinators spend hours processing PDFs, utility bills, work orders, and status updates that should be handled by automated AI pipelines.",
      },
    ],
    featuredCaseStudies: ["sozo-crm", "elevate-solar", "angler-iq"],
    faqs: [
      {
        question:
          "How does Studio Sozo collaborate with Kansas City, MO clients?",
        answer:
          "We work directly with Kansas City leadership and operations teams through structured discovery, live interactive prototypes, and weekly production releases—combining regional alignment with fast remote engineering execution.",
      },
      {
        question:
          "Can you replace our current CRM or integrate with our existing ERP?",
        answer:
          "Both. Depending on where your biggest bottleneck sits, we can either engineer a full custom CRM/operations platform you own outright or build a rock-solid integration and automation layer on top of your existing accounting/ERP core.",
      },
    ],
  },
};

export const flatServiceLocations: ServiceLocationDetail[] =
  serviceLocations.states.flatMap((group) =>
    group.cities.map((city) => {
      const slug = `${city.toLowerCase().replace(/\s+/g, "-")}-${group.abbreviation.toLowerCase()}`;
      const details = CITY_DETAILS[slug];
      return {
        city,
        state: group.state,
        abbreviation: group.abbreviation,
        label: `${city}, ${group.abbreviation}`,
        fullLabel: `${city}, ${group.state}`,
        slug,
        ...details,
      };
    }),
  );

export function getLocationBySlug(
  slug: string,
): ServiceLocationDetail | undefined {
  return flatServiceLocations.find((loc) => loc.slug === slug);
}

export const inquiryLocationOptions = [
  ...flatServiceLocations.map((loc) => loc.fullLabel),
  "Remote (United States)",
  "Other Location",
];
