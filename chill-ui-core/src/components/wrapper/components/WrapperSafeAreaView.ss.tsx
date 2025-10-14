import type { PropsWithChildren } from 'react';
import type { WrapperSafeAreaViewPropsSs } from '@types';

import { customConsole } from '@utils';

import { Wrapper } from './Wrapper.ss';
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
  console.warn(
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
 *
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param edges - Safe area edges to apply
 * @param emulateUnlessSupported - Whether to emulate unless supported
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewPropsSs>) {
  const { children, fill, px, style, ...rest } = props;

  if (!SafeAreaView) {
    customConsole.error(
      'react-native-safe-area-context is not installed. To use WrapperSafeAreaView, please install it: npm install react-native-safe-area-context',
    );
    return (
      <Wrapper style={[wrapperSv({ fill, px }), style]} {...rest}>
        {children}
      </Wrapper>
    );
  }

  return (
    <SafeAreaView style={[wrapperSv({ fill, px }), style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
