import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Badge, type BadgeTone } from './Badge';

const tones: BadgeTone[] = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Active' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <Stack gap={4}>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <Stack key={variant} direction="row" gap={2} align="center" wrap>
          <span className="sb-label">{variant}</span>
          {tones.map((tone) => (
            <Badge {...args} key={tone} tone={tone} variant={variant}>
              {tone}
            </Badge>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

/**
 * A dot gives the status a second visual channel. Colour alone fails for anyone
 * who cannot distinguish the hues — and the label still carries the meaning.
 */
export const WithDot: Story = {
  render: (args) => (
    <Stack direction="row" gap={2} align="center" wrap>
      <Badge {...args} dot tone="success">
        Operational
      </Badge>
      <Badge {...args} dot tone="warning">
        Degraded
      </Badge>
      <Badge {...args} dot tone="danger">
        Outage
      </Badge>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={2} align="center">
      <Badge {...args} size="sm" tone="accent">
        Small
      </Badge>
      <Badge {...args} size="md" tone="accent">
        Medium
      </Badge>
    </Stack>
  ),
};
