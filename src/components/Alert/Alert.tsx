import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { IconButton } from '../IconButton/IconButton';
import { CloseIcon, DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../internal/icons';
import './Alert.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** @default 'info' */
  tone?: AlertTone;
  title?: ReactNode;
  /** Replaces the tone's default icon. Pass `null` to drop it. */
  icon?: ReactNode | null;
  /** Renders a dismiss button. */
  onDismiss?: () => void;
  /** @default 'Dismiss' */
  dismissLabel?: string;
  /** Trailing actions — buttons, links. */
  actions?: ReactNode;
  children?: ReactNode;
}

const toneIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

/**
 * An inline message about the page or a task.
 *
 * `warning` and `danger` render as `role="alert"`, which interrupts a screen
 * reader; the quieter tones use `role="status"` and wait their turn.
 */
export function Alert({
  tone = 'info',
  title,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  actions,
  className,
  children,
  ...rest
}: AlertProps) {
  const ToneIcon = toneIcons[tone];

  return (
    <div
      {...rest}
      className={cx('sable-alert', className)}
      data-tone={tone}
      role={tone === 'warning' || tone === 'danger' ? 'alert' : 'status'}
    >
      {icon !== null && (
        <span className="sable-alert__icon" aria-hidden="true">
          {icon ?? <ToneIcon />}
        </span>
      )}
      <div className="sable-alert__content">
        {title && <p className="sable-alert__title">{title}</p>}
        {children && <div className="sable-alert__body">{children}</div>}
        {actions && <div className="sable-alert__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <IconButton
          className="sable-alert__dismiss"
          icon={<CloseIcon />}
          label={dismissLabel}
          size="sm"
          variant="ghost"
          tone="neutral"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
