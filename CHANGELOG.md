# Changelog

All notable changes to the **SmritiSaathi** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.1] - Phase 3.1: Patient Experience Stabilization & Companion Polish

### Fixed & Audited
- **Landing Page & Journey CTAs**:
  - Eliminated all dead buttons across the primary landing page, header, and footer.
  - Linked "Choose Your Experience" smoothly to the `#personas` section.
  - Turned the Patient, Caregiver, and Medical Practitioner cards into fully interactive, accessible route links (`/patient`, `/caregiver`, `/practitioner`) with hover elevations.
  - Connected header and footer navigation links to active routes and section anchors (`#about`, `#features`, `#impact`).
- **Companion Motion System**:
  - Replaced aggressive bounces and spins with calibrated, non-distracting CSS animations (`animate-mascot-idle`, `animate-mascot-encouraging`, `animate-mascot-celebrating`, `animate-mascot-thinking`).
  - Tuned idle motion to a gentle 6-8s breathing loop (2-4px displacement) to instill calm without visual distraction.
- **Speech Bubble Placement**:
  - Engineered directional speech bubble positioning (`top-right`, `top-left`, `top`, `right`) with organic pointer tails.
  - Guaranteed speech bubbles never obscure the mascot's eyes or facial expressions across all viewports.
- **Patient Journey Routing**:
  - Implemented accessible sub-routes and calm placeholder views for `/patient/memories`, `/patient/activities`, and `/patient/profile`.
  - Upgraded `PatientBottomNav` to dynamically track the active pathname with `usePathname()`.
  - Added interactive medication check-off feedback ("I have taken it") and smooth "Continue Day" progression.
- **Mobile UX & Accessibility**:
  - Added safe area padding (`pb-safe`, `pb-28`) to prevent content clipping behind the bottom navigation.
  - Enforced minimum 56px touch targets on all patient controls.

## [0.3.0] - Phase 3: Patient Home Experience

### Added
- **Patient Layout Redesign**: Replaced the previous mobile-first testing shell with a clean, centered `max-w-2xl` layout and a persistent `PatientBottomNav`.
- **Mascot Emotion System**: Expanded the `<Mascot />` component with new dynamic states (`encouraging`, `celebrating`, `thinking`) that use CSS animations and icon overlays on top of the central SVG.
- **Companion Welcome Card**: Implemented a welcoming hero section in the patient view where the Mascot greets the user and provides encouraging context for the day.
- **Daily Overview & Previews**: Created large, accessible, high-contrast entry point cards for Memory of the Day, Upcoming Reminders, and Gentle Activities, providing a gentle foundation for future feature expansion.
- **Accessibility Enhancements**: Applied large typography, oversized touch targets, and generous spacing to support elderly users and those with cognitive decline.

## [0.2.0] - Phase 2: Design System & Visual Identity

### Added
- **Design System Tokens**:
  - Established core color palette (`brand-dark`, `brand-primary`, `brand-light`, `brand-accent-orange`, `brand-accent-yellow`, `brand-accent-blue`) in `app/globals.css`.
  - Added `Quicksand` as the primary sans-serif font across the application.
  - Defined soft corner radii (`rounded-3xl` for cards, `rounded-full` for buttons) to convey approachability and warmth.
- **Component Updates**:
  - Overhauled `Button` component in `components/ui/button.tsx` with rounded pill shapes, scale animations, and brand colors.
  - Overhauled `Card` component in `components/ui/card.tsx` with soft shadows and large corner radii (removing harsh borders).
  - Created highly reusable foundational components from the landing page: `FeatureCard`, `HelpCard`, `TimelineNode`, `StatBlock`, `SectionHeader`.
  - Created global `Navigation` and `Footer` components.
- **Mascot System**:
  - Implemented reusable `<Mascot />` component supporting varying emotional states (`happy`, `holding-heart`, `holding-book`) to standardize interactions and empathy across the UI.
- **Landing Page Implementation**:
  - Rebuilt `app/page.tsx` entirely to match the approved visual identity and structure.
  - Composed the landing page using strictly the new shared component system.
- **Documentation**:
  - Updated `DESIGN.md`, `AGENT_CONTEXT.md`, and `ARCHITECTURE.md` to reflect the new visual identity.


## [0.1.0] - Phase 1: Architecture & Contributor Enablement Baseline

### Added
- **Feature-Based Architecture**:
  - Established domain folders in `features/`: `memories`, `routines`, `cognition`, `caregiver`, `practitioner`, and `companion`.
  - Added public barrel export barriers (`index.ts`) for each feature to prevent deep-linking and coupling.
- **Independent Route Groups**:
  - Created `/patient` inside `app/(patient)` with a mobile-first, sensory-calm layout.
  - Created `/caregiver` inside `app/(caregiver)` with a multi-device responsive layout and quick status monitoring.
  - Created `/practitioner` inside `app/(practitioner)` with a high-density desktop clinical dashboard and cohort sidebar.
  - Built the root gateway `/` showcasing the architectural foundation, team ownership matrix, and portal launchers.
- **UI Component Scaffolding**:
  - Created accessible UI primitives in `components/ui/` (`Button`, `Card`, `Badge`, `Separator`) with Tailwind CSS and `class-variance-authority`.
  - Created shared components in `components/shared/` (`BrandLogo`, `PlaceholderModule`, `PortalSwitcher`).
- **Core Application Services & Contracts**:
  - Defined server-side Gemini AI interface scaffolding in `services/gemini/`.
  - Defined clinical telemetry and audit log contracts in `services/analytics/`.
  - Defined repository storage adapter in `services/storage/`.
- **Domain Modeling**:
  - Standardized domain models across `types/`: `user.ts`, `patient.ts`, `caregiver.ts`, `practitioner.ts`, and `navigation.ts`.
- **Team Enablement Documentation**:
  - Created `README.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONTRIBUTING.md`, `AGENT_CONTEXT.md`, and `CHANGELOG.md`.
  - Published the 6-Contributor Hackathon Matrix in `constants/team.ts` and on the root overview screen.
- **Vercel & Environment Readiness**:
  - Updated `.env.example` with documented keys for local and Vercel environments.
  - Created `lib/config.ts` for type-safe runtime configuration.
