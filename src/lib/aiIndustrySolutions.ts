export type AIIndustrySolution = {
  title: string;
  description: string;
  contactLabel: string;
};

export const AI_CONTACT_INTEREST = encodeURIComponent("AI Development");

export const AI_INDUSTRY_SOLUTIONS: AIIndustrySolution[] = [
  {
    title: "Fintech & Payments",
    description:
      "Document intelligence and automated compliance review for regulated infrastructure; AI-assisted reconciliation and risk-flagging workflows built on enterprise-only tooling with no cross-client data reuse.",
    contactLabel: "Talk about AI for Fintech & Payments",
  },
  {
    title: "Healthcare & Health Tech",
    description:
      "Retrieval-augmented systems for clinical and operational knowledge bases, and document extraction from patient-adjacent paperwork. Operational and administrative support only — not diagnostic or clinical decision-making.",
    contactLabel: "Talk about AI for Healthcare & Health Tech",
  },
  {
    title: "SaaS & Developer Tools",
    description:
      "Autonomous in-product AI agents and production LLM features built for high-frequency reasoning and search at scale within existing platforms.",
    contactLabel: "Talk about AI for SaaS & Developer Tools",
  },
  {
    title: "E-commerce & Logistics",
    description:
      "AI calling and voice agents for order support and customer operations, integrated with existing CRM and telephony; intelligent routing and process automation for high-throughput operations.",
    contactLabel: "Talk about AI for E-commerce & Logistics",
  },
  {
    title: "Enterprise IT",
    description:
      "Enterprise RAG architectures over internal knowledge bases to support legacy modernization and cloud migration work; private-data retrieval with no data leaving the client's environment.",
    contactLabel: "Talk about AI for Enterprise IT",
  },
  {
    title: "Early-Stage Product",
    description:
      "Fast, production-grade generative AI feature builds for founders validating an AI-native product without an in-house AI team yet.",
    contactLabel: "Talk about AI for Early-Stage Product",
  },
];

export function aiDevelopmentContactHref(): string {
  return `/contact?interest=${AI_CONTACT_INTEREST}`;
}
