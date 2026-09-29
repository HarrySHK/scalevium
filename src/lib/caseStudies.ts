export type CaseStudyComplexity = {
  title: string;
  body: string;
};

export type CaseStudyPortfolio = "software" | "ai";

export type CaseStudy = {
  slug: string;
  name: string;
  portfolio: CaseStudyPortfolio;
  category: string;
  oneLiner: string;
  complexity: CaseStudyComplexity[];
  stack: string[];
  liveUrl?: string;
  /** Path under /public for card and hero visuals */
  imageSrc: string;
  /** Subtle per-project accent for hover and detail page accents */
  accentColor: string;
  /** Honest scope note when Scalevium was not sole author */
  contributionNote?: string;
};

/** Tab labels for /case-studies — AI tab is first and default. */
export const CASE_STUDY_PORTFOLIO_FILTERS = ["AI Projects", "Software Projects"] as const;
export type CaseStudyPortfolioFilter = (typeof CASE_STUDY_PORTFOLIO_FILTERS)[number];

const PORTFOLIO_FILTER_TO_KEY: Record<CaseStudyPortfolioFilter, CaseStudyPortfolio> = {
  "AI Projects": "ai",
  "Software Projects": "software",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fleetquix-tripsheet",
    name: "FleetQuix",
    portfolio: "software",
    category: "Logistics & Fleet Ops",
    oneLiner:
      "Multi-tenant transportation management system with isolated per-carrier workspaces, granular role-based access, and master data tooling built for high-volume fleet operations.",
    complexity: [
      {
        title: "True Multi-Tenancy",
        body: "Isolated per-carrier workspaces with automated lifecycle management — each carrier operates in its own scoped environment without cross-tenant data leakage.",
      },
      {
        title: "Granular Self-Scoping RBAC",
        body: "Role separation across drivers, dispatchers, and accounting with self-scoping permissions — users see only the data their role and scope allow.",
      },
      {
        title: "Master Data Management",
        body: "Duplicate-detection and bulk CSV ingestion with dry-run validation before commit — bad data is caught before it enters production records.",
      },
    ],
    stack: ["TypeScript", "React/Next.js", "Node.js", "MongoDB Atlas"],
    imageSrc: "/case-studies/fleetquix-tripsheet.png",
    accentColor: "#14b8a6",
  },
  {
    slug: "earthquickalert",
    name: "Earthquickalert",
    portfolio: "software",
    category: "Geospatial & Emergency Response",
    oneLiner:
      "Real-time disaster-management platform unifying DOT road-closure feeds and power-outage data into a single geospatial view with offline-capable mobile reporting.",
    complexity: [
      {
        title: "Unified Real-Time Feeds",
        body: "Disaster-management platform unifying WZDX DOT feeds (10+ states) and ODIN power-outage data into one operational layer.",
      },
      {
        title: "Optimized GeoJSON Rendering",
        body: "GeoJSON parsing into optimized Leaflet layers with viewport-bounding — only data in the visible map region is rendered.",
      },
      {
        title: "Geospatial Access Control",
        body: "Haversine radius-based geospatial access control — users and alerts are scoped to geographic proximity, not just account boundaries.",
      },
      {
        title: "Decoupled Notification Queue",
        body: "Inngest/Redis notification queue decoupled from the request path — alerts dispatch reliably without blocking the main application flow.",
      },
      {
        title: "Offline Mobile Reporting",
        body: "Offline-capable mobile reporting with Cloudinary direct uploads — field teams can capture and queue reports without continuous connectivity.",
      },
    ],
    stack: ["React Native/Expo", "Next.js", "Node.js", "Upstash Redis", "MongoDB", "Leaflet GIS", "Inngest"],
    liveUrl: "https://earthquickalert.vercel.app",
    imageSrc: "/case-studies/earthquickalert.png",
    accentColor: "#f97316",
  },
  {
    slug: "stackone",
    name: "StackOne",
    portfolio: "software",
    category: "Integration Infrastructure",
    oneLiner:
      "Universal API layer normalizing HRIS, ATS, LMS, and CRM platforms into one data model — with zero-data-storage webhooks and MCP-based tool-calling for AI agents.",
    complexity: [
      {
        title: "Universal API Normalization",
        body: "Universal API layer normalizing HRIS/ATS/LMS/CRM platforms into one data model — a single integration surface across heterogeneous enterprise systems.",
      },
      {
        title: "Zero-Data-Storage Webhooks",
        body: "Webhook architecture designed for PII compliance with zero persistent storage of sensitive payloads — data passes through, it is not retained.",
      },
      {
        title: "MCP Tool-Calling",
        body: "Supports MCP-based tool-calling for autonomous AI agents — external AI systems can invoke integrations through a standardized protocol.",
      },
    ],
    stack: ["API architecture", "Webhooks", "Node.js/TypeScript", "Enterprise auth", "AI tool-calling"],
    liveUrl: "https://stackone.com",
    contributionNote:
      "Scalevium provided engineering support within the larger StackOne product — integration architecture, webhook flows, and backend implementation — not sole authorship of the platform.",
    imageSrc: "/case-studies/stackone.png",
    accentColor: "#8b5cf6",
  },
  {
    slug: "towcentric",
    name: "Towcentric",
    portfolio: "software",
    category: "Fleet & Dispatch SaaS",
    oneLiner:
      "Fleet dispatch platform ingesting automated license-plate-scanner hardware alerts into live dispatch tickets with real-time WebSocket dashboards.",
    complexity: [
      {
        title: "Hardware Webhook Ingestion",
        body: "Backend webhook listeners ingesting automated license-plate-scanner hardware alerts into dispatch tickets — hardware events become actionable tickets without manual entry.",
      },
      {
        title: "Real-Time Dispatch Dashboards",
        body: "Low-latency dispatch dashboards via WebSocket — no manual refresh required; dispatchers see ticket and fleet state as it changes.",
      },
    ],
    stack: ["Node.js/Express", "React", "WebSocket/real-time APIs"],
    liveUrl: "https://towcentric.com",
    imageSrc: "/case-studies/towcentric.png",
    accentColor: "#3b82f6",
  },
  {
    slug: "experihaus",
    name: "experiHAUS",
    portfolio: "software",
    category: "Hospitality Technology",
    oneLiner:
      "Multi-client hospitality backend serving a Smart TV in-room guest app and a hotel-staff admin dashboard from one NestJS codebase.",
    complexity: [
      {
        title: "Multi-Client Backend",
        body: "One NestJS backend serving a Smart TV in-room guest app and a separate hotel-staff admin dashboard — two client surfaces, one shared API layer.",
      },
      {
        title: "Modular Resource Routing",
        body: "Modular resource routing and secure session management across both clients — guest and staff sessions are isolated with appropriate access boundaries.",
      },
    ],
    stack: ["NestJS", "TypeScript", "React", "Smart TV development"],
    liveUrl: "https://experihaus.com",
    imageSrc: "/case-studies/experihaus.png",
    accentColor: "#d4a574",
  },
  {
    slug: "ai-hospitality-receptionist",
    name: "Hotel AI Receptionist",
    portfolio: "ai",
    category: "Hospitality · Reservations",
    oneLiner:
      "Industry-trained AI for hotels and hospitality — answers reservation calls around the clock, quotes live rates from the PMS, captures anniversary and accessibility details, and completes bookings while the front desk is with in-person guests.",
    complexity: [
      {
        title: "End-to-End Reservation Calls",
        body: "Guides callers through dates, room types, and rate plans in conversation, checks real-time availability, and confirms reservations on the call instead of sending peak-time traffic to voicemail.",
      },
      {
        title: "Guest Context Before Arrival",
        body: "Records early check-in requests, bed preferences, dietary needs, and special occasions so housekeeping and concierge teams can act before the guest walks in.",
      },
      {
        title: "Property System Integration",
        body: "Syncs with Opera, Cloudbeds, Mews, and comparable PMS stacks — availability, guest notes, and confirmed stays flow into the systems staff already use.",
      },
      {
        title: "Upsell & Group Inquiries",
        body: "Suggests upgrades and packages during booking, gathers requirements for corporate blocks and events, and routes qualified group leads to sales when human follow-up is required.",
      },
      {
        title: "In-Stay Service & Concierge",
        body: "Handles amenity questions, logs housekeeping and maintenance requests, and escalates VIP or sensitive cases to on-site staff with full call context.",
      },
    ],
    stack: ["Conversational AI", "Real-time PMS APIs", "Telephony", "Secure deposits", "Multilingual NLU"],
    imageSrc: "/case-studies/ai-hospitality-receptionist.png",
    accentColor: "#38bdf8",
  },
  {
    slug: "ai-med-spa-receptionist",
    name: "AI Receptionist for Med Spas",
    portfolio: "ai",
    category: "Medical Aesthetics",
    oneLiner:
      "AI phone agent tuned for medical spas — books complimentary consultations and paid treatments for Botox, fillers, laser, and body contouring when staff are with clients, matches callers to preferred injectors, and syncs to Boulevard, Mangomint, and similar platforms.",
    complexity: [
      {
        title: "Service Menu Intelligence",
        body: "Understands neurotoxins, dermal fillers, laser hair removal, IPL, microneedling, HydraFacial, and package pricing — never invents rates; uses the practice’s configured menu and promotions.",
      },
      {
        title: "Injector & Provider Scheduling",
        body: "Books into a named provider’s calendar when requested, offers the next qualified opening when they are full, and respects per-treatment duration and device constraints.",
      },
      {
        title: "High-Intent Lead Capture",
        body: "Most aesthetic callers will not leave voicemail — the system completes consultation booking on the first call, including new-client status, interests, and timeline.",
      },
      {
        title: "Financing & Membership Questions",
        body: "Answers Cherry, CareCredit, and package or membership questions from scripted policy, then captures buyers who need a human close.",
      },
      {
        title: "Privacy-Conscious Operations",
        body: "Encrypted sessions, minimal intake fields, clinical questions deferred to licensed staff, and architecture suitable for BAA-backed deployments.",
      },
    ],
    stack: ["AI receptionist", "Med spa scheduling APIs", "HIPAA-conscious design", "SMS intake links", "Promotion surge handling"],
    imageSrc: "/case-studies/ai-med-spa-receptionist.png",
    accentColor: "#f472b6",
  },
  {
    slug: "ai-therapy-receptionist",
    name: "Therapy Practice AI Intake",
    portfolio: "ai",
    category: "Mental Health · HIPAA",
    oneLiner:
      "HIPAA-aligned AI intake for therapy and counseling practices — picks up while clinicians are in session, runs warm intake for anxiety and trauma seekers, collects insurance and availability, and schedules into SimplePractice, TherapyNotes, and peer EHRs.",
    complexity: [
      {
        title: "Coverage During Sessions",
        body: "Answers on the first ring when therapists cannot — the majority of therapy seekers call multiple practices and rarely leave voicemail if no one picks up.",
      },
      {
        title: "Empathetic Intake Flows",
        body: "Gathers contact information, insurance, presenting concerns, and schedule preferences with language suited to mental health outreach, not generic call-center scripts.",
      },
      {
        title: "Crisis & Safety Routing",
        body: "Recognizes configured crisis indicators and follows practice playbooks — on-call clinician, 988 or local crisis handoff, or emergency escalation without giving clinical advice.",
      },
      {
        title: "Group Practice Matching",
        body: "For multi-clinician offices, routes new clients by specialty, modality (CBT, EMDR, couples), and open slots across providers.",
      },
      {
        title: "Telehealth & Reminders",
        body: "Explains in-person vs secure video options, books the right session type, and supports confirmation workflows that reduce no-shows.",
      },
    ],
    stack: ["AI intake flows", "HIPAA + BAA", "SimplePractice / TherapyNotes", "Crisis protocols", "Telehealth scheduling"],
    imageSrc: "/case-studies/ai-therapy-receptionist.png",
    accentColor: "#a78bfa",
  },
  {
    slug: "ai-gym-receptionist",
    name: "Automated Booking for Gyms",
    portfolio: "ai",
    category: "Fitness & Studios",
    oneLiner:
      "Automated AI booking for gyms and fitness studios — explains membership tiers and class access, books tours and personal training after the desk closes, and pushes confirmed leads to Mindbody, GloFox, and Zen Planner schedules.",
    complexity: [
      {
        title: "Membership Discovery Calls",
        body: "Walks prospects through Basic, premium, and training-inclusive plans, ties recommendations to stated goals (weight loss, strength, classes), and answers payment-method questions on the call.",
      },
      {
        title: "Tour & PT Booking",
        body: "Schedules facility tours and intro training sessions in under a few minutes, with SMS confirmation and instant lead details for the sales team.",
      },
      {
        title: "After-Hours Demand",
        body: "Captures evening and weekend callers when staff have left — a common window for new-member research — without losing them to the next gym on the list.",
      },
      {
        title: "Class & Schedule Questions",
        body: "Answers schedule and amenity questions, books class spots where integrated, and keeps front-desk staff focused on members on the floor.",
      },
      {
        title: "Retention & Cancellation Signals",
        body: "Documents downgrade and cancel intent with context so member success can respond before annual value walks out the door.",
      },
    ],
    stack: ["AI scheduling", "Mindbody / GloFox / Zen Planner", "Lead routing", "SMS confirmations", "Multi-location"],
    imageSrc: "/case-studies/ai-gym-receptionist.png",
    accentColor: "#22c55e",
  },
  {
    slug: "ai-spa-receptionist",
    name: "AI Receptionist for Spas",
    portfolio: "ai",
    category: "Day Spa · Massage",
    oneLiner:
      "AI receptionist for day spas and massage studios — books singles and couples treatments, coordinates two therapists and suite availability, collects health and pressure preferences, and syncs to Mindbody, Booker, and Zenoti.",
    complexity: [
      {
        title: "Couples & Multi-Guest Booking",
        body: "Finds aligned slots for couples massages, holds the couples suite when required, and quotes duration-based packages (60 vs 90 minutes, add-ons, aromatherapy).",
      },
      {
        title: "Therapist & Room Coordination",
        body: "Matches gender or therapist preferences when offered, avoids double-booking providers or treatment rooms, and writes the appointment to spa scheduling software in real time.",
      },
      {
        title: "Pre-Treatment Intake",
        body: "Captures pressure preference, focus areas, injuries, pregnancy considerations, and essential-oil allergies before the guest arrives.",
      },
      {
        title: "Deposits & No-Show Control",
        body: "Supports deposit capture per policy, sends text confirmations with pre-arrival guidance, and pairs with reminder flows to protect booked revenue.",
      },
      {
        title: "High-Volume Phone Preference",
        body: "Built for the majority of spa clients who still prefer calling over web booking — especially for first visits and gift experiences.",
      },
    ],
    stack: ["Conversational AI", "Spa scheduling APIs", "Deposits & payments", "SMS reminders", "Bilingual NLU"],
    imageSrc: "/case-studies/ai-spa-receptionist.png",
    accentColor: "#2dd4bf",
  },
  {
    slug: "ai-dental-receptionist",
    name: "Dental Office AI Scheduling",
    portfolio: "ai",
    category: "General Dentistry",
    oneLiner:
      "AI scheduling for dental offices — schedules hygiene and restorative visits while the team is chair-side or at lunch, completes new-patient and Delta Dental–style insurance intake, and escalates toothaches and trauma to on-call dentists.",
    complexity: [
      {
        title: "Chair-Side & Lunch Gap Coverage",
        body: "Answers the large share of calls that arrive during procedures, mid-day closures, and evenings — when many practices still lose patients to voicemail.",
      },
      {
        title: "New Patient Workups",
        body: "Collects legal name, contact, carrier, member ID, dental history, and chief complaint so the front desk starts the first visit with a complete chart packet.",
      },
      {
        title: "Procedure-Length Scheduling",
        body: "Books cleanings, exams, fillings, and crown visits against provider templates in Dentrix, Open Dental, Eaglesoft, and similar PMS tools without double-booking operatory time.",
      },
      {
        title: "Emergency Detection",
        body: "Flags severe pain, swelling, avulsed teeth, and abscess symptoms — notifies on-call staff with summaries and patient comfort steps while booking urgent slots when available.",
      },
      {
        title: "Reminders & Waitlist Fill",
        body: "Supports automated confirmation and reminder patterns that cut no-shows, and can outreach waitlist patients when cancellations open same-day production.",
      },
    ],
    stack: ["AI triage", "HIPAA compliance", "Dental PMS sync", "Emergency SMS alerts", "Waitlist automation"],
    imageSrc: "/case-studies/ai-dental-receptionist.png",
    accentColor: "#60a5fa",
  },
];

export const HOMEPAGE_CASE_STUDY_SLUGS = [
  "fleetquix-tripsheet",
  "earthquickalert",
  "experihaus",
] as const;

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((cs) => cs.slug);
}

export function getCaseStudyPortfolioFilters(): CaseStudyPortfolioFilter[] {
  return [...CASE_STUDY_PORTFOLIO_FILTERS];
}

/** @deprecated Use getCaseStudyPortfolioFilters — kept for any stale imports */
export function getCaseStudyCategories(): string[] {
  return getCaseStudyPortfolioFilters();
}

export function portfolioFilterToKey(filter: string): CaseStudyPortfolio | "all" {
  if (filter in PORTFOLIO_FILTER_TO_KEY) {
    return PORTFOLIO_FILTER_TO_KEY[filter as CaseStudyPortfolioFilter];
  }
  return "all";
}

export function getHomepageCaseStudies(): CaseStudy[] {
  return HOMEPAGE_CASE_STUDY_SLUGS.map((slug) => getCaseStudyBySlug(slug)).filter(
    (cs): cs is CaseStudy => cs !== undefined
  );
}
