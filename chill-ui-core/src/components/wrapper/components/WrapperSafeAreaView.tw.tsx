import type { PropsWithChildren } from 'react';
import type { WrapperSafeAreaViewPropsTw } from '@types';

import { BoxTw } from '@components/box';
import { cn, customConsole } from '@utils';

import { wrapperTv } from '../styles/Wrapper.tw.styles';

let SafeAreaView: any;

try {
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
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView edges={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param edges - Safe area edges to apply
 * @param emulateUnlessSupported - Whether to emulate unless supported
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewPropsTw>) {
  const { children, className, fill, grow, px, ...rest } = props;

  if (!SafeAreaView) {
    return (
      <BoxTw className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
        {children}
      </BoxTw>
    );
  }
  return (
    <SafeAreaView className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
      {children}
    </SafeAreaView>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
