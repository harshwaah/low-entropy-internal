# Changelog

All notable changes to the **SmritiSaathi** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.0] - Phase 5: Caregiver Portal Foundation

### Added
- **Caregiver Home Command Center (`/caregiver`)**:
  - Replaced the initial placeholder with a comprehensive, family-oriented command center for remote oversight.
  - Prominent **Patient Summary Card (`PatientOverviewCard`)**: Displays Kamal Sharma's real-time circadian status, today's harmony engagement percentage (84%), reminder completion progress (3/4), last viewed memory, last activity completed, and a reassuring companion mascot daily note.
  - **Daily Reminders & Medication Overview (`ReminderOverviewCard`)**: Quick-status overview of scheduled routines and medications with one-tap status completion and direct navigation to detailed schedules.
  - **Memory Engagement Summary (`MemoryEngagementSummary`)**: Highlights curated keepsakes (12 items), most revisited stories, reminiscence chapter breakdown, and family love notes counters.
  - **Today's Activity Stream (`RecentActivityStream`)**: Chronological telemetry stream of passive check-ins, routine compliance, and emotional grounding moments with companion feedback.
  - Quick Caregiver Action Bar with instant modals for adding memories and reminders.
- **Scrapbook & Memory Vault Management (`/caregiver/memories`)**:
  - Full memory vault interface allowing caregivers to browse, search, and filter all 12 cherished memories across 6 life chapters.
  - **Add Memory Modal Flow (`AddMemoryModal`)**: Modal enabling caregivers to upload/select photo placeholders, define memory title, specify approximate era/year, location, narrative story, and attach heartfelt family love notes.
  - Highlighted "Recently Added & Highlighted Memories" carousel/grid with real-time optimistic client state update.
- **Circadian Reminder & Medication Management (`/caregiver/reminders`)**:
  - Dedicated schedule hub organized into Medication, Daily Routine, and Custom Reminder categories.
  - **Add Reminder Flow (`AddReminderModal`)**: Configures title, time period (morning, afternoon, evening, bedtime), dosage notes, recurrence rules, and caregiver verification flags.
  - **Edit Reminder Flow (`EditReminderModal`)**: Form for modifying scheduled times, administration instructions, and verification prompts.
  - One-tap status completion toggle ("Completed" / "Mark Done") and reminder removal with toast feedback.
- **Activity Monitoring & Trend Insights (`/caregiver/monitoring`)**:
  - Four key caregiver insight cards (`InsightMetricsCards`): Activities completed today, weekly engagement harmony, memory interactions, and zero-panic missed reminder statistics.
  - **Weekly Engagement Harmony Chart (`WeeklyEngagementChart`)**: 7-day visual rhythmic bar graph tracking circadian stability, routine completion ratios, and daytime relaxation patterns.
  - Detailed rhythm telemetry breakdown explaining sundowning vulnerability prevention and auditory nostalgia benefits.
- **Calm Alert Center (`/caregiver/alerts`)**:
  - Zero-panic alert notification center avoiding alarming red colors or emergency sirens in favor of supportive, empathetic guidance.
  - Displays missed reminder follow-ups, peaceful circadian routine deviations, and environmental comfort notes.
  - **Safety Beacon & SOS Placeholder**: Realistic tactile safety beacon integration showcasing synced bedside pendant status, instant family quick-dial, and signal test simulator.
  - Filter by pending vs. acknowledged alerts with interactive acknowledge toggles and gentle mascot chime triggers.
- **Dedicated Caregiver Navigation (`CaregiverNav`)**:
  - Responsive top navigation bar featuring the SmritiSaathi brand logo, live patient health pill, responsive sub-route links, dynamic alert notification badge, and caregiver profile indicator.

## [0.4.0] - Phase 4: Memory Scrapbook Experience

### Added
- **Memory Scrapbook Hub (`/patient/memories`)**:
  - Replaced the placeholder view with a complete, family scrapbook experience.
  - Implemented the companion greeting section ("Would you like to revisit a special moment today? ❤️") with the mascot in the `holding-book` state and a speech bubble.
  - Integrated the featured **Memory of the Day** showcase banner with a nostalgic narrative, era badge, and direct review action.
  - Built an interactive **Scrapbook Category Selector** with 6 life chapters (🏠 Childhood, 👨‍👩‍👧 Family, 🏫 School Days, 🎂 Celebrations, 🌳 Favorite Places, ❤️ Cherished Things) with immediate visual feedback.
  - Implemented a responsive grid of Polaroid-framed scrapbook cards with warm cream paper textures, top tape accents, emotional tags, and family notes counters.
- **Dedicated Memory Detail Page (`/patient/memories/[id]`)**:
  - Created an immersive memory viewer featuring a large, high-resolution photo with Polaroid framing and photo caption.
  - Integrated the companion mascot's comforting voice note introducing each memory with personalized context.
  - Designed the **Story Narrative** section using warm, high-contrast, easily readable typography with drop caps and generous line heights.
  - Built the **Love Notes from Family** section highlighting messages from children and relatives with avatar badges and timestamps.
  - Created a sensory **Memory Audio Player** with large play/pause controls, narrator attribution, and calming soundwave visualization.
  - Added peaceful sequential navigation ("Next Memory", "Explore More Memories") and a gentle not-found recovery page.
- **Cross-Experience Memory of the Day Integration**:
  - Integrated `MemoryOfTheDay` across the Patient Home (`/patient`) with a compact card and the Memory Hub (`/patient/memories`) with an expansive hero card.
- **Sample Nostalgic Dataset**:
  - Authored 12 realistic, emotionally rich sample memories spanning childhood homes in Jaipur, college graduation at Delhi University, family picnics at Lodi Gardens, wedding days in Agra, monsoon terraces, and baby milestones.
- **Accessibility & Cognitive Load Architecture**:
  - Large touch targets (minimum 56px), soothing low-cognitive-load palettes (`#FFFDF9`, `#FFF8F0`), zero timers or test-like pressure, and high-contrast typography.

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
