# Scalevium Portfolio PDF — Master Generation Prompt

Use this document as the **single source of truth** when creating or regenerating the Scalevium company portfolio PDF (designer, agency, or AI layout tool). Follow every section.

**Data authority:** All projects, copy, images, URLs, and contribution notes must come from **`src/lib/caseStudies.ts`** and **`/case-studies`** on the website. Do not add projects that are not published there.

---

## Your task

Create a **premium, professional portfolio PDF** for **Scalevium Technologies Inc.** that a **non-technical business owner, founder, or decision-maker** can understand in minutes — not a developer resume or technical spec sheet.

The PDF should:

1. Explain **what Scalevium builds**, **what business problems you solve**, and **why clients can trust you** — in plain language.
2. Showcase **only the 11 case studies** listed in [Authoritative project list](#authoritative-project-list-11-projects-only) (6 AI + 5 software). **No other products.**
3. Be **visual-first**: large, labeled screenshots from the repo; short captions; feature cards; minimal dense paragraphs.
4. Use a **light theme only** — white/off-white pages, dark text, Scalevium blue accents matching the website light mode.
5. Use the **dark Scalevium logo** on headers (never `logo-light.png` on white pages).
6. Target **12–18 A4 pages** for the full portfolio (or **8–10 pages** for a condensed executive version — prefer **full** when this prompt is used).
7. End with **process**, **why Scalevium**, **staff augmentation** (brief), **technology** (secondary), and a clear **contact CTA**.

**Output format:** Print-ready **A4 PDF**, embedded fonts (**Plus Jakarta Sans** or equivalent), `printBackground: true` if generating programmatically.

**Logo (light backgrounds):** `public/brand/logo-dark.png` or `https://scalevium.com/brand/logo-dark.png`

---

## Audience & writing rules (layman-first)

**Assume the reader knows nothing about software development.**

| Do | Don't |
|----|--------|
| Describe **what the product does for people and the business** | Lead with frameworks, databases, or architecture jargon |
| Use **Problem → Solution → Product (visual) → Outcome** per project | List technologies as the main story |
| Keep each project scannable in **~10–15 seconds** (headline + one line + picture) | Fill pages with long technical paragraphs |
| Use **2–3 short challenge bullets** and **3–5 solution bullets** in business language | Invent user counts, revenue, % improvements, or client testimonials |
| Put **Technology** in small badges at the bottom of a case study | Make stack chips the largest element on the page |

**Tone:** Premium US software agency — confident, minimal, approachable, enterprise-ready. Not freelancer-style, not cartoonish, not hype.

**Example rewrite:**

- ❌ “Built a scalable NestJS backend with PostgreSQL and REST APIs.”
- ✅ “Built one system so hotel staff and in-room guests use the same platform — content and services stay in sync without duplicate work.”

When translating from `caseStudies.ts`, use `oneLiner` and `complexity[].title/body` but **simplify technical phrases** for executives where needed. Never contradict the case study facts.

---

## Visual design rules (professional & easy to understand)

Visuals carry the story. Text supports the visuals.

### Required visuals per case study

1. **Hero screenshot** — use the exact asset from `imageSrc` in `caseStudies.ts` (paths under `public/case-studies/`).
2. **Caption under every screenshot** — format:
   - **Bold label** (what screen this is, e.g. “Dispatch dashboard”)
   - One sentence: what the viewer is looking at and why it matters to the business.
3. **4–6 feature cards** — title + one line each (derive from `complexity` titles; body shortened for lay readers).
4. **Optional second visual** — UI close-up or workflow strip only if the same `imageSrc` hero is enough; do **not** use stock photos or fake device renders.

### Layout & “interactive” clarity (in a PDF context)

PDFs are not clickable; **design for clarity as if each block were a slide:**

- Clear **section labels**: The challenge · What we built · Our role · Key features · Technology · Outcome
- **Generous hierarchy** — project name largest, then one-line description, then visuals, then bullets.
- **Device/browser frames** optional — only if they help orientation; never stretch images.
- **Whitespace is premium** — avoid cramped resume density; prefer 1–2 pages for flagship software projects (ExperiHAUS, Towcentric, FleetQuix, Earthquickalert) and **at least one strong visual page** per AI product.
- **No placeholder wireframes or generic SVG mockups** unless a case study has no image in the repo (currently **all 11 have images** — always use them).

### Brand & visual system (light theme)

| Token | Value | Usage |
|--------|--------|--------|
| Page background | `#FFFFFF` | All pages |
| Secondary surface | `#F6F7F9` / `#F4F6F9` | Cards, bands |
| Accent tint | `#EEF2FF` | Highlights, AI callouts |
| Primary text | `#0B0E14` | Headings |
| Body text | `#4B5565` | Paragraphs |
| Accent blue | `#2563EB` (light theme) · `#3E7BFA` (brand gradient accent) | Labels, links, bullets |
| Borders | `rgba(11, 14, 20, 0.10)` | Cards, dividers |

**Typography:** Plus Jakarta Sans — 400 body, 600 labels, 700 headings. Cover headline ~28–34pt; section titles ~16–20pt; body ~9.5–11pt, line-height 1.45–1.55.

**Avoid:** Dark full-page backgrounds, excessive gradients, cartoon illustrations, generic stock photography, neon “startup” clutter.

---

## Authoritative project list (11 projects ONLY)

**Include exactly these.** Names and slugs must match the case studies page (`https://scalevium.com/case-studies`).

### Software projects (5)

| # | Name | Slug | Hero image (`public/…`) |
|---|------|------|-------------------------|
| 1 | FleetQuix | `fleetquix-tripsheet` | `case-studies/fleetquix-tripsheet.png` |
| 2 | Earthquickalert | `earthquickalert` | `case-studies/earthquickalert.png` |
| 3 | StackOne | `stackone` | `case-studies/stackone.png` |
| 4 | Towcentric | `towcentric` | `case-studies/towcentric.png` |
| 5 | experiHAUS | `experihaus` | `case-studies/experihaus.png` |

### AI projects (6)

| # | Name | Slug | Hero image (`public/…`) |
|---|------|------|-------------------------|
| 6 | Hotel AI Receptionist | `ai-hospitality-receptionist` | `case-studies/ai-hospitality-receptionist.png` |
| 7 | AI Receptionist for Med Spas | `ai-med-spa-receptionist` | `case-studies/ai-med-spa-receptionist.png` |
| 8 | Therapy Practice AI Intake | `ai-therapy-receptionist` | `case-studies/ai-therapy-receptionist.png` |
| 9 | Automated Booking for Gyms | `ai-gym-receptionist` | `case-studies/ai-gym-receptionist.png` |
| 10 | AI Receptionist for Spas | `ai-spa-receptionist` | `case-studies/ai-spa-receptionist.png` |
| 11 | Dental Office AI Scheduling | `ai-dental-receptionist` | `case-studies/ai-dental-receptionist.png` |

### Explicitly excluded (do NOT put in the PDF)

Do **not** include Caribo, DealsCracker, ActiveSOS, Smart Parking, FleetQuix-adjacent fictional URLs, or **any** project not in `CASE_STUDIES` inside `src/lib/caseStudies.ts`. If a project is added to the website later, update this prompt and `caseStudies.ts` together.

---

## Case study page template (use for every project)

Each project follows the same narrative so non-technical readers learn the pattern quickly:

```
PROJECT NAME
[Large hero image from imageSrc + caption]

One-line description (business language — adapt from oneLiner)

THE CHALLENGE          WHAT WE BUILT
2–3 bullets            3–5 bullets (from complexity[], simplified)

OUR ROLE               KEY FEATURES (4–6 visual cards)
Product / frontend /   Title + one line each
backend / integrations /
AI / deployment       

TECHNOLOGY (small badges — from stack[], visually secondary)

OUTCOME / IMPACT
Factual outcomes only — e.g. “centralized operations,” “automated intake,”
“live dispatch visibility.” No invented metrics.
```

**StackOne:** always include `contributionNote` from `caseStudies.ts` under **Our role** or **Overview**.

**FleetQuix:** do not invent a live URL (none in case study).

**AI projects:** do not add external product URLs unless published on case studies (currently none for AI slugs).

**Featured depth:** Give **more pages and larger visuals** to 3–4 strongest software stories (e.g. experiHAUS, Towcentric, Earthquickalert, FleetQuix) and represent **all six AI products** with at least one visual page each — AI is a primary tab on the website but copy stays business-outcome focused.

---

## Company information

| Field | Content |
|--------|---------|
| Legal name | Scalevium Technologies Inc. |
| Brand name | Scalevium |
| Primary tagline | **Engineering Without Limits** |
| Optional portfolio subline | *From Code to Crew, We Build for You.* (use on cover if desired — do not replace primary site tagline in metadata) |
| Website | https://scalevium.com |
| Email | scalevium@gmail.com |
| Contact | https://scalevium.com/contact |
| Case studies | https://scalevium.com/case-studies |

**Who we are (short, layman-friendly):**

Scalevium is a high-end **custom software development** and **IT staff augmentation** partner. We build web and mobile products, production AI for operations (especially phone and scheduling workflows), and dedicated engineering teams that work alongside yours — with clear communication and software meant for real businesses.

**Engagement models (brief):**

- **Talent Solutions** — Senior engineers under your technical lead; structured vetting; fast placement when staff aug is the fit.
- **Technology Solutions** — Managed pods for defined product delivery: scoping, sprints, demos, handover.

---

## Recommended document structure (12–18 pages)

1. **Cover** — Dark logo, primary tagline, optional subline, year (2026), scalevium.com, clean light layout with subtle grid or brand accent only.
2. **Who we are** — 3–4 sentences; 4–6 service cards (product, web, mobile, AI, integrations, dedicated teams) — no jargon wall.
3. **What we do** — 8 capabilities with one-line business benefit each (see [Services catalog](#services-catalog-beyond-case-studies)).
4. **Case studies — Software** — All 5 software projects using [Case study page template](#case-study-page-template-use-for-every-project); prioritize visuals for flagship builds.
5. **Case studies — AI** — All 6 AI projects; lead with **use case in plain English** (missed calls, after-hours booking, chair-side coverage), then screenshot, then features.
6. **Industries** — Only industries supported by the 11 projects (e.g. hospitality, logistics/dispatch, emergency/GIS, enterprise integrations, medical aesthetics, mental health, fitness, dental, spa) — no unsupported vertical claims.
7. **Our process** — Visual timeline: Discover → Design → Build → Integrate → Test → Launch (one line each).
8. **Why Scalevium** — 5–6 differentiators (business-first, full-stack, production mindset, flexible engagement, clear communication, long-term partnership).
9. **Staff augmentation** — Extend team without headcount; roles (full-stack, backend, frontend, mobile, AI/ML, QA, DevOps); models (dedicated developer, dedicated team, project-based team).
10. **Technology stack** — Single secondary page of chips (consolidated list below) — not the hero of the PDF.
11. **Key strengths & trust** — Vetting, delivery discipline, compliance (brief); site-backed metrics only where already published.
12. **Contact CTA** — Large headline; scalevium@gmail.com; contact URL.

---

## AI PROJECTS (include ALL — `portfolio: ai`)

Do not link to third-party marketing sites unless listed on the case study. Full field copy remains valid for PDF generation; **present to lay readers using the template above.**

---

### 1. Hotel AI Receptionist

| Field | Detail |
|--------|--------|
| **Category** | Hospitality · Reservations |
| **Website slug** | `ai-hospitality-receptionist` |
| **Hero image** | `/case-studies/ai-hospitality-receptionist.png` |
| **Use case** | Hotels lose high-value reservations when the front desk is with in-person guests or when calls arrive overnight. Peak-period voicemail equals lost bookings and guest dissatisfaction. |
| **Overview** | Industry-trained AI for hotels and hospitality that answers reservation calls around the clock, quotes live rates from the property management system (PMS), captures anniversary and accessibility details, and completes bookings while staff focus on lobby guests. |
| **Capabilities** | **End-to-end reservation calls** — Dates, room types, rate plans, real-time availability, confirmation on the call (not voicemail). **Guest context before arrival** — Early check-in, bed preferences, dietary needs, special occasions for housekeeping/concierge. **PMS integration** — Opera, Cloudbeds, Mews, and comparable stacks; availability and guest notes sync to systems staff already use. **Upsell & groups** — Upgrades/packages during booking; corporate blocks and event requirements routed to sales. **In-stay & concierge** — Amenity FAQs, housekeeping/maintenance logging, VIP escalation with full call context. |
| **Technology stack** | Conversational AI, Real-time PMS APIs, Telephony, Secure deposits, Multilingual NLU |
| **Integrations (reference)** | Opera PMS, Cloudbeds, Mews, channel managers, payment gateways, SMS |

---

### 2. AI Receptionist for Med Spas

| Field | Detail |
|--------|--------|
| **Category** | Medical Aesthetics |
| **Website slug** | `ai-med-spa-receptionist` |
| **Hero image** | `/case-studies/ai-med-spa-receptionist.png` |
| **Use case** | Front desk and injectors are in treatment rooms when high-intent callers ask about Botox, fillers, or laser. Aesthetic clients often hang up rather than leave voicemail, booking with the next med spa. |
| **Overview** | AI phone agent for medical spas that books complimentary consultations and paid treatments (Botox, fillers, laser, body contouring), matches callers to preferred injectors, answers pricing/promotion/financing questions from configured policy, and syncs to med spa scheduling platforms. |
| **Capabilities** | **Service menu intelligence** — Neurotoxins, fillers, laser hair removal, IPL, microneedling, HydraFacial, packages; never invents rates. **Injector scheduling** — Named provider booking, next qualified opening, correct appointment length per treatment/device. **Lead capture** — New-client status, interests, timeline on first call. **Financing & membership** — Cherry, CareCredit, packages; human close when needed. **Privacy-conscious ops** — Encrypted sessions, minimal PHI, clinical questions to staff, BAA-ready architecture. |
| **Technology stack** | AI receptionist, Med spa scheduling APIs, HIPAA-conscious design, SMS intake links, Promotion surge handling |
| **Integrations (reference)** | Boulevard, Mangomint, Vagaro, Zenoti, AestheticsPro, Mindbody |

---

### 3. Therapy Practice AI Intake

| Field | Detail |
|--------|--------|
| **Category** | Mental Health · HIPAA |
| **Website slug** | `ai-therapy-receptionist` |
| **Hero image** | `/case-studies/ai-therapy-receptionist.png` |
| **Use case** | Clinicians miss calls while in session; therapy seekers call multiple practices and rarely leave voicemail. Every missed call is potential client loss and revenue. |
| **Overview** | HIPAA-aligned AI intake for therapy and counseling practices: answers while clinicians are in session, warm intake for anxiety/trauma/couples seekers, insurance and availability collection, scheduling into practice management and EHR systems. |
| **Capabilities** | **Session-safe coverage** — First-ring answer when therapists unavailable. **Empathetic intake** — Contact, insurance, presenting concerns, schedule; mental-health-appropriate tone. **Crisis & safety routing** — Practice playbooks: on-call clinician, 988/crisis handoff, emergency escalation; no clinical advice from AI. **Group practice matching** — Specialty, modality (CBT, EMDR, couples), provider availability. **Telehealth & reminders** — In-person vs secure video; confirmations to reduce no-shows. |
| **Technology stack** | AI intake flows, HIPAA + BAA, SimplePractice / TherapyNotes, Crisis protocols, Telehealth scheduling |
| **Integrations (reference)** | SimplePractice, TherapyNotes, Jane App, IntakeQ, TheraNest, Doxy.me, Zoom Health |

---

### 4. Automated Booking for Gyms

| Field | Detail |
|--------|--------|
| **Category** | Fitness & Studios |
| **Website slug** | `ai-gym-receptionist` |
| **Hero image** | `/case-studies/ai-gym-receptionist.png` |
| **Use case** | Prospects call after the desk closes (evenings/weekends) about memberships and tours. First-call experience strongly influences join decisions; hold times send them to competing gyms. |
| **Overview** | Automated AI booking for gyms and fitness studios: explains membership tiers and class access, books facility tours and personal training, pushes confirmed leads into fitness scheduling software. |
| **Capabilities** | **Membership discovery** — Tier recommendations tied to goals (weight loss, strength, classes); payment questions on-call. **Tour & PT booking** — Fast scheduling with SMS confirmation and sales lead notification. **After-hours demand** — Captures research-window callers. **Class & schedule Q&A** — Amenity and schedule answers; class booking where integrated. **Retention signals** — Cancellation/downgrade intent captured for member success. |
| **Technology stack** | AI scheduling, Mindbody / GloFox / Zen Planner, Lead routing, SMS confirmations, Multi-location |
| **Integrations (reference)** | Mindbody, GloFox, Zen Planner, Zenoti |

---

### 5. AI Receptionist for Spas

| Field | Detail |
|--------|--------|
| **Category** | Day Spa · Massage |
| **Website slug** | `ai-spa-receptionist` |
| **Hero image** | `/case-studies/ai-spa-receptionist.png` |
| **Use case** | Many spa clients prefer phone booking for couples packages, gift experiences, and first visits. Busy hours cause missed calls and double-booking risk without coordinated therapist + room scheduling. |
| **Overview** | AI for day spas and massage studios: books single and couples treatments, coordinates two therapists and suite availability, collects health and pressure preferences, syncs to spa scheduling platforms. |
| **Capabilities** | **Couples & multi-guest booking** — Aligned slots, couples suite, 60/90-minute packages, add-ons. **Therapist & room coordination** — Preferences, no double-booking, real-time write to spa software. **Pre-treatment intake** — Pressure, focus areas, injuries, pregnancy, oil allergies. **Deposits & no-shows** — Deposits per policy, SMS confirmations, reminders. **Phone-first clients** — Optimized for callers who do not use web booking. |
| **Technology stack** | Conversational AI, Spa scheduling APIs, Deposits & payments, SMS reminders, Bilingual NLU |
| **Integrations (reference)** | Mindbody, Booker, Zenoti |

---

### 6. Dental Office AI Scheduling

| Field | Detail |
|--------|--------|
| **Category** | General Dentistry |
| **Website slug** | `ai-dental-receptionist` |
| **Hero image** | `/case-studies/ai-dental-receptionist.png` |
| **Use case** | Calls arrive during procedures, lunch breaks, and evenings. Many patients will not leave voicemail; practices lose new patient lifetime value to competitors. |
| **Overview** | AI scheduling for dental offices: hygiene and restorative booking while team is chair-side, new-patient and insurance intake, emergency triage for toothaches and trauma with on-call dentist alerts. |
| **Capabilities** | **Chair-side & lunch coverage** — Answers when front desk cannot. **New patient workups** — Demographics, carrier, member ID, history, chief complaint before first visit. **Procedure-length scheduling** — Cleanings, exams, fillings, crowns mapped to provider templates in PMS without operatory conflicts. **Emergency detection** — Pain, swelling, avulsion, abscess; on-call notification and comfort instructions. **Reminders & waitlist** — Confirmation patterns to reduce no-shows; fill cancellations from waitlist. |
| **Technology stack** | AI triage, HIPAA compliance, Dental PMS sync, Emergency SMS alerts, Waitlist automation |
| **Integrations (reference)** | Dentrix, Open Dental, Eaglesoft, Curve Dental, tab32 |

---

## SOFTWARE PROJECTS (include ALL — `portfolio: software`)

---

### 7. FleetQuix

| Field | Detail |
|--------|--------|
| **Category** | Logistics & Fleet Ops |
| **Website slug** | `fleetquix-tripsheet` |
| **Hero image** | `/case-studies/fleetquix-tripsheet.png` |
| **Live URL** | None (no public staging/production URL in case study) |
| **Use case** | Carriers need isolated operational workspaces on one platform without cross-tenant data leakage, with roles for drivers, dispatchers, and accounting and reliable master data at scale. |
| **Overview** | Multi-tenant transportation management system (TMS) with isolated per-carrier workspaces, granular role-based access, and master data tooling for high-volume fleet operations. |
| **Capabilities** | **True multi-tenancy** — Per-carrier scoped environments, automated lifecycle management. **Granular self-scoping RBAC** — Drivers, dispatchers, accounting; users see only role-allowed data. **Master data management** — Duplicate detection, bulk CSV ingestion, dry-run validation before commit. |
| **Technology stack** | TypeScript, React/Next.js, Node.js, MongoDB Atlas |

---

### 8. Earthquickalert

| Field | Detail |
|--------|--------|
| **Category** | Geospatial & Emergency Response |
| **Website slug** | `earthquickalert` |
| **Hero image** | `/case-studies/earthquickalert.png` |
| **Live URL** | https://earthquickalert.vercel.app |
| **Use case** | Emergency operators need one geospatial view of road closures and power outages with reliable alerts and field reporting when connectivity is poor. |
| **Overview** | Real-time disaster-management platform unifying DOT road-closure feeds and power-outage data in a single map with offline-capable mobile reporting. |
| **Capabilities** | **Unified real-time feeds** — WZDX DOT (10+ states) and ODIN power-outage data. **Optimized GeoJSON** — Leaflet layers, viewport-bounded rendering. **Geospatial access control** — Haversine radius scoping for users and alerts. **Decoupled notification queue** — Inngest/Redis off the request path. **Offline mobile reporting** — Cloudinary uploads, queue when offline. |
| **Technology stack** | React Native/Expo, Next.js, Node.js, Upstash Redis, MongoDB, Leaflet GIS, Inngest |

---

### 9. StackOne

| Field | Detail |
|--------|--------|
| **Category** | Integration Infrastructure |
| **Website slug** | `stackone` |
| **Hero image** | `/case-studies/stackone.png` |
| **Live URL** | https://stackone.com |
| **Contribution note (required honesty)** | Scalevium provided engineering support within the larger StackOne product — integration architecture, webhook flows, and backend implementation — **not sole authorship** of the platform. |
| **Use case** | Enterprises integrate many HRIS, ATS, LMS, and CRM systems; products and AI agents need one normalized API and PII-safe webhook patterns. |
| **Overview** | Universal API layer normalizing HRIS, ATS, LMS, and CRM into one data model, with zero-data-storage webhooks and MCP-based tool-calling for AI agents. |
| **Capabilities** | **Universal API normalization** — Single integration surface across heterogeneous systems. **Zero-data-storage webhooks** — PII passes through without persistent retention. **MCP tool-calling** — Autonomous agents invoke integrations via standardized protocol. |
| **Technology stack** | API architecture, Webhooks, Node.js/TypeScript, Enterprise auth, AI tool-calling |

---

### 10. Towcentric

| Field | Detail |
|--------|--------|
| **Category** | Fleet & Dispatch SaaS |
| **Website slug** | `towcentric` |
| **Hero image** | `/case-studies/towcentric.png` |
| **Live URL** | https://towcentric.com |
| **Use case** | Dispatch operations must turn ALPR hardware events into actionable tickets immediately with live fleet visibility. |
| **Overview** | Fleet dispatch platform ingesting automated license-plate-scanner hardware alerts into live dispatch tickets with real-time WebSocket dashboards. |
| **Capabilities** | **Hardware webhook ingestion** — ALPR alerts become tickets without manual entry. **Real-time dispatch dashboards** — WebSocket updates, no manual refresh. |
| **Technology stack** | Node.js/Express, React, WebSocket/real-time APIs |

---

### 11. experiHAUS

| Field | Detail |
|--------|--------|
| **Category** | Hospitality Technology |
| **Website slug** | `experihaus` |
| **Hero image** | `/case-studies/experihaus.png` |
| **Live URL** | https://experihaus.com |
| **Use case** | Hotels need one backend powering in-room guest experiences on Smart TV and a separate staff admin tool without duplicating business logic. |
| **Overview** | Multi-client hospitality backend serving a Smart TV in-room guest app and hotel-staff admin dashboard from one NestJS codebase. |
| **Capabilities** | **Multi-client backend** — Guest Smart TV app + staff dashboard, shared API layer. **Modular resource routing** — Isolated guest vs staff sessions and access boundaries. |
| **Technology stack** | NestJS, TypeScript, React, Smart TV development |

---

## Services catalog (beyond case studies)

Present as a **grid** with one-line **business benefit** each (not internal engineering jargon):

| Service | Description for PDF |
|---------|---------------------|
| **Product Development** | From idea to a production-ready product your team can run and grow. |
| **Web Applications** | Customer and internal web platforms that are fast, clear, and secure. |
| **Mobile Applications** | Apps for field teams, consumers, and B2B workflows — including offline where needed. |
| **AI & Automation** | Production AI (voice, intake, agents) connected to the systems you already use. |
| **Backend & API Development** | Reliable data and integrations so your product stays consistent as you scale. |
| **UI/UX & Frontend** | Interfaces that feel premium and are easy to understand on first use. |
| **Cloud & DevOps** | Deployment and release practices built for uptime and predictable launches. |
| **Dedicated Development Teams** | Senior engineers embedded with your team — flexible scale and engagement. |
| **Talent Solutions** | Staff augmentation under your technical lead; structured vetting; fast placement when approved. |
| **Technology Solutions** | Managed pods — scoping, sprints, demos, executive updates, handover. |

---

## Consolidated technology stack (one secondary PDF page)

TypeScript · Node.js · React · Next.js · React Native · Expo · NestJS · Express · MongoDB · PostgreSQL · Redis · Inngest · AWS · Infrastructure as Code · Leaflet / GIS · WebSocket · LLM / RAG · Autonomous agents · Conversational / phone AI · Telephony · HIPAA-aware design · Enterprise auth · Webhooks · MCP / AI tool-calling

---

## Key strengths & metrics (include — site-backed only)

- **Senior vetting** — Structured process; small fraction of applicants pass all gates.
- **Fast augmentation** — Placement often within 48 hours of approval when staff aug is the fit.
- **Production discipline** — AI and product code: review, CI, integrations.
- **Compliance-aware** — IP chain-of-title, sanctions screening, HIPAA-conscious AI where applicable.
- **Vertical depth** — Grounded in the 11 case studies (hospitality, logistics, dispatch, GIS/emergency, integrations, aesthetics, mental health, fitness, dental, spa).

Use marketing metrics from the website (e.g. retention/utilisation targets) **only** if they already appear on scalevium.com — never invent new numbers for the PDF.

---

## Contact CTA (closing block)

**Headline:** Have a product in mind? Let's build.

**Body:** Tell us what you're building — we'll recommend product development, staff augmentation, or a dedicated team, with a clear next step.

**Contact:** scalevium@gmail.com · https://scalevium.com/contact · https://scalevium.com/case-studies

---

## Content rules (strict)

1. **Projects:** Only the [11 case studies](#authoritative-project-list-11-projects-only). Sync with `src/lib/caseStudies.ts`.
2. **Images:** Only hero assets from `imageSrc` (+ brand logos). No placeholder products, no stock UI mockups for real case studies.
3. **Light theme only** — `logo-dark.png` on white/off-white; never `logo-light.png` on light pages.
4. **Layman-first copy** — Business problem and outcome before technology; see [Audience & writing rules](#audience--writing-rules-layman-first).
5. **Visual-first layout** — Screenshots, captions, feature cards; see [Visual design rules](#visual-design-rules-professional--easy-to-understand).
6. **StackOne:** always include contribution note.
7. **FleetQuix:** no invented live URL.
8. **AI projects:** no external URLs unless on case studies.
9. **No fake metrics, clients, testimonials, or revenue claims.**
10. **Tagline:** Engineering Without Limits (primary); optional cover subline *From Code to Crew, We Build for You.*

---

## Implementation reference (this repo)

| Asset | Path |
|--------|------|
| HTML source | `public/documents/scalevium-portfolio.html` |
| Generated PDF | `public/documents/scalevium-portfolio.pdf` |
| Regenerate command | `npm run portfolio:pdf` |
| **Case study data (authority)** | `src/lib/caseStudies.ts` |
| Case study images | `public/case-studies/*.png` |
| Dark logo | `public/brand/logo-dark.png` |
| Services overview | `WEBSITE-AND-SERVICES.md` |

When adding or removing a project on `/case-studies`, update **`caseStudies.ts`**, **this prompt**, and **scalevium-portfolio.html** together.

---

## Copy-paste prompt (short form for AI tools)

```
Create a 12–18 page A4 print-ready Scalevium CLIENT portfolio PDF for non-technical founders and business owners.

RULES:
- LIGHT THEME ONLY: #FFFFFF / #F6F7F9 surfaces, #0B0E14 text, #2563EB accents, Plus Jakarta Sans.
- Logo: logo-dark.png only (never logo-light on white).
- PROJECTS: Include ONLY the 11 case studies from src/lib/caseStudies.ts (6 AI + 5 software). Do NOT include Caribo, DealsCracker, ActiveSOS, Smart Parking, or any other project.
- IMAGES: Use public/case-studies/*.png from each project’s imageSrc — large hero + caption on every case study. No stock photos, no generic wireframe placeholders.
- COPY: Layman-first — Problem → Solution → Visual → Outcome. Each project scannable in ~10–15 seconds. Technology as small secondary badges only. No invented metrics.
- STRUCTURE: Cover (Engineering Without Limits) → Who we are → What we do (8 services) → Software case studies (5) → AI case studies (6) → Industries (only those supported by the 11 projects) → Process timeline → Why Scalevium → Staff augmentation → Tech stack (one page) → CTA scalevium@gmail.com.

Full project copy, slugs, stacks, URLs, and StackOne contribution note: use public/documents/PORTFOLIO-PDF-GENERATION-PROMPT.md as the data source.
```

---

*Last aligned with `src/lib/caseStudies.ts` and `/case-studies` in repository `scalevium-corporate-website-de`.*
