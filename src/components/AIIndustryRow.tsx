import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AIIndustryRowProps {
  title: string;
  description: string;
  contactHref: string;
  contactLabel: string;
}

export default function AIIndustryRow({ title, description, contactHref, contactLabel }: AIIndustryRowProps) {
  return (
    <div className="tech-row ai-industry-row">
      <div className="ai-industry-row-main">
        <span className="tech-row-text">{title}</span>
        <span className="tech-row-desc">{description}</span>
      </div>
      <Link href={contactHref} className="link-editorial ai-industry-row-cta">
        {contactLabel} <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
      <div className="tech-row-line" aria-hidden="true" />
    </div>
  );
}
