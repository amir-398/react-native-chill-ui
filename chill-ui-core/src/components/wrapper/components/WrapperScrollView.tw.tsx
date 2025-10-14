import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsTw } from '@types';

import { cn } from '@utils';
import { ScrollView } from 'react-native';

import { wrapperTv } from '../styles/Wrapper.tw.styles';

/**
 * ScrollView wrapper component with keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperScrollView contentContainerClassName="p-4">
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param fill - Whether to fill the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param rest - Rest of the scroll view props and view props
 * @param children - Child components to render
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsTw>) {
  const { children, className, fill, px, ...rest } = props;
  return (
    <ScrollView className={cn(wrapperTv({ fill, px }), className)} {...rest}>
      {children}
    </ScrollView>
  );
}

WrapperScrollView.displayName = 'WrapperScrollView';
