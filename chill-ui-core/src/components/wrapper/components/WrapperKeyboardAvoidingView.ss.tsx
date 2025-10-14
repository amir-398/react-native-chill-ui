import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingViewPropsSs } from '@types';

import { Wrapper } from './Wrapper.ss';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
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
 *
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param keyboardVerticalOffset - Keyboard vertical offset
 * @param behavior - Behavior of the keyboard avoiding view
 * @param enabled - Whether the keyboard avoiding view is enabled
 * @param contentContainerStyle - Content container style
 * @param children - Child components to render
 */
export function WrapperKeyboardAvoidingView(props: PropsWithChildren<WrapperKeyboardAvoidingViewPropsSs>) {
  const {
    children,
    fill,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    style,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use WrapperKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
    );
    return (
      <Wrapper style={[wrapperSv({ fill, px }), style]} {...rest}>
        {children}
      </Wrapper>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[wrapperSv({ fill, px }), style]}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
