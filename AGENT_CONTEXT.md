# Agent Context & Engineering Rules for SmritiSaathi

> **Attention AI Coding Assistants**: Read this file before making any suggestions, refactors, or code modifications to this repository.  
> **Current Version**: `v1.0.1` (Security, Secrets & Configuration Audit)  
> **Next Phase**: `v1.0.2` (Environment Migration & Secrets Hardening)

---

## Phase Lifecycle & Status Tracking

| Phase | Version | Description | Status | Key Deliverable |
| :--- | :--- | :--- | :--- | :--- |
| **Phases 1–7** | `v0.1–v0.7` | Foundation, Tri-Persona Portals, Firestore Integration | **COMPLETED** | Shared contexts, Firestore services |
| **Phase 8** | `v0.8.0` | AI Memory Layer & Reminiscence Story Weaver | **COMPLETED** | Scrapbook Keepsake & Oral History |
| **Phase 9** | `v0.9.0` | Persona Onboarding System & Multi-Persona Intercept | **COMPLETED** | Accessible Onboarding Chassis |
| **Release** | `v1.0.0` | Patient UX Transformation (5-Step Circadian Journey) | **COMPLETED** | Circadian Stages, Focus-First Hubs |
| **Audit** | `v1.0.1` | Security, Secrets & Configuration Audit | **COMPLETED** | `SECURITY_AUDIT.md`, Secrets Inventory |
| **Migration** | `v1.0.2` | Environment Migration & Secrets Hardening | **UPCOMING** | `.env` migration, Firestore rules lockdown |

---

## 1. Core Mandates & Non-Negotiables

1. **Strict Scope Discipline**: Respect the assigned feature boundaries. If working on behalf of Contributor 1, do NOT edit files inside `features/routines/` or `app/(caregiver)/`.
2. **Server-Side AI Rule**: All Google GenAI SDK (`@google/genai`) operations must execute strictly on the server (in App Router API routes or Server Actions). Never expose `process.env.GEMINI_API_KEY` to client components.
3. **No Phantom Features**: Do not add unrequested games, voice synthesizers, or external database modules unless specified in the active sprint ticket.
4. **Accessible Dementia UX & Patient Journey Architecture (v1.0.0)**:
   - **Journey-Based Flow**: The patient experience must follow a 5-step guided journey (Welcome/Orientation → Daily Care → Memory → Activity → Peace) rather than a confusing wall of choices.
   - **Circadian Stage Layouts**: Dynamically orient patients to Morning Awakening, Afternoon Engagement, and Evening Wind-Down.
   - **Ultra-Large Touch Targets**: All primary interactive buttons must be at least 64px height (`h-16` or `h-18`) with generous padding (≥24px).
   - **Zero Cognitive Friction & Scroll Reduction**: Avoid long stacked sections; present 1 focus item first before optional exploration.
   - **Errorless Learning**: Never show negative error states, countdown timers, or fail states to the patient persona.
5. **Visual Identity Adherence**:
   - MUST use the defined brand tokens (`brand-dark`, `brand-primary`, `brand-light`, `brand-accent-orange`, `brand-accent-yellow`, `brand-accent-blue`).
   - MUST use `Quicksand` font (`font-sans`).
   - Cards MUST use `rounded-3xl` and buttons MUST use `rounded-full`.
   - Never use sharp corners or clinical hospital aesthetics. Use warm, pastel colors and soft shadows.
   - **Shared Components**: MUST use the reusable library located in `components/shared/` (`FeatureCard`, `HelpCard`, `TimelineNode`, `StatBlock`, `SectionHeader`, `Mascot`, `Navigation`, `Footer`) instead of recreating them inline.
   - **Mascot Interaction**: The `<Mascot />` component must be leveraged to guide the user emotionally across flows.

---

## 2. Directory & Route Mapping

| Route | Route Group Folder | Target Persona | Layout Key |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Solution Portal / Landing Page | Root Gateway |
| `/patient` | `app/(patient)/patient/` | Dementia Patient | Centered App (`max-w-2xl`), Bottom Nav |
| `/patient/memories` | `app/(patient)/patient/memories/` | Dementia Patient | Memory Scrapbook Hub |
| `/patient/memories/[id]` | `app/(patient)/patient/memories/[id]/` | Dementia Patient | Dedicated Memory Detail Experience |
| `/patient/memories/[id]/narrate` | `app/(patient)/patient/memories/[id]/narrate/` | Dementia Patient | AI Guided Memory Narration Studio |
| `/patient/memories/[id]/story` | `app/(patient)/patient/memories/[id]/story/` | Dementia Patient | Treasured Storybook Memoir Page |
| `/patient/activities` | `app/(patient)/patient/activities/` | Dementia Patient | Gentle Cognitive Activities Hub |
| `/patient/activities/memory-match` | `app/(patient)/patient/activities/memory-match/` | Dementia Patient | Memory Match Mini-Game |
| `/patient/activities/what-comes-next` | `app/(patient)/patient/activities/what-comes-next/` | Dementia Patient | Routine Sequencing Mini-Game |
| `/patient/activities/find-the-object` | `app/(patient)/patient/activities/find-the-object/` | Dementia Patient | Visual Recognition Mini-Game |
| `/patient/profile` | `app/(patient)/patient/profile/` | Dementia Patient | Profile, Companion Call & "Restart Introduction" |
| `/patient/onboarding` | `app/(patient)/patient/onboarding/` | Dementia Patient | Dedicated Patient Onboarding Route |
| `/caregiver` | `app/(caregiver)/caregiver/` | Family Caregiver | Caregiver Command Center |
| `/caregiver/memories` | `app/(caregiver)/caregiver/memories/` | Family Caregiver | Scrapbook & Keepsake Vault Management |
| `/caregiver/reminders` | `app/(caregiver)/caregiver/reminders/` | Family Caregiver | Circadian Routine & Medication Schedule |
| `/caregiver/monitoring` | `app/(caregiver)/caregiver/monitoring/` | Family Caregiver | Activity Monitoring & Weekly Insights |
| `/caregiver/alerts` | `app/(caregiver)/caregiver/alerts/` | Family Caregiver | Calm Notification & Safety Beacon Center |
| `/caregiver/settings` | `app/(caregiver)/caregiver/settings/` | Family Caregiver | Care Circle Settings & "Restart Introduction" |
| `/caregiver/onboarding` | `app/(caregiver)/caregiver/onboarding/` | Family Caregiver | Dedicated Caregiver Onboarding Route |
| `/practitioner` | `app/(practitioner)/practitioner/` | Healthcare Practitioner | Desktop Clinical Sidebar |
| `/practitioner/settings` | `app/(practitioner)/practitioner/settings/` | Healthcare Practitioner | Workstation Settings & "Restart Introduction" |
| `/practitioner/onboarding` | `app/(practitioner)/practitioner/onboarding/` | Healthcare Practitioner | Dedicated Practitioner Onboarding Route |

---

## 3. Companion & Motion Standards
- **Mascot Presence**: Used intentionally as an empathetic anchor (welcoming, encouraging, celebrating, thinking).
- **Calm Breathing Animation**: Animations must use the calibrated CSS classes (`animate-mascot-idle`, `animate-mascot-encouraging`, `animate-mascot-celebrating`, `animate-mascot-thinking`). Never implement hyperactive or distracting keyframes.
- **Speech Bubble Clearance**: Speech bubbles must use directional positioning (`speechPosition="top-right" | "top-left" | "top" | "right"`) and must never overlap the mascot's facial expressions.

---

## 4. Memory Scrapbook Architectural Decisions (Phase 4 / v0.4.0)

1. **Scrapbook vs. Gallery**:
   - The memory experience is explicitly designed as a warm, tactile family keepsake album.
   - It is NOT a photo gallery, database, or file manager.
   - UI styling incorporates Polaroid-style parchment frames, subtle tape accents, emotional tags, and heartfelt love notes from family members.
2. **Category Model**:
   - 6 universal human chapters: Childhood (`childhood`), Family (`family`), School Days (`school`), Celebrations (`celebrations`), Favorite Places (`places`), Cherished Things (`things`).
3. **Memory of the Day**:
   - Featured on both Patient Home (`/patient`) with a compact card and Memory Hub (`/patient/memories`) with a rich showcase hero.
4. **Memory Detail Hierarchy**:
   - Flow: Hero photo → Mascot companion note → Audio narration voice player → Memory narrative story → Family love notes → Gentle sequential navigation.
5. **No AI/External Backend in Phase 4**:
   - Uses the typed in-memory sample dataset (`features/memories/data/sample-memories.ts`) with 12 rich memories.
   - External GenAI summarization, cognitive games, and caregiver editing are deliberately reserved for subsequent phases.

---

## 5. Public API Feature Pattern

Every feature in `features/*` has an `index.ts` file acting as a public API barrier:

```typescript
// ✅ Good: Import from feature barrel export
import { MemoryItem } from '@/features/memories';
import { CaregiverReminder } from '@/features/caregiver';

// ❌ Bad: Deep-linking into internal files
import { MemoryItem } from '@/features/memories/types/index';
```

---

## 6. Caregiver Experience Architecture (Phase 5 / v0.5.0)

1. **Family-Oriented Empowerment**:
   - The caregiver portal (`app/(caregiver)/caregiver/*` and `features/caregiver/`) is designed for organized, reassuring, family-centric oversight.
   - It is strictly NOT a corporate, clinical, or administrative tool.
2. **Zero-Panic Alerting**:
   - Alerts avoid harsh red tones or alarm sirens. Use soft ambers, calm blues/teals, and comforting explanations that guide gentle caregiver check-ins without panic.
3. **Scrapbook Keepsake Curation**:
   - Caregivers can curate memories for the patient by attaching era annotations, photos, narratives, and warm love notes.
4. **Circadian Scheduling**:
   - Daily schedules are partitioned into morning, afternoon, evening, and bedtime routines with explicit caregiver validation toggles for high-importance medications.
5. **No AI/External Backend in Phase 5**:
   - Uses the rich, typed sample dataset (`sample-caregiver-data.ts`) and modular service layer (`CaregiverService`). External push notifications, databases, and cognitive games remain out of scope for Phase 5.

---

## 7. Practitioner Experience & Clinical Architecture (Phase 6 / v0.6.0)

1. **Professional Yet Approachable Clinical Experience**:
   - The practitioner portal (`app/(practitioner)/practitioner/*` and `features/practitioner/`) delivers rapid medical oversight for neurologists and memory care specialists.
   - Distinct from the patient experience (warm/emotional) and caregiver experience (supportive/organized), the practitioner portal is **Professional, Trustworthy, Insightful, and Efficient**, while avoiding feeling cold, overwhelming, hospital-like, or overly administrative.
2. **Calm Risk Indicators**:
   - Never use alarming hazard icons or emergency sirens. Use objective, composed risk labels:
     - `Optimal` (Soft Emerald)
     - `Mild Variance` (Soft Amber)
     - `Review Recommended` (Composed Indigo)
3. **Observation Timeline Standards**:
   - Observations must be multi-source (`care_note`, `observation`, `family_update`, `significant_event`) to capture both physician clinical notes and companion telemetry.
   - Fast scanning: short summaries are immediately visible, with expandable rich narratives and action taken indicators.
4. **Clinical Recommendations Placeholder System**:
   - UI placeholders for future AI/Gemini clinical decision support.
   - Divided into 4 clear therapeutic categories: `memory_activity`, `engagement_improvement`, `routine_reinforcement`, and `follow_up_prompt`.
   - Includes interactive "Apply to Plan" and "Dismiss" actions with state updates.
5. **Route Mapping**:
   - `/practitioner`: Central command center, overview cards, cohort analytics, patient roster, recent notes, and recommendation cards.
   - `/practitioner/observations`: Chronological observation and clinical note timeline with interactive note creation modal.
   - `/practitioner/patient/[id]`: Individual patient clinical file with 7-day trajectories, medications, nostalgic triggers, observations, and recommendations.

---

## 8. Cognitive Activities Architecture & Game Design Rules (Phase 7 / v0.7.0)

1. **Errorless Game Philosophy**:
   - Never use buzzer sounds, negative scores, red error alerts, or time-out limits.
   - Every wrong tap receives a reassuring companion nudge (e.g., *"No hurry at all! Let's remember where they are and try another card."*).
2. **Companion Mascot Integration**:
   - The companion mascot (`<Mascot />`) must be actively present on every activity screen.
   - States: `greeting` on start screens, `thinking` during deliberation or hints, `encouraging` during active play, and `celebrating` on success.
3. **Accessibility Thresholds**:
   - Touch targets for interactive activity elements must be >= 56px (cards >= 120px).
   - Card fonts must use high contrast (`text-brand-dark` on `bg-white` or `bg-brand-light-alt`).
   - Visual hints must pulse with soft ambers (`bg-amber-100`, `border-amber-400`), never aggressive strobe flashes.
4. **Shared Components**:
   - Always use `ActivityLayout`, `ActivityCompletionCard`, `ActivityProgressCard`, and `ActivityEncouragementCard` from `@/features/cognition/components` across all mini-games for visual and behavioral consistency.

---

## 9. AI Memory Layer & Reminiscence Story Weaver Rules (Phase 8 / v0.8.0)

1. **Anti-Chatbot Constraint**:
   - Strictly avoid chat bubbles, chatbot avatars, typing dots, or conversation windows.
   - Narration is framed as oral history on parchment paper with companion Saathi as a gentle listener.
2. **Calming Progressive Generation**:
   - Processing must use human, dignified language: *Listening* → *Understanding* → *Creating Story*.
   - Never display technical AI terms ("tokens", "parameters", "LLM", "inference").
3. **Scrapbook Keepsake Aesthetic**:
   - Woven stories must be presented as physical scrapbook keepsakes: washi tape, drop caps, Polaroid borders, audio waveform visualizers, and family love notes.
4. **Tri-Persona Flow**:
   - Patient narrates (`/patient/memories/[id]/narrate`) and views their growing collection (`/patient/memories`).
   - Caregiver views recent narrations and sends Love Notes (`/caregiver` & `/caregiver/memories`).
   - Practitioner views non-diagnostic narrative participation telemetry (`/practitioner`).
5. **Mock Demonstration Readiness**:
   - Use realistic, pre-populated templates in `sample-stories.ts` and `StoryService` so judges and reviewers can complete the entire narration flow and test memories within seconds without audio setup friction.

---

## 10. Persona Onboarding System Rules (Phase 9 / v0.9.0)

1. **Non-Intrusive Intercept Pattern**:
   - The onboarding flow intercepts entry on the primary dashboard page (`/patient`, `/caregiver`, `/practitioner`) only if `isCompleted === false`.
   - Never show a jarring layout shift; the onboarding layout replaces the page body cleanly without top/bottom navbars distracting from the initial impression.
2. **Minimal Text & Emotional Warmth**:
   - Limit text per step to 1-2 friendly sentences.
   - Use companion mascot visual reactions and large tap targets (`min-h-[56px]`).
   - Never present medicalized questionnaires or clinical terminology to the patient.
3. **Discrete Reset Accessibility**:
   - Every persona possesses a "Restart Introduction" action in its settings/profile section.
   - Calling `resetOnboarding()` clears the role's completion flag and redirects seamlessly to the corresponding onboarding route.

---

## 11. Verification Commands

Always run these before completing changes:
```bash
npm run build   # Must compile cleanly with 0 TypeScript/Next.js errors
npm run lint    # Must pass ESLint
```


## Memory Walk Expansion Notes (v0.9.1)
- When expanding activities (e.g., adding "Garden"), follow the `FindTheObjectGame` component pattern: a single unified state machine managing visual finding, audio synthesis (Web Speech API), and spatial memory challenges in a continuous, un-interrupted flow.
- Always use the predefined Tailwind-compatible colors in inline styles or mapped variants to preserve exact design fidelity for cognitive accessibility.
