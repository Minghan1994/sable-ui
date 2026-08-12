import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          '`warning` and `danger` announce as `role="alert"`, interrupting a screen reader. `info` and `success` use `role="status"` and wait for a pause — which is why the tone is a meaning, not a colour.',
      },
    },
  },
  args: { title: 'Deployment queued', children: 'Your build will start once the current one finishes.' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '34rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Alert {...args} tone="info" title="Deployment queued" />
      <Alert {...args} tone="success" title="Deployed to production">
        Version 2.4.0 is live in all regions.
      </Alert>
      <Alert {...args} tone="warning" title="Certificate expires in 7 days">
        Renew it before 19 August to avoid an outage.
      </Alert>
      <Alert {...args} tone="danger" title="Deployment failed">
        The health check timed out after 30 seconds.
      </Alert>
    </Stack>
  ),
};

export const WithActions: Story = {
  args: {
    tone: 'warning',
    title: 'Certificate expires in 7 days',
    children: 'Renew it before 19 August to avoid an outage.',
    actions: (
      <>
        <Button size="sm" tone="neutral" variant="outline">
          Renew now
        </Button>
        <Button size="sm" variant="ghost" tone="neutral">
          Remind me later
        </Button>
      </>
    ),
  },
};

export const Dismissible: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Alert {...args} onDismiss={() => setVisible(false)} />
    ) : (
      <Button variant="outline" tone="neutral" onClick={() => setVisible(true)}>
        Show the alert again
      </Button>
    );
  },
};

export const TitleOnly: Story = {
  args: { children: undefined, tone: 'success', title: 'Settings saved' },
};
