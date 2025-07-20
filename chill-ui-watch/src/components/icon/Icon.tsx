import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { Pressable } from 'react-native';

import type { IconProps } from '../../types';

import cn from '../cn';
import CustomIcon from './CustomIcon';

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
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon name="bell-solid" size="md" color="#000" />
 *
 * // Clickable icon with press effect
 * <Icon
 *   name="star-solid"
 *   size="lg"
 *   color="#FFD700"
 *   onPress={() => console.log('Icon pressed')}
 *   hasPressEffect={true}
 * />
 *
 * // Custom press effect
 * <Icon
 *   name="heart-solid"
 *   size="md"
 *   color="#FF6B6B"
 *   onPress={handleLike}
 *   pressEffectClassName="bg-red-100"
 * />
 * ```
 *
 * @param name - Icon name from the available icon set
 * @param size - Icon size variant (default: 'md')
 * @param color - Icon color (default: '#000')
 * @param onPress - Callback function when icon is pressed
 * @param hasPressEffect - Whether to show press effect (default: true)
 * @param pressEffectClassName - Custom CSS classes for press effect
 * @param pressEffectSize - Size of press effect padding
 * @param className - Custom CSS classes for the icon
 */
export default function Icon({
  className,
  color = '#000',
  hasPressEffect = true,
  name,
  onPress,
  pressEffectClassName = 'bg-dark/10',
  pressEffectSize,
  size = 'md',
}: IconProps) {
  const [isPressded, setIsPressded] = useState(false);

  if (!onPress) {
    return <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} color={color} />;
  }

  return (
    <Pressable
      className={cn(
        'rounded-full',
        hasPressEffect && paddingVr({ size: pressEffectSize || size }),
        isPressded ? pressEffectClassName : 'bg-transparent',
      )}
      onPressIn={() => setIsPressded(true)}
      onPressOut={() => setIsPressded(false)}
      onPress={onPress}
      android_ripple={{ color: 'transparent' }}
    >
      <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} color={color} />
    </Pressable>
  );
}
