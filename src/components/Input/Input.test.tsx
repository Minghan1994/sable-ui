import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the control', () => {
    render(<Input label="Email address" />);
    expect(screen.getByLabelText('Email address')).toBeInstanceOf(HTMLInputElement);
  });

  it('generates a unique id per instance', () => {
    render(
      <>
        <Input label="First" />
        <Input label="Second" />
      </>,
    );
    expect(screen.getByLabelText('First').id).not.toBe(screen.getByLabelText('Second').id);
  });

  it('respects an explicit id', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });

  it('describes the control with its help text', () => {
    render(<Input label="Email" description="We only use this for receipts." />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('We only use this for receipts.');
  });

  describe('with an error', () => {
    it('marks the control invalid', () => {
      render(<Input label="Email" error="Enter a valid address" />);
      expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    });

    it('links the message to the control alongside the description', () => {
      render(<Input label="Email" description="Work address preferred." error="Enter a valid address" />);
      expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
        'Work address preferred. Enter a valid address',
      );
    });
  });

  it('is not invalid without an error', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('accepts typing', async () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'ada@example.com');
    expect(input).toHaveValue('ada@example.com');
  });

  it('keeps adornments out of the accessibility tree', () => {
    render(<Input label="Amount" startAdornment={<span data-testid="currency">$</span>} />);
    expect(screen.getByTestId('currency').parentElement).toHaveAttribute('aria-hidden', 'true');
  });
});
