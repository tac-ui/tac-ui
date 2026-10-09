import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { version } from '../version';

describe('version export', () => {
  it('matches package.json (run `node scripts/sync-versions.mjs`)', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));
    expect(version).toBe(pkg.version);
  });
});
