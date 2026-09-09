# Changelog

All notable changes to the **SmritiSaathi** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.8.1] - Phase 8.1: Shared Data Architecture & Firestore Foundation

### Added
- **Unified Reactive State Engine (`SharedDataProvider`)**:
  - Implemented a centralized React Context wrapping the root layout, enabling seamless state sharing and unified logic across the **Patient App**, **Caregiver Portal**, and **Practitioner Dashboard**.
  - Engineered an optimistic state update layer ensuring zero-latency local changes that persist asynchronously to the database.
  - Created a dynamic bootstrapper that automatically checks the database on initialization and seeds 30+ detailed biographical, circadian, and clinical records if Firestore is empty.
- **Durable Firestore Service Layer**:
  - Authored a modular suite of CRUD services mapping types directly to collection patterns:
    - `patientService`, `memoryService`, `reminderService`, `activityService`, `narrationService`, `observationService`, `caregiverService`, `practitionersService`, `loveNoteService`, and `alertService`.
  - Implemented error boundaries with graceful console logs and fallback to robust, high-fidelity local state in case of connection dropouts.
- **Real-Time Cross-Portal Subscriptions**:
  - Hooked key portal components directly to live Firestore snapshot observers (`onSnapshot`), allowing real-time schedule adjustments, family scrapbook curations, and remote care notes to broadcast instantly.
- **Bi-Directional Telemetry Loops**:
  - Bound the Patient's checklist state to Caregiver and Practitioner dashboards: marking a routine task as completed immediately streams an event to the Caregiver's Recent Activities feed and increments Practitioner compliance curves.
  - Integrated Caregiver-authored Love Notes and curated Memories to pop up on the Patient experience in real time.

## [0.8.0] - Phase 8: AI Memory Layer (Reminiscence & Story Weaver)

### Added
- **Guided Memory Narration Studio (`/patient/memories/[id]/narrate`)**:
  - Implemented the central oral history recording and reminiscence studio for patients.
  - **Tactile Recording Controls**: Extra-large, high-contrast microphone button with warm pulse animation, active duration counter, and animated soundwave audio visualizer.
  - **Real-Time Spoken Transcript Display**: Styled like warm handwritten parchment paper with natural word streaming, unhurried typography, and no intimidating technical markers.
  - **Warm Companion Guidance**: Companion Saathi delivers culturally contextual, comforting prompts tailored to each specific photograph or memory.
  - **Accessible Starter Phrases**: 1-tap starter reflections ("I remember the marigolds...", "Kamal was smiling...") allowing instant testing, low-friction speech, and immediate demonstration.
  - **Calming Progressive Story Weaver Experience**: Replaces tech-heavy loading states with a tranquil 3-phase journey (*Listening with warm attention* → *Cherishing the people and feelings* → *Weaving your words into a treasured storybook page*) with zero artificial chatbot tropes.
- **Treasured Storybook Memoir View (`/patient/memories/[id]/story`)**:
  - Generates bespoke, emotional memoir chapters presented with a physical scrapbook aesthetic.
  - **Display Typography & Layout**: High-contrast serif headlines, illuminated drop-caps, washi tape keepsake headers, and Polaroid photo mounting with gentle angle rotation.
  - **Audio Reflection Player**: Interactive voice playback simulation of the patient's recorded spoken words with audio frequency waveform bars.
  - **Words From the Heart Pull-Quote**: Highlighted verbatim excerpts celebrating the authentic voice of the patient.
  - **Emotional Takeaways & Cherished Tags**: Pulls out key emotional phrases, location, era, and familiar family members mentioned.
  - **Family Share Quick Action**: Enables patients to celebrate and instantly share newly woven memoirs with their care circle.
- **Scrapbook "My Stories" Keepsakes Grid (`/patient/memories`)**:
  - Added dedicated "My Stories" section directly in the main patient memory hub.
  - Showcases all narrated memoirs as growing keepsakes with audio badges, narrative excerpts, and direct access to full memoir pages.
- **Caregiver Narration Visibility (`/caregiver` & `/caregiver/memories`)**:
  - Added `RecentNarrationsCard` showing oral histories narrated by the patient, including story titles, dates, audio durations, and AI-synthesized caregiver emotional insights.
  - Interactive "Love Note" reply feature fostering reciprocal emotional intimacy across the family care circle.
- **Practitioner Narrative Engagement Telemetry (`/practitioner`)**:
  - Added `NarrativeEngagementPanel` delivering observational, non-diagnostic engagement indicators:
    - *Narrative Participation*: Memoir completion counts and voluntary engagement rates.
    - *Story Engagement*: Affective valence and positive emotional resonance tracking.
    - *Activity Frequency*: Weekly reminiscence session counts and temporal pacing.
    - Clinical disclaimer clarifying observational psychosocial documentation without diagnostic overreach.
- **Data & Architecture Services (`features/memories`)**:
  - Added `MemoryStory` and `NarrationStep` types.
  - Created `StoryService` singleton with localStorage persistence and pre-populated sample memoirs for instant, believable demo readiness.
  - Added rich sample story templates across weddings, historic family homes, and monsoons.

## [0.7.0] - Phase 7: Cognitive Activities Foundation

### Added
- **Activities Hub (`/patient/activities`)**:
  - Implemented the central gentle cognitive engagement hub designed exclusively for dementia care.
  - **Companion Greeting & Warm Invitation**: Mitron (the companion peacock mascot) welcomes the patient with gentle conversational prompts ("Would you like to play a quick memory game today?").
  - **Daily Mindful Progress Overview**: Calm tracker displaying completed activities, positive affirmations, and gentle reward tokens without pressure.
  - **Featured Recommendation**: Prominently displays comforting, low-friction activities based on time of day and familiarity.
  - **Category Cards & Activity Directory**: Clear, high-contrast access to Memory Matching, Daily Routine Sequencing, and Mindful Observation.
- **Memory Match Game (`/patient/activities/memory-match`)**:
  - Fully playable, gentle card pairing game tailored for older adults with memory loss.
  - **Accessible Card Grid**: Extra-large touch targets (120px+), high-contrast borders, tactile feedback, and culturally familiar nostalgic imagery (Hot Chai, Marigolds, Auspicious Peacock Feather, Sweet Alphonso Mango, Pooja Diya, Vintage Radio).
  - **Pacing Selector**: 3-pair (Gentle / 6 cards) and 4-pair (Relaxing / 8 cards) modes.
  - **Calm Multi-State Lifecycle**: Start State with companion greeting, Play State with zero penalty and supportive companion speech, and Celebration State with celebratory mascot animations and replay controls.
- **What Comes Next? Routine Sequencing Game (`/patient/activities/what-comes-next`)**:
  - Episodic routine sequencing activity that strengthens daily functional orientation without test anxiety.
  - **Multi-Scenario Flow**: Includes Morning Sunshine Ritual (waking -> brushing teeth -> breakfast/chai), Brewing Afternoon Masala Chai, Tending Balcony Garden, and Peaceful Evening Wind-Down.
  - **Dignified Feedback System**: Gentle affirmation for matching steps and supportive constructive nudges without buzzer sounds, red failure text, or negative counters.
- **Find The Object Visual Recognition Game (`/patient/activities/find-the-object`)**:
  - Mindful visual exploration game across cozy, illustrated room environments (Kitchen Counter, Veranda Courtyard, Nostalgic Reading Nook).
  - **Interactive Scene Canvas**: Large, recognizable item targets embedded organically alongside ambient decorative elements.
  - **Gentle Companion Hint System**: Companion provides supportive textual and location cues when requested ("Look near the center of the kitchen counter"), accompanied by gentle pulsing animations.
- **Shared Activity Design System (`features/cognition/components/shared`)**:
  - `ActivityLayout`: Standardized full-screen patient header with oversized touch targets, companion guidance card, and calming footer reassurance.
  - `ActivityCompletionCard`: Joyful, validating completion screen with celebratory companion mascot, positive cognitive reinforcement, and large replay buttons.
  - `ActivityProgressCard`: Heart-based or milestone-based progress indicators showing step accomplishment without countdown clocks or stress.
  - `ActivityEncouragementCard`: Contextual mascot speech bubble for real-time encouraging prompts.
- **Cognitive Domain Layer (`features/cognition`)**:
  - Fully typed data models for activities, categories, routine scenarios, and scene objects.
  - Scalable service interface (`CognitiveServiceImpl`) providing culturally rich, dementia-optimized activity content.

## [0.6.0] - Phase 6: Practitioner Dashboard Foundation

### Added
- **Practitioner Command Center (`/practitioner`)**:
  - Implemented the central clinical oversight portal for attending neurologists and geriatricians.
  - **Clinical Overview Cards (`ClinicalOverviewCards`)**: Cohort-level aggregates tracking Active Patients (6), Average Engagement (75.0%), Routine Adherence (81.0%), and Active Clinical Reviews (2).
  - **Cohort Cognitive & Adherence Analytics (`CohortAnalyticsView`)**:
    - Interactive 7-day longitudinal stability index with dual-metric bars comparing memory fluency vs. circadian routine execution.
    - Circadian temporal window distribution tracking morning (94.2%), afternoon (86.5%), dusk sundowning (78.1%), and bedtime routines (88.4%).
    - Therapeutic modality breakdown for Autobiographical Scrapbooks (42%), Autonomous Daily Routines (34%), and Calming Auditory Therapy (24%).
  - **Patient Roster & Risk Stratification (`PatientRoster`)**:
    - Filterable and searchable patient cohort roster supporting search by name, condition, or preferred name.
    - Dementia stage filtering (All, Mild, Moderate) and calm risk stratification (Optimal, Mild Variance, Review Recommended).
    - Grid and Table view toggles with individual patient summary cards (`PatientSummaryCard`) linking directly to patient files.
  - **Recent Observations Feed (`RecentObservationsFeed`)**:
    - Quick-scanning stream of the latest physician notes, companion telemetry, and family updates.
  - **Clinical Recommendation Engine (`RecommendationsPanel`)**:
    - AI-augmented decision support cards categorized into Memory Activities, Engagement Ideas, Routine Reinforcement, and Follow-up Prompts.
    - Interactive "Apply to Plan" and "Dismiss" workflow controls with optimistic state updates and user feedback.
- **Observation Timeline & Care Notes (`/practitioner/observations`)**:
    - Dedicated chronological observation timeline view (`ObservationTimelineView`) displaying care notes, automated telemetry, family updates, and significant clinical events.
    - Rapid-scanning card anatomy with expandable detail narratives, vital context, and action taken indicators.
    - Interactive modal dialog (`AddObservationModal`) enabling clinicians to document new care notes and modifications in real time.
- **Patient Detail Clinical Deep-Dive (`/practitioner/patient/[id]`)**:
    - Dynamic route providing a comprehensive medical and behavioral profile for individual patients.
    - Patient hero banner with demographic details, attending physician, days active, and primary caregiver contact card.
    - Tabbed clinical navigation:
      - Clinical Deep-Dive & Metrics: 30-day baseline scores, 7-day individual comparative trajectory, active medications with prompt compliance, and autobiographical reminiscence anchors.
      - Observation History: Chronological clinical notes filtered specifically to the active patient with note recording capability.
      - Clinical Recommendations: Patient-specific therapeutic recommendations and care plan actions.
- **Practitioner Sidebar Navigation (`PractitionerSidebar`)**:
    - Clean clinical sidebar with clinic identification, attending physician context, active route indicators, cohort overview summary, and HIPAA compliance audit notification.
- **Clinical Domain Layer (`features/practitioner`)**:
    - Strongly typed models (`ClinicalPatient`, `ClinicalObservation`, `ClinicalRecommendation`, `CohortAnalyticsSummary`).
    - Comprehensive realistic sample dataset covering 6 diverse dementia/MCI patients, 8 clinical observations, and 6 actionable recommendations.
    - Asynchronous service interface (`PractitionerServiceImpl`) providing scalable mock data access.

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
