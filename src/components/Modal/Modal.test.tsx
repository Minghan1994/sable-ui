import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

/**
 * jsdom implements <dialog> only partially — `showModal` is stubbed in
 * vitest.setup.ts — so these cover the wiring around the element rather than the
 * platform behaviour (focus trap, top layer) that the element itself provides.
 */
describe('Modal', () => {
  it('is not shown while closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Delete project">
        Body
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('takes its accessible name from the title', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog', { name: 'Delete project' })).toBeInTheDocument();
  });

  it('takes its description from the description prop', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project" description="This cannot be undone.">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('This cannot be undone.');
  });

  it('closes from the close button', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Delete project">
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('can hide the close button', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project" hideCloseButton>
        Body
      </Modal>,
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('renders footer actions', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project" footer={<button type="button">Delete</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
