import { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/caseStudies";

/** Content last reviewed — update when pages materially change. */
const STATIC_CONTENT_DATE = new Date("2026-03-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://scalevium.com";

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    lastModified: Date;
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: new Date() },
    { path: "/services", priority: 0.9, changeFrequency: "weekly", lastModified: STATIC_CONTENT_DATE },
    { path: "/services/talent-solutions", priority: 0.9, changeFrequency: "weekly", lastModified: STATIC_CONTENT_DATE },
    { path: "/services/technology-solutions", priority: 0.9, changeFrequency: "weekly", lastModified: STATIC_CONTENT_DATE },
    { path: "/services/ai-development", priority: 0.9, changeFrequency: "weekly", lastModified: STATIC_CONTENT_DATE },
    { path: "/services/full-stack-development", priority: 0.9, changeFrequency: "weekly", lastModified: STATIC_CONTENT_DATE },
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly", lastModified: STATIC_CONTENT_DATE },
    ...getAllCaseStudySlugs().map((slug) => ({
      path: `/case-studies/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: STATIC_CONTENT_DATE,
    })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: STATIC_CONTENT_DATE },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly", lastModified: STATIC_CONTENT_DATE },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: STATIC_CONTENT_DATE },
    { path: "/terms-condition", priority: 0.3, changeFrequency: "yearly", lastModified: STATIC_CONTENT_DATE },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
