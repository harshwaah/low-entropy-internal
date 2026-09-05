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

---

## 2. Directory & Route Mapping

| Route | Route Group Folder | Target Persona | Layout Key |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Solution Portal / Team Gateway | Root Gateway |
| `/patient` | `app/(patient)/patient/` | Dementia Patient | Mobile-First (`max-w-md`) |
| `/caregiver` | `app/(caregiver)/caregiver/` | Family Caregiver | Responsive Shell |
| `/practitioner` | `app/(practitioner)/practitioner/` | Healthcare Practitioner | Desktop Clinical Sidebar |

---

## 3. Public API Feature Pattern

Every feature in `features/*` has an `index.ts` file acting as a public API barrier:

```typescript
// ✅ Good: Import from feature barrel export
import { MemoryItem } from '@/features/memories';

// ❌ Bad: Deep-linking into internal files
import { MemoryItem } from '@/features/memories/types/index';
```

---

## 4. Verification Commands

Always run these before completing changes:
```bash
npm run build   # Must compile cleanly with 0 TypeScript/Next.js errors
npm run lint    # Must pass ESLint
```
