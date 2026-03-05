<p align="center">
  <img src="https://raw.githubusercontent.com/tac-ui/tac-ui/main/apps/docs/public/tac-logo.svg" width="64" height="64" alt="Tac UI Logo" />
</p>

<h1 align="center">Tac UI</h1>

<p align="center">
  A cross-platform design system where code breathes.<br/>
  Spring physics, sequential illumination, glassmorphism depth — crafted for interfaces that feel alive.
</p>

<p align="center">
  <a href="#installation">Installation</a> ·
  <a href="#packages">Packages</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#development">Development</a> ·
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="./README.ko.md">한국어</a>
</p>

---

## Features

- **43 Components** — Button, Card, Modal, Chart, DatePicker, Table, and more
- **Design Tokens** — Color, spacing, typography, motion, and elevation tokens
- **Dark Mode** — Seamless light/dark theme switching with CSS variables
- **Accessibility** — WAI-ARIA compliant components with focus management
- **Tailwind CSS** — First-class Tailwind CSS v4 integration with preset
- **Framer Motion** — Spring-based animations with organic deceleration
- **TypeScript** — Strict-mode typed with full IntelliSense support
- **Dual Export** — ESM and CJS builds via tsup

## Packages

| Package | Description | Version |
|---------|------------|---------|
| [`@tac-ui/web`](./packages/web) | React component library (43 components) | `0.1.0` |
| [`@tac-ui/tokens`](./packages/tokens) | Design tokens (color, spacing, typography, motion) | `0.1.0` |
| [`@tac-ui/icon`](./packages/icon) | Icon package (lucide-react + TacLogo) | `0.1.0` |
| [`@tac-ui/shared`](./packages/shared) | Shared types and interfaces | `0.1.0` |

## Installation

```bash
pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon
```

## Quick Start

```tsx
import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider>
      <Button>Hello Tac UI</Button>
    </TacProvider>
  );
}
```

### Tailwind CSS Setup

```ts
// tailwind.config.ts
import { tacPreset } from '@tac-ui/web/tailwind';

export default {
  presets: [tacPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tac-ui/web/dist/**/*.{js,mjs}',
  ],
};
```

## Components

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Chart · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Drawer · Dropdown · EmptyState · Indicator · Input · Layout · Modal · MorphingCard · PageLayouts · Pagination · Popover · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast · Tooltip

## Development

This is a monorepo managed with [pnpm](https://pnpm.io) and [Turborepo](https://turbo.build).

```bash
# Install dependencies
pnpm install

# Start all packages in dev/watch mode
pnpm dev

# Build all packages
pnpm build

# Lint
pnpm lint

# Type check
pnpm typecheck
```

### Project Structure

```
tac-ui/
├── packages/
│   ├── shared/      # @tac-ui/shared — Shared types
│   ├── tokens/      # @tac-ui/tokens — Design tokens
│   ├── icon/        # @tac-ui/icon — Icons
│   └── web/         # @tac-ui/web — React components
├── apps/
│   ├── docs/        # Documentation site (Next.js)
│   └── playground/  # Component playground
├── turbo.json
└── pnpm-workspace.yaml
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript (strict mode) |
| Package Manager | pnpm |
| Monorepo | Turborepo |
| Build | tsup |
| UI Framework | React 18/19 |
| Styling | Tailwind CSS 4, CVA, clsx, tailwind-merge |
| Animation | Framer Motion |
| Icons | lucide-react |
| App Framework | Next.js 16 |

## License

[MIT License](./LICENSE) - Copyright (c) 2026 Jeonhui Lee

Free to use, modify, and distribute for personal and commercial projects.

---

<p align="center">
  Built with care by the Tac UI team.
</p>
