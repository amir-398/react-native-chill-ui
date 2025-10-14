import type { PropsWithChildren } from 'react';
import type { WrapperSafeAreaViewPropsTw } from '@types';

import { classNameHandler, classNamePropsHandler, cn, customConsole, styleHandler } from '@utils';

import { Wrapper } from './Wrapper.tw';
import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';

// Optional import with error handling
let SafeAreaView: any;

try {
  // eslint-disable-next-line
  const safeAreaContext = require('react-native-safe-area-context');
  if (safeAreaContext) {
    SafeAreaView = safeAreaContext.SafeAreaView;
  }
} catch {
  customConsole.error(
    'react-native-safe-area-context is not installed. To use WrapperSafeAreaView, please install it: npm install react-native-safe-area-context',
  );
}

/**
 * SafeAreaView wrapper component for handling safe areas.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView edges={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param edges - Safe area edges to apply
 * @param emulateUnlessSupported - Whether to emulate unless supported
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewPropsTw>) {
  classNamePropsHandler(props, 'WrapperSafeAreaView');
  const { children, className, fill, px, style, ...rest } = props;

  if (!SafeAreaView) {
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
    <SafeAreaView
      {...styleHandler({ defaultStyle: wrapperSv({ fill, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, px }), className))}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
