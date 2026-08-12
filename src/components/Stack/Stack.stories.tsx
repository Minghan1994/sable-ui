import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Stack } from './Stack';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component:
          'Flex layout limited to the spacing scale. `gap` takes a step, not a length, so "space these out" can never become a hand-typed `13px`.',
      },
    },
  },
  args: { gap: 4 },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <Card padding={3} variant="filled" style={{ minWidth: '5rem', textAlign: 'center' }}>
    {children}
  </Card>
);

export const Column: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: 'row' },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const GapScale: Story = {
  render: () => (
    <Stack gap={6}>
      {([1, 2, 3, 4, 6, 8] as const).map((gap) => (
        <Stack key={gap} direction="row" gap={4} align="center">
          <span className="sb-label">gap={gap}</span>
          <Stack direction="row" gap={gap}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Alignment: Story = {
  args: { direction: 'row', justify: 'between', align: 'center' },
  render: (args) => (
    <Stack {...args} style={{ border: '1px dashed var(--sable-color-border)', padding: '1rem' }}>
      <Box>Start</Box>
      <Box>Middle</Box>
      <Box>End</Box>
    </Stack>
  ),
};
