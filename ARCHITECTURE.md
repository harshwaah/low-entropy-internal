# SmritiSaathi Architecture Specification

**Document Version**: 1.0.0 (Hackathon Architecture Phase)  
**Author**: Senior Staff Engineer & Solution Architect  
**Target Platform**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Vercel  
**Status**: APPROVED BASELINE

---

## 1. Product Vision & Problem Statement

Individuals living with mild-to-moderate dementia experience progressive impairment in episodic memory, temporal orientation, and executive function. Traditional technology overwhelms them with dense interfaces, confusing hierarchies, and rapid changes. Simultaneously, family caregivers suffer high rates of burnout, and healthcare practitioners struggle to capture objective longitudinal data between quarterly clinical encounters.

**SmritiSaathi** resolves this tri-party breakdown through an integrated, dementia-calibrated digital architecture:
1. **For Patients**: A warm, distraction-free companion that maintains orientation, facilitates multi-sensory reminiscence, and guides circadian daily rhythms.
2. **For Caregivers**: An asynchronous oversight portal that provides peace of mind without intrusive surveillance, allowing families to curate memory stories and schedule routines.
3. **For Healthcare Practitioners**: A clinical dashboard presenting longitudinal adherence metrics, engagement scoring, and audit trails.

---

## 2. Core Architectural Tenets (5-Day Hackathon Context)

To enable 6 engineers to build at high velocity over a 5-day sprint, the codebase is architected around four core tenets:

1. **Zero-Conflict Feature Modularity**: Features are isolated into self-contained bounded contexts under `features/<feature-name>`. Each contributor owns an exclusive folder tree.
2. **Independent Route Groups**: Next.js App Router route groups `(patient)`, `(caregiver)`, and `(practitioner)` allow UI components, navigation, layouts, and error boundaries to evolve without triggering merge conflicts.
3. **Strict Server-Side Boundary for Secrets**: All future generative AI (Gemini) and sensitive clinical endpoints reside on the server-side (`app/api/*` or Server Actions). Secrets such as `GEMINI_API_KEY` are never exposed to browser bundles.
4. **Deployability First**: The architecture targets Vercel and Cloud Run containers seamlessly with standalone Next.js compilation, strict typing, and zero hydration mismatches.
5. **Unified Design System (Phase 2)**: 
   - All UI elements strictly adhere to the `Quicksand` font and custom brand colors defined in `app/globals.css`. 
   - Components in `components/ui/` act as the source of truth for primitives (soft rounded corners, pastel colors, zero sharp edges).
   - Higher-order components are standardized in `components/shared/` (`Mascot`, `FeatureCard`, `SectionHeader`, etc.) to enforce visual rhythm and accessibility constraints across all domains without duplication.

---

## 3. User Types & Domain Scenarios

```
+-------------------------------------------------------------------------------+
|                                USER ARCHETYPES                                |
+-------------------------------------------------------------------------------+
|                                                                               |
|   1. PATIENT (Primary Consumer)                                               |
|      - Mild to moderate dementia / MCI                                        |
|      - Mobile-first, single-column viewport (max-w-md)                        |
|      - High contrast, large touch targets (>=48px), sensory-calm color tones  |
|      - Errorless interaction patterns (no failure states)                     |
|                                                                               |
|   2. CAREGIVER (Secondary Consumer & Administrator)                           |
|      - Adult children, spouse, or home health aide                            |
|      - Multi-device responsive (Smartphone & Desktop)                         |
|      - Remote routine management, memory curation, discreet alert streaming   |
|                                                                               |
|   3. PRACTITIONER (Clinical Observer)                                         |
|      - Neurologists, geriatricians, neuropsychologists, clinical social worker|
|      - Desktop-optimized workstation (high density, multi-patient roster)     |
|      - Cognitive stability trends, compliance audits, standardized note logs  |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 4. System Boundaries & Tiered Architecture

```
[ Client Viewports ]
  ├── Patient Mobile PWA (/patient)
  ├── Caregiver Responsive Web (/caregiver)
  └── Practitioner Clinical Desktop (/practitioner)
          │
          ▼
[ Presentation Layer: Next.js 15 App Router ]
  ├── Route Groups: app/(patient), app/(caregiver), app/(practitioner)
  ├── Shared Layouts & Experience Portals
  └── Atomic UI Primitives (components/ui/)
          │
          ▼
[ Domain Layer: Feature Modules (features/*) ]
  ├── features/memories     ── Contributor 1 (Scrapbook & Audio Reminiscence)
  ├── features/routines     ── Contributor 2 (Circadian Rhythm & Daily Schedule)
  ├── features/cognition    ── Contributor 3 (Frustration-Free Cognitive Games)
  ├── features/caregiver    ── Contributor 4 (Caregiver Telemetry & Alerts)
  ├── features/practitioner ── Contributor 5 (Clinical Roster & Trend Analytics)
  └── features/companion    ── Contributor 6 (AI Prompt Orchestration & Voice)
          │
          ▼
[ Application & Infrastructure Services (services/*) ]
  ├── services/gemini/     ── Server-side Google GenAI client contracts
  ├── services/analytics/  ── Clinical event telemetry & audit logging
  └── services/storage/    ── Repository abstraction (in-memory -> cloud db)
          │
          ▼
[ External Systems (Phase 2+ Targets) ]
  ├── Google Gemini API (Model: gemini-2.5-flash)
  ├── Durable Persistence (Firestore / Cloud SQL / PostgreSQL)
  └── Future Interoperability (HL7 FHIR / EHR integration)
```

---

## 5. Folder Architecture & Responsibilities

```
/
├── app/                  # Next.js 15 App Router (Route Groups & Page Scaffolding)
│   ├── (patient)/        # Route group for patient experience
│   ├── (caregiver)/      # Route group for caregiver experience
│   ├── (practitioner)/   # Route group for practitioner experience
│   ├── globals.css       # Tailwind CSS v4 styling rules
│   ├── layout.tsx        # Root HTML wrapper and metadata
│   └── page.tsx          # Solution Architecture & Hackathon Portal Gateway
├── components/           # Reusable UI components
│   ├── ui/               # Headless/styled primitives (Button, Card, Badge, Separator)
│   └── shared/           # Cross-cutting components (BrandLogo, PlaceholderModule)
├── features/             # Feature-based modular bounded contexts
│   ├── memories/         # Contributor 1: Reminiscence & Scrapbook
│   ├── routines/         # Contributor 2: Circadian & Step-by-Step Routines
│   ├── cognition/        # Contributor 3: Cognitive Games & Stimulation
│   ├── caregiver/        # Contributor 4: Remote Monitoring & Alerts
│   ├── practitioner/     # Contributor 5: Clinical Trends & Analytics
│   └── companion/        # Contributor 6: AI Companion & Conversational Tone
├── lib/                  # Utilities & Runtime Configurations
│   ├── config.ts         # Environment validation & app constants
│   └── utils.ts          # clsx + tailwind-merge (cn) helper
├── services/             # Cross-cutting infrastructural services
│   ├── gemini/           # Google GenAI prompt orchestration contracts
│   ├── analytics/        # Telemetry & cognitive audit log service
│   └── storage/          # Data repository interfaces
├── hooks/                # Custom React hooks (use-mobile, use-active-portal)
├── types/                # Domain models & TypeScript interfaces
├── constants/            # Route maps, roles, navigation, and team ownership matrix
└── docs/                 # In-depth architectural & sprint specifications
```

---

## 6. Coding Standards & Conventions

### 6.1 TypeScript Standards
- **Strict Mode**: Enabled via `tsconfig.json`. All variables, function parameters, and return types must be explicitly typed.
- **No `any`**: The use of `any` is strictly prohibited. Use `unknown` with runtime type narrowing or write an explicit interface.
- **Enums vs. Union Types**: Standard TypeScript `type Status = 'active' | 'inactive'` unions are preferred over runtime enums for lightweight bundle footprint.

### 6.2 Component Architecture & Server Components
- **Server Components by Default**: All components inside `app/` are React Server Components unless client-side state, event handlers, or browser APIs are strictly required.
- **`'use client'` Boundary**: Keep `'use client'` at the leaves of the component tree.
- **Naming Conventions**:
  - React Component Files: `kebab-case.tsx` (e.g., `placeholder-module.tsx`, `brand-logo.tsx`)
  - Component Functions: `PascalCase` (e.g., `export function PlaceholderModule()`)
  - Hooks: `camelCase` with `use` prefix (e.g., `useActivePortal`)
  - Types / Interfaces: `PascalCase` (e.g., `MemoryItem`, `RoutineTask`)

### 6.3 Import Conventions & Grouping
Use absolute alias `@/*` throughout the codebase. Group imports in the following order:
```typescript
// 1. React and Next.js built-ins
import React, { useState } from 'react';
import Link from 'next/link';

// 2. Third-party packages
import { LucideIcon, Heart } from 'lucide-react';
import { cva } from 'class-variance-authority';

// 3. Shared UI primitives & lib utilities
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 4. Domain feature modules & services
import { MemoryItem } from '@/features/memories';
import { ROUTES } from '@/constants/routes';

// 5. Types
import type { UserRole } from '@/types/user';
```

---

## 7. Deployment Readiness & Vercel Configuration

1. **Standalone Output**: Enabled in `next.config.ts` via `output: 'standalone'` for rapid, lightweight containerization.
2. **Environment Configuration**: Documented in `.env.example`.
   - `GEMINI_API_KEY`: Server-side secret configured in Vercel Project Settings.
   - `APP_URL`: Production domain URL.
3. **Static & Dynamic Generation**: Layouts are built with clean static fallbacks so the application compiles to zero-error static HTML assets during `npm run build`.

---

## 8. Future Expansion Strategy (Post-Hackathon)

1. **Multimodal Voice Agent**: Integrating Gemini Live API for real-time natural voice conversation with emotional reassurance.
2. **Clinical EHR Integration**: Exporting cognitive stability scores via HL7 FHIR standard protocols to Epic/Cerner health records.
3. **PWA Offline Mode**: Service worker caching of memories and daily routines for uninterrupted access during network outages.
4. **Wearable Telemetry Sync**: Integrating smartwatch sleep and heart-rate variability data to correlate circadian rhythms with cognitive clarity.
