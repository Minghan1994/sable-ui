import { describe, expect, it } from 'vitest';
import { type ThemeName, themes } from './index';

/**
 * Contrast is a property of the token layer, not of the components, so it is
 * checked here — once — rather than being re-asserted in every component test.
 */

const AA_NORMAL_TEXT = 4.5;

function channel(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match?.[1]) throw new Error(`Not a six-digit hex colour: ${hex}`);
  const int = Number.parseInt(match[1], 16);
  const r = channel((int >> 16) & 0xff);
  const g = channel((int >> 8) & 0xff);
  const b = channel(int & 0xff);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

const value = (theme: ThemeName, name: string): string => {
  const resolved = themes[theme][name as keyof (typeof themes)['light']];
  if (!resolved) throw new Error(`Missing token ${name} in the ${theme} theme`);
  return resolved;
};

/** Text/background pairs the components actually put together. */
const pairs: [foreground: string, background: string][] = [
  ['--sable-color-text', '--sable-color-bg'],
  ['--sable-color-text', '--sable-color-surface'],
  ['--sable-color-text-muted', '--sable-color-bg'],
  ['--sable-color-text-subtle', '--sable-color-bg'],
  ['--sable-color-text-inverse', '--sable-color-bg-inverse'],
  ['--sable-color-accent-text', '--sable-color-bg'],
  ['--sable-color-success-text', '--sable-color-bg'],
  ['--sable-color-warning-text', '--sable-color-bg'],
  ['--sable-color-danger-text', '--sable-color-bg'],
  ['--sable-color-info-text', '--sable-color-bg'],
  ...(['accent', 'success', 'warning', 'danger', 'info'] as const).map(
    (tone) => [`--sable-color-${tone}-on-solid`, `--sable-color-${tone}-solid`] as [string, string],
  ),
];

describe.each(['light', 'dark'] as const)('%s theme', (theme) => {
  it.each(pairs)('%s on %s meets WCAG AA for normal text', (foreground, background) => {
    const ratio = contrast(value(theme, foreground), value(theme, background));
    expect(ratio, `${foreground} on ${background} was ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
      AA_NORMAL_TEXT,
    );
  });
});

describe('theme parity', () => {
  it('declares the same token names in every theme', () => {
    const [reference, ...rest] = Object.values(themes).map((tokens) => Object.keys(tokens).sort());
    for (const names of rest) expect(names).toEqual(reference);
  });

  it('resolves every alias to a literal value', () => {
    for (const tokens of Object.values(themes)) {
      for (const [name, resolved] of Object.entries(tokens)) {
        expect(resolved, `${name} still contains an unresolved alias`).not.toMatch(/[{}]/);
      }
    }
  });
});
