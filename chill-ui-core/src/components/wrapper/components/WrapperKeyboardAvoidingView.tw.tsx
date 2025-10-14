import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingViewPropsTw } from '@types';

import { cn } from '@utils';

import { Wrapper } from './Wrapper.tw';
import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';

// Optional import with error handling
let KeyboardAvoidingView: any;

try {
  // eslint-disable-next-line
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAvoidingView = keyboardController.KeyboardAvoidingView;
  }
} catch {
  console.warn(
    'react-native-keyboard-controller is not installed. To use WrapperKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
  );
}

/**
 * KeyboardAvoidingView wrapper component for keyboard avoidance.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 * @param className - Custom CSS classes for the wrapper
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param keyboardVerticalOffset - Keyboard vertical offset
 * @param behavior - Behavior of the keyboard avoiding view
 * @param enabled - Whether the keyboard avoiding view is enabled
 * @param contentContainerStyle - Content container style
 * @param children - Child components to render
 */
export function WrapperKeyboardAvoidingView(props: PropsWithChildren<WrapperKeyboardAvoidingViewPropsTw>) {
  const {
    children,
    className,
    fill,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use WrapperKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
    );
    return (
      <Wrapper className={cn(wrapperTv({ fill, px }), className)} {...rest}>
        {children}
      </Wrapper>
    );
  }

  return (
    <KeyboardAvoidingView
      className={cn(wrapperTv({ fill, px }), className)}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
