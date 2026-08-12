import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Stack } from '../Stack/Stack';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Built on the native `<dialog>` element, so the focus trap, the inert background, Escape-to-close and the top layer come from the platform rather than from a hand-rolled implementation.',
      },
    },
  },
  args: { open: false, title: 'Delete project', onClose: () => {} },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          description="This removes the project and every deployment attached to it."
          footer={
            <>
              <Button variant="ghost" tone="neutral" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button tone="danger" onClick={() => setOpen(false)}>
                Delete project
              </Button>
            </>
          }
        >
          Deleted projects cannot be restored. Deployment history and logs are removed with them.
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" tone="neutral" onClick={() => setOpen(true)}>
          Invite teammate
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Invite a teammate"
          description="They'll get an email with a link to join the workspace."
          footer={
            <>
              <Button variant="ghost" tone="neutral" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Send invitation</Button>
            </>
          }
        >
          <Stack gap={4}>
            <Input label="Email address" placeholder="ada@example.com" fullWidth />
            <Input label="Name" placeholder="Ada Lovelace" fullWidth />
          </Stack>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <>
        <Stack direction="row" gap={2}>
          {(['sm', 'md', 'lg'] as const).map((value) => (
            <Button key={value} variant="outline" tone="neutral" onClick={() => setSize(value)}>
              {value}
            </Button>
          ))}
        </Stack>
        <Modal
          {...args}
          open={size !== null}
          size={size ?? 'md'}
          onClose={() => setSize(null)}
          title={`Size: ${size ?? ''}`}
          footer={<Button onClick={() => setSize(null)}>Close</Button>}
        >
          The panel width comes from a token; the height grows with the content until the viewport runs out,
          then the body scrolls.
        </Modal>
      </>
    );
  },
};
