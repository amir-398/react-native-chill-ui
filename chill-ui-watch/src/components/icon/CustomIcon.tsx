import type { SvgProps } from 'react-native-svg';

import Svg, { Path } from 'react-native-svg';

import { ICONS, type TIcons } from '../../constants/ICONS';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';

export type IconProps = {
  name: keyof TIcons;
  color?: string;
  className?: string;
} & SvgProps;

/**
 * Creates StyleSheet styles for CustomIcon when NativeWind is not available
 */
const createIconStyles = () => ({
  base: {
    // Base styles for icon
  },
});

/**
 * CustomIcon component that renders SVG icons with customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <CustomIcon name="star" className="w-6 h-6 text-yellow-500" />
 *
 * // Without NativeWind (fallback)
 * <CustomIcon name="star" style={{ width: 24, height: 24 }} color="#F59E0B" />
 * ```
 */
export default function CustomIcon({ className, color = '#fff', name, style, ...props }: IconProps) {
  const viewBox = ICONS[name]?.viewBox;

  if (isNativeWindInstalled()) {
    const svgProps = {
      className: className || '',
      color,
      focusable: false,
      style,
      viewBox,
      ...props,
    };

    return (
      <Svg {...svgProps}>
        {ICONS[name]?.path.map((d: string, index: number) => <Path key={index} d={d} fill={color} />)}
      </Svg>
    );
  }

  // Fallback to StyleSheet when NativeWind is not available
  const styles = createIconStyles();
  const svgProps = {
    color,
    focusable: false,
    style: [styles.base, style],
    viewBox,
    ...props,
  };

  return (
    <Svg {...svgProps}>
      {ICONS[name]?.path.map((d: string, index: number) => <Path key={index} d={d} fill={color} />)}
    </Svg>
  );
}

// Only apply cssInterop if NativeWind is available
if (isNativeWindInstalled()) {
  try {
    const { cssInterop } = require('nativewind');

    cssInterop(Svg, {
      className: {
        target: 'style',
      },
    });
  } catch {
    // NativeWind is not available, skip cssInterop
  }
}
