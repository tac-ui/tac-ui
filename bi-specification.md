# Tac UI — Brand Identity Specification

> Version 1.0 · Effective 2026-02-27
> This document is the single source of truth for all visual, interaction, and structural decisions in Tac UI.
> Every token, component, and pattern must trace back to a rule defined here.

---

## 1. Brand Essence

### 1.1 Product Personality

Tac UI is a **precision instrument** — technical, calm, and quietly premium. It is the interface equivalent of a well-machined tool: every surface has purpose, every edge is deliberate, every interaction has physical weight.

**Personality axes:**
| Axis | Position | Rationale |
|------|----------|-----------|
| Warm ← → Cool | **Cool** (85%) | Technical precision, void-black canvas |
| Playful ← → Serious | **Serious** (70%) | Professional tool, not a toy |
| Dense ← → Spacious | **Spacious** (75%) | Elements breathe, never crowd |
| Flat ← → Layered | **Layered** (80%) | Depth through blur and shadow, not border |
| Static ← → Alive | **Alive** (65%) | Spring physics give organic weight, never hyperactive |

### 1.2 Emotional Tone

The interface should feel like:
- **Floating in a deep void** — elements exist as luminous objects suspended in dark space
- **Physically alive** — interactions have mass, momentum, and spring resolution
- **Electrically aware** — the single cyan accent responds to attention like a living signal
- **Quietly confident** — no decoration for its own sake, every pixel earns its place

### 1.3 What the UI Must Never Feel Like

| Anti-pattern | Why |
|--------------|-----|
| Bouncy / cartoonish | Springs resolve cleanly, they don't bounce |
| Cluttered | Void space is as important as content |
| Neon / cyberpunk | Cyan is a glow, not a neon sign — restraint is key |
| Generic SaaS | No gray-on-white sameness, no rounded-corner blandness |
| Over-decorated | No gradients for gradients' sake, no shadows without depth purpose |

---

## 2. Visual Grammar

### 2.1 Color Philosophy

**The Single Accent Rule:**
Tac UI uses exactly one accent hue — **Electric Cyan (#22D3EE)**. There are no secondary brand colors. This constraint forces every accent usage to carry maximum signal.

**When cyan is used:**
- Focus indicators (ring glow)
- Active state signals (selected tab, checked toggle)
- Interactive emphasis (CTA button background in dark mode, border glow on hover)
- Text gradients (hero headlines only)
- Cursor-tracked spotlight (landing page only)

**When cyan is NOT used:**
- Surface fills for non-interactive elements
- Badge backgrounds (use semantic status colors)
- Decorative borders at rest
- Body text color

**Mode strategy:**
| Token | Light Mode | Dark Mode | Reasoning |
|-------|-----------|-----------|-----------|
| `--primary` | Navy `#0B1929` | Cyan `#22D3EE` | Dark needs luminous CTA; light needs authoritative weight |
| `--point` | Deep cyan `#0891B2` | Electric cyan `#22D3EE` | Accessible in both modes |
| `--background` | Pure white `#FFFFFF` | Void black `#050508` | Maximum canvas contrast |
| `--foreground` | Near-black `#0A0F1A` | Near-white `#E2E8F0` | Comfortable reading contrast |

### 2.2 Surface Hierarchy

Surfaces are **nearly invisible**. They exist as depth, not as decoration.

**4-tier surface stack (dark mode):**
```
Layer 0: Void      #050508   — the canvas, pure dark
Layer 1: Base      #080C14   — subtle elevation, sidebar backgrounds
Layer 2: Surface   #0C1220   — cards, panels, elevated containers
Layer 3: Elevated  #111827   — hover states, active surfaces, modals
```

**Glass surfaces** are the primary container language:
```
Glass bg:     rgba(255, 255, 255, 0.02)
Glass border: rgba(255, 255, 255, 0.06)
Backdrop:     blur(24px) saturate(180%)
```

**Rule:** A surface's elevation is expressed through shadow and blur, NEVER through border thickness or color contrast alone.

### 2.3 Contrast Strategy

| Context | Minimum Ratio | Target |
|---------|--------------|--------|
| Body text on background | 4.5:1 | 7:1+ preferred |
| Muted text on background | 4.5:1 | Exactly AA minimum |
| Interactive labels | 4.5:1 | High readability |
| Decorative/ambient elements | No minimum | Intentionally low contrast |
| Focus indicators | 3:1 against adjacent | Cyan glow satisfies this |

### 2.4 Density Philosophy

**Default: Spacious.** Elements breathe with generous padding. The void between elements is as important as the elements themselves.

| Context | Density | Padding Scale |
|---------|---------|---------------|
| Landing / marketing | Ultra-spacious | 2x base |
| Documentation | Spacious | 1.5x base |
| Application UI | Standard | 1x base |
| Data tables / dense views | Compact | 0.75x base |

**Rule:** Density never shifts within a single viewport. A page is spacious OR compact, never mixed.

### 2.5 Shape Language

**Soft geometric** — rounded but not bubbly.

| Element | Radius | Reasoning |
|---------|--------|-----------|
| Buttons (sm) | 8px | Comfortable, not pill-like |
| Buttons (md) | 10px | Balanced softness |
| Buttons (lg) | 14px | Generous without losing structure |
| Cards | 16px | Clearly floating, distinct from content |
| Inputs | 10px | Matches button md for visual harmony |
| Modals/Dialogs | 20px | Maximum softness for overlay elements |
| Badges/Chips | pill (9999px) | Signal: metadata/tag, not container |
| Tooltips | 10px | Small but soft |

**Rule:** Container radius increases with element size. Larger elements get softer corners.

### 2.6 Elevation Philosophy

**Layered, not flat.** Elements float above the void canvas. Elevation is expressed through:

1. **Shadow** (primary) — subtle, directional, physically plausible
2. **Backdrop blur** (secondary) — glass depth, content visible behind
3. **Inset highlight** (tertiary) — `inset 0 1px 0 rgba(255,255,255,0.1)` for top-edge light catch
4. **Border** (minimal) — near-invisible, never the primary depth signal

**Shadow intensity scale:**
| Level | Dark Mode | Use Case |
|-------|-----------|----------|
| None | — | Ghost buttons, inline elements |
| sm | `0 1px 2px rgba(0,0,0,0.18)` | Chips, badges, tooltips |
| m | `0 1px 4px + 0 4px 12px` | Cards, dropdowns |
| lg | `0 2px 8px + 0 8px 24px` | Dialogs, modals |
| xl | `0 4px 12px + 0 12px 32px` | Full-screen overlays |
| glass | Multi-layer with 0.5px white ring | Glass panels |

**Rule:** Shadow should be felt, not seen. If a user can clearly identify "that element has a shadow," it's too strong.

---

## 3. Interaction Personality

### 3.1 Hover Philosophy: **Restrained Reveal**

Hover reveals hidden depth. Elements brighten, borders intensify, shadows deepen — but the change is subtle enough that it feels like the element was always alive, just dimmer at rest.

| Element Type | Hover Effect | Intensity |
|-------------|-------------|-----------|
| Buttons (solid) | scale(1.02), y(-1), brightness-110 | Medium |
| Buttons (ghost) | background appears (point-subtle) | Minimal |
| Cards (interactive) | border brightens, shadow deepens | Subtle |
| Links | color shift to foreground | Minimal |
| Table rows | background appears | Minimal |

**Rule:** Hover effects must be reversible in under 150ms. No persistent state change from hover.

### 3.2 Focus Philosophy: **Cyan Signal**

Focus uses cyan glow — never a solid ring, never a border change.

```css
/* Standard focus */
box-shadow: 0 0 0 2px rgba(34,211,238,0.15), 0 0 8px rgba(34,211,238,0.06);

/* High-visibility focus (accessibility override) */
ring: 2px solid var(--point);
ring-offset: 2px;
```

**Rule:** Every interactive element must have a visible focus indicator. No exceptions.

### 3.3 Motion Personality: **Organic Spring**

Motion uses spring physics, never mechanical easing. Elements have mass and momentum.

**Spring presets (Framer Motion):**
| Preset | Stiffness | Damping | Mass | Use Case |
|--------|-----------|---------|------|----------|
| `light` | 260 | 34 | 0.5 | Tilt, hover feedback, small elements |
| `default` | 260 | 34 | 1.0 | Layout shifts, morphing |
| `heavy` | 220 | 32 | 1.5 | Modals, drawers, large panels |
| `magnetic` | 340 | 38 | 0.8 | Dropdowns, snap-to positions |
| `entrance` | 180 | 28 | 1.2 | Page-level appearance |

**CSS easing (for non-spring animations):**
| Name | Curve | Use Case |
|------|-------|----------|
| `standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for all CSS transitions |
| `spring` | `cubic-bezier(0.22, 1.2, 0.36, 1)` | CSS approximation of spring overshoot |
| `easeIn` | `cubic-bezier(0.55, 0, 1, 0.45)` | Exit animations only |

**Rule:** Never use `linear` or `ease` for UI transitions. Never use `transition: all`. Always specify the property being transitioned.

### 3.4 Feedback Tone: **Quiet Confirmation**

| Event | Feedback | Example |
|-------|----------|---------|
| Button press | Scale down (0.97), spring release | Physical "click" feel |
| Form validation error | Red border + message, no shake | Calm error, not alarm |
| Success | Green indicator appears, fades in 2s | Brief confirmation |
| Loading | Skeleton or spinner, no text change | Visual continuity |
| Destructive action | Confirmation dialog required | Prevent accidental damage |

**Rule:** Error states are calm and informative, never alarming. Red is reserved for actual errors, never for warnings.

### 3.5 Error Communication: **Precise and Calm**

- Error messages appear immediately below the offending field
- Error border is `var(--error)` with subtle glow
- Message text uses `--error` color at caption size
- No icons in inline error messages (the color is sufficient)
- Toast/snackbar errors use the error variant with icon

---

## 4. Brand Constraints

These are hard rules that remove ambiguity from UI decisions.

### 4.1 Accent Color Constraints

| Context | Cyan Allowed? | Reasoning |
|---------|--------------|-----------|
| Primary button bg (dark mode) | **Yes** | CTA exception — the one place cyan fills |
| Primary button bg (light mode) | **No** | Light mode uses navy for authority |
| Focus ring / glow | **Yes** | Universal focus signal |
| Active indicator (tabs, sidebar) | **Yes** | Active state signal |
| Text gradient (hero only) | **Yes** | Brand expression in marketing context |
| Card border at rest | **No** | White/transparent at rest, cyan only on focus |
| Badge background | **No** | Use semantic status colors |
| Body text | **No** | Cyan is accent, not content |
| Link text | **No** | Links use foreground color + underline or weight |

### 4.2 Elevation Constraints

| Context | Shadow Allowed? | Reasoning |
|---------|----------------|-----------|
| Cards | **Yes** (sm–m) | Floating above canvas |
| Buttons | **No** (inset only) | Buttons express depth through inset highlight |
| Overlays (modal, dialog, drawer) | **Yes** (lg–xl) | Must visually separate from content |
| Dropdowns | **Yes** (m) | Floating panel needs depth |
| Inputs | **No** | Inputs are recessed, not elevated |
| Inline elements (badges, chips) | **No** | Small elements don't need depth signal |
| Toast/Snackbar | **Yes** (m) | Floating notification |

### 4.3 Border Constraints

| Context | Visible Border? | Reasoning |
|---------|----------------|-----------|
| Glass panels | Near-invisible (0.06) | Border felt, not seen |
| Inputs at rest | Subtle (0.06) | Recessed container boundary |
| Inputs on focus | Cyan glow replaces border | Focus is the border |
| Outline buttons | Visible (0.15) | Intentional border — that IS the variant |
| Cards | Near-invisible | Depth from shadow, not border |
| Dividers | 1px at border color | Structural, not decorative |
| Table rows | None (use bg alternation) | Cleaner separation |

### 4.4 Motion Constraints

| Context | Motion Allowed? | Reasoning |
|---------|----------------|-----------|
| Page transitions | **Yes** (entrance only) | Staggered blur-fade-in |
| Hover effects | **Yes** (scale, brightness) | Restrained reveal |
| Press feedback | **Yes** (scale spring) | Physical confirmation |
| Layout shifts | **Yes** (spring) | Smooth repositioning |
| Idle decoration | **Limited** | Float animation for hero logos only |
| Loading states | **Yes** (shimmer, pulse) | Visual activity indicator |
| `prefers-reduced-motion` | **All suppressed** | Accessibility override |

### 4.5 Typography Constraints

| Context | Rule |
|---------|------|
| Font family | Pretendard only — no secondary display font |
| Heading weight | 600–700, never 400 |
| Body weight | 400, never bold |
| Letter-spacing | Negative for headings, zero/positive for body |
| Line height | 1.12–1.25 for headings, 1.5–1.65 for body |
| Maximum line length | 75ch for body text, no constraint for headings |

---

## 5. Token Architecture

### 5.1 Three-Layer Hierarchy

```
┌─────────────────────────────────────────┐
│  Brand Tokens (BI intent)               │
│  "What does the brand want?"            │
│  → accent hue, personality, philosophy  │
├─────────────────────────────────────────┤
│  System Tokens (UI implementation)      │
│  "How is the brand expressed?"          │
│  → semantic colors, spacing, radius,    │
│    shadow, motion, typography           │
├─────────────────────────────────────────┤
│  Component Tokens (usage)               │
│  "How does each component use the       │
│   system tokens?"                       │
│  → button heights, card padding,        │
│    input radius, etc.                   │
└─────────────────────────────────────────┘
```

### 5.2 Brand Tokens

These are the DNA. They never reference implementation details.

```typescript
brand = {
  // Identity
  accent: '#22D3EE',           // The ONLY accent hue
  accentLight: '#67E8F9',      // Hover/pulse variant
  accentDeep: '#0891B2',       // Light mode accessible variant

  // Canvas
  void: '#050508',             // The deepest dark
  purity: '#FFFFFF',           // The purest light

  // Personality
  density: 'spacious',         // Default spacing philosophy
  shape: 'soft-geometric',     // Radius philosophy
  depth: 'layered',            // Elevation philosophy
  motion: 'spring-organic',    // Animation philosophy
}
```

### 5.3 System Tokens

Derived from brand tokens. Mode-aware. These are what CSS variables represent.

**Categories:**
| Category | Token Prefix | Count | Source |
|----------|-------------|-------|--------|
| Semantic Colors | `--` | ~50 | `semantic.ts` |
| Spacing | `--spacing-*` | 8 | `spacing.ts` |
| Radius | `--radius-*` | 8 | `spacing.ts` |
| Elevation | `--shadow-*` | 6 | `elevation.ts` |
| Motion (duration) | `--duration-*` | 5 | `motion.ts` |
| Motion (easing) | `--ease-*` | 7 | `motion.ts` |
| Z-index | `--z-*` | 7 | `elevation.ts` |
| Typography | `--font-*` | 3 | `typography.ts` |
| Gradients | `--gradient-*` | 9 | `semantic.ts` |
| Chart | `--chart-*` | 12 | `chart.ts` |

### 5.4 Component Tokens

Derived from system tokens. Component-specific dimensions and overrides.

**Categories:**
| Component | Token Prefix | Source |
|-----------|-------------|--------|
| Button | `--btn-*` | `component.ts` |
| Input | `--input-*` | `component.ts` |
| Card | `--card-*` | `component.ts` |
| Badge | `--badge-*` | `component.ts` |
| Checkbox | `--checkbox-*` | `component.ts` |
| Radio | `--radio-*` | `component.ts` |
| Switch | `--switch-*` | `component.ts` |
| Chip | `--chip-*` | `component.ts` |
| Tabs | `--tab-*` | `component.ts` |
| Slider | `--slider-*` | `component.ts` |
| Tooltip | `--tooltip-*` | `component.ts` |
| Avatar | `--avatar-*` | `component.ts` |
| Divider | `--divider-*` | `component.ts` |
| Progress | `--progress-*` | `component.ts` |
| Snackbar | `--snackbar-*` | `component.ts` |
| Dialog | `--dialog-*` | `component.ts` |

### 5.5 Inheritance Flow

```
Brand: accent = #22D3EE
  ↓
System: --point = #22D3EE (dark), --point = #0891B2 (light)
  ↓
Component: Button[point].border = rgba(34,211,238,0.15)
           Button[point].hover.border = rgba(34,211,238,0.30)
           Checkbox[checked].glow = rgba(34,211,238,0.12)
           Tab[active].indicator = var(--point)
```

Every hardcoded `rgba(34,211,238,*)` in components is a derivation of `brand.accent`. If the accent changes, these values propagate from the brand layer.

---

## 6. Component System

### 6.1 Component Categories & Brand Roles

#### Navigation (Visual Weight: Low)
Components: `Sidebar, SidebarGroup, Breadcrumb, Tabs, Pagination, FloatingMenuBar`

**Brand role:** Wayfinding — always present, never dominant. Navigation is the scaffolding that holds content.

**On-brand signals:**
- Muted text at rest, foreground on hover
- Active states use cyan accent (point-subtle bg, point text)
- No shadows — navigation is part of the structure, not floating above it
- Compact density allowed in nav contexts

#### Inputs (Visual Weight: Medium)
Components: `Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Slider`

**Brand role:** Data entry — precise, clear, and trustworthy. Inputs must feel stable.

**On-brand signals:**
- Recessed appearance (no shadow, subtle border)
- Focus state is the primary interaction signal (cyan glow)
- Border-sweep glow animation on focus-within
- Error states are precise (red border + message, no noise)
- Labels always present for accessibility

#### Panels (Visual Weight: Medium-High)
Components: `Card, MorphingCard, Accordion, Table, CodeBlock`

**Brand role:** Content containers — the glass membranes that organize information.

**On-brand signals:**
- Glass aesthetic (backdrop-blur, near-invisible border)
- Inset top highlight for depth
- Shadow expresses floating depth
- Interactive cards: tilt + glow on hover
- Non-interactive cards: static, no hover effect

#### Overlays (Visual Weight: High)
Components: `Modal, Dialog, Drawer, Popover, Dropdown, Tooltip`

**Brand role:** Focused attention — temporary interruptions that command focus.

**On-brand signals:**
- Backdrop dim (black/40% + blur)
- Panel entrance: blur-scale-in spring animation
- Maximum shadow depth (lg–xl)
- Focus trap active
- Escape key dismissal

#### Feedback (Visual Weight: Varies)
Components: `Toast, Snackbar, Alert, Progress, Skeleton, Indicator, EmptyState`

**Brand role:** System communication — brief, helpful, non-intrusive.

**On-brand signals:**
- Toasts/snackbars enter with blur-fade-in, exit with blur-fade-out
- Alert variants use semantic colors (success, warning, error, info)
- Progress uses point color for fill
- Skeletons use shimmer animation
- Auto-dismiss after appropriate duration

#### Actions (Visual Weight: High)
Components: `Button, Chip, Badge, AnimatedToggle`

**Brand role:** Decision points — where the user commits. Must feel intentional.

**On-brand signals:**
- Spring physics on press/release
- Primary variant: inset highlight + shine on hover
- Ghost variant: minimal, no border, no shadow
- Disabled state: 50% opacity, no pointer events
- Icon sizing consistent across all action elements

#### Layout (Visual Weight: None — structural)
Components: `VStack, HStack, Container, PageLayout, *Page`

**Brand role:** Invisible structure — these define spatial relationships but have no visual expression.

**On-brand signals:**
- No borders, shadows, or backgrounds
- Consistent spacing from the spacing scale
- Responsive breakpoints follow the defined grid

### 6.2 Variant Unification

**Button variants (8):** Each has a distinct visual purpose.
| Variant | When to Use |
|---------|-------------|
| `primary` | Primary CTA — one per viewport section |
| `secondary` | Secondary action alongside primary |
| `outline` | Tertiary action or standalone where primary is too heavy |
| `ghost` | Inline actions, toolbar buttons, minimal UI |
| `point` | Accent action — draws attention with cyan glow |
| `gradient` | Premium CTA — marketing pages, hero sections |
| `glass` | Contextual action on glass surfaces |
| `destructive` | Delete, remove, cancel-with-consequence |

**Card variants:** Collapse to clear purposes.
| Variant | When to Use |
|---------|-------------|
| `default` | Standard content container |
| `glass` | On dark backgrounds, glassmorphism aesthetic |
| `outline` | When glass is too heavy, need lighter container |
| `ghost` | Invisible container, structural grouping only |

**Alert/Toast/Snackbar:** Use semantic status variants only.
| Variant | Color | When |
|---------|-------|------|
| `default` | Foreground | Neutral information |
| `success` | Green | Positive confirmation |
| `warning` | Amber | Caution, not error |
| `error` | Red | Something failed |
| `info` | Cyan | Helpful context |

---

## 7. Consistency Rulebook

### Rule 1: Accent Hierarchy
```
Level 1: CTA buttons, focus rings        → full accent color
Level 2: Active indicators, checked states → accent at 10-15% opacity bg
Level 3: Hover hints                       → accent at 5-8% opacity bg
Level 4: Ambient glow (decorative)         → accent at 3-5% opacity
```
Never skip levels. A hover state (L3) must never be more prominent than a focus state (L1).

### Rule 2: Shadow Budget
Each viewport section gets a **shadow budget** of 3:
- 1 heavy shadow (modal/dialog)
- 1 medium shadow (card/dropdown)
- 1 light shadow (tooltip/badge)

If a section exceeds 3 shadowed elements, reconsider the layout. Too many floating elements destroy the depth hierarchy.

### Rule 3: Surface Stacking
Every surface must be exactly ONE step above its parent:
```
Background (#050508) → Card (#0C1220) → Popover (#111827)
```
Never skip a surface level. A popover on the background must still go through the card level.

### Rule 4: Motion Consistency
| Element Size | Spring Preset | Scale Factor |
|-------------|--------------|--------------|
| Small (badge, chip, toggle) | `light` | 0.99 press |
| Medium (button, input, tab) | `default` | 0.97 press |
| Large (card, modal, drawer) | `heavy` | 0.96 press (if interactive) |
| Entrance (any) | `entrance` | blur-fade-in |

### Rule 5: Typography Sizing
| Context | Size | Weight | Color |
|---------|------|--------|-------|
| Page title | h1 (32px) | 700 | foreground |
| Section title | h2 (28px) | 600 | foreground |
| Card title | h4 (20px) | 500 | foreground |
| Body | md (15px) | 400 | foreground |
| Helper/caption | caption (11px) | 400 | muted-foreground |
| Label | sm (13px) | 500 | foreground |

### Rule 6: Spacing Rhythm
All spacing uses the 8px base grid:
```
2xs: 2px  — icon gap only
xs:  4px  — inline spacing
sm:  8px  — tight component internal padding
m:   16px — standard component padding
lg:  24px — section spacing
xl:  40px — major section breaks
2xl: 56px — page-level spacing
3xl: 80px — hero-level spacing
```

### Rule 7: Border Opacity Scale
| State | Dark Mode Opacity | Light Mode |
|-------|-------------------|------------|
| Rest | 0.06 (nearly invisible) | `rgba(0,0,0,0.08)` |
| Hover | 0.10–0.12 (subtle) | `rgba(0,0,0,0.12)` |
| Active/Focus | Replaced by cyan glow | Replaced by cyan glow |
| Outline variant | 0.15 (visible) | `rgba(0,0,0,0.15)` |
| Emphasis | 0.20–0.25 | `rgba(0,0,0,0.20)` |

### Rule 8: Component Interaction States
Every interactive component must implement ALL of these states:
```
rest     → default appearance
hover    → brightness/bg shift (150ms standard easing)
focus    → cyan glow ring (0ms, instant)
active   → scale spring (97%)
disabled → 50% opacity, no pointer events, no hover
```

---

## 8. Migration Strategy

### Phase 1: Audit (Current State)

**Tokens:**
- [x] primitive.ts — Raw palette includes unused colors (indigo, violet, purple, pink exist in primitive but not in semantic)
- [x] semantic.ts — Well-structured but has deprecated `gradientPrimary` (duplicate of `gradientBrand`)
- [x] component.ts — Clean, properly structured
- [x] elevation.ts — Correct after shadow reduction pass
- [x] motion.ts — Has redundant `spring` AND `diaSpring` presets
- [x] typography.ts — Clean, Pretendard-only
- [x] chart.ts — Navy-first palette, correct

**Components (39 total):**
- Hardcoded rgba values throughout — should reference tokens where possible
- focusRing in styles.ts hardcodes `rgba(34,211,238,*)` instead of using `var(--ring)`
- Some components use `var(--glass-bg)` while others hardcode glass values
- Button variant redesign complete
- Shadow reduction complete

### Phase 2: Token Cleanup

| Action | File | Priority |
|--------|------|----------|
| Remove deprecated `gradientPrimary` | semantic.ts | Medium |
| Consolidate `spring` and `diaSpring` into single `spring` namespace | motion.ts | Low |
| Audit unused primitive colors | primitive.ts | Low |
| Document all CSS variable mappings | css-variables.ts | Low |

### Phase 3: Component Alignment

| Priority | Components | Action |
|----------|-----------|--------|
| High | Button (done) | Redesigned with BI alignment |
| High | Card | Ensure glass variant uses tokens consistently |
| High | Input, Textarea | Verify focus glow uses token reference |
| Medium | Modal, Dialog, Drawer | Consistent overlay pattern |
| Medium | Select, Combobox | Consistent dropdown animation |
| Medium | Tabs | Verify active indicator uses point token |
| Low | Badge, Chip | Verify accent usage follows Rule 1 |
| Low | Progress, Slider | Verify point color for active fill |
| Low | Table, Accordion | Verify spacing rhythm |

### Phase 4: Deprecation

| Token/Pattern | Status | Replacement |
|---------------|--------|-------------|
| `gradientPrimary` | Deprecated | `gradientBrand` |
| `motion.spring.*` | Candidate | Merge into `diaSpring` |
| Hardcoded `rgba(34,211,238,*)` in components | Ongoing | Use `var(--point)` with opacity modifiers |
| `brightness-*` hover effects | Keep | Aligned with BI hover philosophy |

### Phase 5: Validation

After each phase, run:
1. `pnpm build` — verify compilation
2. `pnpm typecheck` — verify type safety
3. Visual audit on docs site — verify no regressions
4. A11y audit — verify focus indicators and contrast ratios

---

## Appendix A: Token Quick Reference

### Semantic Color Tokens (CSS Variables)

| Token | Purpose | Dark | Light |
|-------|---------|------|-------|
| `--background` | Page canvas | `#050508` | `#FFFFFF` |
| `--foreground` | Primary text | `#E2E8F0` | `#0A0F1A` |
| `--primary` | CTA fill | `#22D3EE` | `#0B1929` |
| `--secondary` | Subtle fill | `#0D1828` | `#F0F9FF` |
| `--muted-foreground` | Secondary text | `#64748B` | `#475569` |
| `--point` | Accent signal | `#22D3EE` | `#0891B2` |
| `--point-subtle` | Accent bg wash | `rgba(34,211,238,0.10)` | `rgba(8,145,178,0.08)` |
| `--border` | Default border | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` |
| `--glass-bg` | Glass fill | `rgba(255,255,255,0.02)` | `rgba(255,255,255,0.85)` |
| `--error` | Error signal | `#F87171` | `#EF4444` |
| `--success` | Success signal | `#34D399` | `#10B981` |
| `--warning` | Warning signal | `#FBBF24` | `#F59E0B` |
| `--info` | Info signal | `#22D3EE` | `#0891B2` |

### Spring Presets

| Name | Stiffness | Damping | Mass | Use |
|------|-----------|---------|------|-----|
| `diaSpring.light` | 260 | 34 | 0.5 | Hover, tilt, small feedback |
| `diaSpring.default` | 260 | 34 | 1.0 | Layout shifts, morphing |
| `diaSpring.heavy` | 220 | 32 | 1.5 | Modals, drawers |
| `diaSpring.magnetic` | 340 | 38 | 0.8 | Dropdowns, snap positions |
| `diaSpring.entrance` | 180 | 28 | 1.2 | Page-level appearance |

---

## Appendix B: Decision Flowcharts

### "Should I use cyan here?"
```
Is this element interactive? ─── No ──→ No cyan.
        │
       Yes
        │
Is it a focus indicator? ──── Yes ──→ Cyan glow ring.
        │
       No
        │
Is it an active state? ───── Yes ──→ Cyan at 10-15% opacity bg.
        │
       No
        │
Is it a primary CTA? ────── Yes ──→ Cyan fill (dark mode only).
        │
       No
        │
Is it hover feedback? ───── Yes ──→ Cyan at 5-8% opacity bg.
        │
       No ──→ No cyan.
```

### "What shadow level should I use?"
```
Is this element inline? ─── Yes ──→ No shadow.
        │
       No
        │
Is it an overlay? ────────── Yes ──→ lg–xl shadow.
        │
       No
        │
Is it floating? ──────────── Yes ──→ sm–m shadow.
        │
       No ──→ No shadow.
```

### "What spring should I use?"
```
Is this a small element? ── Yes ──→ diaSpring.light
        │
       No
        │
Is this an overlay? ──────── Yes ──→ diaSpring.heavy
        │
       No
        │
Is this a dropdown? ──────── Yes ──→ diaSpring.magnetic
        │
       No
        │
Is this a page entrance? ── Yes ──→ diaSpring.entrance
        │
       No ──→ diaSpring.default
```
