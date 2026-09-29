'use client';

import React from "react";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_EMAIL, CONTACT_MAILTO, LINKEDIN_URL } from "@/lib/site";

export default function Footer() {
  const cols = [
    {
      title: "Company",
      links: [
        { label: "About", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Case Studies", path: "/case-studies" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Talent Solutions", path: "/services/talent-solutions" },
        { label: "AI Development", path: "/services/ai-development" },
        { label: "Full-Stack Engineering", path: "/services/full-stack-development" },
        { label: "Technology Solutions", path: "/services/technology-solutions" },
      ],
    },
  ];

  return (
    <footer
      className="site-footer"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-subtle)", position: "relative", zIndex: 3 }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "2.5rem",
            paddingBottom: "3.75rem",
            borderBottom: "1px solid var(--border-subtle)",
          }}
          className="footer-grid"
        >
          <div>
            <Logo size={26} />
            <p style={{ marginTop: "1.25rem", color: "var(--text-muted)", fontSize: "0.875rem", maxWidth: "17.5rem", lineHeight: 1.6 }}>
              Engineering Without Limits. Senior talent & AI-native software partnerships.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--text-subtle)", marginBottom: "1.25rem", textTransform: "uppercase", fontWeight: 600 }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((l) => (
                  <Link
                    key={l.path}
                    href={l.path}
                    style={{ fontSize: "0.875rem", color: "var(--text-muted)", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--text-subtle)", marginBottom: "1.25rem", textTransform: "uppercase", fontWeight: 600 }}>
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Scalevium on LinkedIn (opens in new tab)"
                style={{ fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Linkedin size={15} aria-hidden="true" /> LinkedIn
              </a>
              <a
                href={CONTACT_MAILTO}
                style={{ fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Mail size={15} aria-hidden="true" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--text-subtle)" }}>© {new Date().getFullYear()} Scalevium. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ fontSize: "0.8125rem", color: "var(--text-subtle)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ fontSize: "0.8125rem", color: "var(--text-subtle)" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
        }
      `}</style>
    </footer>
  );
}
