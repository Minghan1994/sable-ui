import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The workhorse action. `tone` picks the palette, `variant` decides how loudly to use it — the two are independent, so every combination stays coherent.',
      },
    },
  },
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'soft', 'outline', 'ghost'] },
    tone: { control: 'inline-radio', options: ['accent', 'neutral', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack gap={3} direction="row" align="center" wrap>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </Stack>
  ),
};

/** Tone is about meaning, not decoration: `danger` is for actions that destroy something. */
export const Tones: Story = {
  render: (args) => (
    <Stack gap={4}>
      {(['accent', 'neutral', 'danger'] as const).map((tone) => (
        <Stack key={tone} direction="row" gap={3} align="center" wrap>
          <span className="sb-label">{tone}</span>
          <Button {...args} tone={tone} variant="solid">
            Solid
          </Button>
          <Button {...args} tone={tone} variant="soft">
            Soft
          </Button>
          <Button {...args} tone={tone} variant="outline">
            Outline
          </Button>
          <Button {...args} tone={tone} variant="ghost">
            Ghost
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Every size snaps to a control height token, so buttons line up with inputs and selects. */
export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Stack>
  ),
};

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <title>Plus</title>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center" wrap>
      <Button {...args} startIcon={<PlusIcon />}>
        New project
      </Button>
      <Button {...args} variant="outline" tone="neutral" endIcon={<PlusIcon />}>
        Add member
      </Button>
    </Stack>
  ),
};

/**
 * Loading keeps the button's width — the label is hidden rather than removed, so
 * the layout does not jump the moment a request starts.
 */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Stack direction="row" gap={3} align="center" wrap>
      <Button {...args}>Save changes</Button>
      <Button {...args} variant="outline" tone="neutral">
        Save changes
      </Button>
      <Button {...args} tone="danger">
        Delete
      </Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Stack direction="row" gap={3} align="center" wrap>
      <Button {...args}>Solid</Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <Button {...args} />
    </div>
  ),
};
