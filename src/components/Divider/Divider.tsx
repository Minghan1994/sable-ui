import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Divider.css';

export interface DividerProps extends Omit<HTMLAttributes<HTMLHRElement>, 'children'> {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Text set into the line. Horizontal only. */
  label?: ReactNode;
}

/**
 * A separator, rendered as an `<hr>` — the element that already means this, and
 * that already maps to `role="separator"` without being told to.
 */
export function Divider({ orientation = 'horizontal', label, className, ...rest }: DividerProps) {
  if (label && orientation === 'horizontal') {
    return (
      // Two separators with the label between them: the rules keep their meaning,
      // and the label is read as the ordinary text it is.
      <div className={cx('sable-divider--labelled', className)}>
        <hr {...rest} className="sable-divider" data-orientation="horizontal" />
        <span className="sable-divider__label">{label}</span>
        <hr className="sable-divider" data-orientation="horizontal" />
      </div>
    );
  }

  return (
    <hr
      {...rest}
      className={cx('sable-divider', className)}
      data-orientation={orientation}
      aria-orientation={orientation}
    />
  );
}
