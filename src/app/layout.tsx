import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import IntroLoader from "@/components/IntroLoader";
import ThemeToggle from "@/components/ThemeToggle";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#070709" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://scalevium.com"),
  title: {
    default: "Scalevium — Engineering Without Limits | Senior Talent & AI Partnerships",
    template: "%s | Scalevium",
  },
  description:
    "Scalevium connects ambitious enterprises with senior technology talent and builds custom AI, cloud, and full-stack software solutions with uncompromised precision.",
  keywords: [
    "Software Engineering",
    "AI Development",
    "Generative AI",
    "Talent Solutions",
    "Senior Developers",
    "Cloud Architecture",
    "Full-Stack Development",
    "Scalevium",
  ],
  authors: [{ name: "Scalevium" }],
  creator: "Scalevium",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scalevium.com",
    siteName: "Scalevium",
    title: "Scalevium — Engineering Without Limits",
    description:
      "Scalevium connects ambitious enterprises with senior technology talent and builds custom AI, cloud, and full-stack software solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scalevium Minimal Editorial 3D Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalevium — Engineering Without Limits",
    description:
      "Scalevium connects ambitious enterprises with senior technology talent and builds custom AI software solutions.",
    creator: "@scalevium",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scalevium",
  legalName: "Scalevium Technologies Inc.",
  url: "https://scalevium.com",
  logo: "https://scalevium.com/brand/logo-dark.png",
  description:
    "Scalevium connects ambitious enterprises with senior technology talent and builds custom AI, cloud, and full-stack software solutions.",
  email: CONTACT_EMAIL,
  sameAs: [LINKEDIN_URL],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Staff Augmentation",
    "Managed Engineering Pods",
    "Generative AI",
    "Cloud Architecture",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Scalevium",
  url: "https://scalevium.com",
  description: "Senior Engineering Without Limits — Staff Augmentation & Custom AI Development Pods",
  publisher: {
    "@type": "Organization",
    name: "Scalevium",
    logo: {
      "@type": "ImageObject",
      url: "https://scalevium.com/brand/logo-dark.png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('scalevium-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('scalevium-intro-seen');if(!s&&!r){document.documentElement.classList.add('intro-pending');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={plusJakarta.className}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="app-root">
          <IntroLoader />
          <div className="app-chrome">
            <div className="noise-overlay" aria-hidden="true" />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main id="main-content" className="main-content-target" tabIndex={-1} style={{ position: "relative", zIndex: 2 }}>
              {children}
            </main>
            <Footer />
            <ThemeToggle />
          </div>
        </div>
      </body>
    </html>
  );
}
