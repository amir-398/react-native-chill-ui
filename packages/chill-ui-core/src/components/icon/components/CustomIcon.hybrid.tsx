import { ICONS } from '@constants';
import Svg, { Path, type SvgProps } from 'react-native-svg';

import { useIconContext, type IconConfig } from '../context/IconContext';
import { isNativeWindInstalled } from '../../../utils/hybrid/nativewindDetector';

type CustomIconProps<T extends IconConfig = typeof ICONS> = {
  name: keyof T;
  color?: string;
  className?: string;
} & SvgProps;

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
export default function CustomIcon<T extends IconConfig = typeof ICONS>({
  className,
  color = '#fff',
  name,
  style,
  ...props
}: CustomIconProps<T>) {
  const isNativeWind = isNativeWindInstalled();
  const { icons } = useIconContext<T>();
  const viewBox = icons?.[name as string]?.viewBox ?? ICONS[name as keyof typeof ICONS]?.viewBox;
  const path = icons?.[name as string]?.path ?? ICONS[name as keyof typeof ICONS]?.path;

  const svgProps = {
    ...(isNativeWind && { className: className || '' }),
    color,
    focusable: false,
    style,
    viewBox,
    ...props,
  };

  return (
    <Svg {...svgProps}>
      {path?.map((d: string, index: number) => (
        <Path key={index} d={d} fill={color} />
      ))}
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
