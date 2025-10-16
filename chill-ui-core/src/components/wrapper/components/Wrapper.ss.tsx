import type { WrapperPropsSs } from '@types';
import type { PropsWithChildren } from 'react';

import { BoxSs } from '@components/box';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';

/**
 * Basic Wrapper component - a flexible container with default styling.
 *
 * @example
 * ```tsx
 * <Wrapper style={{ backgroundColor: '#f0f0f0' }}>
 *   <String>Content</String>
 * </Wrapper>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding horizontal
 * @param style - Style prop
 * @param children - Child components to render
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param rest - Rest of the view props
 * @returns Wrapper component with appropriate styling
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
