import type { PropsWithChildren } from 'react';
import type { WrapperKeyboardAvoidingStickyViewPropsSs } from '@types';

import { customConsole, flattenStyle } from '@utils';

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
    'react-native-keyboard-controller is not installed. To use WrapperKeyboardAvoidingStickyView, please install it: npm install react-native-keyboard-controller',
  );
}

/**
 * The `<WrapperKeyboardAvoidingStickyView />` component provides a KeyboardStickyView wrapper for keyboard avoidance with sticky behavior.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperKeyboardAvoidingStickyView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingStickyView>
 * ```
 *
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param offset - Offset for the keyboard avoiding sticky view: `{ close: number; open: number }`
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperKeyboardAvoidingStickyView(props: PropsWithChildren<WrapperKeyboardAvoidingStickyViewPropsSs>) {
  const { children, edges, fill, grow, hasSafeArea, offset, px, style, ...rest } = props;

  if (!KeyboardStickyView) {
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
