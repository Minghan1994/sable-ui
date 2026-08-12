import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ButtonSize, ButtonTone, ButtonVariant } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import '../Button/Button.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> {
  /** The icon to render. Sized by the button, hidden from assistive tech. */
  icon: ReactNode;
  /** Required: an icon alone tells a screen reader nothing. Becomes the accessible name. */
  label: string;
  /** @default 'ghost' */
  variant?: ButtonVariant;
  /** @default 'neutral' */
  tone?: ButtonTone;
  /** @default 'md' */
  size?: ButtonSize;
  loading?: boolean;
  /** Renders a circular target instead of a rounded square. */
  round?: boolean;
}

/** A square, label-less button. Shares every visual rule with `Button`. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    label,
    variant = 'ghost',
    tone = 'neutral',
    size = 'md',
    loading = false,
    round = false,
    disabled,
    type = 'button',
    className,
    style,
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
      data-icon-only=""
      data-loading={loading || undefined}
      disabled={disabled || loading}
      aria-label={label}
      aria-busy={loading || undefined}
      style={round ? { borderRadius: 'var(--sable-radius-full)', ...style } : style}
    >
      <span className="sable-button__content">
        <span className="sable-button__icon" aria-hidden="true">
          {icon}
        </span>
      </span>
      {loading && (
        <span className="sable-button__loader">
          <Spinner size={size === 'lg' ? 'md' : 'sm'} label={null} />
        </span>
      )}
    </button>
  );
});
