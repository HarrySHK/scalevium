'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Check, Hotel, HeartPulse, Dumbbell, Truck, MapPin, Layers, PhoneOff, FileStack, Unplug, Globe, Smartphone, Server, Cloud, ArrowUpRight, Target, ShieldCheck, Lock, MessageSquare, Handshake } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import RevealHeading from "@/components/RevealHeading";
import Button from "@/components/Button";
import MarqueeBand from "@/components/MarqueeBand";
import StatCard from "@/components/StatCard";
import PerspectiveStack from "@/components/PerspectiveStack";
import EditorialRow from "@/components/EditorialRow";
import IndustryCard from "@/components/IndustryCard";
import TiltCard from "@/components/TiltCard";
import StepItem from "@/components/StepItem";
import FAQAccordion from "@/components/FAQAccordion";
import CaseStudyTeaser from "@/components/CaseStudyTeaser";
import PremiumPlatformGrid from "@/components/PremiumPlatformGrid";
import PremiumIndustryGrid from "@/components/PremiumIndustryGrid";
import { getHomepageCaseStudies } from "@/lib/caseStudies";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";
import { CONTACT_EMAIL } from "@/lib/site";
import { MotionLayerContext } from "@/components/motion/MotionLayerContext";
import HomeHeroVisual from "@/components/home/HomeHeroVisual";
import { useHomeMotion } from "@/hooks/useHomeMotion";
gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  "AI Voice Agents",
  "AI Agents & Automation",
  "AI Chat Assistants",
  "Knowledge AI",
  "AI Integration",
  "Web & Mobile Engineering",
];

const STATS = [
  { index: "01", value: 11, suffix: "", label: "Projects shipped", sublabel: "6 AI systems and 5 software platforms", barPercent: 88 },
  { index: "02", value: 10, suffix: "", label: "Industries served", sublabel: "Hospitality, healthcare, fitness, logistics, and more", barPercent: 82 },
  { index: "03", value: 6, suffix: "", label: "AI systems live", sublabel: "Voice agents, intake, and booking in production", barPercent: 76 },
  { index: "04", value: 48, suffix: "h", label: "Engineer placement", sublabel: "Staff augmentation — often within 48 hours of approval", barPercent: 92 },
];

const PROBLEM_ITEMS = [
  { icon: <PhoneOff size={17} />, industry: "Missed calls", useCase: "Callers who reach voicemail book with the next business." },
  { icon: <FileStack size={17} />, industry: "Manual busywork", useCase: "Staff re-type data between inboxes, spreadsheets, and systems." },
  { icon: <Unplug size={17} />, industry: "Disconnected tools", useCase: "Your booking, CRM, and billing software don't talk to each other." },
];

const AI_SERVICE_ITEMS = [
  { title: "AI Voice Agents", desc: "Phone agents that answer every call, 24/7 — book, reschedule, answer from your rules, and escalate urgent calls to a person." },
  { title: "AI Agents & Automation", desc: "Agents that run multi-step work across your tools — process forms and documents, update CRM or PMS records, and hand off with full context." },
  { title: "AI Chat Assistants", desc: "Assistants on your website, WhatsApp, and SMS — qualify leads, book into your calendar, and answer customer questions instantly." },
  { title: "Knowledge AI", desc: "An assistant trained on your documents and data — search SOPs and manuals, answer with source citations, access controlled by role." },
  { title: "AI Integration", desc: "AI connected to CRM, booking, EHR, and practice software — APIs, webhooks, and MCP tool-calling with secure data handling." },
  { title: "AI Strategy & Readiness", desc: "Find where AI pays off before you build — process audit, prioritised use-case roadmap, and proof of concept in weeks." },
];

const SOFTWARE_ITEMS = [
  {
    title: "Web Apps & SaaS",
    desc: "Multi-tenant SaaS platforms, reactive command dashboards, and client portals engineered with TypeScript, React, and Next.js.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    icon: Globe,
  },
  {
    title: "Mobile Applications",
    desc: "Native and cross-platform mobile apps with offline synchronization, push notifications, and high-performance tactile interactions.",
    tags: ["React Native", "iOS", "Android", "Offline Sync"],
    icon: Smartphone,
  },
  {
    title: "Backend, APIs & Integrations",
    desc: "High-throughput REST and GraphQL endpoints, bi-directional webhooks, unified middleware, and secure Model Context Protocol (MCP) servers.",
    tags: ["Node / Python", "GraphQL", "Webhooks", "MCP Servers"],
    icon: Server,
  },
  {
    title: "Cloud & DevOps Infrastructure",
    desc: "Production-grade AWS deployments, Docker container orchestration, automated CI/CD pipelines, observability, and compliance auditing.",
    tags: ["AWS", "Docker", "CI/CD", "IaC / Terraform"],
    icon: Cloud,
  },
];

const INDUSTRIES = [
  { icon: <Hotel size={17} />, industry: "Hospitality", useCase: "experiHAUS, Hotel AI Receptionist" },
  { icon: <HeartPulse size={17} />, industry: "Healthcare", useCase: "Dental AI Scheduling, Therapy AI Intake, Med Spa AI" },
  { icon: <Dumbbell size={17} />, industry: "Fitness & Wellness", useCase: "Gym AI Booking, Spa AI Receptionist" },
  { icon: <Truck size={17} />, industry: "Logistics & Dispatch", useCase: "FleetQuix, Towcentric" },
  { icon: <MapPin size={17} />, industry: "Public Safety & GIS", useCase: "Earthquickalert" },
  { icon: <Layers size={17} />, industry: "SaaS & Integrations", useCase: "StackOne" },
];

const TRUST_ITEMS = [
  {
    num: "01",
    title: "Business-first",
    description: "We start from the business problem and judge the work by what it changes for you.",
    tag: "ROI & Outcomes",
    icon: Target,
  },
  {
    num: "02",
    title: "AI plus full-stack",
    description: "Voice AI, agents, web, mobile, backend, and integrations from one team.",
    tag: "Unified Delivery",
    icon: Layers,
  },
  {
    num: "03",
    title: "Production discipline",
    description: "Review, CI, and integration checks on every build.",
    tag: "Automated CI/CD",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Compliance-aware",
    description: "HIPAA-conscious AI, IP chain-of-title, and sanctions screening where applicable.",
    tag: "HIPAA & IP Cleared",
    icon: Lock,
  },
  {
    num: "05",
    title: "Clear communication",
    description: "Regular demos and plain-language progress updates.",
    tag: "Weekly Demos",
    icon: MessageSquare,
  },
  {
    num: "06",
    title: "Long-term partnership",
    description: "Monitoring, support, and improvement after launch.",
    tag: "Post-Launch SLA",
    icon: Handshake,
  },
];

const PROCESS_ITEMS = [
  { num: "01", title: "Discover", description: "Understand your goals, users, and constraints." },
  { num: "02", title: "Design", description: "Shape the flows and screens before code is written." },
  { num: "03", title: "Build", description: "Deliver working software in short sprints with demos." },
  { num: "04", title: "Integrate", description: "Connect to the systems your team already uses." },
  { num: "05", title: "Test", description: "Code review, automated checks, and real-world scenarios." },
  { num: "06", title: "Launch", description: "Release, monitor, and keep improving after go-live — including tuning real AI conversations every month." },
];

const FAQ_ITEMS = [
  { q: "What kind of AI do you build?", a: "Voice agents, chat assistants, autonomous agents, document and knowledge assistants, and AI features inside web and mobile products." },
  { q: "Do we need a lot of data?", a: "No. Most systems start from your existing policies, documents, and software." },
  { q: "How long does it take?", a: "Most AI systems go live in 3–6 weeks, depending on integrations." },
  { q: "Who owns the work?", a: "You do. Code and IP transfer to you with a clear chain of title." },
  { q: "Do you support it after launch?", a: "Yes. Monitoring, tuning, and support plans are available." },
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

function CallTranscriptPanel() {
  const lines = [
    { who: "Caller", text: "Hi, do you have anything Thursday afternoon for a cleaning?" },
    { who: "AI", text: "Yes, Dr. Patel has 2:30 pm. Can I take your name and insurance?" },
    { who: "Caller", text: "Sara Khan, Delta Dental." },
    { who: "AI", text: "Done. You're booked for Thursday at 2:30. I've sent a text confirmation." },
  ];
  return (
    <PanelChrome title="Live call — AI voice agent">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {lines.map((line) => (
          <div key={line.text} style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 700, color: line.who === "AI" ? "var(--accent-light)" : "var(--text-card-primary)" }}>{line.who}: </span>
            {line.text}
          </div>
        ))}
      </div>
    </PanelChrome>
  );
}

function IntegrationPanel() {
  const systems = ["Calendar", "PMS / EHR", "CRM", "SMS", "Payments"];
  return (
    <PanelChrome title="Integrations — your systems">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {systems.map((s) => (
          <span
            key={s}
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              padding: "0.375rem 0.625rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-card-faint)",
              color: "var(--text-card-primary)",
              background: "var(--bg-card)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.6875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
        APIs, webhooks, and MCP tool-calling — connected before launch.
      </p>
    </PanelChrome>
  );
}

function StatusPanel() {
  const chips = [
    { label: "Booked in Dentrix", done: true },
    { label: "SMS sent", done: true },
    { label: "Insurance captured", done: true },
  ];
  return (
    <PanelChrome title="After the call" accent="var(--success)">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {chips.map((c) => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--text-card-primary)" }}>
            <Check size={13} color="var(--success)" aria-hidden="true" />
            {c.label}
          </div>
        ))}
      </div>
    </PanelChrome>
  );
}

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const processListRef = useRef<HTMLDivElement>(null);
  const processFillRef = useRef<HTMLDivElement>(null);

  useHomeMotion(rootRef);

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
    <MotionLayerContext.Provider value={true}>
    <div ref={rootRef} className="home-motion-root">
      {/* HERO */}
      <section
        className="section-pad-hero"
        data-home-hero
        data-nav-section="/"
        style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden" }}
      >
        <div className="motion-glow-field" aria-hidden="true">
          <span className="motion-glow-blob motion-glow-blob--hero-a" data-glow-blob data-depth="1.4" />
          <span className="motion-glow-blob motion-glow-blob--hero-b" data-glow-blob data-depth="0.9" />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "67.5rem" }}>
          <HomeHeroVisual />
          <span className="eyebrow-minimal" data-hero-eyebrow data-hero-reveal>AI ENGINEERING COMPANY</span>
          <h1 className="hero-title-stack hero-title-stack--three" data-hero-title data-hero-reveal>
            <RevealHeading
              tag="span"
              aria-hidden="true"
              className="hero-title hero-title--primary"
              text="One AI."
            />
            <RevealHeading
              tag="span"
              aria-hidden="true"
              className="hero-title hero-title--primary"
              delay={0.12}
              text="Every Workflow."
            />
            <RevealHeading
              tag="span"
              aria-hidden="true"
              className="hero-title hero-title--accent"
              delay={0.24}
              text="Zero Friction."
            />
          </h1>
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "36rem" }}>
            <p className="section-sub-editorial hero-lede" data-hero-lede data-hero-reveal>
              Voice agents and AI assistants connected to the software you already use—so calls get answered, work gets done, and your team stays focused on what matters.
            </p>
            <div data-hero-actions data-hero-reveal style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <Button href="/contact">Book a free AI consultation</Button>
              <Button variant="link" href="/case-studies">See AI in action</Button>
            </div>
          </div>
        </div>
      </section>

      <div data-motion-marquee>
        <MarqueeBand items={CAPABILITIES} speed={38} />
      </div>

      {/* STATS */}
      <section className="section-pad-standard home-stats-section" aria-labelledby="home-stats-heading" data-nav-section="/">
        <div className="container">
          <ScrollReveal>
            <div className="home-stats-header">
              <span className="eyebrow-minimal">BY THE NUMBERS</span>
              <h2 id="home-stats-heading" className="home-stats-title">
                Production AI and software, shipped.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid-responsive-4 home-stats-grid">
            {STATS.map((s, i) => (
              <ScrollReveal key={s.label} className="home-stats-grid-item" delay={i * 0.06}>
                <StatCard {...s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE A MANAGED POD */}
      <section className="section-pad-standard" data-nav-section="/" style={{ borderTop: "1px solid var(--border-subtle)", overflow: "hidden", position: "relative", zIndex: 3 }}>
        <div className="container two-col-split">
          <div>
            <span className="eyebrow-minimal">HOW OUR AI WORKS</span>
            <RevealHeading tag="h2" className="section-heading-editorial" text="How A Scalevium AI System Works." accentFrom={3} />
            <p className="section-sub-editorial" style={{ marginTop: "1.5rem", maxWidth: "28.75rem" }}>
              Every AI system we build is connected to your real data and tools, tested before launch, and monitored after.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                "Listens — takes a call, chat, email, or form",
                "Understands — works out what the person needs, using your rules and knowledge",
                "Acts — books, updates records, sends messages in your systems",
                "Hands off — passes anything sensitive or complex to your team, with a summary",
              ].map((t) => (
                <div key={t} data-check-item style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Check size={15} color="var(--accent-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.90625rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <PerspectiveStack height={560} panels={[<CallTranscriptPanel key="c" />, <IntegrationPanel key="i" />, <StatusPanel key="s" />]} />
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section-pad-standard" data-nav-section="/" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">THE GAP</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Work Your Team Can't Get To Is Work You Lose." accentFrom={4} style={{ marginBottom: "1.25rem", maxWidth: "47.5rem" }} />
          <ScrollReveal>
            <p className="section-sub-editorial" style={{ marginBottom: "2.5rem", maxWidth: "38.75rem" }}>
              Scalevium builds AI that closes these gaps and connects to the software you already pay for.
            </p>
          </ScrollReveal>
          <div className="grid-responsive-3 gap-board" data-motion-bento>
            {PROBLEM_ITEMS.map((it, i) => {
              const IconComp = it.icon.type;
              return (
                <ScrollReveal key={it.industry}>
                  <article className="bento-card problem-card">
                    <span className="problem-card-index" aria-hidden="true">{`0${i + 1}`}</span>
                    <span className="problem-card-scan" aria-hidden="true" />
                    <div className="problem-card-icon">
                      <IconComp size={20} />
                    </div>
                    <p className="problem-card-kicker">
                      <span className="problem-card-dot" aria-hidden="true" />
                      Open gap
                    </p>
                    <h3 className="problem-card-title">{it.industry}</h3>
                    <p className="problem-card-copy">{it.useCase}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNICAL DOMAINS - AI SERVICES */}
      <section className="section-pad-standard" data-nav-section="/services" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">AI SERVICES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Six Ways We Put AI To Work." accentFrom={3} style={{ marginBottom: "1rem", maxWidth: "43.75rem" }} />
          <ScrollReveal>
            <p className="section-sub-editorial" style={{ marginBottom: "2.5rem", maxWidth: "38.75rem" }}>
              Every AI system we build is connected to your real data and tools, tested before launch, and monitored after.
            </p>
          </ScrollReveal>
          <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {AI_SERVICE_ITEMS.map((item, i) => (
              <EditorialRow key={item.title} index={`0${i + 1}`} title={item.title} description={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS & SOFTWARE ENGINEERING */}
      <section className="section-pad-standard" data-nav-section="/services" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">SOFTWARE ENGINEERING</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="The Platforms Your AI Runs On." accentFrom={3} style={{ marginBottom: "1rem", maxWidth: "43.75rem" }} />
          <ScrollReveal>
            <p className="section-sub-editorial" style={{ marginBottom: "2.5rem", maxWidth: "38.75rem" }}>
              We design and build complete web, mobile, and backend products around your AI systems. Many of our AI projects start here.
            </p>
          </ScrollReveal>
          <PremiumPlatformGrid />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-pad-standard" data-nav-section="/services" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">INDUSTRIES</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Built For Your Industry." accentFrom={2} style={{ marginBottom: "2.75rem" }} />
          <PremiumIndustryGrid />
        </div>
      </section>


      {/* PROCESS */}
      <section className="section-pad-standard" data-nav-section="/about" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">PROCESS</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="From First Call To Live System." accentFrom={3} style={{ marginBottom: "3.75rem" }} />
          <div className="responsive-timeline-container">
            <div className="responsive-timeline-line">
              <div ref={processFillRef} style={{ width: "100%", height: "100%", background: "var(--accent-light)", transform: "scaleY(0)" }} />
            </div>
            <div ref={processListRef} data-motion-process style={{ display: "flex", flexDirection: "column", gap: "3.125rem" }}>
              {PROCESS_ITEMS.map((s) => (
                <ScrollReveal key={s.num}>
                  <StepItem {...s} variant="timeline" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CaseStudyTeaser studies={getHomepageCaseStudies()} />

      {/* FAQ */}
      <section className="section-pad-standard" data-nav-section="/about" style={{ borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow-minimal">FAQ</span>
          </ScrollReveal>
          <RevealHeading tag="h2" className="section-heading-editorial" text="Common Questions." accentFrom={1} style={{ marginBottom: "1.875rem", maxWidth: "43.75rem" }} />
          <div data-motion-faq>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <CTASection
        heading="Tell Us What You Want AI To Handle."
        description="Book a free 30-minute consultation. We'll map one process, show where AI fits, and give you a clear next step, with no obligation."
        primaryLabel="Book a free AI consultation"
        secondaryLabel={CONTACT_EMAIL}
        secondaryHref={`mailto:${CONTACT_EMAIL}`}
      />
    </div>
    </MotionLayerContext.Provider>
  );
}
