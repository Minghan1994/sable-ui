import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={4} align="center">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </Stack>
  ),
};

/** It inherits `currentColor`, so it matches whatever it sits inside. */
export const InheritsColour: Story = {
  render: (args) => (
    <Stack direction="row" gap={4} align="center">
      <span style={{ color: 'var(--sable-color-accent-solid)' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: 'var(--sable-color-danger-solid)' }}>
        <Spinner {...args} />
      </span>
      <span style={{ color: 'var(--sable-color-text-muted)' }}>
        <Spinner {...args} />
      </span>
    </Stack>
  ),
};
