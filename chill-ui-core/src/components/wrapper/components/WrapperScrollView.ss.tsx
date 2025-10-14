import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsSs } from '@types';

import { ScrollView } from 'react-native';

import { wrapperSv } from '../styles/Wrapper.ss.styles';

/**
 * ScrollView wrapper component with keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperScrollView>
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param rest - Rest of the scroll view props and view props
 * @param children - Child components to render
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsSs>) {
  const { children, fill, px, style, ...rest } = props;
  return (
    <ScrollView style={[wrapperSv({ fill, px }), style]} {...rest}>
      {children}
    </ScrollView>
  );
}

WrapperScrollView.displayName = 'WrapperScrollView';
