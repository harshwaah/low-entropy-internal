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
  3. **Celebrations**: Completing daily routines or finishing games.
  4. **Memory Introductions**: Gentle framing before nostalgic storytelling.
- **Avoid Over-Saturation**: Never place the mascot in every nested card or repetitive list item. One primary mascot presence per screen establishes calm focus.

