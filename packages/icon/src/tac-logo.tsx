import { forwardRef } from 'react';
import type { SVGAttributes } from 'react';

const DEFAULT_INNER_FILL = 'var(--background, white)';

/** Props for the TacLogo SVG component. */
export interface TacLogoProps extends SVGAttributes<SVGSVGElement> {
  /** Width and height of the SVG in pixels (or any valid CSS length). Defaults to 24. */
  size?: number | string;
  /** Fill color for the inner shape. Defaults to var(--background, white). */
  innerFill?: string;
}

export const TacLogo = forwardRef<SVGSVGElement, TacLogoProps>(({ size = 24, className, innerFill, ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
    fill="currentColor"
    className={className}
    {...props}
  >
    <rect width="1024" height="1024" rx="224" />
    <path
      d="M280.243 328.138C228.115 277.568 265.607 192 339.893 192H600.48C707.762 192 787.371 287.047 763.86 387.064L664.003 811.864C661.236 823.635 650.297 832 637.671 832C507.329 832 406.708 722.484 423.586 598.991L434.873 516.411C437.787 495.088 430.26 473.67 414.467 458.349L280.243 328.138Z"
      fill={innerFill ?? DEFAULT_INNER_FILL}
    />
  </svg>
));
TacLogo.displayName = 'TacLogo';
