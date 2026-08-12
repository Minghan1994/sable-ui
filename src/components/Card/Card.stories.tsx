import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'outline', padding: 5 },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '26rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Deployment</CardTitle>
        <CardDescription>Last shipped 4 minutes ago by ada.</CardDescription>
      </CardHeader>
      <CardBody>
        Builds are promoted from staging once the smoke tests pass. Rolling back restores the previous image
        without a rebuild.
      </CardBody>
      <CardFooter>
        <Button size="sm">Promote</Button>
        <Button size="sm" variant="ghost" tone="neutral">
          View logs
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack gap={4}>
      {(['outline', 'elevated', 'filled'] as const).map((variant) => (
        <Card {...args} key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>Same content, three levels of separation from the page.</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </Stack>
  ),
};

export const Composed: Story = {
  render: (args) => (
    <Card {...args} variant="elevated">
      <CardHeader>
        <Stack direction="row" gap={2} align="center" justify="between">
          <CardTitle>api-gateway</CardTitle>
          <Badge tone="success" dot>
            Healthy
          </Badge>
        </Stack>
        <CardDescription>eu-west-1 · 3 replicas</CardDescription>
      </CardHeader>
      <CardBody>
        <Stack gap={2}>
          <Stack direction="row" justify="between">
            <span>p99 latency</span>
            <strong>128 ms</strong>
          </Stack>
          <Stack direction="row" justify="between">
            <span>Error rate</span>
            <strong>0.02%</strong>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  ),
};
