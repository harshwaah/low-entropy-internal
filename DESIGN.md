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
- **Usage Rules**:
  - The mascot should accompany empty states, success messages, and major onboarding flows.
  - Do not overuse the mascot in dense UI areas (like practitioner dashboards) where it might distract.
  - The mascot should always convey a positive, empathetic, or gently guiding emotion.
  - Associated iconography (like the heart or stars) often floats around the mascot.

## 5. The Patient-First Philosophy

Individuals with dementia experience sensory overload, visual agnosia, and spatial disorientation. The patient interface in SmritiSaathi is therefore engineered under strict cognitive guardrails:

### 5.1 Cognitive Load Reduction
- **Single-Column Focus**: The patient interface is constrained to a mobile-first column (`max-w-md`). Multi-column layouts divide peripheral attention and increase anxiety.
- **Orientation Anchoring**: Every patient view leads with an immutable orientation anchor:
  - Time of day (e.g., "Saturday Morning")
  - Date and season
  - Familiar location context ("At Home")
- **Chunked Information**: Never display more than one decision-point or instruction at a time.

### 5.2 Errorless Learning & Zero Fail States
- Traditional apps use validation errors, red warnings, and countdown timers. In dementia care, red banners and buzzer sounds induce agitation and catastrophizing.
- **Zero Fail States**: Activities and routines never score a "Wrong Answer" or display negative feedback. Unsuccessful attempts are met with gentle positive reinforcement and graceful automated assistance.

### 5.3 Tactile & Visual Ergonomics
- **Touch Targets**: All interactive elements have a minimum touch target of **56px × 56px** (above the standard 48px).
- **High Contrast**: Pass WCAG AAA (7:1 contrast ratio) between text and background.

---

## 6. Companion-First Experience

SmritiSaathi does not present itself as a medical surveillance tool or clinical test. It is framed as an empathetic, respectful companion:
- **Non-Infantilizing Language**: Avoid baby talk or condescending prompts. Respect the patient's lived experience and life history.
- **Preferred Nicknames**: Address the patient by their preferred family title (e.g., "Dad", "Kamal-ji", "Grandpa").
- **Familiar Voices**: Wherever possible, AI voice prompts should be paired with pre-recorded audio snippets from actual family members.
