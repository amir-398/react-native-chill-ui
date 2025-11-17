import type { WrapperPropsSs } from '@types';
import type { PropsWithChildren } from 'react';

import { BoxSs } from '@components/box';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

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
 * <Wrapper style={{ backgroundColor: '#f0f0f0' }}>
 *   <String>Content</String>
 * </Wrapper>
 * ```
 *
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsSs>) {
  const { children, edges, fill, grow, hasSafeArea, px, style } = props;

  const content = <BoxSs style={[wrapperSv({ fill, grow, px }), style]}>{children}</BoxSs>;

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
