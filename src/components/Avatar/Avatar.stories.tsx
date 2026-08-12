import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Ada Lovelace' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </Stack>
  ),
};

/** Initials are the fallback, so a missing or broken image never leaves an empty hole. */
export const Initials: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Grace Hopper" />
      <Avatar {...args} name="Katherine" />
      <Avatar {...args} name="Ada Lovelace" src="https://example.invalid/broken.png" />
    </Stack>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="rounded" />
    </Stack>
  ),
};
