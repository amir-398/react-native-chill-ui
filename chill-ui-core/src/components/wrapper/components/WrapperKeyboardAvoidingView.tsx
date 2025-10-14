import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingViewPropsTw } from '@types';

import { classNameHandler, classNamePropsHandler, cn, customConsole, styleHandler } from '@utils';

import { Wrapper } from './Wrapper.tw';
import { wrapperTv } from '../styles/Wrapper.tw.styles';
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
  customConsole.error(
    'react-native-keyboard-controller is not installed. To use WrapperKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
  );
}

/**
 * KeyboardAvoidingView wrapper component for keyboard avoidance.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
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
  classNamePropsHandler(props, 'WrapperKeyboardAvoidingView');
  const {
    children,
    className,
    fill,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    style,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    return (
      <Wrapper
        {...styleHandler({ defaultStyle: wrapperSv({ fill, px }), style })}
        {...classNameHandler(cn(wrapperTv({ fill, px }), className))}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }

  return (
    <KeyboardAvoidingView
      {...styleHandler({ defaultStyle: wrapperSv({ fill, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, px }), className))}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
