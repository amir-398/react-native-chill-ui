import type { PropsWithChildren } from 'react';
import type { WrapperSafeAreaViewPropsTw } from '@types';

import { Box } from '@components/box';
import { classNameHandler, classNamePropsHandler, cn, customConsole, styleHandler } from '@utils';

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
 * The `<WrapperSafeAreaView />` component provides a SafeAreaView wrapper for handling safe areas.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperSafeAreaView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView edges={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 *
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param edges - Safe area edges to apply: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param emulateUnlessSupported - Whether to emulate safe area unless supported (default: `false`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperSafeAreaView(props: PropsWithChildren<Omit<WrapperSafeAreaViewPropsTw, 'hasSafeArea'>>) {
  classNamePropsHandler(props, 'WrapperSafeAreaView');
  const { children, className, fill, grow, px, style, ...rest } = props;

  if (!SafeAreaView) {
    return (
      <Box
        {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
        {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  return (
    <SafeAreaView
      {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
      {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
