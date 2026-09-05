# Agent Context & Engineering Rules for SmritiSaathi

> **Attention AI Coding Assistants**: Read this file before making any suggestions, refactors, or code modifications to this repository.

---

## 1. Core Mandates & Non-Negotiables

1. **Strict Scope Discipline**: Respect the assigned feature boundaries. If working on behalf of Contributor 1, do NOT edit files inside `features/routines/` or `app/(caregiver)/`.
2. **Server-Side AI Rule**: All Google GenAI SDK (`@google/genai`) operations must execute strictly on the server (in App Router API routes or Server Actions). Never expose `process.env.GEMINI_API_KEY` to client components.
3. **No Phantom Features**: Do not add unrequested games, voice synthesizers, or external database modules unless specified in the active sprint ticket.
4. **Accessible Dementia UX**:
   - Touch targets must be at least 48px (preferably 56px).
   - High contrast text against warm backgrounds (avoid pure black or pure white glare).
   - Never show negative error states or fail timers to the patient persona.
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
| `/patient/activities` | `app/(patient)/patient/activities/` | Dementia Patient | Gentle Cognitive Activities (Scaffold) |
| `/patient/profile` | `app/(patient)/patient/profile/` | Dementia Patient | Profile & Caregiver Quick Dial |
| `/caregiver` | `app/(caregiver)/caregiver/` | Family Caregiver | Caregiver Command Center |
| `/caregiver/memories` | `app/(caregiver)/caregiver/memories/` | Family Caregiver | Scrapbook & Keepsake Vault Management |
| `/caregiver/reminders` | `app/(caregiver)/caregiver/reminders/` | Family Caregiver | Circadian Routine & Medication Schedule |
| `/caregiver/monitoring` | `app/(caregiver)/caregiver/monitoring/` | Family Caregiver | Activity Monitoring & Weekly Insights |
| `/caregiver/alerts` | `app/(caregiver)/caregiver/alerts/` | Family Caregiver | Calm Notification & Safety Beacon Center |
| `/practitioner` | `app/(practitioner)/practitioner/` | Healthcare Practitioner | Desktop Clinical Sidebar |

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

## 7. Verification Commands

Always run these before completing changes:
```bash
npm run build   # Must compile cleanly with 0 TypeScript/Next.js errors
npm run lint    # Must pass ESLint
```

