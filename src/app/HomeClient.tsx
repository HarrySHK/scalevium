'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Landmark, HeartPulse, Layers, ShoppingCart, Building2, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import Button from "@/components/Button";
import MarqueeBand from "@/components/MarqueeBand";
import StatCard from "@/components/StatCard";
import PerspectiveStack from "@/components/PerspectiveStack";
import ComparisonTable from "@/components/ComparisonTable";
import EditorialRow from "@/components/EditorialRow";
import IndustryCard from "@/components/IndustryCard";
import TiltCard from "@/components/TiltCard";
import StepItem from "@/components/StepItem";
import FAQAccordion from "@/components/FAQAccordion";
import CaseStudyTeaser from "@/components/CaseStudyTeaser";
import { getHomepageCaseStudies } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = ["AI & Machine Learning", "Cloud & DevOps", "Full-Stack Engineering", "Data & Platform", "Mobile"];

const STATS = [
  { index: "01", value: 48, suffix: "h", label: "Engineer placement", sublabel: "From an approved order — often from the bench", barPercent: 92 },
  { index: "02", value: 3, suffix: " days", label: "Replacement guarantee", sublabel: "3–5 business days if a placement isn't working out", barPercent: 74 },
  { index: "03", value: 80, suffix: "%+", label: "Target utilisation", sublabel: "Across active engagements", barPercent: 80 },
  { index: "04", value: 90, suffix: "%+", label: "Engagement retention", sublabel: "Completing their committed term", barPercent: 90 },
];

const TECH_ITEMS = [
  { title: "AI & Machine Learning Engineers", desc: "LLM integrations, agentic workflows, and RAG pipelines built and reviewed like production code." },
  { title: "Full-Stack & Backend Engineers", desc: "Modern web platforms, distributed services, and APIs — vetted for craft, not just credentials." },
  { title: "Cloud & DevOps Architects", desc: "Infrastructure as code, CI/CD, and zero-downtime deployment pipelines." },
  { title: "Data & Platform Engineers", desc: "Streaming pipelines, data warehouses, and the infrastructure that feeds AI systems." },
  { title: "Mobile Engineers", desc: "Native and cross-platform apps built to the same review bar as the rest of the stack." },
  { title: "QA & Test Automation Engineers", desc: "Regression and integration coverage so nothing ships on a developer's laptop." },
];

const INDUSTRIES = [
  { icon: <Landmark size={17} />, industry: "Fintech & Payments", useCase: "Embedded backend and security-minded engineers for regulated infrastructure." },
  { icon: <HeartPulse size={17} />, industry: "Healthcare & Health Tech", useCase: "Managed pods delivering patient-facing and clinical-operations software." },
  { icon: <Layers size={17} />, industry: "SaaS & Developer Tools", useCase: "Staff-augmented senior engineers embedded directly in product squads." },
  { icon: <ShoppingCart size={17} />, industry: "E-commerce & Logistics", useCase: "Full-stack and data engineers for high-throughput commerce platforms." },
  { icon: <Building2 size={17} />, industry: "Enterprise IT", useCase: "Fractional CTO-led pods modernising legacy systems and cloud migration." },
  { icon: <Rocket size={17} />, industry: "Early-stage Product", useCase: "A complete managed engineering pod for founders without a technical co-founder." },
];

const TRUST_ITEMS = [
  { num: "01", title: "Chain-of-title IP assignment", description: "Every engineer signs an IP assignment before starting. Ownership travels engineer → Scalevium → client, and transfers on payment in full." },
  { num: "02", title: "5-stage vetting funnel", description: "AI screen, live proctored coding, structured behavioural interview, identity verification, and background check — roughly 3–5% of applicants pass." },
  { num: "03", title: "Sanctions & data screening", description: "Every engineer and client is screened against the OFAC SDN list at onboarding and quarterly thereafter, with evidence retained." },
  { num: "04", title: "48-hour breach commitment", description: "Suspected incidents are contained within 1 hour and clients are notified within 48 hours of a confirmed incident." },
  { num: "05", title: "GDPR-aligned data handling", description: "We act as a processor under GDPR Article 28 for EU/UK engagements, with least-privilege access and no client data used to train models." },
  { num: "06", title: "Enterprise-only AI tooling", description: "Only approved enterprise-tier AI tools with no-training-on-your-code guarantees touch client-confidential code — personal AI accounts never do." },
];

const PROCESS_ITEMS = [
  { num: "01", title: "Discovery & track fit", description: "A structured discovery call determines staff augmentation vs. a managed pod — or a short paid Diagnostic Scoping Phase if it's genuinely unclear." },
  { num: "02", title: "Vetting & placement", description: "Candidates clear five gates before reaching the bench; approved orders are placed within 48 hours." },
  { num: "03", title: "Two-week sprint cadence", description: "Planning, daily standup, review, and retrospective — client-facing demos and a written Definition of Done every sprint." },
  { num: "04", title: "Weekly accountability", description: "Pulse checks every two weeks, telemetry on velocity and response time, and a replacement guarantee if it isn't working." },
];

const FAQ_ITEMS = [
  { q: "How fast can you place an engineer?", a: "Within 48 hours of an approved order, usually filled from our qualified bench. Sourcing a net-new skill set typically takes about 5 business days." },
  { q: "What happens if a placement doesn't work out?", a: "The first 1–2 weeks of any placement are risk-free. After that, we guarantee a qualified replacement within 3–5 business days, and we own the knowledge transfer." },
  { q: "Who owns the code and IP?", a: "You do. Every engineer signs an IP assignment before starting, and ownership transfers to you on full payment — never before." },
  { q: "Is this a fixed-price project?", a: "No. Every managed-pod engagement is an agile retainer, not a fixed-scope build — scope changes go through a written change request instead of silently absorbing risk on either side." },
  { q: "Do you handle compliance and data protection?", a: "Yes — sanctions screening, GDPR/CCPA-aligned data handling, signed NDAs and IP assignments, and a documented 48-hour breach-notification commitment." },
];

function PanelChrome({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ background: "var(--bg-surface)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderBottom: "1px solid var(--border-card-faint)" }}>
        <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: accent || "var(--accent-light)" }} />
        <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{title}</span>
      </div>
      <div style={{ padding: "1rem" }}>{children}</div>
    </div>
  );
}

function RosterPanel() {
  const rows = [
    { n: "Senior Backend Engineer", m: "Cleared 5/5 gates", p: 100 },
    { n: "AI/ML Engineer", m: "Cleared 5/5 gates", p: 100 },
    { n: "DevOps Architect", m: "Background check", p: 78 },
    { n: "QA Automation", m: "Live coding", p: 46 },
  ];
  return (
    <PanelChrome title="Pod roster — vetting">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {rows.map((r) => (
          <div key={r.n} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.78125rem", fontWeight: 600, color: "var(--text-card-primary)" }}>{r.n}</span>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{r.m}</span>
            </div>
            <div style={{ height: "0.1875rem", background: "var(--border-subtle)", borderRadius: "0.1875rem", overflow: "hidden" }}>
              <div style={{ width: r.p + "%", height: "100%", background: r.p === 100 ? "var(--success)" : "var(--accent-light)" }} />
            </div>
          </div>
        ))}
      </div>
    </PanelChrome>
  );
}

function SprintPanel() {
  const cols: [string, number][] = [["Backlog", 5], ["In progress", 3], ["Review", 2], ["Done", 11]];
  return (
    <PanelChrome title="Sprint 14 — two-week cadence">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem" }}>
        {cols.map(([label, n], ci) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)", fontWeight: 600 }}>{label}</div>
            {Array.from({ length: Math.min(n, 4) }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "1.375rem",
                  borderRadius: "0.3125rem",
                  border: "1px solid var(--border-card-faint)",
                  background: ci === 3 ? "var(--success-tint)" : ci === 1 ? "var(--accent-tint)" : "var(--bg-card)",
                }}
              />
            ))}
            <div style={{ fontSize: "0.65625rem", color: "var(--text-muted)" }}>{n} items</div>
          </div>
        ))}
      </div>
    </PanelChrome>
  );
}

function TelemetryPanel() {
  const bars = [40, 62, 55, 78, 70, 88, 94];
  return (
    <PanelChrome title="Delivery telemetry" accent="var(--success)">
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.375rem", height: "4.625rem" }}>
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: b + "%",
              borderRadius: "0.1875rem 0.1875rem 0 0",
              background: i === bars.length - 1 ? "var(--success)" : "var(--accent-light)",
              opacity: i === bars.length - 1 ? 1 : 0.35,
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: "0.625rem", display: "flex", justifyContent: "space-between", fontSize: "0.65625rem", color: "var(--text-muted)" }}>
        <span>Velocity, last 7 sprints</span>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>On track</span>
      </div>
    </PanelChrome>
  );
}

export default function HomeClient() {
  const processListRef = useRef<HTMLDivElement>(null);
  const processFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!processListRef.current || !processFillRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(processFillRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        processFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: processListRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="section-pad-hero" style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "67.5rem" }}>
          <span className="eyebrow-minimal">SCALEVIUM &nbsp;/&nbsp; GLOBAL ENGINEERING PARTNER</span>
          <RevealHeading tag="h1" className="hero-title" text="Engineering Without Limits." accentFrom={2} />
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "40rem" }}>
            <p className="section-sub-editorial">
              We place vetted senior engineers inside your team, or hire and run a complete engineering pod for you — sourced globally, accountable to US delivery standards.
            </p>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <Button href="/contact">Start a Conversation</Button>
              <Button variant="link" href="/services">See how it works</Button>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand items={CAPABILITIES} speed={38} />

      {/* STATS */}
      <section className="section-pad-standard" style={{ position: "relative", zIndex: 3 }}>
        <div className="container">
          <div className="grid-responsive-4">
            {STATS.map((s) => (
              <div key={s.label} style={{ height: "100%" }}>
                <StatCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE A MANAGED POD */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", overflow: "hidden", position: "relative", zIndex: 3 }}>
        <div className="container two-col-split">
          <div>
            <span className="eyebrow-minimal">INSIDE A MANAGED POD</span>
            <RevealHeading tag="h2" className="section-heading-editorial" text="You See The Delivery, Not The Machinery." accentFrom={3} />
            <p className="section-sub-editorial" style={{ marginTop: "1.5rem", maxWidth: "28.75rem" }}>
              Vetting gates, sprint boards, and velocity telemetry all run underneath a Fractional CTO who is your single point of contact — you get demos and written summaries, not standup invitations.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {["Five vetting gates before anyone reaches your codebase", "Two-week sprints with a written Definition of Done", "Velocity and response-time telemetry every cycle"].map((t) => (
                <div key={t} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Check size={15} color="var(--accent-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.90625rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <PerspectiveStack height={560} panels={[<TelemetryPanel key="t" />, <SprintPanel key="s" />, <RosterPanel key="r" />]} />
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">TWO WAYS TO ENGAGE</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Staff Augmentation, Or We Run The Whole Pod." accentFrom={4} style={{ marginBottom: "1.25rem", maxWidth: "47.5rem" }} />
          <ScrollReveal>
            <p className="section-sub-editorial" style={{ marginBottom: "2.5rem", maxWidth: "38.75rem" }}>
              If you have someone to manage an engineer, that's staff augmentation. If you want the management problem itself to go away, that's a managed pod.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <ComparisonTable
              columns={["Staff Augmentation", "Managed Engineering Pod"]}
              rows={[
                { label: "What you get", values: ["Vetted engineers who join your team", "A complete team we hire and lead"] },
                { label: "Who manages the work", values: ["You do", "We do — a Fractional CTO is the single contact"] },
                { label: "Best for", values: ["A VP Eng, CTO, or Eng Manager", "A non-technical founder or busy CEO"] },
                { label: "You attend standups?", values: ["Yes, you run them", "No — weekly summaries and milestone demos"] },
                { label: "Pricing", values: ["Hourly or monthly retainer", "Monthly retainer + Fractional CTO layer"] },
                { label: "Starts with", values: ["A 48-hour placement", "A paid 1–2 week Diagnostic Phase"] },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* TECHNICAL DOMAINS */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">TECHNICAL DOMAINS</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Roles We Place And Pods We Build." accentFrom={3} style={{ marginBottom: "2.5rem", maxWidth: "43.75rem" }} />
          {TECH_ITEMS.map((item) => (
            <EditorialRow key={item.title} title={item.title} description={item.desc} />
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">WHERE WE DELIVER</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Use Cases By Industry." accentFrom={2} style={{ marginBottom: "2.75rem" }} />
          <div className="grid-responsive-3">
            {INDUSTRIES.map((it) => (
              <ScrollReveal key={it.industry}>
                <TiltCard padding={0} glow={false}>
                  <IndustryCard {...it} />
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">TRUST & SECURITY</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Built On A Real Contract And Compliance Stack." accentFrom={4} style={{ marginBottom: "3.75rem", maxWidth: "43.75rem" }} />
          <div className="grid-responsive-2">
            {TRUST_ITEMS.map((item) => (
              <ScrollReveal key={item.num}>
                <StepItem {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container responsive-timeline-container">
          <ScrollReveal>
            <span className="eyebrow-minimal">ENGINEERING STANDARDS</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="How Delivery Actually Works." accentFrom={2} style={{ marginBottom: "3.75rem" }} />
          <div className="responsive-timeline-line">
            <div ref={processFillRef} style={{ width: "100%", height: "100%", background: "var(--accent-light)", transform: "scaleY(0)" }} />
          </div>
          <div ref={processListRef} style={{ display: "flex", flexDirection: "column", gap: "3.125rem" }}>
            {PROCESS_ITEMS.map((s) => (
              <ScrollReveal key={s.num}>
                <StepItem {...s} variant="timeline" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">FAQ</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Common Questions." accentFrom={1} style={{ marginBottom: "1.875rem", maxWidth: "43.75rem" }} />
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <CaseStudyTeaser studies={getHomepageCaseStudies()} />

      <CTASection
        heading="Ready To Build Your Next Breakthrough?"
        description="Tell us what you're building — we'll tell you which track fits, usually within one business day."
        primaryLabel="Start a Project"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </div>
  );
}
