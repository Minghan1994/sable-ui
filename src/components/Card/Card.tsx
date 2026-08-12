import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'outline' */
  variant?: 'outline' | 'elevated' | 'filled';
  /** Inner padding, in spacing steps. @default 5 */
  padding?: 0 | 3 | 4 | 5 | 6 | 8;
  /** Adds hover/active affordances. Use with a real interactive child, not on its own. */
  interactive?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

/** A surface that groups related content. */
export function Card({
  variant = 'outline',
  padding = 5,
  interactive = false,
  as: Component = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      {...rest}
      className={cx('sable-card', className)}
      data-variant={variant}
      data-padding={padding}
      data-interactive={interactive || undefined}
    >
      {children}
    </Component>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function CardHeader({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('sable-card__header', className)}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Pick the heading level that fits the page outline. @default 'h3' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}

export function CardTitle({ as: Component = 'h3', className, children, ...rest }: CardTitleProps) {
  return (
    <Component {...rest} className={cx('sable-card__title', className)}>
      {children}
    </Component>
  );
}

export function CardDescription({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} className={cx('sable-card__description', className)}>
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('sable-card__body', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: CardSectionProps) {
  return (
    <div {...rest} className={cx('sable-card__footer', className)}>
      {children}
    </div>
  );
}
