import type { WrapperPropsSs } from '@types';
import type { PropsWithChildren } from 'react';

import { BoxSs } from '@components/box';

import { wrapperSv } from '../styles/Wrapper.ss.styles';

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
 * @param px - Padding horizontal
 * @param style - Style prop
 * @param children - Child components to render
 * @param rest - Rest of the view props
 * @returns Wrapper component with appropriate styling
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsSs>) {
  const { children, fill, px, style } = props;

  return <BoxSs style={[wrapperSv({ fill, px }), style]}>{children}</BoxSs>;
}

Wrapper.displayName = 'Wrapper';
