# project-tokens

## Goal

Single source of truth for Tac UI design decisions — colour, spacing, typography, motion,
elevation, chart palette and component-level specs — emitted for both web and native.

## Path

```
packages/tokens/
```

## Runtime and Language

TypeScript, bundled by tsup (CJS + ESM). No runtime dependencies besides `@tac-ui/shared`.

## Consumers

`@tac-ui/web`, `@tac-ui/native`, `apps/docs`, and product apps that need raw token values.

## In Scope

- `primitive.ts` — raw palette.
- `semantic.ts` — light/dark semantic colour maps (both modes MUST define the same keys).
- `component.ts` — per-component specs (heights, paddings, radii).
- `spacing.ts`, `typography.ts`, `motion.ts`, `elevation.ts`, `chart.ts`.
- `web/` — CSS custom property generation.
- `native/` — theme object builder and shadows.

## Out of Scope

- Component code. Theme context / providers (owned by web and native packages).

## Architecture

```
packages/tokens/
├── src/
│   ├── *.ts                 # token systems
│   ├── web/                 # css-variables.ts, unit-utils.ts
│   └── native/              # index.ts, shadows.ts
└── native/package.json      # legacy resolution shim for `@tac-ui/tokens/native`
```

## Interfaces

| Entry | Contents |
|-------|----------|
| `@tac-ui/tokens` | all token systems |
| `@tac-ui/tokens/web` | CSS variable generation |
| `@tac-ui/tokens/native` | native theme builders |

## Build and Test

```bash
pnpm --filter @tac-ui/tokens build
pnpm --filter @tac-ui/tokens test     # semantic.test.ts: light/dark parity and invariants
```

## Open Questions

- Native glass/scrim overlays and the web slider thumb shadow need tokens (see
  `project-native.md`, `project-web.md`).
