# Project Document Template

Every package and app has a `docs/project-<id>.md`. `<id>` is the lowercase kebab-case
directory name (`web`, `icon-native`, `docs-app`). Create it **before** implementation of a
new package or app, and update it in the same change as any structural or contract change.

## Required sections (in order)

1. **Goal** — why the project exists.
2. **Path** — canonical repository path(s).
3. **Runtime and Language** — e.g. `React 18/19 (TypeScript), tsup`.
4. **Consumers** — who uses it.
5. **In Scope** / **Out of Scope**.
6. **Architecture** — directory map and internal boundaries.
7. **Interfaces** — entry points, subpath exports, public contracts.
8. **Build and Test** — commands and what CI runs.
9. **Open Questions** — known debt and undecided items.

## Checklist

- [ ] File name is `project-<id>.md`.
- [ ] All required sections present, in order.
- [ ] Every path mentioned exists or is marked `planned`.
- [ ] Rules that apply repo-wide are stated in `AGENTS.md`, not here.
