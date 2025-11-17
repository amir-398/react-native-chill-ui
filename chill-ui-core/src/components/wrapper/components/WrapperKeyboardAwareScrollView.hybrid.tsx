import type { PropsWithChildren } from 'react';

import { WrapperKeyboardAwareScrollViewPropsTw } from '@types';
import { classNameHandler, cn, customConsole, styleHandler } from '@utils';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
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
 * The `<WrapperKeyboardAwareScrollView />` component provides a KeyboardAwareScrollView wrapper for better keyboard handling.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperKeyboardAwareScrollView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAwareScrollView bottomOffset={20}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 * ```
 *
 * @param bottomOffset - Bottom offset for keyboard (default: `20`)
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide (default: `false`)
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param enabled - Whether the keyboard aware scroll view is enabled (default: `true`)
 * @param extraKeyboardSpace - Extra keyboard space (default: `0`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
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
    style,
    ...rest
  } = props;

  if (!KeyboardAwareScrollView) {
    return (
      <WrapperScrollView
        {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
        {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
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
      {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
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
