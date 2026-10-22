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
  "Custom Software Development": {
    capability: "Custom Software Development",
    code: "SYS-CORE // 01",
    shortTitle: "Bespoke Platform",
    tagline:
      "Replace rigid templates and spreadsheets with an end-to-end platform engineered around your exact operations.",
    deliverableSummary:
      "Multi-role operational web platform + PostgreSQL core + automated state machine",
    architectureNodes: [
      {
        id: "intake-portal",
        tier: "INTAKE",
        label: "Role-Based Command Portal",
        sublabel: "Unified operator, field & client workspace",
        status: "SSR / LIVE",
      },
      {
        id: "rule-engine",
        tier: "LOGIC",
        label: "Custom Business Rule Engine",
        sublabel: "Approvals, pricing logic & margin guardrails",
        status: "DETERMINISTIC",
      },
      {
        id: "audit-bus",
        tier: "LOGIC",
        label: "Event Queue & Audit Ledger",
        sublabel: "Real-time notifications & immutable history",
        status: "DURABLE",
      },
      {
        id: "pg-core",
        tier: "DATA",
        label: "Dedicated PostgreSQL Core",
        sublabel: "Row-level security & 100% owned schema",
        status: "OWNED DB",
      },
    ],
    apiBridges: [
      { name: "STRIPE BILLING", protocol: "WEBHOOK", latency: "14ms" },
      { name: "QUICKBOOKS SYNC", protocol: "REST / OAUTH", latency: "22ms" },
      { name: "TWILIO / EMAIL", protocol: "EVENT BUS", latency: "18ms" },
    ],
    promptChips: [
      "Replacing disconnected spreadsheets & SaaS tools",
      "Custom quoting, scheduling, or dispatch workflow",
      "Role-based permissions for office & field teams",
      "Eliminating recurring per-seat licensing fees",
    ],
    roles: ["EXEC ADMIN", "OPERATIONS", "FIELD / CLIENT"],
  },
  "CRM & Business Systems": {
    capability: "CRM & Business Systems",
    code: "SYS-CRM // 02",
    shortTitle: "Custom CRM & ERP",
    tagline:
      "Tailored pipelines, quoting engines, commission tracking, and job management without per-user SaaS bloat.",
    deliverableSummary:
      "Custom pipeline & deal desk + automated quoting + live P&L executive telemetry",
    architectureNodes: [
      {
        id: "lead-router",
        tier: "INTAKE",
        label: "Omnichannel Lead & Deal Intake",
        sublabel: "Web forms, call routing & instant territory assignment",
        status: "AUTO-ROUTED",
      },
      {
        id: "quote-desk",
        tier: "LOGIC",
        label: "Dynamic Quote & Margin Builder",
        sublabel: "Live line-item pricing, approvals & e-sign trigger",
        status: "GUARDED",
      },
      {
        id: "commission-engine",
        tier: "LOGIC",
        label: "Pipeline & Commission Automation",
        sublabel: "Stage transitions, splits & automated follow-ups",
        status: "SYNCED",
      },
      {
        id: "crm-warehouse",
        tier: "DATA",
        label: "Unified Customer & Job Graph",
        sublabel: "Zero duplicate records across sales & fulfillment",
        status: "SINGLE TRUTH",
      },
    ],
    apiBridges: [
      { name: "DOCUSIGN / E-SIGN", protocol: "WEBHOOK", latency: "19ms" },
      { name: "QUICKBOOKS LEDGER", protocol: "2-WAY SYNC", latency: "24ms" },
      { name: "TWILIO SMS / CALLS", protocol: "STREAM", latency: "15ms" },
    ],
    promptChips: [
      "Outgrowing HubSpot, Salesforce, or Jobber",
      "Automated quoting & contract handoff to fulfillment",
      "Real-time sales commissions & job margin tracking",
      "Single view of customer from lead to invoice",
    ],
    roles: ["SALES REP", "ESTIMATOR", "DISPATCHER", "OWNER"],
  },
  "AI & Automation": {
    capability: "AI & Automation",
    code: "SYS-AI // 03",
    shortTitle: "AI Agents & Workflows",
    tagline:
      "Eliminate manual copy-pasting, parse documents automatically, and run durable AI workflows across your stack.",
    deliverableSummary:
      "Autonomous ingestion pipeline + structured LLM extraction + human-in-the-loop review",
    architectureNodes: [
      {
        id: "doc-ingest",
        tier: "INTAKE",
        label: "Multi-Source Document & Inbox Stream",
        sublabel: "PDFs, emails, voice notes & webhook payloads",
        status: "INGESTING",
      },
      {
        id: "ai-extractor",
        tier: "LOGIC",
        label: "Structured AI Extraction & Classification",
        sublabel: "Schema-validated LLM parsing with confidence checks",
        status: "AI VERIFIED",
      },
      {
        id: "hitl-gate",
        tier: "LOGIC",
        label: "Exception Guardrail & Approval Queue",
        sublabel: "Auto-executes high-confidence tasks, flags edge cases",
        status: "99.4% AUTO",
      },
      {
        id: "vector-pg",
        tier: "DATA",
        label: "Knowledge Base & Execution Log",
        sublabel: "Full trace auditability & zero data training leaks",
        status: "PRIVATE AI",
      },
    ],
    apiBridges: [
      { name: "OPENAI / CLAUDE", protocol: "STRUCTURED", latency: "310ms" },
      { name: "EMAIL / PDF PARSER", protocol: "PIPELINE", latency: "42ms" },
      { name: "ERP / CRM WRITEBACK", protocol: "IDEMPOTENT", latency: "17ms" },
    ],
    promptChips: [
      "Eliminate manual data entry from PDFs or emails",
      "Automated customer intake, triage, or scheduling",
      "Internal AI assistant trained on company SOPs",
      "Replacing fragile Zapier / Make chains with code",
    ],
    roles: ["AI ORCHESTRATOR", "REVIEWER", "OPS ADMIN"],
  },
  "Web Applications": {
    capability: "Web Applications",
    code: "SYS-WEB // 04",
    shortTitle: "Client & Partner Portal",
    tagline:
      "High-speed, modern web applications for customer self-service, partner ordering, or multi-tenant SaaS.",
    deliverableSummary:
      "Next.js App Router platform + sub-second edge delivery + real-time customer portal",
    architectureNodes: [
      {
        id: "client-gateway",
        tier: "INTAKE",
        label: "Branded Client & Partner Portal",
        sublabel: "SSO/magic-link auth, live status & self-serve actions",
        status: "99.99% SLA",
      },
      {
        id: "checkout-flow",
        tier: "LOGIC",
        label: "Order, Booking & Billing Engine",
        sublabel: "Custom pricing tiers, subscriptions & instant receipts",
        status: "REAL-TIME",
      },
      {
        id: "tenant-rbac",
        tier: "LOGIC",
        label: "Multi-Tenant Organization Isolation",
        sublabel: "Granular team seats, permissions & audit trails",
        status: "ISOLATED",
      },
      {
        id: "cloud-db",
        tier: "DATA",
        label: "High-Availability Cloud Database",
        sublabel: "Automated backups, read replicas & full ownership",
        status: "SCALABLE",
      },
    ],
    apiBridges: [
      { name: "STRIPE CONNECT", protocol: "WEBHOOK", latency: "12ms" },
      { name: "CLERK / AUTH CORE", protocol: "JWT / SSO", latency: "8ms" },
      { name: "RESEND / NOTIFY", protocol: "TRANSACTIONAL", latency: "19ms" },
    ],
    promptChips: [
      "Customer self-service portal for orders & invoices",
      "Multi-tenant B2B platform or commercial SaaS product",
      "Ditching slow WordPress/Wix plugins for custom Next.js",
      "Interactive configurator, booking, or quoting flow",
    ],
    roles: ["CUSTOMER", "PARTNER ORG", "INTERNAL ADMIN"],
  },
  "Mobile App Development": {
    capability: "Mobile App Development",
    code: "SYS-MOB // 05",
    shortTitle: "iOS & Android Field App",
    tagline:
      "Native-grade mobile experiences for field technicians, drivers, and customers with offline-first sync.",
    deliverableSummary:
      "iOS & Android application + offline-first sync queue + live HQ dispatch dashboard",
    architectureNodes: [
      {
        id: "field-app",
        tier: "INTAKE",
        label: "iOS & Android Field Client",
        sublabel: "GPS check-in, photo capture, barcode & digital sign-off",
        status: "OFFLINE-READY",
      },
      {
        id: "sync-engine",
        tier: "LOGIC",
        label: "Delta Sync & Conflict Resolver",
        sublabel: "Queues actions in dead zones, syncs on reconnect",
        status: "RESILIENT",
      },
      {
        id: "push-dispatch",
        tier: "LOGIC",
        label: "Real-Time Push & Route Dispatch",
        sublabel: "Instant schedule updates & customer ETA alerts",
        status: "LIVE PUSH",
      },
      {
        id: "hq-cloud",
        tier: "DATA",
        label: "Centralized HQ Command Database",
        sublabel: "Shared backend for mobile crews & office admins",
        status: "UNIFIED",
      },
    ],
    apiBridges: [
      { name: "APNS / FCM PUSH", protocol: "NATIVE", latency: "21ms" },
      { name: "GPS / MAPS SDK", protocol: "TELEMETRY", latency: "16ms" },
      { name: "S3 MEDIA VAULT", protocol: "DIRECT PUT", latency: "28ms" },
    ],
    promptChips: [
      "Field technician app for checklists, photos & signatures",
      "Offline-capable mobile app that syncs with office CRM",
      "Customer-facing iOS & Android app with push alerts",
      "Replacing paper clipboards and text-message dispatch",
    ],
    roles: ["FIELD TECH", "DISPATCH HQ", "END CUSTOMER"],
  },
  "Systems Integration": {
    capability: "Systems Integration",
    code: "SYS-INT // 06",
    shortTitle: "API & Data Bridge",
    tagline:
      "Unify your ERP, accounting, CRM, and payment processors into one synchronized, fault-tolerant pipeline.",
    deliverableSummary:
      "Bi-directional API middleware + dead-letter retry queues + unified executive reporting",
    architectureNodes: [
      {
        id: "webhook-gateway",
        tier: "INTAKE",
        label: "High-Throughput Webhook & Polling Gateway",
        sublabel: "Ingests events from legacy ERPs, CRMs & payment rails",
        status: "VERIFIED",
      },
      {
        id: "transform-layer",
        tier: "LOGIC",
        label: "Schema Normalization & Deduplication",
        sublabel: "Maps mismatched IDs, currencies & customer records",
        status: "IDEMPOTENT",
      },
      {
        id: "retry-queue",
        tier: "LOGIC",
        label: "Durable Queue & Auto-Recovery",
        sublabel: "Exponential backoff, alerting & zero dropped payloads",
        status: "ZERO-LOSS",
      },
      {
        id: "warehouse-sync",
        tier: "DATA",
        label: "Consolidated Reporting Warehouse",
        sublabel: "Cross-platform revenue, inventory & ops telemetry",
        status: "RECONCILED",
      },
    ],
    apiBridges: [
      { name: "QUICKBOOKS / NETSUITE", protocol: "2-WAY API", latency: "26ms" },
      { name: "STRIPE / SQUARE", protocol: "WEBHOOK", latency: "13ms" },
      { name: "CUSTOM REST / SQL", protocol: "BRIDGE", latency: "18ms" },
    ],
    promptChips: [
      "Syncing CRM deals automatically with QuickBooks / accounting",
      "Eliminating double data entry between 3+ platforms",
      "Building a unified live dashboard across all tools",
      "Replacing brittle Zapier webhooks that silently fail",
    ],
    roles: ["FINANCE", "OPERATIONS", "SYSTEMS ADMIN"],
  },
  "Other / Multiple Systems": {
    capability: "Other / Multiple Systems",
    code: "SYS-MULTI // 07",
    shortTitle: "Full-Stack Ecosystem",
    tagline:
      "Combine custom CRM, mobile field apps, AI automation, and deep integrations into one cohesive architecture.",
    deliverableSummary:
      "Unified multi-surface platform (Web + Mobile + AI + Integrations) with 100% IP ownership",
    architectureNodes: [
      {
        id: "omni-surface",
        tier: "INTAKE",
        label: "Multi-Surface Apps (Web + Mobile + Portal)",
        sublabel: "Tailored interfaces for office, field & customers",
        status: "UNIFIED UI",
      },
      {
        id: "core-orchestrator",
        tier: "LOGIC",
        label: "Centralized Workflow & AI Orchestrator",
        sublabel: "Automated routing, quoting, approvals & AI extraction",
        status: "AUTONOMOUS",
      },
      {
        id: "integration-mesh",
        tier: "LOGIC",
        label: "Bi-Directional Accounting & Payment Mesh",
        sublabel: "Real-time sync with Stripe, QuickBooks, SMS & APIs",
        status: "CONNECTED",
      },
      {
        id: "sozo-foundation",
        tier: "DATA",
        label: "100% Client-Owned Cloud & Database",
        sublabel: "Full GitHub repository handover & zero per-seat tax",
        status: "100% OWNED",
      },
    ],
    apiBridges: [
      { name: "STRIPE + QUICKBOOKS", protocol: "LEDGER SYNC", latency: "16ms" },
      { name: "AI + TWILIO SMS", protocol: "AUTOMATION", latency: "24ms" },
      { name: "WEB + MOBILE SDK", protocol: "REAL-TIME", latency: "11ms" },
    ],
    promptChips: [
      "Full operational overhaul (CRM + Customer Portal + Automation)",
      "Not sure where to start — need an architecture roadmap",
      "Consolidating 4+ SaaS subscriptions into one owned system",
      "Phased rollout starting with our biggest workflow bottleneck",
    ],
    roles: ["EXECUTIVE", "OFFICE OPS", "FIELD CREW", "CUSTOMERS"],
  },
};

export function getCapabilityBlueprint(
  softwareType: string,
): CapabilityBlueprintProfile {
  const key = softwareType as SoftwareCapabilityOption;
  if (key in CAPABILITY_BLUEPRINTS) {
    return CAPABILITY_BLUEPRINTS[key];
  }
  return CAPABILITY_BLUEPRINTS["Custom Software Development"];
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
    code: "01 // SYSTEM",
    label: "Capability",
    headline: "Select the core system you want to engineer",
    subtitle:
      "Choose a primary architecture profile. Watch your live system blueprint assemble on the right.",
  },
  {
    id: "workflow",
    index: 1,
    code: "02 // WORKFLOW",
    label: "Workflow Scope",
    headline: "Map the manual workflows & tools we are replacing",
    subtitle:
      "Tap any quick-scope tags that apply or describe how your team operates today.",
  },
  {
    id: "parameters",
    index: 2,
    code: "03 // PARAMETERS",
    label: "Scope & Timeline",
    headline: "Calibrate your target timeline, budget & service area",
    subtitle:
      "Every build ships in weekly staging releases with 100% source-code ownership.",
  },
  {
    id: "dispatch",
    index: 3,
    code: "04 // DISPATCH",
    label: "Launch Brief",
    headline: "Where should Chandler send your architecture review?",
    subtitle:
      "Direct principal-engineer review—no sales reps or account manager layers.",
  },
] as const;

export function getStepFocusSummary(stepId: WizardStepId): string {
  switch (stepId) {
    case "system":
      return "TOPOLOGY // SELECTING CORE CAPABILITY NODES";
    case "workflow":
      return "PIPELINE // WIRING WORKFLOWS & API BRIDGES";
    case "parameters":
      return "CADENCE // CALIBRATING DELIVERY & OWNERSHIP SPEC";
    case "dispatch":
      return "DISPATCH // READY FOR PRINCIPAL ARCHITECT REVIEW";
    default: {
      const _exhaustive: never = stepId;
      return _exhaustive;
    }
  }
}
