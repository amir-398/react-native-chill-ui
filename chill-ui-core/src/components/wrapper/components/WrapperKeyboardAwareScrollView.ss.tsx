import type { PropsWithChildren } from 'react';

import { customConsole } from '@utils';
import { WrapperKeyboardAwareScrollViewPropsSs } from '@types';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperScrollView } from './WrapperScrollView.ss';
import { wrapperDefaultProps } from '../utils/defaultProps';

// Optional import with error handling
let KeyboardAwareScrollView: any;

try {
  // eslint-disable-next-line
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAwareScrollView = keyboardController.KeyboardAwareScrollView;
  }
} catch {
  customConsole.error(
    'react-native-keyboard-controller is not installed. To use WrapperKeyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
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
 * ```
 *
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param bottomOffset - Bottom offset for keyboard
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide
 * @param enabled - Whether the keyboard aware scroll view is enabled
 * @param extraKeyboardSpace - Extra keyboard space
 * @param children - Child components to render
 */
export function WrapperKeyboardAwareScrollView(props: PropsWithChildren<WrapperKeyboardAwareScrollViewPropsSs>) {
  const { bottomOffset = wrapperDefaultProps.bottomOffset, children, fill, px, style, ...rest } = props;

  if (!KeyboardAwareScrollView) {
    return (
      <WrapperScrollView style={[wrapperSv({ fill, px }), style]} {...rest}>
        {children}
      </WrapperScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView style={[wrapperSv({ fill, px }), style]} bottomOffset={bottomOffset} {...rest}>
      {children}
    </KeyboardAwareScrollView>
  );
}

WrapperKeyboardAwareScrollView.displayName = 'WrapperKeyboardAwareScrollView';
