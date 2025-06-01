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
      '2xl': 'p-6',
      '2xs': 'p-0.5',
      '3xl': 'p-7',
      lg: 'p-4',
      md: 'p-3',
      sm: 'p-2',
      xl: 'p-5',
      xs: 'p-1',
    },
  },
});
export const IconSizeVr = tv({
  base: 'w-6 h-6',
  variants: {
    size: {
      '2xl': 'w-9 h-9',
      '2xs': 'w-3 h-3',
      '3xl': 'w-10 h-10',
      lg: 'w-7 h-7',
      md: 'w-6 h-6',
      sm: 'w-5 h-5',
      xl: 'w-8 h-8',
      xs: 'w-4 h-4',
    },
  },
});

export default function Icon({ className, color = '#000', name, onPress, size = 'md', wrapper }: IconProps) {
  const [isPressded, setIsPressded] = useState(false);

  if (!onPress) {
    return <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} color={color} />;
  }

  return (
    <Pressable
      className={cn('rounded-full', wrapper && paddingVr({ size }), isPressded ? 'bg-dark/10' : 'bg-transparent')}
      onPressIn={() => setIsPressded(true)}
      onPressOut={() => setIsPressded(false)}
      onPress={onPress}
      android_ripple={{ color: 'transparent' }}
    >
      <CustomIcon name={name} className={cn(IconSizeVr({ size }), className)} color={color} />
    </Pressable>
  );
}
