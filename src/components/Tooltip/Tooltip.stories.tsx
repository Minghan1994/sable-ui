import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Stack } from '../Stack/Stack';
import { Tooltip } from './Tooltip';

const InfoGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <title>Info</title>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11.5v5M12 7.75h.01" />
  </svg>
);

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "A short hint on a focusable element. It supplements the trigger's label rather than replacing it — anything only available on hover is unreachable by touch, so nothing essential belongs here.",
      },
    },
  },
  args: {
    content: 'Promotes the staging build to production',
    children: <Button>Promote</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Promote</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <Stack direction="row" gap={4} align="center" justify="center" style={{ padding: '4rem' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip {...args} key={placement} placement={placement} content={`Placed ${placement}`}>
          <Button variant="outline" tone="neutral">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </Stack>
  ),
};

/** Keyboard focus opens the tip immediately; pointer hover waits out the delay. */
export const OnIconButton: Story = {
  render: (args) => (
    <Tooltip {...args} content="Deployments are promoted, never rebuilt">
      <IconButton icon={<InfoGlyph />} label="About promotion" />
    </Tooltip>
  ),
};
