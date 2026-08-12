import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  /** @default 'span' */
  as?: ElementType;
  children?: ReactNode;
}

/** Removes content from view while keeping it in the accessibility tree. */
export function VisuallyHidden({
  as: Component = 'span',
  className,
  children,
  ...rest
}: VisuallyHiddenProps) {
  return (
    <Component {...rest} className={cx('sable-visually-hidden', className)}>
      {children}
    </Component>
  );
}
