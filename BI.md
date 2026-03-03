# Tac UI — Brand Identity

## Philosophy: Clean & Modern Minimalist

> "Clarity through reduction" — Interfaces that are crisp, intentional, and strictly content-focused.

Tac UI is a design system built on the architecture of clarity. Moving away from heavy glows, excessive glassmorphism, and neon branding, every element rests on a high-contrast canvas separated by refined, structural borders, subtle elevation, and precise typography. Surfaces are definitive, shadows are realistic, and interactions feel tactile without being distracting.

Inspired by modern, premium SaaS products: the interface is unapologetically sharp. It prioritizes readability, high-fidelity micro-interactions, and a sophisticated minimalist color palette.

---

## Core Principles

### 1. High Contrast & Crisp Edges
Borders are definitive and structural, utilizing pristine 1px solid lines with minimal contrasts (e.g., `#E2E8F0` in light mode, `#262626` in dark mode). We avoid double-borders or glowing outer rings. Focus states and active components rely on zero-gap focus rings (`ring-offset-0`) to maintain a sleek, uninterrupted silhouette.

### 2. Refined Color Usage
Color is used sparingly to draw attention, denote state, or indicate primary actions. The primary accent is a refined, muted solid color—replacing older neon or gradient treatments. Backgrounds are grounded in pure whites (`#FFFFFF`) or deep, neutral darks (`#0A0A0A`), rather than heavily tinted or glossy surfaces.

### 3. Tactile Feedback
Interactions feel physical. The interface employs smooth, snappy spring-based motion for hovering, pressing, and expanding. Active states emphasize slight scale reductions (button presses, e.g. `scale: 0.98`), giving users natural, satisfying feedback instantly.

### 4. Typography as Interface
Typography establishes hierarchy. High-quality sans-serif fonts (like Inter or Pretendard) are used with strict tracking and leading. Headings are bold with slightly tighter tracking (`tracking-tight`), while descriptive metadata is muted but strictly legible (`leading-tight`).

---

## Color System

### Neutral Foundation
| Token | Light Mode Baseline | Dark Mode Baseline | Usage |
|-------|---------------------|--------------------|-------|
| `--background` | `#FFFFFF` | `#0A0A0A` | App background |
| `--foreground` | `#09090B` | `#FAFAFA` | Primary body text |
| `--surface-base` | `#FFFFFF` | `#171717` | Standard component backgrounds |
| `--border` | `#E4E4E7` | `#27272A` | Structural solid borders |
| `--muted` | `#F4F4F5` | `#27272A` | Secondary elements |
| `--muted-foreground` | `#71717A` | `#A1A1AA` | Secondary text, placeholders |

### Semantic Colors
| Intent | Usage |
|--------|-------|
| **Primary/Point** | Key brand CTAs, active states, and zero-offset geometric focus rings. |
| **Success** | Completed tasks, positive trends. Rendered with clean solid borders and subtle backgrounds. |
| **Warning** | Alerts requiring attention. |
| **Danger/Error** | Destructive actions or form errors. |

*(All semantic variants map directly to strictly defined CSS custom properties, rejecting arbitrary hardcoded opacity overlays for crisp rendering).*

---

## Motion Principles

### Snappy micro-interactions
- **Buttons / Interactables**: Scale down slightly on press (`scale: 0.98`) to mimic physical tactile hardware.
- **Focus Rings**: Immediately snap to the element edge cleanly (`ring-offset-0`), seamlessly matching the bounding box constraint.
- **Modals / Dialogs**: Enter with crisp spring constraints from `scale: 0.95`, conveying structural weight without sluggishness.

---

## Shape and Elevation

| Property | Value |
|----------|-------|
| Border Radius (sm) | `4px` |
| Border Radius (md) | `8px` |
| Border Radius (lg) | `12px` |
| Shadow (sm) | Crisp, tight drop shadow for standard interactive elevation |
| Shadow (md/lg) | Used strictly for floating context menus, dropdowns, and modals |

Elevation is predominantly achieved through single-layer, solid shadows and crisp borders rather than multi-layered glows or blurs. 

---

## Accessibility

- **Contrast**: All text and interactive elements conform to strict WCAG 2.1 AA standards (minimum 4.5:1 ratio).
- **Focus**: High-visibility zero-offset focus indicators (`focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--point)]`).
- **Motion**: Adherence to `prefers-reduced-motion` media queries globally.
- **Semantics**: Rigorous use of ARIA attributes, explicit explicit HTML roles, and accessible client-side routing.
