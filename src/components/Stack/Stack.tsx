import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Stack.css';

/** Steps from the spacing scale. Arbitrary pixel gaps are the thing this prop exists to prevent. */
export type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** @default 'column' */
  direction?: 'row' | 'column';
  /** Gap in spacing steps. @default 4 */
  gap?: SpaceStep;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  /** Renders a different element — `'ul'`, `'section'`, `'nav'`. @default 'div' */
  as?: ElementType;
  children?: ReactNode;
}

/**
 * Flex layout constrained to the spacing scale. It exists so that "space things
 * out" never turns into a hand-typed `margin: 13px` somewhere in a feature.
 */
export function Stack({
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap = false,
  as: Component = 'div',
  className,
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <Component
      {...rest}
      className={cx('sable-stack', className)}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      style={{ '--sable-stack-gap': `var(--sable-space-${gap})`, ...style } as CSSProperties}
    >
      {children}
    </Component>
  );
}
