import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Stack/Stack';
import { primitiveTokens } from '../tokens';

const meta = {
  title: 'Foundations/Layout',
  parameters: {
    docs: {
      description: {
        component:
          'Spacing, radius, elevation and motion. Everything sits on a 4px grid; the half-steps exist only for dense controls, where a full step would look loose.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spaceSteps = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'] as const;
const radii = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const shadows = ['sm', 'md', 'lg', 'xl'] as const;
const durations = ['fast', 'normal', 'slow'] as const;

export const Spacing: Story = {
  render: () => (
    <Stack gap={3}>
      {spaceSteps.map((step) => (
        <Stack key={step} direction="row" gap={4} align="center">
          <span className="sb-label">space-{step}</span>
          <span className="sb-swatch__value" style={{ minWidth: '4rem' }}>
            {primitiveTokens.space[step]}
          </span>
          <div
            style={{
              width: `var(--sable-space-${step})`,
              height: 'var(--sable-space-4)',
              backgroundColor: 'var(--sable-color-accent-solid)',
              borderRadius: 'var(--sable-radius-xs)',
            }}
          />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="sb-grid">
      {radii.map((radius) => (
        <div className="sb-swatch" key={radius}>
          <div
            className="sb-swatch__chip"
            style={{
              borderRadius: `var(--sable-radius-${radius})`,
              backgroundColor: 'var(--sable-color-accent-soft)',
              borderColor: 'var(--sable-color-accent-border)',
            }}
          />
          <span className="sb-swatch__name">radius-{radius}</span>
          <span className="sb-swatch__value">{primitiveTokens.radius[radius]}</span>
        </div>
      ))}
    </div>
  ),
};

/** Shadows are semantic, not primitive: the dark theme needs far heavier ones to read at all. */
export const Elevation: Story = {
  render: () => (
    <div className="sb-grid">
      {shadows.map((shadow) => (
        <div className="sb-swatch" key={shadow}>
          <div
            className="sb-swatch__chip"
            style={{
              boxShadow: `var(--sable-shadow-${shadow})`,
              backgroundColor: 'var(--sable-color-surface)',
              borderColor: 'transparent',
            }}
          />
          <span className="sb-swatch__name">shadow-{shadow}</span>
        </div>
      ))}
    </div>
  ),
};

/** Hover a bar to see its duration. All three collapse to 1ms under `prefers-reduced-motion`. */
export const Motion: Story = {
  render: () => (
    <Stack gap={4}>
      {durations.map((duration) => (
        <Stack key={duration} direction="row" gap={4} align="center">
          <span className="sb-label">duration-{duration}</span>
          <span className="sb-swatch__value" style={{ minWidth: '4rem' }}>
            {primitiveTokens.duration[duration]}
          </span>
          <div
            style={{
              width: '12rem',
              height: 'var(--sable-space-6)',
              borderRadius: 'var(--sable-radius-full)',
              backgroundColor: 'var(--sable-color-bg-muted)',
              overflow: 'hidden',
            }}
          >
            <div
              className={`sb-motion sb-motion--${duration}`}
              style={{
                height: '100%',
                width: '30%',
                borderRadius: 'var(--sable-radius-full)',
                backgroundColor: 'var(--sable-color-accent-solid)',
                transition: `transform var(--sable-duration-${duration}) var(--sable-easing-standard)`,
              }}
            />
          </div>
        </Stack>
      ))}
      <style>{`
        .sb-motion { transform: translateX(0); }
        .sb-motion:hover, div:hover > .sb-motion { transform: translateX(233%); }
      `}</style>
    </Stack>
  ),
};
