import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';

import cn from '../cn';
import Input from '../inputs';
import { AnimatedBox, Box } from '../box';
import { InputDropdownBaseProps } from '../../types';

export default function InputDropdownBase({
  children,
  className,
  hasSearch,
  hasShadow,
  maxHeight,
  minHeight,
  searchInputProps,
  visible,
  withAnimation = true,
}: InputDropdownBaseProps) {
  // Animated value for height
  const animatedHeight = useRef(new Animated.Value(minHeight ?? 0)).current;

  useEffect(() => {
    if (visible && withAnimation) {
      Animated.timing(animatedHeight, {
        duration: 200,
        toValue: maxHeight ?? 250,
        useNativeDriver: false,
      }).start();
    } else if (!visible && withAnimation) {
      Animated.timing(animatedHeight, {
        duration: 200,
        toValue: minHeight ?? 0,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, withAnimation, maxHeight, minHeight, animatedHeight]);

  return (
    <AnimatedBox
      className={cn('elevation-lg w-full rounded-lg border border-[#E5E7EB] bg-white', className)}
      style={[
        {
          height: 'auto',
          maxHeight: withAnimation ? animatedHeight : maxHeight,
          minHeight: withAnimation ? animatedHeight : minHeight,
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
      {hasSearch && (
        <Box className="px-3 py-2">
          <Input size="xs" {...searchInputProps} />
        </Box>
      )}
      {children}
    </AnimatedBox>
  );
}
