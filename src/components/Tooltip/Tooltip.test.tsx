import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('does not describe the trigger while closed', () => {
    render(
      <Tooltip content="Promotes the staging build">
        <Button>Promote</Button>
      </Tooltip>,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });

  it('opens on focus and describes the trigger', async () => {
    render(
      <Tooltip content="Promotes the staging build">
        <Button>Promote</Button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Promotes the staging build');
  });

  it('closes again on blur', async () => {
    render(
      <Tooltip content="Promotes the staging build">
        <Button>Promote</Button>
      </Tooltip>,
    );
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });

  it('dismisses on Escape without moving focus, per WCAG 1.4.13', async () => {
    render(
      <Tooltip content="Promotes the staging build">
        <Button>Promote</Button>
      </Tooltip>,
    );
    await userEvent.tab();
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button')).toHaveFocus();
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });

  it('opens on hover after the delay', async () => {
    render(
      <Tooltip content="Promotes the staging build" delay={0}>
        <Button>Promote</Button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole('button'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Promotes the staging build');
  });
});
