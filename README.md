<p align="center">
  <img src="https://raw.githubusercontent.com/tac-ui/tac-ui/main/apps/docs/public/tac-logo.svg" width="64" height="64" alt="Tac UI Logo" />
</p>

<h1 align="center">Tac UI</h1>

<p align="center">
  A cross-platform design system where code breathes.<br/>
  40+ web components, 27 native components — crafted for interfaces that feel alive.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tac-ui/web"><img src="https://img.shields.io/npm/v/@tac-ui/web?label=%40tac-ui%2Fweb&color=5856D6" alt="npm @tac-ui/web" /></a>
  <a href="https://www.npmjs.com/package/@tac-ui/native"><img src="https://img.shields.io/npm/v/@tac-ui/native?label=%40tac-ui%2Fnative&color=5E5CE6" alt="npm @tac-ui/native" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License" /></a>
</p>

<p align="center">
  <a href="https://tac-ui.com">Documentation</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#packages">Packages</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#development">Development</a>
</p>

<p align="center">
  <a href="./README.ko.md">한국어</a>
</p>

---

## Features

- **Cross-Platform** — Web (React) and Native (React Native) from a single design system
- **40+ Web Components** — Button, Card, Modal, Chart, DatePicker, Table, and more
- **27 Native Components** — Full-featured React Native component library
- **Design Tokens** — Shared color, spacing, typography, motion, and elevation tokens
- **Dark Mode** — Seamless light/dark theme switching (CSS variables on web, context on native)
- **Royal Indigo Accent** — Refined brand palette (`#5856D6` light / `#5E5CE6` dark)
- **Accessibility** — WAI-ARIA compliant components with focus management
- **Tailwind CSS** — First-class Tailwind CSS v4 integration with preset
- **Animations** — Framer Motion (web), React Native Animated (native)
- **TypeScript** — Strict-mode typed with full IntelliSense support
- **Dual Export** — ESM and CJS builds via tsup

## Packages

| Package | Description | Version |
|---------|------------|---------|
| [`@tac-ui/web`](./packages/web) | React web component library (40+ components) | `1.0.0` |
| [`@tac-ui/native`](./packages/native) | React Native component library (27 components) | `1.0.0` |
| [`@tac-ui/tokens`](./packages/tokens) | Design tokens (color, spacing, typography, motion) | `1.0.0` |
| [`@tac-ui/icon`](./packages/icon) | Web icon package (lucide-react + TacLogo) | `1.0.0` |
| [`@tac-ui/icon-native`](./packages/icon-native) | Native icon package (lucide-react-native + TacLogo) | `1.0.0` |
| [`@tac-ui/shared`](./packages/shared) | Shared types and interfaces | `1.0.0` |

## Installation

### Web

```bash
pnpm add @tac-ui/web @tac-ui/tokens @tac-ui/icon
```

### React Native

```bash
pnpm add @tac-ui/native @tac-ui/tokens @tac-ui/icon-native
```

## Quick Start

### Web

```tsx
import { TacProvider, Button } from '@tac-ui/web';

export default function App() {
  return (
    <TacProvider defaultTheme="system">
      <Button variant="point">Hello Tac UI</Button>
    </TacProvider>
  );
}
```

#### Tailwind CSS Setup

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

### React Native

```tsx
import { TacNativeProvider, Button } from '@tac-ui/native';

export default function App() {
  return (
    <TacNativeProvider defaultPreference="system">
      <Button variant="point">Hello Tac UI</Button>
    </TacNativeProvider>
  );
}
```

## Web Components

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Chart (Bar, Line, Pie, Donut) · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Drawer · Dropdown · EmptyState · FloatingMenuBar · Indicator · Input · Layout · Modal · MorphingCard · PageLayouts · Pagination · Popover · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast · Tooltip

## Native Components

Accordion · Alert · AnimatedToggle · Avatar · Badge · Breadcrumb · Button · Card · Checkbox · Chip · CodeBlock · ColorPicker · Combobox · DatePicker · Dialog · Divider · Dropdown · EmptyState · FloatingMenuBar · Indicator · Input · Progress · Radio · SegmentController · Select · Skeleton · Slider · Snackbar · Stack · Stepper · Switch · Table · Tabs · Textarea · Toast

## Development

This is a monorepo managed with [pnpm](https://pnpm.io) and [Turborepo](https://turbo.build).

```bash
# Install dependencies
pnpm install

# Start all packages in dev/watch mode
pnpm dev

# Build all packages
pnpm build

# Start docs site (port 3001)
pnpm --filter docs dev

# Lint & type check
pnpm lint
pnpm typecheck
```

### Project Structure

```
tac-ui/
├── packages/
│   ├── shared/          # @tac-ui/shared — Shared types
│   ├── tokens/          # @tac-ui/tokens — Design tokens (web + native)
│   ├── icon/            # @tac-ui/icon — Web icons
│   ├── icon-native/     # @tac-ui/icon-native — Native icons
│   ├── web/             # @tac-ui/web — React web components
│   └── native/          # @tac-ui/native — React Native components
├── apps/
│   ├── docs/            # Documentation site (Next.js)
│   └── native-docs-app/ # Native component demo (Expo)
├── turbo.json
└── pnpm-workspace.yaml
```

## Tech Stack

| Category | Web | Native |
|----------|-----|--------|
| UI Framework | React 18/19 | React Native |
| Styling | Tailwind CSS 4, CVA, clsx, tailwind-merge | StyleSheet, theme context |
| Animation | Framer Motion | Animated API, Reanimated |
| Icons | lucide-react | lucide-react-native |
| Build | tsup (dual CJS/ESM) | tsup (dual CJS/ESM) |

**Shared**: TypeScript (strict), pnpm, Turborepo, Next.js 16 (docs)

## License

[MIT License](./LICENSE) - Copyright (c) 2026 Jeonhui Lee

---

<p align="center">
  Built with care by the Tac UI team.
</p>
