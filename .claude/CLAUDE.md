<!-- CCB:GENERATED:BEGIN -->
# Tac UI

Cross-platform design system for Tac UI.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript (strict mode) |
| Package Manager | pnpm 9.15 |
| Monorepo | Turborepo |
| Build Tool | tsup |
| UI Framework | React 18/19 |
| Styling (Web) | Tailwind CSS 4, class-variance-authority, clsx, tailwind-merge |
| Styling (Native) | StyleSheet, theme context |
| Animation (Web) | Framer Motion |
| Animation (Native) | React Native Animated, react-native-reanimated (optional) |
| Icons (Web) | lucide-react |
| Icons (Native) | lucide-react-native |
| App Framework | Next.js 16 |
| Target | ES2020, ESNext modules (bundler resolution) |

## Project Structure

```
tac-ui/                     # Monorepo root
├── packages/
│   ├── shared/                 # @tac-ui/shared — Shared types & interfaces
│   │   └── src/
│   │       ├── theme-contract.ts
│   │       └── types.ts
│   ├── tokens/                 # @tac-ui/tokens — Design tokens (color, spacing, typography, motion)
│   │   └── src/
│   │       ├── primitive.ts    # Raw color palette
│   │       ├── semantic.ts     # Semantic color mappings
│   │       ├── component.ts    # Component-level token specs
│   │       ├── spacing.ts      # Spacing scale
│   │       ├── typography.ts   # Font sizes, weights, line heights
│   │       ├── motion.ts       # Animation durations & easings
│   │       ├── elevation.ts    # Shadow tokens
│   │       ├── chart.ts        # Chart color palette
│   │       ├── web/            # CSS variable generation for web
│   │       └── native/         # Native theme builder (JS objects)
│   ├── icon/                   # @tac-ui/icon — Web icon package (lucide-react + TacLogo)
│   │   └── src/
│   │       ├── index.ts
│   │       └── TacLogo.tsx
│   ├── icon-native/            # @tac-ui/icon-native — Native icon package (lucide-react-native + TacLogo)
│   │   └── src/
│   │       ├── index.ts
│   │       └── TacLogo.tsx
│   ├── web/                    # @tac-ui/web — React web component library
│   │   └── src/
│   │       ├── components/     # 39+ components (Button, Input, Modal, Chart, etc.)
│   │       ├── hooks/          # Accessibility hooks (useFocusTrap, useRovingIndex)
│   │       ├── provider/       # ThemeProvider (TacProvider)
│   │       ├── tailwind/       # Tailwind preset
│   │       └── utils/          # cn() utility (clsx + tailwind-merge)
│   └── native/                 # @tac-ui/native — React Native component library
│       └── src/
│           ├── components/     # 20 components (Button, Input, Card, Tabs, etc.)
│           ├── provider/       # TacNativeProvider (theme context)
│           ├── constants/      # Motion spring configs
│           └── utils/          # createStyles utility
├── apps/
│   └── docs/                   # Documentation site (Next.js)
├── turbo.json                  # Turborepo task config
├── tsconfig.base.json          # Shared TypeScript config
└── pnpm-workspace.yaml         # Workspace definition
```

## Monorepo

Workspaces managed by pnpm with Turborepo orchestration.

| Package | Name | Description |
|---------|------|-------------|
| `packages/shared` | `@tac-ui/shared` | Shared types and interfaces |
| `packages/tokens` | `@tac-ui/tokens` | Design tokens (exports web + native) |
| `packages/icon` | `@tac-ui/icon` | Web icon package (lucide-react + TacLogo) |
| `packages/icon-native` | `@tac-ui/icon-native` | Native icon package (lucide-react-native + TacLogo) |
| `packages/web` | `@tac-ui/web` | React web component library (39 components) |
| `packages/native` | `@tac-ui/native` | React Native component library (20 components) |
| `apps/docs` | `docs` | Documentation site (Next.js, port 3001) |

Dependency graph:
- Web: `shared` ← `tokens` ← `web` ← `docs`, `icon` ← `web`
- Native: `shared` ← `tokens` ← `native`, `icon-native`

## Common Commands

```bash
# Development
pnpm dev                    # Start all packages in watch/dev mode
pnpm --filter docs dev      # Start docs site only (port 3001)

# Build
pnpm build                  # Build all packages (respects dependency order)
pnpm --filter @tac-ui/web build     # Build web package only
pnpm --filter @tac-ui/native build  # Build native package only

# Quality
pnpm lint                   # Lint all packages
pnpm typecheck              # Type-check all packages
pnpm test                   # Run all tests

# Cleanup
pnpm clean                  # Clean all dist/ and node_modules
```

## Coding Conventions

### Web (`@tac-ui/web`)
- **Components**: React forwardRef with TypeScript, export from `packages/web/src/index.ts`
- **Styling**: Tailwind CSS classes via `cn()` utility (clsx + tailwind-merge), CVA for variants
- **Tokens**: Consume via CSS custom properties (`var(--token-name)`)
- **Animation**: Framer Motion

### Native (`@tac-ui/native`)
- **Components**: React forwardRef with TypeScript, export from `packages/native/src/index.ts`
- **Styling**: `StyleSheet.create()` + theme values from `useTacNativeTheme()`
- **Tokens**: Consume via `theme.colors.*`, `theme.spacing.*` from context
- **Animation**: React Native Animated API, spring configs from `constants/motion.ts`

### Shared
- **Props**: Icon props accept `React.ReactNode`, use JSDoc comments on all exported interfaces
- **Naming**: PascalCase for components, camelCase for props/functions, kebab-case for CSS variables
- **Exports**: Dual CJS/ESM via tsup, explicit `exports` field in package.json
- **File structure**: One component per file
- **Peer deps**: React 18/19
<!-- CCB:GENERATED:END -->
