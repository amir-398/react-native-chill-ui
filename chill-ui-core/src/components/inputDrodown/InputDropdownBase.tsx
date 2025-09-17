import { cn } from '@utils';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';

import { Box } from '../box';
import { Input } from '../inputs';
import { AnimatedBox } from '../animatedBox';
import { InputDropdownBaseProps } from '../../types/dropdown.types';

export default function InputDropdownBase({
  children,
  className,
  customSearchInput,
  hasAnimation = true,
  hasSearch,
  hasShadow,
  maxHeight,
  minHeight,
  searchInputProps,
  visible,
}: InputDropdownBaseProps) {
  // Animated value for height
  const animatedHeight = useRef(new Animated.Value(minHeight ?? 0)).current;

  useEffect(() => {
    if (visible && hasAnimation) {
      Animated.timing(animatedHeight, {
        duration: 200,
        toValue: maxHeight ?? 250,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, hasAnimation, maxHeight, minHeight, animatedHeight]);

  return (
    <AnimatedBox
      className={cn('elevation-lg w-full rounded-lg border border-[#E5E7EB] bg-white', className)}
      style={[
        {
          height: 'auto',
          maxHeight: hasAnimation ? animatedHeight : maxHeight,
          minHeight,
        },
        hasShadow && {
          shadowColor: '#000',
          shadowOffset: {
            height: 1,
            width: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        },
      ]}
    >
      {hasSearch &&
        (customSearchInput ?? (
          <Box className="px-3 py-2">
            <Input size="xs" placeholder="search" {...searchInputProps} />
          </Box>
        ))}
      {children}
    </AnimatedBox>
  );
}
