import type { WrapperPropsTw } from '@types';
import type { PropsWithChildren } from 'react';

import { cn } from '@utils';
import { BoxTw } from '@components/box';

import { wrapperTv } from '../styles/Wrapper.tw.styles';

/**
 * Basic Wrapper component - a flexible container with default styling.
 *
 * @example
 * ```tsx
 * <Wrapper className="bg-gray-100 p-4">
 *   <String>Content</String>
 * </Wrapper>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param px - Padding horizontal
 * @param className - Custom CSS classes for the wrapper
 * @param style - Style prop
 * @param children - Child components to render
 * @param rest - Rest of the view props
 * @returns Wrapper component with appropriate styling
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsTw>) {
  const { children, className, fill, px, ...rest } = props;

  return (
    <BoxTw className={cn(wrapperTv({ fill, px }), className)} {...rest}>
      {children}
    </BoxTw>
  );
}

Wrapper.displayName = 'Wrapper';
