import type { SVGProps } from 'react';

/**
 * The handful of glyphs the components draw themselves. Intentionally not
 * exported from the package: a design system should not also be an icon set.
 * Everything here is decorative and stroked with `currentColor`.
 */
function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </Glyph>
);

export const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <path d="M5 12h14" />
  </Glyph>
);

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Glyph>
);

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Glyph>
);

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11.5v5M12 7.75h.01" />
  </Glyph>
);

export const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <path d="M12 3.8 2.4 20.2h19.2z" />
    <path d="M12 9.5v4.5M12 17.25h.01" />
  </Glyph>
);

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.2 2.8 2.8L16 9.8" />
  </Glyph>
);

export const DangerIcon = (props: SVGProps<SVGSVGElement>) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.25h.01" />
  </Glyph>
);
