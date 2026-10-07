import React from "react";
import Link from "next/link";
import { Globe, Smartphone, Server, Cloud, Activity, Shield, Zap, Terminal, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SOFTWARE_ITEMS = [
  {
    id: "web",
    index: "01",
    kicker: "Product surface",
    code: "web.runtime",
    title: "Web Apps & SaaS",
    desc: "Multi-tenant SaaS platforms, reactive command dashboards, and client portals engineered with TypeScript, React, and Next.js.",
    tags: ["Next.js", "React", "TypeScript"],
    href: "/services/full-stack-development",
  },
  {
    id: "backend",
    index: "02",
    kicker: "System core",
    code: "api.gateway",
    title: "Backend, APIs & Integrations",
    desc: "High-throughput REST and GraphQL endpoints, bi-directional webhooks, unified middleware, and secure MCP servers.",
    tags: ["GraphQL", "Webhooks", "MCP"],
    href: "/services/full-stack-development",
  },
  {
    id: "cloud",
    index: "03",
    kicker: "Delivery mesh",
    code: "cloud.mesh",
    title: "Cloud & DevOps Infrastructure",
    desc: "Production-grade AWS deployments, Docker container orchestration, automated CI/CD pipelines, and compliance auditing.",
    tags: ["AWS", "Docker", "CI/CD"],
    href: "/services/technology-solutions",
  },
  {
    id: "mobile",
    index: "04",
    kicker: "Client runtime",
    code: "mobile.shell",
    title: "Mobile Applications",
    desc: "Native and cross-platform mobile apps with offline synchronization, push notifications, and high-performance tactile interactions.",
    tags: ["iOS", "Android", "Offline"],
    href: "/services/full-stack-development",
  },
];

function PlatformCard({
  item,
  delay,
  children,
}: {
  item: (typeof SOFTWARE_ITEMS)[number];
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal delay={delay}>
      <Link href={item.href} className={`ppb-card ppb-card--${item.id}`}>
        <div className="ppb-content">
          <div className="ppb-kicker">
            <span className="ppb-kicker-index">{item.index}</span>
            <span>{item.kicker}</span>
          </div>
          <h3 className="ppb-title">{item.title}</h3>
          <p className="ppb-desc">{item.desc}</p>
          <div className="ppb-tags">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="ppb-link">
            Explore
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </div>
        <div className="ppb-graphic-container">
          <div className="ppb-stage">
            <div className="ppb-chrome" aria-hidden="true">
              <span className="ppb-chrome-dot" />
              <em>{item.code}</em>
              <span className="ppb-chrome-live">live</span>
            </div>
            {children}
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function PremiumPlatformGrid() {
  return (
    <div className="premium-platform-grid">
      <PlatformCard item={SOFTWARE_ITEMS[0]} delay={0}>
        <div className="ppb-mock-panel">
          <div className="ppb-mock-row">
            <div className="ppb-mock-avatar" />
            <div className="ppb-mock-line w-16" />
          </div>
          <div className="ppb-mock-row active">
            <div className="ppb-mock-label">CPU</div>
            <div className="ppb-mock-bar-container">
              <div className="ppb-mock-bar-fill" style={{ width: "64%" }} />
            </div>
            <div className="ppb-mock-pct">64%</div>
          </div>
          <div className="ppb-mock-row">
            <div className="ppb-mock-label">Traffic</div>
            <div className="ppb-mock-bar-container">
              <div className="ppb-mock-bar-fill" style={{ width: "82%" }} />
            </div>
            <div className="ppb-mock-pct">82%</div>
          </div>
        </div>
      </PlatformCard>

      <PlatformCard item={SOFTWARE_ITEMS[1]} delay={0.08}>
        <div className="ppb-span-layout">
          <div className="ppb-span-node">API Gateway</div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-node-central">
            <Shield size={22} className="ppb-icon-glow" />
          </div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-span-node">Auth</div>
          <div className="ppb-span-node ppb-span-node--sub">DB</div>
        </div>
      </PlatformCard>

      <PlatformCard item={SOFTWARE_ITEMS[2]} delay={0.16}>
        <div className="ppb-span-layout">
          <div className="ppb-ripple-icon"><Globe size={16} /></div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-ripple-center">
            <Zap size={22} className="ppb-icon-glow" />
          </div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-ripple-icon"><Activity size={16} /></div>
          <div className="ppb-ripple-icon ppb-span-node--sub"><Server size={16} /></div>
        </div>
      </PlatformCard>

      <PlatformCard item={SOFTWARE_ITEMS[3]} delay={0.24}>
        <div className="ppb-span-layout">
          <div className="ppb-grid-subicon ppb-grid-subicon--alt">
            <Cloud size={16} />
          </div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-grid-center">
            <Terminal size={22} className="ppb-icon-glow" />
          </div>
          <div className="ppb-span-track" aria-hidden="true" />
          <div className="ppb-grid-subicon">
            <Smartphone size={16} />
          </div>
        </div>
      </PlatformCard>
    </div>
  );
}
