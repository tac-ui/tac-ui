# project-icon

## Goal

Give web and native consumers one import for the Tac UI icon set: the lucide library plus
the `TacLogo` brand mark.

## Path

```
packages/icon/          # @tac-ui/icon (web, lucide-react)
packages/icon-native/   # @tac-ui/icon-native (React Native, lucide-react-native)
```

## Runtime and Language

TypeScript + React (web) / React Native + `react-native-svg` (native), bundled by tsup.

## Consumers

`@tac-ui/web` (re-exported at `@tac-ui/web/icons`), product apps, `apps/native-docs-app`.

## In Scope

- Re-export of lucide icons.
- `TacLogo` (`src/tac-logo.tsx`) with identical props on both platforms.

## Out of Scope

- Custom icon authoring pipeline (no SVG source registry yet).

## Architecture

```
packages/icon{,-native}/src/
├── tac-logo.tsx
└── index.ts
```

## Interfaces

| Entry | Contents |
|-------|----------|
| `@tac-ui/icon` | `lucide-react` exports + `TacLogo`, `TacLogoProps` |
| `@tac-ui/icon-native` | `lucide-react-native` exports + `TacLogo`, `TacLogoProps` |

## Build and Test

```bash
pnpm --filter @tac-ui/icon build
pnpm --filter @tac-ui/icon-native build
```

## Open Questions

- `TacLogo` is duplicated per platform; a shared SVG source would remove the drift risk.
