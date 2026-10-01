import ScrollReveal from "@/components/ScrollReveal";
import RevealHeading from "@/components/RevealHeading";
import AIIndustryRow from "@/components/AIIndustryRow";
import { AI_INDUSTRY_SOLUTIONS, aiDevelopmentContactHref } from "@/lib/aiIndustrySolutions";

export default function AISolutionsByIndustry() {
  const contactHref = aiDevelopmentContactHref();

  return (
    <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow-minimal">BY INDUSTRY</span>
        </ScrollReveal>
        <RevealHeading
          tag="h2"
          className="section-heading-editorial"
          style={{ marginBottom: "2.5rem", maxWidth: "43.75rem" }}
          text="Built For Your Industry."
          accentFrom={2}
        />
        <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {AI_INDUSTRY_SOLUTIONS.map((row) => (
            <ScrollReveal key={row.title}>
              <AIIndustryRow
                title={row.title}
                description={row.description}
                contactHref={contactHref}
                contactLabel={row.contactLabel}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
