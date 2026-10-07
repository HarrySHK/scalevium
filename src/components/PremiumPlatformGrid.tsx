import React from "react";
import Link from "next/link";
import { Globe, Smartphone, Server, Cloud, Activity, Shield, Zap, Terminal } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SOFTWARE_ITEMS = [
  {
    id: "web",
    title: "Web Apps & SaaS",
    desc: "Multi-tenant SaaS platforms, reactive command dashboards, and client portals engineered with TypeScript, React, and Next.js.",
    href: "/services/full-stack-development"
  },
  {
    id: "backend",
    title: "Backend, APIs & Integrations",
    desc: "High-throughput REST and GraphQL endpoints, bi-directional webhooks, unified middleware, and secure MCP servers.",
    href: "/services/full-stack-development"
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Infrastructure",
    desc: "Production-grade AWS deployments, Docker container orchestration, automated CI/CD pipelines, and compliance auditing.",
    href: "/services/technology-solutions"
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    desc: "Native and cross-platform mobile apps with offline synchronization, push notifications, and high-performance tactile interactions.",
    href: "/services/full-stack-development"
  }
];

export default function PremiumPlatformGrid() {
  return (
    <div className="premium-platform-grid">
      {/* 1. Web Apps (Top Left) - Progress Bar graphic */}
      <ScrollReveal delay={0}>
        <Link href={SOFTWARE_ITEMS[0].href} className="ppb-card ppb-card-1">
          <div className="ppb-graphic-container">
            <div className="ppb-mock-panel">
              <div className="ppb-mock-row">
                <div className="ppb-mock-avatar"></div>
                <div className="ppb-mock-line w-16"></div>
              </div>
              <div className="ppb-mock-row active">
                <div className="ppb-mock-label">CPU</div>
                <div className="ppb-mock-bar-container">
                  <div className="ppb-mock-bar-fill" style={{ width: "64%" }}></div>
                </div>
                <div className="ppb-mock-pct">64%</div>
              </div>
            </div>
          </div>
          <div className="ppb-content">
            <h3 className="ppb-title">{SOFTWARE_ITEMS[0].title}</h3>
            <p className="ppb-desc">{SOFTWARE_ITEMS[0].desc}</p>
          </div>
        </Link>
      </ScrollReveal>

      {/* 2. Backend (Top Right) - Nodes graphic */}
      <ScrollReveal delay={0.1}>
        <Link href={SOFTWARE_ITEMS[1].href} className="ppb-card ppb-card-2">
          <div className="ppb-graphic-container ppb-center-graphic">
            <div className="ppb-node-system">
              <div className="ppb-node-central">
                <Shield size={24} className="ppb-icon-glow" />
              </div>
              <div className="ppb-node-ring ring-1"></div>
              <div className="ppb-node-ring ring-2"></div>
              <div className="ppb-node-floating" style={{ top: "10%", left: "15%" }}>
                <span>API Gateway</span>
              </div>
              <div className="ppb-node-floating" style={{ bottom: "20%", left: "20%" }}>
                <span>DB</span>
              </div>
              <div className="ppb-node-floating" style={{ top: "25%", right: "15%" }}>
                <span>Auth</span>
              </div>
            </div>
          </div>
          <div className="ppb-content">
            <h3 className="ppb-title">{SOFTWARE_ITEMS[1].title}</h3>
            <p className="ppb-desc">{SOFTWARE_ITEMS[1].desc}</p>
          </div>
        </Link>
      </ScrollReveal>

      {/* 3. Cloud (Bottom Left) - Concentric Ripples */}
      <ScrollReveal delay={0.2}>
        <Link href={SOFTWARE_ITEMS[2].href} className="ppb-card ppb-card-3">
          <div className="ppb-graphic-container ppb-center-graphic">
            <div className="ppb-ripple-system">
              <div className="ppb-ripple-center">
                <Zap size={24} className="ppb-icon-glow" />
              </div>
              <div className="ppb-ripple r-1"></div>
              <div className="ppb-ripple r-2"></div>
              <div className="ppb-ripple r-3"></div>
              <div className="ppb-ripple-icon" style={{ top: "20%", left: "30%" }}><Globe size={14} /></div>
              <div className="ppb-ripple-icon" style={{ top: "30%", right: "20%" }}><Activity size={14} /></div>
              <div className="ppb-ripple-icon" style={{ bottom: "25%", left: "40%" }}><Server size={14} /></div>
            </div>
          </div>
          <div className="ppb-content">
            <h3 className="ppb-title">{SOFTWARE_ITEMS[2].title}</h3>
            <p className="ppb-desc">{SOFTWARE_ITEMS[2].desc}</p>
          </div>
        </Link>
      </ScrollReveal>

      {/* 4. Mobile (Bottom Right) - Console/Grid Lines */}
      <ScrollReveal delay={0.3}>
        <Link href={SOFTWARE_ITEMS[3].href} className="ppb-card ppb-card-4">
          <div className="ppb-graphic-container ppb-center-graphic">
            <div className="ppb-grid-system">
              <div className="ppb-grid-center">
                <Terminal size={24} className="ppb-icon-glow" />
              </div>
              <svg className="ppb-grid-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M50 50 L80 20 M50 50 L20 80 M50 50 L80 80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              </svg>
              <div className="ppb-grid-subicon" style={{ bottom: "15%", right: "15%" }}>
                <Smartphone size={16} />
              </div>
            </div>
          </div>
          <div className="ppb-content">
            <h3 className="ppb-title">{SOFTWARE_ITEMS[3].title}</h3>
            <p className="ppb-desc">{SOFTWARE_ITEMS[3].desc}</p>
          </div>
        </Link>
      </ScrollReveal>
    </div>
  );
}
