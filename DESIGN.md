# SmritiSaathi Design System & Experience Philosophy

**Domain**: Assistive Digital Health / Mild Cognitive Impairment & Dementia  
**Audience**: Product Designers, Frontend Engineers, Clinical Advisors  
**Core Mantra**: *Dignity, Calmness, Emotional Reassurance, and Errorless Interaction.*

---

## 1. The Patient-First Philosophy

Individuals with dementia experience sensory overload, visual agnosia, and spatial disorientation. The patient interface in SmritiSaathi is therefore engineered under strict cognitive guardrails:

### 1.1 Cognitive Load Reduction
- **Single-Column Focus**: The patient interface is constrained to a mobile-first column (`max-w-md`). Multi-column layouts divide peripheral attention and increase anxiety.
- **Orientation Anchoring**: Every patient view leads with an immutable orientation anchor:
  - Time of day (e.g., "Saturday Morning")
  - Date and season
  - Familiar location context ("At Home")
- **Chunked Information**: Never display more than one decision-point or instruction at a time.

### 1.2 Errorless Learning & Zero Fail States
- Traditional apps use validation errors, red warnings, and countdown timers. In dementia care, red banners and buzzer sounds induce agitation and catastrophizing.
- **Zero Fail States**: Activities and routines never score a "Wrong Answer" or display negative feedback. Unsuccessful attempts are met with gentle positive reinforcement and graceful automated assistance.

### 1.3 Tactile & Visual Ergonomics
- **Touch Targets**: All interactive elements have a minimum touch target of **56px × 56px** (above the standard 48px).
- **High Contrast**: Pass WCAG AAA (7:1 contrast ratio) between text and background.
- **Sensory-Calm Palette**:
  - Primary Background: Warm off-white / sand (`#FBF9F5` / `amber-50`)
  - Typography: Deep charcoal/stone (`#1C1917`), avoiding harsh absolute black (`#000000`)
  - Calming Accents: Gentle amber, warm terracotta, soft sage green. Banned: Neon colors, flashing alerts, high-frequency motion.

---

## 2. Companion-First Experience

SmritiSaathi does not present itself as a medical surveillance tool or clinical test. It is framed as an empathetic, respectful companion:
- **Non-Infantilizing Language**: Avoid baby talk or condescending prompts. Respect the patient's lived experience and life history.
- **Preferred Nicknames**: Address the patient by their preferred family title (e.g., "Dad", "Kamal-ji", "Grandpa").
- **Familiar Voices**: Wherever possible, AI voice prompts should be paired with pre-recorded audio snippets from actual family members (son, daughter, grandchild).

---

## 3. Memory Scrapbook Concept

Episodic memory loss often progresses chronologically backwards (Ribot's law), leaving remote long-term memories intact while recent memory deteriorates.

### 3.1 Multi-Sensory Reminiscence
- **Photographic Cues**: Clear, full-bleed historic photographs tagged with key people ("This is your daughter Priya at her graduation in 2012").
- **Auditory Cues**: Audio voice recordings accompanying photos, allowing the patient to hear familiar intonations.
- **Sensory Association Prompts**: AI companion prompts that invite positive feelings without demanding recall:
  - *Do:* "Look at the big smile on Priya's face! That was such a sunny day in Shimla."
  - *Don't:* "Do you remember where this photo was taken or what year it was?"

---

## 4. Cognitive Activity Philosophy

Cognitive stimulation therapy (CST) helps maintain neuroplasticity and emotional well-being when delivered without pressure:
- **Validating Progress**: Celebrate participation, not speed or high scores.
- **Adaptive Difficulty**: If a patient hesitates for more than 8 seconds, the companion gently simplifies the choices or highlights the familiar item automatically.
- **Familiar Music**: Music engages deep cortical networks that remain preserved into late stages of dementia. Incorporating nostalgic tunes and favorite songs from early adulthood triggers emotional resonance.

---

## 5. Caregiver Support Philosophy

Family caregivers are the unsung heroes of dementia care, facing staggering rates of chronic stress and depression:
- **Asynchronous Peace of Mind**: Caregivers need to know their loved one is safe without having to constantly check in or call.
- **Discreet Anomaly Detection**: Provide alerts only for actionable anomalies (e.g., missed morning medications, lack of movement past expected wake time, or multiple confusion utterances).
- **Caregiver Respite & Affirmation**: Include daily affirmations, respite care directory access, and collaborative care notes for multi-sibling care teams.

---

## 6. Design Tokens & Visual Hierarchy

| Token | Light Value | Semantic Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#FBF9F5` (warm neutral) | Reduces eye strain and eliminates harsh contrast glare. |
| **Surface Card** | `#FFFFFF` (pure white) | Clear card boundary with subtle 1px border (`#E7E5E4`). |
| **Patient Primary Text** | `#1C1917` (stone-900) | Maximum legibility and crisp typography. |
| **Patient Accent** | `#D97706` (amber-600) | Warm, comforting energy associated with sunlight and hearth. |
| **Caregiver Primary** | `#047857` (emerald-700) | Trust, vitality, caregiving reassurance. |
| **Practitioner Clinical** | `#1E40AF` (blue-800) | Professionalism, clinical precision, focus. |
| **Corner Radius** | `12px - 16px` | Softened geometric edges that eliminate aggressive visual sharp angles. |
