export type AIIndustrySolution = {
  title: string;
  description: string;
  contactLabel: string;
};

export const AI_CONTACT_INTEREST = encodeURIComponent("AI voice agent");

export const AI_INDUSTRY_SOLUTIONS: AIIndustrySolution[] = [
  {
    title: "Hospitality",
    description:
      "Hotel AI receptionists that book on the call around the clock, plus in-room Smart TV guest apps and staff dashboards — connected to Opera PMS, Cloudbeds, Mews, and channel managers.",
    contactLabel: "Talk about AI for hospitality",
  },
  {
    title: "Healthcare",
    description:
      "HIPAA-conscious voice and chat AI for dental, therapy, and med spa practices — scheduling, intake, and safety routing into Dentrix, SimplePractice, TherapyNotes, Boulevard, and related systems.",
    contactLabel: "Talk about AI for healthcare",
  },
  {
    title: "Fitness & Wellness",
    description:
      "AI that answers after-hours membership and tour calls, books personal training, and coordinates spa treatments without double-booking — integrated with Mindbody, GloFox, Zenoti, and Booker.",
    contactLabel: "Talk about AI for fitness & wellness",
  },
  {
    title: "Logistics & Dispatch",
    description:
      "Multi-carrier platforms, live dispatch dashboards, and AI agents that turn ALPR alerts and documents into tickets and updated records — built for fleet and towing operations.",
    contactLabel: "Talk about AI for logistics & dispatch",
  },
  {
    title: "Public Safety & GIS",
    description:
      "Unified live maps of closures and outages, radius-based alerts, and offline field reporting for emergency and infrastructure teams.",
    contactLabel: "Talk about AI for public safety & GIS",
  },
  {
    title: "SaaS & Integrations",
    description:
      "Unified API layers, webhook pipelines, and AI features — including MCP tool-calling — inside existing SaaS and enterprise products.",
    contactLabel: "Talk about AI for SaaS & platforms",
  },
];

export function aiDevelopmentContactHref(): string {
  return `/contact?interest=${AI_CONTACT_INTEREST}`;
}
