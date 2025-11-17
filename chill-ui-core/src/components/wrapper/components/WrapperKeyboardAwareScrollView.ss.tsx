import type { PropsWithChildren } from 'react';

import { customConsole } from '@utils';
import { WrapperKeyboardAwareScrollViewPropsSs } from '@types';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperScrollView } from './WrapperScrollView.ss';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

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
 *
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param bottomOffset - Bottom offset for keyboard
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide
 * @param enabled - Whether the keyboard aware scroll view is enabled
 * @param extraKeyboardSpace - Extra keyboard space
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperKeyboardAwareScrollView(props: PropsWithChildren<WrapperKeyboardAwareScrollViewPropsSs>) {
  const {
    bottomOffset = wrapperDefaultProps.bottomOffset,
    children,
    edges,
    fill,
    grow,
    hasSafeArea,
    px,
    style,
    ...rest
  } = props;

  if (!KeyboardAwareScrollView) {
    return (
      <WrapperScrollView
        style={[wrapperSv({ fill, grow, px }), style]}
        hasSafeArea={hasSafeArea}
        edges={edges}
        {...rest}
      >
        {children}
      </WrapperScrollView>
    );
  }

  const content = (
    <KeyboardAwareScrollView style={[wrapperSv({ fill, grow, px }), style]} bottomOffset={bottomOffset} {...rest}>
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
