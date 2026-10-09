import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Components must read colours from tokens (`var(--token)`), never name a literal.
 * A literal survives the theme flip and is unreachable from a consumer's theme.
 *
 * KNOWN_DEBT is a ratchet: the count per file may only go down. Remove an entry
 * once the file is clean; never add one.
 */
const KNOWN_DEBT: Record<string, number> = {
  // Colour math (HSV ↔ hex) and checkerboard swatches are inherent to a picker.
  'color-picker/color-picker.tsx': 48,
  // Thumb shadow lives in a Tailwind arbitrary value; move to an elevation token.
  'slider/slider.tsx': 12,
};

const COMPONENTS = path.resolve(__dirname, '../components');
const LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d/g;

const files = fs
  .readdirSync(COMPONENTS, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => `${e.name}/${e.name}.tsx`);

describe('colour literals in components', () => {
  it.each(files)('%s', (file) => {
    const count = (fs.readFileSync(path.join(COMPONENTS, file), 'utf8').match(LITERAL) ?? []).length;
    expect(count).toBeLessThanOrEqual(KNOWN_DEBT[file] ?? 0);
  });

  it('KNOWN_DEBT has no stale entries', () => {
    const stale = Object.entries(KNOWN_DEBT).filter(([file, max]) => {
      const p = path.join(COMPONENTS, file);
      return !fs.existsSync(p) || (fs.readFileSync(p, 'utf8').match(LITERAL) ?? []).length < max;
    });
    expect(stale.map(([f]) => f)).toEqual([]);
  });
});
