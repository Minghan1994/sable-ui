import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('uses the name as the image alt text', () => {
    render(<Avatar name="Ada Lovelace" src="https://example.com/ada.jpg" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
  });

  it('falls back to initials without an image', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('uses a single initial for a one-word name', () => {
    render(<Avatar name="Katherine" />);
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('still exposes the name when showing initials', () => {
    const { container } = render(<Avatar name="Grace Hopper" />);
    expect(container).toHaveTextContent('Grace Hopper');
  });

  it('swaps to initials when the image fails to load', () => {
    render(<Avatar name="Ada Lovelace" src="https://example.invalid/broken.png" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });
});
