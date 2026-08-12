import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('defaults to type="button" so it cannot submit a form by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick while disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  describe('loading', () => {
    it('marks the button busy and blocks interaction', async () => {
      const onClick = vi.fn();
      render(
        <Button onClick={onClick} loading>
          Save
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('keeps the label in the DOM so the button does not resize', () => {
      render(<Button loading>Save changes</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Save changes');
    });

    it('announces the wait', () => {
      render(
        <Button loading loadingLabel="Saving">
          Save
        </Button>,
      );
      expect(screen.getByRole('status')).toHaveTextContent('Saving');
    });
  });

  it('hides decorative icons from assistive tech', () => {
    render(<Button startIcon={<svg data-testid="icon" />}>Save</Button>);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards a ref to the underlying element', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
