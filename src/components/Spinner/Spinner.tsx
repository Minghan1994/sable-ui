import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Spinner.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Matches the icon sizes used by controls. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Announced to assistive tech. Pass `null` when the spinner sits inside
   * something that already describes the wait (a loading Button, say).
   * @default 'Loading'
   */
  label?: string | null;
}

/** An indeterminate progress indicator. Inherits `currentColor`. */
export function Spinner({ size = 'md', label = 'Loading', className, ...rest }: SpinnerProps) {
  return (
    <span
      className={cx('sable-spinner', className)}
      data-size={size}
      role={label === null ? 'presentation' : 'status'}
      {...rest}
    >
      <span className="sable-spinner__circle" />
      {label !== null && <span className="sable-visually-hidden">{label}</span>}
    </span>
  );
}
