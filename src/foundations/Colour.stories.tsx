import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Stack/Stack';
import { primitiveTokens, themes } from '../tokens';

const meta = {
  title: 'Foundations/Colour',
  parameters: {
    docs: {
      description: {
        component:
          'Two layers. Primitives are raw values with no opinion about where they are used; semantic tokens say what a colour is *for*, and are the only ones a component may reference. Swapping a theme rewrites the semantic layer — components never notice.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ramps = ['neutral', 'brand', 'green', 'amber', 'red', 'sky'] as const;
const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

/** Raw palette. Components never reference these directly. */
export const Primitives: Story = {
  render: () => (
    <Stack gap={6}>
      {ramps.map((ramp) => (
        <Stack key={ramp} gap={2}>
          <strong style={{ fontSize: 'var(--sable-font-size-sm)' }}>{ramp}</strong>
          <div className="sb-ramp">
            {steps.map((step) => (
              <div
                key={step}
                className="sb-ramp__step"
                style={{
                  backgroundColor: primitiveTokens.color[ramp][step],
                  // Flip the label once the swatch gets dark enough to swallow it.
                  color: Number(step) >= 500 ? '#ffffff' : '#0f172a',
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

const semanticGroups = (() => {
  const groups = new Map<string, string[]>();
  for (const name of Object.keys(themes.light)) {
    const rest = name.replace('--sable-color-', '').replace('--sable-', '');
    if (!name.startsWith('--sable-color-')) continue;
    const group = rest.split('-')[0] ?? 'other';
    groups.set(group, [...(groups.get(group) ?? []), name]);
  }
  return [...groups];
})();

/**
 * What a colour means. Every swatch below is drawn with `var(--sable-…)`, so
 * toggling the theme in the toolbar repaints them without a re-render.
 */
export const Semantic: Story = {
  render: () => (
    <Stack gap={6}>
      {semanticGroups.map(([group, names]) => (
        <Stack key={group} gap={3}>
          <strong style={{ fontSize: 'var(--sable-font-size-sm)' }}>{group}</strong>
          <div className="sb-grid">
            {names.map((name) => (
              <div className="sb-swatch" key={name}>
                <div className="sb-swatch__chip" style={{ backgroundColor: `var(${name})` }} />
                <span className="sb-swatch__name">{name.replace('--sable-', '')}</span>
                <span className="sb-swatch__value">{themes.light[name as keyof typeof themes.light]}</span>
              </div>
            ))}
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * Every solid/on-solid pair clears 4.5:1, the WCAG AA threshold for normal text.
 * The dark theme gets there by inverting the relationship — a light fill with
 * dark text — rather than by darkening the same mid-tone until it turns muddy.
 */
export const OnSolidPairs: Story = {
  render: () => (
    <Stack gap={3}>
      {(['accent', 'success', 'warning', 'danger', 'info'] as const).map((tone) => (
        <div
          key={tone}
          style={{
            backgroundColor: `var(--sable-color-${tone}-solid)`,
            color: `var(--sable-color-${tone}-on-solid)`,
            padding: 'var(--sable-space-4)',
            borderRadius: 'var(--sable-radius-lg)',
            fontSize: 'var(--sable-font-size-sm)',
            fontWeight: 'var(--sable-font-weight-medium)',
          }}
        >
          {tone} — solid background, on-solid text
        </div>
      ))}
    </Stack>
  ),
};
