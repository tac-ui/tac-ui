# Contributing to Tac UI

Thanks for helping build Tac UI. This guide covers the day-to-day workflow for adding
components, tokens, and fixes across the web and native packages. The binding rules live in
[AGENTS.md](./AGENTS.md); per-package contracts live in [`docs/`](./docs).

## Prerequisites

- Node.js 22+
- pnpm 9.15+

## Getting Started

```bash
pnpm install
pnpm dev      # watch all packages
pnpm build    # build everything in dependency order
pnpm check    # lint + typecheck + test
```

The docs site runs at `http://localhost:3001`:

```bash
pnpm --filter docs dev
```

## Repository Layout

```
packages/
  shared/       # @tac-ui/shared    — types + interfaces (no runtime code)
  tokens/       # @tac-ui/tokens    — design tokens, exports web + native subpaths
  icon/         # @tac-ui/icon      — lucide-react wrapper + TacLogo
  icon-native/  # @tac-ui/icon-native — lucide-react-native wrapper
  web/          # @tac-ui/web       — React web components
  native/       # @tac-ui/native    — React Native components
apps/
  docs/             # Next.js documentation site (dogfoods @tac-ui/web)
  native-docs-app/  # Expo showcase for @tac-ui/native
docs/               # project-<id>.md contracts
scripts/            # maintenance scripts (version sync)
```

Dependency flow is strictly one-directional:

```
shared → tokens → web / native
icon → web
```

Never introduce a dependency that breaks this flow.

## Adding a New Component

1. **Create the directory** `packages/web/src/components/<name>/` (kebab-case) with
   `<name>.tsx` and an `index.ts` containing exactly `export * from './<name>';`. Do the same
   under `packages/native/src/components/` for the native counterpart.
2. **Export it** from `packages/web/src/index.ts` via `./components/<name>` — include both the
   component and its prop/variant types. `src/test/structure.test.ts` fails if you forget.
3. **Consume tokens** — do not hardcode colors, spacing, or shadows:
   - Web: use CSS variables like `var(--point)` via Tailwind arbitrary values.
   - Native: pull from `useTacNativeTheme()` and `componentTokens` from
     `@tac-ui/tokens/native`.
4. **Motion** comes from `constants/motion` (`tacSpring.*`, `EASING`, `DURATION` on web;
   `springConfigs.*`, `duration` on native). Do not invent new timings inline.
5. **Accessibility** is not optional:
   - Web: set `role`, `aria-*`, and reuse hooks in `packages/web/src/hooks/` (e.g.
     `useFocusTrap`, `useRovingIndex`).
   - Native: set `accessibilityRole`, `accessibilityState`, `accessibilityLabel`.
6. **JSDoc every exported type** — props, variant unions, and size unions. The docs site
   and IntelliSense both read these.
7. **Keep web and native in API parity** where it makes sense: same prop names (aside
   from `onPress` vs `onClick`), same variant unions, same default values.

## Component Template (Web)

`packages/web/src/components/example/example.tsx`:

```tsx
'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const exampleVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', accent: '...' },
  },
  defaultVariants: { variant: 'default' },
});

/** Visual style of the Example component. */
export type ExampleVariant = 'default' | 'accent';

/** Props for the Example component. */
export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {
  /** Visual style. @default 'default' */
  variant?: ExampleVariant;
}

export const Example = forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(exampleVariants({ variant }), className)} {...props} />
  ),
);
Example.displayName = 'Example';
```

## Adding a Design Token

Tokens live in `packages/tokens/src/`:

- `semantic.ts` — light/dark color pairs (must be added to **both** modes).
- `spacing.ts`, `typography.ts`, `elevation.ts`, `motion.ts`, `chart.ts` — scalar systems.
- `component.ts` — per-component token specs.
- `web/css-variables.ts` — regenerates CSS custom properties.
- `native/index.ts` — builds the JS theme object consumed via React context.

After editing tokens:

1. Add the key to the matching interface in `packages/shared/src/types.ts`.
2. Update both `light` and `dark` maps in `semantic.ts` (or the relevant file).
3. Rebuild with `pnpm build` and confirm both web and native typecheck.
4. Update or add a test in `packages/tokens/src/*.test.ts` if the shape of the token
   system changes.

## Commits & Versioning

- Conventional commits: `feat(web): ...`, `fix(native): ...`, `docs: ...`, `chore(repo): ...`.
- Versions are managed by [Changesets](./.changeset/README.md). For every change to a
  published package run `pnpm changeset`, pick the bump (patch / minor / major) and commit the
  generated file with your change. **Do not edit `version` fields or `src/version.ts` by hand.**
- On merge to `main`, the Release workflow opens a "chore: version packages" PR. Merging it
  publishes to npm.

## Testing

- Guard tests in `packages/{web,native}/src/test/` enforce the directory contract, public
  exports, colour-literal ratchet and version sync. They run in Node.
- Component tests sit next to the component (`button/button.test.tsx`), start with
  `// @vitest-environment jsdom`, and use `@testing-library/react`.

## Before Opening a PR

- [ ] `pnpm check` passes (lint + typecheck + test)
- [ ] `pnpm build` passes
- [ ] Changeset added for every changed `@tac-ui/*` package
- [ ] New exports added to `src/index.ts`
- [ ] JSDoc on every exported type
- [ ] Tokens used instead of hardcoded values
- [ ] Web/native parity considered (if the change applies to both)
- [ ] Docs site still renders the component correctly
