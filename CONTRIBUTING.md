# SmritiSaathi Contributor & Team Engineering Guide

**Target Team**: 6 Contributors (5-Day Hackathon Sprint)  
**Objective**: Rapid parallel feature development with zero merge conflicts.

---

## 1. Team Ownership Matrix

To prevent git merge conflicts, every contributor is designated as the sole owner of specific directories and domain features. **Contributors must only modify files within their assigned directories.**

| Contributor | Title & Domain | Exclusively Owned Folders | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Contributor 1** | Memories & Reminiscence Lead | `features/memories/*`<br>`app/(patient)/patient/memories/*` | Memory scrapbook cards, photo reminiscing viewer, audio voice note playback player. |
| **Contributor 2** | Routines & Circadian Rhythm Lead | `features/routines/*`<br>`app/(patient)/patient/routines/*` | Daily rhythm checklist, orientation time provider, step-by-step medication prompt scaffolding. |
| **Contributor 3** | Cognitive Engagement Lead | `features/cognition/*`<br>`app/(patient)/patient/games/*` | Errorless cognitive games, music listening prompts, engagement score calculator. |
| **Contributor 4** | Caregiver Portal Lead | `features/caregiver/*`<br>`app/(caregiver)/caregiver/*` | Caregiver real-time telemetry card, family story upload drawer, caregiver respite tips. |
| **Contributor 5** | Practitioner & Analytics Lead | `features/practitioner/*`<br>`app/(practitioner)/practitioner/*` | Patient cohort table, longitudinal cognitive progression charts, clinical consultation logs. |
| **Contributor 6** | AI Platform & Core Architect | `services/*`<br>`features/companion/*`<br>`components/ui/*`<br>`lib/*` | Server-side Gemini API prompt client, shared UI primitives, types, CI/CD and deployment. |

---

## 2. Component Ownership Rules

- **Shared UI Primitives (`components/ui/*`)**: Owned by Contributor 6. If you require a new UI primitive (e.g. `Dialog`, `Slider`), request it from Contributor 6 or create a PR targeting that directory with Contributor 6 review.
- **Domain Components (`features/<feature>/components/*`)**: Owned entirely by that domain's assigned lead. Build your feature components inside your own feature folder!
- **Barrel Exports (`features/<feature>/index.ts`)**: External modules may ONLY import from the top-level feature index (e.g., `import { MemoryItem } from '@/features/memories'`). Deep-linking into internal files (e.g. `@/features/memories/components/internal-card`) is prohibited.

---

## 3. Git Branching Strategy

We use a modified **GitHub Flow / Trunk-Based Development** model with short-lived feature branches:

```
main (Production / Vercel Auto-Deploy)
  ▲
  │ Pull Request (Requires 1 Review + Passing TypeScript Build)
  │
feature/<contributor-id>-<short-description>
  ├── feature/c1-memory-scrapbook
  ├── feature/c2-routine-checklist
  ├── feature/c3-cognitive-quiz
  ├── feature/c4-caregiver-dashboard
  ├── feature/c5-practitioner-trends
  └── feature/c6-gemini-orchestrator
```

### Branch Naming Convention
- Feature: `feat/<domain>-<short-slug>` (e.g., `feat/memories-photo-card`)
- Fix: `fix/<domain>-<short-slug>` (e.g., `fix/routines-time-format`)
- Docs: `docs/<short-slug>` (e.g., `docs/api-contracts`)

---

## 4. Commit Message Conventions

We adhere strictly to [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative description>

[optional body]
[optional footer]
```

### Allowed Types:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools.

### Examples:
- `feat(memories): scaffold audio voice note player component`
- `feat(routines): implement circadian greeting state machine`
- `fix(caregiver): correct alert badge count calculation`
- `docs(team): update sprint deliverables in CONTRIBUTING.md`

---

## 5. Pull Request & Verification Checklist

Before submitting a PR or merging into `main`:

1. **Type Check**: Run `npm run build` locally. Zero TypeScript errors allowed.
2. **Lint Check**: Run `npm run lint`.
3. **Scope Check**: Confirm that changes are strictly confined to your assigned folders.
4. **No Secrets**: Ensure no API keys or personal credentials are committed.
5. **No AI Clichés**: Verify that your UI adheres to the high standards in `DESIGN.md`.
