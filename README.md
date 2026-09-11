# SmritiSaathi (स्मृति साथी)

> **An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.**

[![Next.js 15](https://img.shields.io/badge/Next.js-15_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9_Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![Hackathon MVP](https://img.shields.io/badge/Sprint-5--Day_MVP-emerald?style=flat-square)](./docs/HACKATHON_SPRINT_GUIDE.md)

---

## 1. Project Overview & Vision

Dementia impacts millions of individuals, eroding episodic memory, disrupting circadian rhythms, and creating severe emotional and physical strain on family caregivers. **SmritiSaathi** ("Companion of Memory" in Sanskrit/Hindi) is architected as an empathetic digital bridge between the patient, their family caregivers, and healthcare practitioners.

This repository represents the **Phase 1 Architecture & Foundation** for a 5-day hackathon sprint with 6 contributors. **No feature implementations have been included yet**; instead, this foundation establishes:
- Independent Next.js App Router Route Groups for all 3 primary user experiences.
- A feature-based folder architecture preventing git merge conflicts during parallel development.
- Type-safe domain models and service contracts.
- Thorough clinical, architectural, and design specifications.
- Instant deployability to Vercel and Google Cloud Run.

---

## 2. The Three Experience Portals & Onboarding

| Experience | Route | Primary Persona | Layout Archetype | First-Time Onboarding Flow |
| :--- | :--- | :--- | :--- | :--- |
| **Patient Companion** | `/patient` | Patient living with mild-to-moderate dementia | **Mobile-First** (`max-w-md`) | 5-step companion welcome, call name capture, personal joy discovery, and support area priorities. |
| **Caregiver Oversight** | `/caregiver` | Family member / Primary home caregiver | **Responsive** (Mobile & Desktop) | 5-step setup covering core care pillars (Memories, Routines, Support), relationship, loved one identity, and management focus. |
| **Clinical Dashboard** | `/practitioner` | Neurologist, Geriatrician, Care Coordinator | **Desktop Dashboard** | 4-step clinical workstation orientation covering longitudinal telemetry, physician profile, and clinical telemetry priorities. |

*Note: Onboarding is shown once on first entry, persists locally, and can be re-run at any time via "Restart Introduction" in Patient Profile, Caregiver Settings, or Practitioner Settings.*

---

## 3. Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components by default)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, explicit types, no `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Class Variance Authority (`cva`)
- **UI Primitives**: Custom accessible primitives patterned after shadcn/ui
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **AI Infrastructure**: Server-side [Google GenAI SDK](https://github.com/google-gemini/generative-ai-js) (`@google/genai`)
- **Target Deployment**: [Vercel](https://vercel.com/) & Cloud Run (Standalone output)

---

## 4. Repository Structure

```
├── app/
│   ├── (caregiver)/caregiver/       # Caregiver experience (layout + page)
│   ├── (patient)/patient/           # Patient experience (mobile-first layout + page)
│   ├── (practitioner)/practitioner/ # Practitioner experience (desktop layout + page)
│   ├── globals.css                  # Global Tailwind imports
│   ├── layout.tsx                   # Root HTML wrapper & global metadata
│   └── page.tsx                     # Solution Architecture & Experience Gateway
├── components/
│   ├── shared/                      # BrandLogo, PlaceholderModule, PortalSwitcher
│   └── ui/                          # Button, Card, Badge, Separator (cva primitives)
├── constants/
│   ├── navigation.ts                # Portal navigation configs
│   ├── roles.ts                     # User role metadata & permissions
│   ├── routes.ts                    # Centralized type-safe route map
│   └── team.ts                      # 6-contributor hackathon ownership matrix
├── docs/                            # Deep-dive architecture & sprint specifications
├── features/
│   ├── caregiver/                   # Contributor 4 bounded domain
│   ├── cognition/                   # Contributor 3 bounded domain
│   ├── companion/                   # Contributor 6 bounded domain
│   ├── memories/                    # Contributor 1 bounded domain
│   ├── practitioner/                # Contributor 5 bounded domain
│   └── routines/                    # Contributor 2 bounded domain
├── hooks/
│   ├── use-active-portal.ts         # Active portal detector
│   └── use-mobile.ts                # Mobile breakpoint detector
├── lib/
│   ├── config.ts                    # Environment & runtime configuration
│   └── utils.ts                     # Tailwind merge utility (cn)
├── services/
│   ├── analytics/                   # Telemetry & cognitive audit contracts
│   ├── gemini/                      # Server-side AI prompt/response contracts
│   └── storage/                     # Storage adapter abstraction
├── types/
│   ├── caregiver.ts, patient.ts, practitioner.ts, user.ts, navigation.ts
│   └── index.ts                     # Unified type exports
├── ARCHITECTURE.md                  # Comprehensive technical & system architecture
├── DESIGN.md                        # Clinical & cognitive UX philosophy
├── CONTRIBUTING.md                  # Git workflow, branch naming & PR guidelines
├── AGENT_CONTEXT.md                 # Context & instructions for AI coding assistants
├── CHANGELOG.md                     # Release and iteration history
└── package.json
```

---

## 5. Quickstart & Local Development

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-org/smriti-saathi.git
cd smriti-saathi

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start local development server (runs on port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portal gateway.

---

## 6. Verification & Quality Commands

```bash
# Verify TypeScript compilation and Next.js build
npm run build

# Run linting checks
npm run lint
```

---

## 7. Sprint Architecture Documentation

For complete technical specifications, review:
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): System boundaries, data models, scalability, and security.
- [`DESIGN.md`](./DESIGN.md): Patient-first philosophy, dementia interaction guidelines, and sound design.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): Git branching rules, team folder ownership matrix, and PR checklists.
- [`AGENT_CONTEXT.md`](./AGENT_CONTEXT.md): Guide for automated AI agents and co-developers.
