# project-docs

## Goal

Document every Tac UI component with live examples, a playground and bilingual (en/ko) copy.

## Path

```
apps/docs/              # web documentation site (published to GitHub Pages, tac-ui.com)
apps/native-docs-app/   # Expo showcase for @tac-ui/native
```

## Runtime and Language

- `apps/docs`: Next.js 16 static export (TypeScript), Tailwind CSS 4, `@tac-ui/web`.
- `apps/native-docs-app`: Expo 55 / React Native 0.83 (TypeScript), React Navigation.

Both are private and ignored by Changesets.

## Consumers

Developers evaluating or integrating Tac UI.

## In Scope

- One page per web component under `src/app/web/(docs)/components/<name>/page.tsx`.
- Native component pages under `src/app/native/` and screens in `apps/native-docs-app/src/screens/<category>/`.
- i18n (`src/i18n/locales/{en,ko}`), command palette, playgrounds, `llms.txt`.

## Out of Scope

- Package source. The docs import packages only through their public entry points.

## Architecture

```
apps/docs/src/
├── app/                 # routes: /, /web/..., /native/...
├── components/docs/     # DocPage, Sidebar, Playground, nav data
└── i18n/                # locale context + JSON catalogues
```

## Interfaces

- Route pattern: `/web/components/<component-name>`, `/native/components/<component-name>`.
- Deployment: `.github/workflows/deploy-docs.yml` uploads `apps/docs/out` on push to `main`.

## Build and Test

```bash
pnpm --filter docs dev     # :3001
pnpm --filter docs build   # static export to apps/docs/out
pnpm --filter docs lint
pnpm --filter native-docs-app start
```

## Open Questions

- Docs files still use PascalCase component file names (`DocPage.tsx`); align with the
  kebab-case rule when the docs app is next restructured.
