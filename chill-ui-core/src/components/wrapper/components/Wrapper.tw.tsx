import type { WrapperPropsTw } from '@types';
import type { PropsWithChildren } from 'react';

import { cn } from '@utils';
import { BoxTw } from '@components/box';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.tw';

/**
 * Basic Wrapper component - a flexible container with default styling.
 *
 * @example
 * ```tsx
 * <Wrapper className="bg-gray-100 p-4">
 *   <String>Content</String>
 * </Wrapper>
 *
 * // With SafeAreaView
 * <Wrapper hasSafeArea edges={['top', 'bottom']}>
 *   <String>Content with safe areas</String>
 * </Wrapper>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding horizontal
 * @param className - Custom CSS classes for the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param style - Style prop
 * @param children - Child components to render
 * @param rest - Rest of the view props
 * @returns Wrapper component with appropriate styling
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsTw>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, ...rest } = props;

  const content = (
    <BoxTw className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
      {children}
    </BoxTw>
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
