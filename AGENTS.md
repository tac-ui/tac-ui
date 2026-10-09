# Tac UI — Agent & Contributor Rules

Cross-platform design system: one token source, a React web library and a React
Native library with API parity.

Rules using **MUST / NEVER** are mandatory. Rules using **prefer / whenever
possible** are guidance.

## Instructions

- `docs/` is the source of truth for per-project contracts. List it before starting a task.
- Repository-wide rules live in this file. When a change alters structure, a contract or a
  policy, update `AGENTS.md` and the matching `docs/project-<id>.md` **in the same change**.
- Write all code, comments and docs in English.
- Before finishing a change to any package or app, run `pnpm check` (lint + typecheck + test)
  and `pnpm build` from the repository root.
- Every change to a published `@tac-ui/*` package MUST include a changeset (`pnpm changeset`).
  NEVER bump `version` fields by hand — `changeset version` owns them.
- NEVER edit `packages/*/src/version.ts` by hand; `scripts/sync-versions.mjs` writes it.
- NEVER commit with `--no-verify` or put `[skip ci]` in a commit message.
- Do not guess; read the code or search the web.

## Monorepo Structure Map

- `docs/` — per-project contracts. `docs/project-template.md` defines the required shape.
- `packages/` — publishable libraries.
  - `packages/shared/` — `@tac-ui/shared`: types and the theme contract. No runtime code.
  - `packages/tokens/` — `@tac-ui/tokens`: design tokens; subpaths `./web` (CSS variables) and `./native` (theme objects).
  - `packages/icon/` — `@tac-ui/icon`: lucide-react re-export + `TacLogo`.
  - `packages/icon-native/` — `@tac-ui/icon-native`: lucide-react-native re-export + `TacLogo`.
  - `packages/web/` — `@tac-ui/web`: React web components.
  - `packages/native/` — `@tac-ui/native`: React Native components.
  - `packages/tsup.base.ts` — shared tsup options for every package.
- `apps/` — private, never published.
  - `apps/docs/` — `docs`: documentation site (Next.js 16, static export, port 3001).
  - `apps/native-docs-app/` — `native-docs-app`: Expo showcase for `@tac-ui/native`.
- `scripts/` — repository maintenance scripts (Node ESM, no dependencies).
- `.changeset/` — pending release notes.
- `.github/workflows/` — `ci.yml` (build/lint/typecheck/test + changeset gate), `release.yml` (Changesets), `deploy-docs.yml` (GitHub Pages).

## Dependency Direction

```
shared ← tokens ← web    ← apps/docs
                ← native ← apps/native-docs-app
icon        ← web
icon-native ← (consumers)
```

- Dependencies MUST flow one way along the graph above. A package NEVER imports from an app,
  and `web` and `native` NEVER import from each other.
- Inside a package, import other `@tac-ui/*` packages only through their published entry
  points (`@tac-ui/tokens/web`, never `@tac-ui/tokens/src/...`).

## Naming Rules

- Directories and source files: lowercase kebab-case (`date-picker/date-picker.tsx`,
  `hooks/use-reduced-motion.ts`). Enforced by `src/test/structure.test.ts`.
- Components and types: PascalCase. Props, functions, hooks: camelCase. CSS variables: kebab-case.
- Package names: `@tac-ui/<name>`.

## Component Layout Contract

Applies to `packages/web/src/components/` and `packages/native/src/components/`.

```
components/<name>/
├── <name>.tsx        # implementation (one component family per directory)
├── <name>.test.tsx   # optional, colocated tests
└── index.ts          # exactly: export * from './<name>';
```

- Every component directory MUST be exported from the package `src/index.ts` via
  `./components/<name>` — never via a deeper path.
- A component that composes another imports it through the sibling's index
  (`from '../button'`), never `from '../button/button'`.
- No loose files in `components/`. Shared helpers go in `hooks/`, `utils/` or `constants/`.
- These rules are enforced by `packages/{web,native}/src/test/structure.test.ts`.

## Styling & Token Rules

- Web components read colours from CSS custom properties (`var(--token)`), styled with
  Tailwind classes composed through `cn()` and CVA variants.
- Native components read colours from `useTacNativeTheme().colors.*` and size/spacing from
  `componentTokens` in `@tac-ui/tokens/native`, styled with `StyleSheet.create()`.
- A component MUST NOT introduce a colour literal (`#fff`, `rgb(...)`, `rgba(...)`).
  `src/test/color-literals.test.ts` enforces this with a `KNOWN_DEBT` ratchet: counts may only
  go down; NEVER add an entry.
- Motion comes from `constants/motion` (`tacSpring`, `EASING`, `DURATION` on web;
  `springConfigs`, `duration` on native). Do not invent timings inline.
- A new token MUST be added to both `light` and `dark` in `packages/tokens/src/semantic.ts`
  and to the matching interface in `packages/shared/src/types.ts`.

## Accessibility Rules

- Web: set `role` and `aria-*`; reuse `useFocusTrap`, `useFocusRestore`, `useRovingIndex`
  from `hooks/use-accessibility.ts`. Respect `useReducedMotion()` for decorative motion.
- Native: set `accessibilityRole`, `accessibilityState`, `accessibilityLabel`.

## Web / Native Parity

- Shared concepts use the same prop names, variant unions and defaults on both platforms
  (`onClick` ↔ `onPress` excepted).
- A component added to one platform SHOULD state in its project doc whether the other
  platform is planned or intentionally omitted.

## Public API Rules

- Components use `forwardRef` and set `displayName`.
- Every exported interface, type and prop has a JSDoc comment.
- Icon props accept `React.ReactNode`.
- Removing or renaming an export is a **major** change; adding one is **minor**.

## Commits & Issues

- Conventional commits: `<type>(<scope>): <description>` with `type` ∈ `feat | fix | refactor |
  docs | test | chore | ci` and `scope` ∈ `web | native | tokens | shared | icon | docs | repo`.
- Issue titles: `<package>: <description>` — no bracket prefixes.
