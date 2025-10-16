import type { PropsWithChildren } from 'react';
import type { WrapperScrollViewPropsSs } from '@types';

import { ScrollView } from 'react-native';

import { wrapperSv } from '../styles/Wrapper.ss.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView.ss';

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
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param style - Style prop
 * @param rest - Rest of the scroll view props and view props
 * @param children - Child components to render
 */
export function WrapperScrollView(props: PropsWithChildren<WrapperScrollViewPropsSs>) {
  const { children, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  const content = (
    <ScrollView
      contentContainerStyle={[wrapperSv({ fill, grow, px }), style]}
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
