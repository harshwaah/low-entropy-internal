# SmritiSaathi Architecture Specification

**Document Version**: 1.2.0 (Phase 3.1: Patient Experience Stabilization & Companion Polish)  
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
  ├── Patient Mobile/Tablet PWA (/patient) — Centered Focused Canvas (max-w-2xl)
  ├── Caregiver Responsive Web (/caregiver)
  └── Practitioner Clinical Desktop (/practitioner)
          │
          ▼
[ Presentation Layer: Next.js 15 App Router ]
  ├── Route Groups: app/(patient), app/(caregiver), app/(practitioner)
  │     ├── /patient (Home), /patient/memories, /patient/activities, /patient/profile
  │     ├── /caregiver (Scaffolded Dashboard)
  │     └── /practitioner (Scaffolded Clinical Roster)
  ├── Shared Layouts & Experience Portals
  ├── Mascot & Speech Bubble Engine (components/shared/mascot.tsx)
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

---

## 9. Memory Scrapbook Domain Architecture (Phase 4 / v0.4.0)

### 9.1 Subsystem Overview
The Memory Scrapbook domain (`features/memories`) is built as a self-contained, patient-first reminiscence subsystem. It operates under strict feature barrier isolation:
```
features/memories/
├── types/              # Domain contracts (MemoryItem, MemoryCategory, FamilyNote, AudioNarration)
├── data/               # Sample memory repository & category definitions
├── components/         # Scrapbook UI primitives (MemoryCard, MemoryOfTheDay, MemoryDetailView, MemoryAudioPlayer, CategorySelector)
├── services/           # IMemoryService repository contract for patient & caregiver views
└── index.ts            # Public barrel export
```

### 9.2 Memory Data Structures
```typescript
export interface MemoryItem {
  id: string;
  patientId: string;
  title: string;
  shortDescription: string;
  story: string[];
  dateEra: string;
  yearApproximate?: string;
  location?: string;
  category: 'childhood' | 'family' | 'school' | 'celebrations' | 'places' | 'things';
  emotionalTag: string;
  emotionalColor?: string;
  companionIntro: string;
  coverImage: string;
  imageAlt: string;
  imageCaption?: string;
  familiarPeople: string[];
  familyNotes: FamilyNote[];
  audioNarration?: AudioNarration;
  isMemoryOfTheDay?: boolean;
  createdAt: string;
}

export interface FamilyNote {
  id: string;
  author: string;
  relation: string;
  text: string;
  date?: string;
  avatarInitials?: string;
  avatarBg?: string;
}

export interface AudioNarration {
  narrator: string;
  relation?: string;
  duration: string;
  title: string;
  previewUrl?: string;
}
```

### 9.3 Future Caregiver Integration Points
The Memory domain provides clean extension hooks for Contributor 4 (Caregiver Portal):
1. **Memory Curation API (`IMemoryService.addMemory(item)`)**:
   - Caregivers can upload high-resolution family photographs, add era annotations, and tag familiar relatives.
2. **Family Note Contribution**:
   - Family members can submit loving notes, voice recordings, and comforting anecdotes that append directly to `memory.familyNotes`.
3. **Reminiscence Engagement Telemetry**:
   - Patient visits to memories, audio playback durations, and repeated reviews are logged to trigger caregiver alerts regarding positive reminiscence states without intruding on patient privacy.
4. **Memory of the Day Scheduling**:
   - Caregivers can schedule specific memories to coincide with anniversaries, birthdays, or high-anxiety evenings (Sundowning management).

---

## 10. Caregiver Portal Foundation Architecture (Phase 5 / v0.5.0)

### 10.1 Subsystem Overview
Owned by **Contributor 4 (Caregiver Experience)**, the Caregiver Portal Foundation (`features/caregiver`) provides family-oriented oversight, circadian routine orchestration, and scrapbook memory curation without clinical complexity or invasive surveillance.

```
features/caregiver/
├── types/              # Domain contracts (CaregiverPatientOverview, CaregiverReminder, CaregiverActivityLog, CaregiverAlertItem, WeeklyEngagementDay)
├── data/               # Realistic sample data & state fixtures (sample-caregiver-data.ts)
├── components/         # Caregiver UI building blocks
│   ├── caregiver-nav.tsx               # Dedicated responsive top navigation with alert counters
│   ├── patient-overview-card.tsx       # Prominent patient status & telemetry summary card
│   ├── reminder-overview-card.tsx      # Daily reminders summary with one-tap status toggles
│   ├── memory-engagement-summary.tsx   # Scrapbook engagement & family note metrics
│   ├── recent-activity-stream.tsx      # Chronological timeline of check-ins and routines
│   ├── add-memory-modal.tsx            # Scrapbook keepsake curation modal flow
│   ├── add-reminder-modal.tsx          # Circadian routine & medication creation modal
│   ├── edit-reminder-modal.tsx         # Schedule timing & instruction update modal
│   ├── weekly-engagement-chart.tsx     # 7-day rhythmic harmony bar visualization
│   ├── insight-metrics-cards.tsx       # 4 core caregiver telemetry metric cards
│   ├── calm-alert-item.tsx             # Empathetic, non-alarming notification item
│   └── index.ts                        # Component barrel export
├── services/           # ICaregiverService abstraction providing asynchronous mock data retrieval
└── index.ts            # Public feature export barrel
```

### 10.2 Core Domain Models
```typescript
export interface CaregiverPatientOverview {
  id: string;
  name: string;
  preferredName: string;
  relation: string;
  age: number;
  condition: string;
  currentStatus: string;
  lastCheckInTime: string;
  todayEngagement: number; // e.g. 84%
  lastMemoryViewed: {
    title: string;
    era: string;
    timeAgo: string;
  };
  lastActivityCompleted: {
    title: string;
    category: string;
    time: string;
  };
  reminderCompletion: {
    completed: number;
    total: number;
    percentage: number;
  };
  companionNote: string;
}

export interface CaregiverReminder {
  id: string;
  title: string;
  category: 'medication' | 'routine' | 'custom';
  period: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  timeFormatted: string;
  instructions: string;
  recurrence: 'daily' | 'weekdays' | 'weekends' | 'custom';
  requiresCaregiverValidation: boolean;
  status: 'completed' | 'upcoming' | 'missed';
  completedAt?: string;
  medicationDosageNote?: string;
  assignedTo: string;
  iconName?: string;
}

export interface CaregiverAlertItem {
  id: string;
  patientId: string;
  severity: 'gentle' | 'info' | 'observation';
  type: 'reminder-missed' | 'routine-deviation' | 'sos-beacon' | 'environmental';
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  contextNote: string;
  recommendedAction?: string;
}
```

### 10.3 Route Architecture & Separation of Concerns
1. `/caregiver`: Central Command Center featuring the `PatientOverviewCard`, `ReminderOverviewCard`, `MemoryEngagementSummary`, and `RecentActivityStream`.
2. `/caregiver/memories`: Comprehensive memory vault management with interactive `AddMemoryModal`, era/location filtering, and family love note inspection.
3. `/caregiver/reminders`: Circadian schedule management with category filters, one-tap complete toggles, `AddReminderModal`, and `EditReminderModal`.
4. `/caregiver/monitoring`: Wellness trend dashboard with `InsightMetricsCards` and 7-day `WeeklyEngagementChart`.
5. `/caregiver/alerts`: Empathetic notification center with calm language, acknowledging triggers, and active SOS beacon integration.

---

## 11. Practitioner Domain & Clinical Architecture (Phase 6 / v0.6.0)

**Owner**: Contributor 5 (Practitioner Portal Lead)  
**Package/Module Root**: `features/practitioner/`  
**Route Group Root**: `app/(practitioner)/practitioner/`  

### 11.1 Domain Entity Architecture
The practitioner domain introduces structured medical models for dementia care:

```typescript
// features/practitioner/types/index.ts

export type DementiaStage = 'early' | 'mild' | 'moderate';
export type ClinicalRiskIndicator = 'optimal' | 'mild_variance' | 'review_recommended';

export interface ClinicalPatient {
  id: string;
  name: string;
  preferredName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  condition: string;
  stage: DementiaStage;
  engagementScore: number;       // 0-100%
  memoryActivityScore: number;   // 0-100%
  routineAdherenceScore: number; // 0-100%
  recentAlertCount: number;
  lastInteraction: string;
  daysActive: number;
  primaryCaregiver: {
    name: string;
    relation: string;
    phone: string;
    email: string;
  };
  attendingPhysician: string;
  riskIndicator: ClinicalRiskIndicator;
  riskLabel: string;
  riskContextNote: string;
  activeMedications: Array<{
    name: string;
    dosage: string;
    timing: string;
    adherenceRate: number;
  }>;
  primaryNostalgicTriggers: string[];
  weeklyHistory: Array<{
    day: string;
    memory: number;
    adherence: number;
  }>;
}

export interface ClinicalObservation {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  type: 'care_note' | 'observation' | 'family_update' | 'significant_event';
  title: string;
  summary: string;
  detail: string;
  author: {
    name: string;
    role: string;
    type: 'physician' | 'caregiver' | 'system' | 'specialist';
  };
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'attention_needed';
  vitalContext?: string;
  actionTaken?: string;
}

export interface ClinicalRecommendation {
  id: string;
  patientId: string;
  patientName: string;
  category: 'memory_activity' | 'engagement_improvement' | 'routine_reinforcement' | 'follow_up_prompt';
  priority: 'priority' | 'recommended' | 'routine';
  title: string;
  rationale: string;
  suggestedAction: string;
  status: 'pending' | 'applied' | 'dismissed';
  createdAt: string;
}

export interface CohortAnalyticsSummary {
  activePatients: number;
  averageEngagement: number;
  averageMemoryActivity: number;
  averageRoutineAdherence: number;
  pendingReviewsCount: number;
  weeklyTrends: Array<{
    day: string;
    memoryScore: number;
    routineScore: number;
    engagement: number;
  }>;
}
```

### 11.2 Service Layer Pattern (`PractitionerServiceImpl`)
Adhering to our bounded context guidelines, the practitioner feature abstracts all data fetching behind `PractitionerService` in `features/practitioner/services/index.ts`. All methods return asynchronous promises, ensuring seamless transition to PostgreSQL or REST API backends:
- `getPatients(filter?)`: Retrieves roster with optional stage and risk filtering.
- `getPatientById(id)`: Resolves full clinical record.
- `getCohortAnalytics()`: Generates aggregated longitudinal statistics and circadian distributions.
- `getObservations(patientId?, type?)`: Streams chronological multi-author care notes.
- `getRecommendations(patientId?, category?)`: Returns AI-augmented clinical decision support items.

### 11.3 Analytics Architecture
- **Circadian Temporal Segmentation**: Evaluates routine compliance across four key dementia biological intervals (Morning, Afternoon, Dusk Sundowning, Bedtime).
- **Dual-Axis Correlation**: Visualizes memory interaction fluency against circadian routine adherence to assist clinicians in evaluating therapeutic efficacy.
- **Modality Attribution**: Tracks proportional participation across Autobiographical Scrapbooks (Reminiscence), Autonomous Routines (Circadian), and Sensory Auditory regulation.

### 11.4 Recommendation & Clinical Decision Support Architecture
- **UI Placeholders for Generative AI**: Designed with clean medical interfaces ready to hook into server-side Gemini endpoints (`/api/practitioner/recommendations`) in future sprints.
- **Categorization Schema**:
  - `memory_activity`: Tailored reminiscence exercises using preserved episodic anchors.
  - `engagement_improvement`: Strategies to combat apathy or withdrawal.
  - `routine_reinforcement`: Timing adjustments to minimize circadian disruption.
  - `follow_up_prompt`: Suggested questions and clinical tests for family conferences.
- **Actionable Execution**: Recommendations include immediate "Apply to Plan" state transitions, updating the care protocol optimistically.


