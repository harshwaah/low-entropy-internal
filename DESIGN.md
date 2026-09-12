# SmritiSaathi Design System & Experience Philosophy

**Domain**: Assistive Digital Health / Mild Cognitive Impairment & Dementia  
**Audience**: Product Designers, Frontend Engineers, Clinical Advisors  
**Core Mantra**: *Dignity, Calmness, Emotional Reassurance, and Errorless Interaction.*

---

## 1. Visual Identity & Tone

SmritiSaathi’s visual identity rejects sterile, corporate, or hospital-like aesthetics. Instead, it feels like a warm, supportive friend. 

- **Warmth and Reassurance**: Soft pastel background colors, gentle curves, and generous spacing create a calming environment.
- **Approachable Typography**: We use **Quicksand** as the primary font—a rounded, friendly sans-serif that softens the clinical nature of the product.
- **Non-Medical Framing**: We refer to users as "Individuals" and "Caregivers", framing the product as a "Companion" rather than a "Treatment Tool".

## 2. Design System Tokens

| Token Name | Hex Value | Tailwind Variable | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Dark** | `#2C5545` | `--color-brand-dark` | Primary typography, deep contrast elements, heavy CTAs. Conveys groundedness and stability. |
| **Brand Primary** | `#4A8B71` | `--color-brand-primary` | Main accents, active states, key icons. Conveys life and growth. |
| **Brand Light** | `#E8F3EB` | `--color-brand-light` | Primary background fills for cards and sections. A soft, eye-safe mint. |
| **Brand Light Alt** | `#F3F8F5` | `--color-brand-light-alt` | Subtle alternating background sections for rhythm. |
| **Accent Orange** | `#FFB89E` | `--color-brand-accent-orange` | Hearts, warm highlights, Caregiver persona cards. Conveys warmth and emotion. |
| **Accent Yellow** | `#F9EBC8` | `--color-brand-accent-yellow` | Stars, floating pills, gentle highlights. Conveys brightness and hope. |
| **Accent Blue** | `#E6F0FA` | `--color-brand-accent-blue` | Practitioner persona cards. Soft, trustworthy, non-sterile blue. |
| **Canvas Background** | `#FDFBF7` | `--color-brand-background` | Global app background. A warm, creamy off-white that prevents harsh screen glare. |
| **Text Primary** | `#2A3B32` | `--color-brand-text` | Primary body text. Deep green-gray instead of pure black for reduced eye strain. |
| **Text Muted** | `#5C7065` | `--color-brand-muted` | Secondary text and descriptions. |

## 3. Shape & Space Rules

- **Corner Radii (Cards)**: `rounded-3xl` (24px). We completely avoid sharp corners. Large, exaggerated rounded corners make the interface feel safe and tactile.
- **Corner Radii (Buttons)**: `rounded-full` (Pill-shaped). Buttons must be unmistakably tappable and inviting.
- **Borders**: We rely on background color contrasts and very soft shadows (`shadow-sm` or `shadow-md`) rather than harsh stroke borders to define boundaries.
- **Padding**: Generous inner padding (`p-8` on cards) to give content room to breathe and reduce cognitive density.

## 4. The Mascot System

SmritiSaathi features a central mascot: a cute, round, white ghost-like/sprout character with a small green leaf on its head and a red scarf.

- **Purpose**: The mascot acts as the embodiment of the AI companion. It humanizes the interface and provides a friendly focal point.
- **Component Architecture**: The `<Mascot />` component is highly reusable and supports various sizes (`sm`, `md`, `lg`, `xl`) and states.
- **Emotional States**:
  - `default`: Friendly, attentive baseline expression. Used for general presence.
  - `happy`: Smiling with closed eyes, used for celebration, encouragement, and the CTA/completion screens.
  - `holding-heart`: Hugging a red heart. Used for sections regarding caregiving, connection, and family bonds.
  - `holding-book`: Holding a brown "Good Memories" scrapbook. Used for reminiscence therapies and journaling.
  - `greeting`: Hand waving. Used primarily on the Hero or Dashboard entry points.
- **Mascot Usage & Placement Rules**:
  - The mascot should accompany empty states, success messages, and major onboarding flows to provide an emotional anchor.
  - Do not overuse the mascot in dense UI areas (like practitioner clinical dashboards) where it might distract from objective data.
  - The mascot must be accompanied by contextual floating elements (e.g., stars, hearts, floating polaroids) to build narrative scenes.
- **Mascot Interaction Patterns**:
  - The mascot communicates via an adjacent or overlapping "Speech Bubble" element.
  - Keep speech text short, utilizing bold keywords and emojis (like ❤️) for scannability.
  - When responding to user input, transition the mascot's state to match the sentiment (e.g., transitioning to `happy` when a routine is marked complete).

## 5. The Patient-First Philosophy

Individuals with dementia experience sensory overload, visual agnosia, and spatial disorientation. The patient interface in SmritiSaathi is therefore engineered under strict cognitive guardrails:

### 5.1 Cognitive Load Reduction
- **Focused Canvas**: The patient interface is constrained to a focused canvas (`max-w-2xl`) that scales comfortably on mobile and tablet without stretching infinitely.
- **Bottom Navigation**: Primary navigation is firmly anchored at the bottom using a persistent `PatientBottomNav` with oversized, high-contrast touch targets.
- **Orientation Anchoring**: Every patient view leads with an immutable orientation anchor:
  - Mascot Welcome and encouragement ("Good Morning, Meera")
  - Time of day (e.g., "Saturday Morning")
  - Date and season
- **Chunked Information**: Use highly distinct, large Preview Cards to chunk Daily Reminders, Memories, and Activities. Never display more than one major decision-point inside a card.

### 5.2 Errorless Learning & Zero Fail States
- Traditional apps use validation errors, red warnings, and countdown timers. In dementia care, red banners and buzzer sounds induce agitation and catastrophizing.
- **Zero Fail States**: Activities and routines never score a "Wrong Answer" or display negative feedback. Unsuccessful attempts are met with gentle positive reinforcement and graceful automated assistance.

### 5.3 Tactile & Visual Ergonomics (Accessibility)
- **Elderly User Optimization**: The interface must prioritize readability and visual comfort over information density.
- **Touch Targets**: All interactive elements (buttons, cards) have an oversized minimum touch target of **56px × 56px**.
- **High Contrast**: Pass WCAG AAA (7:1 contrast ratio) between text and background. 
- **Readability & Visual Comfort**:
  - `Quicksand` provides highly legible, rounded letterforms that prevent visual crowding.
  - Generous line-height (`leading-relaxed`) and constrained line widths improve tracking for users with declining visual acuity.
  - Muted background tones (warm creams and off-whites instead of stark pure-white) prevent photophobia and screen glare.

---

## 6. Companion-First Experience & Motion Guidelines

SmritiSaathi does not present itself as a medical surveillance tool or clinical test. It is framed as an empathetic, respectful companion:
- **Non-Infantilizing Language**: Avoid baby talk or condescending prompts. Respect the patient's lived experience and life history.
- **Preferred Nicknames**: Address the patient by their preferred family title (e.g., "Dad", "Meera-ji", "Grandpa").
- **Calm, Breathing Motion (Anti-Hyperactivity)**:
  - **Idle State**: Very subtle vertical floating (2-4px displacement, 6-8 second duration, smooth easing `animate-mascot-idle`). The motion mimics natural, calming diaphragmatic breathing.
  - **Encouragement State**: Gentle pulse (`animate-mascot-encouraging`, 4.5s period) paired with soft sparkle accents.
  - **Celebration State**: Soft, joyful tilt (`animate-mascot-celebrating`, 3.5s period) without aggressive bouncing or spinning.
  - **Thinking State**: Subtle reflective sway (`animate-mascot-thinking`, 5.5s period) signaling contemplation.
  - **Forbidden**: High-frequency bouncing, spinning, or rapid flashing that could trigger visual anxiety or disorientation.

---

## 7. Speech Bubble System & Positioning Standards

To maintain emotional clarity and legibility without visual occlusion:
- **Zero Facial Occlusion**: Speech bubbles must NEVER overlap the mascot's eyes, smile, or primary facial features.
- **Directional Pointer Tails**: Every bubble includes a stylized pointer tail directly connecting the spoken dialogue to the companion.
- **Responsive Layout**:
  - `top-right` (Default): Sits above and to the right of the mascot container.
  - `top-left`: Used when right boundary room is constrained.
  - `top`: Centered above the character for wide screen banners.
- **Typographic Comfort**: High-contrast dark text (`text-brand-dark`), rounded 24px-32px bubble borders, soft drop shadows, and maximum line length under 30 characters.

---

## 8. Mascot Usage & Cognitive Reduction Standards

The mascot serves as an emotional anchor, not generic visual filler:
- **Purposeful Contexts Only**:
  1. **Welcome Moments**: Onboarding, daily orientation greetings.
  2. **Encouragement & Reassurance**: Check-ins, medication acknowledgments.
  3. **Cognitive Game Guidance**: Instructions, celebratory cues.
  4. **Empathy & Reassurance**: Peaceful reflections, evening wind-down.

---

## 9. Patient Daily Journey Architecture (v1.0.0)

In version 1.0.0, the patient interface transitions from static, page-based vertical scrolling to an interactive, **Journey-Based Guided Flow**.

### 9.1 The 5 Guided Daily Steps
1. **Step 1: Greeting & Orientation (`greeting`)**
   - Circadian Stage Recognition ("Morning Awakening", "Afternoon Engagement", "Evening Wind-Down").
   - Anchored Date & Time format ("Saturday, September 12 • 9:30 AM").
   - Primary CTA: Ultra-large 64px `Continue My Day` button.
2. **Step 2: Gentle Routine & Medicine (`reminder`)**
   - High-focus single reminder presentation with dosage instructions.
   - Primary Action: `I Have Taken This Medicine` (instant affirmative feedback).
   - Seamless progression to memory step.
3. **Step 3: Cherished Memory of the Day (`memory`)**
   - Nostalgic Polaroid card featuring family moments, location tags, and love note snippets.
   - Primary CTA: `Open This Memory Book` (routes to oral history and audio narration).
4. **Step 4: Mindful Activity of the Day (`activity`)**
   - Focus recommendation tailored to circadian phase (e.g., Autobiographical Memory Trail or Living Room Stroll).
   - Zero timers, zero scores, pure comfort.
5. **Step 5: Daily Peace & Reflection (`celebration`)**
   - Positive daily celebration celebrating completed items.
   - One-tap Indian Classical soothing music playback (`Play Calming Music for Rest`).

### 9.2 Circadian Stage Themes & Palette Modifiers
- **Morning Awakening** (`5:00 AM – 11:59 AM`): Warm golden dawn tones (`bg-amber-100`, `#FFF8F0`), morning chai & prayer grounding.
- **Afternoon Engagement** (`12:00 PM – 4:59 PM`): Gentle emerald & sage tones (`bg-emerald-100`, `#E8F3EB`), mindful cognitive exploration.
- **Evening Wind-Down** (`5:00 PM – 4:59 AM`): Soft twilight lavender & dusk tones (`bg-purple-100`, `#FAF5EE`), soothing raga therapy & rest.

### 9.3 Touch Target & Ergonomic Standards
- **Primary Actions**: Minimum **64px** height (`h-16` or `h-18`) with 24px–32px horizontal padding.
- **Secondary Actions**: Minimum **56px** height with high-contrast text and tactile press feedback.
- **Scroll Elimination**: Patient routes avoid deep stacked vertical feeds; focus cards provide immediate action before optional expansion.
  3. **Celebrations**: Completing daily routines or finishing games.
  4. **Memory Introductions**: Gentle framing before nostalgic storytelling.
- **Avoid Over-Saturation**: Never place the mascot in every nested card or repetitive list item. One primary mascot presence per screen establishes calm focus.

---

## 9. Scrapbook Experience Philosophy

The Memory Scrapbook is the emotional core of SmritiSaathi. It is fundamentally designed as a **family keepsake album**, actively rejecting the conventions of medical databases, clinical dashboards, file managers, or generic social media feeds:
- **Warm Nostalgic Atmosphere**: The palette centers around warm off-whites (`#FFFDF9`, `#FFF8F0`), parchment textures (`#F0E6D8`), and soft amber accents (`#F59E0B`, `#E07A5F`).
- **Low Cognitive Load**: No search filter syntax, nested folders, or date-range pickers. Life moments are categorized into 6 universal human chapters (Childhood, Family, School Days, Celebrations, Favorite Places, Cherished Things).
- **Personalized Dignity**: Memories are not treated as "cognitive recall tests" or pop-quizzes. They are invitations to revisit warm moments, accompanied by love notes from children and grandchildren.
- **Multi-Sensory Engagement**: Visual photos are paired with companion voice notes and recorded family narrations to stimulate auditory and emotional memory centers simultaneously.

---

## 10. Memory Card Design Guidelines

Every memory card acts as an individual scrapbook leaf:
- **Polaroid Framing**: 16px-24px outer border with subtle off-white backgrounds (`#FFFDF9`), soft organic corner radius (32px), and a top paper tape accent (`bg-amber-100/80`).
- **Card Anatomy**:
  1. **Cover Image**: High-resolution image rendered with 4:3 aspect ratio, covered with a gentle gradient overlay for text readability.
  2. **Emotional Tag Badge**: Pill anchored in the upper-left (e.g., "Warm Nostalgia", "Pure Joy", "Lifelong Love") with an icon indicator.
  3. **Voice Note Pill**: Anchored in the upper-right when a family audio narration is present (`Volume2` icon + duration).
  4. **Date & Location**: High-contrast, semi-transparent pill in the lower-left (`Calendar` + era text, `MapPin` + city).
  5. **Card Body**: High-contrast title (`text-2xl font-bold text-brand-dark`), short 2-line evocative teaser, and family note count metadata.
  6. **Interactive Target**: Entire card is a single, accessible anchor (`<Link>`) with a minimum 56px touch footprint and gentle hover scale (`hover:scale-[1.01]`).

---

## 11. Photo Presentation & Reminiscence Standards

- **Large Photo Hierarchy**: In the Memory Detail view (`/patient/memories/[id]`), the photograph is the undisputed visual hero, taking prominent center stage with generous margins and optional companion caption quotes.
- **No Referrer Restrictions**: All `<Image />` elements enforce `referrerPolicy="no-referrer"` to prevent broken image renders from remote CDNs.
- **High Visual Contrast**: Captions and companion prompts are rendered with minimum 4.5:1 contrast ratios against parchment backgrounds.
- **Companion Warm Framing**: The Mascot sits below or beside the photo in a `holding-book` state, gently introducing the memory with contextual familiarity ("This is your childhood home in Jaipur...").
- **Family Note Accents**: Family contributions are styled as handwritten greeting cards with sender initials, relationship badges, and affectionate messages, anchoring the patient in safety and love.

---

## 12. Caregiver Experience & Portal Design Philosophy

The Caregiver Portal (`/caregiver`) serves as the remote command center and emotional lifeline for family members and primary caregivers:

### 12.1 Emotional Tone & Framing
- **Empathetic & Supportive**: The interface must feel like a dependable family organizer, never a sterile hospital telemetry dashboard or corporate EMR.
- **Dignified Family Terminology**: We refer to the recipient by familial titles ("Papa", "Mother", "Kamal-ji") rather than clinical terminology like "Bed 4" or "Subject 102".
- **Empowerment Over Anxiety**: Caregivers often experience profound emotional burnout. The UI prioritizes reassuring metrics, highlights positive interactions, and validates their compassionate efforts.

### 12.2 Ergonomics & Information Hierarchy
- **Organized Structure**: Caregiver views feature a structured multi-column layout with clear informational hierarchy, balanced white space, and scannable indicator cards.
- **Visual Design Tokens**: Retains the core SmritiSaathi design tokens (`Quicksand` typography, `rounded-3xl` card radii, mint `#E8F3EB`, and warm cream `#FDFBF7` canvas).
- **Interactive Modals**: Seamless inline dialogs for adding memories and scheduling routines without navigating away from the dashboard context.

### 12.3 Calm Notification & Alert Architecture
- **Zero Panic Colors**: Avoid stark emergency-red banners, flashing strobe indicators, or buzzer sounds. Alarms are framed as gentle observations (e.g., "Afternoon Hydration Follow-up", "Peaceful Routine Shift").
- **Empathetic Contextual Notes**: Every notice explains the companion's passive observation (e.g., "Papa took a peaceful veranda rest; no distress detected") and suggests gentle, low-pressure next steps.
- **Safety Beacon Reassurance**: Prominently communicates active sensor status, emergency quick-dials, and geofence health with green trust badges.

---

## 13. Practitioner Experience & Clinical Design Philosophy (Phase 6 / v0.6.0)

The Practitioner Portal (`/practitioner`) provides clinical oversight for neurologists, geriatricians, and neuropsychologists:

### 13.1 Emotional Tone & Clinical Framing
- **Professional, Trustworthy, Insightful, Efficient**: The experience delivers medical precision and cognitive clarity without degenerating into a cold, hospital-like, or overly administrative legacy EMR.
- **Warm Consistency with Clinical Differentiation**: While patient views emphasize warm parchment textures and large tactile cards, the practitioner layout adopts clean slate structures (`slate-100` canvas, `slate-200` borders, `blue-700` primary accents) while honoring the SmritiSaathi typography (`Quicksand`) and rounded contours (`rounded-2xl` to `rounded-3xl`).
- **Calm Risk Indicators Over Alarmism**:
  - Rather than flashing emergency red tags, risk stratification uses composed, clinically objective tiers:
    - `Optimal`: Soft emerald pills (`bg-emerald-50`, `text-emerald-800`, `border-emerald-200`) indicating stable cognitive and behavioral engagement.
    - `Mild Variance`: Soft amber pills (`bg-amber-50`, `text-amber-800`, `border-amber-200`) signaling subtle routine slippage or circadian shifts.
    - `Review Recommended`: Composed indigo pills (`bg-indigo-50`, `text-indigo-800`, `border-indigo-200`) recommending physician review during the next clinical encounter.

### 13.2 Dashboard Hierarchy & Layout Architecture
The Practitioner Command Center (`/practitioner`) follows a strict four-tiered clinical hierarchy:
1. **Tier 1: Clinical Overview Cards**: Immediate cohort-level aggregates (Enrolled Patients, Average Engagement, Circadian Routine Adherence, Pending Reviews).
2. **Tier 2: Cohort Analytics & Longitudinal Insights**: 7-day dual-metric visual stability indices, circadian window adherence distribution, and therapeutic modality utilization.
3. **Tier 3: Patient Roster & Stratification**: Interactive patient table/grid with multi-stage filtering, instant name/condition search, and direct drill-down links.
4. **Tier 4: Action & Decision Support (Two Columns)**:
   - *Left Column*: Recent chronological clinical observations and companion telemetry.
   - *Right Column*: AI-augmented clinical recommendations with category filtering and care plan application actions.

### 13.3 Analytics & Data Presentation Standards
- **Comparative Metric Coupling**: Memory engagement and routine adherence are displayed side-by-side to highlight how circadian stability directly preserves episodic recall.
- **Circadian Temporal Windows**: Telemetry is grouped into dementia-relevant temporal gates:
  - *Morning Window (08:00 - 11:00)*: Baseline medication compliance and waking orientation.
  - *Afternoon Window (12:30 - 15:30)*: Hydration and social/reminiscence engagement.
  - *Dusk Sundowning Window (17:00 - 19:00)*: High-variance agitation risk zone monitored for audio calming interventions.
  - *Bedtime Window (20:30 - 22:00)*: Sleep hygiene and restorative winding down routines.
- **High Visual Contrast & Rapid Scanning**: Data cards emphasize typography step ratios (step >= 1.25), large monospace numerical values, and subtle progress fills.

---

## 14. Gentle Cognitive Activities & Gamification Philosophy (Phase 7 / v0.7.0)

The Cognitive Activities Hub (`/patient/activities`) and mini-games provide therapeutic cognitive stimulation tailored specifically for individuals experiencing Mild Cognitive Impairment (MCI) and early-to-moderate dementia:

### 14.1 The Dignity-First "Errorless Learning" Paradigm
- **Absolute Elimination of Failure States**:
  - No buzzer sounds, red failure screens, negative error messages ("Wrong answer"), or penalizing score deductions.
  - If an incorrect choice is selected in sequencing or matching, the interface presents a gentle constructive nudge (e.g., *"No hurry at all! Let's remember where they are and try another card."*).
- **No Timers, Countdowns, or Rushing**:
  - The patient has unlimited time on every interaction.
  - Eliminating countdown clocks removes sympathetic nervous system arousal and test anxiety, preserving calm cognitive focus.

### 14.2 Positive Reinforcement & Micro-Celebrations
- **Companion Mascot as Cheerful Co-Explorer**:
  - Mitron (the companion peacock mascot) participates actively as a warm friend playing alongside the user, not a testing proctor.
  - Dynamic companion states: `greeting` at game start, `thinking` during deliberation, `encouraging` when exploring, and `celebrating` with heart/star confetti upon match or game completion.
- **Micro-Token Rewards**:
  - Milestone tokens, gentle flower petals, and heart counters visually reinforce effort and participation rather than high-score competition.
- **Replay & Progression Flow**:
  - Completing any activity presents an affirming celebration card with options to immediately replay the comfortable round or return to the main activities hub.

### 14.3 Cognitive Activity Types & Interaction Design
1. **Memory Match (`/patient/activities/memory-match`)**:
   - Focus: Working memory, visual recognition, and spatial orientation.
   - Design: 120px+ oversized cards, tactile spring physics, high-contrast borders, and culturally comforting icons (Chai, Marigold, Peacock Feather, Mango, Diya, Radio).
   - Modes: 3 pairs (6 cards) for gentle relaxation; 4 pairs (8 cards) for standard engagement.
2. **What Comes Next? (`/patient/activities/what-comes-next`)**:
   - Focus: Episodic executive functioning and daily procedural memory.
   - Design: Chronological step timeline with visual connectors, narrative context, and clear multi-choice action buttons.
   - Feedback: Immediate positive validation with descriptive affirmation text.
3. **Find The Object (`/patient/activities/find-the-object`)**:
   - Focus: Mindful visual scanning, figure-ground discrimination, and contextual attention.
   - Design: Illustrated cozy rooms (Kitchen, Veranda, Living Room) with discoverable items embedded into the scenery.
   - Hint System: On-demand "Need a Hint?" button prompts companion speech with directional guidance and pulsing visual cues without penalty.

### 14.4 Accessibility & Cognitive Ergonomics
- **Oversized Touch Targets**: Minimum 56px touch height on mobile/tablet, expanding to 120px+ for interactive cards and game buttons.
- **High Visual Contrast**: Large bold typography, 3px solid active borders, and clear state transitions (`scale-105`, `ring-4`).
- **Low Cognitive Density**: Single-task focus per screen view with zero extraneous widgets or popups.

---

## 15. AI Memory Layer & Reminiscence Story Weaver (Phase 8 / v0.8.0)

The AI Memory Layer transforms passive photographic viewing into an active, dignity-first oral history experience. It bridges patient reminiscence, gentle AI structuring, and intergenerational family connection.

### 15.1 Experience Vision: The Reminiscence Loop
```
Caregiver Uploads Photo
       ↓
Patient Revisits Memory with Saathi
       ↓
Patient Narrates Spoken Reflection
       ↓
Calming AI Story Weaver Structures Words
       ↓
Treasured Keepsake Book Grows & Family Connects
```

### 15.2 Anti-Chatbot & Anti-AI-Slop Directives
- **Zero Chat Bubbles / Chatbot Styling**: The interface avoids generic conversational back-and-forth chat windows, speech bubbles, typing indicators, or technical AI status bars.
- **Natural Scrapbook Metaphor**: Oral reflections are formatted as physical memoirs on rich off-white parchment paper (`#FFFDF9`), adorned with washi tape accents, drop caps, and rotated Polaroid frames.
- **Calming Progressive Story Weaving**:
  Technical loading states are replaced with a soothing 3-phase journey:
  - *Phase 1: Listening with warm attention*
  - *Phase 2: Cherishing the people and feelings*
  - *Phase 3: Weaving your words into a treasured storybook page*
  Zero technical buzzwords ("LLM", "Inference", "Tokens", "Processing").

### 15.3 Narration Ergonomics & Accessibility
- **Oversized Tactile Recording Control**: 144px pill-shaped microphone button with soft glow animations, clear active timers, and real-time soundwave visualizers.
- **Accessible 1-Tap Starter Phrases**: Contextually personalized starter reflection chips (e.g., *"Say: 'I remember the smell of fresh marigolds...'"*) allowing instant demonstration and removing the friction of a blank page.
- **Unhurried Pacing**: Patients can speak for as long as they wish in any language; the system provides zero time pressure or audio cutoffs.

### 15.4 Tri-Persona Memory Integration
- **Patient**: Gains emotional validation, joyful reminiscence, and ownership of their growing "My Stories" keepsake shelf.
- **Caregiver**: Receives real-time visibility into recent narrations, audio durations, and AI-synthesized emotional insights on Papa's mood and engagement, with a 1-tap "Love Note" reply action.
- **Practitioner**: Accesses lightweight, non-diagnostic participation metrics (Narrative Participation, Story Emotional Valence, Activity Frequency) documenting voluntary psychosocial wellness without clinical diagnostic claims.

---

## 16. Persona Onboarding System & First Impressions (Phase 9 / v0.9.0)

The Onboarding System introduces new users to SmritiSaathi with immediate warmth, role clarity, and personalized configuration while rigorously avoiding forms-heavy or clinical presentations.

### 16.1 Design Principles
1. **Dignity & Accessibility First**:
   - Every tap target is at least 56px in height (`min-h-[56px]`).
   - Generous contrast ratios with soft brand neutrals avoiding stark white glare (`#FDFBF7` canvas).
   - High legibility font pairings with step indicators that never pressure the user.
2. **Minimalist Text & High Emotional Resonance**:
   - Text is limited to 1-2 friendly sentences per screen.
   - Information capture is driven by tactile choice cards with emojis and clear selection rings rather than complex dropdowns.
3. **Mascot Anchor & Emotional Feedback**:
   - The companion mascot Saathi acts as the primary visual anchor in Patient onboarding.
   - Transitions between mascot states (`greeting` → `happy` → `celebrating`) reflect the user's progress.
4. **Role Tailoring**:
   - **Patient (5 screens)**: Centered entirely on comfort, warmth, favorite memories, and personal joys (Family, Music, Festivals).
   - **Caregiver (5 screens)**: Communicates immediate value across Memories, Routines, and Clinical Support without overwhelm.
   - **Practitioner (4 screens)**: Professional orientation highlighting longitudinal adherence curves and objective cognitive signals.
5. **Persistent & Re-runnable**:
   - Onboarding runs only once on first visit per portal.
   - Can be reset and replayed at any time via the discreet **"Restart Introduction"** action located in Patient Profile, Caregiver Settings, and Practitioner Settings.




## 17. The Living Room Memory Walk (Phase 9.1 / v0.9.1)
The Living Room activity exemplifies the therapeutic "Memory Walk" approach.
- **Narrative Over Testing**: The activity frames visual scanning as a peaceful "stroll" rather than a test. The mascot guides the user gently through the room.
- **In-Scene Memory Challenge**: Unlike generic modal popups, the memory challenge occurs contextually within the scene itself using invisible spatial hitboxes, anchoring recall to physical space.
- **Accessible TTS Support**: Every prompt features oversized (48x48px minimum) audio replay buttons utilizing the Web Speech API with deliberately slowed rates (`0.85x`) for optimal comprehension.
