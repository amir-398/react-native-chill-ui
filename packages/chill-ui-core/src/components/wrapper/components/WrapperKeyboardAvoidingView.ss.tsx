import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingViewPropsSs } from '@types';

import { customConsole, flattenStyle } from '@utils';

import { Wrapper } from './Wrapper.ss';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

// Optional import with error handling
let KeyboardAvoidingView: any;

try {
  // eslint-disable-next-line
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAvoidingView = keyboardController.KeyboardAvoidingView;
  }
} catch {
  customConsole.warn(
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
 *
 * // With SafeAreaView
 * <WrapperKeyboardAvoidingView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 *
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param keyboardVerticalOffset - Keyboard vertical offset
 * @param behavior - Behavior of the keyboard avoiding view
 * @param enabled - Whether the keyboard avoiding view is enabled
 * @param contentContainerStyle - Content container style (The style of the content container (View) when behavior is position.)
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperKeyboardAvoidingView(props: PropsWithChildren<WrapperKeyboardAvoidingViewPropsSs>) {
  const {
    children,
    edges,
    fill,
    grow,
    hasSafeArea,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    style,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    return (
      <Wrapper
        style={flattenStyle([wrapperSv({ fill, grow, px }), style])}
        hasSafeArea={hasSafeArea}
        edges={edges}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }

  const content = (
    <KeyboardAvoidingView
      style={[wrapperSv({ fill, grow, px }), style]}
      behavior={wrapperDefaultProps.behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );

  if (hasSafeArea) {
    return (
      <WrapperSafeAreaView edges={edges} px="none">
        {content}
      </WrapperSafeAreaView>
    );
  }

  return content;
}

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
