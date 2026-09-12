# SmritiSaathi (स्मृति साथी)

> **An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9_Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![Hackathon MVP](https://img.shields.io/badge/Sprint-5--Day_MVP-emerald?style=flat-square)](./docs/HACKATHON_SPRINT_GUIDE.md)

---

## 1. Project Overview & Vision

Dementia impacts millions of individuals, eroding episodic memory, disrupting circadian rhythms, and creating severe emotional and physical strain on family caregivers. **SmritiSaathi** ("Companion of Memory" in Sanskrit/Hindi) is architected as an empathetic digital bridge between the patient, their family caregivers, and healthcare practitioners.

This repository contains the working SmritiSaathi MVP and its shared architecture. It includes:
- Independent Next.js App Router Route Groups for all 3 primary user experiences.
- A feature-based folder architecture preventing git merge conflicts during parallel development.
- Type-safe domain models and service contracts.
- Patient memories, routines, cognitive activities, and persistent music playback.
- Caregiver and practitioner experiences backed by shared application data.
- Instant deployability to Vercel and Google Cloud Run.

---

## 2. The Three Experience Portals & Onboarding

| Experience | Route | Primary Persona | Layout Archetype | First-Time Onboarding Flow |
| :--- | :--- | :--- | :--- | :--- |
| **Patient Companion** | `/patient` | Patient living with mild-to-moderate dementia | **Journey-Based Flow** (`max-w-2xl`) | 5-step guided circadian daily journey (Orientation → Care Routine → Memory → Activity → Peace), ultra-large touch targets (≥64px), zero-scroll focus cards, and Companion Saathi guidance. |
| **Caregiver Oversight** | `/caregiver` | Family member / Primary home caregiver | **Responsive** (Mobile & Desktop) | Real-time status, routine schedules, memory vault uploads, alert notifications, and caregiver respite check-ins. |
| **Clinical Dashboard** | `/practitioner` | Neurologist, Geriatrician, Care Coordinator | **Desktop Dashboard** | Clinical density, patient cohort roster, longitudinal cognitive progression metrics, compliance audit trails. |

---

## 3. Tech Stack

- **Framework**: [Next.js 16.3](https://nextjs.org/) (App Router, Server Components by default)
- **UI Runtime**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, explicit types, no `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Class Variance Authority (`cva`)
- **UI Primitives**: Custom accessible primitives patterned after shadcn/ui
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Application Data**: [Firebase 12.18](https://firebase.google.com/)
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
│   ├── music/                       # Global patient music engine, provider, catalog, and controls
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
├── public/assets/audio/music/       # Licensed calm and cognitive music assets
├── ARCHITECTURE.md                  # Comprehensive technical & system architecture
├── DESIGN.md                        # Clinical & cognitive UX philosophy
├── CONTRIBUTING.md                  # Git workflow, branch naming & PR guidelines
├── AGENT_CONTEXT.md                 # Context & instructions for AI coding assistants
├── CHANGELOG.md                     # Release and iteration history
└── package.json
```

---

## 5. Patient Music System

The patient experience mounts one `MusicProvider` in the patient layout. It
owns a singleton `HTMLAudioElement`, so playback and preferences survive
navigation between `/patient/*` routes without starting duplicate audio.

The persistent patient music controller provides:

- Play and pause
- Previous and next track, restricted to playable tracks in the active mode
- Mute and unmute
- Volume control
- Current mode and track title
- Persistent track, volume, mute, and playback-intent preferences
- Smooth fade transitions between tracks
- Graceful handling of browser autoplay restrictions

Music never starts automatically on initial page load. The patient must first
press Play, in accordance with browser autoplay policies.

### Route modes

Normal patient routes use `calm` mode. Only these routes automatically use
`cognitive` mode:

- `/patient/activities/memory-match`
- `/patient/activities/what-comes-next`
- `/patient/activities/find-the-object`
- `/patient/activities/quick-pick-trail`
The `/patient/activities` landing page remains in calm mode. Music continues
through a mode change only when it was already playing.

### Playable tracks

| Mode | Track | Local asset |
| :--- | :--- | :--- |
| Calm | Raga Yaman - Sitar | `/assets/audio/music/calm/raga-yaman-sitar.mp3` |
| Calm | Basuri Flute Melodies | `/assets/audio/music/calm/basuri-flute.mp3` |
| Cognitive | Bali Gamelan Xylophone | `/assets/audio/music/cognitive/bali-gamelan-xylophone.mp3` |
| Cognitive | Goettingen Chimes | `/assets/audio/music/cognitive/goettingen-chimes.mp3` |

Creator, source, license, provenance, and checksum details are recorded in
[`public/assets/audio/music/ATTRIBUTION.md`](./public/assets/audio/music/ATTRIBUTION.md).
North-East regional catalog entries remain non-playable placeholders until
appropriately licensed, state- and tradition-specific recordings are approved.

All other features must consume music functionality through the feature barrier:

```ts
import {
  MusicControls,
  MusicProvider,
  MusicRouteController,
  useMusic,
} from '@/features/music';
```

Do not create additional audio elements or import internal engine modules
directly. The public `duck` and `releaseDuck` APIs are available for future TTS
integration, but voice-instruction ducking is not connected yet.

### Manual playback QA

Run the application and open `http://localhost:3000/patient`. Verify Play,
Pause, Previous, Next, mute, and volume before navigating into each cognitive
game and back to a calm patient route. Also listen for excessive loudness,
clipping, distracting passages, and awkward loop seams.

---

## 6. Quickstart & Local Development

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

Visit [http://localhost:3000](http://localhost:3000) to view the portal gateway,
or [http://localhost:3000/patient](http://localhost:3000/patient) to test the
patient experience and music controls.

---

## 7. Verification & Quality Commands

```bash
# Verify TypeScript compilation and Next.js build
npm run build

# Run linting checks
npm run lint
```

---

## 8. Sprint Architecture Documentation

For complete technical specifications, review:
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): System boundaries, data models, scalability, and security.
- [`DESIGN.md`](./DESIGN.md): Patient-first philosophy, dementia interaction guidelines, and sound design.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): Git branching rules, team folder ownership matrix, and PR checklists.
- [`AGENT_CONTEXT.md`](./AGENT_CONTEXT.md): Guide for automated AI agents and co-developers.

## 9. Living Room Experience
The `Living Room` cognitive activity is implemented as a linear, scene-based progression within `/patient/activities/find-the-object`.
- **Interaction Model**: Patients are guided sequentially to locate distinct visual targets (Blue Jar, Clock, Cushion) using tap interactions. Successful discovery triggers a gentle chime and non-distracting visual highlight. Mistakes yield patient encouragement without harsh fail states or buzzer noises.
- **Accessibility**: Includes high-contrast hitboxes, large tap targets, and Web Speech API integration for auditory guidance and repetition.
- **Memory Challenge**: The activity concludes with a spatial memory challenge where the patient recalls the locations of previously discovered objects by tapping empty regions in the scene.
