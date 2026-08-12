import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/Stack';
import { IconButton } from './IconButton';

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <title>Trash</title>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 12h10l1-12M10 11v5M14 11v5" />
  </svg>
);

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          '`label` is required. An icon on its own is silent to a screen reader, so the prop that fixes that is not optional.',
      },
    },
  },
  args: { icon: <TrashIcon />, label: 'Delete item' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <IconButton {...args} variant="solid" tone="accent" />
      <IconButton {...args} variant="soft" tone="accent" />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <IconButton {...args} size="sm" variant="outline" />
      <IconButton {...args} size="md" variant="outline" />
      <IconButton {...args} size="lg" variant="outline" />
    </Stack>
  ),
};

export const Round: Story = {
  args: { round: true },
  render: (args) => (
    <Stack direction="row" gap={3} align="center">
      <IconButton {...args} variant="solid" tone="accent" />
      <IconButton {...args} variant="soft" tone="danger" />
    </Stack>
  ),
};

export const Loading: Story = {
  args: { loading: true, variant: 'solid', tone: 'accent' },
};
