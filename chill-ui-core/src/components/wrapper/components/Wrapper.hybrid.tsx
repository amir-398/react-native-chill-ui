import type { WrapperPropsTw } from '@types';
import type { PropsWithChildren } from 'react';

import { Box } from '@components/box';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.hybrid';

/**
 * The `<Wrapper />` component provides a flexible container with default styling and SafeAreaView support.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Wrapper } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Wrapper>
 *   <String>Content</String>
 * </Wrapper>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsTw>) {
  classNamePropsHandler(props, 'Wrapper');

  const { children, className, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  const content = (
    <Box
      {...classNameHandler(cn(wrapperTv({ fill, grow, px }), className))}
      {...styleHandler({ defaultStyle: wrapperSv({ fill, grow, px }), style })}
      {...rest}
    >
      {children}
    </Box>
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

Wrapper.displayName = 'Wrapper';
