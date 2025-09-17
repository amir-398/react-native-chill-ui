import { cn } from '@utils';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { Pressable, TouchableOpacity } from 'react-native';

import type { IconProps } from '../../types/icon.types';

import styles from './Icon.style';
import CustomIcon from './CustomIcon';
import { RipplePressable } from '../ripplePressable';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

// padding  variant
export const paddingVr = tv({
  base: 'p-0',
  variants: {
    size: {
      '2xl': 'p-5',
      '2xs': 'p-[1px]',
      '3xl': 'p-6',
      lg: 'p-3',
      md: 'p-2',
      sm: 'p-1.5',
      xl: 'p-4',
      xs: 'p-0.5',
    },
  },
});
export const IconSizeVr = tv({
  base: 'size-6',
  variants: {
    size: {
      '2xl': 'size-9',
      '2xs': 'size-3',
      '3xl': 'size-10',
      lg: 'size-7',
      md: 'size-6',
      sm: 'size-5',
      xl: 'size-8',
      xs: 'size-4',
    },
  },
});

/**
 * Icon component that displays SVG icons with customizable size, color, and press interactions.
 * Supports both static and interactive icons with press effects.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind - Basic icon
 * <Icon name="bell-solid" size="md" color="#000" />
 *
 * // With NativeWind - Clickable icon with press effect
 * <Icon
 *   name="star-solid"
 *   size="lg"
 *   color="#FFD700"
 *   onPress={() => console.log('Icon pressed')}
 *   hasPressEffect={true}
 * />
 *
 * // With NativeWind - Custom press effect
 * <Icon
 *   name="heart-solid"
 *   size="md"
 *   color="#FF6B6B"
 *   onPress={handleLike}
 *   pressEffectClassName="bg-red-100"
 * />
 *
 * // Without NativeWind (fallback) - Basic icon
 * <Icon name="bell-solid" size="md" color="#000" />
 *
 * // Without NativeWind (fallback) - Clickable icon
 * <Icon
 *   name="star-solid"
 *   size="lg"
 *   color="#FFD700"
 *   onPress={() => console.log('Icon pressed')}
 *   hasPressEffect={true}
 *   style={{ backgroundColor: '#f3f4f6' }}
 * />
 * ```
 *
 * @param name - Icon name from the available icon set
 * @param size - Icon size variant (default: 'md')
 * @param color - Icon color (default: '#000')
 * @param onPress - Callback function when icon is pressed
 * @param hasPressEffect - Whether to show press effect (default: true)
 * @param pressEffectClassName - Custom CSS classes for press effect (NativeWind only)
 * @param pressEffectSize - Size of press effect padding
 * @param className - Custom CSS classes for the icon (NativeWind only)
 * @param style - Inline styles for fallback without NativeWind
 */
export default function Icon(props: IconProps) {
  classNamePropsHandler(props, 'Icon');
  const {
    as,
    className,
    color = '#000',
    hasPressEffect = true,
    name,
    onPress,
    pressEffectClassName = 'bg-dark/10',
    pressEffectSize,
    size = 'md',
    style,
    ...rest
  } = props;
  const [isPressed, setIsPressed] = useState(false);

  if (!onPress) {
    if (isNativeWindInstalled()) {
      return <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} color={color} />;
    }

    const iconSizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    return <CustomIcon name={name} style={[styles.base, iconSizeStyle, style]} color={color} />;
  }

  if (isNativeWindInstalled()) {
    return (
      <Pressable
        // @ts-ignore
        className={cn(
          'rounded-full',
          hasPressEffect && paddingVr({ size: pressEffectSize || size }),
          isPressed ? pressEffectClassName : 'bg-transparent',
        )}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={onPress}
        {...rest}
      >
        <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} style={style} color={color} />
      </Pressable>
    );
  }

  const iconSizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
  const paddingStyle = hasPressEffect
    ? styles[
        `padding${(pressEffectSize || size).charAt(0).toUpperCase() + (pressEffectSize || size).slice(1)}` as keyof typeof styles
      ]
    : null;

  const pressEffectStyle = ({ pressed }: { pressed: boolean }) =>
    pressed && hasPressEffect ? styles.pressEffectDefault : styles.transparent;

  switch (as) {
    case 'Pressable':
      return (
        <Pressable
          style={({ pressed }) => [
            styles.pressableBase,
            styles.pressableContainer,
            paddingStyle,
            pressEffectStyle({ pressed }),
            style,
          ]}
          onPress={onPress}
          {...rest}
        >
          <CustomIcon name={name} style={[styles.base, iconSizeStyle]} color={color} />
        </Pressable>
      );

    case 'RipplePressable':
      return (
        <RipplePressable onPress={onPress} {...rest}>
          <CustomIcon name={name} style={[styles.base, iconSizeStyle]} color={color} />
        </RipplePressable>
      );

    default:
      return (
        <TouchableOpacity onPress={onPress} style={styles.pressableBase} {...rest}>
          <CustomIcon name={name} style={[styles.base, iconSizeStyle]} color={color} />
        </TouchableOpacity>
      );
  }
}
