import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingStickyViewPropsSs } from '@types';

import { customConsole } from '@utils';

import { Wrapper } from './Wrapper.ss';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

// Optional import with error handling
let KeyboardStickyView: any;

try {
  // eslint-disable-next-line
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardStickyView = keyboardController.KeyboardStickyView;
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
 * <WrapperKeyboardAvoidingStickyView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingStickyView>
 *
 * // With SafeAreaView
 * <WrapperKeyboardAvoidingStickyView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingStickyView>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param style - Style prop
 * @param enabled - Whether the keyboard avoiding view is enabled
 * @param offset - Offset for the keyboard avoiding sticky view { close: number; open: number }
 * @param children - Child components to render
 */
export function WrapperKeyboardAvoidingStickyView(props: PropsWithChildren<WrapperKeyboardAvoidingStickyViewPropsSs>) {
  const { children, edges, fill, grow, hasSafeArea, offset, px, style, ...rest } = props;

  if (!KeyboardStickyView) {
    return (
      <Wrapper style={[wrapperSv({ fill, grow, px }), style]} hasSafeArea={hasSafeArea} edges={edges} {...rest}>
        {children}
      </Wrapper>
    );
  }

  const content = (
    <KeyboardStickyView style={[wrapperSv({ fill, grow, px }), style]} offset={offset} {...rest}>
      {children}
    </KeyboardStickyView>
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

WrapperKeyboardAvoidingStickyView.displayName = 'WrapperKeyboardAvoidingStickyView';
