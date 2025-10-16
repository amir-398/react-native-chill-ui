import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsTw } from '@types';

import { cn } from '@utils';
import { ScrollView } from 'react-native';

import { wrapperTv } from '../styles/Wrapper.tw.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.tw';

/**
 * ScrollView wrapper component with keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperScrollView contentContainerClassName="p-4">
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 *
 * // With SafeAreaView
 * <WrapperScrollView hasSafeArea edges={['top', 'bottom']}>
 *   <String>Scrollable content with safe areas</String>
 * </WrapperScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param style - Style prop
 * @param rest - Rest of the scroll view props and view props
 * @param children - Child components to render
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsTw>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, ...rest } = props;

  const content = (
    <ScrollView
      contentContainerClassName={cn(wrapperTv({ fill, grow, px }), className)}
      alwaysBounceVertical={wrapperDefaultProps.alwaysBounceVertical}
      showsVerticalScrollIndicator={wrapperDefaultProps.showsVerticalScrollIndicator}
      {...rest}
    >
      {children}
    </ScrollView>
  );

  if (hasSafeArea) {
    return (
      <WrapperSafeAreaView px="none" edges={edges}>
        {content}
      </WrapperSafeAreaView>
    );
  }

  return content;
}

WrapperScrollView.displayName = 'WrapperScrollView';
