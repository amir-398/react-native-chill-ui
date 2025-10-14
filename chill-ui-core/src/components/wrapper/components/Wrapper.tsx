import type { WrapperPropsTw } from '@types';
import type { PropsWithChildren } from 'react';

import { Box } from '@components/box';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperSv } from '../styles/Wrapper.ss.styles';

/**
 * Basic Wrapper component - a flexible container with default styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <Wrapper className="bg-gray-100 p-4">
 *   <String>Content</String>
 * </Wrapper>
 * ```
 * @param fill - Whether to fill the wrapper
 * @param px - Padding horizontal
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param style - Style prop
 * @param children - Child components to render
 * @param rest - Rest of the view props
 * @returns Wrapper component with appropriate styling
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsTw>) {
  classNamePropsHandler(props, 'Wrapper');

  const { children, className, fill, px, style } = props;

  return (
    <Box
      {...classNameHandler(cn(wrapperTv({ fill, px }), className))}
      {...styleHandler({ defaultStyle: wrapperSv({ fill, px }), style })}
    >
      {children}
    </Box>
  );
}

Wrapper.displayName = 'Wrapper';
