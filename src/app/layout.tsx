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
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";

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
    default: "Scalevium · AI Agents, Voice AI & Custom Software",
    template: "%s | Scalevium",
  },
  description:
    "AI voice agents, AI agents and custom software that connect to the tools your business already uses. Book a free AI consultation.",
  keywords: [
    "AI Voice Agents",
    "AI Agents",
    "AI Integration",
    "Software Engineering",
    "Staff Augmentation",
    "Scalevium",
  ],
  authors: [{ name: "Scalevium" }],
  creator: "Scalevium",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scalevium.com",
    siteName: "Scalevium",
    title: "Scalevium · AI Agents, Voice AI & Custom Software",
    description:
      "AI voice agents, AI agents and custom software that connect to the tools your business already uses.",
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
    title: "Scalevium · AI Agents, Voice AI & Custom Software",
    description:
      "AI voice agents, AI agents and custom software that connect to the tools your business already uses.",
    creator: "@scalevium",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: [{ url: "/brand/favicon.png", type: "image/png" }],
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
    "Scalevium builds AI agents, voice AI, and custom software connected to the systems businesses already use.",
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
    "AI Voice Agents",
    "AI Agents and Automation",
    "AI Integration",
    "Software Engineering",
    "Staff Augmentation",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Scalevium",
  url: "https://scalevium.com",
  description: "Engineering without limits — AI agents, voice AI, and custom software",
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
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=='/'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('home-hero-pending');setTimeout(function(){d.classList.remove('home-hero-pending');},7000);}catch(e){}})();`,
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
        <SmoothScrollProvider>
          <Analytics />
          <CookieConsent />
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
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
