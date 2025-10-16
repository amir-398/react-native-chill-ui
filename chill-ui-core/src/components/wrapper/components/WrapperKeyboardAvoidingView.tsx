import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingViewPropsTw } from '@types';

import { classNameHandler, cn, customConsole, styleHandler } from '@utils';

import { Wrapper } from './Wrapper';
import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';

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
 * The `<WrapperKeyboardAvoidingView />` component provides a KeyboardAvoidingView wrapper for keyboard avoidance.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperKeyboardAvoidingView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 *
 * @param behavior - Behavior of the keyboard avoiding view: `'height'` | `'position'` | `'padding'` | `'translate-with-padding'` (default: `'padding'`)
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param contentContainerStyle - Content container style when behavior is position
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param enabled - Whether the keyboard avoiding view is enabled (default: `true`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param keyboardVerticalOffset - Keyboard vertical offset (default: `0`)
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'2xl'` | `'3xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperKeyboardAvoidingView(props: PropsWithChildren<WrapperKeyboardAvoidingViewPropsTw>) {
  const {
    children,
    className,
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
        {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
        {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
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
      {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
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
