import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = path.resolve(__dirname, '..');
const COMPONENTS = path.join(SRC, 'components');
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const componentDirs = fs
  .readdirSync(COMPONENTS, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

describe('component directory layout', () => {
  it('has no loose files in components/', () => {
    const loose = fs
      .readdirSync(COMPONENTS, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name !== '.DS_Store');
    expect(loose.map((e) => e.name)).toEqual([]);
  });

  it.each(componentDirs)('%s follows the <name>/<name>.tsx + index.ts contract', (name) => {
    expect(name).toMatch(KEBAB);
    expect(fs.existsSync(path.join(COMPONENTS, name, `${name}.tsx`))).toBe(true);
    expect(fs.readFileSync(path.join(COMPONENTS, name, 'index.ts'), 'utf8')).toBe(`export * from './${name}';\n`);
  });

  it('uses kebab-case for every source file', () => {
    const walk = (d: string): string[] =>
      fs
        .readdirSync(d, { withFileTypes: true })
        .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [e.name]));
    const bad = walk(SRC)
      .filter((f) => /\.(ts|tsx)$/.test(f))
      .map((f) => f.replace(/(\.test)?\.(d\.)?tsx?$/, ''))
      .filter((base) => !KEBAB.test(base));
    expect(bad).toEqual([]);
  });
});

describe('public entry point', () => {
  const index = fs.readFileSync(path.join(SRC, 'index.ts'), 'utf8');

  it.each(componentDirs)('exports components/%s', (name) => {
    expect(index).toContain(`from './components/${name}'`);
  });

  it('never deep-imports a component implementation file', () => {
    expect(index).not.toMatch(/from '\.\/components\/[^']+\/[^']+'/);
  });
});

describe('component import boundaries', () => {
  it.each(componentDirs)('%s imports sibling components only through their index', (name) => {
    const source = fs.readFileSync(path.join(COMPONENTS, name, `${name}.tsx`), 'utf8');
    const deep = [...source.matchAll(/from '\.\.\/([^'.][^']*)'/g)]
      .map((m) => m[1])
      .filter((spec) => componentDirs.includes(spec.split('/')[0]) && spec.includes('/'));
    expect(deep).toEqual([]);
  });
});
