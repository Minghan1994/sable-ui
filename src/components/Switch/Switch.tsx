import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'role'> {
  label?: ReactNode;
  description?: ReactNode;
  /** @default 'md' */
  size?: 'sm' | 'md';
  wrapperClassName?: string;
}

/**
 * An on/off toggle that takes effect immediately — if the change only applies
 * after a Save button, use a `Checkbox` instead.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, size = 'md', wrapperClassName, className, id, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const controlId = id ?? `sable-switch-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;

  return (
    <div
      className={cx('sable-switch', wrapperClassName)}
      data-size={size}
      data-disabled={disabled ? '' : undefined}
    >
      <span className="sable-switch__control">
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          // biome-ignore lint/a11y/useAriaPropsForRole: `aria-checked` is supplied by the host language — a checkbox already exposes its checked state — so setting it by hand would only risk the two disagreeing.
          role="switch"
          id={controlId}
          disabled={disabled}
          aria-describedby={descriptionId}
          className={cx('sable-switch__input', className)}
        />
        <span className="sable-switch__track" aria-hidden="true">
          <span className="sable-switch__thumb" />
        </span>
      </span>
      {(label || description) && (
        <span className="sable-switch__body">
          {label && (
            <label className="sable-switch__label" htmlFor={controlId}>
              {label}
            </label>
          )}
          {description && (
            <span className="sable-switch__description" id={descriptionId}>
              {description}
            </span>
          )}
        </span>
      )}
    </div>
  );
});
