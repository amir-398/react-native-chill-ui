import type { PropsWithChildren } from 'react';

import { cn, customConsole } from '@utils';
import { WrapperKeyboardAwareScrollViewPropsTw } from '@types';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { WrapperScrollView } from './WrapperScrollView.tw';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.tw';

let KeyboardAwareScrollView: any;

try {
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAwareScrollView = keyboardController.KeyboardAwareScrollView;
  }
} catch {
  customConsole.error(
    'react-native-keyboard-controller is not installed. To use WrapperKeyboardAwareScrollView, please install it: npm install react-native-keyboard-controller and wrap your app with KeyboardProvider',
  );
}

/**
 * KeyboardAwareScrollView wrapper component for better keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAwareScrollView bottomOffset={20}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 *
 * // With SafeAreaView
 * <WrapperKeyboardAwareScrollView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param style - Style prop
 * @param bottomOffset - Bottom offset for keyboard
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide
 * @param enabled - Whether the keyboard aware scroll view is enabled
 * @param extraKeyboardSpace - Extra keyboard space
 * @param children - Child components to render
 */
export function WrapperKeyboardAwareScrollView(props: PropsWithChildren<WrapperKeyboardAwareScrollViewPropsTw>) {
  const {
    bottomOffset = wrapperDefaultProps.bottomOffset,
    children,
    className,
    edges,
    fill,
    grow,
    hasSafeArea,
    px,
    ...rest
  } = props;

  if (!KeyboardAwareScrollView) {
    return (
      <WrapperScrollView
        className={cn(wrapperTv({ fill, grow, px }), className)}
        hasSafeArea={hasSafeArea}
        edges={edges}
        {...rest}
      >
        {children}
      </WrapperScrollView>
    );
  }

  const content = (
    <KeyboardAwareScrollView
      className={cn(wrapperTv({ fill, grow, px }), className)}
      bottomOffset={bottomOffset}
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
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

WrapperKeyboardAwareScrollView.displayName = 'WrapperKeyboardAwareScrollView';
