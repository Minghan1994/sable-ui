import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonTone = 'accent' | 'neutral' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** How much visual weight the button carries. @default 'solid' */
  variant?: ButtonVariant;
  /** What the action means. @default 'accent' */
  tone?: ButtonTone;
  /** @default 'md' */
  size?: ButtonSize;
  /** Swaps the label for a spinner and blocks interaction, without changing the button's width. */
  loading?: boolean;
  /** Announced while `loading`. @default 'Loading' */
  loadingLabel?: string;
  fullWidth?: boolean;
  /** Decorative leading element. Hidden from assistive tech. */
  startIcon?: ReactNode;
  /** Decorative trailing element. Hidden from assistive tech. */
  endIcon?: ReactNode;
}

/**
 * The workhorse action. `variant` and `tone` are independent: `tone` picks the
 * palette, `variant` decides how loudly to use it, so all twelve combinations
 * stay coherent without twelve sets of rules.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    tone = 'accent',
    size = 'md',
    loading = false,
    loadingLabel = 'Loading',
    fullWidth = false,
    startIcon,
    endIcon,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx('sable-button', className)}
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-loading={loading || undefined}
      data-full-width={fullWidth || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      <span className="sable-button__content">
        {startIcon && (
          <span className="sable-button__icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && (
          <span className="sable-button__icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </span>
      {loading && (
        <span className="sable-button__loader">
          <Spinner size={size === 'lg' ? 'md' : 'sm'} label={loadingLabel} />
        </span>
      )}
    </button>
  );
});
