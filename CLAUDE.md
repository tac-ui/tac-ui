**Read [AGENTS.md](./AGENTS.md) before performing any task in this repository.** It holds the
repository-wide rules, structure map and contracts. Per-project contracts live in `docs/`.

## Quick reference

| Category | Technology |
|----------|-----------|
| Language | TypeScript (strict) |
| Package manager | pnpm 9.15 |
| Monorepo | Turborepo |
| Build | tsup (dual CJS/ESM) |
| UI | React 18/19, React Native ≥ 0.78 |
| Styling (web) | Tailwind CSS 4, class-variance-authority, clsx, tailwind-merge |
| Styling (native) | StyleSheet + theme context |
| Animation | Framer Motion (web), Animated / reanimated (native) |
| Icons | lucide-react, lucide-react-native |
| Docs | Next.js 16 |
| Tests | Vitest (+ Testing Library / jsdom for web components) |
| Release | Changesets |

```bash
pnpm dev                 # watch everything
pnpm --filter docs dev   # docs site on :3001
pnpm build               # build in dependency order
pnpm check               # lint + typecheck + test
pnpm changeset           # describe a change to a published package
```
