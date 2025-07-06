import type { ReactElement } from 'react';
import type { TextProps as NativeTextProps } from 'react-native';

import { createElement } from 'react';
import { cssInterop } from 'nativewind';
import { Animated, Text as NativeText } from 'react-native';

export interface TextProps extends NativeTextProps {
  onPress?: () => void;
  useFastText?: boolean;
}

export type FastTextProps = Omit<
  TextProps,
  'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'pressRetentionOffset'
>;
export function FastText(props: FastTextProps): ReactElement {
  return createElement('RCTText', props);
}

export function Text(props: TextProps) {
  const { children, onPress, useFastText = true } = props;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  if (onPress) {
    return (
      <NativeText {...props} onPress={handlePress}>
        {children}
      </NativeText>
    );
  }

  if (useFastText === false) {
    return <NativeText {...props}>{children}</NativeText>;
  }

  return <FastText {...props}>{children}</FastText>;
}

cssInterop(Text, {
  className: {
    target: 'style', // map className->style
  },
});

export const AnimatedText = Animated.createAnimatedComponent(FastText);

cssInterop(AnimatedText, {
  className: {
    target: 'style', // map className->style
  },
});
