import { type HTMLAttributes, type ReactNode, useState } from 'react';
import { cx } from '../../utils/cx';
import './Avatar.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials if it is missing or fails to load. */
  src?: string;
  /** The person or thing shown. Used for the image's alt text and the initials. */
  name: string;
  /** @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** @default 'circle' */
  shape?: 'circle' | 'rounded';
  /** Replaces the initials — an icon, for example. */
  fallback?: ReactNode;
}

/** First letter of the first and last word: "Ada Lovelace" -> "AL". */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words.at(-1)?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

/** A person or entity, as an image with an initials fallback. */
export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  fallback,
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span {...rest} className={cx('sable-avatar', className)} data-size={size} data-shape={shape}>
      {showImage ? (
        <img className="sable-avatar__image" src={src} alt={name} onError={() => setFailed(true)} />
      ) : (
        // The name is already available to assistive tech through `title`/context,
        // so the visual fallback stays decorative rather than reading twice.
        <span className="sable-avatar__fallback" aria-hidden="true">
          {fallback ?? initialsOf(name)}
        </span>
      )}
      {!showImage && <span className="sable-visually-hidden">{name}</span>}
    </span>
  );
}
