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
