import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Stack/Stack';
import { primitiveTokens } from '../tokens';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component:
          'A system font stack — no webfont to download, no flash of unstyled text, and native Chinese coverage through PingFang and Noto Sans TC. Sizes are in `rem`, so they still respond to a reader who has changed their browser font size.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const weights = ['regular', 'medium', 'semibold', 'bold'] as const;
const lineHeights = ['tight', 'snug', 'normal', 'relaxed'] as const;

export const Scale: Story = {
  render: () => (
    <Stack gap={4}>
      {sizes.map((size) => (
        <Stack key={size} direction="row" gap={4} align="baseline">
          <span className="sb-label">font-size-{size}</span>
          <span className="sb-swatch__value">{primitiveTokens['font-size'][size]}</span>
          <span style={{ fontSize: `var(--sable-font-size-${size})` }}>設計系統 Design system</span>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack gap={3}>
      {weights.map((weight) => (
        <Stack key={weight} direction="row" gap={4} align="baseline">
          <span className="sb-label">font-weight-{weight}</span>
          <span
            style={{
              fontWeight: `var(--sable-font-weight-${weight})`,
              fontSize: 'var(--sable-font-size-lg)',
            }}
          >
            The quick brown fox 敏捷的棕色狐狸
          </span>
        </Stack>
      ))}
    </Stack>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <Stack gap={5}>
      {lineHeights.map((lineHeight) => (
        <Stack key={lineHeight} gap={2}>
          <span className="sb-label">line-height-{lineHeight}</span>
          <p
            style={{
              lineHeight: `var(--sable-line-height-${lineHeight})`,
              fontSize: 'var(--sable-font-size-sm)',
              maxWidth: '34rem',
              margin: 0,
            }}
          >
            A design system is a contract between design and engineering. It is only worth the maintenance if
            both sides can point at the same token and mean the same thing — which is why every value in here
            has exactly one home.
          </p>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Monospace: Story = {
  render: () => (
    <pre
      style={{
        fontFamily: 'var(--sable-font-family-mono)',
        fontSize: 'var(--sable-font-size-sm)',
        backgroundColor: 'var(--sable-color-bg-subtle)',
        border: '1px solid var(--sable-color-border)',
        borderRadius: 'var(--sable-radius-lg)',
        padding: 'var(--sable-space-4)',
        margin: 0,
      }}
    >
      {`import { Button } from 'sable-ui';\nimport 'sable-ui/styles.css';`}
    </pre>
  ),
};
