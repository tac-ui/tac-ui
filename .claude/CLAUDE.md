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
| Styling | Tailwind CSS 4, class-variance-authority, clsx, tailwind-merge |
| Animation | Framer Motion |
| Icons | lucide-react |
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
│   │       └── web/            # CSS variable generation for web
│   ├── icon/                   # @tac-ui/icon — Icon package (lucide-react + TacLogo)
│   │   └── src/
│   │       ├── index.ts
│   │       └── TacLogo.tsx
│   └── web/                    # @tac-ui/web — React component library
│       └── src/
│           ├── components/     # 39+ components (Button, Input, Modal, Chart, etc.)
│           ├── hooks/          # Accessibility hooks (useFocusTrap, useRovingIndex)
│           ├── provider/       # ThemeProvider (TacProvider)
│           ├── tailwind/       # Tailwind preset
│           └── utils/          # cn() utility (clsx + tailwind-merge)
├── apps/
│   ├── docs/                   # Documentation site (Next.js)
│   └── playground/             # Component playground (Next.js)
├── workflows/                  # Multi-agent improvement workflow config
├── turbo.json                  # Turborepo task config
├── tsconfig.base.json          # Shared TypeScript config
└── pnpm-workspace.yaml         # Workspace definition
```

## Monorepo

Workspaces managed by pnpm with Turborepo orchestration.

| Package | Name | Description |
|---------|------|-------------|
| `packages/shared` | `@tac-ui/shared` | Shared types and interfaces |
| `packages/tokens` | `@tac-ui/tokens` | Design tokens (exports web) |
| `packages/icon` | `@tac-ui/icon` | Icon package (lucide-react + TacLogo) |
| `packages/web` | `@tac-ui/web` | React component library (39 components) |
| `apps/docs` | `docs` | Documentation site (Next.js, port 3001) |
| `apps/playground` | `playground` | Component playground (Next.js) |

Dependency graph: `shared` ← `tokens` ← `web` ← `docs` / `playground`, `icon` ← `web`

## Common Commands

```bash
# Development
pnpm dev                    # Start all packages in watch/dev mode
pnpm --filter docs dev      # Start docs site only (port 3001)
pnpm --filter playground dev # Start playground only (port 3000)

# Build
pnpm build                  # Build all packages (respects dependency order)
pnpm --filter @tac-ui/web build  # Build web package only

# Quality
pnpm lint                   # Lint all packages
pnpm typecheck              # Type-check all packages
pnpm test                   # Run all tests

# Cleanup
pnpm clean                  # Clean all dist/ and node_modules
```

## Coding Conventions

- **Components**: React forwardRef with TypeScript, export from `packages/web/src/index.ts`
- **Styling**: Tailwind CSS classes via `cn()` utility (clsx + tailwind-merge), CVA for variants
- **Tokens**: Define in `packages/tokens/src/`, consume via CSS custom properties (`var(--token-name)`)
- **Props**: Icon props accept `React.ReactNode`, use JSDoc comments on all exported interfaces
- **Naming**: PascalCase for components, camelCase for props/functions, kebab-case for CSS variables
- **Exports**: Dual CJS/ESM via tsup, explicit `exports` field in package.json
- **File structure**: One component per file in `packages/web/src/components/`
- **Peer deps**: React 18/19, optional `next-themes` for theme integration
<!-- CCB:GENERATED:END -->
