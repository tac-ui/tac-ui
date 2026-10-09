# project-shared

## Goal

Hold the types and theme contract every other package agrees on, so tokens, web and native
cannot drift apart silently.

## Path

```
packages/shared/
```

## Runtime and Language

TypeScript, bundled by tsup. Types only — no runtime code.

## Consumers

`@tac-ui/tokens`, `@tac-ui/web`, `@tac-ui/native`.

## In Scope

- `types.ts` — token shape interfaces.
- `theme-contract.ts` — the theme object contract.

## Out of Scope

- Any runtime value. Values live in `@tac-ui/tokens`.

## Architecture

```
packages/shared/src/
├── types.ts
├── theme-contract.ts
└── index.ts
```

## Interfaces

`@tac-ui/shared` — type exports only.

## Build and Test

```bash
pnpm --filter @tac-ui/shared build
pnpm --filter @tac-ui/shared typecheck
```

## Open Questions

- None.
