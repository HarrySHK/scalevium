# 🚀 Scalevium — Engineering Without Limits

> **Corporate Website for Scalevium**: Connecting ambitious enterprises with senior technology talent and building custom AI, cloud, and full-stack software solutions with uncompromised precision.

---

## 📄 Table of Contents

- [About Scalevium](#-about-scalevium)
- [✨ Key Features](#-key-features)
- [🎨 Design System & Theme](#-design-system--theme)
- [🛠 Tech Stack & Libraries](#-tech-stack--libraries)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔍 SEO & Accessibility](#-seo--accessibility)
- [📜 License](#-license)

---

## 🏢 About Scalevium

**Scalevium** is an elite software engineering and AI solutions agency. We help scale ambitious enterprises through:
- **Senior Talent Solutions**: Embedded, high-caliber engineering teams and technology leads.
- **Custom AI Development**: Tailored Generative AI, machine learning models, and LLM integrations.
- **Technology Solutions**: Cloud architecture, microservices, scalable distributed backend infrastructure.
- **Full-Stack Engineering**: Modern web applications built for speed, performance, and unmatched visual excellence.

---

## ✨ Key Features

- **Fluid Custom Cursor**: Smooth spring-physics cursor follower with hover-state reaction handling.
- **Subtle Noise Texture Overlay**: Fine SVG fractal noise filter overlaid across pages for an authentic analog film grain aesthetic.
- **Glassmorphic Navigation**: Sticky header with blur effects (`backdrop-filter`) and smooth state transitions.
- **Scroll-Driven Micro-Animations**: Smooth reveals and interactions using Framer Motion and GSAP.
- **Responsive Layout**: Seamless experience across Mobile, Tablet, Desktop, and Ultra-wide screens.

---

## 🎨 Design System & Theme

Scalevium features a custom **Dark-Mode Luxury Tech & Editorial Aesthetic**:

### Color Palette
| Token | Hex Value | Description |
| :--- | :--- | :--- |
| `--bg-primary` | `#070709` | Deep Onyx (Primary Background) |
| `--bg-surface` | `#0e0e12` | Dark Charcoal (Surface / Cards) |
| `--text-primary` | `#f4f4f6` | High-contrast Off-White |
| `--text-muted` | `#71717a` | Subtle Zinc Gray |
| `--accent` | `#3E7BFA` | Electric Blue |
| `--accent-light` | `#6EA0FF` | Highlight / Glow Blue |
| `--border-subtle` | `rgba(255, 255, 255, 0.07)` | Subtle Border Divider |

### Typography & Fonts
* **Primary Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Inter](https://fonts.google.com/specimen/Inter)
* **Editorial Headlines**: Dynamic clamp sizing (`clamp(3.4rem, 7.8vw, 8.2rem)`) with tight tracking (`-0.04em`).
* **Eyebrows**: Uppercase minimal labels with wide tracking (`0.22em`).

---

## 🛠 Tech Stack & Libraries

* **Core Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/) & JavaScript (ES6+)
* **UI Library**: [React 18](https://react.dev/)
* **Animation & Interactions**:
  - [`framer-motion`](https://www.framer.com/motion/)
  - [`gsap`](https://gsap.com/)
* **Iconography**: [`lucide-react`](https://lucide.dev/)
* **Styling**: Vanilla CSS (Custom Design System tokens in [`globals.css`](file:///c:/Users/USER/Downloads/scalevium-corporate-website-de/src/app/globals.css))

---

## 📂 Project Structure

```text
scalevium-corporate-website-de/
├── public/                     # Static assets (sitemap.xml, robots.txt, og-image)
├── src/
│   ├── app/                    # Next.js 14 App Router routes & pages
│   │   ├── about/              # About Scalevium company page
│   │   ├── contact/            # Interactive contact page
│   │   ├── services/           # Service pages
│   │   │   ├── ai-development/          # AI & ML solutions detail page
│   │   │   ├── full-stack-development/  # Software engineering detail page
│   │   │   ├── talent-solutions/        # Senior talent team detail page
│   │   │   └── technology-solutions/    # Cloud & infrastructure detail page
│   │   ├── globals.css         # Global CSS variables, animations & utilities
│   │   ├── HomeClient.tsx      # Main landing page component
│   │   ├── layout.tsx          # Root layout (Metadata, 3D Canvas, Cursor, Nav, Footer)
│   │   ├── page.tsx            # Main page entry point
│   │   ├── robots.ts           # Dynamic robots.txt configuration
│   │   └── sitemap.ts          # Dynamic sitemap generator
│   └── components/             # Reusable UI & WebGL 3D components
│       ├── ClientCanvasWrapper.tsx # Client-side 3D canvas loader
│       ├── CustomCursor.tsx    # Custom animated trailing cursor
│       ├── Footer.tsx          # Site-wide footer with navigation
│       ├── Logo.tsx            # Scalevium brand SVG mark
│       ├── Navbar.tsx          # Glassmorphic header navigation
│       ├── ScrollProgress.tsx  # Top scroll percentage indicator bar
│       ├── ScrollReveal.tsx    # Scroll animation wrapper
│       └── Signature3DCanvas.tsx # Three.js WebGL particle mesh background
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and build scripts
└── tsconfig.json               # TypeScript compiler config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mdhasnainhanif/scalevium.git
   cd scalevium-corporate-website-de
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Available Scripts

- `npm run dev` — Starts Next.js development server.
- `npm run build` — Builds the application for production.
- `npm run start` — Starts the production server.
- `npm run lint` — Runs ESLint code quality check.

---

## 🔍 SEO & Accessibility

- **OpenGraph & Twitter Cards**: Configured in [`layout.tsx`](file:///c:/Users/USER/Downloads/scalevium-corporate-website-de/src/app/layout.tsx) with custom preview images and metadata.
- **Dynamic Sitemap & Robots**: Generated at build time via `sitemap.ts` and `robots.ts`.
- **Accessibility**: Includes `prefers-reduced-motion` media queries to disable intensive 3D animations for users with motion sensitivity.

---

## 📜 License

Created for **Scalevium**. All rights reserved.
