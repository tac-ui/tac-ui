# Changesets

Every PR that changes a published package (`@tac-ui/*`) adds a changeset:

```bash
pnpm changeset
```

Pick the packages, the bump type (patch / minor / major) and write a one-line
summary in the imperative. On merge to `main`, the `Release` workflow opens a
"chore: version packages" PR; merging that PR publishes to npm.
