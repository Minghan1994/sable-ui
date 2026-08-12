import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: BadgeTone;
  /** @default 'soft' */
  variant?: 'soft' | 'solid' | 'outline';
  /** @default 'md' */
  size?: 'sm' | 'md';
  /** Small leading dot. Useful for status without leaning on colour alone. */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * A compact status label. Colour never carries the meaning by itself — the text
 * inside always says what the state is.
 */
export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cx('sable-badge', className)}
      data-tone={tone}
      data-variant={variant}
      data-size={size}
    >
      {dot && <span className="sable-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
