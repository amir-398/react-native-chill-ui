import { Animated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import cn from '../../../cn';
import { Position } from '../types';
import { AnimatedBox } from '../../../box';

interface DropdownModalProps {
  visible: boolean;
  maxHeight: number;
  minHeight: number;
  position: Position;
  className?: string;
  hasShadow?: boolean;
  withAnimation: boolean;
  children: React.ReactNode;
}

export default function DropdownModal({
  children,
  className,
  hasShadow,
  maxHeight,
  minHeight,
  position,
  visible,
  withAnimation = true,
}: DropdownModalProps) {
  // Animated value for height
  const animatedHeight = useRef(new Animated.Value(minHeight)).current;

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

  if (!visible || !position) return null;

  const { bottom, height, top, width } = position;

  if (!width || !top || !bottom) return null;

  return (
    <View style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }} pointerEvents="box-none">
      <AnimatedBox
        className={cn('elevation-lg absolute z-50 rounded-lg border border-[#E5E7EB] bg-white', className)}
        style={[
          {
            height: withAnimation ? animatedHeight : maxHeight,
            top: height,
            width,
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
        {children}
      </AnimatedBox>
    </View>
  );
}
