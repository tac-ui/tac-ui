import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

/** Props for the native TacLogo SVG component. */
export interface TacLogoProps {
  /** Width and height in pixels. @default 24 */
  size?: number;
  /** Fill color for the outer shape. @default '#000000' */
  color?: string;
  /** Fill color for the inner shape. @default '#FFFFFF' */
  innerFill?: string;
}

export function TacLogo({ size = 24, color = '#000000', innerFill = '#FFFFFF' }: TacLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none">
      <Rect width="1024" height="1024" rx="224" fill={color} />
      <Path
        d="M280.243 328.138C228.115 277.568 265.607 192 339.893 192H600.48C707.762 192 787.371 287.047 763.86 387.064L664.003 811.864C661.236 823.635 650.297 832 637.671 832C507.329 832 406.708 722.484 423.586 598.991L434.873 516.411C437.787 495.088 430.26 473.67 414.467 458.349L280.243 328.138Z"
        fill={innerFill}
      />
    </Svg>
  );
}
