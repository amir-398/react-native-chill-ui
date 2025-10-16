import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingStickyViewPropsTw } from '@types';

import { cn, customConsole } from '@utils';

import { Wrapper } from './Wrapper.tw';
import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.tw';

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
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 *
 * // With SafeAreaView
 * <WrapperKeyboardAvoidingView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 * @param className - Custom CSS classes for the wrapper
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
export function WrapperKeyboardAvoidingStickyView(props: PropsWithChildren<WrapperKeyboardAvoidingStickyViewPropsTw>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  if (!KeyboardStickyView) {
    return (
      <Wrapper
        className={cn(wrapperTv({ fill, grow, px }), className)}
        hasSafeArea={hasSafeArea}
        edges={edges}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }

  const content = (
    <KeyboardStickyView className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
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
